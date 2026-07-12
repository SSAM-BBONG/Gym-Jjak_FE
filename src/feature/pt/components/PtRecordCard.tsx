"use client";

import { useState } from "react";
import { MyPtReservationList } from "../type";
import PtRecordsErrorModal from "./PtRecordsErrorModal";

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

    return (
        <div className="
            overflow-hidden
            flex
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            ">
            <div
                style={{ backgroundImage: `url(${data.thumbnailUrl})` }}
                className="flex-2 bg-no-repeat bg-cover"></div>
            <div className="
            flex flex-col gap-1 flex-8
            p-6
            ">
                <div className="flex justify-between items-center">
                    <p className="text-[20px] font-black text-white"> {data.title} </p>
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#BFFF0B4D] bg-[#BFFF0B33] text-[#BFFF0B] rounded-full"> 
                        {data.status==="COMPLETED" ? "수강완료" : data.status==="RESERVED" ? "예약완료" : data.status==="IN_PROGRESS" ? "예약 중" : "취소" } 

                    </p>
                    {/* <p className="px-4 py-1 text-[12px] font-extrabold border border-[#6A72824D] bg-[#6A728233] text-[#99A1AF] rounded-full"> 완료 </p>
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#2B7FFF4D] bg-[#2B7FFF33] text-[#51A2FF] rounded-full"> 예약됨 </p>
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#FB2C364D] bg-[#FB2C3633] text-[#FF6467] rounded-full"> 취소 </p> */}
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
                            {data.progressCount} / {data.totalSessionCount} <span className="text-[12px] font-normal text-[#6A7282]">(25%)</span> </p>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">완료율</p>
                        <div className="flex h-2 bg-[#364153] rounded-full">
                            <p className="w-[30%] bg-[#BFFF0B] rounded-full"></p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white hover:cursor-pointer"> 채팅하기 </button>
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white hover:cursor-pointer"> 상세보기 </button>
                </div>
            </div>
        </div>
    );
}
