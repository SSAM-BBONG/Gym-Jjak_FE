'use client';

import { CloseButton } from '@/components/ui/image';
import Image from 'next/image';
import type { GoalFormValues } from './GoalCreateModal';
import GoalItem from './GoalItem';

interface GoalViewModalProps {
    isModal: boolean;
    closeModal: () => void;
    data: GoalFormValues;
}

export default function GoalViewModal({
    isModal,
    closeModal,
    data,
}: GoalViewModalProps) {
    if (!isModal) return null;

    return (
        <section
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 px-4"
            onClick={closeModal}
        >
            <article
                role="dialog"
                aria-modal="true"
                aria-labelledby="goal-view-modal-title"
                className="flex max-h-[80dvh] w-4/5 flex-col overflow-y-auto rounded-2xl border border-[#1E2939] bg-linear-to-br from-[#101828] to-black p-6 [scrollbar-width:none] sm:w-md md:w-lg [&::-webkit-scrollbar]:hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="mb-8 flex items-center justify-between border-b border-b-[#1E2939] pb-6 md:pt-2 md:pb-8">
                    <h3
                        id="goal-view-modal-title"
                        className="text-base font-bold text-[#E8EAF0] md:text-lg"
                    >
                        영양 목표
                    </h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="relative ml-4 size-5 shrink-0"
                        aria-label="영양 목표 조회 모달 닫기"
                    >
                        <Image src={CloseButton} alt="" fill sizes="20px" />
                    </button>
                </header>

                <div className="rounded-xl border border-[#BFFF0B4D] bg-[#BFFF0B0D] px-5 py-6 text-center md:px-6 md:py-7">
                    <p className="text-xs font-medium text-[#99A1AF] md:text-sm">
                        하루 목표 열량
                    </p>
                    <p className="mt-2 text-3xl font-black text-[#BFFF0B] md:text-4xl">
                        {data.dailyGoalKcal.toLocaleString('ko-KR')}
                        <span className="ml-1.5 text-sm font-semibold text-[#D1D5DC] md:text-base">
                            kcal
                        </span>
                    </p>
                </div>

                <div className="mt-6">
                    <h4 className="mb-3 text-sm font-bold text-white md:text-base">
                        영양소 목표
                    </h4>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                        <GoalItem
                            label="탄수화물"
                            value={data.goalCarbohydrate}
                        />
                        <GoalItem
                            label="단백질"
                            value={data.goalProtein}
                        />
                        <GoalItem
                            label="지방"
                            value={data.goalFat}
                        />
                    </div>
                </div>

                <footer className="mt-10 flex gap-3">
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-lg bg-[#1E2939] pt-2 pb-3 text-center text-sm font-semibold text-white transition-colors hover:bg-[#293548] md:text-base"
                    >
                        삭제하기
                    </button>
                    <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-lg bg-[#BFFF0B] pt-2 pb-3 text-center text-sm font-semibold text-black transition-colors hover:bg-[#D0FF46] md:text-base"
                    >
                        수정하기
                    </button>
                </footer>
            </article>
        </section>
    );
}
