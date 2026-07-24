'use client'

import useModal from "@/components/hooks/useModal";
import { PtRecordComplete, PtRecordVideo } from "@/components/ui/image";
import PtFeeBackCheckModal from "./PtFeedBackCheckModal";
import { useState } from "react";
import { MyPtRecordDetailCurriculum } from "../type";
import PtRecordsErrorModal from "./PtRecordsErrorModal";

interface PfFeebBackCardProps {
    data: MyPtRecordDetailCurriculum[];
    reservationId: string;
    errorMessage?: string;
}

export default function PfFeebBackCard({ data, reservationId, errorMessage }: PfFeebBackCardProps) {

    const modal = useModal();
    const [isErrorModal, setIsErrorModal] = useState(Boolean(errorMessage));
    const [selectedFeedbackId, setSelectedFeedbackId] = useState<number | null>(null);

    const openFeedbackModal = (feedbackId: null | number) => {
        setSelectedFeedbackId(feedbackId);
        modal.openModal();
    };

    const closeFeedbackModal = () => {
        modal.closeModal();
        setSelectedFeedbackId(null);
    };


    return (
        <>
            {errorMessage && (
                <PtRecordsErrorModal
                    isModal={isErrorModal}
                    closeModal={() => setIsErrorModal(false)}
                    title="PT 기록"
                    content={errorMessage}
                />
            )}
            {data.map((item) => item.feedbackId
                ?
                (
                    <div
                        key={item.id}
                        className="
                flex flex-col gap-4
                p-4 sm:gap-5 sm:p-5 lg:gap-6
                border border-[#1E2939] rounded-[16px]
                bg-[#101828]
                ">
                        <div className="flex items-start gap-3">
                            <p className="px-4 py-2 text-[14px] font-extrabold text-black bg-[#BFFF0B] rounded-full"> {item.sessionNo} </p>
                            <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[18px] font-extrabold text-white"> {item.title}</p>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 2026-05-01 </p>
                                </div>
                                <div className="flex gap-2">
                                    <img src={PtRecordComplete} alt="PT 신청기록 완료" />
                                    {/* <div className="relative w-4 h-4">
                                        <Image
                                            src={PtRecordComplete}
                                            alt="PT 신청기록 완료"
                                            fill
                                            priority
                                            sizes="w-8 h-8"
                                            className="object-cover"
                                        />
                                    </div> */}
                                    <p className="px-3 py-1 bg-[#BFFF0B33] rounded-full text-[12px] font-extrabold text-[#BFFF0B]"> 완료 </p>
                                </div>
                            </div>
                        </div>

                        <div className="
            flex flex-col gap-1
            rounded-[10px]
            bg-[#1E293980]
            p-4"
                            onClick={() => openFeedbackModal(item.feedbackId)}>
                            <p className="flex gap-3 text-[14px] font-extrabold text-[#BFFF0B]">
                                <img src={PtRecordVideo} alt="PT 상세 신청기록 동영상" />
                                {/* <div className="relative w-4 h-4">
                                    <Image
                                        src={PtRecordVideo}
                                        alt="PT 상세 신청기록 동영상"
                                        fill
                                        priority
                                        sizes="w-8 h-8"
                                        className="object-cover"
                                    />
                                </div> */}
                                트레이너 피드백
                            </p>
                            <p className="text-[12px] font-medium text-[#99A1AF]"> 클릭하여 확인하기 </p>
                        </div>
                    </div>
                )
                :
                (
                    <div
                        key={item.id}
                        className="
                        flex flex-col items-center justify-between gap-3
        p-4 sm:flex-row sm:gap-6 sm:p-5
        border border-[#1E2939] rounded-[16px]
        bg-[#101828]
        ">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <p className="px-4 py-2 text-[14px] font-extrabold text-[#99A1AF] bg-[#364153] rounded-full"> {item.sessionNo} </p>
                            <p className="text-[18px] font-extrabold text-white"> {item.title}</p>
                        </div>
                        <p className="px-3 py-1 text-[12px] font-extrabold text-[#99A1AF] bg-[#364153] rounded-full"> 미완료 </p>
                    </div>
                ))}
            <PtFeeBackCheckModal
                isModal={modal.isModal}
                closeModal={closeFeedbackModal}
                reservationId={reservationId}
                feedbackId={selectedFeedbackId}
            />

        </>
    );
}
