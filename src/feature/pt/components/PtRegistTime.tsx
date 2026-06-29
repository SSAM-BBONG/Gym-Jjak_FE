"use client";

import { useState } from "react";

export default function PtRegistTime() {
    const [times, setTimes] = useState([
        { id: 1 },
    ]);

const handleAddTime = () => {
    setTimes([
        ...times,
        { id: times.length + 1 },
    ]);
    };

    const handleRemoveTime = (removeIndex: number) => {
        const nextTimes = times.filter((_, index) => index !== removeIndex);

        setTimes(nextTimes);
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

            {times.map((time, index) => (
                <div key={time.id} className="flex gap-3 items-center">
                    <select className="
                bg-[#1E2939]
                border border-[#364153] rounded-[10px]
                py-2
                px-8
                text-white
                ">
                        <option value="MONDAY"> 월</option>
                        <option value="TUESDAY"> 화</option>
                        <option value="WEDNESDAY"> 수</option>
                        <option value="THURSDAY"> 목</option>
                        <option value="FRIDAY"> 금</option>
                        <option value="SATURDAY"> 토</option>
                        <option value="SUNDAY"> 일</option>
                    </select>
                    <select className="
                    flex-1
                    bg-[#1E2939]
                    border border-[#364153] rounded-[10px]
                    py-2
                    px-4
                text-white">
                        <option> 01:00</option>
                        <option> 02:00</option>
                        <option> 03:00</option>
                        <option> 04:00</option>
                        <option> 05:00</option>
                        <option> 06:00</option>
                        <option> 07:00</option>
                        <option> 08:00</option>
                        <option> 09:00</option>
                        <option> 10:00</option>
                        <option> 11:00</option>
                        <option> 12:00</option>
                        <option> 13:00</option>
                        <option> 14:00</option>
                        <option> 15:00</option>
                        <option> 16:00</option>
                        <option> 17:00</option>
                        <option> 18:00</option>
                        <option> 19:00</option>
                        <option> 20:00</option>
                        <option> 21:00</option>
                        <option> 22:00</option>
                        <option> 23:00</option>
                        <option> 24:00</option>
                    </select>
                    <p className="text-white text-[20px]"> ~ </p>
                    <select className="
                    flex-1
                    bg-[#1E2939]
                    border border-[#364153] rounded-[10px]
                    py-2
                    px-4
                text-white">
                        <option> 01:00</option>
                        <option> 02:00</option>
                        <option> 03:00</option>
                        <option> 04:00</option>
                        <option> 05:00</option>
                        <option> 06:00</option>
                        <option> 07:00</option>
                        <option> 08:00</option>
                        <option> 09:00</option>
                        <option> 10:00</option>
                        <option> 11:00</option>
                        <option> 12:00</option>
                        <option> 13:00</option>
                        <option> 14:00</option>
                        <option> 15:00</option>
                        <option> 16:00</option>
                        <option> 17:00</option>
                        <option> 18:00</option>
                        <option> 19:00</option>
                        <option> 20:00</option>
                        <option> 21:00</option>
                        <option> 22:00</option>
                        <option> 23:00</option>
                        <option> 24:00</option>
                    </select>
                    <button 
                        type="button"
                        onClick={() => handleRemoveTime(index)}
                        className="px-4 py-2 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"
                    > 
                        ✕ 
                    </button>
                </div>
            ))}
        </div>
    );
}
