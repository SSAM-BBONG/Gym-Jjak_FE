'use client'

import useModal from "@/components/hooks/useModal";
import { MyOnboardingPurpose } from "@/components/ui/image";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { onboardingEditAction } from "@/feature/auth/action";
import { MyOnboardingResponse } from "@/feature/auth/type";
import OnboardingAdressCard from "@/feature/mypage/components/OnboardingAdressCard";
import OnboardingDetailEditCard from "@/feature/mypage/components/OnboardingDetailEditCard";
import { onboardingSchema, OnboardingType } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EXERCISE_FREQUENCY_OPTIONS, EXERCISE_GOAL_OPTIONS, EXERCISE_PERIOD_OPTIONS, PREFERRED_EXERCISE_OPTIONS } from "./OnboardingOptions";
import Image from "next/image";

interface OnboardingStateType {
    success: boolean;
    message?: string
}

export default function OnboardingForm({ myOnboarding }: { myOnboarding: MyOnboardingResponse }) {
    const modal = useModal();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<OnboardingType>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            exerciseGoal: myOnboarding.exerciseGoal,
            exercisePeriod: myOnboarding.exercisePeriod,
            exerciseFrequency: myOnboarding.exerciseFrequency,
            preferredExercise: myOnboarding.preferredExercise,
            height: myOnboarding.height,
            weight: myOnboarding.weight,
            region: myOnboarding.preferredRegion,
        },
        mode: 'onSubmit'
    });

    const [onboardingState, setOnboardingState] = useState<OnboardingStateType>({
        success: false,
        message: ''
    });

    const onSubmit = async (data: OnboardingType) => {
        try {
            const result = await onboardingEditAction(data);
            setOnboardingState(result);
        } catch (error) {
            setOnboardingState({
                success: false,
                message: '네트워크 연결이 원활하지 않습니다.'
            })
            modal.openModal();
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <OnboardingDetailEditCard title="운동 목적" name={'exerciseGoal'} content={myOnboarding.exerciseGoal} options={[...EXERCISE_GOAL_OPTIONS]} register={register} />
            <OnboardingDetailEditCard title='운동 경험' name={'exercisePeriod'} content={myOnboarding.exercisePeriod} options={[...EXERCISE_PERIOD_OPTIONS]} register={register} />
            <OnboardingDetailEditCard title='운동 빈도' name={'exerciseFrequency'} content={myOnboarding.exerciseFrequency} options={[...EXERCISE_FREQUENCY_OPTIONS]} register={register} />
            <OnboardingDetailEditCard title='선호 운동' name={'preferredExercise'} content={myOnboarding.preferredExercise} options={[...PREFERRED_EXERCISE_OPTIONS]} register={register} />
            <div className="
                                flex gap-3
                                p-8 
                                rounded-[16px]
                                border
                                border-[#36415380]
                                bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                                mb-4">
                <div className="bg-[#BFFF0B1A] w-10 h-10 rounded-[10px] p-2 flex justify-center items-center">
                    <div className="relative w-5 h-5">
                        <Image
                            src={MyOnboardingPurpose}
                            alt="온보딩 개별 사진"
                            fill
                            sizes="w-10 h-10"
                            className="object-cover hover:cursor-pointer"
                        />
                    </div>
                </div>
                <div className=" flex flex-col gap-5 w-full">
                    <p className="text-xl flex items-center h-10 text-white font-extrabold ">신체 정보</p>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="height" className="font-normal text-sm text-[#99A1AF]">키</label>
                            <input
                                id='height'
                                {...register('height', { valueAsNumber: true })}
                                className="font-normal text-base text-white w-full bg-[#1E2939] border-[#364153] p-3 rounded-[10px]"
                                defaultValue={myOnboarding.height} />
                            {errors.height?.message && <p className="text-red-400 text-sm m-1 mb-5">{errors.height?.message}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="weight" className="font-normal text-sm text-[#99A1AF]">체중</label>
                            <input
                                id='weight'
                                {...register('weight', { valueAsNumber: true })}
                                className="font-normal text-base text-white w-full bg-[#1E2939] border-[#364153] p-3 rounded-[10px]"
                                defaultValue={myOnboarding.weight} />
                            {errors.weight?.message && <p className="text-red-400 text-sm m-1 mb-5">{errors.weight?.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <OnboardingAdressCard title='선호 지역' content={myOnboarding.preferredRegion} setValue={setValue} />
            <button type="submit" className="bg-[#BFFF0B] text-xl px-6 py-6 mb-10 mt-5 font-black rounded-[10px] w-full">등록하기</button>
            {!isSubmitting && (
                <OneButtonModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    activeModal={modal.activeModal}
                    title='온보딩 수정'
                    content={onboardingState.success ?
                        '온보딩이 수정되었습니다.' : onboardingState.message ?
                            onboardingState.message : `알 수 없는 오류입니다\n다시 시도해주세요`} />
            )}
        </form>
    );
}