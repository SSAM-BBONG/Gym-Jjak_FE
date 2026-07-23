import { Check, Crown } from "lucide-react";

interface PlanCardProps {
    id: string;
    name: string;
    value: string;
    title: string;
    price: string;
    unit: string;
    description: string;
    defaultChecked?: boolean;
    badge?: string;
}

const planFeatures = [
    "AI 챗봇 (루틴 추천 포함)",
    "식단 AI 자동 분석 + 한줄 코멘트",
    "시장동향 리포트 (트레이너·조직)",
];

export default function PlanCard({ id, name, value, title, price, unit, description, defaultChecked, badge }: PlanCardProps) {
    return (
        <label
            htmlFor={id}
            className="relative w-full rounded-[16px] border border-[#36415380] bg-[#101828] p-5 sm:p-6 lg:p-8 cursor-pointer has-checked:border-[#BFFF0B] has-checked:bg-[#BFFF0B0D] has-checked:[&_.plan-description]:text-[#BFFF0B] has-checked:[&_.plan-check]:bg-[#BFFF0B] has-checked:[&_.plan-check]:border-[#BFFF0B] has-checked:[&_.plan-check]:text-black has-checked:[&_.plan-check-icon]:block"
        >
            <input
                hidden
                type="radio"
                id={id}
                name={name}
                value={value}
                defaultChecked={defaultChecked}
                className="peer"
            />
            {badge && (
                <p className="absolute -top-4 lg:-top-5 left-1/2 -translate-x-1/2 rounded-full bg-[#BFFF0B] px-3 sm:px-4 lg:px-5 py-1 text-[12px] sm:text-[13px] lg:text-[14px] font-extrabold text-black">
                    <Crown size={15} className="inline mr-1" />
                    {badge}
                </p>
            )}
            <div className="flex justify-between">
                <div>
                    <p className="text-[16px] lg:text-[18px] text-[#99A1AF] font-extrabold">{title}</p>
                    <div className="flex items-end gap-1.5 lg:gap-2 mt-3 lg:mt-4">
                        <p className="text-[34px] sm:text-[40px] lg:text-[48px] leading-none text-white font-black">{price}</p>
                        <p className="text-[13px] sm:text-[14px] lg:text-[16px] text-[#D1D5DC] font-normal">{unit}</p>
                    </div>
                    <p className="plan-description text-[13px] sm:text-[14px] lg:text-[15px] font-bold mt-3 lg:mt-4 text-[#6A7282]">{description}</p>
                </div>
                <div className="plan-check flex items-center justify-center w-7 h-7 lg:w-8 lg:h-8 rounded-full border border-[#6A7282] text-[#101828]">
                    <Check size={20} className="plan-check-icon hidden" />
                </div>
            </div>
            <div className="h-px bg-[#1E2939] w-full my-6 lg:my-8"></div>
            <div className="flex flex-col gap-3 lg:gap-4">
                {planFeatures.map((item) => (
                    <p key={item} className="flex items-center gap-2 lg:gap-3 text-[13px] sm:text-[15px] lg:text-[17px] text-[#D1D5DC] font-normal">
                        <Check size={18} className="text-[#BFFF0B]" />
                        {item}
                    </p>
                ))}
            </div>
        </label>
    );
}
