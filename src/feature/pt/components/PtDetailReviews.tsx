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
        p-6
        pb-0
        mb-20
        ">
            <p className="text-[18px] font-extrabold text-white"> 강사평 </p>
            <div>
                {data.recentReviews.map((item) => (
                    <div
                        key={item.reviewId} 
                        className="flex flex-col gap-1 py-6 border-b border-b-[#364153]">
                        <div className="flex justify-between">
                            <p className="text-[14px] font-extrabold text-white"> 운동초보 </p>
                            <p className="text-[12px] font-normal text-[#6A7282]"> {item.createdAt} </p>
                        </div>
                        <div className="text-[#BFFF0B]">
                            ★★★☆☆
                        </div>
                        <div className="text-[12px] font-normal text-[#D1D5DC]">
                            {item.content}
                        </div>
                    </div>
                ))}
            </div>
            <Link href="/pt/1/reviews">
                <p className="py-6 text-[16px] font-medium text-white text-center"> 전체 리뷰 보기 &nbsp; 〉</p>
            </Link>
        </div>
    );
}