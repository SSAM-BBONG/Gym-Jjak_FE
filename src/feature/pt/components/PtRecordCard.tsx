import { PtfindTestImg } from "@/components/ui/image";

export default function PtRecordCard() {
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
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#BFFF0B4D] bg-[#BFFF0B33] text-[#BFFF0B] rounded-full"> 수강중 </p>
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#6A72824D] bg-[#6A728233] text-[#99A1AF] rounded-full"> 완료 </p>
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#2B7FFF4D] bg-[#2B7FFF33] text-[#51A2FF] rounded-full"> 예약됨 </p>
                    <p className="px-4 py-1 text-[12px] font-extrabold border border-[#FB2C364D] bg-[#FB2C3633] text-[#FF6467] rounded-full"> 취소 </p>
                </div>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 김철수 트레이너 </p>
                <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">최근 PT 날짜</p>
                        <p className="text-[14px] font-extrabold text-white">2026-05-15</p>
                    </div>
                    <div className="flex flex-col gap-1 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">진척도</p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]">
                            3 / 12 <span className="text-[12px] font-normal text-[#6A7282]">(25%)</span> </p>
                    </div>
                    <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-3">
                        <p className="text-[12px] font-normal text-[#6A7282]">완료율</p>
                        <div className="flex h-2 bg-[#364153] rounded-full">
                            <p className="w-[30%] bg-[#BFFF0B] rounded-full"></p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 mt-2">
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white"> 채팅하기 </button>
                    <button className="px-8 py-2 bg-[#1E2939] rounded-[10px] text-[14px] font-extrabold text-white"> 상세보기 </button>
                </div>
            </div>
        </div>
    );
}