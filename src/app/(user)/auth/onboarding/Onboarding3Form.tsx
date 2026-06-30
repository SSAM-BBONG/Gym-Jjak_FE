'use client'

import { onBoarding3Schema, OnBoarding3Type } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { onbordingRequest } from "@/feature/auth/type";
import Link from "next/link";

export default function Onboarding3Form({ totalData, setTotalData }: { totalData: onbordingRequest, setTotalData: Dispatch<SetStateAction<onbordingRequest>> }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OnBoarding3Type>({
        resolver: zodResolver(onBoarding3Schema),
        defaultValues: {
            exerciseFrequency: totalData?.exerciseFrequency || ""
        },
        mode: 'onSubmit'
    })

    const handleNext = (data: OnBoarding3Type) => {
        setTotalData({
            ...totalData,
            ...data
        })
        router.push('/auth/onboarding?page=4');
    }
    return (
        <form onSubmit={handleSubmit(handleNext)}>
            <div className="flex gap-4 pb-12">
                <label
                    htmlFor="rarely"
                    className="font-black text-2xl text-white w-full p-8.5 border border-[#364153] rounded-lg text-center
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseFrequency')}
                        value='1회 이하'
                        id="rarely" />
                    1회 이하
                </label>
                <label
                    htmlFor="sometimes"
                    className="font-black text-2xl text-white w-full p-8.5 border border-[#364153] rounded-lg text-center
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseFrequency')}
                        value='2~4회'
                        id="sometimes" />
                    2~4회
                </label>
                <label
                    htmlFor="often"
                    className="font-black text-2xl text-white w-full p-8.5 border border-[#364153] rounded-lg text-center
                has-checked:bg-[#BFFF0B]/90 has-checked:text-black">
                    <input
                        hidden
                        type="radio"
                        {...register('exerciseFrequency')}
                        value='5~7회'
                        id="often" />
                    5~7회
                </label>
            </div>
            <div className="text-red-500 text-md mb-5 text-center">{errors.exerciseFrequency?.message}</div>

            <article className="flex">
                <Link href='/auth/onboarding?page=2'><button type="button" className="py-3 px-8 rounded-[10px] text-base font-bold bg-[#10182880] text-[#D1D5DC]">이전</button></ Link>
                <button type="submit" className="ml-auto bg-[#BFFF0B] py-3 px-8 rounded-[10px] text-base font-bold">다음</button>
            </article>
        </form>
    );
}