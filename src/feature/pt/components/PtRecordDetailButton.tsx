'use client'

import useModal from "@/components/hooks/useModal";
import PtReviewModal from "./PtReviewModal";
import PtRecordsErrorModal from "./PtRecordsErrorModal";
import ReportButtonVer2 from "@/components/ui/ReportButtonVer2";
import { MyPtRecordDetailData } from "../type";
import { useRouter } from "next/navigation";
import { createChatRoomAction } from "@/feature/chat/actions";
import { useState } from "react";

interface PtRecordDetailButtonProps {
    data: MyPtRecordDetailData;
    reservationId: string;
}

export default function PtRecordDetailButton({
    data,
    reservationId,
}: PtRecordDetailButtonProps) {
    const modal = useModal();
    const errorModal = useModal();
    const chatErrorModal = useModal();
    const router = useRouter();
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [chatErrorMessage, setChatErrorMessage] = useState("");

    const isCompleted = data.status === "COMPLETED";

    const chatClick = async () => {
        if (isCreatingChat) return;

        setIsCreatingChat(true);

        const result = await createChatRoomAction({
            ptCourseId: data.ptCourseId,
        });

        if (result.success === false) {
            setChatErrorMessage(result.message);
            chatErrorModal.openModal();
            return;
        }

         router.push(`/chat/${result.data.chatRoomId}`);
    }

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                <button
                    type="button"
                    className={`py-3 rounded-[10px] text-[14px] font-extrabold sm:text-[16px] hover:cursor-pointer ${
                        isCompleted
                            ? "bg-[#1E2939] text-white hover:bg-[#BFFF0B] hover:text-black"
                            : "bg-[#1E2939] text-white/40"
                    }`}
                    onClick={isCompleted ? modal.openModal : errorModal.openModal}
                    > 수강평 작성 </button>
                <PtReviewModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    ptCourseId={data.ptCourseId}
                    reservationId={reservationId}
                    title={data.title}
                />
                <PtRecordsErrorModal
                    isModal={errorModal.isModal}
                    closeModal={errorModal.closeModal}
                    title="알림"
                    content="완료된 PT 예약에만 강사평을 작성할 수 있습니다."
                />
                <PtRecordsErrorModal
                    isModal={chatErrorModal.isModal}
                    closeModal={chatErrorModal.closeModal}
                    title="채팅방 생성 실패"
                    content={chatErrorMessage}
                />
                <button
                    type="button"
                    onClick={chatClick}
                    disabled={isCreatingChat}
                    className="py-3 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white sm:text-[16px] hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isCreatingChat ? "채팅방 생성 중..." : "채팅"}
                </button>
                <ReportButtonVer2 title={data.trainerName} targetId={data.ptCourseId} targetType="PT_COURSE" />
                <button
                    type="button"
                    className="py-3 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white sm:text-[16px] hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black"
                    onClick={() => router.back()}
                >
                    돌아가기
                </button>
        </div>
    );
}
