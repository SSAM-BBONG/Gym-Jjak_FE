'use client';

import { CloseButton } from '@/components/ui/image';
import Image from 'next/image';
import { Meal } from '../type';
import { mealDeleteAction, mealGetAction } from '../action';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import useModal from '@/components/hooks/useModal';
import TwoButtonModal from '@/components/ui/TwoButtonModal';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

interface MealViewModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    mealId: number;
}

export default function MealViewModal({ isModal, closeModal, activeModal, mealId }: MealViewModalProps) {

    if (!isModal) return null;

    const {
        data: mealData,
        isLoading: isDateLoading,
        isError: isDateError,
        error: dateError,
    } = useQuery<{ data: Meal }, Error, Meal>({
        queryKey: ["meals", "detail", mealId],
        queryFn: () => mealGetAction(mealId),
        enabled: !!mealId,
        select: (response) => response.data,
    });

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (() =>
            mealDeleteAction(mealId)
        ),
        onSuccess: (result) => {
            if (!result.success) {
                toast.error(result.message)
                return;
            }

            void queryClient.invalidateQueries({
                queryKey: ["meals", "list"]
            });

            void queryClient.invalidateQueries({
                queryKey: ["meals", "detail", mealId],
            });

            closeModal();
            toast.success(result.message)
        },
        onError: () => {
            toast.error("네트워크 오류가 발생했습니다")
        }
    });

    const checkModal = useModal(createMutation.mutate);


    return (
        <section
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 px-4"
            onClick={closeModal}
        >
            <article
                role="dialog"
                aria-modal="true"
                aria-labelledby="meal-view-modal-title"
                className="flex max-h-[80dvh] w-4/5 flex-col overflow-y-auto rounded-2xl border border-[#1E2939] bg-linear-to-br from-[#101828] to-black p-6 [scrollbar-width:none] sm:w-md md:w-lg [&::-webkit-scrollbar]:hidden"
                onClick={(event) => event.stopPropagation()}
            >
                <header className="mb-6 flex items-center justify-between border-b border-b-[#1E2939] pb-6 md:mb-8 md:pt-2 md:pb-8">
                    <h3
                        id="meal-view-modal-title"
                        className="text-base font-bold text-[#E8EAF0] md:text-lg"
                    >
                        식단 상세
                    </h3>
                    <button
                        type="button"
                        onClick={closeModal}
                        className="relative ml-auto size-5"
                        aria-label="식단 상세 모달 닫기"
                    >
                        <Image src={CloseButton} alt="" fill sizes="20px" />
                    </button>
                </header>

                <div className="flex flex-1 flex-col gap-6">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <span className="inline-flex rounded-sm bg-[#364153] px-3 py-1 text-xs font-extrabold text-[#D1D5DC]">
                                {mealData?.mealType}
                            </span>
                            <h4 className="mt-3 text-lg font-bold text-white md:text-xl">
                                {mealData?.menu}
                            </h4>
                            <p className="mt-1 text-sm text-[#99A1AF]">
                                {mealData?.mealTime}
                            </p>
                        </div>
                        <strong className="shrink-0 text-lg text-[#BFFF0B] md:text-xl">
                            {mealData?.kcal || 0} kcal
                        </strong>
                    </div>

                    {mealData?.imageUrl && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[#1E2939]">
                            <Image
                                src={mealData?.imageUrl}
                                alt={`${mealData.menu} 식단 이미지`}
                                fill
                                sizes="(max-width: 640px) 80vw, 512px"
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div>
                        <h4 className="mb-3 text-base font-bold text-white md:text-lg">
                            영양 정보
                        </h4>
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                            <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                                <div className="text-xs text-[#99A1AF] md:text-sm">탄수화물</div>
                                <div className="mt-1 text-sm font-bold text-white md:text-base">
                                    {mealData?.carbohydrate || 0}
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                                <div className="text-xs text-[#99A1AF] md:text-sm">단백질</div>
                                <div className="mt-1 text-sm font-bold text-white md:text-base">
                                    {mealData?.protein || 0}
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                                <div className="text-xs text-[#99A1AF] md:text-sm">지방</div>
                                <div className="mt-1 text-sm font-bold text-white md:text-base">
                                    {mealData?.fat || 0}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-10 flex gap-3">
                    <button
                        onClick={() => checkModal.openModal()}
                        type="button"
                        className="flex w-full items-center justify-center rounded-lg bg-[#1E2939] pt-2 pb-3 text-center text-sm font-semibold text-white md:text-base"
                    >
                        삭제하기
                    </button>
                    <button
                        type="button"
                        onClick={activeModal}
                        className="flex w-full items-center justify-center rounded-lg bg-[#BFFF0B] pt-2 pb-3 text-center text-sm font-semibold text-black md:text-base"
                    >
                        수정하기
                    </button>
                </footer>
            </article>
            <TwoButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                activeModal={checkModal.activeModal}
                title='식단'
                content="삭제하시겠습니까?"
            />
        </section>
    );
}
