import { PtfindTestImg } from "@/components/ui/image";
import OnlinePtStatus from "./OnlinePtStatus";
import OnlinePtRecordContent from "./OnlinePtRecordContent";

export default function OnlinePtRecordCard() {
    return (
        <div className="
            overflow-hidden
            flex
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            ">
            <div
                style={{ backgroundImage: `url(${PtfindTestImg})` }}
                className="flex-2 bg-no-repeat bg-cover"></div>
            <div className="
            flex flex-col gap-1 flex-8
            p-6
            ">
                <div className="flex justify-between items-center">
                    <p className="text-[20px] font-black text-white"> 체계적인 가습 집중 PT </p>
                    <OnlinePtStatus text="수강중" />
                </div>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 김철수 트레이너 </p>
                <OnlinePtRecordContent />
                <div className="flex gap-3 mt-2">
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white"> 채팅하기 </button>
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white"> 상세보기 </button>
                </div>
            </div>
        </div>
    );
}