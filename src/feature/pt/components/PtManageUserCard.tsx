'use client'

import Link from "next/link";
import { PtReservationStatusChangeRequest, PtReservationStudent } from "../type";
import { changePtReservationStatus } from "../actions";
import ReportButtonVer2 from "@/components/ui/ReportButtonVer2";
import Image from "next/image";
import { HeaderProfile } from "@/components/ui/image";
import { Progress } from "@/components/ui/progress";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useState } from "react";
import useModal from "@/components/hooks/useModal";
import { createChatRoomAction } from "@/feature/chat/actions";
import { useRouter } from "next/navigation";

interface PtManageUserCardProps {
    data: PtReservationStudent;
    id: number;
}

const STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: "수강중",
  COMPLETED: "완료됨",
  CANCELLED: "취소됨",
  RESERVED: "예약됨",
};

export default function PtManageUserCard( {data, id}: PtManageUserCardProps) {
    const [selectedStatus, setSelectedStatus] = useState(data.status);
    const [errorMessage, setErrorMessage] = useState("");
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [isCreatingChat, setIsCreatingChat] = useState(false);
    const [chatErrorMessage, setChatErrorMessage] = useState("");
    const chatErrorModal = useModal();
    const router = useRouter();
        
    
    const handleStatusChange = async (
    status: PtReservationStatusChangeRequest["status"]
    ) => {
        setIsChanging(true);

        const response = await changePtReservationStatus(
            id,
            data.ptReservationId,
            status
        );

        setIsChanging(false);

        if (!response.success) {
            setErrorMessage(response.message);
            setIsErrorModalOpen(true);
            return;
        }

        setSelectedStatus(response.data.status);
    };
    const current = data.progressCount
    const total = data.totalSessionCount
    const progreesPercent = total > 0 ? Math.min(100, (Math.round((current/total) * 100))) : 0;
    
    const handleChatClick = async () => {
        if (isCreatingChat) return;

        setIsCreatingChat(true);

        try {
            const result = await createChatRoomAction({ ptCourseId: id });

            if (!result.success) {
                setChatErrorMessage(result.message);
                chatErrorModal.openModal();
                return;
            }

            router.push(`/chat/${result.data.chatRoomId}`);
        } finally {
            setIsCreatingChat(false);
        }
    };
    
    return (
        <div className="
        flex gap-4 items-start
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex items-center justify-center flex-1 size-24 border-[3px] border-[#6A7282] rounded-full">
                <Image 
                    alt="회원 이미지"
                    src={HeaderProfile}
                    width={50}
                    height={50}
                />
            </div>
            <div className="flex flex-col gap-4 flex-9">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <p className="text-[20px] font-black text-white"> {data.nickname} </p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 최근 강습: {data.lastPtDate} </p>
                    </div>
                    <div className="px-4 py-1 border border-[#BFFF0B4D] bg-[#BFFF0B4D] rounded-full text-[12px] font-extrabold text-[#BFFF0B]">   {STATUS_LABEL[data.status] ?? "상태 확인 필요"} </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-3 flex-col gap-1 p-4 rounded-[10px] bg-[#1E293980]"> 
                        <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 </p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {data.progressCount}/{data.totalSessionCount} </p>
                    </div>
                    <div className="flex flex-7 flex-col gap-2 p-4 rounded-[10px] bg-[#1E293980]"> 
                        <div className="flex justify-between">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 완료율 </p>
                            <p className="text-[12px] font-bold text-[#BFFF0B]"> {progreesPercent}% </p>
                        </div>
                        <Progress value={progreesPercent} className="h-2" />
                    </div>
                </div>

                <div className="flex gap-4">
                <Link 
                    href={`/pt/manage/${id}/users/${data.ptReservationId}`}
                > 
                    <button type="button" className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white hover:bg-[#BFFF0B] hover:text-[black]"> 피드백 작성 </button>
                </Link>   
                    
                    <button
                        type="button"
                        onClick={handleChatClick}
                        disabled={isCreatingChat}
                        className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white hover:bg-[#BFFF0B] hover:text-[black] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isCreatingChat ? "채팅방 생성 중..." : "채팅하기"}
                    </button>
                    <ReportButtonVer2 title={data.nickname} targetId={data.ptReservationId} targetType="PT_COURSE" />
                    <select
                        className="px-3 py-2 rounded-[10px] border border-[#1E2939] bg-[#1E2939] text-[14px] font-extrabold text-white focus:outline-none hover:border-[#BFFF0B]"
                        value={selectedStatus}
                        disabled={isChanging}
                        onChange={(event) =>
                            handleStatusChange(
                            event.target.value as PtReservationStatusChangeRequest["status"]
                            )
                        }
                    >
                        <option value="IN_PROGRESS">수강중</option>
                        <option value="RESERVED">예약됨</option>
                        <option value="COMPLETED">완료됨</option>
                        <option value="CANCELLED">취소됨</option>
                    </select>
                    <OneButtonModal
                        isModal={isErrorModalOpen}
                        closeModal={() => setIsErrorModalOpen(false)}
                        title="상태 변경 실패"
                        content={errorMessage}
                    />
                    <OneButtonModal
                        isModal={chatErrorModal.isModal}
                        closeModal={chatErrorModal.closeModal}
                        title="채팅방 생성 실패"
                        content={chatErrorMessage}
                    />
                </div>
            </div>
        </div>
    );
}
