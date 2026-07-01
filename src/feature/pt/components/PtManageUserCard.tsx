'use client'

import Link from "next/link";
import { PtReservationStatusChangeRequest, PtReservationStudent } from "../type";
import { changePtReservationStatus } from "../actions";

interface PtManageUserCardProps {
    data: PtReservationStudent;
    id: number;
}

export default function PtManageUserCard( {data, id}: PtManageUserCardProps) {
    const handleStatusChange = async ( status:PtReservationStatusChangeRequest["status"]) => {
        const response = await changePtReservationStatus(id, data.ptReservationId, status)
    }   
    
    return (
        <div className="
        flex gap-4 items-start
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex-1 size-24 border-[3px] border-[#6A7282] rounded-full"></div>
            <div className="flex flex-col gap-4 flex-9">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <p className="text-[20px] font-black text-white"> {data.nickname} </p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 최근 강습: {data.lastPtDate} </p>
                    </div>
                    <div className="px-4 py-1 border border-[#BFFF0B4D] bg-[#BFFF0B4D] rounded-full text-[12px] font-extrabold text-[#BFFF0B]"> {data.status} </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-3 flex-col gap-1 p-4 rounded-[10px] bg-[#1E293980]"> 
                        <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 </p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {data.progressCount}/{data.totalSessionCount} </p>
                    </div>
                    <div className="flex flex-7 flex-col gap-1 p-4 rounded-[10px] bg-[#1E293980]"> 
                        <p className="text-[12px] font-normal text-[#6A7282]"> 완료율 </p>
                        <div className="flex h-2 rounded-full bg-[#364153]">
                                <p className="w-[30%] rounded-full bg-[#BFFF0B]"></p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                <Link 
                    href={`/pt/manage/${id}/users/${data.ptReservationId}`}
                > 
                    <button type="button" className="px-5 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 피드백 작성 </button>
                </Link>   
                    
                    <button type="button" className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white"> 채팅하기 </button>
                    <button type="button" className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white"> 신고 </button>
                    <select 
                        value={data.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white appearance-none"> 
                        <option> 상태변경 </option>
                        <option value="IN_PROGRESS"> 수강중 </option>
                        <option value="RESERVED"> 예약됨 </option>
                        <option value="COMPLETED"> 완료 </option>
                        <option value="CANCELLED"> 취소 </option>
                    </select>
                </div>
            </div>
        </div>
    );
}