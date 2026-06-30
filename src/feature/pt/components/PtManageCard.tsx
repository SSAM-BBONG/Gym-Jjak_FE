'use client'

import { PtfindTestImg, PtManageUsers, PtZonePtListsActivate, PtZonePtListsDeactivate } from "@/components/ui/image";
import { PtManageListData, PtStatusChangeRequest } from "../type";
import { changePtStatus } from "../actions";

interface PtManageCardProps {
    data: PtManageListData
}

export default function PtManageCard( {data}: PtManageCardProps) {
    const currentStatus = data.status === "VISIBLE" ? "HIDDEN" : "VISIBLE"

    const handleStatusClick = async (id: number, status:"VISIBLE" | "HIDDEN") => {
        const response = await changePtStatus(id, currentStatus);
    }   

    return (
        <div className={`
        overflow-hidden
        relative
        flex flex-col
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        ${data.status === "HIDDEN" ? "opacity-50" : ""}
        `}>
            <div className={`absolute right-3 top-3 px-3 py-1 rounded-full text-[12px] font-extrabold 
                    ${data.status==="VISIBLE" ? "bg-[#BFFF0B] text-black" : "bg-[#FB2C361A] text-[#FB2C36]"}`}> 
                {data.status==="VISIBLE" ? "활성화" : "비활성화"}  
            </div>
            <div
                style={{ backgroundImage: `url(${data.thumbnailUrl})` }} 
                className="w-full h-50 bg-no-repeat bg-cover bg-center"></div>
            <div className="flex flex-col p-5 gap-2">
                <p className="text-[18px] font-black text-white"> {data.title} </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> {data.trainerName} </p>
                <div className={`
                flex flex-col gap-3
                bg-[#1E293980]
                rounded-[10px]
                p-3
                mt-3
                `}>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 whitespace-nowrap items-center">
                            <img src={PtManageUsers} alt="PT 관리 수강생"/>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 수강생 </p>
                        </div>
                        <p className="text-[14px] font-extrabold text-[#6A7282]"> <span className="text-[#BFFF0B]">{data.activeReservationCount} </span> /{data.totalReservationCount}</p>
                    </div>
                </div>
                    <button 
                        type="button"
                        onClick={() => handleStatusClick(data.ptCourseId, data.status)}
                        className={`flex justify-center items-center gap-3 py-3 rounded-[14px] mt-1
                            ${data.status==="VISIBLE" ? "bg-[#1E2939]" : "bg-[#BFFF0B1A]"}`}
                    >
                        {data.status === "VISIBLE"
                        ?
                        (
                        <>
                            <img src={PtZonePtListsDeactivate} /> 
                            <p className="text-[14px] text-[#D1D5DC] font-bold"> 비활성화로 전환 </p>
                        </>
                        )
                        :
                        (
                        <>
                            <img src={PtZonePtListsActivate} /> 
                            <p className="text-[14px] text-[#BFFF0B] font-bold"> 활성화로 전환 </p>
                        </>
                        )}
                    </button>
            </div>
        </div>
    );
}