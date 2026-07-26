import type { ChangeEvent } from "react";

interface PoseAnalysisUploaderProps {
  fileName: string;
  onVideoChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function PoseAnalysisUploader({ fileName, onVideoChange }: PoseAnalysisUploaderProps) {
  return (
    <>
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
        onChange={onVideoChange}
      />
      <p className="mt-3 text-sm text-slate-400">
        {fileName || "분석을 위해 영상이 서버에 업로드되지는 않습니다."}
      </p>
    </>
  );
}
