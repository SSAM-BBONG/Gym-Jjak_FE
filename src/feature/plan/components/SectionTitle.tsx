interface SectionTitleProps {
    title: string;
    badge: "무료" | "유료";
}

export default function SectionTitle({ title, badge }: SectionTitleProps) {
    return (
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 w-full mt-14 sm:mt-16 lg:mt-20 mb-5 sm:mb-6 lg:mb-7">
            <p className="min-w-24 sm:min-w-32 lg:min-w-40 text-[14px] sm:text-[16px] lg:text-[18px] text-[#99A1AF] font-extrabold">{title}</p>
            <div className="h-px bg-[#1E2939] w-full"></div>
            <div className="min-w-20 sm:min-w-28 lg:min-w-40 flex justify-end">
                <p className={`w-14 sm:w-16 lg:w-17 flex justify-center items-center ${badge === "무료" ? "bg-[#BFFF0B1A] border-[#BFFF0B4D]" : "bg-[#BFFF0B0D] border-[#BFFF0B4D]"} border text-[#BFFF0B] rounded-full px-3 lg:px-4 py-1 text-[12px] sm:text-[13px] lg:text-[14px] font-extrabold`}>
                    {badge}
                </p>
            </div>

        </div>
    );
}
