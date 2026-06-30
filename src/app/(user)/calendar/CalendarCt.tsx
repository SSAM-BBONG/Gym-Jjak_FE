'use client'

import { useState } from "react";
import { ko } from "date-fns/locale"
import CalendarAddButton from "./CalendarAddButton";
import CalendarItem from "@/feature/calendar/components/CalendarItem";
import { MainCalendar } from "@/components/ui/mainCalendar";
import { useQuery } from "@tanstack/react-query";
import { getCalendarDate, getCalendarMonth } from "@/service/calendar.service";
import CalendarPtItem from "@/feature/calendar/components/CalendarPtItem";


export default function CalendarCt() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    const selectedYear = settingYear(date);
    const selectedMonth = settingMonth(date);
    const selectedDay = settingDay(date);
    const selectedSettingDate = `${selectedYear}-${selectedMonth.padStart(2, '0')}-${selectedDay.padStart(2, '0')}`

    const {
        data: monthData,
        isLoading: isMonthLoading,
        isError: isMonthError,
        error: monthError,
    } = useQuery({
        queryKey: ['calendar-month', selectedYear, selectedMonth],
        queryFn: () => getCalendarMonth(selectedYear, selectedMonth),
        enabled: !!selectedYear && !!selectedMonth,
    });

    const {
        data: dateData,
        isLoading: isDateLoading,
        isError: isDateError,
        error: dateError,
    } = useQuery({
        queryKey: ['calendar-date', selectedSettingDate],
        queryFn: () => getCalendarDate(selectedSettingDate),
        enabled: !!selectedYear && !!selectedMonth && !!selectedDay,
    });

    const currentDate = new Date();

    function settingYear(beforeDate: Date | undefined) {
        if (beforeDate instanceof Date) {
            const dateFormat: Date = new Date(beforeDate);
            const year = String(dateFormat.getFullYear());
            return year
        }
        return ''
    }

    function settingMonth(beforeDate: Date | undefined) {
        if (beforeDate instanceof Date) {
            const dateFormat: Date = new Date(beforeDate);
            const month = String(dateFormat.getMonth() + 1);
            return month
        }
        return ''
    }

    function settingDay(beforeDate: Date | undefined) {
        if (beforeDate instanceof Date) {
            const dateFormat: Date = new Date(beforeDate);
            const day = String(dateFormat.getDate());
            return day
        }
        return ''
    }

    function settingDate(beforeDate: Date | undefined) {
        const year = settingYear(beforeDate)
        const month = settingMonth(beforeDate);
        const day = settingDay(beforeDate)
        return `${year}년 ${month}월 ${day}일`
    }

    if (isMonthLoading) return null;

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
                    <h1 className="font-black text-5xl">{settingDay(date)}</h1>
                    {settingDate(currentDate) === settingDate(date) && <CalendarAddButton selectedSettingDate={selectedSettingDate} />}
                </div>
                <p className="text-[#6A7282] font-normal text-base mb-6">{settingDate(date)}</p>
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