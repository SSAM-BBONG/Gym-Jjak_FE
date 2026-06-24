'use client'

import { AdminManagementImg } from "@/components/ui/image";
import ChangeStateModal from "./modals/ChangeStateModal";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useActionState, useEffect, useMemo } from "react";
import { changeUserStatusAction } from "../action";
import { useRouter } from "next/navigation";

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
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <img src={AdminManagementImg} /> 상태 변경
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