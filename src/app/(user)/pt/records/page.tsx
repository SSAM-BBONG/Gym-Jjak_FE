import PtRecordCard from "@/feature/pt/components/PtRecordCard";

export default function PtRecordsPage() {
    return (
        <div className="flex flex-col gap-1 px-40 py-10">
            <p className="text-[36px] font-black text-white"> PT 기록 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 내 PT 기록을 확인하세요 </p>

            <div>
                <button> 전체 </button>
                <button> 예약됨 </button>
                <button> 수강중 </button>
                <button> 완료 </button>
                <button> 취소 </button>
            </div>

            <div className="flex flex-col gap-5">
                <PtRecordCard/>
                <PtRecordCard/>
                <PtRecordCard/>
            </div>
        </div>
    );
}