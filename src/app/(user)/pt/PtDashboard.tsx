import { getPtzoneStats } from "@/service/ptzone.service";

export default async function PtDashboard({ mode }: { mode: 'PT' | '온라인 PT' }) {
    const response = await getPtzoneStats();

    return (
        <div className="
            flex justify-around
            border border-[#36415380] rounded-[16px]
            bg-[linear-gradient(90deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            ">
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> {response.data.organizationCount} </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 등록된 헬스장 </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> {response.data.activeTrainerCount} </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 활동 중인 트레이너 </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> {response.data.inProgressPtCount} </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 진행 중인 {mode} </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> {response.data.organizationCount} </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 평균 만족도 </p>
            </div>
        </div>
    );
}