import { Clock3 } from "lucide-react";
import type { ChatSession } from "../type";
import Link from "next/link";

interface ChatbotListItemProps {
    session: ChatSession;
    isSelected?: boolean;
}

export default function ChatbotListItem({
    session,
    isSelected = false,
}: ChatbotListItemProps) {
    return (
        <Link
            href={`/chatbot?sessionId=${session.sessionId}`}
            type="button"
            className={`group w-full rounded-xl border p-4 text-left transition-colors ${isSelected
                ? "border-[#BFFF0B]/50 bg-[#BFFF0B]/8"
                : "border-transparent bg-[#101828] hover:border-[#364153] hover:bg-[#1E2939]"
                }`}
        >
            <div className="flex items-start gap-3">
                <span
                    className={`mt-1 size-2 shrink-0 rounded-full ${isSelected
                        ? "bg-[#BFFF0B] shadow-[0_0_8px_rgba(191,255,11,0.7)]"
                        : "bg-[#4A5565] group-hover:bg-[#BFFF0B]/70"
                        }`}
                />

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-bold text-white">
                        {session.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-[#99A1AF]">
                        {session.lastMessage}
                    </p>

                    <div className="mt-3 flex items-center justify-end gap-1 text-[11px] text-[#6A7282]">
                        <Clock3 className="size-3" />
                        <time dateTime={session.lastActivityAt}>
                            {session.lastActivityAt}
                        </time>
                    </div>
                </div>
            </div>
        </Link>
    );
}
