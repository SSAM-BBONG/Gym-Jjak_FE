"use client";

import { useState } from "react";
import { MyPtReservationList } from "../type";
import PtRecordsErrorModal from "./PtRecordsErrorModal";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import { HeaderProfile } from "@/components/ui/image";

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

interface PtRecordCardProps {
    data?: MyPtReservationList;
    errorMessage?: string;
}

export default function PtRecordCard({ data, errorMessage }: PtRecordCardProps) {
    const [isErrorModal, setIsErrorModal] = useState(Boolean(errorMessage));
    
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
 
    return (
        <div className="
            overflow-hidden
            flex
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            ">
            <div className="relative w-[20%]">
                <Image 
                    src={data.thumbnailUrl || HeaderProfile}
                    fill
                    alt="PT 기록 프로필 사진"
                />
            </div>
            <div className="
            flex flex-col gap-1 flex-8
            p-6
            ">
                <div className="flex justify-between items-center">
                    <p className="text-[20px] font-black text-white"> {data.title} </p>
                    <p className={`px-4 py-1 text-[12px] font-extrabold border rounded-full ${status.className}`}>
                        {status.label}
                    </p>
                </div>
                <p className="text-[14px] font-normal text-[#99A1AF]"> {data.trainerName} </p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">최근 PT 날짜</p>
                        <p className="text-[14px] font-extrabold text-white">{data.lastPtDate}</p>
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
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black"> 채팅하기 </button>
                    <Link href={`/pt/records/${data.ptReservationId}`}>
                        <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white hover:cursor-pointer hover:bg-[#BFFF0B] hover:text-black"> 상세보기 </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
