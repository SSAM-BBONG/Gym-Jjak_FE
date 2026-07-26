import type { AnalysisState } from "@/feature/pose/type";

interface PoseAnalysisStatusProps {
  analysisState: AnalysisState;
}

const STATUS_COPY: Partial<Record<AnalysisState, { title: string; description: string }>> = {
  loading: {
    title: "분석을 위한 AI를 준비하고 있습니다.",
    description: "처음 실행할 때는 모델을 불러오는 데 잠시 시간이 걸릴 수 있어요.",
  },
  validating: {
    title: "선택한 운동과 영상이 맞는지 확인하고 있습니다.",
    description: "관절 위치와 몸통 방향을 먼저 확인한 뒤 분석을 시작해요.",
  },
  analyzing: {
    title: "AI가 관절 움직임을 분석하고 있습니다.",
    description: "영상 길이에 따라 분석 결과가 표시되기까지 시간이 걸릴 수 있어요.",
  },
};

export default function PoseAnalysisStatus({ analysisState }: PoseAnalysisStatusProps) {
  const status = STATUS_COPY[analysisState];

  if (!status) return null;

  return (
    <div role="status" className="mt-5 flex items-center gap-3 rounded-2xl border border-[#BFFF0B]/25 bg-[#BFFF0B]/10 px-4 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#BFFF0B] text-[#0B0F19]" aria-hidden="true">
        <span className="size-3 animate-ping rounded-full bg-[#0B0F19]" />
      </span>
      <div>
        <p className="text-sm font-extrabold text-[#D4FF65]">{status.title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-300">{status.description}</p>
      </div>
    </div>
  );
}
