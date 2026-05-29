'use client'

import useModal from "@/components/hooks/useModal";
import { AdminAddButton } from "@/components/ui/image";
import AdminAddModal from "@/feature/admin/components/modals/AdminAddModal";

export default function SystemAddButton({ text }: { text: string }) {
    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-3 bg-[#BFFF0B] text-black text-base font-bold ml-auto px-6 py-3.5 rounded-md">
                <img src={AdminAddButton} /><p>{text} 추가</p>
            </button>
            <AdminAddModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                mode={text}
                system="create"
                title='모달입니다' />
        </>

    );
}