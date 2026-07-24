import { TrainerProfileDetailData } from "@/feature/mypage/type";
import { PtCourseDetailData } from "../type";

interface PtDetailInformationProps {
    response: PtCourseDetailData
    trainerInformation: TrainerProfileDetailData
}

export default function PtDetailInformation( { response, trainerInformation}: PtDetailInformationProps) {
    return (
            <div
                style={{
                    backgroundImage: `
                    linear-gradient(0deg, #000 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.00) 100%),
                    url(${response.thumbnailUrl})
                `,
                }}
                className="
                h-70 sm:h-80 md:h-90 lg:h-100
                flex flex-col justify-end 
                bg-cover bg-center bg-no-repeat bg-gray-300
                rounded-[14px]  
                p-4 sm:p-5 md:p-6">
                <p className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-black text-white"> {response.title} </p>
                <div className="flex justify-between items-center">
                    <div className="flex gap-3 items-center">
                        <div className="text-[#BFFF0B] text-[16px] sm:text-[18px] lg:text-[20px]"> ★ </div>
                        <p className="text-[14px] sm:text-[16px] lg:text-[18px] font-extrabold text-white">
                            {trainerInformation.averageRating}  <span className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal text-[#99A1AF]">({trainerInformation.reviewCount}개)</span>
                        </p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-[24px] sm:text-[28px] md:text-[32px] lg:text-[36px] font-black text-[#BFFF0B]"> {response.price.toLocaleString()}원</p>
                        <p className="text-[12px] sm:text-[13px] lg:text-[14px] font-normal text-[#99A1AF] text-right"> {response.totalSessionCount}회 </p>
                    </div>
                </div>
            </div>
    );
}