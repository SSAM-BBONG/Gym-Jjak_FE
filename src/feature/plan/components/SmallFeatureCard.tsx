import type { ReactNode } from "react";

interface SmallFeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function SmallFeatureCard({ icon, title, description }: SmallFeatureCardProps) {
    return (
        <article className="w-full flex items-center gap-3 sm:gap-4 lg:gap-5 rounded-[16px] border border-[#36415380] bg-[#101828] p-5 sm:p-6 lg:p-7">
            <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-[12px] bg-[#1E2939] text-[#99A1AF]">
                {icon}
            </div>
            <div className="w-full">
                <h3 className="text-[17px] sm:text-[18px] lg:text-[20px] text-white font-extrabold">{title}</h3>
                <p className="text-[13px] sm:text-[14px] lg:text-[15px] text-[#6A7282] font-normal mt-1">{description}</p>
            </div>
        </article>
    );
}
