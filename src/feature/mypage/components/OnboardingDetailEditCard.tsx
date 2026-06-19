'use client'

import { MyOnboardingPurpose } from "@/components/ui/image";
import { OnboardingType } from "@/lib/onboardingSchema";
import { UseFormRegister } from "react-hook-form";

export default function OnboardingDetailEditCard({ name, title, content, options, register }: { name: "exerciseGoal" | "exercisePeriod" | "exerciseFrequency" | "preferredExercise", title: string, content: string, options: string[], register: UseFormRegister<OnboardingType> }) {
    return (
        <div className="
                    flex gap-3
                    p-8 
                    rounded-[16px]
                    border
                    border-[#36415380]
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    mb-4">
            <div className="bg-[#BFFF0B1A] w-10 h-10 rounded-[10px] p-2 flex justify-center items-center"><img src={MyOnboardingPurpose} alt="온보딩 개별 사진" /></div>
            <div className=" flex flex-col gap-5 w-full">
                <label htmlFor={title} className="text-xl flex items-center h-10 text-white font-extrabold ">{title}</label>
                <select
                    id={title}
                    {...register(name)} defaultValue={content}
                    className="font-normal text-base text-white w-full bg-[#1E2939] border-[#364153] p-3 rounded-[10px]"
                >
                    {options.map((optionText) =>
                        <option key={optionText}>{optionText}</option>
                    )}
                </select>
            </div>
        </div>
    );
}