import type { ReactNode } from "react";

interface SmallFeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
}

export default function SmallFeatureCard({ icon, title, description }: SmallFeatureCardProps) {
    return (
        <article className="w-full flex items-center gap-5 rounded-[16px] border border-[#36415380] bg-[#101828] p-7">
            <div className="flex items-center justify-center w-12 h-12 rounded-[12px] bg-[#1E2939] text-[#99A1AF]">
                {icon}
            </div>
            <div className="w-full">
                <h3 className="text-[20px] text-white font-extrabold">{title}</h3>
                <p className="text-[15px] text-[#6A7282] font-normal mt-1">{description}</p>
            </div>
        </article>
    );
}
