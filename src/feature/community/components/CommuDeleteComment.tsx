'use client'

import { CommuCommentRemove } from "@/components/ui/image";
import Image from "next/image";
import { CommentDeleteAction } from "../action";
import { useState } from "react";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useRouter } from "next/navigation";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { toast } from "sonner";

export default function CommuDeleteComent({ commentId }: { commentId: number }) {
    const checkModal = useModal(clickDelete);
    const router = useRouter();


    async function clickDelete() {
        try {
            const response = await CommentDeleteAction(commentId);
            if (!response.success) {
                toast.error(response.message)
                return;
            }
            toast.success(response.message)
            router.refresh();
        } catch (error) {
            toast.error('네트워크 오류입니다')
        }
    }

    return (
        <>
            <button onClick={checkModal.openModal} className="relative w-3 h-3 md:w-4 md:h-4">
                <Image
                    src={CommuCommentRemove}
                    alt="댓글 삭제"
                    fill
                    sizes="w-8 h-8"
                    className="object-cover"
                />
            </button>
            <TwoButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                activeModal={checkModal.activeModal}
                title="댓글 삭제"
                content='댓글을 삭제하시겠습니까?'
            />
        </>
    );
}