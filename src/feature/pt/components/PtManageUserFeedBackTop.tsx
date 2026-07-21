import { Progress } from "@/components/ui/progress";
import { PtReservationStudentDetailData } from "../type";

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
        p-6
        ">
            <div className="flex gap-6 items-start">
                <div className="size-20 flex-1 rounded-full border-[2px] border-[#BFFF0B]"></div>
                <div className="flex flex-9 flex-col gap-2 items-start">
                    <p className="text-[24px] font-black text-white"> {data.nickname}</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> {data.email} </p>
                </div>
                <p className="px-3 py-1 border border-[#BFFF0B4D] rounded-full bg-[#BFFF0B33] text-[12px] font-extrabold text-[#BFFF0B]"> {STATUS_LABEL[data.status] ?? "상태 확인 필요"} </p>
            </div>

            <div className="flex flex-col gap-3 mt-3">
                <div className="flex justify-between">
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 진행도 </p>
                    <p className="text-[14px] font-bold text-[#BFFF0B]"> {progreesPercent}% </p>
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