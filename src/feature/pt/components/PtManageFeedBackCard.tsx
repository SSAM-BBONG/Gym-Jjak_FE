'use client'

import { useState } from "react";
import useModal from "@/components/hooks/useModal";
import { MypageMyActivity, PtRecordComplete, PtRecordVideo } from "@/components/ui/image";
import PtFeeBackCheckModal from "./PtFeedBackCheckModal";
import PtFeeBackRegistModal from "./PtFeedBackRegistModal";
import type { StudentFeedbackCurriculum } from "../type";

interface PtManageFeedBackCardProps {
  data: StudentFeedbackCurriculum[];
  reservationId: string;
  ptCourseId: string;
}

export default function PtManageFeedBackCard( { data, reservationId, ptCourseId }: PtManageFeedBackCardProps) {
    const checkModal = useModal();
    const registModal = useModal();

    const [selectedCurriculum, setSelectedCurriculum] =
        useState<StudentFeedbackCurriculum | null>(null);

    const openRegistModal = (item: StudentFeedbackCurriculum) => {
        setSelectedCurriculum(item);
        registModal.openModal();
    };

    const closeRegistModal = () => {
        registModal.closeModal();
        setSelectedCurriculum(null);
    };

    return (
        <>
        <div className="
        flex flex-col gap-6
        p-5
        border border-[#1E2939] rounded-[16px]
        bg-[#101828]
        ">
            <p className="text-[20px] font-black text-white"> 주차별 커리큘럼 & 피드백</p>

            {data.map((item) => 
                item.feedbacks ?
                (
            <div className="flex items-start gap-3 border border-[#BFFF0B4D] bg-[#1E293980] p-4 rounded-[14px]">
                <img src={PtRecordComplete} alt="피드백 등록 완료"/>
                <div className="flex flex-col gap-3 w-full">
                    <div className="flex flex-1 justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <p className="text-[16px] font-extrabold text-white"> {item.sessionNo}회차: {item.title} </p>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 수업일 : {item.feedbacks.createdAt} </p>
                        </div>
                        <button 
                            type="button"
                            onClick={registModal.openModal}
                            className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 수정 </button>
                    </div>   
                    <div className="
                    flex flex-col gap-1 w-full
                    border border-[#36415380] rounded-[10px]
                    bg-[#10182880]
                    p-4"
                    onClick={checkModal.openModal}>
                        <div className="flex flex-col gap-2 pb-2 border-b border-b-[#364153]">
                            <div className="flex justify-between">
                                <p className="flex gap-3 text-[14px] font-extrabold text-[#BFFF0B] whitespace-nowrap items-center">
                                    <img src={PtRecordVideo} alt="PT 상세 신청기록 동영상"/> 
                                    트레이너 피드백 
                                </p>
                                <p className="text-[12px] font-normal text-[#6A7282]"> {item.feedbacks.createdAt} </p>
                            </div>
                            <p className="text-[14px] font-medium text-[#99A1AF] hover:text-[#BFFF0B]"> 비디오 피드백 보기</p>
                        </div>
                        <div className="flex flex-col gap-1 pt-2">
                            <p className="flex items-center gap-3 text-[14px] font-extrabold text-[#BFFF0B]">
                                <img src={MypageMyActivity} width={16} height={16} alt="PT 상세 신청기록 동영상"/> 
                                텍스트 피드백
                            </p>
                            <p className="text-[14px] font-normal text-[#D1D5DC]"> {item.feedbacks.content} </p>
                        </div>
                    </div>
                </div>
            </div>
        ) 
        :
        (
        <div 
            key={item.ptCurriculumId}
            className="
        flex items-center justify-between gap-6
        p-5
        border border-[#1E2939] rounded-[16px]
        bg-[#101828]
        ">
            
            <div className="flex items-center gap-3">
                <p className="px-4 py-2 text-[14px] font-extrabold text-[#99A1AF] bg-[#364153] rounded-full"> {item.sessionNo} </p>
                <p className="text-[18px] font-extrabold text-white"> {item.title} </p>
            </div>
            <button
                type="button"
                onClick={() => openRegistModal(item)}
                className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 
                등록하기 
            </button>
        </div>
        ))}
        </div>
      <PtFeeBackCheckModal
        isModal={checkModal.isModal}
        closeModal={checkModal.closeModal}
      />

      <PtFeeBackRegistModal
        isModal={registModal.isModal}
        closeModal={closeRegistModal}
        reservationId={reservationId}
        ptCourseId={ptCourseId}
        curriculum={selectedCurriculum}
      />
        </>
    );
}