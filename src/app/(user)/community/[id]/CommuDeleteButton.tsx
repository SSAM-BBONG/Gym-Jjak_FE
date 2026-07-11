'use client'

import useModal from "@/components/hooks/useModal";
import { CommuDetailRemove } from "@/components/ui/image";
import OneButtonModal from "@/components/ui/OneButtonModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { CommunityDeleteAction } from "@/feature/community/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CommuDeleteButton({ postId }: { postId: number }) {
    const [communityState, setCommentState] = useState<string>('');
    const modal = useModal();
    const checkModal = useModal(clickDelete);
    const router = useRouter();

    async function clickDelete() {
        try {
            const response = await CommunityDeleteAction(postId);
            if (response) {
                setCommentState(response)
                modal.openModal();
                return;
            }
            router.push('/community?page=0')
        } catch (error) {
            setCommentState(`네트워크 오류입니다\n다시 시도해주세요`);
            modal.openModal();
        }
    }

    return (
        <>
            <button
                onClick={checkModal.openModal}
                className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                <div className="relative w-3 h-3 md:w-4 md:h-4">
                    <Image
                        src={CommuDetailRemove}
                        alt="게시글 삭제"
                        fill
                        sizes="w-8 h-8"
                        className="object-cover hover:cursor-pointer"
                    />
                </div>
            </button>
            <TwoButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                activeModal={checkModal.activeModal}
                title="게시글 삭제"
                content='게시글을 삭제하시겠습니까?'
            />
            <OneButtonModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                title="게시글 삭제"
                content={communityState}
            />
        </>
    );
}