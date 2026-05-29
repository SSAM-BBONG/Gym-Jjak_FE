'use client'

import useModal from "@/components/hooks/useModal";
import { AdminAddButton } from "@/components/ui/image";
import CalendarCreateModal from "@/feature/calendar/components/CalendarCreateModal";

export default function CalendarAddButton() {
    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="bg-[#BFFF0B] w-12 h-12 rounded-[14px] flex items-center justify-center">
                <img src={AdminAddButton} />
            </button>
            <CalendarCreateModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title='모달입니다'
            />
        </>
    );
}