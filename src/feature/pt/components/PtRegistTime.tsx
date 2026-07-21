"use client";

import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { PtRegistSchedule } from "../type";

interface PtRegistTimeProps {
  setValue: UseFormSetValue<PtRegistFormValue>;
  error?: string;
}

type WeekValue =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export default function PtRegistTime({
    setValue, error
}: PtRegistTimeProps) {

    const [dayOfWeek, setDayOfWeek] = useState<WeekValue>("MONDAY");
    const [startTime, setStartTime] = useState("10:00");
    const [endTime, setEndTime] = useState("11:00");
    const [schedules, setSchedules] = useState<PtRegistSchedule[]>([]);
    const [addError, setAddError] = useState("");

    const handleAddTime = () => {
        const isDuplicate = schedules.some(
            (schedule) =>
                schedule.dayOfWeek === dayOfWeek &&
                schedule.startTime === startTime &&
                schedule.endTime === endTime,
        );

        if (isDuplicate) {
            setAddError("이미 추가된 요일과 시간입니다.");
            return;
        }

        const nextSchedules = [
        ...schedules,
        {
            dayOfWeek,
            startTime,
            endTime,
        },
        ];

        setSchedules(nextSchedules);

        setValue("schedules", nextSchedules, {
        shouldValidate: true,
        shouldDirty: true,
        });

        setAddError("");
    };

    const handleRemoveTime = (removeIndex: number) => {
        const nextSchedules = schedules.filter((_, index) => index !== removeIndex);

        setSchedules(nextSchedules);

        setValue("schedules", nextSchedules, {
        shouldValidate: true,
        shouldDirty: true,
        });
    };

    const getDayLabel = (value: WeekValue) => {
        if (value === "MONDAY") return "월";
        if (value === "TUESDAY") return "화";
        if (value === "WEDNESDAY") return "수";
        if (value === "THURSDAY") return "목";
        if (value === "FRIDAY") return "금";
        if (value === "SATURDAY") return "토";
        return "일";
    };

    return (
    <div className="
        flex flex-col gap-6
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex justify-between items-center"> 
                <p className="text-[18px] font-extrabold text-white"> 수업 시간 </p>
                <button
                    type="button"
                    onClick={handleAddTime}
                    className="px-4 py-2 bg-[#364153] rounded-[10px] text-white text-[14px] font-medium"
                >
                    + 시간 추가
                </button>
            </div>

            <div className="flex gap-3 items-center">
                <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(e.target.value as WeekValue)}
                className="bg-[#1E2939] border border-[#364153] rounded-[10px] py-2 px-8 text-white"
                >
                <option value="MONDAY">월</option>
                <option value="TUESDAY">화</option>
                <option value="WEDNESDAY">수</option>
                <option value="THURSDAY">목</option>
                <option value="FRIDAY">금</option>
                <option value="SATURDAY">토</option>
                <option value="SUNDAY">일</option>
                </select>

                <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="flex-1 bg-[#1E2939] border border-[#364153] rounded-[10px] py-2 px-4 text-white"
                >
                <option value="01:00">01:00</option>
                <option value="02:00">02:00</option>
                <option value="03:00">03:00</option>
                <option value="04:00">04:00</option>
                <option value="05:00">05:00</option>
                <option value="06:00">06:00</option>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
                <option value="24:00">24:00</option>
                </select>

                <p className="text-white text-[20px]">~</p>

                <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="flex-1 bg-[#1E2939] border border-[#364153] rounded-[10px] py-2 px-4 text-white"
                >
                <option value="01:00">01:00</option>
                <option value="02:00">02:00</option>
                <option value="03:00">03:00</option>
                <option value="04:00">04:00</option>
                <option value="05:00">05:00</option>
                <option value="06:00">06:00</option>
                <option value="07:00">07:00</option>
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
                <option value="17:00">17:00</option>
                <option value="18:00">18:00</option>
                <option value="19:00">19:00</option>
                <option value="20:00">20:00</option>
                <option value="21:00">21:00</option>
                <option value="22:00">22:00</option>
                <option value="23:00">23:00</option>
                <option value="24:00">24:00</option>
                </select>
            </div>


            {schedules.map((schedule, index) => (
                <div
                key={`${schedule.dayOfWeek}-${schedule.startTime}-${schedule.endTime}-${index}`}
                className="flex gap-3 items-center"
                >
                <p className="bg-[#1E2939] border border-[#364153] rounded-[10px] py-2 px-8 text-white">
                    {getDayLabel(schedule.dayOfWeek)}
                </p>

                <p className="flex-1 bg-[#1E2939] border border-[#364153] rounded-[10px] py-2 px-4 text-white">
                    {schedule.startTime}
                </p>

                <p className="text-white text-[20px]">~</p>

                <p className="flex-1 bg-[#1E2939] border border-[#364153] rounded-[10px] py-2 px-4 text-white">
                    {schedule.endTime}
                </p>

                <button
                    type="button"
                    onClick={() => handleRemoveTime(index)}
                    className="px-4 py-2 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"
                >
                    ✕
                </button>
                </div>
            ))}

            {(addError || error) && (
                <p className="text-[14px] text-red-400">{addError || error}</p>
            )}
        </div>
    );
}
