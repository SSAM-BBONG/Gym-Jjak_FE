import type { ChangeEvent } from "react";

import { EXERCISE_OPTIONS, type ExerciseType } from "@/feature/pose/type";

interface ExerciseSelectorProps {
  exercise: ExerciseType;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export default function ExerciseSelector({ exercise, onChange }: ExerciseSelectorProps) {
  // 현재 운동 정보
  const selectedExercise = EXERCISE_OPTIONS[exercise];

  return (
    <div className="mb-6 rounded-2xl border border-white/10 bg-black/15 p-4">
      <label htmlFor="pose-analysis-exercise" className="text-sm font-bold text-white">
        분석할 운동
      </label>
      <select
        id="pose-analysis-exercise"
        value={exercise}
        onChange={onChange}
        className="mt-2 block w-full rounded-xl border border-white/15 bg-[#0B0F19] px-4 py-3 text-sm font-bold text-white outline-none focus:border-[#BFFF0B]"
      >
        {/* 옵션 목록 생성 */}
        {/* Object.entries 통해서 객체 -> 배열로 변환 */}
        {Object.entries(EXERCISE_OPTIONS).map(([value, option]) => (
          <option key={value} value={value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* 선택한 값에 따라서 안내 문구 및 촬영 가이드 달라지도록 구현 */}
      <p className="mt-3 text-sm leading-6 text-slate-300">{selectedExercise.description}</p>
      <p className="mt-1 text-xs leading-5 text-[#D4FF65]">촬영 가이드: {selectedExercise.cameraGuide}</p>
    </div>
  );
}
