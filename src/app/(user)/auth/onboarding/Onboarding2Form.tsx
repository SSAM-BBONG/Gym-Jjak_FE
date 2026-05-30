'use client'

import { onBoarding2Schema, OnBoarding2Type } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { onbordingRequest } from "@/feature/auth/type";

export default function Onboarding2Form({ totalData, setTotalData }: { totalData: onbordingRequest, setTotalData: Dispatch<SetStateAction<onbordingRequest>> }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnBoarding2Type>({
        resolver: zodResolver(onBoarding2Schema),
        defaultValues: {
            exercisePeriod: totalData?.exercisePeriod || ""
        },
        mode: 'onSubmit'
    })

    const handleNext = (data: OnBoarding2Type) => {
        setTotalData({
            ...totalData,
            ...data
        })
        router.push('/auth/onboarding?page=3');
    }

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="flex flex-col gap-3 mb-12">
                <label
                    htmlFor="first"
                    className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exercisePeriod')}
                        value='처음 시작해요'
                        id="first" />
                    <p className="text-lg font-bold">처음 시작해요</p>
                    <p className="text-sm font-medium">운동 경험이 거의 없어요</p>
                </label>
                <label
                    htmlFor="beginning"
                    className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exercisePeriod')}
                        value='6개월 미만'
                        id="beginning" />
                    <p className="text-lg font-bold">6개월 미만</p>
                    <p className="text-sm font-medium">운동을 시작한지 얼마 안됐어요</p>
                </label>
                <label
                    htmlFor="steady"
                    className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exercisePeriod')}
                        value='6개월 ~ 1년'
                        id="steady" />
                    <p className="text-lg font-bold">6개월 ~ 1년</p>
                    <p className="text-sm font-medium">꾸준히 운동하고 있어요</p>
                </label>
                <label
                    htmlFor="familiar"
                    className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exercisePeriod')}
                        value='1년 ~ 2년'
                        id="familiar" />
                    <p className="text-lg font-bold">1년 ~ 2년</p>
                    <p className="text-sm font-medium">운동이 익숙해요</p>
                </label>
                <label
                    htmlFor="old"
                    className="w-full h-26 rounded-lg p-6.25 border border-[#364153] bg-[#10182880] text-white
        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exercisePeriod')}
                        value='2년 이상'
                        id="old" />
                    <p className="text-lg font-bold">2년 이상</p>
                    <p className="text-sm font-medium">운동이 생활의 일부에요</p>
                </label>
            </div>
            <div className="text-white">{errors.exercisePeriod?.message}</div>

            <article className="flex">
                <button type="button" onClick={() => router.push('/auth/onboarding?page=1')} className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
                <button type="submit" className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
            </article>
        </form>
    );
}