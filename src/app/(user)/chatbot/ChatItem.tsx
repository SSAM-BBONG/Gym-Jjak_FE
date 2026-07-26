import type { ChatMessageRole, ChatSource, RoutineResponse } from "@/feature/chatbot/type";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Image from 'next/image';
import RoutineContent from "@/feature/chatbot/components/RoutineContent";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { memo } from "react";



interface ChatItemProps {
    role: ChatMessageRole;
    content: string;
    createdAt?: string;
    routine?: RoutineResponse | null | undefined,
    sources?: ChatSource[]
}

function ChatItem({ role, content, createdAt, routine, sources }: ChatItemProps) {
    const isMyMessage = role === "USER";

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);

            toast.success('복사되었습니다')
        } catch (error) {
            toast.error('복사 실패하였습니다')
        }
    };



    return (
        <div className={`flex items-end gap-2 ${isMyMessage ? " max-w-[85%] ml-auto flex-row-reverse" : "max-w-full"}`}>
            <div>
                <div className={`rounded-2xl px-4 py-3 text-sm ${isMyMessage ? "rounded-br-md bg-[#BFFF0B] text-black font-bold" : "rounded-bl-md text-white"}`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {content}
                    </ReactMarkdown>
                    {routine && (
                        <RoutineContent routine={routine} />
                    )}
                    {sources && sources.length > 0 && (
                        <div className="mt-4 border-t border-[#364153] pt-3">
                            <p className="text-xs font-semibold text-[#99A1AF]">
                                출처
                            </p>
                            <ul className="mt-2 flex list-disc flex-col gap-1 pl-4 text-xs text-[#99A1AF]">
                                {sources.map((source, index) => (
                                    <li key={`${source.title}-${index}`}>
                                        {source.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
                <div className="flex gap-2">
                    <p className={`mt-1 text-xs text-[#6A7282] ${isMyMessage ? "text-right" : ""}`}>
                        {createdAt?.split("T")[0]}
                    </p>
                    {content && (
                        <button
                            type="button"
                            onClick={handleCopy}
                            aria-label="답변 복사"
                        >
                            <Copy size={14} />
                            복사
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(ChatItem);
