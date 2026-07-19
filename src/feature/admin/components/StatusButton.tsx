'use client'

import { AdminManagementImg } from "@/components/ui/image";
import ChangeStateModal from "./modals/ChangeStateModal";
import useModal from "@/components/hooks/useModal";
import { useActionState, useMemo } from "react";
import { changeUserStatusAction } from "../action";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface StatusButtonProps {
    userId: number;
    nickname: string;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
}

export default function StatusButton({ userId, nickname, status }: StatusButtonProps) {
    const modal = useModal();

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
            {modal.isModal &&
                <ChangeStateModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    status={status}
                    name={nickname}
                    userId={userId}
                />
            }
        </>
    );
}
