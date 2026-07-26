"use client";

import * as tf from "@tensorflow/tfjs";
import { useCallback, useEffect, useRef, useState } from "react";

import PoseAnalysisControlPanel from "@/feature/pose/components/PoseAnalysisControlPanel";
import PoseAnalysisHeader from "@/feature/pose/components/PoseAnalysisHeader";
import PoseAnalysisResult from "@/feature/pose/components/PoseAnalysisResult";
import { EXERCISE_OPTIONS } from "@/feature/pose/type";
import type {
  AnalysisAccumulator,
  AnalysisResult,
  AnalysisState,
  ExerciseType,
  Keypoint,
  MoveNetDetectorModule,
  Pose,
  PoseDetector,
  PoseFeedback,
} from "@/feature/pose/type";

// 부위별 좌표 반환 
const SKELETON_CONNECTIONS = [
  ["left_shoulder", "right_shoulder"],
  ["left_shoulder", "left_elbow"],
  ["left_elbow", "left_wrist"],
  ["right_shoulder", "right_elbow"],
  ["right_elbow", "right_wrist"],
  ["left_shoulder", "left_hip"],
  ["right_shoulder", "right_hip"],
  ["left_hip", "right_hip"],
  ["left_hip", "left_knee"],
  ["left_knee", "left_ankle"],
  ["right_hip", "right_knee"],
  ["right_knee", "right_ankle"],
] as const;

// 관절 신뢰도 점수 기준값
const MIN_KEYPOINT_SCORE = 0.4;

// 프레임 분석 초 설정 ( 매 프레임마다 AI 모델 실행 -> 브라우저가 무거워질 수 있음)
const ANALYSIS_INTERVAL_MS = 150;

// 수치계산전 검사할 프레임 수
const VALIDATION_FRAME_COUNT = 12;

// 알맞은 운동인지 파악하는 기준값 ( 70% 이상이면 분석 시작)
const MIN_COMPATIBLE_FRAME_RATIO = 0.7;

interface ExerciseValidationAccumulator {
  totalFrames: number;
  compatibleFrames: number;
}

// 분석 시작할때 이전 영상 값 섞이지 않게 초기값 설정
function createAnalysisAccumulator(): AnalysisAccumulator {
  return {
    // 신뢰 가능한 관절을 인식한 프레임 수
    detectedFrames: 0,
    // 가장 깊게 내려간 시점의 골반과 무릎 상대 높이
    deepestHipToKneeRatio: null,
    // 가장 깊은 시점의 무릎 각도
    kneeAngleAtDeepest: null,
    // 가장 깊은 시점의 상체 기울기
    torsoTiltAtDeepest: null,
    // 반복 횟수
    repetitions: 0,
    // 플랭크 유지 시간
    holdDurationMs: 0,
    // 반복 동작 시작점, 최저점 파악하기 위한 top 좌표
    topHipY: null,
    // 반복 동작 시작점, 최저점 파악하기 위한 bottom 좌표
    bottomHipY: null,
    // ready -> descending - ascending 순서로 움직인 단계값 기록을 저장
    motionPhase: "ready",
  };
}

// 세 관절을 받아 가운데 관절의 각도 계산
function getAngle(first: Keypoint, vertex: Keypoint, third: Keypoint) {
  // 무릎을 기준점으로 한 골반 방향 벡터, 발목 방향 벡터 생성
  const firstVector = { x: first.x - vertex.x, y: first.y - vertex.y };
  const thirdVector = { x: third.x - vertex.x, y: third.y - vertex.y };
  // 두 벡터의 내적과 길이 계산
  const dotProduct = firstVector.x * thirdVector.x + firstVector.y * thirdVector.y;
  const firstLength = Math.hypot(firstVector.x, firstVector.y);
  const thirdLength = Math.hypot(thirdVector.x, thirdVector.y);

  // 두 좌표가 똑같을시 각도 계산이 불가하므로 null 반환
  if (firstLength === 0 || thirdLength === 0) return null;

  // -1 ~ 1 사이의 범위 보정 
  const cosine = Math.min(1, Math.max(-1, dotProduct / (firstLength * thirdLength)));
  // 라디안값 구하기
  return (Math.acos(cosine) * 180) / Math.PI;
}

// 어깨 ~ 골반을 잇는 수직선에서 얼마나 기울었는지 계산
function getTorsoTilt(shoulder: Keypoint, hip: Keypoint) {
  // 어깨 골반 가로, 세로 차이
  const deltaX = shoulder.x - hip.x;
  const deltaY = shoulder.y - hip.y;
  // 0에 가까움 -> 어깨와 골반이 세로로 정렬됨, 값이 커짐 -> 몸통이 옆으로 더 기울어짐
  // 스쿼트, 런지 ,데드리프트의 상체 전방 기울기, 플랭크의 몸통 정렬 확인에 사용
  return (Math.atan2(Math.abs(deltaX), Math.abs(deltaY)) * 180) / Math.PI;
}

// 프레임 인식에 따른 반환값 설정 함수
function getReliability(detectedFrames: number): AnalysisResult["reliability"] {
  // 30 프레임 이상 -> high, 10~29프레임 -> medium, 10프레임 미만 -> low
  // 영상에서 AI가 충분한 데이터를 확보했는지 파악하는 지표
  if (detectedFrames >= 30) return "high";
  if (detectedFrames >= 10) return "medium";
  return "low";

}

function createPoseFeedback({
  exercise,
  detectedFrames,
  depthStatus,
  kneeAngleAtDeepest,
  torsoTiltAtDeepest,
  repetitions,
}: Omit<AnalysisResult, "message" | "feedbacks" | "reliability" | "deepestHipToKneePercent" | "holdDurationMs">): PoseFeedback[] {
  const feedbacks: PoseFeedback[] = [];
  // 사용자가 선택한 운동 종류 저장
  const exerciseOption = EXERCISE_OPTIONS[exercise];

  // 관절 인식 프레임이 10 이하일 경우 나타낼 응답값
  if (detectedFrames < 10) {
    feedbacks.push({
      title: "분석 신뢰도가 낮아요",
      description: `유효 관절이 ${detectedFrames}프레임만 인식되어 현재 수치는 참고용입니다.`,
      action: exerciseOption.cameraGuide,
    });
  }

  // 운동 종류 플랭크일떄
  // 플랭크는 반복 횟수, 골반 최저점보다 유지시간과 몸통 정렬이 중요하기 떄문에 분기 처리
  if (exercise === "plank") {
    if (torsoTiltAtDeepest !== null) {
      feedbacks.push({
        // 몸통 기울기가 15도 보다 크면 정렬 다시 할 수 있게 안내
        title: torsoTiltAtDeepest > 15 ? "몸통 기울기를 조금 더 확인해보세요" : "몸통 기울기가 비교적 안정적이에요",
        description: `인식 구간에서 몸통 기울기가 ${torsoTiltAtDeepest}°로 감지되었습니다.`,
        action: "어깨-골반-발목이 한 줄에 가깝게 유지되도록 복부와 둔근에 힘을 주세요.",
      });
    }

    return feedbacks;
  }

  // 반복 운동에서 골반 높이를 기준으로 3개의 피드백 작성
  // needsReview = 충분히 내려간 프레임을 찾지 못했을 떄, near = 목표 기준 근처까지 내려갔을 떄, adequate = 충분히 내려갔을 때
  if (depthStatus === "needsReview") {
    feedbacks.push({
      title: `${exerciseOption.label} 움직임 범위를 조금 더 확인해보세요`,
      description: "하강 구간이 충분히 인식되지 않았습니다.",
      action: exerciseOption.cameraGuide,
    });
  } else if (depthStatus === "near") {
    feedbacks.push({
      title: `${exerciseOption.label} 움직임 범위가 목표에 가까워요`,
      description: "하강 구간이 충분히 인식되었습니다.",
      action: "통증이 없는 범위에서 하강과 상승을 일정한 속도로 이어가보세요.",
    });
  } else {
    feedbacks.push({
      title: `${exerciseOption.label} 하강 구간이 감지되었어요`,
      description: "분석 구간에서 충분한 하강 움직임이 확인되었습니다.",
      action: "현재 움직임 범위를 유지하면서 관절이 가려지지 않는지 확인해보세요.",
    });
  }

  // 무릎은 많이 굽혔지만 골반 깊이가 부족한 경우 카메라 각도나 관절 인식 상태의 영향일 수 있다고 안내
  // 한 개의 영상 수치만으로 사용자의 운동 자세를 확정하지 않기 위해 사용
  if (kneeAngleAtDeepest !== null && kneeAngleAtDeepest < 80 && depthStatus === "needsReview") {
    feedbacks.push({
      title: "무릎 각도와 골반 높이가 다르게 측정됐어요",
      description: "무릎은 많이 굽혀졌지만 골반 높이 기준은 충족하지 못해, 촬영 각도나 관절 인식 상태의 영향을 받았을 수 있습니다.",
      action: "몸의 옆면이 카메라를 향하도록 서고, 발목과 무릎이 가려지지 않게 촬영한 뒤 다시 분석해보세요.",
    });
  }

  // 상체 기울기 확보시 추가 피드백 만들기
  if (torsoTiltAtDeepest !== null) {
    feedbacks.push(
      // 기울기 40도 초과시 상세가 많이 기울어졌을 수 있다는 피드백
      torsoTiltAtDeepest > 40
        ? {
            title: "상체가 앞으로 기울어진 편이에요",
            description: `최저점에서 상체 기울기가 ${torsoTiltAtDeepest}°로 감지되었습니다.`,
            action: "시선은 정면에 두고 가슴을 편 상태에서, 복부에 힘을 주며 내려가보세요.",
          }
      // 기울기 40도 이하시 비교적 안정적으로 인식됐다는 피드백
        : {
            title: "상체 기울기는 비교적 안정적이에요",
            description: `최저점에서 상체 기울기가 ${torsoTiltAtDeepest}°로 감지되었습니다.`,
            action: "현재 상체 각도를 유지하면서 하강·상승을 일정한 속도로 반복해보세요.",
          },
    );
  }

  // 프레임은 인식했지만 반복 횟수가 0일 때 안내할 문구
  if (repetitions === 0 && detectedFrames >= 10) {
    feedbacks.push({
      title: `완성된 ${exerciseOption.label} 반복 동작을 찾지 못했어요`,
      description: "하강 후 시작 자세까지 올라오는 흐름이 충분히 인식되지 않았습니다.",
      action: "시작 자세에서 멈춘 뒤 천천히 내려가고, 다시 완전히 일어나는 동작을 2~3회 반복해보세요.",
    });
  }

  return feedbacks;
}

// 신뢰 가능한 관절인지 판별하는함수
function isReliableKeypoint(keypoint?: Keypoint): keypoint is Keypoint {
  // 값 존재하는 지 확인 & 관절 인식 신뢰도가 0.4(MIN_KEYPOINT_SCORE 값) 이상인지 확인
  return keypoint !== undefined && (keypoint.score ?? 0) >= MIN_KEYPOINT_SCORE;
}

// 운동에 맞는 촬영 방향 사전 검증 함수
function isExercisePoseCompatible(pose: Pose, exercise: ExerciseType) {
  // MoveNet이 반환한 관절 배열을 이름으로 바로 찾을 수 있는 Map으로 바꾼다. 
  const keypoints = new Map(pose.keypoints.map((keypoint) => [keypoint.name, keypoint]));
  // 왼쪽, 오른쪽 각각에 어깨, 골반, 무릎, 발목 찾기
  const metrics = (["left", "right"] as const)
    .map((side) => {
      const shoulder = keypoints.get(`${side}_shoulder`);
      const hip = keypoints.get(`${side}_hip`);
      const knee = keypoints.get(`${side}_knee`);
      const ankle = keypoints.get(`${side}_ankle`);

      // 네 관절 중 하나라도 누락되거나 신뢰도가 낮다면 해당 신체는 분석에 사용하지 않으 
      if (
        !isReliableKeypoint(shoulder)
        || !isReliableKeypoint(hip)
        || !isReliableKeypoint(knee)
        || !isReliableKeypoint(ankle)
      ) return null;

      return { shoulder: shoulder!, hip: hip!, knee: knee!, ankle: ankle! };
    })
    // 왼쪽 또는 오른쪽 중 분석 가능한 한쪽을 선택
    .find((sideMetrics) => sideMetrics !== null);

  // 양쪽 모두필요한 관절이 부족하면 운동 방향 검증 통과하지 못함
  if (!metrics) return false;

  // 몸통이 수직에 가까운지 또는 수평에 가까운지 파악
  const torsoTilt = getTorsoTilt(metrics.shoulder, metrics.hip);
  // 어깨- 골반 - 발목이 얼마나 일직선에 가까운지 파악
  const bodyLineAngle = getAngle(metrics.shoulder, metrics.hip, metrics.ankle);

  // 플랭크·팔굽혀펴기는 수평 몸통 정렬을, 나머지는 서 있는 자세의 수직 몸통을 우선 검증한다.
  if (exercise === "plank" || exercise === "pushup") {
    return torsoTilt >= 55 && bodyLineAngle !== null && bodyLineAngle >= 135;
  }

  // 스쿼트, 런지, 데드리프트는 측면 촬영에서 몸통이 상대적으로 세로에 가까워야함 -> 기준 정의
  return torsoTilt < 55;

  // 이 함수의 목적은 분석이 가능한 촬영 방향인지 거르는 기능
}

// 분석결과 화면에 시각화하는 함수
function drawPose(canvas: HTMLCanvasElement | null, pose: Pose, width: number, height: number) {
  // 프레임마다 컴포넌트를 다시 렌더링하지 않고 Canvas 오버레이에만 스켈레톤을 그린다.
  const context = canvas?.getContext("2d");

  // 도구 없으면 작업하지 않음
  if (!canvas || !context) return;

  // Canvas와 원본 영상의 실제 해상도 맞춤, 크기가 다를시 관절 표시되는 부분이 영상과 많이 달라질 수 있음
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }

  // 이전 프레임의 선과 점을 지움
  context.clearRect(0, 0, width, height);

  // 관절 이름으로 좌표를 빠르게 찾기 위해 변환
  const keypoints = new Map(pose.keypoints.map((keypoint) => [keypoint.name, keypoint]));

  // 영상 크기에 맞춰 선 굵기 조정
  context.lineWidth = Math.max(3, width / 180);

  // 연결선 색 조정
  context.strokeStyle = "#BFFF0B";

  // 앞어 정의했던 어깨 - 팔꿈치, 골바 - 무릎 등의 연결 목록 반복
  SKELETON_CONNECTIONS.forEach(([startName, endName]) => {
    const start = keypoints.get(startName);
    const end = keypoints.get(endName);

    // 두 관절 중 하나라도 불확실할시 선 그리기 x
    if (!isReliableKeypoint(start) || !isReliableKeypoint(end)) return;

    // 두 관절 좌표 사이에 선 그리기
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  });

  // 선 사이 채우기 색깔
  context.fillStyle = "#F8FAFC";

  // 모든 관절 순회
  pose.keypoints.forEach((keypoint) => {
    if (!isReliableKeypoint(keypoint)) return;

    context.beginPath();
    // 신뢰 가능하다고 판단된 위치마다 원 그리기
    context.arc(keypoint.x, keypoint.y, Math.max(4, width / 140), 0, Math.PI * 2);
    context.fill();
  });
}

// 한 프레임의 관절 좌표를 받아 누적 결과를 갱신하는 함수
function updateExerciseResult(
  accumulator: AnalysisAccumulator,
  pose: Pose,
  videoHeight: number,
  exercise: ExerciseType,
) {
  // 좌우 관절 중 신뢰도가 높은 쪽만 사용해 촬영 방향에 따른 누락 영향을 줄인다.
  const keypoints = new Map(pose.keypoints.map((keypoint) => [keypoint.name, keypoint]));

  // 왼쪽, 오른쪽 신체 검사
  const sideMetrics = (["left", "right"] as const)
    .map((side) => {
      const shoulder = keypoints.get(`${side}_shoulder`);
      const hip = keypoints.get(`${side}_hip`);
      const knee = keypoints.get(`${side}_knee`);
      const ankle = keypoints.get(`${side}_ankle`);

      if (
        !isReliableKeypoint(shoulder)
        || !isReliableKeypoint(hip)
        || !isReliableKeypoint(knee)
        || !isReliableKeypoint(ankle)
      ) return null;

      return {
        shoulder,
        hip,
        knee,
        ankle,
        // 어깨, 골반, 무릎, 발목의 평균 신뢰도 계산
        averageScore: ((shoulder.score ?? 0) + (hip.score ?? 0) + (knee.score ?? 0) + (ankle.score ?? 0)) / 4,
      };
    })
    .filter((metrics): metrics is NonNullable<typeof metrics> => metrics !== null)
    // 왼쪽, 오른쪽 중 더 명확하게 인식된 한쪽만 선택, 카메라 각도, 가림 떄문에 한쪽이 잘 안보이는 문제 줄이기 위해
    .sort((first, second) => second.averageScore - first.averageScore)[0];

  if (!sideMetrics) return;

  // React state 대신 ref에 프레임별 수치를 누적해 분석 중 불필요한 재렌더링을 막는다.
  // 유효 프레임 수 증가
  accumulator.detectedFrames += 1;
  // 골반과 무릎의 세로 좌표 차이를 영상 높이로 나눠 비율로 만듬 
  // 값이 0 이상 -> 골반이 무릎과 같거나 아래에 있음, 값이 음수 -> 골반이 무릎보다 위에 있음
  const hipToKneeRatio = (sideMetrics.hip.y - sideMetrics.knee.y) / videoHeight;
  // 현재 프레임의 무릎 각도 구하기
  const kneeAngle = getAngle(sideMetrics.hip, sideMetrics.knee, sideMetrics.ankle);
  // 현재 프레임의 상체 기울기 구하기
  const torsoTilt = getTorsoTilt(sideMetrics.shoulder, sideMetrics.hip);

  // 플랭크일때 깊이, 반복 횟수가 아닌 유지 시간 누적
  if (exercise === "plank") {
    accumulator.holdDurationMs += ANALYSIS_INTERVAL_MS;
    accumulator.torsoTiltAtDeepest = torsoTilt;
    return;
  }

  // 현재 프레임이 이전보다 더 낮은 골반 위치일때 가장 깊은 지점 기록 교체
  if (accumulator.deepestHipToKneeRatio === null || hipToKneeRatio > accumulator.deepestHipToKneeRatio) {
    // 깊이가 가장 큰 순간의 골반 높이, 무릎 각도, 상체 기울기를 함꼐 저장
    accumulator.deepestHipToKneeRatio = hipToKneeRatio;
    accumulator.kneeAngleAtDeepest = kneeAngle;
    accumulator.torsoTiltAtDeepest = torsoTilt;
  }

  // 영상 해상도와 무관하게 같은 비율로 동작을 판정한다.
  // 영상 높이의 설정 값% 이상 움직여야 실제 운동 동작으로 인정, 작은 흔들림을 반복 동작으로 잘못 세지 않기 위한 기준
  const minimumMovement = videoHeight * 0.08;
  // 팔굽혀펴기는 어깨의 상하 이동을, 나머지 반복 운동은 골반의 상하 이동을 기준으로 센다.
  const currentHipY = exercise === "pushup" ? sideMetrics.shoulder.y : sideMetrics.hip.y;

  // 첫 프레임에는 시작 위치만 기록하고 종료
  if (accumulator.topHipY === null) {
    accumulator.topHipY = currentHipY;
    accumulator.bottomHipY = currentHipY;
    return;
  }

  // 현재 시작 위치를 찾는 단계
  if (accumulator.motionPhase === "ready") {
    accumulator.topHipY = Math.min(accumulator.topHipY, currentHipY);

    // 영상에서는 아래로 내려갈수록 y 값이 커지기 떄문에 시작점보다 충분히 큰 값이 되면 하강으로 판단
    if (currentHipY - accumulator.topHipY >= minimumMovement) {
      accumulator.motionPhase = "descending";
      accumulator.bottomHipY = currentHipY;
    }
    return;
  }

  // 하강 단계
  if (accumulator.motionPhase === "descending") {
    accumulator.bottomHipY = Math.max(accumulator.bottomHipY ?? currentHipY, currentHipY);

    // 최저점보다 위로 일정 거리 올라오기 시작하면 상승 단계로 바꿈
    if ((accumulator.bottomHipY ?? currentHipY) - currentHipY >= minimumMovement * 0.35) {
      accumulator.motionPhase = "ascending";
    }
    return;
  }

  // 상승 후 시작 위치 근처까지 돌아오면 1회를 완료한 것으로 판단
  if (currentHipY <= (accumulator.topHipY ?? currentHipY) + minimumMovement * 0.35) {
    accumulator.repetitions += 1;
    accumulator.motionPhase = "ready";
    accumulator.topHipY = currentHipY;
    accumulator.bottomHipY = currentHipY;
  }
}

export default function PostureAnalysis() {
  // video, canvas는 값 저장을 위해 useRef 사용
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 한번 생성한 MoveNet 모델 객체 저장을 위해 useRef 사용
  const detectorRef = useRef<PoseDetector | null>(null);
  // 현재 예약되어 있는 reqeustAnimationFrame ID, 분석 중지를 취소하는데 사용
  const animationFrameRef = useRef<number | null>(null);
  // AI 추론이 끝나기 전 다음 추론이 겹쳐 실행되는 것을 막기위해 사용
  const isEstimatingRef = useRef(false);
  // 가장 최근의 AI 추론 시각
  const lastInferenceAtRef = useRef(0);
  // 업로드한 파일을 브라우저 영상으로 재생하기 위해 만든 Object URL 보관을 위해 사용
  const objectUrlRef = useRef<string | null>(null);
  // 프레임마다 바뀌는 누적 분석값과 사전 검증값, useState로 둘디 프레임마다 랜더링 발생으로 성능 저하가능성이 있기 떄문에 useRef 사용
  const resultRef = useRef<AnalysisAccumulator>(createAnalysisAccumulator());
  const validationRef = useRef<ExerciseValidationAccumulator>({ totalFrames: 0, compatibleFrames: 0 });

  // 업로드 영상 주소
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  // 업로드한 파일 이름
  const [fileName, setFileName] = useState("");
  // 선택 운동
  const [exercise, setExercise] = useState<ExerciseType>("squat");
  // 현재 단계 (idle, loading, validating, complete 등)
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  // 최종결과
  const [result, setResult] = useState<AnalysisResult | null>(null);
  // 촬영 방향 맞지 않을 떄 보여줄 메시지
  const [validationMessage, setValidationMessage] = useState<string | null>(null);

  // Canvas 모든 그림 지우는 함수, 이전 사람의 정보가 남지 않게 하기 위해 사용
  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // 분석중이라는 잠금 상태 해제
  const stopAnalysis = useCallback(() => {
    isEstimatingRef.current = false;

    if (animationFrameRef.current !== null) {
      // 다음 분석 프레임 예약 취소, 분석 종료 후에도 루프가 계쏙 실행되는것 막기
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  // 모델 준비 함수
  const getDetector = useCallback(async () => {
    // 이미 모델이 준비되어 있다면 기존 객체 사용
    if (detectorRef.current) return detectorRef.current;
    // Tensorflow.js 실행 환경이 준비될 떄까지 기다리기
    await tf.ready();

    // 모듈 동적으로 불러오기, 실세 분석 시작 시점에 불러와서 초기 번들 부담 감소
    const { load } = (await import(
      "@tensorflow-models/pose-detection/dist/movenet/detector.js"
    )) as MoveNetDetectorModule;

    detectorRef.current = await load({
      // 한명의 사람을 빠르게 분석하는 모델 
      modelType: "SinglePose.Lightning",
      // 프레임마다 관절 점이 심하게 흔들리지 않도록 보정
      enableSmoothing: true,
      // 인식 기준 점수
      minPoseScore: MIN_KEYPOINT_SCORE,
    });

    return detectorRef.current;
  }, []);

  // 분석 루프 중지 함수
  const finishAnalysis = useCallback(() => {
    stopAnalysis();
    // 분석 중 Ref에 누적했던 값 꺼내기
    const {
      detectedFrames,
      deepestHipToKneeRatio,
      kneeAngleAtDeepest,
      torsoTiltAtDeepest,
      repetitions,
    } = resultRef.current;

    // 유효 프레임이 하나도 없거나, 플랭크가 아닌 운동에서 깊이 값을 확보하지 못했을시 분석 결과를 만들 수 없기 떄문에 null 반환
    if (detectedFrames === 0 || (exercise !== "plank" && deepestHipToKneeRatio === null)) {
      // 분석 불가 상태와, 재촬영 안내 값 반환
      setAnalysisState("unavailable");
      setResult({
        exercise,
        detectedFrames,
        depthStatus: "needsReview",
        deepestHipToKneePercent: null,
        kneeAngleAtDeepest: null,
        torsoTiltAtDeepest: null,
        repetitions: 0,
        holdDurationMs: 0,
        reliability: "low",
        feedbacks: [{
          title: "영상 인식이 충분하지 않아요",
          description: "자세 분석에 필요한 관절 좌표를 충분히 찾지 못했습니다.",
          action: "옆면 전신이 보이도록 다시 촬영한 영상을 선택해보세요.",
        }],
        message: "전신이 보이는 옆면 영상에서 다시 시도해주세요.",
      });
      return;
    }

    // 골반 - 무릎 비율을 퍼센트로 바꾸고 소수 첫째 자리까지 반올림, 플랭크는 깊이를 사용하지 않기 떄문에 null 
    const deepestHipToKneePercent = exercise === "plank" || deepestHipToKneeRatio === null
      ? null
      : Math.round(deepestHipToKneeRatio * 1000) / 10;
      // 반복 운동 깊이 상태 분류
    const depthStatus = exercise === "plank" || deepestHipToKneeRatio === null
    // 골반이 무릎 높이 이하로 내려간 프레임
      ? "adequate"
      : deepestHipToKneeRatio >= 0
        ? "adequate"
        : deepestHipToKneeRatio >= -0.04
        // 무릎 높이에 거의 근접
          ? "near"
          // 충분한 하강 프레임을 찾이 못함
          : "needsReview";

    // 화면에 전달한 최종 결과 객체 만들기
    const analysisResult: AnalysisResult = {
      exercise,
      detectedFrames,
      depthStatus,
      deepestHipToKneePercent,
      // 각도의 경우 보기 쉽게 정수로 반올림
      kneeAngleAtDeepest: kneeAngleAtDeepest === null ? null : Math.round(kneeAngleAtDeepest),
      torsoTiltAtDeepest: torsoTiltAtDeepest === null ? null : Math.round(torsoTiltAtDeepest),
      repetitions,
      holdDurationMs: resultRef.current.holdDurationMs,
      // 유효 프레임 수를 기반으로 신뢰도 결정
      reliability: getReliability(detectedFrames),
      feedbacks: [],
      // 운동 종류와 깊이 상태에 따라 결과 요약 문구 결정
      message: exercise === "plank"
        ? "유효 관절이 인식된 구간의 유지 시간과 몸통 기울기를 확인했습니다."
        : depthStatus === "adequate"
        ? "분석 구간에서 골반이 무릎 높이 이하로 내려간 프레임이 감지되었습니다."
        : depthStatus === "near"
          ? "골반이 무릎 높이에 가까워졌지만, 촬영 각도에 따라 추가 확인이 필요합니다."
          : "분석 구간에서 골반이 무릎 높이 이하로 내려간 프레임을 찾지 못했습니다.",
    };

    // 수치 결과를 피드백 목록으로 변환한 뒤, 상태를 완료로 바꾸고 화면에 표시
    analysisResult.feedbacks = createPoseFeedback(analysisResult);
    setAnalysisState("complete");
    setResult(analysisResult);
  }, [exercise, stopAnalysis]);

  const startAnalysis = useCallback(async () => {
    const video = videoRef.current;

    // 비디오 DOM, 업로드 영상 주소가 없으면 분석 시작하지 않음
    if (!video || !videoUrl) return;

    // 기존 분석, 루프, Canvas, 누적값, 사전 검증값 초기화
    stopAnalysis();
    clearCanvas();
    resultRef.current = createAnalysisAccumulator();
    validationRef.current = { totalFrames: 0, compatibleFrames: 0 };

    // 이전 결과와 경고 문구를 지우고 화면 상태를 로딩을 변경
    setResult(null);
    setValidationMessage(null);
    setAnalysisState("loading");

    try {
      // 모델 준비가 끝나면 사전 검증 상태로 전환하고 영상을 처음으로 되돌림
      await getDetector();
      setAnalysisState("validating");
      video.currentTime = 0;
      // 모델 불러오지 못할 떄 오류
    } catch (error) {
      console.error("자세 분석 모델 로딩 실패:", error);
      setAnalysisState("error");
      setResult({
        exercise,
        detectedFrames: 0,
        depthStatus: "needsReview",
        deepestHipToKneePercent: null,
        kneeAngleAtDeepest: null,
        torsoTiltAtDeepest: null,
        repetitions: 0,
        holdDurationMs: 0,
        reliability: "low",
        feedbacks: [{
          title: "분석 모델을 불러오지 못했어요",
          description: "자세 분석을 시작하기 전에 모델 준비에 실패했습니다.",
          action: "네트워크 연결을 확인한 뒤 다시 시도해주세요.",
        }],
        message: "분석 모델을 불러오지 못했습니다. 네트워크 연결을 확인한 뒤 다시 시도해주세요.",
      });
    }
  }, [clearCanvas, getDetector, stopAnalysis, videoUrl]);

  useEffect(() => {
    const video = videoRef.current;
    const detector = detectorRef.current;

    // 촬영방향 사전검증 통과, 실제 운동 수치 누적될떄만 분석 루프 실행
    if ((analysisState !== "validating" && analysisState !== "analyzing") || !video || !detector) return;

    // effct 종료 뒤 이전 비동기 작업 실행을 막기 위한 방지책
    let isActive = true;
    lastInferenceAtRef.current = 0;

    // 브라우저가 화면을 그릴 준비가 될 떄마다 호출하는 함수
    const analyzeFrame = async (timestamp: number) => {
      // 컴포넌트가 정리됐거나 영상이 끝난 경우
      if (!isActive || video.ended) {
        // 검증이 끝나기 전에 영상이 종료되면 충분한 프레임이 없기 때문에 촬영 방향 확인 실패처리
        if (video.ended && analysisState === "validating") {
          setAnalysisState("invalid");
          setValidationMessage("운동 자세 확인을 완료하기 전에 영상이 끝났습니다. 전신이 보이는 더 긴 영상을 선택해주세요.");
          // 분석 중 영상이 끝났으면 누적값을 결과로 반환
        } else if (video.ended) {
          finishAnalysis();
        }
        return;
      }

      // AI 모델 실행 조건
      // 영상이 재생 중, 이전 추론이 아직 실행 중이지 않음, 이전 추론 이후 150ms 이상 지나야 함
      if (!video.paused && !isEstimatingRef.current && timestamp - lastInferenceAtRef.current >= ANALYSIS_INTERVAL_MS) {
        // 현재 추론을 시작했다는 표시&시각 저장
        isEstimatingRef.current = true;
        lastInferenceAtRef.current = timestamp;

        try {
          // 현재 영상 프레임 MoveNet에 전달해 사람 한 명의 관절 좌표 받기
          const pose = (await detector.estimatePoses(video))[0];

          // 사람 인식, 영상 실제 크기 준비되면 Canvas에 스켈레톤 그리기
          if (pose && video.videoWidth && video.videoHeight) {
            drawPose(canvasRef.current, pose, video.videoWidth, video.videoHeight);

            // 사전 검증 단계라면 분석 수치 누적하지 않음
            if (analysisState === "validating") {
              // 총 검사 프레임 수 올리기
              validationRef.current.totalFrames += 1;

              // 운동에 맞는 방향이라면 통과 프레임 수도 올리기 
              if (isExercisePoseCompatible(pose, exercise)) {
                validationRef.current.compatibleFrames += 1;
              }

              // 설정한 프레임 만큼 검사했다면 통과율 계산
              if (validationRef.current.totalFrames >= VALIDATION_FRAME_COUNT) {
                const compatibleRatio = validationRef.current.compatibleFrames / validationRef.current.totalFrames;

                // 설정한% 만큼 통과하면 실제 분석 시작, 검증 프레임 결과는 실제 운동 수치에 섞이지 않도록 누적값을 한 번 더 초기화
                if (compatibleRatio >= MIN_COMPATIBLE_FRAME_RATIO) {
                  resultRef.current = createAnalysisAccumulator();
                  setAnalysisState("analyzing");
                } else {
                  // 통과하지 못하시 분석진행 하지 않고, 선택한 운동에 맞는 촬영 가이드 보여주기
                  setAnalysisState("invalid");
                  setValidationMessage(
                    `${EXERCISE_OPTIONS[exercise].label} 자세와 영상의 기본 몸통 방향이 일치하지 않습니다. ${EXERCISE_OPTIONS[exercise].cameraGuide}`,
                  );
                }

                return;
              }
              // 이미 analyzing 상태일경우 프레임별 관절 수치와 반복 회숫 누적
            } else {
              updateExerciseResult(resultRef.current, pose, video.videoHeight, exercise);
            }
          }
        } catch (error) {
          console.error("자세 분석 프레임 처리 실패:", error);
          // 성공, 실패와 무관하게 추론 잠금 해제, 해당 과정이 없으면 한 번 오류가 난 뒤 분석이 영구적으로 멈출 수 있음
        } finally {
          isEstimatingRef.current = false;
        }
      }

      // 다음 화면 갱신 시점에 다시 analyzeFrame 예약, 영상 끝까지 반복
      animationFrameRef.current = window.requestAnimationFrame((nextTimestamp) => {
        void analyzeFrame(nextTimestamp);
      });
    };

    // 분석 상태가 되면 영상 재생 시도
    void video.play().catch((error) => {
      console.error("영상 재생 실패:", error);
      setAnalysisState("error");
    });
    animationFrameRef.current = window.requestAnimationFrame((timestamp) => {
      void analyzeFrame(timestamp);
    });

    // 상태가 바뀌거나, 컴포넌트가 사라질 떄 실행하는 정리 함수, 이전 루프가 다음 프레임을 예약하지 못하게 막음
    return () => {
      isActive = false;
      stopAnalysis();
    };
  }, [analysisState, exercise, finishAnalysis, stopAnalysis]);

  // 운동 종류 바꿀시 메세지, 결과, 상태 초기화 후 새 운동 저장
  const handleExerciseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    stopAnalysis();
    clearCanvas();
    setResult(null);
    setValidationMessage(null);
    setAnalysisState("idle");
    setExercise(event.target.value as ExerciseType);
  };

  // 비디오 onEnded 이벤트에서 호출되는 함수
  const handleVideoEnded = useCallback(() => {
    // 사전 검증 중 영상이 끝나면 실제 분석을 시작할 만큼 충분한 프레임을 얻은 상태가 아님
    if (analysisState === "validating") {
      // 프레임이 부족하기 떄문에 분석 불가와 재촬영 안내를 표시 
      stopAnalysis();
      setAnalysisState("invalid");
      setValidationMessage("운동 자세 확인을 완료하기 전에 영상이 끝났습니다. 전신이 보이는 더 긴 영상을 선택해주세요.");
      return;
    }
    // 검증을 통과한 뒤 영상이 끝난 경우에는 누적값 최종 결과로 반환
    finishAnalysis();
  }, [analysisState, finishAnalysis, stopAnalysis]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자가 선택한 파일 가져오기
    const file = event.target.files?.[0];
    if (!file) return;

    // 새 영상 분석하기 전에 기존 분석 화면을 초기화
    stopAnalysis();
    clearCanvas();
    setResult(null);
    setValidationMessage(null);
    setAnalysisState("idle");

    // 이전에 만든 Object URL을 해제, 해제하지 않으면 사용자가 영상을 반복해서 바꿀 떄 브라우저 메모리가 계속 점유될 수 있으 
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    // 사용자의 로컬 파일을 브라우저에서 바로 재생할 수 있는 임시 URL을 만듬
    const nextUrl = URL.createObjectURL(file);
    // 새 URL과 파일명을 저장
    objectUrlRef.current = nextUrl;
    setVideoUrl(nextUrl);
    setFileName(file.name);
  };

  // 화면을 떠나거나 컴포넌트가 제거될 떄 실행할 effect
  useEffect(() => {
    return () => {
      // 분석 루프 취소
      stopAnalysis();
      // MoveNet 모델이 사용하는 브라우저 메모리와 리소스 해제
      detectorRef.current?.dispose();

      // 업로드 영상의 임시 URL도 해체
      // 정리 코드 없을시 메모리 누수 발생가능성
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [stopAnalysis]);

  return (
    <main className="mx-auto max-w-5xl px-5 py-10 text-white sm:px-8 lg:px-12">
      <section className="overflow-hidden rounded-[32px] border border-white/10 bg-[#121A2B] p-5 shadow-2xl shadow-black/20 sm:p-8">
      {/* 헤더 제목, 설며  */}
        <PoseAnalysisHeader />
        {/* 컴포넌트가 가진 상태, Ref, 이벤트 함수 전달 */}
        <PoseAnalysisControlPanel
          exercise={exercise}
          fileName={fileName}
          videoUrl={videoUrl}
          videoRef={videoRef}
          canvasRef={canvasRef}
          analysisState={analysisState}
          validationMessage={validationMessage}
          onExerciseChange={handleExerciseChange}
          onVideoChange={handleVideoChange}
          onStart={() => void startAnalysis()}
          onFinish={handleVideoEnded}
        />

        {result && <PoseAnalysisResult result={result} />}
      </section>
    </main>
  );
}
