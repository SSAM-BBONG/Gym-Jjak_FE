import { CloseButton } from "@/components/ui/image";
import Image from "next/image";
import { useState } from "react";
import { mealAiPostAction, mealPostAction } from "../action";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import MealAiCreate from "./MealAiCreate";
import MealViewAi from "./MealViewAi";
import AiLoading from "@/components/ui/AiLoading";
import { MealAi } from "../type";

interface MealProps {
    isModal: boolean;
    closeModal: () => void;
}


export default function MealCreateAiModal({ isModal, closeModal }: MealProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [mealAiData, setMealAiData] = useState<MealAi | null>(null)

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: ((formData: FormData) => (
            mealAiPostAction(formData)
        )),
        onSuccess: (result) => {
            if (!result.success) {
                if (result.debug) {
                    console.error("[mealAiPostAction] AI 식단 분석 요청 실패", result.debug);
                }

                toast.error(result.message)
                return;
            }

            void queryClient.invalidateQueries({
                queryKey: ["meals", "list"]
            });

            setMealAiData(result.data as MealAi)
            closeModal();
            toast.success(result.message)
        },
        onError: () => {
            toast.error('네트워크 오류가 발생했습니다')
        },
    });

    const isLoading = createMutation.isPending;

    const handleClose = () => {
        createMutation.reset();
        setSelectedImage(null);
        setMealAiData(null);
        closeModal();
    };


    if (!isModal) return null;
    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={handleClose} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-4/5 max-h-120 sm:w-md sm:h-100 md:w-lg md:h-120 lg:w-lg rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                        overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => { e.stopPropagation() }}
                onSubmit={(event) => {
                    event.preventDefault();
                    createMutation.mutate(new FormData(event.currentTarget));
                }}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-6 md:pb-8 md:pt-2 mb-8">
                        <h3 className="font-bold text-base md:text-lg text-[#E8EAF0]">식단 추가</h3>
                        <button onClick={handleClose} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    {!mealAiData && (
                        <MealAiCreate setSelectedImage={setSelectedImage} selectedImage={selectedImage} />

                    )}
                    {isLoading && (
                        <div className="h-60">
                            <AiLoading />
                        </div>
                    )}
                    {mealAiData && <MealViewAi mealData={mealAiData} />}

                </article>
                {(!mealAiData && !isLoading) && (
                    <article className='flex gap-3 mt-10'>
                        <button
                            type="button"
                            onClick={handleClose}
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-s md:text-base bg-[#1E2939]'
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-s md:text-base bg-[#BFFF0B]'
                        >
                            분석하기
                        </button>
                    </article>
                )}
            </form>
        </section>
    );
}
