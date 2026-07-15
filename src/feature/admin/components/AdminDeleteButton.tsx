'use client'

import useModal from "@/components/hooks/useModal";
import { AdminDeleteImg } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { deleteExerciseAction } from "../action";
import Image from "next/image";

export default function AdminDeleteButton({ id }: { id: number }) {

    const handleDelete = async () => {
        await deleteExerciseAction(id);
    }

    const modal = useModal(handleDelete);

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                <div className="relative w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
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
                title={`운동 종류 삭제`}
                content={`삭제하시겠습니까?`}
            />
        </>

    );
}
