import type { ChatbotQuickReply } from "@/feature/chatbot/type";

interface ChatQuickRepliesProps {
    quickReplies: ChatbotQuickReply[];
    disabled: boolean;
    onSelect: (reply: ChatbotQuickReply) => void;
}

export default function ChatQuickReplies({
    quickReplies,
    disabled,
    onSelect,
}: ChatQuickRepliesProps) {
    if (quickReplies.length === 0) {
        return null;
    }

    return (
        <div className="ml-10 flex flex-wrap gap-2">
            {quickReplies.map((reply) => (
                <button
                    key={`${reply.questionId}-${reply.value}`}
                    type="button"
                    onClick={() => onSelect(reply)}
                    disabled={disabled}
                    className="rounded-full border border-[#364153] bg-[#101828] px-4 py-2 text-xs font-semibold text-[#99A1AF] transition-colors hover:border-[#BFFF0B]/60 hover:bg-[#BFFF0B]/10 hover:text-[#BFFF0B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {reply.label}
                </button>
            ))}
        </div>
    );
}
