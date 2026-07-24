"use client";

import { MainCalendar } from "@/components/ui/mainCalendar";
import CalendarPtItem from "@/feature/calendar/components/CalendarPtItem";
import { trainerCalendargetDateAction, trainerCalendargetMonthAction } from "@/feature/calendar/action";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns/format";
import { ko } from "date-fns/locale";
import { useState } from "react";
import PtManageCalendarItem from "./PtManageCalendarItem";

interface PtManageCalendarProps {
    userId: number;
}

export default function PtManageCalendar({ userId }: PtManageCalendarProps) {
    const targetUserId = userId;
    const [date, setDate] = useState<Date | undefined>(new Date());

    const selectedDate = date ?? new Date();
    const selectedYear = format(selectedDate, "yyyy");
    const selectedMonth = format(selectedDate, "M");
    const selectedDay = format(selectedDate, "d");
    const selectedSettingDate = format(selectedDate, "yyyy-MM-dd");

    const {
        data: monthData,
    } = useQuery({
        queryKey: ["trainer", "calendar", "month", targetUserId, selectedYear, selectedMonth],
        queryFn: () => trainerCalendargetMonthAction(targetUserId, selectedYear, selectedMonth),
        enabled: Number.isFinite(targetUserId) && !!selectedYear && !!selectedMonth,
    });

    const {
        data: dateData,
    } = useQuery({
        queryKey: ["trainer", "calendar", "date", targetUserId, selectedSettingDate],
        queryFn: () => trainerCalendargetDateAction(targetUserId, selectedSettingDate),
        enabled: Number.isFinite(targetUserId) && !!selectedSettingDate,
        select: (response) => response.data,
    });

    const settingDate = format(selectedDate, "yyyy\uB144 MM\uC6D4 dd\uC77C", {
        locale: ko,
    });

    return (
        <section className="flex">
            <MainCalendar
                mode="single"
                locale={ko}
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
                daysData={monthData?.data?.days}
            />
            <section className="w-full text-white md:ml-8 md:w-2/5">
                <div className="mb-2 flex justify-between">
                    <h1 className="text-3xl font-black md:text-5xl">
                        {selectedDay}
                    </h1>
                </div>
                <p className="mb-6 text-base font-normal text-[#6A7282]">
                    {settingDate}
                </p>

                {dateData?.pts.map((pt: Pt) => (
                    <CalendarPtItem data={pt} key={pt.ptId} />
                ))}
                {dateData?.diaries.map((diary: Diary) => (
                    <PtManageCalendarItem
                        data={diary}
                        key={diary.workoutDiaryId}
                    />
                ))}
                {dateData?.pts.length === 0 && dateData?.diaries.length === 0 && (
                    <div className="px-3 py-8 text-center text-xs text-muted-foreground sm:px-4 sm:text-sm lg:px-6 lg:py-10">
                        운동일지가 없습니다.
                    </div>
                )}
            </section>
        </section>
    );
}
