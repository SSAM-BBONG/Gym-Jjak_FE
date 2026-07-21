'use client'

import useModal from "@/components/hooks/useModal";
import PtReviewModal from "./PtReviewModal";
import ReportButtonVer2 from "@/components/ui/ReportButtonVer2";
import { MyPtRecordDetailData } from "../type";
import { useRouter } from "next/navigation";

interface PtRecordDetailButtonProps {
    data: MyPtRecordDetailData;
    reservationId: string;
}

export default function PtRecordDetailButton({
    data,
    reservationId,
}: PtRecordDetailButtonProps) {
    const modal = useModal();
    const router = useRouter();

    return (
        <div className="grid grid-cols-4 gap-4">
                <button 
                    className="py-3 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black"
                    onClick={modal.openModal}
                    > 수강평 작성 </button>
                <PtReviewModal 
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    ptCourseId={data.ptCourseId}
                    reservationId={reservationId}
                    title={data.title}
                />
                <button className="py-3 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black"> 채팅 </button>
                <ReportButtonVer2 title={data.trainerName} targetId={data.ptCourseId} targetType="PT_COURSE" />
                <button
                    type="button"
                    className="py-3 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black"
                    onClick={() => router.back()}
                >
                    취소
                </button>
        </div>
    );
}
