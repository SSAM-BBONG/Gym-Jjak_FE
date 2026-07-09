'use client'

import useModal from "@/components/hooks/useModal";
import { AdminAddButton } from "@/components/ui/image";
import AdminAddModal from "@/feature/admin/components/modals/AdminAddModal";
import Image from "next/image";

export default function SystemAddButton({ text }: { text: '카테고리' | '태그' }) {
    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-[#BFFF0B] text-black text-[10px] sm:text-sm lg:text-base font-bold ml-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-3.5 rounded-md">
                <div className="relative w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">
                    <Image
                        src={AdminAddButton}
                        alt="추가 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div>
                <p>{text} 추가</p>
            </button>
            <AdminAddModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                mode={text}
                system="create"
            />
        </>

    );
}
