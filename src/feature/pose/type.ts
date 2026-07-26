export type AnalysisState = "idle" | "loading" | "validating" | "analyzing" | "complete" | "unavailable" | "invalid" | "error";
export type ExerciseType = "squat" | "lunge" | "deadlift" | "pushup" | "plank";

export const EXERCISE_OPTIONS: Record<ExerciseType, {
  label: string;
  description: string;
  cameraGuide: string;
  analysisMode: "repetition" | "hold";
}> = {
  squat: {
    label: "스쿼트",
    description: "골반 높이, 무릎 각도, 상체 기울기와 반복 횟수를 확인합니다.",
    cameraGuide: "카메라를 옆면에 고정하고, 머리부터 발목까지 전신이 보이게 촬영하세요.",
    analysisMode: "repetition",
  },
  lunge: {
    label: "런지",
    description: "하강·상승 움직임과 무릎 각도, 상체 기울기를 참고용으로 확인합니다.",
    cameraGuide: "앞·뒤 발과 상체가 함께 보이도록 옆면에서 촬영하세요.",
    analysisMode: "repetition",
  },
  deadlift: {
    label: "데드리프트",
    description: "힙 힌지 움직임, 상체 기울기와 반복 횟수를 참고용으로 확인합니다.",
    cameraGuide: "바벨 또는 손, 골반, 발목이 모두 보이도록 옆면에서 촬영하세요.",
    analysisMode: "repetition",
  },
  pushup: {
    label: "팔굽혀펴기",
    description: "상체 하강·상승 움직임, 팔꿈치 각도와 몸통 기울기를 참고용으로 확인합니다.",
    cameraGuide: "머리부터 발목까지 바닥과 평행하게 보이도록 옆면에서 촬영하세요.",
    analysisMode: "repetition",
  },
  plank: {
    label: "플랭크",
    description: "유효 관절이 유지된 시간과 몸통 기울기를 참고용으로 확인합니다.",
    cameraGuide: "어깨, 골반, 발목이 가려지지 않도록 옆면에서 촬영하세요.",
    analysisMode: "hold",
  },
};

export interface PoseFeedback {
  title: string;
  description: string;
  action: string;
}

export interface AnalysisResult {
  exercise: ExerciseType;
  detectedFrames: number;
  depthStatus: "adequate" | "near" | "needsReview";
  deepestHipToKneePercent: number | null;
  kneeAngleAtDeepest: number | null;
  torsoTiltAtDeepest: number | null;
  repetitions: number;
  holdDurationMs: number;
  reliability: "high" | "medium" | "low";
  feedbacks: PoseFeedback[];
  message: string;
}

export interface AnalysisAccumulator {
  detectedFrames: number;
  deepestHipToKneeRatio: number | null;
  kneeAngleAtDeepest: number | null;
  torsoTiltAtDeepest: number | null;
  repetitions: number;
  holdDurationMs: number;
  topHipY: number | null;
  bottomHipY: number | null;
  motionPhase: "ready" | "descending" | "ascending";
}

export interface Keypoint {
  x: number;
  y: number;
  score?: number;
  name?: string;
}

export interface Pose {
  keypoints: Keypoint[];
}

export interface PoseDetector {
  estimatePoses(video: HTMLVideoElement): Promise<Pose[]>;
  dispose(): void;
}

export interface MoveNetDetectorModule {
  load(config: {
    modelType: string;
    enableSmoothing: boolean;
    minPoseScore: number;
  }): Promise<PoseDetector>;
}
