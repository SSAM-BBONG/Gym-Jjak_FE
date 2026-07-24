import { HeaderProfile } from "@/components/ui/image";
import type { ChatMessageRole } from "@/feature/chatbot/type";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Image from 'next/image';



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
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}//스타일 속성을 작성해줘야하는 단점이 있지만 xss 공격을 막기 위해 rehypeSanitize 이걸 사용
                        components={{
                            code({ node, children, className, ...props }: any) { // code 블록에만 작동  <code>/api/chat</code>, <code className='language-ts'>/api/chat</code>    
                                const matched = /language-(\w+)/.exec(className || '')//["language-ts", "ts"] || []
                                if (matched) { //매칭된게 있으면 == 코드블럭 == 코드 하이라이팅 반환
                                    return (
                                        <SyntaxHighlighter
                                            language={matched[1]}
                                            PreTag={"div"}
                                            style={vscDarkPlus}
                                            {...props}
                                        >{`//${matched[1]}\n${children}`}</SyntaxHighlighter>
                                    )
                                }

                                //매칭된게 없으면 == 인라인 코드 == 그대로의 요소 반환
                                return <code {...props}>{children}</code>
                            },
                            img({ src, alt, ...props }: any) {
                                return (
                                    <div className='w-120 h-50 relative'>
                                        <Image
                                            src={src}
                                            alt={alt}
                                            fill
                                            className='rounded-lg border my-0 border-gray-200'
                                        />
                                    </div>)
                            },
                            a({ href, children, ...props }: any) {
                                return (
                                    <a
                                        {...props}
                                        href={href || '#'}
                                        target='_blank'
                                        rel='noopener noreferer'
                                        className='text-indigo-600 font-medium'
                                    >
                                        {children}
                                    </a>
                                )
                            }
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </p>
                <p className={`mt-1 text-xs text-[#6A7282] ${isMyMessage ? "text-right" : ""}`}>
                    {createdAt?.split("T")[0]}
                </p>
            </div>
        </div>
    );
}
