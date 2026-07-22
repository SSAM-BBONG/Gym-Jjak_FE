import { Check } from "lucide-react";
import type { ReactNode } from "react";

interface FeatureCardProps {
    icon: ReactNode;
    title: string;
    description: string;
    items?: string[];
}

export default function FeatureCard({ icon, title, description, items }: FeatureCardProps) {
    return (
        <article className="w-full rounded-[16px] border border-[#36415380] bg-[#101828] p-8">
            <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-[#1E2939] text-[#BFFF0B]">
                    {icon}
                </div>
                <div className="w-full">
                    <h3 className="text-[24px] text-white font-extrabold">{title}</h3>
                </div>
            </div>
            <p className="text-[16px] text-[#99A1AF] font-normal leading-8 mt-7">{description}</p>
            {items && (
                <div className="flex flex-col gap-3 mt-7">
                    {items.map((item) => (
                        <p key={item} className="flex items-center gap-3 text-[15px] text-[#D1D5DC] font-normal">
                            <Check size={18} className="text-[#BFFF0B]" />
                            {item}
                        </p>
                    ))}
                </div>
            )}
        </article>
    );
}
