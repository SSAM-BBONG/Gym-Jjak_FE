'use client'

import { useState } from "react";
import { ko } from "date-fns/locale"
import CalendarAddButton from "./CalendarAddButton";
import CalendarItem from "@/feature/calendar/components/CalendarItem";
import { MainCalendar } from "@/components/ui/mainCalendar";
import { useQuery } from "@tanstack/react-query";
import CalendarPtItem from "@/feature/calendar/components/CalendarPtItem";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import { calendargetDateAction, calendargetMonthAction } from "@/feature/calendar/action";


export default function CalendarCt() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const selectedYear = dayjs(date).format('YYYY')
    const selectedMonth = dayjs(date).format('M')
    const selectedDay = dayjs(date).format('D')
    const selectedSettingDate = dayjs(date).format('YYYY-MM-DD');

    const {
        data: monthData,
        isLoading: isMonthLoading,
        isError: isMonthError,
        error: monthError,
    } = useQuery({
        queryKey: ['calendar-month', selectedYear, selectedMonth],
        queryFn: () => calendargetMonthAction(selectedYear, selectedMonth),
        enabled: !!selectedYear && !!selectedMonth,
    });

    const {
        data: dateData,
        isLoading: isDateLoading,
        isError: isDateError,
        error: dateError,
    } = useQuery({
        queryKey: ['calendar-date', selectedSettingDate],
        queryFn: () => calendargetDateAction(selectedSettingDate),
        enabled: !!selectedYear && !!selectedMonth && !!selectedDay,
    });

    const currentDate = new Date();

    const settingDate = dayjs(date).format('YYYY년 MM월 DD일');
    const settingCurrentDate = dayjs(currentDate).format('YYYY년 MM월 DD일');

    return (
        <>
            <MainCalendar
                mode="single"
                locale={ko}
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
                daysData={monthData?.data?.days}
            />
            <section className="text- w-2/5 text-white ml-8">
                <div className="flex justify-between mb-2">
                    <h1 className="font-black text-5xl">{selectedDay}</h1>
                    {settingCurrentDate === settingDate && <CalendarAddButton selectedSettingDate={selectedSettingDate} />}
                </div>
                <p className="text-[#6A7282] font-normal text-base mb-6">{settingDate}</p>
                {!isDateLoading && (
                    <>
                        {dateData?.data?.pts.map((pt: Pt) => <CalendarPtItem data={pt} key={pt.ptId} />)}
                        {dateData?.data?.diary && <CalendarItem data={dateData?.data?.diary} />}
                    </>
                )}

            </section>
        </>
    );
}