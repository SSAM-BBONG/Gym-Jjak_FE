import { PtCourseDetailData } from "../type";

interface PtDetailCurriculumsProps {
    data: PtCourseDetailData
}


export default function PtDetailCurriculums( {data}: PtDetailCurriculumsProps) {
    return (
        <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 커리큘럼 </p>
                <div className="flex flex-col gap-3">
                    {data.curriculums.map((item) => (
                        <div 
                            key={item.curriculumId}
                            className="flex gap-3 items-center">
                            <p className="px-2 py-1 text-[14px] font-black text-black bg-[#BFFF0B] rounded-full flex items-center justify-center"> {item.sessionNo} </p>
                            <div className="flex flex-col gap-1">
                                <p className="text-[14px] font-extrabold text-white"> {item.title} </p>
                                <p className="text-[12px] font-normal text-[#99A1AF]"> {item.content} </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
    );
}