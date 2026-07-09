'use client'

import { AdminManagementImg } from "@/components/ui/image";
import ChangeStateModal from "./modals/ChangeStateModal";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useActionState, useEffect, useMemo } from "react";
import { changeUserStatusAction } from "../action";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StatusButtonProps {
    userId: number;
    nickname: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
}

export default function StatusButton({ userId, nickname, status }: StatusButtonProps) {
    const router = useRouter();

    //bind()는 호출할 때마다 새 함수를 만들기 때문에 예측하기 어려운 동작이 생길 수 있어 useMemo로 작성
    const changeUserStatusActionWithId = useMemo(() => {
        return changeUserStatusAction.bind(null, userId);
    }, [userId]);

    const [state, changeUserStatusFormAction] = useActionState(changeUserStatusActionWithId, {
        success: false,
        message: '',
    })
    const checkModal = useModal();
    const modal = useModal();

    useEffect(() => {
        if (state.success) {
            modal.closeModal();
            checkModal.openModal();
            router.refresh();
        }
    }, [state.success, router])

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                <div className="relative ml-auto w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4">
                    <Image
                        src={AdminManagementImg}
                        alt="상태 변경 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div> 상태 변경
            </button>
            <ChangeStateModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                changeUserStatusFormAction={changeUserStatusFormAction}
                status={status}
                name={nickname}
                state={state}
            />
            <OneButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                title='회원 상태 변경'
                content='회원 상태가 변경되었습니다.'
            />
        </>
    );
}
