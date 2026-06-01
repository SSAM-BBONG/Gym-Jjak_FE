'use client'

import { onBoarding5Schema, OnBoarding5Type } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { onbordingRequest } from "@/feature/auth/type";

export default function Onboarding5Form({ totalData, setTotalData }: { totalData: onbordingRequest, setTotalData: Dispatch<SetStateAction<onbordingRequest>> }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnBoarding5Type>({
        resolver: zodResolver(onBoarding5Schema),
        defaultValues: {
            height: totalData?.height || 150,
            weight: totalData?.weight || 50,
        },
        mode: 'onSubmit'
    })

    const handleNext = (data: OnBoarding5Type) => {
        setTotalData({
            ...totalData,
            ...data
        })
        router.push('/auth/onboarding?page=6');
    }

    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="flex flex-col gap-3 pb-12 w-md m-auto">
                <label className="text-sm font-medium text-[#D1D5DC]">키 (cm)</label>
                <input
                    {...register('height', { valueAsNumber: true })}
                    type="number"
                    placeholder="키를 작성해주세요"
                    className="px-6 py-4 mb-6 border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />
                <label className="text-sm font-medium text-[#D1D5DC]">체중 (kg)</label>
                <input
                    {...register('weight', { valueAsNumber: true })}
                    type="number"
                    placeholder="체중을 작성해주세요"
                    className="px-6 py-4 border border-[#364153] bg-[#101828] rounded-[10px] text-white focus:outline-0 focus:border-[#BFFF0B]" />
            </div>
            <div className="text-red-500 text-md mb-5 text-center">{errors.weight?.message}{errors.height?.message}</div>

            <article className="flex">
                <button type="button" onClick={() => router.push('/auth/onboarding?page=4')} className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button>
                <button type="submit" className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
            </article>
        </form>
    );
}