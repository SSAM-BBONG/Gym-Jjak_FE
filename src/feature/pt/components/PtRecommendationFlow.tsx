"use client";

import { getPtRecommendationAction } from "@/feature/pt/actions";
import type {
  PainOnset,
  PtRecommendationData,
  PtRecommendationTargetPart,
} from "@/feature/pt/type";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Dumbbell,
  LoaderCircle,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import { toast } from "sonner";

const parts: { label: string; value: PtRecommendationTargetPart }[] = [
  { label: "가슴", value: "CHEST" },
  { label: "등", value: "BACK" },
  { label: "어깨", value: "SHOULDER" },
  { label: "팔", value: "ARM" },
  { label: "복근", value: "ABS" },
  { label: "코어", value: "CORE" },
  { label: "하체", value: "LEG" },
  { label: "둔근", value: "GLUTE" },
  { label: "전신", value: "FULL_BODY" },
];

const onsets: { label: string; value: PainOnset }[] = [
  { label: "최근에 다쳤어요", value: "ACUTE" },
  { label: "회복 중이에요", value: "SUBACUTE" },
  { label: "오래전부터 있어요", value: "CHRONIC" },
];

const distances = [
  "가까운 동네",
  "인근 지역",
  "같은 시·군·구",
  "조금 더 넓게",
  "거리 무관",
];

export default function PtRecommendationFlow() {
  const [step, setStep] = useState(1);
  const [targetParts, setTargetParts] = useState<PtRecommendationTargetPart[]>([]);
  const [distanceLevel, setDistanceLevel] = useState(3);
  const [painArea, setPainArea] = useState("");
  const [painOnset, setPainOnset] = useState<PainOnset | null>(null);
  const [result, setResult] = useState<PtRecommendationData | null>(null);
  const [isPending, setIsPending] = useState(false);

  const recommend = async (hasPain: boolean) => {
    setIsPending(true);

    const response = await getPtRecommendationAction({
      targetParts,
      distanceLevel,
      hasPain,
      painArea: hasPain ? painArea : null,
      painOnset: hasPain ? painOnset : null,
    });

    setIsPending(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setResult(response.data);
    setStep(5);
  };

  const togglePart = (part: PtRecommendationTargetPart) => {
    setTargetParts((current) =>
      current.includes(part)
        ? current.filter((item) => item !== part)
        : [...current, part]
    );
  };

  const reset = () => {
    setStep(1);
    setTargetParts([]);
    setDistanceLevel(3);
    setPainArea("");
    setPainOnset(null);
    setResult(null);
  };

  return (
    <main className="min-h-[calc(100vh-70px)] bg-[#0B0F19] px-5 py-10 text-white sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#121a2b] shadow-2xl shadow-black/20">
          <header className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(191,255,11,.18),transparent_42%)] px-6 py-8 sm:px-10">
            <p className="inline-flex items-center gap-2 text-xs font-black tracking-[0.14em] text-[#cfff4a]">
              <Sparkles className="size-4" />
              FREE AI PT MATCHING
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
              {step === 5
                ? "AI가 맞춤 PT를 골랐어요"
                : "몇 가지 질문으로 딱 맞는 PT를 찾아드릴게요"}
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              조건 필터링 후 AI가 회원님의 운동 정보와 트레이너 소개를 종합해 추천 이유를 알려드려요.
            </p>
            {step < 5 && (
              <div className="mt-7 flex gap-2" aria-label={`진행 단계 ${step} / 4`}>
                {[1, 2, 3, 4].map((item) => (
                  <span
                    key={item}
                    className={`h-1.5 flex-1 rounded-full ${item <= step ? "bg-[#bfff0b]" : "bg-white/10"}`}
                  />
                ))}
              </div>
            )}
          </header>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            {step === 1 && (
              <Question number="01" title="어느 부위를 집중적으로 운동하고 싶나요?" description="여러 개를 선택할 수 있어요.">
                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {parts.map((part) => {
                    const selected = targetParts.includes(part.value);

                    return (
                      <button key={part.value} type="button" onClick={() => togglePart(part.value)} aria-pressed={selected} className={`flex items-center justify-between rounded-xl border px-4 py-4 text-left text-sm font-bold transition ${selected ? "border-[#bfff0b] bg-[#bfff0b] text-[#0b0f19]" : "border-white/10 bg-white/5 text-slate-200 hover:border-white/30"}`}>
                        {part.label}
                        {selected && <Check className="size-4" />}
                      </button>
                    );
                  })}
                </div>
              </Question>
            )}

            {step === 2 && (
              <Question number="02" title="어디까지 이동할 수 있나요?" description="회원님의 온보딩 선호 지역을 기준으로 후보를 찾습니다.">
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="flex justify-between gap-3">
                    <strong className="text-xl text-[#cfff4a]">{distances[distanceLevel - 1]}</strong>
                    <span className="text-sm text-slate-400">거리 단계 {distanceLevel} / 5</span>
                  </div>
                  <input className="mt-8 w-full accent-[#bfff0b]" type="range" min="1" max="5" value={distanceLevel} onChange={(event) => setDistanceLevel(Number(event.target.value))} aria-label="희망 거리" />
                  <div className="mt-3 flex justify-between text-xs text-slate-500"><span>가까운 동네</span><span>거리 무관</span></div>
                </div>
              </Question>
            )}

            {step === 3 && <PainQuestion isPending={isPending} onNoPain={() => void recommend(false)} onHasPain={() => setStep(4)} />}

            {step === 4 && <PainDetails painArea={painArea} painOnset={painOnset} onPainAreaChange={setPainArea} onPainOnsetChange={setPainOnset} />}

            {step === 5 && <RecommendationResults result={result} onReset={reset} />}

            {step < 3 && <StepNavigation step={step} canContinue={step !== 1 || targetParts.length > 0} onPrevious={() => setStep((current) => current - 1)} onNext={() => setStep((current) => current + 1)} />}
            {step === 3 && <button type="button" disabled={isPending} onClick={() => setStep(2)} className="mt-10 inline-flex items-center gap-1 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 hover:text-white disabled:opacity-50"><ArrowLeft className="size-4" />이전</button>}
            {step === 4 && <div className="mt-10 flex justify-between"><button type="button" onClick={() => setStep(3)} className="inline-flex items-center gap-1 rounded-xl px-4 py-3 text-sm font-bold text-slate-400"><ArrowLeft className="size-4" />이전</button><button type="button" disabled={isPending} onClick={() => void recommend(true)} className="inline-flex items-center gap-2 rounded-xl bg-[#bfff0b] px-5 py-3 text-sm font-extrabold text-[#0b0f19] disabled:opacity-50">{isPending ? "추천 분석 중" : "AI 추천 받기"}{isPending && <LoaderCircle className="size-4 animate-spin" />}</button></div>}
          </div>
        </section>
      </div>
    </main>
  );
}

function Question({ number, title, description, children 
}: { number: string; title: string; description: string; children: ReactNode }) {
  return (
          <section>
            <p className="text-sm font-black text-[#cfff4a]">
              QUESTION
              {number}
            </p>
            <h2 className="mt-2 text-2xl font-black">{title}</h2>
            <p className="mt-2 text-sm text-slate-400">{description}</p>
            {children}
          </section>
        )
}

function PainQuestion({ isPending, onNoPain, onHasPain 
}: { isPending: boolean; onNoPain: () => void; onHasPain: () => void }) {
  return (
   <Question number="03" title="현재 통증이나 부상이 있나요?" description="안전한 운동 방향을 고려하기 위해 확인해요.">
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button 
            type="button" 
            disabled={isPending} 
            onClick={onNoPain} 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-[#bfff0b] disabled:opacity-60"
          >
            <strong className="text-lg">없어요</strong>
            <p className="mt-2 text-sm text-slate-400">바로 AI 추천 결과를 확인할게요.</p>
          </button>
          <button 
            type="button" 
            onClick={onHasPain} 
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover:border-[#bfff0b]">
              <strong className="text-lg">있어요</strong>
              <p className="mt-2 text-sm text-slate-400">통증 부위와 시기를 더 알려주세요.</p>
          </button>
        </div>
          {isPending && <Loading />}
    </Question>
  )
}

function PainDetails({ painArea, painOnset, onPainAreaChange, onPainOnsetChange 
}: { painArea: string; painOnset: PainOnset | null; onPainAreaChange: (value: string) => void; onPainOnsetChange: (value: PainOnset) => void }) {
  return ( 
  <Question 
    number="03-1, 03-2" 
    title="통증 상태를 조금 더 알려주세요" 
    description="의료 진단을 대신하지 않으며 운동 전 전문가와 현재 상태를 상의해주세요."
  >
    <label className="mt-7 block text-sm font-bold" htmlFor="pain-area">
      통증 발생 부위
      <input 
        id="pain-area"
        value={painArea}
        onChange={(event) => onPainAreaChange(event.target.value)} 
        placeholder="예: 무릎, 허리, 어깨" 
        className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none placeholder:text-slate-500 focus:border-[#bfff0b]" />
      </label>
      <fieldset className="mt-6">
        <legend className="text-sm font-bold">통증 발생 시기</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {onsets.map((onset) => (
            <button 
              key={onset.value} 
              type="button" 
              onClick={() => onPainOnsetChange(onset.value)} 
              aria-pressed={painOnset === onset.value} 
              className={`rounded-xl border p-4 text-left text-sm font-bold ${painOnset === onset.value ? "border-[#bfff0b] bg-[#bfff0b]/15" : "border-white/10 bg-white/5 hover:border-white/30"}`}
            >
              {onset.label}
            </button>
           ))}
        </div>
      </fieldset>
    </Question>
  )
}

function RecommendationResults({ result, onReset 
}: { result: PtRecommendationData | null; onReset: () => void }) {
  return (
  <section aria-live="polite">
    {result?.recommendations.length 
    ? 
    <div className="space-y-4">
      {result.recommendations.map((item, index) => 
        (<article 
          key={item.courseId}
          className="rounded-2xl border border-[#bfff0b]/25 bg-[linear-gradient(135deg,rgba(191,255,11,.12),rgba(255,255,255,.04))] p-5 sm:p-6">
            <div className="flex justify-between gap-4">
              <div>
                <p className="text-xs font-black tracking-[0.14em] text-[#cfff4a]">AI PICK {index + 1}</p>
                <h2 className="mt-2 text-xl font-black">{item.courseName}</h2>
                <p className="mt-1 text-sm font-bold text-slate-300">{item.trainerName} 트레이너</p>
              </div>
              <Dumbbell className="size-7 shrink-0 text-[#cfff4a]" />
            </div>
            <p className="mt-5 border-l-2 border-[#bfff0b] pl-4 text-sm leading-6 text-slate-200">{item.reason}</p>
            <Link 
              href={`/pt/${item.courseId}`} 
              className="mt-5 inline-flex items-center gap-1 text-sm font-extrabold text-[#cfff4a] hover:text-white"
            >
              PT 상세 보기 
              <ArrowRight className="size-4" /></Link></article>
        ))}
      </div>
     : 
     <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-xl font-black">조건에 맞는 PT를 찾지 못했어요</h2>
        <p className="mt-2 text-sm text-slate-400">희망 거리를 넓히거나 운동 부위를 다시 선택해 보세요.</p>
      </div>
    }
    <button 
      type="button" 
      onClick={onReset} 
      className="mt-7 w-full rounded-xl border border-white/15 py-3.5 text-sm font-extrabold hover:border-[#bfff0b] hover:text-[#cfff4a]"
    >
      조건 다시 입력하기
    </button>
  </section>
  )
}

function StepNavigation({ step, canContinue, onPrevious, onNext 
}: { step: number; canContinue: boolean; onPrevious: () => void; onNext: () => void }) {
  return (    
  <div className="mt-10 flex justify-between">
    <button 
      type="button" 
      disabled={step === 1} 
      onClick={onPrevious} 
      className="inline-flex items-center gap-1 rounded-xl px-4 py-3 text-sm font-bold text-slate-400 disabled:invisible"
    >
      <ArrowLeft className="size-4" />
      이전
    </button>
    <button 
      type="button" 
      disabled={!canContinue} 
      onClick={onNext} 
      className="inline-flex items-center gap-2 rounded-xl bg-[#bfff0b] px-5 py-3 text-sm font-extrabold text-[#0b0f19] disabled:opacity-40"
    >
      다음 
      <ArrowRight className="size-4" />
    </button>
  </div>
  )
}

function Loading() {
  return ( 
  <div className="mt-7 flex items-center justify-center gap-3 text-sm font-bold text-[#cfff4a]">
    <LoaderCircle className="size-5 animate-spin" />
    AI가 조건에 맞는 트레이너를 찾고 있어요.
  </div>
  )
}
