'use client'

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { ko } from "date-fns/locale"
import CalendarAddButton from "./CalendarAddButton";
import CalendarItem from "@/feature/calendar/components/CalendarItem";

export default function Page() {

    const [date, setDate] = useState<Date | undefined>(new Date())

    const currentData = new Date();


    let year: string = String(currentData.getFullYear());
    let month: string = String(currentData.getMonth() + 1);
    let day: string = String(currentData.getDate());

    const currentDay = `${year}년 ${month}월 ${day}일`
    let selectDay: string = `${year}년 ${month}월 ${day}일`;

    if (date instanceof Date) {
        const dateFormat: Date = new Date(date);

        year = String(dateFormat.getFullYear());
        month = String(dateFormat.getMonth() + 1);
        day = String(dateFormat.getDate());
        selectDay = `${year}년 ${month}월 ${day}일`
    }

    return (
        <div className="flex">
            <Calendar
                mode="single"
                locale={ko}
                selected={date}
                onSelect={setDate}
                className="rounded-lg border"
            />
            <section className="w-2/5 text-white ml-8">
                <div className="flex justify-between mb-2">
                    <h1 className="font-black text-5xl">{day}</h1>
                    {currentDay === selectDay && <CalendarAddButton />}
                </div>
                <p className="text-[#6A7282] font-normal text-base mb-6">{selectDay}</p>
                <CalendarItem />
                <CalendarItem />
            </section>

        </div>
    );
}