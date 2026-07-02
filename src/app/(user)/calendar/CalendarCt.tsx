'use client'

import { useState } from "react";
import { ko } from "date-fns/locale"
import CalendarAddButton from "./CalendarAddButton";
import CalendarItem from "@/feature/calendar/components/CalendarItem";
import { MainCalendar } from "@/components/ui/mainCalendar";
import { useQuery } from "@tanstack/react-query";
import CalendarPtItem from "@/feature/calendar/components/CalendarPtItem";
import { format } from "date-fns/format";
import { isSameDay } from "date-fns/isSameDay";

import { calendargetDateAction, calendargetMonthAction } from "@/feature/calendar/action";


export default function CalendarCt() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const selectedDate = date ?? new Date();


    const selectedYear = format(selectedDate, "yyyy");
    const selectedMonth = format(selectedDate, "M");
    const selectedDay = format(selectedDate, "d");
    const selectedSettingDate = format(selectedDate, "yyyy-MM-dd");

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

    const settingDate = format(selectedDate, "yyyy년 MM월 dd일", {
        locale: ko,
    });

    const isToday = isSameDay(selectedDate, currentDate);

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
                    {isToday && (
                        <CalendarAddButton selectedSettingDate={selectedSettingDate} />
                    )}
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