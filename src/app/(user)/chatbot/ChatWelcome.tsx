import { Logo } from "@/components/ui/image";
import Image from "next/image";

interface ChatWelcomeProps {
    onSelect: (message: string, intentHint: string) => void;
}

const suggestions = [
    {
        label: "운동 루틴 추천",
        message: "운동 루틴을 추천해주세요",
        intentHint: "ROUTINE_RECOMMENDATION",
    },
    {
        label: "짐짝이란?",
        message: "짐짝 서비스를 설명해주세요",
        intentHint: "SERVICE_POLICY",
    },
    {
        label: "운동 기록 확인",
        message: "내 운동 기록을 확인해주세요",
        intentHint: "PERSONAL_RECORD",
    },
];

export default function ChatWelcome({ onSelect }: ChatWelcomeProps) {
    return (
        <div className="mt-10 flex flex-1 flex-col items-center justify-center px-4 text-center md:mt-30">
            <div className="flex size-12 items-center justify-center rounded-full border border-[#364153] bg-[#101828]">
                <div className="relative h-10 w-10 sm:h-13 sm:w-20">
                    <Image
                        src={Logo}
                        alt="운동을 표현한 메인 일러스트"
                        fill
                        priority
                        sizes="w-20 h-20"
                    />
                </div>
            </div>
            <p className="mt-4 text-xl font-semibold text-[#D1D5DC]">
                궁금한 점이 있으신가요?
            </p>
            <p className="mt-1 text-lg text-[#6A7282]">
                짐짝과 새로운 대화를 시작해보세요.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
                {suggestions.map((suggestion) => (
                    <button
                        key={suggestion.intentHint}
                        type="button"
                        onClick={() => onSelect(suggestion.message, suggestion.intentHint)}
                        className="rounded-full border border-[#364153] bg-[#101828] px-4 py-2 text-xs font-semibold text-[#99A1AF] transition-colors hover:border-[#BFFF0B]/60 hover:bg-[#BFFF0B]/10 hover:text-[#BFFF0B] focus-visible:border-[#BFFF0B] focus-visible:text-[#BFFF0B] focus-visible:outline-none sm:px-5 sm:text-sm"
                    >
                        {suggestion.label}
                    </button>
                ))}
            </div>
        </div>
    );
}
