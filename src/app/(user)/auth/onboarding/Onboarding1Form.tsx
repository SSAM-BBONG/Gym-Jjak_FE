'use client'

import { onBoarding1Schema, OnBoarding1Type } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { onbordingRequest } from "@/feature/auth/type";

export default function Onboarding1Form({ totalData, setTotalData }: { totalData: onbordingRequest, setTotalData: Dispatch<SetStateAction<onbordingRequest>> }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnBoarding1Type>({
        resolver: zodResolver(onBoarding1Schema),
        defaultValues: {
            exerciseGoal: totalData?.exerciseGoal || ""
        },
        mode: 'onSubmit'
    })

    const handleNext = (data: OnBoarding1Type) => {
        setTotalData({
            ...totalData,
            ...data
        })
        router.push('/auth/onboarding?page=2');
    }

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-4 pb-8 sm:pb-10 lg:pb-12">
                <label
                    htmlFor="diet"
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-82 h-24 sm:h-26 lg:h-29 rounded-lg border border-[#364153] bg-[#10182880] text-white text-base sm:text-lg lg:text-xl font-bold text-center p-4 sm:p-5 lg:p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseGoal')}
                        value='다이어트'
                        id="diet" />
                    <p>🔥</p>
                    다이어트
                </label>
                <label
                    htmlFor="bulkup"
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-82 h-24 sm:h-26 lg:h-29 border rounded-lg border-[#364153] bg-[#10182880] text-white text-base sm:text-lg lg:text-xl font-bold text-center p-4 sm:p-5 lg:p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseGoal')}
                        value='벌크업'
                        id="bulkup" />
                    <p>💪</p>
                    벌크업
                </label>
                <label
                    htmlFor="improvement"
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-82 h-24 sm:h-26 lg:h-29 border rounded-lg border-[#364153] bg-[#10182880] text-white text-base sm:text-lg lg:text-xl font-bold text-center p-4 sm:p-5 lg:p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseGoal')}
                        value='체력증진'
                        id="improvement" />
                    <p>⚡</p>
                    체력증진
                </label>
                <label
                    htmlFor="rehabilitation"
                    className="w-full sm:w-[calc(50%-0.5rem)] lg:w-82 h-24 sm:h-26 lg:h-29 border rounded-lg border-[#364153] bg-[#10182880] text-white text-base sm:text-lg lg:text-xl font-bold text-center p-4 sm:p-5 lg:p-7.5
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseGoal')}
                        value='재활'
                        id="rehabilitation" />
                    <p>🩹</p>
                    재활
                </label>
            </div>
            <div className="text-red-500 text-md mb-5 text-center">{errors.exerciseGoal?.message}</div>


            <article className="flex">
                <button onClick={handleSubmit(handleNext)} className="ml-auto bg-[#BFFF0B] py-2.5 sm:py-3 lg:py-3 px-5 sm:px-6 lg:px-8 rounded-[10px] text-sm sm:text-base lg:text-base font-bold">다음</button>
            </article>
        </form>
    );
}
