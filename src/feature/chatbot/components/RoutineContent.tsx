'use client'

import type { RoutineResponse } from '@/feature/chatbot/type';
import { Download } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'sonner';

interface RoutineCardProps {
    routine: RoutineResponse;
}

export default function RoutineContent({ routine }: RoutineCardProps) {

    const routineRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const handleSaveImage = async () => {
        if (!routineRef.current || isSaving) {
            return;
        }

        try {
            setIsSaving(true);
            const { domToPng } = await import("modern-screenshot");

            const dataUrl = await domToPng(
                routineRef.current, {
                backgroundColor: "#101828",
                scale: 2,
            });

            const anchor = document.createElement("a");

            anchor.href = dataUrl;
            anchor.download = `짐짝루틴추천.png`;
            anchor.click();
            toast.success('이미지 저장에 성공했습니다')

        } catch (error) {
            toast.error('이미지 저장에 실패했습니다')
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <>
            <section ref={routineRef} className="mt-4 rounded-xl border border-[#364153] bg-[#101828] p-4">
                <div>
                    <h3 className="mt-1 text-base font-bold text-[#BFFF0B]">
                        {routine.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#99A1AF]">
                        {routine.summary}
                    </p>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                    {routine.days.map((day, dayIndex) => (
                        <article
                            key={`${day.day_label}-${dayIndex}`}
                            className="rounded-lg border border-[#364153] p-3"
                        >
                            <h4 className="font-bold text-[#BFFF0B]">
                                {day.day_label}
                            </h4>

                            <p className="mt-1 text-sm text-white">
                                {day.goal}
                            </p>

                            {day.warm_up.length > 0 && (
                                <div className="mt-3">
                                    <h5 className="text-xs font-semibold text-[#99A1AF]">
                                        워밍업
                                    </h5>

                                    <ul className="mt-1 list-disc pl-5 text-sm text-white">
                                        {day.warm_up.map((item, index) => (
                                            <li className='text-white' key={`${item}-${index}`}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-3 flex flex-col gap-2">
                                {day.exercises.map((exercise, exerciseIndex) => (
                                    <div
                                        key={`${exercise.name}-${exerciseIndex}`}
                                        className="rounded-md bg-[#1E2939] p-3"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <strong className='text-white'>{exercise.name}</strong>
                                            <span className="text-xs text-[#99A1AF]">
                                                {exercise.part}
                                            </span>
                                        </div>

                                        <p className="mt-1 text-sm text-white">
                                            {exercise.sets}세트 · {exercise.reps} · {exercise.intensity}
                                        </p>

                                        <p className="text-xs text-[#99A1AF]">
                                            휴식 {exercise.rest_seconds}초
                                        </p>

                                        <p className="mt-2 text-xs text-[#99A1AF]">
                                            {exercise.rationale}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {day.cool_down.length > 0 && (
                                <div className="mt-3">
                                    <h5 className="text-xs font-semibold text-[#99A1AF]">
                                        마무리 운동
                                    </h5>

                                    <ul className="mt-1 list-disc pl-5 text-sm">
                                        {day.cool_down.map((item, index) => (
                                            <li className='text-white' key={`${item}-${index}`}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </article>
                    ))}
                </div>

                {routine.cautions.length > 0 && (
                    <div className="mt-4">
                        <h4 className="text-sm font-bold text-amber-400">
                            주의사항
                        </h4>

                        <ul className="mt-1 list-disc pl-5 text-sm">
                            {routine.cautions.map((caution, index) => (
                                <li className='text-white' key={`${caution}-${index}`}>{caution}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>
            <button
                type="button"
                onClick={handleSaveImage}
                disabled={isSaving}
                className="
                    mt-2 flex items-center gap-1
                    text-xs text-[#6A7282]
                    transition-colors
                    hover:text-white
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                "
            >
                <Download size={14} />

                {isSaving
                    ? "이미지 생성 중..."
                    : "루틴 이미지 저장"}
            </button>
        </>
    );
}