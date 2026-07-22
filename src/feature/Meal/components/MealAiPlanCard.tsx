import { ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function MealAiPlanCard() {
    return (
        <Link
            href="/plan"
            className="mt-3 flex w-full flex-col gap-3 rounded-[8px] border border-[#BFFF0B4D] bg-[#BFFF0B0D] p-5 text-left hover:cursor-pointer hover:bg-[#BFFF0B14] md:mt-6 md:gap-4 md:rounded-[16px] md:p-6"
        >
            <div className="flex w-full items-start justify-between gap-4">
                <div>
                    <p className="flex items-center gap-2 text-[14px] font-extrabold text-white md:text-[18px]">
                        <Sparkles size={18} className="text-[#BFFF0B]" />
                        AI 식단 분석 구독
                    </p>
                    <p className="mt-1 text-[11px] font-normal text-[#99A1AF] md:text-[13px]">
                        사진 한 장으로 영양소를 자동 분석하고 한줄 코멘트까지 받아보세요!
                    </p>
                </div>
                <div className="hidden items-center gap-1 text-[12px] font-extrabold text-[#BFFF0B] md:text-[14px] md:flex">
                    구독하기
                    <ChevronRight size={18} />
                </div>
            </div>
        </Link>
    );
}
