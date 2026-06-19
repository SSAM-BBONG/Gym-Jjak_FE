'use client'

import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useActionState } from "react";

export default function FindPwForm() {
    // const [state, loginFormAction, ispending] = useActionState(loginAction, {
    //     success: false,
    //     message: '',
    //     errors: {}
    // })

    // const modal = useModal();
    return (
        <form
            // action={loginFormAction}
            className="w-md">
            <label
                htmlFor="username"
                className="w-full text-[#D1D5DC] text-sm font-medium">
                이메일
            </label>
            <input
                name="username"
                id="username"
                type="email"
                placeholder="이메일을 입력해주세요"
                className="w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
            <button
                // onClick={modal.openModal}
                className="w-full text-base font-bold mb-6 text-black bg-[#BFFF0B] py-4 rounded-md">
                로그인
            </button>
            {/* {!ispending && (
                <OneButtonModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    activeModal={modal.activeModal}
                    title='비밀번호 발급'
                    content={ispending ? '비밀번호 발급 중' : state.success ? `비밀번호 발급 성공\n이메일을 확인해주세요` : state.message ? state.message : `알 수 없는 오류입니다\n다시 시도해주세요`} />
            )} */}
        </form>
    );
}