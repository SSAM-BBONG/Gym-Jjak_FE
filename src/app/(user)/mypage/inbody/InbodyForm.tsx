'use client'

import { createInbodyAction } from "@/feature/mypage/actions";
import { InbodyFormType, inbodySchema } from "@/lib/inbodySchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from "react";
import { useForm } from 'react-hook-form';

interface InbodyStateType {
    success: boolean;
    message?: string
}

export default function InbodyForm() {
    const [inbodyState, setInbodyState] = useState<InbodyStateType>({
        success: false,
        message: ''
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<InbodyFormType>({
        resolver: zodResolver(inbodySchema),
        mode: 'onSubmit'
    });

    const onSubmint = async (data: InbodyFormType) => {
        try {
            reset();
            const result = await createInbodyAction(data);
            setInbodyState(result);
        } catch (error) {
            setInbodyState({
                success: false,
                message: '네트워크 연결이 원활하지 않습니다.'
            })
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
                className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            <div className="flex gap-4">
                <div>
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
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
                <div>
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
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
            </div>
            <div className="flex gap-4">
                <div>
                    <label
                        htmlFor="bodyFatPercentage"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        체지방률 (%)
                    </label>
                    <input
                        {...register('bodyFatPercentage', { valueAsNumber: true })}
                        name="bodyFatPercentage"
                        id="bodyFatPercentage"
                        type="number"
                        placeholder="체지방률을 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
                <div>
                    <label
                        htmlFor="skeletalMuscleMass"
                        className="w-full text-[#D1D5DC] text-sm font-medium">
                        골격근량 (kg)
                    </label>
                    <input
                        {...register('skeletalMuscleMass', { valueAsNumber: true })}
                        name="skeletalMuscleMass"
                        id="skeletalMuscleMass"
                        type="number"
                        placeholder="골격근량을 입력해주세요"
                        className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 mb-4 sm:mb-5 lg:mb-5 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#1E2939] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                </div>
            </div>
            <p className="text-red">{errors.form?.message}</p>
            <p className="text-red">{errors.bodyFatPercentage?.message}</p>
            <p className="text-red">{errors.height?.message}</p>
            <p className="text-red">{errors.measuredDate?.message}</p>
            <p className="text-red">{errors.skeletalMuscleMass?.message}</p>
            <p className="text-red">{errors.weight?.message}</p>
            <p>{inbodyState.message}</p>
            <button
                disabled={isSubmitting}
                className="w-full text-sm sm:text-base lg:text-base font-bold mb-5 sm:mb-6 lg:mb-6 text-black bg-[#BFFF0B] py-3 sm:py-3.5 lg:py-4 rounded-md">
                저장하기
            </button>
        </form>
    );
}