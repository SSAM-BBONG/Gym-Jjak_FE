'use client'

import { addSocialRegistAction } from "@/feature/auth/action";
import { useState } from "react";
import OneButtonModal from "@/components/ui/OneButtonModal";
import useModal from "@/components/hooks/useModal";
import { useForm } from "react-hook-form";
import { SocialSignUpFormData, socialSignUpSchema } from "@/lib/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

interface registerStateType {
    success: boolean;
    message?: string
}

export default function SocialRegistForm() {

    const router = useRouter();
    const modal = useModal(() => {
        if (registerState.success) {
            router.push('/auth/login');
        }
    });

    const [registerState, setRegisterState] = useState<registerStateType>({
        success: false,
        message: ''
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SocialSignUpFormData>({
        resolver: zodResolver(socialSignUpSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: SocialSignUpFormData) => {
        try {
            const result = await addSocialRegistAction(data);
            setRegisterState(result);
            modal.openModal();
        } catch (error) {
            setRegisterState({
                success: false,
                message: '네트워크 연결이 원활하지 않습니다.'
            });
            modal.openModal();
        }

    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-md">
            <label
                htmlFor="nickname"
                className="w-full text-[#D1D5DC] text-sm font-medium mt-5 block">
                닉네임
            </label>
            <input
                id="nickname"
                type="text"
                {...register('nickname')}
                placeholder="닉네임을 입력해주세요"
                className="w-full py-3 px-4 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {errors.nickname?.message ? <p className="text-red-400 text-sm m-1 mb-5">{errors.nickname?.message}</p> : <p className="text-[#99A1AF] text-sm m-1 mb-5">1자 이상 입력해주세요</p>}
            <label
                htmlFor="phone"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                전화번호
            </label>
            <input
                id="phone"
                type="string"
                {...register('phone')}
                placeholder="전화번호를 입력해주세요"
                className="w-full py-3 px-4 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {errors.phone?.message ? <p className="text-red-400 text-sm m-1 mb-11">{errors.phone?.message}</p> : <p className="text-[#99A1AF] text-sm m-1 mb-11">'-'을 포함하여 작성해주세요</p>}
            <button
                onClick={modal.openModal}
                className="w-full text-base font-bold mb-6 text-black bg-[#BFFF0B] py-4 rounded-md">
                회원가입
            </button>
            {!isSubmitting && (
                <OneButtonModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    activeModal={modal.activeModal}
                    title='회원가입'
                    content={registerState.success ?
                        '회원가입 성공' : registerState.message ?
                            registerState.message : `알 수 없는 오류입니다\n다시 시도해주세요`} />
            )}

        </form>
    );
}