import type { RoutineResponse } from '@/feature/chatbot/type';

interface RoutineCardProps {
    routine: RoutineResponse;
}

export default function RoutineContent({ routine }: RoutineCardProps) {
    return (
        <section className="mt-4 rounded-xl border border-[#364153] bg-[#101828] p-4">
            <div>
                <span className="text-xs font-semibold text-[#BFFF0B]">
                    {routine.status}
                </span>

                <h3 className="mt-1 text-base font-bold text-white">
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

                                <ul className="mt-1 list-disc pl-5 text-sm">
                                    {day.warm_up.map((item, index) => (
                                        <li key={`${item}-${index}`}>{item}</li>
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
                                        <strong>{exercise.name}</strong>
                                        <span className="text-xs text-[#99A1AF]">
                                            {exercise.part}
                                        </span>
                                    </div>

                                    <p className="mt-1 text-sm">
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
                                        <li key={`${item}-${index}`}>{item}</li>
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
                            <li key={`${caution}-${index}`}>{caution}</li>
                        ))}
                    </ul>
                </div>
            )}
        </section>
    );
}