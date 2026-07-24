"use client";

import { ChatSendButton, Logo, MainImg } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";
import ChatItem from "./ChatItem";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getChatbotMessageListAction } from "@/feature/chatbot/action";
import { useChatbotSocket } from "@/components/hooks/useChatbotSocket";
// 수정된 코드 시작
import type { ChatbotQuickReply, ChatbotSocketEvent, RoutineResponse } from "@/feature/chatbot/type";
// 수정된 코드 끝
import STTButton from "./STTButton";
import { useRouter } from "next/navigation";

export default function ChatCt({ sessionId }: { sessionId?: string }) {

    const queryClient = useQueryClient();
    const targetRef = useRef<HTMLDivElement>(null);
    const requestIdRef = useRef<string | null>(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [socketError, setSocketError] = useState("");
    const [response, setResponse] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [routine, setRoutine] = useState<RoutineResponse | null>(null);
    const [source, setSource] = useState("");
    const router = useRouter();
    const endRef = useRef<HTMLDivElement>(null);

    // 수정된 코드 시작
    const activeSessionIdRef = useRef(sessionId);
    const [intentHint, setIntentHint] = useState<string>();
    const [quickReplies, setQuickReplies] = useState<ChatbotQuickReply[]>([]);

    useEffect(() => {
        activeSessionIdRef.current = sessionId;
    }, [sessionId]);
    // 수정된 코드 끝

    const scrollToBottom = () => {
        if (endRef.current) {
            endRef.current.scrollIntoView();
        }
    };

    const handleChatbotEvent = useCallback((event: ChatbotSocketEvent) => {
        switch (event.type) {
            case "started": {
                requestIdRef.current = event.requestId;
                // 수정된 코드 시작
                activeSessionIdRef.current = event.sessionId;
                setQuickReplies([]);
                // 수정된 코드 끝
                setLoading(true);
                router.replace(`/chatbot?sessionId=${event.sessionId}`);
                setSocketError("");
                setResponse("");
                void queryClient.invalidateQueries({
                    queryKey: ["chatbot", "session"],
                });
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
                if (event.routine) {
                    setRoutine(JSON.parse(event.routine) as RoutineResponse);
                    console.log(event.routine)
                }
                if (event.sources) {
                    setSource(JSON.parse(event.sources))
                    console.log(event.sources)
                }

                setResponse(event.answer);
                // 수정된 코드 시작
                setQuickReplies(event.quickReplies ?? []);
                // 수정된 코드 끝
                setLoading(false);
                requestIdRef.current = null;

                scrollToBottom();
                void Promise.all([
                    queryClient.invalidateQueries({
                        queryKey: ["chatbot", "session"],
                    }),
                    queryClient.invalidateQueries({
                        queryKey: ["chatbot", "messages"],
                    }),
                ]).then(() => {
                    setResponse((previous) => (
                        previous === event.answer ? "" : previous
                    ));
                });
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
    }, [queryClient, router]);

    const { sendMessage, isConnected } = useChatbotSocket({
        onEvent: handleChatbotEvent,
    });

    const useChatbotListQuery = () => {
        return useInfiniteQuery({
            queryKey: ["chatbot", "messages", sessionId],
            initialPageParam: undefined as string | undefined,
            queryFn: ({ pageParam }) => {
                return getChatbotMessageListAction(sessionId as string, pageParam);
            },
            getNextPageParam: (lastPage) => {
                if (!lastPage.data.hasNext) {
                    return undefined;
                }

                return lastPage.data.nextCursor ?? undefined;
            },
            enabled: !!sessionId
        })
    }

    const {
        data,
        isError,
        error,
        isPending,
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
        // 수정된 코드 시작
        setQuickReplies([]);
        // 수정된 코드 끝

        const sent = sendMessage({
            sessionId: sessionId,
            content,
            // 수정된 코드 시작
            intentHint,
            quickReply: null,
            // 수정된 코드 끝
        });

        if (!sent) {
            setLoading(false);
            setSocketError("메시지를 전송하지 못했습니다.");
            return;
        }

        void queryClient.invalidateQueries({
            queryKey: ["chatbot", "session"],
        });
        void queryClient.invalidateQueries({
            queryKey: ["chatbot", "messages"],
        });

        setMessage("");
        // 수정된 코드 시작
        setIntentHint(undefined);
        // 수정된 코드 끝
    };

    // 수정된 코드 시작
    const handleQuickReply = (reply: ChatbotQuickReply) => {
        if (loading || !isConnected) {
            setSocketError("챗봇 서버에 연결 중입니다. 잠시 후 다시 시도해주세요.");
            return;
        }

        const quickReplyIntentHint =
            reply.questionId === "GREETING_ACTION"
                ? reply.value
                : "ROUTINE_RECOMMENDATION";

        setLoading(true);
        setSocketError("");
        setResponse("");
        setQuickReplies([]);

        const sent = sendMessage({
            sessionId: activeSessionIdRef.current,
            content: reply.label,
            intentHint: quickReplyIntentHint,
            quickReply: {
                questionId: reply.questionId,
                value: reply.value,
            },
        });

        if (!sent) {
            setLoading(false);
            setSocketError("선택지를 전송하지 못했습니다.");
        }
    };
    // 수정된 코드 끝


    return (
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden pt-[70px] md:w-5/7 md:pt-0">
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

            <div className="min-h-0 w-full flex-1 overflow-y-auto px-5 py-6 pb-20 sm:px-10 sm:pb-24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {(!sessionId && !loading) && (
                    <div className="flex flex-1 mt-20 md:mt-50 flex-col items-center justify-center px-4 text-center">
                        <div className="flex size-12 items-center justify-center rounded-full border border-[#364153] bg-[#101828]">
                            <div className="relative h-10 w-10 sm:h-13 sm:w-20 ">
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
                            {/* 수정된 코드 시작 */}
                            <button onClick={() => { setMessage("운동 루틴을 추천해주세요"); setIntentHint("ROUTINE_RECOMMENDATION"); }} className="rounded-full border border-[#364153] bg-[#101828] px-4 py-2 text-xs font-semibold text-[#99A1AF] transition-colors hover:border-[#BFFF0B]/60 hover:bg-[#BFFF0B]/10 hover:text-[#BFFF0B] focus-visible:border-[#BFFF0B] focus-visible:text-[#BFFF0B] focus-visible:outline-none sm:px-5 sm:text-sm">운동 루틴 추천</button>
                            <button onClick={() => { setMessage("짐짝 서비스를 설명해주세요"); setIntentHint("SERVICE_POLICY"); }} className="rounded-full border border-[#364153] bg-[#101828] px-4 py-2 text-xs font-semibold text-[#99A1AF] transition-colors hover:border-[#BFFF0B]/60 hover:bg-[#BFFF0B]/10 hover:text-[#BFFF0B] focus-visible:border-[#BFFF0B] focus-visible:text-[#BFFF0B] focus-visible:outline-none sm:px-5 sm:text-sm">짐짝이란?</button>
                            <button onClick={() => { setMessage("내 운동 기록을 확인해주세요"); setIntentHint("PERSONAL_RECORD"); }} className="rounded-full border border-[#364153] bg-[#101828] px-4 py-2 text-xs font-semibold text-[#99A1AF] transition-colors hover:border-[#BFFF0B]/60 hover:bg-[#BFFF0B]/10 hover:text-[#BFFF0B] focus-visible:border-[#BFFF0B] focus-visible:text-[#BFFF0B] focus-visible:outline-none sm:px-5 sm:text-sm">운동 기록 확인</button>
                            {/* 수정된 코드 끝 */}
                        </div>
                    </div>
                )}
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
                                routine={chatMessage?.routine}
                                sources={chatMessage?.sources}
                            />
                        ))}
                        {(loading || response) && (
                            <ChatItem
                                role="ASSISTANT"
                                content={response || "답변을 준비하고 있습니다..."}
                            />
                        )}
                        {/* 수정된 코드 시작 */}
                        {quickReplies.length > 0 && (
                            <div className="ml-10 flex flex-wrap gap-2">
                                {quickReplies.map((reply) => (
                                    <button
                                        key={`${reply.questionId}-${reply.value}`}
                                        type="button"
                                        onClick={() => handleQuickReply(reply)}
                                        disabled={loading || !isConnected}
                                        className="rounded-full border border-[#364153] bg-[#101828] px-4 py-2 text-xs font-semibold text-[#99A1AF] transition-colors hover:border-[#BFFF0B]/60 hover:bg-[#BFFF0B]/10 hover:text-[#BFFF0B] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {reply.label}
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* 수정된 코드 끝 */}
                    </div>
                )}
            </div>

            {socketError && (
                <p className="absolute bottom-16 px-5 pb-2 text-center text-xs text-[#FB7185]">
                    {socketError}
                </p>
            )}


            {isListening && (
                <p className="absolute bottom-16 px-5 pb-2 text-center text-xs text-[#99A1AF]">
                    음성인식 중입니다...
                </p>
            )}
            <div ref={endRef}></div>
            <form
                onSubmit={handleSubmit}
                className="absolute bottom-0 z-50 flex w-full items-center gap-3 bg-[#0B0F19] px-4 pb-4 sm:px-5 sm:pb-5"
            >
                <input
                    type="text"
                    value={message}
                    // 수정된 코드 시작
                    onChange={(event) => {
                        setMessage(event.target.value);
                        setIntentHint(undefined);
                    }}
                    // 수정된 코드 끝
                    placeholder={`메시지 보내기...`}
                    aria-label="메시지 입력"
                    maxLength={5000}
                    disabled={loading}
                    className="h-11 min-w-0 flex-1 rounded-[15px] border border-[#364153] bg-[#0F172A] px-4 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#65748B]"
                />
                <STTButton loading={loading} isConnected={isConnected} setMessage={setMessage} isListening={isListening} setIsListening={setIsListening} />
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

