import { PtDetailHistory, PtDetailQualification } from "@/components/ui/image";
import Link from "next/link";
import DetailTop from "./DetailTop";
import DetailTrainer from "./DetailTrainer";
import ReviewPreview from "@/feature/review/components/ReviewPreview";

export default async function Page({ params }: {
    params: Promise<{
        id: string;
    }>;
}) {

    const onlinePtId = await params;

    return (
        <div className="flex flex-col gap-8 px-80 py-10">
            <DetailTop />
            <div className="grid grid-cols-2 gap-3">
                <button className="
                py-4 
                rounded-[14px] 
                bg-[#1E2939] text-[16px] font-extrabold text-white
                hover:text-black hover:bg-[#BFFF0B]
                "> 신청하기 </button>
                <button className="
                py-4 
                rounded-[14px] 
                bg-[#1E2939] text-[16px] font-extrabold text-white
                hover:text-black hover:bg-[#BFFF0B]
                "> 채팅하기 </button>
            </div>

            <DetailTrainer />

            <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 강좌 소개 </p>
                <p className="text-[14px] font-normal text-[#D1D5DC]"> response.data.description </p>
            </div>


            <div className="
            flex flex-col
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            pb-0
            mb-20
            ">
                <p className="text-[18px] font-extrabold text-white"> 강사평 </p>
                <div>
                    <ReviewPreview />
                    <ReviewPreview />
                </div>
                <Link href="/pt/1/reviews">
                    <p className="py-6 text-[16px] font-medium text-white text-center"> 전체 리뷰 보기 &nbsp; 〉</p>
                </Link>
            </div>
        </div>
    );
}