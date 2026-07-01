'use client'

import useModal from "@/components/hooks/useModal";
import { AdminAddButton } from "@/components/ui/image";
import CalendarCreateModal from "@/feature/calendar/components/CalendarCreateModal"
import Image from "next/image";

export default function CalendarAddButton({ selectedSettingDate }: { selectedSettingDate: string }) {
    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="bg-[#BFFF0B] w-12 h-12 rounded-[14px] flex items-center justify-center">
                <div className="relative w-8 h-8">
                    <Image
                        src={AdminAddButton}
                        alt="일정 추가 버튼"
                        fill
                        priority
                        sizes="w-12 h-12"
                    />
                </div>

            </button>
            {modal.isModal && <CalendarCreateModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                selectedSettingDate={selectedSettingDate}
            />}
        </>
    );
}