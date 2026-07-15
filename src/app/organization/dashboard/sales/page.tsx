import { GymCumulativeSales, GymMonthSales, GymThisMonthSale, GymTrainerSituation } from "@/components/ui/image";
import GymDashboard from "@/feature/organization/components/GymDashboard";

export default function GymSalesDashboardPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-[#BFFF0B4D] rounded-[16px] bg-[#BFFF0B0D] p-5">
                    <div className="flex gap-2 items-center">
                        <p className="bg-[#1E293999] w-10 h-10 flex items-center justify-center rounded-[14px] p-2">
                            <img src={GymCumulativeSales}/>
                        </p>
                    <p className="text-[16px] text-white font-bold"> 누적 매출 </p>
                    </div>
                    <p className="text-[30px] text-[#BFFF0B] font-black"> 45,800,000원</p>
                    <p className="text-[12px] text-[#6A7282] font-normal"> 서비스 시작 이후 총 매출</p>
                </div>
                <div className="border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                    <div className="flex gap-2 items-center">
                        <p className="bg-[#1E293999] w-10 h-10 flex items-center justify-center rounded-[14px] p-2">
                            <img src={GymThisMonthSale}/>
                        </p>
                        <p className="text-[16px] text-white font-bold"> 이번 달 매출 (7월) </p>
                    </div>
                    <p className="text-[30px] text-white font-black"> 5,200,000원</p>
                    <p className="text-[12px] text-[#6A7282] font-normal"> 전월 대비 +4.4% </p>                
                </div>
            </div>

            <div className="p-6 border border-[#1E2939] rounded-[16px] bg-[#101828]">
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymMonthSales}/>
                    <p className="text-[14px] text-white font-black"> 월별 이용자 추이</p>
                </div>
                <GymDashboard/>
            </div>

            <div className="p-6 border border-[#1E2939] rounded-[16px] bg-[#101828]"> 
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymTrainerSituation}/>
                    <p className="text-[14px] text-white font-black"> 트레이너별 매출 현황 </p>
                </div>
                <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1fr] border-y border-[#364153] text-[#6A7282] text-[11px] font-extrabold py-3">
                    <div>트레이너</div>
                    <div>이번 달</div>
                    <div>누적 매출</div>
                    <div>비율</div>
                </div>

                <div className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1fr] border-b border-[#364153] text-[14px] py-3 items-center text-white font-bold ">
                    <div className="flex items-center gap-2">
                        <p className="border border-[#BFFF0B33] rounded-full bg-[#BFFF0B1A] px-2 py-1 text-[10px] text-[#BFFF0B]"> 김</p>
                        <p> 김철수</p>
                    </div>
                    <div className="font-normal">
                        1,840,000원
                    </div>
                    <div>
                        12,800,800원
                    </div>
                    <div className="flex gap-2 items-center">
                        <div className="w-16 h-2 bg-[#1E2939] rounded-full">
                            <p className="w-4 h-2 bg-[#BFFF0B] rounded-full"></p>
                        </div>
                        <p className="text-[12px] text-[#99A1AF] font-normal"> 27.2%</p>
                    </div>
                </div>
            </div>            
        </div>
    );
}