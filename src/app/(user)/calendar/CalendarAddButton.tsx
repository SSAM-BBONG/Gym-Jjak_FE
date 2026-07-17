'use client'

import useModal from "@/components/hooks/useModal";
import { AdminAddButton } from "@/components/ui/image";
import OneButtonModal from "@/components/ui/OneButtonModal";
import CalendarCreateModal from "@/feature/calendar/components/CalendarCreateModal"
import Image from "next/image";

export default function CalendarAddButton({ selectedSettingDate }: { selectedSettingDate: string }) {
    const modal = useModal();
    const checkModal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="bg-[#BFFF0B] w-10 h-10 md:w-12 md:h-12 rounded-[14px] flex items-center justify-center">
                <div className="relative w-8 h-8">
                    <Image
                        src={AdminAddButton}
                        alt="일정 추가 버튼"
                        fill
                        sizes="w-12 h-12"
                    />
                </div>

            </button>
            {modal.isModal && <CalendarCreateModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                selectedSettingDate={selectedSettingDate}
                openCheck={checkModal.openModal}
            />}
            <OneButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                title="운동 일지"
                content='등록되었습니다'
            />
        </>
    );
}