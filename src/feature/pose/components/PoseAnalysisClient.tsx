"use client";

import * as tf from "@tensorflow/tfjs";
import { useCallback, useEffect, useRef, useState } from "react";

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

const MIN_KEYPOINT_SCORE = 0.4;
const ANALYSIS_INTERVAL_MS = 150;

type AnalysisState = "idle" | "loading" | "analyzing" | "complete" | "unavailable" | "error";

interface AnalysisResult {
  detectedFrames: number;
  depthStatus: "adequate" | "near" | "needsReview";
  deepestHipToKneePercent: number | null;
  kneeAngleAtDeepest: number | null;
  torsoTiltAtDeepest: number | null;
  repetitions: number;
  reliability: "high" | "medium" | "low";
  feedbacks: PoseFeedback[];
  message: string;
}

interface PoseFeedback {
  title: string;
  description: string;
  action: string;
}

interface AnalysisAccumulator {
  detectedFrames: number;
  deepestHipToKneeRatio: number | null;
  kneeAngleAtDeepest: number | null;
  torsoTiltAtDeepest: number | null;
  repetitions: number;
  topHipY: number | null;
  bottomHipY: number | null;
  motionPhase: "ready" | "descending" | "ascending";
}

interface Keypoint {
  x: number;
  y: number;
  score?: number;
  name?: string;
}

interface Pose {
  keypoints: Keypoint[];
}

interface PoseDetector {
  estimatePoses(video: HTMLVideoElement): Promise<Pose[]>;
  dispose(): void;
}

interface MoveNetDetectorModule {
  load(config: {
    modelType: string;
    enableSmoothing: boolean;
    minPoseScore: number;
  }): Promise<PoseDetector>;
}

function createAnalysisAccumulator(): AnalysisAccumulator {
  return {
    detectedFrames: 0,
    deepestHipToKneeRatio: null,
    kneeAngleAtDeepest: null,
    torsoTiltAtDeepest: null,
    repetitions: 0,
    topHipY: null,
    bottomHipY: null,
    motionPhase: "ready",
  };
}

function getAngle(first: Keypoint, vertex: Keypoint, third: Keypoint) {
  const firstVector = { x: first.x - vertex.x, y: first.y - vertex.y };
  const thirdVector = { x: third.x - vertex.x, y: third.y - vertex.y };
  const dotProduct = firstVector.x * thirdVector.x + firstVector.y * thirdVector.y;
  const firstLength = Math.hypot(firstVector.x, firstVector.y);
  const thirdLength = Math.hypot(thirdVector.x, thirdVector.y);

  if (firstLength === 0 || thirdLength === 0) return null;

  const cosine = Math.min(1, Math.max(-1, dotProduct / (firstLength * thirdLength)));
  return (Math.acos(cosine) * 180) / Math.PI;
}

function getTorsoTilt(shoulder: Keypoint, hip: Keypoint) {
  const deltaX = shoulder.x - hip.x;
  const deltaY = shoulder.y - hip.y;
  return (Math.atan2(Math.abs(deltaX), Math.abs(deltaY)) * 180) / Math.PI;
}

function getReliability(detectedFrames: number): AnalysisResult["reliability"] {
  if (detectedFrames >= 30) return "high";
  if (detectedFrames >= 10) return "medium";
  return "low";
}

function createPoseFeedback({
  detectedFrames,
  depthStatus,
  kneeAngleAtDeepest,
  torsoTiltAtDeepest,
  repetitions,
}: Omit<AnalysisResult, "message" | "feedbacks" | "reliability" | "deepestHipToKneePercent">): PoseFeedback[] {
  const feedbacks: PoseFeedback[] = [];

  if (detectedFrames < 10) {
    feedbacks.push({
      title: "분석 신뢰도가 낮아요",
      description: `유효 관절이 ${detectedFrames}프레임만 인식되어 현재 수치는 참고용입니다.`,
      action: "카메라를 옆면에 고정하고, 머리부터 발목까지 전신이 영상에 보이도록 다시 촬영해보세요.",
    });
  }

  if (depthStatus === "needsReview") {
    feedbacks.push({
      title: "스쿼트 최저점을 조금 더 확인해보세요",
      description: "골반이 무릎 높이 아래로 내려간 프레임이 감지되지 않았습니다.",
      action: "하강할 때 엉덩이를 뒤로 보내고, 발바닥 전체로 바닥을 누르며 무릎 높이까지 천천히 내려가보세요.",
    });
  } else if (depthStatus === "near") {
    feedbacks.push({
      title: "스쿼트 깊이가 목표에 가까워요",
      description: "골반이 무릎 높이에 근접한 지점까지 내려간 것으로 감지되었습니다.",
      action: "무릎 방향을 발끝과 맞춘 상태로, 통증이 없는 범위에서 조금 더 안정적으로 내려가보세요.",
    });
  } else {
    feedbacks.push({
      title: "스쿼트 최저점이 감지되었어요",
      description: "분석 구간에서 골반이 무릎 높이 이하로 내려간 프레임이 확인되었습니다.",
      action: "현재 깊이를 유지하면서 무릎과 발끝의 방향이 같은지 정면 영상으로 추가 확인해보세요.",
    });
  }

  if (kneeAngleAtDeepest !== null && kneeAngleAtDeepest < 80 && depthStatus === "needsReview") {
    feedbacks.push({
      title: "무릎 각도와 골반 높이가 다르게 측정됐어요",
      description: "무릎은 많이 굽혀졌지만 골반 높이 기준은 충족하지 못해, 촬영 각도나 관절 인식 상태의 영향을 받았을 수 있습니다.",
      action: "몸의 옆면이 카메라를 향하도록 서고, 발목과 무릎이 가려지지 않게 촬영한 뒤 다시 분석해보세요.",
    });
  }

  if (torsoTiltAtDeepest !== null) {
    feedbacks.push(
      torsoTiltAtDeepest > 40
        ? {
            title: "상체가 앞으로 기울어진 편이에요",
            description: `최저점에서 상체 기울기가 ${torsoTiltAtDeepest}°로 감지되었습니다.`,
            action: "시선은 정면에 두고 가슴을 편 상태에서, 복부에 힘을 주며 내려가보세요.",
          }
        : {
            title: "상체 기울기는 비교적 안정적이에요",
            description: `최저점에서 상체 기울기가 ${torsoTiltAtDeepest}°로 감지되었습니다.`,
            action: "현재 상체 각도를 유지하면서 하강·상승을 일정한 속도로 반복해보세요.",
          },
    );
  }

  if (repetitions === 0 && detectedFrames >= 10) {
    feedbacks.push({
      title: "완성된 반복 동작을 찾지 못했어요",
      description: "하강 후 시작 자세까지 올라오는 흐름이 충분히 인식되지 않았습니다.",
      action: "시작 자세에서 멈춘 뒤 천천히 내려가고, 다시 완전히 일어나는 동작을 2~3회 반복해보세요.",
    });
  }

  return feedbacks;
}

function isReliableKeypoint(keypoint?: Keypoint): keypoint is Keypoint {
  return keypoint !== undefined && (keypoint.score ?? 0) >= MIN_KEYPOINT_SCORE;
}

export default function PoseAnalysisClient() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const detectorRef = useRef<PoseDetector | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isAnalyzingRef = useRef(false);
  const isEstimatingRef = useRef(false);
  const lastInferenceAtRef = useRef(0);
  const objectUrlRef = useRef<string | null>(null);
  const resultRef = useRef<AnalysisAccumulator>(createAnalysisAccumulator());

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");
  const [analysisState, setAnalysisState] = useState<AnalysisState>("idle");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (canvas && context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  const stopAnalysis = useCallback(() => {
    isAnalyzingRef.current = false;
    isEstimatingRef.current = false;

    if (animationFrameRef.current !== null) {
      window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  const drawPose = useCallback((pose: Pose, width: number, height: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");

    if (!canvas || !context) return;

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    context.clearRect(0, 0, width, height);
    const keypoints = new Map(pose.keypoints.map((keypoint) => [keypoint.name, keypoint]));

    context.lineWidth = Math.max(3, width / 180);
    context.strokeStyle = "#BFFF0B";

    SKELETON_CONNECTIONS.forEach(([startName, endName]) => {
      const start = keypoints.get(startName);
      const end = keypoints.get(endName);

      if (!isReliableKeypoint(start) || !isReliableKeypoint(end)) return;

      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    });

    context.fillStyle = "#F8FAFC";
    pose.keypoints.forEach((keypoint) => {
      if (!isReliableKeypoint(keypoint)) return;

      context.beginPath();
      context.arc(keypoint.x, keypoint.y, Math.max(4, width / 140), 0, Math.PI * 2);
      context.fill();
    });
  }, []);

  const updateSquatResult = useCallback((pose: Pose, videoHeight: number) => {
    const keypoints = new Map(pose.keypoints.map((keypoint) => [keypoint.name, keypoint]));
    const sides = ["left", "right"] as const;
    const sideMetrics = sides
      .map((side) => {
        const shoulder = keypoints.get(`${side}_shoulder`);
        const hip = keypoints.get(`${side}_hip`);
        const knee = keypoints.get(`${side}_knee`);
        const ankle = keypoints.get(`${side}_ankle`);

        if (![shoulder, hip, knee, ankle].every(isReliableKeypoint)) return null;

        return {
          shoulder: shoulder!,
          hip: hip!,
          knee: knee!,
          ankle: ankle!,
          averageScore: ((shoulder!.score ?? 0) + (hip!.score ?? 0) + (knee!.score ?? 0) + (ankle!.score ?? 0)) / 4,
        };
      })
      .filter((metrics): metrics is NonNullable<typeof metrics> => metrics !== null)
      .sort((first, second) => second.averageScore - first.averageScore)[0];

    if (!sideMetrics) return;

    resultRef.current.detectedFrames += 1;
    const hipToKneeRatio = (sideMetrics.hip.y - sideMetrics.knee.y) / videoHeight;
    const kneeAngle = getAngle(sideMetrics.hip, sideMetrics.knee, sideMetrics.ankle);
    const torsoTilt = getTorsoTilt(sideMetrics.shoulder, sideMetrics.hip);

    if (
      resultRef.current.deepestHipToKneeRatio === null ||
      hipToKneeRatio > resultRef.current.deepestHipToKneeRatio
    ) {
      resultRef.current.deepestHipToKneeRatio = hipToKneeRatio;
      resultRef.current.kneeAngleAtDeepest = kneeAngle;
      resultRef.current.torsoTiltAtDeepest = torsoTilt;
    }

    const minimumMovement = videoHeight * 0.08;
    const currentHipY = sideMetrics.hip.y;

    if (resultRef.current.topHipY === null) {
      resultRef.current.topHipY = currentHipY;
      resultRef.current.bottomHipY = currentHipY;
      return;
    }

    if (resultRef.current.motionPhase === "ready") {
      resultRef.current.topHipY = Math.min(resultRef.current.topHipY, currentHipY);

      if (currentHipY - resultRef.current.topHipY >= minimumMovement) {
        resultRef.current.motionPhase = "descending";
        resultRef.current.bottomHipY = currentHipY;
      }
      return;
    }

    if (resultRef.current.motionPhase === "descending") {
      resultRef.current.bottomHipY = Math.max(resultRef.current.bottomHipY ?? currentHipY, currentHipY);

      if ((resultRef.current.bottomHipY ?? currentHipY) - currentHipY >= minimumMovement * 0.35) {
        resultRef.current.motionPhase = "ascending";
      }
      return;
    }

    if (currentHipY <= (resultRef.current.topHipY ?? currentHipY) + minimumMovement * 0.35) {
      resultRef.current.repetitions += 1;
      resultRef.current.motionPhase = "ready";
      resultRef.current.topHipY = currentHipY;
      resultRef.current.bottomHipY = currentHipY;
    }
  }, []);

  const getDetector = useCallback(async () => {
    if (detectorRef.current) return detectorRef.current;

    await tf.ready();
    const { load } = (await import(
      "@tensorflow-models/pose-detection/dist/movenet/detector.js"
    )) as MoveNetDetectorModule;

    detectorRef.current = await load({
      modelType: "SinglePose.Lightning",
      enableSmoothing: true,
      minPoseScore: MIN_KEYPOINT_SCORE,
    });

    return detectorRef.current;
  }, []);

  const finishAnalysis = useCallback(() => {
    stopAnalysis();
    const {
      detectedFrames,
      deepestHipToKneeRatio,
      kneeAngleAtDeepest,
      torsoTiltAtDeepest,
      repetitions,
    } = resultRef.current;

    if (detectedFrames === 0 || deepestHipToKneeRatio === null) {
      setAnalysisState("unavailable");
      setResult({
        detectedFrames,
        depthStatus: "needsReview",
        deepestHipToKneePercent: null,
        kneeAngleAtDeepest: null,
        torsoTiltAtDeepest: null,
        repetitions: 0,
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

    const deepestHipToKneePercent = Math.round(deepestHipToKneeRatio * 1000) / 10;
    const depthStatus = deepestHipToKneeRatio >= 0
      ? "adequate"
      : deepestHipToKneeRatio >= -0.04
        ? "near"
        : "needsReview";

    const analysisResult: AnalysisResult = {
      detectedFrames,
      depthStatus,
      deepestHipToKneePercent,
      kneeAngleAtDeepest: kneeAngleAtDeepest === null ? null : Math.round(kneeAngleAtDeepest),
      torsoTiltAtDeepest: torsoTiltAtDeepest === null ? null : Math.round(torsoTiltAtDeepest),
      repetitions,
      reliability: getReliability(detectedFrames),
      feedbacks: [],
      message: depthStatus === "adequate"
        ? "분석 구간에서 골반이 무릎 높이 이하로 내려간 프레임이 감지되었습니다."
        : depthStatus === "near"
          ? "골반이 무릎 높이에 가까워졌지만, 촬영 각도에 따라 추가 확인이 필요합니다."
          : "분석 구간에서 골반이 무릎 높이 이하로 내려간 프레임을 찾지 못했습니다.",
    };

    analysisResult.feedbacks = createPoseFeedback(analysisResult);
    setAnalysisState("complete");
    setResult(analysisResult);
  }, [stopAnalysis]);

  const startAnalysis = useCallback(async () => {
    const video = videoRef.current;

    if (!video || !videoUrl) return;

    stopAnalysis();
    clearCanvas();
    resultRef.current = createAnalysisAccumulator();
    setResult(null);
    setAnalysisState("loading");

    try {
      const detector = await getDetector();
      setAnalysisState("analyzing");
      isAnalyzingRef.current = true;
      lastInferenceAtRef.current = 0;
      video.currentTime = 0;
      await video.play();

      const analyzeFrame = async (timestamp: number) => {
        if (!isAnalyzingRef.current) return;

        if (video.ended) {
          finishAnalysis();
          return;
        }

        if (
          !video.paused &&
          !isEstimatingRef.current &&
          timestamp - lastInferenceAtRef.current >= ANALYSIS_INTERVAL_MS
        ) {
          isEstimatingRef.current = true;
          lastInferenceAtRef.current = timestamp;

          try {
            const poses = await detector.estimatePoses(video);
            const pose = poses[0];

            if (pose && video.videoWidth && video.videoHeight) {
              drawPose(pose, video.videoWidth, video.videoHeight);
              updateSquatResult(pose, video.videoHeight);
            }
          } catch (error) {
            console.error("자세 분석 프레임 처리 실패:", error);
          } finally {
            isEstimatingRef.current = false;
          }
        }

        animationFrameRef.current = window.requestAnimationFrame((nextTimestamp) => {
          void analyzeFrame(nextTimestamp);
        });
      };

      animationFrameRef.current = window.requestAnimationFrame((timestamp) => {
        void analyzeFrame(timestamp);
      });
    } catch (error) {
      console.error("자세 분석 모델 로딩 실패:", error);
      setAnalysisState("error");
      setResult({
        detectedFrames: 0,
        depthStatus: "needsReview",
        deepestHipToKneePercent: null,
        kneeAngleAtDeepest: null,
        torsoTiltAtDeepest: null,
        repetitions: 0,
        reliability: "low",
        feedbacks: [{
          title: "분석 모델을 불러오지 못했어요",
          description: "자세 분석을 시작하기 전에 모델 준비에 실패했습니다.",
          action: "네트워크 연결을 확인한 뒤 다시 시도해주세요.",
        }],
        message: "분석 모델을 불러오지 못했습니다. 네트워크 연결을 확인한 뒤 다시 시도해주세요.",
      });
    }
  }, [clearCanvas, drawPose, finishAnalysis, getDetector, stopAnalysis, updateSquatResult, videoUrl]);

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    stopAnalysis();
    clearCanvas();
    setResult(null);
    setAnalysisState("idle");

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const nextUrl = URL.createObjectURL(file);
    objectUrlRef.current = nextUrl;
    setVideoUrl(nextUrl);
    setFileName(file.name);
  };

  useEffect(() => {
    return () => {
      stopAnalysis();
      detectorRef.current?.dispose();

      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, [stopAnalysis]);

  return (
    <main className="min-h-screen bg-[#0B0F19] px-5 py-10 text-white sm:px-8 lg:px-12">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold tracking-[0.14em] text-[#BFFF0B]">POSE ANALYSIS TEST</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">스쿼트 자세 분석</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
          옆면에서 전신이 보이도록 촬영한 스쿼트 영상을 선택하면, 브라우저에서 관절 스켈레톤, 깊이, 무릎 각도, 상체 기울기와 반복 횟수를 확인할 수 있습니다.
        </p>

        <section className="mt-8 rounded-[28px] border border-white/10 bg-[#121A2B] p-5 sm:p-8">
          <label
            htmlFor="pose-analysis-video"
            className="inline-flex cursor-pointer rounded-xl bg-[#BFFF0B] px-5 py-3 text-sm font-extrabold text-[#0B0F19] transition hover:bg-[#D4FF65]"
          >
            영상 선택하기
          </label>
          <input
            id="pose-analysis-video"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />
          <p className="mt-3 text-sm text-slate-400">
            {fileName || "분석을 위해 영상이 서버에 업로드되지는 않습니다."}
          </p>

          {videoUrl && (
            <div className="mt-6">
              <div className="relative overflow-hidden rounded-2xl bg-black">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="block max-h-[60vh] w-full"
                  onEnded={finishAnalysis}
                >
                  브라우저가 영상 재생을 지원하지 않습니다.
                </video>
                <canvas
                  ref={canvasRef}
                  className="pointer-events-none absolute inset-0 size-full"
                  aria-label="인식된 관절 스켈레톤"
                />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => void startAnalysis()}
                  disabled={analysisState === "loading" || analysisState === "analyzing"}
                  className="rounded-xl bg-[#BFFF0B] px-5 py-3 text-sm font-extrabold text-[#0B0F19] transition hover:bg-[#D4FF65] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {analysisState === "loading" ? "모델 준비 중..." : analysisState === "analyzing" ? "분석 중..." : "자세 분석 시작"}
                </button>
                {analysisState === "analyzing" && (
                  <button
                    type="button"
                    onClick={finishAnalysis}
                    className="rounded-xl border border-white/20 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
                  >
                    분석 종료
                  </button>
                )}
              </div>
            </div>
          )}
        </section>

        {result && (
          <section className="mt-6 rounded-[24px] border border-[#BFFF0B]/30 bg-[#BFFF0B]/10 p-5 sm:p-6">
            <p className="text-sm font-bold text-[#D4FF65]">분석 결과</p>
            <p className="mt-2 text-lg font-black">
              {result.depthStatus === "adequate"
                ? "스쿼트 깊이 감지"
                : result.depthStatus === "near"
                  ? "스쿼트 깊이 근접"
                  : "스쿼트 깊이 확인 필요"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-200">{result.message}</p>
            <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-black/15 p-3">
                <dt className="text-xs text-slate-400">반복 횟수</dt>
                <dd className="mt-1 text-lg font-black">{result.repetitions}회</dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/15 p-3">
                <dt className="text-xs text-slate-400">최저점 골반 위치</dt>
                <dd className="mt-1 text-lg font-black">
                  {result.deepestHipToKneePercent === null ? "측정 불가" : `무릎 기준 ${result.deepestHipToKneePercent}%`}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/15 p-3">
                <dt className="text-xs text-slate-400">최저점 무릎 각도</dt>
                <dd className="mt-1 text-lg font-black">
                  {result.kneeAngleAtDeepest === null ? "측정 불가" : `${result.kneeAngleAtDeepest}°`}
                </dd>
              </div>
              <div className="rounded-xl border border-white/10 bg-black/15 p-3">
                <dt className="text-xs text-slate-400">최저점 상체 기울기</dt>
                <dd className="mt-1 text-lg font-black">
                  {result.torsoTiltAtDeepest === null ? "측정 불가" : `${result.torsoTiltAtDeepest}°`}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-slate-400">
              유효 관절 인식 프레임: {result.detectedFrames}회 · 이 결과는 영상 기반의 참고용 분석이며 전문 트레이너의 판단을 대체하지 않습니다.
            </p>
            <section className="mt-6 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-base font-black">자세 피드백과 수정 방향</h2>
                <span className="rounded-full border border-white/15 bg-black/20 px-3 py-1 text-xs font-bold text-slate-300">
                  분석 신뢰도: {result.reliability === "high" ? "높음" : result.reliability === "medium" ? "보통" : "낮음"}
                </span>
              </div>
              <div className="mt-4 grid gap-3">
                {result.feedbacks.map((feedback) => (
                  <article key={feedback.title} className="rounded-xl border border-white/10 bg-black/15 p-4">
                    <h3 className="font-bold text-[#D4FF65]">{feedback.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-200">{feedback.description}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">수정 방향: {feedback.action}</p>
                  </article>
                ))}
              </div>
            </section>
          </section>
        )}
      </section>
    </main>
  );
}
