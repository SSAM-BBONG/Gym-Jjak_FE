import { BrainCircuit, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface AiLoadingProps {
  label?: string;
  description?: string;
  className?: string;
}

export default function AiLoading({
  label = "AI가 분석하고 있어요",
  description = "잠시만 기다려주세요.",
  className,
}: AiLoadingProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        "flex size-full min-h-40 items-center justify-center overflow-hidden rounded-xl bg-[#111827] p-5 sm:p-8",
        className,
      )}
    >
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-5 flex size-24 items-center justify-center sm:size-28">
          <div className="absolute inset-0 animate-pulse rounded-full bg-[#BFFF0B]/15 blur-2xl" />

          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-r-[#BFFF0B]/25 border-t-[#BFFF0B] [animation-duration:1.6s]" />
          <div className="absolute inset-2 animate-spin rounded-full border border-transparent border-b-[#BFFF0B]/70 border-l-[#BFFF0B]/20 [animation-direction:reverse] [animation-duration:1.1s]" />
          <div className="absolute inset-4 animate-pulse rounded-full border border-[#BFFF0B]/15" />

          <span className="absolute left-1 top-1/2 size-1.5 rounded-full bg-[#BFFF0B] shadow-[0_0_8px_#BFFF0B]" />
          <span className="absolute right-2 top-5 size-1 rounded-full bg-white/70" />

          <div className="relative flex size-12 items-center justify-center rounded-full border border-[#BFFF0B]/30 bg-[#1E2939] shadow-[0_0_24px_rgba(191,255,11,0.18)] sm:size-14">
            <BrainCircuit className="size-6 text-[#BFFF0B] sm:size-7" />
          </div>

          <Sparkles className="absolute right-0 top-0 size-4 animate-pulse text-[#BFFF0B]" />
        </div>

        <p className="text-base font-bold text-white sm:text-lg">{label}</p>
        <p className="mt-1 text-xs text-[#99A1AF] sm:text-sm">{description}</p>
      </div>
    </div>
  );
}
