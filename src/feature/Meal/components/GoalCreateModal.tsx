'use client';

import { CloseButton } from '@/components/ui/image';
import Image from 'next/image';
import { Goal } from '../type';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { nutritionGoalPatchAction, nutritionGoalPostAction } from '../action';

type GoalCreateModalProps = {
    isModal: boolean;
    closeModal: () => void;
} & (
        | {
            mode?: 'create';
            data?: never;
        }
        | {
            mode: 'update';
            data: Goal | undefined;
        }
    );

const inputClassName =
    'mt-2 w-full rounded-md border border-[#364153] bg-[#1E2939] px-4 py-2.5 text-sm text-white focus:border-[#BFFF0B] focus:outline-none md:px-6 md:py-3 md:text-base';

export default function GoalCreateModal({ isModal, closeModal, mode = 'create', data }: GoalCreateModalProps) {

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: ((formData: FormData) => (
            (mode === 'update' && data) ? nutritionGoalPatchAction(formData) : nutritionGoalPostAction(formData)
        )),

        onSuccess: (result) => {
            if (!result.success) {
                toast.error(result.message)
                return;
            }

            void queryClient.invalidateQueries({
                queryKey: ["goal"],
            });

            closeModal();
            toast.success(`영양 목표가 ${result.message}`)
        },
        onError: () => {
            toast.error('네트워크 오류가 발생했습니다.')
        }
    });

    const handleClose = () => {
        createMutation.reset();
        closeModal();
    };

    if (!isModal) return null;
    return (
        <section
            className="fixed top-0 left-0 z-999 h-screen w-screen bg-black/50"
            onClick={handleClose}
        >
            <form
                className="fixed top-1/2 left-1/2 z-1000 flex max-h-[80dvh] w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col justify-between overflow-y-auto rounded-2xl border border-[#1E2939] bg-linear-to-br from-[#101828] to-black p-6 [scrollbar-width:none] sm:w-md md:w-lg [&::-webkit-scrollbar]:hidden"
                onClick={(event) => event.stopPropagation()}
                onSubmit={(event) => {
                    event.preventDefault();
                    createMutation.mutate(new FormData(event.currentTarget));
                }}
            >
                <article>
                    <header className="mb-8 flex items-center justify-between border-b border-b-[#1E2939] pb-6 md:pt-2 md:pb-8">
                        <h3 className="text-base font-bold text-[#E8EAF0] md:text-lg">
                            {mode === 'create' ? '영양 목표 설정' : '영양 목표 수정'}
                        </h3>
                        <button
                            type="button"
                            onClick={handleClose}
                            className="relative ml-4 size-5 shrink-0"
                        >
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="20px"
                            />
                        </button>
                    </header>

                    <label
                        htmlFor="dailyGoalKcal"
                        className="text-sm font-medium text-white md:text-base"
                    >
                        하루 목표 열량
                    </label>
                    <div className="relative">
                        <input
                            id="dailyGoalKcal"
                            name="dailyGoalKcal"
                            type="number"
                            required
                            defaultValue={data?.dailyGoalKcal ?? 0}
                            className={`${inputClassName} pr-16`}
                        />
                        <span className="pointer-events-none absolute top-1/2 right-4 mt-1 -translate-y-1/2 text-xs text-[#99A1AF] md:right-6 md:text-sm">
                            kcal
                        </span>
                    </div>

                    <div className="mt-6">
                        <h4 className="text-sm font-medium text-white md:text-base">
                            영양소 목표
                        </h4>
                        <div className="flex w-full gap-2 md:gap-3">
                            <div className="w-full">
                                <label className="font-medium text-xs md:text-base text-[#6A7282]">탄수화물</label>
                                <input name='goalCarbohydrate' type="number" defaultValue={data?.goalCarbohydrate} placeholder="0.00" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                            </div>
                            <div className="w-full">
                                <label className="font-medium text-xs md:text-base text-[#6A7282]">단백질</label>
                                <input name='goalProtein' type="number" defaultValue={data?.goalProtein} placeholder="0.00" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                            </div>
                            <div className="w-full">
                                <label className="font-medium text-xs md:text-base text-[#6A7282]">지방</label>
                                <input name='goalFat' type="number" defaultValue={data?.goalFat} placeholder="0.00" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                            </div>
                        </div>
                    </div>
                </article>

                <footer className="mt-10 flex gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="flex w-full items-center justify-center rounded-lg bg-[#1E2939] pt-2 pb-3 text-center text-sm font-semibold text-white md:text-base"
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-lg bg-[#BFFF0B] pt-2 pb-3 text-center text-sm font-semibold text-black md:text-base"
                    >
                        {mode === 'create' ? '저장하기' : '수정하기'}
                    </button>
                </footer>
            </form>
        </section>
    );
}
