'use client'

import useModal from "@/components/hooks/useModal";
import { sendButton } from "@/components/ui/image";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { commentAction } from "@/feature/community/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CommentBar({ postId }: { postId: number }) {

    const [commentState, setCommentState] = useState<{ success: boolean, message: string }>({
        success: false,
        message: ''
    });

    const router = useRouter();

    const modal = useModal();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<{ comment: string }>({
        mode: 'onSubmit',
    });

    const onSubmit = async (data: { comment: string }) => {
        if (!data.comment.trim()) {
            return;
        }
        const formData = new FormData();
        formData.set('comment', data.comment);
        try {
            const result = await commentAction(postId, formData);
            if (!result?.success) {
                setCommentState(result);
                modal.openModal();
                return;
            }

            reset();
            router.refresh();
        } catch (error) {
            setCommentState({
                success: false,
                message: `네트워크 오류입니다\n다시 시도해주세요`
            });
            modal.openModal();
        }

    }

    return (
        <div className="w-full ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center  rounded-[5px] md:rounded-[10px] border-[#364153] bg-[#1E2939] mx-7 sm:mx-15 md:mx-0 py-4 px-4 mb-6 gap-4">
                <input
                    type="text"
                    {...register('comment')}
                    className="w-full text-white outline-none placeholder:text-[#6A7282] text-[12px] md:placeholder:text-[14px] placeholder:font-normal"
                    placeholder="댓글을 입력하세요" />
                <button
                    disabled={isSubmitting}
                    className="relative w-7 h-6">
                    <Image
                        src={sendButton}
                        alt="채팅 기능 이미지"
                        fill
                        sizes="w-20 h-20"
                        className="object-cover"
                    />
                </button>
            </form>
            <OneButtonModal
                isModal={modal.isModal}
                closeModal={modal.activeModal}
                activeModal={modal.activeModal}
                title="댓글"
                content={commentState.message}
            />
        </div>
    );
}