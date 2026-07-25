"use client";

import { useState } from "react";
import { MyPtReservationList } from "../type";
import PtRecordsErrorModal from "./PtRecordsErrorModal";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { HeaderProfile } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { cancelMyPtReservationAction } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PT_RECORD_STATUS = {
    COMPLETED: {
        label: "완료됨",
        className: "border-[#6A72824D] bg-[#6A728233] text-[#99A1AF]",
    },
    RESERVED: {
        label: "예약됨",
        className: "border-[#2B7FFF4D] bg-[#2B7FFF33] text-[#51A2FF]",
    },
    IN_PROGRESS: {
        label: "수강중",
        className: "border-[#BFFF0B4D] bg-[#BFFF0B33] text-[#BFFF0B]",
    },
    CANCELLED: {
        label: "취소됨",
        className: "border-[#FB2C364D] bg-[#FB2C3633] text-[#FF6467]",
    },
} as const;

const getLastPtDate = (lastPtDate: MyPtReservationList["lastPtDate"]) => {
    const date = typeof lastPtDate === "string"
        ? lastPtDate
        : lastPtDate?.date ?? "";

    return date.replace("T", " ").slice(0, 10);
};

interface PtRecordCardProps {
    data?: MyPtReservationList;
    errorMessage?: string;
}

export default function PtRecordCard({ data, errorMessage }: PtRecordCardProps) {
    const [isErrorModal, setIsErrorModal] = useState(Boolean(errorMessage));
    const [isCancelModal, setIsCancelModal] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);
    const router = useRouter();
    
    if (errorMessage) {
        return (
            <PtRecordsErrorModal
                isModal={isErrorModal}
                closeModal={() => setIsErrorModal(false)}
                title="PT 기록"
                content={errorMessage}
            />
        );
    }

    if (!data) return null;

    const current = data?.progressCount
    const total = data?.totalSessionCount
    const progreesPercent = total > 0 ? Math.min(100, (Math.round((current/total) * 100))) : 0;

    const status = PT_RECORD_STATUS[data.status];

    const handleCancel = async () => {
        if (isCancelling) return;

        setIsCancelling(true);
        const result = await cancelMyPtReservationAction(data.ptReservationId);
        setIsCancelling(false);

        if (!result.success) {
            setIsCancelModal(false);
            toast.error(result.message);
            return;
        }

        setIsCancelModal(false);
        toast.success(result.message);
        router.refresh();
    };

    return (
        <div className="
            overflow-hidden
            flex flex-col md:flex-row
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            ">
            <div className="relative w-full h-44 md:w-[20%] md:h-auto">
                <Image 
                    src={data.thumbnailUrl || HeaderProfile}
                    fill
                    alt="PT 기록 프로필 사진"
                />
            </div>
            <div className="
            flex flex-col gap-1 flex-8
            p-4 sm:p-5 lg:p-6
            ">
                <div className="flex justify-between items-center">
                    <p className="text-[20px] font-black text-white"> {data.title} </p>
                    <p className={`px-4 py-1 text-[12px] font-extrabold border rounded-full ${status.className}`}>
                        {status.label}
                    </p>
                </div>
                <p className="text-[14px] font-normal text-[#99A1AF]"> {data.trainerName} </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">최근 PT 날짜</p>
                        <p className="text-[14px] font-extrabold text-white">{getLastPtDate(data.lastPtDate)}</p>
                    </div>
                    <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">진척도</p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]">
                            {data.progressCount} / {data.totalSessionCount} <span className="text-[12px] font-normal text-[#6A7282]"></span> </p>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-3">
                        <div className="flex justify-between">
                            <p className="text-[12px] font-normal text-[#6A7282]">완료율</p>
                            <p className="text-[12px] font-bold text-[#BFFF0B]">{progreesPercent}%</p>
                        </div>
                        <Progress value={progreesPercent} className="h-2" />
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <Link href={`/pt/records/${data.ptReservationId}`} className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black">상세보기</Link>
                    <Link href={`/pt/records/${data.ptReservationId}/sessions`} className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black">세션 예약 목록</Link>
                    <button
                        type="button"
                        onClick={() => setIsCancelModal(true)}
                        className="px-8 py-2 bg-[#82181A4D] rounded-[10px] text-[14px] font-extrabold text-[#FF6467] hover:cursor-pointer hover:bg-[#FB2C36] hover:text-white"
                    >
                        PT 취소하기
                    </button>
                </div>
            </div>
            <TwoButtonModal
                isModal={isCancelModal}
                closeModal={() => !isCancelling && setIsCancelModal(false)}
                activeModal={handleCancel}
                title="PT 예약 취소"
                content="PT 예약을 취소하시겠습니까?"
            />
        </div>
    );
}
