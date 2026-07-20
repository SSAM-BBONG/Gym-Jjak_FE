'use client'

import useModal from "@/components/hooks/useModal";
import { AdminUpdateImg } from "@/components/ui/image";
import AdminAddModal from "./modals/AdminAddModal";
import Image from "next/image";

export default function AdminUpdateButton({ id, exercise }: { id: number, exercise: Exercise }) {

    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                <div className="relative w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
                    <Image
                        src={AdminUpdateImg}
                        alt="수정 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div> 수정하기
            </button>
            <AdminAddModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                system="update"
                id={id}
                exercise={exercise} />
        </>

    );
}
