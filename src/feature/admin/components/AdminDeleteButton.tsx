'use client'

import useModal from "@/components/hooks/useModal";
import { AdminDeleteImg } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { deleteCategoryAction, deleteTagAction } from "../action";
import Image from "next/image";

export default function AdminDeleteButton({ mode, id }: { mode: '카테고리' | '태그', id: number }) {

    const handleDelete = async () => {
        if (mode === '카테고리') {
            await deleteCategoryAction(id);
        } else {
            await deleteTagAction(id);
        }
    }

    const modal = useModal(handleDelete);

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <div className="relative w-5 h-5">
                    <Image
                        src={AdminDeleteImg}
                        alt="식제 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div> 삭제하기
            </button>
            <TwoButtonModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title={`${mode} 삭제`}
                content={`삭제하시겠습니까?`}
            />
        </>

    );
}