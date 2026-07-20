'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import CheckViewModal from "./modals/CheckViewModal";
import Image from "next/image";

interface DetailButtonMode {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST';
    reportId: number
}


export default function ReportDetailButton({ mode, reportId }: DetailButtonMode) {


    const viewModal = useModal();

    const handleClickButton = (): void => {
        if (mode === 'TRAINER_REVIEW' || mode === 'COMMENT') {
            viewModal.openModal();
        } else if (mode === 'POST') {
            window.open(`http://localhost:3000/community/${reportId}`, "_blank", "noopener,noreferrer");
        }
    }

    return (
        <>
            <button
                onClick={handleClickButton}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                <div className="relative ml-auto w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
                    <Image
                        src={DetailButtonImg}
                        alt="상세보기 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div> 상세보기
            </button>
            <CheckViewModal
                isModal={viewModal.isModal}
                closeModal={viewModal.closeModal}
                mode={mode}
                nickname='모달입니다'
                content=""
            />
        </>
    );
}
