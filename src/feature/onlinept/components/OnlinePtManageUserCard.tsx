import OnlinePtRecordContent from "./OnlinePtRecordContent"
import OnlinePtStatus from "./OnlinePtStatus";

export default function OnlinePtManageUserCard() {
    return (
        <div className="
        flex gap-4 items-start
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex flex-col gap-4 flex-9">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <p className="text-[20px] font-black text-white"> 운동초보 </p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 최근 강습: 2026-05-15 </p>
                    </div>
                    <OnlinePtStatus text="수강중" />
                </div>

                <OnlinePtRecordContent />

                <div className="flex gap-4">
                    <button className="px-5 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 피드백 작성 </button>
                    <button className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white"> 채팅하기 </button>
                    <button className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white"> 신고 </button>
                </div>
            </div>
        </div>
    );
}