'use client';

import useModal from "@/components/hooks/useModal";
import GoalCreateModal from "./GoalCreateModal";
import GoalViewModal from "./GoalViewModal";

interface NutrientGoal {
    current: number;
    target: number;
}

export interface MealGoalCardProps {
    calories: NutrientGoal;
    carbohydrates: NutrientGoal;
    protein: NutrientGoal;
    fat: NutrientGoal;
}

interface NutrientItemProps extends NutrientGoal {
    label: string;
    unit: 'g';
}

const calculateProgress = (current: number, target: number) => {
    if (target <= 0) return 0;

    return Math.min((current / target) * 100, 100);
};

function NutrientItem({ label, current, target, unit }: NutrientItemProps) {
    const progress = calculateProgress(current, target);

    return (
        <div className="min-w-0 rounded-lg bg-[#1E293980] px-3 py-3 md:px-4 md:py-4">
            <div className="flex items-end justify-between gap-2">
                <p className="text-[11px] font-medium text-[#99A1AF] md:text-[13px]">
                    {label}
                </p>
                <p className="truncate text-[11px] font-semibold text-[#D1D5DC] md:text-[13px]">
                    <strong className="text-white">{current.toLocaleString('ko-KR')}</strong>
                    <span className="text-[#6A7282]">
                        {' '}/ {target.toLocaleString('ko-KR')}{unit}
                    </span>
                </p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#364153] md:h-2">
                <div
                    className="h-full rounded-full bg-[#BFFF0B] transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

export default function MealGoalCard({
    calories,
    carbohydrates,
    protein,
    fat,
}: MealGoalCardProps) {
    const calorieProgress = calculateProgress(calories.current, calories.target);
    const modal = useModal();
    return (
        <>
            <button
                onClick={modal.openModal}
                type="button"
                className="mt-3 flex w-full flex-col gap-3 rounded-[8px] border border-[#BFFF0B4D] bg-[#BFFF0B0D] p-5 text-left transition-colors hover:cursor-pointer hover:bg-[#BFFF0B14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFFF0B] md:mt-6 md:gap-4 md:rounded-[16px] md:p-6"
                aria-label="오늘의 영양 목표 상세 보기"
            >
                <div className="flex w-full items-start justify-between gap-4">
                    <div>
                        <p className="text-[14px] font-extrabold text-white md:text-[18px]">
                            오늘의 영양 목표
                        </p>
                        <p className="mt-1 text-[11px] font-normal text-[#99A1AF] md:text-[13px]">
                            영양 목표를 설정해보세요!
                        </p>
                    </div>
                    {/* <span className="shrink-0 rounded-full border border-[#BFFF0B4D] bg-[#BFFF0B14] px-2.5 py-1 text-[10px] font-bold text-[#BFFF0B] md:px-3 md:text-xs">
                    {Math.round(calorieProgress)}%
                </span> */}
                </div>

                {/* <div className="w-full rounded-lg bg-[#101828B3] px-4 py-4 md:px-5 md:py-5">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[11px] font-medium text-[#99A1AF] md:text-[13px]">
                            칼로리
                        </p>
                        <p className="mt-1 text-[20px] font-black text-white md:text-[26px]">
                            {calories.current.toLocaleString('ko-KR')}
                            <span className="ml-1 text-[12px] font-semibold text-[#99A1AF] md:text-[14px]">
                                kcal
                            </span>
                        </p>
                    </div>
                    <p className="pb-1 text-[11px] font-medium text-[#6A7282] md:text-[13px]">
                        목표 {calories.target.toLocaleString('ko-KR')} kcal
                    </p>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#364153] md:h-2.5">
                    <div
                        className="h-full rounded-full bg-[#BFFF0B] transition-[width] duration-300"
                        style={{ width: `${calorieProgress}%` }}
                    />
                </div>
            </div>

            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:gap-3">
                <NutrientItem
                    label="탄수화물"
                    current={carbohydrates.current}
                    target={carbohydrates.target}
                    unit="g"
                />
                <NutrientItem
                    label="단백질"
                    current={protein.current}
                    target={protein.target}
                    unit="g"
                />
                <NutrientItem
                    label="지방"
                    current={fat.current}
                    target={fat.target}
                    unit="g"
                />
            </div> */}
            </button>
            {/* <GoalCreateModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                mode="update"
                data={{
                    goalProtein: 1,
                    goalCarbohydrate: 5,
                    goalFat: 8,
                    dailyGoalKcal: 10
                }
                }
            /> */}

            <GoalViewModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                data={{
                    goalProtein: 120,
                    goalCarbohydrate: 250,
                    goalFat: 60,
                    dailyGoalKcal: 2000,
                }}
            />
        </>
    );
}
