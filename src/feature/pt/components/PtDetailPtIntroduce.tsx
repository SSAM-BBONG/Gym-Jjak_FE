import { PtCourseDetailData } from "../type";

interface PtDetailPtIntroduceProps {
    data: PtCourseDetailData
}

export default function PtDetailPtIntroduce( {data}: PtDetailPtIntroduceProps) {
    return (
        <div className="
            flex flex-col gap-4 md:gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-4 sm:p-5 lg:p-6
            ">
                <p className="text-[16px] md:text-[17px] lg:text-[18px] font-extrabold text-white"> 강좌 소개 </p>
                <p className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#D1D5DC]"> {data.description} </p>
        </div>

    );
}