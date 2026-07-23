import { PtCourseDetailData } from "../type";

interface PtDetailScheduleProps {
    data: PtCourseDetailData
}

const DAY_OF_WEEK_LABELS: Record<string, { short: string; full: string }> = {
    MONDAY: { short: "월", full: "월요일" },
    TUESDAY: { short: "화", full: "화요일" },
    WEDNESDAY: { short: "수", full: "수요일" },
    THURSDAY: { short: "목", full: "목요일" },
    FRIDAY: { short: "금", full: "금요일" },
    SATURDAY: { short: "토", full: "토요일" },
    SUNDAY: { short: "일", full: "일요일" },
};

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
                            <p className="px-3 py-2 bg-[#BFFF0B1A] rounded-[10px] text-[14px] font-black text-[#BFFF0B]"> {DAY_OF_WEEK_LABELS[item.dayOfWeek]?.short ?? item.dayOfWeek} </p>
                            <p className="text-[16px] font-extrabold text-white"> {DAY_OF_WEEK_LABELS[item.dayOfWeek]?.full ?? item.dayOfWeek} </p>
                            <p className="flex gap-3 items-center border border-[#364153] rounded-[10px] bg-[#1E293980] px-4 py-2 text-[14px] font-normal text-white">
                                {item.startTime} <span className="text-[16px] font-extrabold text-[#BFFF0B]"> → </span> {item.endTime}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
    );
}
