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
        formState: { errors, isSubmitting, isValid },
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                className="w-full py-3 px-4 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {/* {errors.username?.message && <p className="text-white">{errors.username?.message}</p>} */}
            <label
                htmlFor="password"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                비밀번호
            </label>
            <div
                className="flex w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                <input
                    id="password"
                    type="password"
                    {...register('password')}
                    placeholder="비밀번호를 입력해주세요"
                    className="w-full focus:outline-0"
                /><img />
            </div>
            {errors.password?.message && <p className="text-white">{errors.password?.message}</p>}
            <label
                htmlFor="passwordCheck"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                비밀번호 확인
            </label>
            <div
                className="flex w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                <input
                    id="passwordCheck"
                    type="password"
                    {...register('passwordCheck')}
                    placeholder="비밀번호를 다시 입력해주세요"
                    className="w-full focus:outline-0"
                /><img />
            </div>
            {errors.passwordCheck?.message && <p className="text-white">{errors.passwordCheck?.message}</p>}
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
                className="w-full py-3 px-4 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {/* {errors.name?.message && <p className="text-white">{errors.name?.message}</p>} */}
            <label
                htmlFor="nickname"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                닉네임
            </label>
            <input
                id="nickname"
                type="text"
                {...register('nickname')}
                placeholder="닉네임을 입력해주세요"
                className="w-full py-3 px-4 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {/* {errors.nickname?.message && <p className="text-white">{errors.nickname?.message}</p>} */}
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
                className="w-full py-3 px-4 mb-11 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            {/* {errors.phone?.message && <p className="text-white">{errors.phone?.message}</p>} */}
            <button
                type="submit"
                className="w-full text-base font-bold mb-6.5 text-black bg-[#BFFF0B] py-4 rounded-md">회원가입</button>

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