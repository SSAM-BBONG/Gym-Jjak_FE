import { PtfindTestImg } from "@/components/ui/image";
import PfFeebBackCard from "@/feature/pt/components/PtFeebBackCard";
import PtRecordDetailButton from "@/feature/pt/components/PtRecordDetailButton";

export default function PtRecordDetailPage() {
    return (
        <div className="flex flex-col gap-5 px-70 py-10">
            <div className="
            overflow-hidden
            flex
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
            ">
                <div
                    style={{ backgroundImage: `url(${PtfindTestImg})` }}
                    className="flex-3 bg-no-repeat bg-cover">
                </div>
                <div className="flex flex-col gap-2 flex-7 p-6">
                    <p className="text-[24px] font-black text-white"> 체계적인 가슴 집중PT</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 김철수 트레이너</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980]">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 </p>
                            <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 3/12 </p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980]">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 상태 </p>
                            <p className="text-[14px] font-extrabold text-white"> 수강중 </p>
                        </div>
                    </div>
                    <div className="flex h-2 bg-[#364153] rounded-full mt-2">
                        <p className="w-[30%] bg-[#BFFF0B] rounded-full"></p>
                    </div>
                </div>
            </div>

            <PtRecordDetailButton />

            <div className="
            grid grid-cols-3 gap-2
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-2
            ">
                <p className="py-3 text-[16px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center"> 트레이너 피드백 </p>
                <p className="py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center"> 운동일지 </p>
                <p className="py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center"> 식단 관리 </p>
            </div>

            <PfFeebBackCard />

        </div>
    );
}