import { GymTrainerSituation } from "@/components/ui/image";
import { OrganizationTrainerStatsData } from "@/feature/organization/type";

type GymDashboardTrainerStateProps = {
    data?: OrganizationTrainerStatsData[];
    errorMessage?: string;
};

export default function GymDashboardTrainerState({ data, errorMessage }: GymDashboardTrainerStateProps) {
    return (
        <div className="p-6 border border-[#1E2939] rounded-[16px] bg-[#101828]">
            <div className="flex items-center gap-2 pb-4">
                <img src={GymTrainerSituation}/>
                <p className="text-[14px] text-white font-black"> 트레이너별 현황 </p>
            </div>

            {errorMessage ? (
                <p className="py-8 text-center text-sm text-red-400">{errorMessage}</p>
            ) : data?.length ? (
                data.map((trainer) => (
                    <div
                        key={trainer.trainerProfileId}
                        className="p-4 mb-4 last:mb-0 rounded-[14px] bg-[#1E293980] flex justify-between"
                    >
                        <div className="flex gap-4 items-center">
                            <p className="px-3 py-2 border border-[#BFFF0B33] bg-[#BFFF0B1A] rounded-full text-[12px] text-[#BFFF0B] font-black">
                                {trainer.trainerName.charAt(0)}
                            </p>
                            <p className="text-[14px] text-white font-bold">{trainer.trainerName}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                                <p className="text-[14px] text-white font-black">{trainer.ptCount}</p>
                                <p className="text-[10px] text-[#6A7282] font-normal">PT</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-[14px] text-[#BFFF0B] font-black">{trainer.clientCount}</p>
                                <p className="text-[10px] text-[#6A7282] font-normal">수강생</p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="py-8 text-center text-sm text-[#6A7282]">조회된 트레이너 통계가 없습니다.</p>
            )}
        </div>
    );
}
