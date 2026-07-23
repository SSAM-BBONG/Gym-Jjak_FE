"use client";

import { ChatSendButton } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";
import ChatItem from "./ChatItem";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getChatbotMessageListAction } from "@/feature/chatbot/action";
import { useChatbotSocket } from "@/components/hooks/useChatbotSocket";
import type { ChatbotSocketEvent } from "@/feature/chatbot/type";

export default function ChatCt({ sessionId }: { sessionId?: string }) {

    const targetRef = useRef<HTMLDivElement>(null);
    const requestIdRef = useRef<string | null>(null);
    const [currentSessionId, setCurrentSessionId] = useState(sessionId);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [socketError, setSocketError] = useState("");
    const [response, setResponse] = useState("");
    const [sentMessage, setSentMessage] = useState("");

    const handleChatbotEvent = useCallback((event: ChatbotSocketEvent) => {
        switch (event.type) {
            case "started": {
                requestIdRef.current = event.requestId;
                setCurrentSessionId(event.sessionId);
                setLoading(true);
                setSocketError("");
                setResponse("");
                break;
            }
            case "delta": {
                if (requestIdRef.current && requestIdRef.current !== event.requestId) {
                    return;
                }

                setResponse((previous) => previous + event.text);
                break;
            }
            case "done": {
                if (requestIdRef.current && requestIdRef.current !== event.requestId) {
                    return;
                }

                setResponse(event.answer);
                setLoading(false);
                requestIdRef.current = null;
                break;
            }
            case "error": {
                if (requestIdRef.current && event.requestId && requestIdRef.current !== event.requestId) {
                    return;
                }

                setSocketError(event.message);
                setLoading(false);
                requestIdRef.current = null;
                break;
            }
        }
    }, []);

    const { sendMessage, isConnected } = useChatbotSocket({
        onEvent: handleChatbotEvent,
    });

    const useChatbotListQuery = () => {
        return useInfiniteQuery({
            queryKey: ["chatbot", "messages", currentSessionId],
            initialPageParam: undefined as string | undefined,
            queryFn: ({ pageParam }) => {
                return getChatbotMessageListAction(currentSessionId as string, pageParam);
            },
            getNextPageParam: (lastPage) => {
                if (!lastPage.data.hasNext) {
                    return undefined;
                }

                return lastPage.data.nextCursor ?? undefined;
            },
            enabled: !!currentSessionId
        })
    }

    const {
        data,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useChatbotListQuery();

    useEffect(() => {
        const target = targetRef.current;

        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                    void fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    ]);

    const messages = data?.pages.flatMap((page) => page.data.messages) ?? [];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const content = message.trim();

        if (!content) {
            setSocketError("메시지를 입력해주세요.");
            return;
        }

        if (!isConnected) {
            setSocketError("챗봇 서버에 연결 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        setLoading(true);
        setSocketError("");
        setResponse("");
        setSentMessage(content);

        const sent = sendMessage({
            sessionId: currentSessionId,
            content,
        });

        if (!sent) {
            setLoading(false);
            setSocketError("메시지를 전송하지 못했습니다.");
            return;
        }

        setMessage("");
    };

    return (
        <div className="relative flex items-start min-h-[calc(100vh-70px)] w-full md:w-5/7 py-[70px] md:pt-[0px] ">
            <header className="absolute top-0 z-50  h-[70px] w-full items-center justify-between  bg-[#0B0F19] px-5 sm:px-6 flex md:hidden">
                <div className="flex items-center gap-4">
                    <Link
                        href="/"
                        aria-label="메인으로 돌아가기"
                        className="text-[#99A1AF] text-[25px] hover:text-white"
                    >
                        ⭠
                    </Link>
                </div>

                {/* <ChatRoomMenu
                        chatRoomId={chatRoomId}
                        reportMessageId={reportMessageId}
                        partnerName={partnerName}
                    /> */}
            </header>

            <div className="h-full w-full overflow-y-auto px-5 py-6 sm:px-10">
                {isError ? (
                    <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-[#99A1AF]">
                        {error.message}
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {hasNextPage && (
                            <div
                                ref={targetRef}
                                className="h-1"
                                aria-hidden="true"
                            />
                        )}
                        {messages.map((chatMessage) => (
                            <ChatItem
                                key={chatMessage.messageId}
                                role={chatMessage.role}
                                content={chatMessage.content}
                                createdAt={chatMessage.createdAt}
                            />
                        ))}
                        {sentMessage && (
                            <ChatItem
                                role="USER"
                                content={sentMessage}
                            />
                        )}
                        {(loading || response) && (
                            <ChatItem
                                role="ASSISTANT"
                                content={response || "답변을 준비하고 있습니다..."}
                            />
                        )}
                    </div>
                )}
            </div>

            {socketError && (
                <p className="absolute bottom-16 px-5 pb-2 text-center text-xs text-[#FB7185]">
                    {socketError}
                </p>
            )}
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 z-50 flex w-full items-center gap-3 bg-[#0B0F19] px-4 pb-4 sm:px-5 sm:pb-5"
            >
                <input
                    type="text"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder={`메시지 보내기...`}
                    aria-label="메시지 입력"
                    maxLength={5000}
                    disabled={loading}
                    className="h-11 min-w-0 flex-1 rounded-[15px] border border-[#364153] bg-[#0F172A] px-4 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#65748B]"
                />
                <button
                    type="submit"
                    disabled={loading || !isConnected || !message.trim()}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BFFF0B] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Image src={ChatSendButton} alt="채팅 보내기 버튼" width={20} height={15} />
                </button>
            </form>
        </div>
    );
}

