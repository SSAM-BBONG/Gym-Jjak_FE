"use client";

import { createTrainerRoutineRecommendationAction } from "@/feature/pt/actions";
import type {
  TrainerRoutineGender,
  TrainerRoutineGoal,
  TrainerRoutineRecommendationData,
} from "@/feature/pt/type";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";

interface PtManageRoutineRecommendationProps {
  memberId: number;
  nickname: string;
}

const GOAL_OPTIONS: { value: TrainerRoutineGoal; label: string }[] = [
  { value: "WEIGHT_LOSS", label: "체중 감량" },
  { value: "MUSCLE_GAIN", label: "근육 증가" },
  { value: "STRENGTH", label: "근력 향상" },
  { value: "HEALTH", label: "건강 관리" },
  { value: "REHABILITATION", label: "재활 운동" },
];

export default function PtManageRoutineRecommendation({
  memberId,
  nickname,
}: PtManageRoutineRecommendationProps) {
  const [gender, setGender] = useState<TrainerRoutineGender>("UNSPECIFIED");
  const [age, setAge] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [goal, setGoal] = useState<TrainerRoutineGoal>("MUSCLE_GAIN");
  const [recommendation, setRecommendation] =
    useState<TrainerRoutineRecommendationData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await createTrainerRoutineRecommendationAction(memberId, {
        gender,
        age: Number(age),
        heightCm: Number(heightCm),
        weightKg: Number(weightKg),
        goal,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setRecommendation(result.data);
      toast.success(result.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-[16px] border border-[#1E2939] bg-[#101828] p-4 sm:p-5 lg:p-6">
      <div>
        <p className="text-sm font-extrabold text-[#BFFF0B]">AI 루틴 분석</p>
        <h2 className="mt-1 text-xl font-black text-white">{nickname}님의 맞춤 운동 루틴</h2>
        <p className="mt-2 text-sm text-[#99A1AF]">
          최근 운동일지와 아래 정보를 바탕으로 AI가 지도용 루틴 초안을 추천합니다.
          입력값과 추천 결과는 저장되지 않습니다.
        </p>
      </div>

      <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={handleSubmit}>
        <label className="flex flex-col gap-2 text-sm font-bold text-white">
          성별
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value as TrainerRoutineGender)}
            className="rounded-[10px] border border-[#364153] bg-[#1E2939] px-3 py-2.5 text-sm text-white outline-none focus:border-[#BFFF0B]"
          >
            <option value="UNSPECIFIED">응답하지 않음</option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
          </select>
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-white">
          만 나이
          <input
            type="number"
            min="14"
            max="100"
            required
            value={age}
            onChange={(event) => setAge(event.target.value)}
            placeholder="예: 28"
            className="rounded-[10px] border border-[#364153] bg-[#1E2939] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#BFFF0B]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-white">
          키(cm)
          <input
            type="number"
            min="0.1"
            max="300"
            step="0.1"
            required
            value={heightCm}
            onChange={(event) => setHeightCm(event.target.value)}
            placeholder="예: 175.5"
            className="rounded-[10px] border border-[#364153] bg-[#1E2939] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#BFFF0B]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-white">
          체중(kg)
          <input
            type="number"
            min="0.1"
            max="500"
            step="0.1"
            required
            value={weightKg}
            onChange={(event) => setWeightKg(event.target.value)}
            placeholder="예: 72.3"
            className="rounded-[10px] border border-[#364153] bg-[#1E2939] px-3 py-2.5 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#BFFF0B]"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-bold text-white sm:col-span-2">
          이번 루틴 목표
          <select
            value={goal}
            onChange={(event) => setGoal(event.target.value as TrainerRoutineGoal)}
            className="rounded-[10px] border border-[#364153] bg-[#1E2939] px-3 py-2.5 text-sm text-white outline-none focus:border-[#BFFF0B]"
          >
            {GOAL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-[10px] bg-[#BFFF0B] px-5 py-3 text-sm font-extrabold text-black transition-colors hover:bg-[#d2ff4d] disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2 sm:justify-self-start"
        >
          {isSubmitting ? "루틴 분석 중..." : "맞춤 루틴 분석하기"}
        </button>
      </form>

      {recommendation && (
        <div className="mt-6 border-t border-[#364153] pt-5">
          <span className="rounded-full bg-[#BFFF0B33] px-3 py-1 text-xs font-extrabold text-[#BFFF0B]">
            {recommendation.status === "LIMITED" ? "제한적 추천" : "분석 완료"}
          </span>
          <h3 className="mt-3 text-lg font-black text-white">{recommendation.title}</h3>
          <p className="mt-2 text-sm text-[#99A1AF]">{recommendation.summary}</p>

          {recommendation.missingData.length > 0 && (
            <p className="mt-3 rounded-[10px] border border-amber-400/30 bg-amber-400/10 p-3 text-sm text-amber-200">
              부족한 정보: {recommendation.missingData.join(", ")}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-4">
            {recommendation.days.map((day) => (
              <article key={day.dayLabel} className="rounded-[12px] border border-[#364153] p-4">
                <p className="text-sm font-extrabold text-[#BFFF0B]">{day.dayLabel}</p>
                <h4 className="mt-1 font-bold text-white">{day.goal}</h4>

                {day.warmUp.length > 0 && <RoutineList title="워밍업" items={day.warmUp} />}

                <div className="mt-4 flex flex-col gap-2">
                  {day.exercises.map((exercise, index) => (
                    <div key={`${exercise.name}-${index}`} className="rounded-[10px] bg-[#1E2939] p-3">
                      <div className="flex items-center justify-between gap-2">
                        <strong className="text-sm text-white">{exercise.name}</strong>
                        <span className="text-xs text-[#99A1AF]">{exercise.part}</span>
                      </div>
                      <p className="mt-1 text-sm text-white">
                        {exercise.sets}세트 · {exercise.reps} · {exercise.intensity}
                      </p>
                      <p className="mt-1 text-xs text-[#99A1AF]">세트 간 휴식 {exercise.restSeconds}초</p>
                      <p className="mt-2 text-xs text-[#99A1AF]">{exercise.rationale}</p>
                    </div>
                  ))}
                </div>

                {day.coolDown.length > 0 && <RoutineList title="쿨다운" items={day.coolDown} />}
              </article>
            ))}
          </div>

          {recommendation.cautions.length > 0 && <RoutineList title="주의사항" items={recommendation.cautions} />}

          {recommendation.sources.length > 0 && (
            <div className="mt-4 text-xs text-[#99A1AF]">
              참고 자료: {recommendation.sources.map((source) => source.title).join(", ")}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

function RoutineList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-bold text-[#99A1AF]">{title}</p>
      <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-white">
        {items.map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
