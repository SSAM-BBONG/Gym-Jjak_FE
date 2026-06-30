import { PtCourseDetailData } from "../type";

interface PtDetailScheduleProps {
    data: PtCourseDetailData
}

export default function PtDetailSchedule( { data }: PtDetailScheduleProps) {
    return (
        <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
                <p className="text-[18px] font-extrabold text-white"> 레슨 시간</p>
                <div className="flex flex-col gap-3">
                    {data.schedules.map((item) => (
                        <div 
                            key={item.scheduleId}
                            className="flex gap-4 items-center">
                            <p className="px-3 py-2 bg-[#BFFF0B1A] rounded-[10px] text-[14px] font-black text-[#BFFF0B]"> {item.dayOfWeek} </p>
                            <p className="text-[16px] font-extrabold text-white"> {item.dayOfWeek} </p>
                            <p className="flex gap-3 items-center border border-[#364153] rounded-[10px] bg-[#1E293980] px-4 py-2 text-[14px] font-normal text-white">
                                {item.startTime} <span className="text-[16px] font-extrabold text-[#BFFF0B]"> → </span> {item.endTime}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    );
}