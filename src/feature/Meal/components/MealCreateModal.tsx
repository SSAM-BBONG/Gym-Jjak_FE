import { CloseButton } from "@/components/ui/image";
import Image from "next/image";
import MealImgClassifier from "./MealImgClassifier";
import { useRef, useState } from "react";
import { mealGetAction, mealPatchAction, mealPostAction } from "../action";
import { toast } from "sonner";
import { skipToken, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Meal } from "../type";

type MealProps = {
    isModal: boolean;
    closeModal: () => void;
} & (
        {
            system: 'update';
            mealId: number
        }
        | {
            system: 'create';
            mealId?: never
        }
    );


export default function MealCreateModal({ isModal, closeModal, system, mealId }: MealProps) {

    if (!isModal) return null;

    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const {
        data: mealData,
        isLoading: isDateLoading,
        isError: isDateError,
        error: dateError,
    } = useQuery<{ data: Meal }, Error, Meal>({
        queryKey: ["meals", "detail", mealId],
        queryFn: mealId
            ? () => mealGetAction(mealId)
            : skipToken,
        select: (response) => response.data,
    });


    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: ((formData: FormData) => (
            (system === 'update' && mealId) ? mealPatchAction(mealId, formData) : mealPostAction(formData)
        )),
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
            toast.success(`식단이 ${result.message}`)
        },
        onError: () => {
            toast.error('네트워크 오류가 발생했습니다')
        }
    });

    const handleClose = () => {
        createMutation.reset();
        setSelectedImage(null);
        closeModal();
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) {
            setSelectedImage(null);
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            setSelectedImage(event.target?.result as string);
        }
        reader.readAsDataURL(file);
    };


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
                        <h3 className="font-bold text-base md:text-lg text-[#E8EAF0]">{system === 'create' ? '식단 추가' : '식단 수정'}</h3>
                        <button onClick={handleClose} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <label className="font-medium text-base md:text-lg text-white">식사 유형</label>
                    <div className="flex mb-6 mt-2">
                        <select
                            defaultValue={mealData?.mealType || '시간'}
                            name='mealType'
                            className={`border-[#364153] text-sm md:text-base border w-1/3 py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none `}>
                            <option disabled hidden>시간</option>
                            <option value='아침'>아침</option>
                            <option value='점심'>점심</option>
                            <option value='저녁'>저녁</option>
                            <option value='간식'>간식</option>
                        </select>
                    </div>
                    <div className="flex w-full md:gap-3 flex-col md:flex-row">
                        <div className="w-full">
                            <label className="font-medium text-base md:text-lg text-white">날짜</label>
                            <input defaultValue={mealData?.mealTime.split(' ')[0] || ''} name='date' type='date' className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                        </div>
                        <div className="w-full">
                            <label className="font-medium text-base md:text-lg text-white">시간</label>
                            <input defaultValue={mealData?.mealTime.split(' ')[1] || ''} name='time' type='time' className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                        </div>
                    </div>
                    {system === 'update' ? (
                        <>
                            <div className="my-5">
                                <label htmlFor='mealImageFile'
                                    className=" px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-bold bg-[#BFFF0B]">파일 선택</label>
                                <input
                                    hidden
                                    type="file"
                                    id="mealImageFile"
                                    name="mealImageFile"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </div>

                            {(selectedImage || mealData?.imageUrl) && (
                                <div className="mb-4 flex flex-col gap-3">
                                    <img
                                        ref={imgRef}
                                        src={selectedImage || mealData?.imageUrl || undefined}
                                        alt="분류할 이미지"
                                        className="max-h-64 w-auto rounded-lg border border-zinc-200 object-contain dark:border-zinc-600"
                                    />
                                </div>
                            )}
                            <label className="font-medium text-base md:text-lg text-white">메뉴</label>
                            <textarea
                                defaultValue={mealData?.menu}
                                name='menu'
                                maxLength={255}
                                placeholder="메뉴를 입력해주세요"
                                className="border-[#364153] border mt-2 mb-4  w-full h-20 p-3 md:px-6 md:py-4 bg-[#1E2939] rounded-md resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                            ></textarea>
                        </>
                    ) : (
                        <MealImgClassifier />
                    )}
                    <label className="font-medium text-base md:text-lg text-white">열량(kcal)</label>
                    <input defaultValue={mealData?.kcal || 0} name='kcal' type="number" placeholder="0" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                    {false && (
                        <>
                            <label className="font-medium text-base md:text-lg text-white">영양소</label>

                            <div className="flex w-full gap-2 md:gap-3">
                                <div className="w-full">
                                    <label className="font-medium text-xs md:text-base text-[#6A7282]">탄수화물</label>
                                    <input name='carbohydrate' type="number" defaultValue={mealData?.carbohydrate || 0} placeholder="0.00" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                                </div>
                                <div className="w-full">
                                    <label className="font-medium text-xs md:text-base text-[#6A7282]">단백질</label>
                                    <input name='protein' type="number" defaultValue={mealData?.protein || 0} placeholder="0.00" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                                </div>
                                <div className="w-full">
                                    <label className="font-medium text-xs md:text-base text-[#6A7282]">지방</label>
                                    <input name='fat' type="number" defaultValue={mealData?.fat || 0} placeholder="0.00" className="border-[#364153] mt-2 border w-full mb-4 px-4 md:px-6 py-2.5 md:py-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none" />
                                </div>
                            </div>
                        </>
                    )}
                </article>
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
                        {system === 'create' ? '저장하기' : '수정하기'}
                    </button>
                </article>
            </form>
        </section>
    );
}