import { HeaderProfile } from "@/components/ui/image";
import type { ChatMessageRole } from "@/feature/chatbot/type";

interface ChatItemProps {
    role: ChatMessageRole;
    content: string;
    createdAt?: string;
}

export default function ChatItem({ role, content, createdAt }: ChatItemProps) {
    const isMyMessage = role === "USER";

    return (
        <div className={`flex max-w-[85%] items-end gap-2 ${isMyMessage ? "ml-auto flex-row-reverse" : ""}`}>
            {!isMyMessage && (
                <div className="mb-5 h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#364153] bg-[#101828]">
                    <img
                        src={HeaderProfile}
                        alt={`프로필`}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}
            <div>
                <p className={`rounded-2xl px-4 py-3 text-sm ${isMyMessage ? "rounded-br-md bg-[#BFFF0B] text-black font-bold" : "rounded-bl-md bg-[#1E2939] text-white"}`}>
                    {content}
                </p>
                <p className={`mt-1 text-xs text-[#6A7282] ${isMyMessage ? "text-right" : ""}`}>
                    {createdAt?.split("T")[0]}
                </p>
            </div>
        </div>
    );
}
