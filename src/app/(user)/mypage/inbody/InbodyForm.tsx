'use client'

import { createInbodyAction, updateInbodyAction } from "@/feature/mypage/actions";
import { Inbody } from "@/feature/mypage/type";
import { InbodyFormType, inbodySchema } from "@/lib/inbodySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { toast } from "sonner";

export default function InbodyForm({ setUpdate, update }: { setUpdate: Dispatch<SetStateAction<Inbody | null>>, update?: Inbody | null }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InbodyFormType>({
        resolver: zodResolver(inbodySchema),
        mode: 'onSubmit'
    });

    useEffect(() => {
        reset({
            measuredDate: update?.measuredDate,
            height: update?.height,
            weight: update?.weight,
            bodyFatPercentage: update?.bodyFatPercentage,
            skeletalMuscleMass: update?.skeletalMuscleMass,
        });
    }, [update, reset]);

    const onSubmint = async (data: InbodyFormType) => {
        try {
            let result;
            if (update) {
                result = await updateInbodyAction(update.inbodyId, data);
                setUpdate(null);
            } else {
                result = await createInbodyAction(data);
            }

            if (!result?.success) {
                toast.error(result.message)
                return;
            }

            reset({
                measuredDate: "",
                height: NaN,
                weight: NaN,
                bodyFatPercentage: NaN,
                skeletalMuscleMass: NaN,
            });
            toast.success(result.message)
            router.push('/mypage/inbody');
        } catch (error) {
            toast.error('네트워크 연결이 원활하지 않습니다.')

        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmint)} className="w-full">
            <label
                htmlFor="measuredDate"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                측정일
            </label>
            <input
                {...register('measuredDate')}
                name="measuredDate"
                id="measuredDate"
                type="date"
                placeholder="날짜를 입력해주세요"
                className="w-full py-2.5 sm:py-3 lg:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm md:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            <p className="text-red-400 text-xs sm:text-sm lg:text-base m-1 mb-3 sm:mb-4 lg:mb-5">{errors.measuredDate?.message}</p>

            <div className="flex gap-2 sm:gap-3 lg:gap-4">
                <div className="w-1/2 min-w-0">
                    <label
                        htmlFor="height"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        키 (cm) *
                    </label>
                    <input
                        {...register('height', { valueAsNumber: true })}
                        name="height"
                        id="height"
                        type="number"
                        placeholder="키를 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm md:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                    <p className="text-red-400 text-xs sm:text-sm lg:text-base m-1 mb-3 sm:mb-4 lg:mb-5">{errors.height?.message}</p>

                </div>
                <div className="w-1/2 min-w-0">
                    <label
                        htmlFor="weight"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        몸무게 (kg) *
                    </label>
                    <input
                        {...register('weight', { valueAsNumber: true })}
                        name="weight"
                        id="weight"
                        type="number"
                        placeholder="몸무게를 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm md:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                    <p className="text-red-400 text-xs sm:text-sm lg:text-base m-1 mb-3 sm:mb-4 lg:mb-5">{errors.weight?.message}</p>

                </div>
            </div>
            <div className="flex gap-2 sm:gap-3 lg:gap-4">
                <div className="w-1/2 min-w-0">
                    <label
                        htmlFor="bodyFatPercentage"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        체지방률 (%)
                    </label>
                    <input
                        {...register("bodyFatPercentage", {
                            setValueAs: (value) =>
                                value === "" ? undefined : Number(value),
                        })}
                        name="bodyFatPercentage"
                        id="bodyFatPercentage"
                        type="number"
                        placeholder="체지방률을 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm md:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                    <p className="text-red-400 text-xs sm:text-sm lg:text-base m-1 mb-3 sm:mb-4 lg:mb-5">{errors.bodyFatPercentage?.message}</p>

                </div>
                <div className="w-1/2 min-w-0">
                    <label
                        htmlFor="skeletalMuscleMass"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        골격근량 (kg)
                    </label>
                    <input
                        {...register("skeletalMuscleMass", {
                            setValueAs: (value) =>
                                value === "" ? undefined : Number(value),
                        })}
                        name="skeletalMuscleMass"
                        id="skeletalMuscleMass"
                        type="number"
                        placeholder="골격근량을 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-2 sm:px-3 lg:px-4 text-xs sm:text-sm md:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                    <p className="text-red-400 text-xs sm:text-sm lg:text-base m-1 mb-3 sm:mb-4 lg:mb-5">{errors.skeletalMuscleMass?.message}</p>
                </div>
            </div>
            <button
                disabled={isSubmitting}
                className="w-full text-sm sm:text-base lg:text-base font-bold mb-5 sm:mb-6 lg:mb-6 text-black bg-[#BFFF0B] py-3 sm:py-3.5 lg:py-4 rounded-md">
                {update ? '수정하기' : '저장하기'}
            </button>
        </form>
    );
}
