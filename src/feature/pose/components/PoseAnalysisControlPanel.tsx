import type { ChangeEvent, RefObject } from "react";

import ExerciseSelector from "@/feature/pose/components/ExerciseSelector";
import PoseAnalysisUploader from "@/feature/pose/components/PoseAnalysisUploader";
import PoseAnalysisVideo from "@/feature/pose/components/PoseAnalysisVideo";
import type { AnalysisState, ExerciseType } from "@/feature/pose/type";

interface PoseAnalysisControlPanelProps {
  exercise: ExerciseType;
  fileName: string;
  videoUrl: string | null;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  analysisState: AnalysisState;
  validationMessage: string | null;
  onExerciseChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onVideoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onStart: () => void;
  onFinish: () => void;
}

export default function PoseAnalysisControlPanel({
  exercise,
  fileName,
  videoUrl,
  videoRef,
  canvasRef,
  analysisState,
  validationMessage,
  onExerciseChange,
  onVideoChange,
  onStart,
  onFinish,
}: PoseAnalysisControlPanelProps) {
  return (
    <section className="mt-8 rounded-[24px] border border-white/10 bg-black/15 p-5 sm:p-6">
      {/* 분석할 운동 설정 */}
      <ExerciseSelector exercise={exercise} onChange={onExerciseChange} />

      {/* 영상 업로드 */}
      <PoseAnalysisUploader fileName={fileName} onVideoChange={onVideoChange} />

      {/* 영상 업로드 후 URL이 생성될 시 나타나는 분석 컴포넌트 */}
      {videoUrl && (
        <PoseAnalysisVideo
          videoUrl={videoUrl}
          videoRef={videoRef}
          canvasRef={canvasRef}
          analysisState={analysisState}
          validationMessage={validationMessage}
          onStart={onStart}
          onFinish={onFinish}
        />
      )}
    </section>
  );
}
