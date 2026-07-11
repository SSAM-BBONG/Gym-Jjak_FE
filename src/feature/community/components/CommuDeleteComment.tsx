'use client'

import { CommuCommentRemove } from "@/components/ui/image";
import Image from "next/image";
import { CommentDeleteAction } from "../action";
import { useState } from "react";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useRouter } from "next/navigation";
import TwoButtonModal from "@/components/ui/TwoButtonModal";

export default function CommuDeleteComent({ commentId }: { commentId: number }) {
    const [commentState, setCommentState] = useState<string>('');
    const modal = useModal();
    const checkModal = useModal(clickDelete);
    const router = useRouter();


    async function clickDelete() {
        try {
            const response = await CommentDeleteAction(commentId);
            if (response) {
                setCommentState(response)
                modal.openModal();
                return;
            }
            router.refresh();
        } catch (error) {
            setCommentState(`네트워크 오류입니다\n다시 시도해주세요`);
            modal.openModal();
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
            <OneButtonModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                title="댓글 삭제"
                content={commentState}
            />
        </>
    );
}