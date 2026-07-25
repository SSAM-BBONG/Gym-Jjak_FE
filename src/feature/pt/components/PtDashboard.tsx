import { getPtzoneStats } from "@/service/ptzone.service";
import { TrainerPtDashboardData } from "../type";
import { MyTokenPayload } from "@/lib/decode";

interface PtDashboardProps {
    userInf?: MyTokenPayload;
    data?: TrainerPtDashboardData;
}

export default async function PtDashboard( {userInf, data}:PtDashboardProps ) {
    const response = await getPtzoneStats();

    return (
        <div className="
            grid grid-cols-2 gap-x-4 gap-y-5
            sm:grid-cols-4 sm:gap-3 sm:p-6
            lg:flex lg:justify-around lg:gap-0 lg:p-8
            border border-[#36415380] rounded-[16px]
            bg-[linear-gradient(90deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-4
            ">
            {userInf?.role === "TRAINER" 
            ? 
            <>
            <div className="flex min-w-0 flex-col items-center">
                <p className="text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> {data?.organizationCount} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 소속된 헬스장 </p>
            </div>
            <div className="flex min-w-0 flex-col items-center">
                <p className="text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> {data?.currentStudentCount} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 현재 수강생 수 </p>
            </div>
            <div className="flex min-w-0 flex-col items-center">
                <p className="text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> {data?.reviewCount} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 작성된 리뷰 </p>
            </div>
            <div className="flex min-w-0 flex-col items-center">
                <p className="flex items-center gap-1 text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> <span className="text-[20px] sm:text-[22px] lg:text-[25px]">★</span>{data?.averageRating} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 평균 만족도 </p>
            </div> 
            </>
            : 
            <>
            <div className="flex min-w-0 flex-col items-center">
                <p className="text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> {response.data.organizationCount} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 등록된 헬스장 </p>
            </div>
            <div className="flex min-w-0 flex-col items-center">
                <p className="text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> {response.data.activeTrainerCount} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 활동 중인 트레이너 </p>
            </div>
            <div className="flex min-w-0 flex-col items-center">
                <p className="text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> {response.data.inProgressPtCount} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 진행 중인 PT </p>
            </div>
            <div className="flex min-w-0 flex-col items-center">
                <p className="flex items-center gap-1 text-[24px] font-black text-[#BFFF0B] sm:text-[26px] lg:text-[30px]"> <span className="text-[20px] sm:text-[22px] lg:text-[25px]">★</span>{response.data.averageSatisfaction} </p>
                <p className="text-[12px] font-normal text-[#99A1AF] sm:text-[13px] lg:text-[14px]"> 평균 만족도 </p>
            </div> 
            </>
            }

        </div>
    );
}
