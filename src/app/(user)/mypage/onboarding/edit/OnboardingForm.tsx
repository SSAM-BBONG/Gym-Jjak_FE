'use client'

import { MyOnboardingPurpose } from "@/components/ui/image";
import { onboardingEditAction } from "@/feature/auth/action";
import { MyOnboardingResponse } from "@/feature/auth/type";
import OnboardingAdressCard from "@/feature/mypage/components/OnboardingAdressCard";
import OnboardingDetailEditCard from "@/feature/mypage/components/OnboardingDetailEditCard";
import { onboardingSchema, OnboardingType } from "@/lib/onboardingSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EXERCISE_FREQUENCY_OPTIONS, EXERCISE_GOAL_OPTIONS, EXERCISE_PERIOD_OPTIONS, PREFERRED_EXERCISE_OPTIONS } from "./OnboardingOptions";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


export default function OnboardingForm({ myOnboarding }: { myOnboarding: MyOnboardingResponse }) {

    const router = useRouter();

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

    const onSubmit = async (data: OnboardingType) => {
        try {
            const result = await onboardingEditAction(data);
            router.push('/mypage/onboarding');
            toast.success(result.message);
        } catch (error) {
            console.log(error)
            toast.error('네트워크 연결이 원활하지 않습니다.')
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <OnboardingDetailEditCard title="운동 목적" name={'exerciseGoal'} content={myOnboarding.exerciseGoal} options={[...EXERCISE_GOAL_OPTIONS]} register={register} />
            <OnboardingDetailEditCard title='운동 경험' name={'exercisePeriod'} content={myOnboarding.exercisePeriod} options={[...EXERCISE_PERIOD_OPTIONS]} register={register} />
            <OnboardingDetailEditCard title='운동 빈도' name={'exerciseFrequency'} content={myOnboarding.exerciseFrequency} options={[...EXERCISE_FREQUENCY_OPTIONS]} register={register} />
            <OnboardingDetailEditCard title='선호 운동' name={'preferredExercise'} content={myOnboarding.preferredExercise} options={[...PREFERRED_EXERCISE_OPTIONS]} register={register} />
            <div className="
                                flex gap-2 sm:gap-3
                                p-5 sm:p-6 lg:p-8
                                rounded-[12px] sm:rounded-[14px] lg:rounded-[16px]
                                border
                                border-[#36415380]
                                bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                                mb-3 sm:mb-4">
                <div className="bg-[#BFFF0B1A] w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[10px] p-1.5 sm:p-2 flex justify-center items-center">
                    <div className="relative w-4 h-4 lg:w-5 lg:h-5">
                        <Image
                            src={MyOnboardingPurpose}
                            alt="온보딩 개별 사진"
                            fill
                            sizes="w-10 h-10"
                            className="object-cover hover:cursor-pointer"
                        />
                    </div>
                </div>
                <div className=" flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full">
                    <p className="text-base sm:text-lg lg:text-xl flex items-center h-8 sm:h-9 lg:h-10 text-white font-extrabold ">신체 정보</p>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <label htmlFor="height" className="font-normal text-xs sm:text-sm text-[#99A1AF]">키</label>
                            <input
                                id='height'
                                {...register('height', { valueAsNumber: true })}
                                className="font-normal text-sm sm:text-base text-white w-full bg-[#1E2939] border-[#364153] p-2.5 sm:p-3 rounded-[10px]"
                                defaultValue={myOnboarding.height} />
                            {errors.height?.message && <p className="text-red-400 text-xs sm:text-sm m-1 mb-4 sm:mb-5">{errors.height?.message}</p>}
                        </div>
                        <div className="w-full">
                            <label htmlFor="weight" className="font-normal text-xs sm:text-sm text-[#99A1AF]">체중</label>
                            <input
                                id='weight'
                                {...register('weight', { valueAsNumber: true })}
                                className="font-normal text-sm sm:text-base text-white w-full bg-[#1E2939] border-[#364153] p-2.5 sm:p-3 rounded-[10px]"
                                defaultValue={myOnboarding.weight} />
                            {errors.weight?.message && <p className="text-red-400 text-xs sm:text-sm m-1 mb-4 sm:mb-5">{errors.weight?.message}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <OnboardingAdressCard title='선호 지역' content={myOnboarding.preferredRegion} setValue={setValue} />
            <button disabled={isSubmitting} type="submit" className="bg-[#BFFF0B] text-base sm:text-lg lg:text-xl px-4 sm:px-5 lg:px-6 py-4 sm:py-5 lg:py-6 mb-8 lg:mb-10 mt-4 lg:mt-5 font-black rounded-[10px] w-full">수정하기</button>
        </form>
    );
}
