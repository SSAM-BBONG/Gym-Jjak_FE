interface SectionTitleProps {
    title: string;
    badge: "무료" | "유료";
}

export default function SectionTitle({ title, badge }: SectionTitleProps) {
    return (
        <div className="flex items-center gap-4 w-full mt-20 mb-7">
            <p className="min-w-30 text-[18px] text-[#99A1AF] font-extrabold">{title}</p>
            <div className="h-px bg-[#1E2939] w-full"></div>
            <p className={`w-17 flex justify-center items-center ${badge === "무료" ? "bg-[#BFFF0B1A] border-[#BFFF0B4D]" : "bg-[#BFFF0B0D] border-[#BFFF0B4D]"} border text-[#BFFF0B] rounded-full px-4 py-1 text-[14px] font-extrabold`}>
                {badge}
            </p>
        </div>
    );
}
