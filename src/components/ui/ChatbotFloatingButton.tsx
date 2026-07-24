import { MessageCircleQuestion } from "lucide-react";
import Link from "next/link";

export default function ChatbotFloatingButton() {
    return (
        <Link
            href="/chatbot"
            aria-label="챗봇에 질문하기"
            className="group fixed right-5 bottom-5 z-50 h-14 w-14 overflow-hidden rounded-full bg-[#BFFF0B] text-black shadow-[0_8px_30px_rgba(191,255,11,0.28)] transition-[width,transform,box-shadow] duration-300 ease-out hover:w-48  hover:shadow-[0_12px_36px_rgba(191,255,11,0.4)] focus-visible:w-48 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BFFF0B] sm:right-7 sm:bottom-7"
        >
            <span className="absolute inset-y-0 right-14 left-4 flex translate-x-3 items-center justify-center whitespace-nowrap text-sm font-extrabold opacity-0 transition-[opacity,transform] delay-0 duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                챗봇에 질문하기
            </span>
            <span className="absolute top-0 right-0 flex size-14 shrink-0 items-center justify-center">
                <MessageCircleQuestion
                    className="size-6"
                    aria-hidden="true"
                />
            </span>
        </Link>
    );
}
