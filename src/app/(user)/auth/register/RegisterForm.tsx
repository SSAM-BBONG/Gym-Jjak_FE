'use client'

import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignUpFormData, signUpSchema } from "@/lib/registerSchema";
import { registerAction } from "@/feature/auth/action";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface registerStateType {
    success: boolean;
    message?: string
}

export default function RegisterForm() {
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
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange',
    });


    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await registerAction(data);
            setRegisterState(result)
            modal.openModal();
        } catch (error) {
            setRegisterState({
                success: false,
                message: '네트워크 연결이 원활하지 않습니다.'
            });
            modal.openModal();
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full lg:w-md">
            <label
                htmlFor="username"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                이메일
            </label>
            <input
                id="username"
                type="email"
                {...register('username')}
                placeholder="이메일을 입력해주세요"
                className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {errors.username?.message ? <p className="text-red-400 text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">{errors.username?.message}</p> : <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">이메일 양식에 맞춰주세요</p>}
            <label
                htmlFor="password"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                비밀번호
            </label>
            <div
                className="flex w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full focus:outline-0"
                />
            </div>
            {errors.password?.message ? <p className="text-red-400 text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">{errors.password?.message}</p> : <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">숫자, 영어, 특수문자를 포함하여 8~16자로 작성해주세요</p>}
            <label
                htmlFor="passwordCheck"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                비밀번호 확인
            </label>
            <div
                className="flex w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                <input
                    id="passwordCheck"
                    type="password"
                    {...register('passwordCheck')}
                    placeholder="비밀번호를 다시 입력해주세요"
                    className="w-full focus:outline-0"
                />
            </div>
            {errors.passwordCheck?.message ? <p className="text-red-400 text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">{errors.passwordCheck?.message}</p> : <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5"> </p>}
            <label
                htmlFor="name"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                이름
            </label>
            <input
                id="name"
                type="text"
                {...register('name')}
                placeholder="이름을 입력해주세요"
                className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {errors.name?.message && <p className="text-red-400 text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">{errors.name?.message}</p>}
            <label
                htmlFor="nickname"
                className="w-full text-[#D1D5DC] text-sm font-medium mt-4 sm:mt-5 lg:mt-5 block">
                닉네임
            </label>
            <input
                id="nickname"
                type="text"
                {...register('nickname')}
                placeholder="닉네임을 입력해주세요"
                className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {errors.nickname?.message ? <p className="text-red-400 text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">{errors.nickname?.message}</p> : <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm m-1 mb-4 sm:mb-5 lg:mb-5">1자 이상 입력해주세요</p>}
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
                className="w-full py-2.5 sm:py-3 lg:py-3 px-3 sm:px-4 lg:px-4 text-sm sm:text-base lg:text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {errors.phone?.message ? <p className="text-red-400 text-xs sm:text-sm lg:text-sm m-1 mb-8 sm:mb-9 md:mb-10 lg:mb-11">{errors.phone?.message}</p> : <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm m-1 mb-8 sm:mb-9 md:mb-10 lg:mb-11">'-'을 포함하여 작성해주세요</p>}
            <button
                type="submit"
                className="w-full text-sm sm:text-base lg:text-base font-bold mb-5 sm:mb-6 lg:mb-6.5 text-black bg-[#BFFF0B] py-3 sm:py-3.5 lg:py-4 rounded-md">회원가입
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
