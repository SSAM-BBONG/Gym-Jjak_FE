import { GymTrainerSituation } from "@/components/ui/image";
import { Progress } from "@/components/ui/progress";
import { OrganizationSalesData } from "@/feature/organization/type";

type GymDashboardTrainerSalesProps = {
    data?: OrganizationSalesData;
    errorMessage?: string;
};

export default function GymDashboardTrainerSales({ data, errorMessage }: GymDashboardTrainerSalesProps) {
    return (
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

            {errorMessage ? (
                <p className="py-8 text-center text-sm text-red-400">{errorMessage}</p>
            ) : data?.trainerSales.length ? (
                data.trainerSales.map((trainer) => {
                    const ratio = Number.isFinite(trainer.ratio)
                        ? Math.min(100, Math.max(0, trainer.ratio))
                        : 0;

                    return (
                        <div
                            key={trainer.trainerProfileId}
                            className="grid grid-cols-[2.5fr_1.5fr_1.5fr_1fr] border-b border-[#364153] text-[14px] py-3 items-center text-white font-bold "
                        >
                            <div className="flex items-center gap-2">
                                <p className="border border-[#BFFF0B33] rounded-full bg-[#BFFF0B1A] px-2 py-1 text-[10px] text-[#BFFF0B]"> {trainer.trainerName.charAt(0)}</p>
                                <p> {trainer.trainerName}</p>
                            </div>
                            <div className="font-normal">
                                {trainer.thisMonthAmount.toLocaleString()}원
                            </div>
                            <div>
                                {trainer.totalAmount.toLocaleString()}원
                            </div>
                            <div className="flex gap-2 items-center">
                                <Progress value={ratio} className="h-2 w-16" />
                                <p className="text-[12px] text-[#99A1AF] font-normal"> {ratio}%</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="pt-8 pb-4 text-center text-sm text-[#6A7282]">조회된 트레이너 매출이 없습니다.</p>
            )}
        </div>
    );
}
