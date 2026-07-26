import { EXERCISE_OPTIONS, type AnalysisResult } from "@/feature/pose/type";

interface PoseAnalysisResultProps {
  result: AnalysisResult;
}

export default function PoseAnalysisResult({ result }: PoseAnalysisResultProps) {
  const exercise = EXERCISE_OPTIONS[result.exercise];
  const isPlank = exercise.analysisMode === "hold";
  const resultTone = result.reliability === "low" || (!isPlank && result.depthStatus === "needsReview")
    ? {
        container: "border-rose-400/40 bg-rose-500/10",
        accent: "text-rose-200",
        badge: "border-rose-300/30 bg-rose-500/15 text-rose-100",
        label: "재촬영 또는 자세 확인 필요",
      }
    : result.reliability === "medium" || (!isPlank && result.depthStatus === "near")
      ? {
          container: "border-amber-300/40 bg-amber-400/10",
          accent: "text-amber-100",
          badge: "border-amber-200/30 bg-amber-300/15 text-amber-50",
          label: "참고용 결과 · 추가 확인 권장",
        }
      : {
          container: "border-[#BFFF0B]/30 bg-[#BFFF0B]/10",
          accent: "text-[#D4FF65]",
          badge: "border-[#BFFF0B]/30 bg-[#BFFF0B]/10 text-[#D4FF65]",
          label: "참고용 분석 결과",
        };

  return (
    <section className={`mt-6 rounded-[24px] border p-5 sm:p-6 ${resultTone.container}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className={`text-sm font-bold ${resultTone.accent}`}>분석 결과</p>
        <span className={`rounded-full border px-3 py-1 text-xs font-bold ${resultTone.badge}`}>
          {resultTone.label}
        </span>
      </div>
      <p className="mt-2 text-lg font-black">
        {isPlank
          ? "플랭크 유지 구간 감지"
          : result.depthStatus === "adequate"
            ? `${exercise.label} 움직임 감지`
            : result.depthStatus === "near"
              ? `${exercise.label} 움직임 근접`
              : `${exercise.label} 움직임 확인 필요`}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-200">{result.message}</p>
      <dl className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-black/15 p-3">
          <dt className="text-xs text-slate-400">{isPlank ? "유지 시간" : "반복 횟수"}</dt>
          <dd className="mt-1 text-lg font-black">
            {isPlank ? `${(result.holdDurationMs / 1000).toFixed(1)}초` : `${result.repetitions}회`}
          </dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/15 p-3">
          <dt className="text-xs text-slate-400">{isPlank ? "몸통 기준" : "최대 하강 골반 위치"}</dt>
          <dd className="mt-1 text-lg font-black">
            {isPlank ? "어깨-골반-발목" : result.deepestHipToKneePercent === null ? "측정 불가" : `무릎 기준 ${result.deepestHipToKneePercent}%`}
          </dd>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/15 p-3">
          <dt className="text-xs text-slate-400">{isPlank ? "유효 관절 프레임" : "최대 하강 무릎 각도"}</dt>
          <dd className="mt-1 text-lg font-black">
            {isPlank ? `${result.detectedFrames}회` : result.kneeAngleAtDeepest === null ? "측정 불가" : `${result.kneeAngleAtDeepest}°`}
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
              <h3 className={`font-bold ${resultTone.accent}`}>{feedback.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-200">{feedback.description}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">수정 방향: {feedback.action}</p>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}
