'use client'

import { PtTrainerRegistPending, TrainerAPplicationCancel, TrainerAPplicationEdit } from "@/components/ui/image";
import { getTrainerCancel } from "@/service/ptzone.service";
import { deleteTrainerApplication } from "../actions";
import Link from "next/link";

export const TrainerApplicationPending = ({ trainerApplicationId }: { trainerApplicationId: number }) => {
    const handleDelteApplication = () => {
        deleteTrainerApplication(trainerApplicationId);
    }

    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#F0B1004D] rounded-[16px]
            ">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="p-3 rounded-[14px] bg-[#F0B10033]">
                        <img src={PtTrainerRegistPending} alt="트레이너 신청 현황 대기중" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[24px] font-extrabold text-white"> 대기중</p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 신청일: 2026. 5. 17 </p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <Link href="/pt/trainer-apply/edit">
                    <div className="flex gap-2 items-center text-[16px] font-medium text-white rounded-[10px] bg-[#364153] px-4 py-2"> 
                        <img src={TrainerAPplicationEdit} alt="트레이너 신청 수정 버튼"/>
                        <button> 수정 </button> 
                    </div>
                    </Link>
                    <div className="flex gap-2 itemes-center rounded-[10px] bg-[#82181AB2] px-4 py-2 text-[16px] font-medium text-[#FF6467] border border-[#FB2C364D]"> 
                        <img src={TrainerAPplicationCancel} alt="트레이너 신청 취소 버튼"/>
                        <button onClick={handleDelteApplication}> 신청취소 </button>
                    </div>
                </div>
            </div>
            <p className="border border-[#F0B1004D] bg-[#733E0A33] px-4 py-4 rounded-[10px] text-[16px] font-normal text-[#FDC700]">관리자의 승인을 기다리고 있습니다. 영업일 기준 3-5일 소요될 수 있습니다.</p>
        </div>
    );
}