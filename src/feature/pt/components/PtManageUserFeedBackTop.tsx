import { Progress } from "@/components/ui/progress";
import { HeaderProfile } from "@/components/ui/image";
import { PtReservationStudentDetailData } from "../type";
import Image from "next/image";

interface PtManageUserFeedBackTopProps {
    data: PtReservationStudentDetailData
}

const STATUS_LABEL: Record<string, string> = {
  IN_PROGRESS: "수강중",
  COMPLETED: "완료됨",
  CANCELLED: "취소됨",
  RESERVED: "예약됨",
};

export default function PtManageUserFeedBackTop( {data}: PtManageUserFeedBackTopProps) {
    
    const current = data.progressCount
    const total = data.totalSessionCount
    const progreesPercent = total > 0 ? Math.min(100, (Math.round((current/total) * 100))) : 0;
    
    return (
        <div className="
        flex flex-col gap-1
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        border border-[#36415380] rounded-[16px]
        p-4 sm:p-5 lg:p-6
        ">
            <div className="flex gap-3 items-start sm:gap-4 lg:gap-6">
                <div className="relative size-16 shrink-0 rounded-full border-[2px] border-[#BFFF0B] md:size-18 lg:size-20">
                    <Image
                        src={HeaderProfile}
                        alt={`${data.nickname} 프로필 이미지`}
                        fill
                        sizes="(max-width: 639px) 64px, (max-width: 1023px) 72px, 80px"
                        className="rounded-full object-cover"
                    />
                </div>
                <div className="flex flex-9 flex-col gap-1 items-start sm:gap-2 min-w-0">
                    <p className="text-lg font-black text-white sm:text-xl lg:text-[24px]"> {data.nickname}</p>
                    <p className="text-[12px] font-normal text-[#99A1AF] md:text-[13px] lg:text-[14px]"> {data.email} </p>
                </div>
                <p className="px-2 py-1 border border-[#BFFF0B4D] rounded-full bg-[#BFFF0B33] text-[10px] font-extrabold text-[#BFFF0B] sm:px-3 sm:text-[12px]"> {STATUS_LABEL[data.status] ?? "상태 확인 필요"} </p>
            </div>

            <div className="flex flex-col gap-2 mt-3 sm:gap-3">
                <div className="flex justify-between">
                    <p className="text-[12px] font-normal text-[#99A1AF] lg:text-[14px]"> 진행도 </p>
                    <p className="text-[12px] font-bold text-[#BFFF0B] lg:text-[14px]"> {progreesPercent}% </p>
                </div>
                <Progress value={progreesPercent} className="h-2" />
                <p className="text-[14px] font-extrabold text-[#BFFF0B] text-right"> {data.progressCount}/{data.totalSessionCount}회 </p>
            </div>

            <div className="flex flex-col">
                <p className="text-[14px] font-normal text-[#6A7282]"> 강습 : <span className="text-[#99A1AF]"> {data.title} </span></p>
                <p className="text-[14px] font-normal text-[#6A7282]"> 연락처 : <span className="text-[#99A1AF]"> {data.phone} </span></p>
            </div>
        </div>
        
    );
}