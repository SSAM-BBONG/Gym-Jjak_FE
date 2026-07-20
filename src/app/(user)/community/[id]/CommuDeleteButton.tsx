'use client'

import useModal from "@/components/hooks/useModal";
import { CommuDetailRemove } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { CommunityDeleteAction } from "@/feature/community/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CommuDeleteButton({ postId }: { postId: number }) {
    const checkModal = useModal(clickDelete);
    const router = useRouter();

    async function clickDelete() {
        try {
            const response = await CommunityDeleteAction(postId);
            if (!response.success) {
                toast.error(response.message)
                return;
            }
            toast.success(response.message)
            router.push('/community?page=0')
        } catch (error) {
            toast.error('네트워크 오류입니다')
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
        </>
    );
}