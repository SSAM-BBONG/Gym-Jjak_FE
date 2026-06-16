export default function PtDashboard({ mode }: { mode: 'PT' | '온라인 PT' }) {
    return (
        <div className="
            flex justify-around
            border border-[#36415380] rounded-[16px]
            bg-[linear-gradient(90deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            ">
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> 1,234 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 등록된 헬스장 </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> 892 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 활동 중인 트레이너 </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> 15,678 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 진행 중인 {mode} </p>
            </div>
            <div className="flex flex-col items-center">
                <p className="text-[30px] font-black text-[#BFFF0B]"> 4.8 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 평균 만족도 </p>
            </div>
        </div>
    );
}