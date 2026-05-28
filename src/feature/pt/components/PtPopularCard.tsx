import { PtfindTestImg } from "@/components/ui/image";

export default function PtPopularCard() {
    return (
        <div className="
        relative
        flex flex-col
        border border-[#1E2939] rounded-[14px]
        bg-[#101828]
        overflow-hidden
        ">
            <p className="absolute rounded-[4px] bg-[#BFFF0B] px-2 py-1 text-[12px] font-extrabold text-black top-2 left-2"> 태그 </p>
            <img src={PtfindTestImg} width={320} height={160} alt="PT ZONE 인기강습 이미지"/>
            <div className="flex flex-col p-4">
                <div className="flex justify-between">
                    <p className="text-[18px] font-extrabold text-white"> 가슴 집중 PT</p>
                    <p className="text-[12px] font-extrabold text-black p-1 rounded-[4px] bg-[#BFFF0B]"> 카테고리 </p>
                </div> 
                <p className="text-[12px] font-normal text-[#99A1AF]"> 김철수 트레이너 </p>
                <div className="flex justify-between">
                    <p className="text-[12px] font-normal text-[#6A7282]"> 헬스장 주소 </p>
                    <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 50,000원 </p>
                </div>
            </div>
        </div>
    );
}