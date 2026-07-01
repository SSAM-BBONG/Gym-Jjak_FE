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
                className="flex items-center gap-3 bg-[#BFFF0B] text-black text-base font-bold ml-auto px-6 py-3.5 rounded-md">
                <div className="relative w-6 h-6">
                    <Image
                        src={AdminAddButton}
                        alt="추가 버튼"
                        fill
                        priority
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