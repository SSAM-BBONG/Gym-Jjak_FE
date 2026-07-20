'use client'
import { AdminAddButton } from "@/components/ui/image";
import { MealCalendar } from "@/components/ui/MealCalendar";
import Image from "next/image";
import { useState } from "react";
import MealCard from "./MealCard";

export default function Page() {
    const [date, setDate] = useState<Date | undefined>(new Date())

    return (
        <div className="px-10 sm:px-20 md:px-30 lg:px-40 pt-5">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-[36px] font-black text-white"> 식단 관리 </h1>
                    <p className="text-[#99A1AF] font-normal text-[14px] mt-[10px]"> 오늘의 식사를 기록하고 영양 균형을 확인하세요 </p>
                </div>
                <button
                    className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-[#BFFF0B] text-black text-[10px] sm:text-sm lg:text-base font-bold ml-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-3.5 rounded-md">
                    <div className="relative w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">
                        <Image
                            src={AdminAddButton}
                            alt="추가 버튼"
                            fill
                            sizes="w-4 h-4"
                        />
                    </div>
                    <p>식단 추가</p>
                </button>
            </div>
            <div className="flex justify-between items-center mt-[30px]">
                <MealCalendar
                    selected={date}
                    onSelect={setDate}
                />
            </div>
            <div
                className="
                    w-full 
                    rounded-[8px]
                    md:rounded-[16px]
                    p-5
                    md:p-6
                    bg-[#BFFF0B0D]
                    border-[1px] 
                    border-[#BFFF0B4D]
                    flex
                    flex-col
                    gap-1.5
                    md:gap-3
                    mt-3
                    md:mt-6
                    hover:cursor-pointer">
                <p className="text-[14px] md:text-[18px] font-extrabold text-white"> 오늘의 코멘트</p>
                <p className="text-[12px] md:text-[14px] font-normal text-[#99A1AF]"> 2026-07-19 08:30 </p>
            </div>
            <div>
                <MealCard />
                <MealCard />
            </div>
            <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                오늘의 식단을 남겨주세요
            </div>
        </div>
    );
}