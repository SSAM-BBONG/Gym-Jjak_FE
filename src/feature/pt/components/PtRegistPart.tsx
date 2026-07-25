import { PtRegistFormValue } from "@/lib/ptRegistSchema";
import { UseFormRegister } from "react-hook-form";

const parts: PartKo[] = ["가슴", "등", "어깨", "팔", "복근", "코어", "하체", "둔근", "전신"];

const partTypeMap: Record<PartKo, Part> = {
    가슴: "CHEST",
    등: "BACK",
    어깨: "SHOULDER",
    팔: "ARM",
    복근: "ABS",
    코어: "CORE",
    하체: "LEG",
    둔근: "GLUTE",
    전신: "FULL_BODY",
};

interface PtRegistPartProps {
    register: UseFormRegister<PtRegistFormValue>;
    error?: string;
}

export default function PtRegistPart({ register, error }: PtRegistPartProps) {
    return (
        <section className="flex flex-col gap-4 rounded-[16px] border border-[#1E2939] bg-[#101828] p-4 sm:gap-5 sm:p-5 lg:gap-6 lg:p-6">
            <p className="text-base font-extrabold text-white sm:text-[17px] lg:text-[18px]">운동 부위</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
                {parts.map((part) => (
                    <label key={part} className="cursor-pointer">
                        <input
                            type="radio"
                            value={partTypeMap[part]}
                            className="peer sr-only"
                            {...register("part")}
                        />
                        <span
                            className="block rounded-[10px] bg-[#1E2939] px-3 py-2 text-[14px] font-medium text-[#99A1AF] transition-colors peer-checked:bg-[#BFFF0B] peer-checked:text-black sm:px-4 sm:text-[15px] lg:text-[16px]"
                        >
                            {part}
                        </span>
                    </label>
                ))}
            </div>
            {error && <p className="text-[14px] text-red-400">{error}</p>}
        </section>
    );
}
