export default function PoseAnalysisHeader() {
  return (
    <header>
      <div className="flex items-center gap-3">
        <p className="text-sm font-bold tracking-[0.14em] text-[#BFFF0B]">POSE ANALYSIS</p>
        <span className="rounded-full border border-[#BFFF0B]/50 bg-[#BFFF0B] px-2.5 py-1 text-[11px] font-black tracking-[0.12em] text-[#121A2B] shadow-[0_0_18px_rgba(191,255,11,0.35)]">
          BETA VERSION
        </span>
      </div>
      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">운동 자세 분석</h1>
      <div className="mt-4 flex items-start gap-3 rounded-2xl border border-[#BFFF0B]/40 bg-[#BFFF0B]/10 px-4 py-3 shadow-[0_0_24px_rgba(191,255,11,0.08)]">
        <span className="mt-0.5 rounded-md bg-[#BFFF0B] px-2 py-1 text-[10px] font-black tracking-[0.1em] text-[#121A2B]">BETA</span>
        <p className="text-sm font-semibold leading-6 text-[#EEFFD0] sm:text-base">
          해당 기능은 베타 버전입니다. 분석 정확도가 낮거나 결과가 실제 자세와 다를 수 있습니다.
        </p>
      </div>
      <p className="mt-2 max-w-2xl text-xs leading-5 text-slate-400">
        영상은 브라우저에서만 처리되며, 결과는 의료적 진단이나 전문 트레이너의 판단을 대체하지 않습니다.
      </p>
    </header>
  );
}
