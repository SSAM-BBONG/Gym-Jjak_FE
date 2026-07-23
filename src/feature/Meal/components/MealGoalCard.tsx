'use client';

import useModal from "@/components/hooks/useModal";
import GoalCreateModal from "./GoalCreateModal";
import GoalViewModal from "./GoalViewModal";
import { nutritionGoalGetAction } from "../action";
import { useQuery } from "@tanstack/react-query";
import { Goal } from "../type";

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

export default function MealGoalCard() {
    const modal = useModal();
    const viewModal = useModal(modal.openModal);

    const {
        data: goalData,
        isError: isGoalError,
        error: goalError,
    } = useQuery<{ data: Goal }, Error, Goal>({
        queryKey: ["goal"],
        queryFn: () => nutritionGoalGetAction(),
        select: (response) => response.data,
    });

    console.log(goalData)
    return (
        <>
            <button
                onClick={goalData ? viewModal.openModal : modal.openModal}
                type="button"
                className="mt-3 flex w-full flex-col gap-3 rounded-[8px] border border-[#BFFF0B4D] bg-[#BFFF0B0D] p-5 text-left transition-colors hover:cursor-pointer hover:bg-[#BFFF0B14] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#BFFF0B] md:mt-6 md:gap-4 md:rounded-[16px] md:p-6"
                aria-label="오늘의 영양 목표 상세 보기"
            >
                <div className="flex w-full items-start justify-between gap-4">
                    <div>
                        <p className="text-[14px] font-extrabold text-white md:text-[18px]">
                            나의 영양 목표
                        </p>
                        <p className="mt-1 text-[11px] font-normal text-[#99A1AF] md:text-[13px]">
                            {goalData ? '영양 목표를 확인해보세요!' : '영양 목표를 설정해보세요!'}
                        </p>
                    </div>
                </div>
            </button>
            {goalData === null ? (
                <GoalCreateModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    mode="create"
                />
            ) : (
                <GoalCreateModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    mode="update"
                    data={goalData}
                />
            )}
            {viewModal.isModal && goalData && (
                <GoalViewModal
                    isModal={viewModal.isModal}
                    closeModal={viewModal.closeModal}
                    activeModal={viewModal.activeModal}
                    data={goalData}
                />
            )}

        </>
    );
}
