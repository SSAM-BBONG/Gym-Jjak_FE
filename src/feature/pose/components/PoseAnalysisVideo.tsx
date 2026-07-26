import type { RefObject } from "react";

import PoseAnalysisStatus from "@/feature/pose/components/PoseAnalysisStatus";
import type { AnalysisState } from "@/feature/pose/type";

interface PoseAnalysisVideoProps {
  videoUrl: string;
  videoRef: RefObject<HTMLVideoElement | null>;
  canvasRef: RefObject<HTMLCanvasElement | null>;
  analysisState: AnalysisState;
  validationMessage: string | null;
  onStart: () => void;
  onFinish: () => void;
}

export default function PoseAnalysisVideo({
  videoUrl,
  videoRef,
  canvasRef,
  analysisState,
  validationMessage,
  onStart,
  onFinish,
}: PoseAnalysisVideoProps) {
  return (
    <div className="mt-6">
      <div className="relative overflow-hidden rounded-2xl bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          controls
          playsInline
          preload="metadata"
          className="block max-h-[60vh] w-full"
          onEnded={onFinish}
        >
          브라우저가 영상 재생을 지원하지 않습니다.
        </video>
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 size-full"
          aria-label="인식된 관절 스켈레톤"
        />
      </div>
      <PoseAnalysisStatus analysisState={analysisState} />

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onStart}
          disabled={analysisState === "loading" || analysisState === "validating" || analysisState === "analyzing"}
          className="rounded-xl bg-[#BFFF0B] px-5 py-3 text-sm font-extrabold text-[#0B0F19] transition hover:bg-[#D4FF65] disabled:cursor-not-allowed disabled:opacity-60"
        >
          자세 분석 시작
        </button>
        {analysisState === "analyzing" && (
          <button
            type="button"
            onClick={onFinish}
            className="rounded-xl border border-white/20 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
          >
            분석 종료
          </button>
        )}
      </div>
      {validationMessage && (
        <p className="mt-4 rounded-xl border border-rose-300/30 bg-rose-500/10 px-4 py-3 text-sm leading-6 text-rose-100">
          {validationMessage}
        </p>
      )}
    </div>
  );
}
