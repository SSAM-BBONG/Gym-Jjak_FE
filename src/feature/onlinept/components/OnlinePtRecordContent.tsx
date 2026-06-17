export default function OnlinePtRecordContent() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                <p className="text-[12px] font-normal text-[#6A7282]">최근 피드백 날짜</p>
                <p className="text-[14px] font-extrabold text-white">2026-05-15</p>
            </div>
            <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                <p className="text-[12px] font-normal text-[#6A7282]">피드백 상태</p>
                <p className="text-[14px] font-extrabold text-[#BFFF0B]">완료</p>
            </div>
            <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-3">
                <div className="text-[12px] font-normal text-[#6A7282]">진척도<span className="ml-auto">1/4</span></div>
                <div className="flex h-2 bg-[#364153] rounded-full">
                    <p className="w-[30%] bg-[#BFFF0B] rounded-full"></p>
                </div>
            </div>
        </div>
    );
}