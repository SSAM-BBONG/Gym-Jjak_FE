'use client'

import { useState } from "react";
import { checkPasswordAction } from "../actions";
import { useRouter } from "next/navigation";

interface PasswordCheckModalProps {
    isModal: boolean;
    closeModal: () => void;
    movePath?: string;
    checkPassword?: () => Promise<void>;
}

export default function PasswordCheckModal({ isModal, closeModal, movePath, checkPassword}: PasswordCheckModalProps) {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleClose = () => {
        setPassword("");
        setMessage("");
        setIsPending(false);
        closeModal();
    };

    if (!isModal) return null;

    const handleSubmit = async () => {
    setIsPending(true);
    setMessage("");

    const result = await checkPasswordAction(password);

    if (!result.success) {
        setMessage(result.message);
        setIsPending(false);
        return;
    }

    if (checkPassword) {
        await checkPassword();
    }

    handleClose();

    if (movePath) {
        router.push(movePath);
    }
    };


    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={handleClose}
        >
            <div
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 sm:w-4/5 md:w-3/5 lg:w-md h-auto rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-4 sm:p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-3"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <h3 className="font-bold text-base md:text-lg lg:text-xl mb-3 md:mb-4 text-[#E8EAF0]">비밀번호 확인</h3>
                  <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="현재 비밀번호를 입력하세요"
                        className="w-full h-12 md:h-[50px] p-3 md:p-4 text-sm md:text-base text-white border border-[#3364153] bg-[#1E2939] rounded-[10px]"
                    />

                    {message && (
                        <p className="mt-3 text-[12px] text-[#FF6467]">{message}</p>
                    )}
                </article>
                <article className='c-modal-btn-ct'>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isPending}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                    >
                        {isPending ? "확인 중..." : "확인"} 
                    </button>
                </article>
            </div>
        </section>

    );
}