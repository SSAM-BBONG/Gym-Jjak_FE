import OnlinePtRecordCard from "@/feature/onlinept/components/OnlinePtRecordCard";

export default function Page() {
    return (
        <div className="flex flex-col gap-1 px-40 py-10">
            <p className="text-[36px] font-black text-white"> PT 기록 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 내 PT 기록을 확인하세요 </p>

            <div className="flex gap-3 my-5">
                <button className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black"> 전체 </button>
                <button className="px-4 py-2 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-[#99A1AF]"> 수강중 </button>
                <button className="px-4 py-2 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-[#99A1AF]"> 완료 </button>
                <button className="px-4 py-2 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-[#99A1AF]"> 취소 </button>
            </div>

            <div className="flex flex-col gap-5">
                <OnlinePtRecordCard />
                <OnlinePtRecordCard />
            </div>
        </div>
    );
}