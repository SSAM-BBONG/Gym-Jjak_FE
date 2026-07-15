import { GymCumulativePt, GymCurrentPt, GymMonthUser, GymThisMonthSales, GymTrainerNumber, GymTrainerSituation } from "@/components/ui/image";
import GymDashboard from "@/feature/organization/components/GymDashboard";

export default function Page() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="grid grid-cols-4 gap-4">
                    <div className="border border-[#BFFF0B4D] rounded-[16px] bg-[#BFFF0B0D] p-5">
                    <img src={GymCumulativePt}/>
                    <p className="text-[30px] text-[#BFFF0B] font-black"> 136명</p>
                    <p className="text-[12px] text-white font-bold"> 누적 PT 이용자 수 </p>
                    <p className="text-[12px] text-[#6A7282] font-normal"> 서비스 시작 이후 총 이용자</p>
                </div>
                <div className="border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                    <img src={GymCurrentPt}/>
                    <p className="text-[30px] text-white font-black"> 9명</p>
                    <p className="text-[12px] text-white font-bold"> 현재 PT 이용자 수 </p>
                    <p className="text-[12px] text-[#6A7282] font-normal"> 현재 진행 중인 PT 수강생</p>                
                </div>
                <div className="border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                    <img src={GymTrainerNumber}/>
                    <p className="text-[30px] text-white font-black"> 3명</p>
                    <p className="text-[12px] text-white font-bold"> 트레이너 수 </p>
                    <p className="text-[12px] text-[#6A7282] font-normal"> 현재 활성 트레이너</p>
                </div>
                <div className="border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                    <img src={GymThisMonthSales}/>
                    <p className="text-[30px] text-white font-black"> 5,200,000원</p>
                    <p className="text-[12px] text-white font-bold"> 이번 달 매출  </p>
                    <p className="text-[12px] text-[#6A7282] font-normal"> 7월 기준</p>
                </div>
            </div>

            <div className="p-6 border border-[#1E2939] rounded-[16px] bg-[#101828]">
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymMonthUser}/>
                    <p className="text-[14px] text-white font-black"> 월별 이용자 추이</p>
                </div>
               <GymDashboard/>
            </div>

            <div className="p-6 border border-[#1E2939] rounded-[16px] bg-[#101828]"> 
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymTrainerSituation}/>
                    <p className="text-[14px] text-white font-black"> 트레이너별 현황 </p>
                </div>

                <div className="p-4 mb-4 rounded-[14px] bg-[#1E293980] flex justify-between">
                    <div className="flex gap-4 items-center">
                        <p 
                            className="px-3 py-2 border border-[#BFFF0B33] bg-[#BFFF0B1A] rounded-full
                                text-[12px] text-[#BFFF0B] font-black    
                        "> 김</p>
                        <div>
                            <p className="text-[14px] text-white font-bold"> 김철수 </p>
                            <p className="text-[12px] text-[#6A7282] font-normal"> 벌크업 체형교정</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                            <p className="text-[14px] text-white font-black"> 2 </p>
                            <p className="text-[10px] text-[#6A7282] font-normal"> PT </p>
                        </div>
                        <div className="flex flex-col items-center">
                            <p className="text-[14px] text-[#BFFF0B] font-black"> 3 </p>
                            <p className="text-[10px] text-[#6A7282] font-normal"> 수강생 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}