'use client'

import { AdminManagementImg } from "@/components/ui/image";
import ChangeStateModal from "./modals/ChangeStateModal";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useActionState, useEffect } from "react";
import { changeUserStatusAction } from "../action";

interface StatusButtonProps {
    userId: number;
    nickname: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
}

export default function StatusButton({ userId, nickname, status }: StatusButtonProps) {

    const [state, changeUserStatusFormAction] = useActionState(changeUserStatusAction.bind(null, userId), {
        success: false,
        message: '',
    })
    const checkModal = useModal();
    const modal = useModal();

    useEffect(() => {
        if (state.success) {
            modal.closeModal();
            checkModal.openModal();
        }
    }, [state.success])

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