import { CommonLocation, PtfindStar, PtfindTestImg } from "@/components/ui/image";

export default function PtFindCard() {
    return (
        <div className="
        flex flex-col
        shrink-0
        overflow-hidden
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        border border-[#36415380] rounded-[14px]
        ">
            <div>
                <img 
                    className="w-full object-cover"
                    src={PtfindTestImg} 
                    alt="PT 찾기 PT 카드"/>
            </div>
            <div className="flex flex-col gap-3 p-5">
                <p className="text-[20px] text-white font-extrabold"> PT 제목</p>
                <p className="text-[14px] text-[#D1D5DC] font-medium"> 트레이너 이름 </p>
                <div className="flex gap-2 items-center">
                    <img src={CommonLocation} alt="PT 카드 위치"/>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 위치 정보 </p>
                </div>
                <div className="flex gap-2 items-center text-[14px]">
                    <img src={PtfindStar} alt="PT 카드 별점"/>
                    <p className="font-extrabold text-[#BFFF0B]"> 
                        4.8<span className="text-[#6A7282] font-normal">(127개의 리뷰)</span> </p>
                </div>
                <hr className="border border-[#36415380]"/>
                <p className="text-[14px] font-normal text-[#99A1AF]"> <span className="text-[24px] font-black text-[#BFFF0B]">45,000</span>원 </p>
            </div>
        </div>
    );
}