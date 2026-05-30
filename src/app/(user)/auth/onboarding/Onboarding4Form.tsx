'use client'

import { onBoarding4Schema, OnBoarding4Type } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { onbordingRequest } from "@/feature/auth/type";

export default function Onboarding4Form({ totalData, setTotalData }: { totalData: onbordingRequest, setTotalData: Dispatch<SetStateAction<onbordingRequest>> }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnBoarding4Type>({
        resolver: zodResolver(onBoarding4Schema),
        defaultValues: {
            preferredExercise: totalData?.preferredExercise || ''
        },
        mode: 'onSubmit'
    })

    const handleNext = (data: OnBoarding4Type) => {
        console.log("부모가 준 setTotalData의 정체:", setTotalData);
        setTotalData({
            ...totalData,
            ...data
        })
        router.push('/auth/onboarding?page=5');
    }
    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="grid grid-cols-2 grid-rows-5 gap-3 mb-12">
                <label
                    htmlFor="웨이트 트레이닝"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        value='웨이트 트레이닝'
                        type="radio"
                        id="웨이트 트레이닝" />
                    웨이트 트레이닝
                </label>
                <label
                    htmlFor="크로스핏"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="크로스핏"
                        value="크로스핏" />
                    크로스핏
                </label>
                <label
                    htmlFor="요가"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="요가"
                        value="요가" />
                    요가
                </label>
                <label
                    htmlFor="필라테스"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="필라테스"
                        value="필라테스" />
                    필라테스
                </label>
                <label
                    htmlFor="수영"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="수영"
                        value="수영" />
                    수영
                </label>
                <label
                    htmlFor="러닝"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="러닝"
                        value="러닝" />
                    러닝
                </label>
                <label
                    htmlFor="사이클"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="사이클"
                        value="사이클" />
                    사이클
                </label>
                <label
                    htmlFor="복싱"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="복싱"
                        value="복싱" />
                    복싱
                </label>
                <label
                    htmlFor="댄스"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="댄스"
                        value="댄스" />
                    댄스
                </label>
                <label
                    htmlFor="클라이밍"
                    className="w-full font-bold text-base p-5.5 text-center text-white border border-[#364153] rounded-lg
                        has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        {...register('preferredExercise')}
                        type="radio"
                        id="클라이밍"
                        value="클라이밍" />
                    클라이밍
                </label>
            </div>
            <div className="text-white">{errors.preferredExercise?.message}</div>


            <article className="flex">
                <button type="button" onClick={() => router.push('/auth/onboarding?page=3')} className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
                <button type="submit" className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
            </article>
        </form>
    );
}