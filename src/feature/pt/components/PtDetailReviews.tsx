import Link from "next/link";
import { PtCourseDetailData } from "../type";

interface PtDetailReviewsProps {
    data: PtCourseDetailData
}

export default function PtDetailReviews( {data}:PtDetailReviewsProps ) {
    return (
        <div className="
        flex flex-col
        border border-[#364153] rounded-[14px]
        bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
        p-4 sm:p-5 lg:p-6
        pb-0
        mb-20
        ">
            <p className="text-[16px] md:text-[17px] lg:text-[18px] font-extrabold text-white"> 강사평 </p>
            <div>
                {data.recentReviews.length === 0 ? (
                    <div className="py-10 text-center text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#99A1AF]">
                        아직 등록된 강사평이 없습니다.
                    </div>
                ) : data.recentReviews.map((item) => (
                    <div
                        key={item.reviewId} 
                        className="flex flex-col gap-1 py-4 md:py-5 lg:py-6 border-b border-b-[#364153]">
                        <div className="flex justify-between">
                            <p className="text-[12px] md:text-[13px] lg:text-[14px] font-extrabold text-white"> 운동초보 </p>
                            <p className="text-[10px] md:text-[11px] lg:text-[12px] font-normal text-[#6A7282]"> {(item.createdAt).split("T")[0]} </p>
                        </div>
                        <div className="text-[#BFFF0B]">
                            {"★".repeat(item.rating)}{"☆".repeat(5 - item.rating)}
                        </div>
                        <div className="text-[10px] md:text-[11px] lg:text-[12px] font-normal text-[#D1D5DC]">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
            <Link href={`/pt/${data.ptCourseId}/reviews`}>
                <p className="py-4 md:pt-5 lg:pt-6 text-[14px] md:text-[15px] lg:text-[16px] font-medium text-white text-center "> 전체 리뷰 보기 &nbsp; 〉</p>
            </Link>
        </div>
    );
}
