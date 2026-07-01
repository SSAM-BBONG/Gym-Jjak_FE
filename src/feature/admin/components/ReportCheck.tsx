'use client'

import useModal from "@/components/hooks/useModal";
import CheckReportModal from "./modals/CheckReportModal";
import { DetailButtonImg } from "@/components/ui/image";
import Image from "next/image";


export default function ReportCheck({ reportGroupId }: { reportGroupId: number }) {


    const modal = useModal();

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <div className="relative ml-auto w-4 h-4">
                    <Image
                        src={DetailButtonImg}
                        alt="사유확인 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div> 사유확인
            </button>
            {modal.isModal &&
                <CheckReportModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    activeModal={modal.activeModal}
                    noneActiveModal={modal.noneActiveModal}
                    reportGroupId={reportGroupId}
                />
            }
        </>
    );
}