'use client'

import useModal from "@/components/hooks/useModal";
import { sendButton } from "@/components/ui/image";
import { commentAction } from "@/feature/community/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CommentBar({ postId }: { postId: number }) {

    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<{ comment: string }>({
        mode: 'onSubmit',
    });

    const onSubmit = async (data: { comment: string }) => {
        const formData = new FormData();
        formData.set('comment', data.comment);
        try {
            const result = await commentAction(postId, formData);
            if (!result?.success) {
                toast.error(result.message)
                return;
            }

            reset();
            toast.success(result.message)
            router.refresh();
        } catch (error) {
            toast.error('네트워크 오류입니다')

        }

    }

    return (
        <div className="w-full ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center  rounded-[5px] md:rounded-[10px] border-[#364153] bg-[#1E2939] mx-7 sm:mx-15 md:mx-0 py-4 px-4 mb-6 gap-4">
                <input
                    aria-label="댓글 내용"
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
        </div>
    );
}