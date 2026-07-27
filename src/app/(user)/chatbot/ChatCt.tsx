"use client";

import ChatItem from "./ChatItem";
import { FormEvent, SetStateAction, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getChatbotMessageListAction } from "@/feature/chatbot/action";
import { useChatbotSocket } from "@/components/hooks/useChatbotSocket";
import type { ChatbotDoneEvent, ChatbotQuickReply, ChatbotSocketEvent, ChatSource, RoutineResponse } from "@/feature/chatbot/type";
import { useRouter } from "next/navigation";
import ChatWelcome from "./ChatWelcome";
import ChatQuickReplies from "./ChatQuickReplies";
import ChatInputForm from "./ChatInputForm";

export default function ChatCt({ sessionId }: { sessionId?: string }) {
    const router = useRouter();


    const queryClient = useQueryClient();

    // 무한 스크롤 데이터 불러오는 div
    const targetRef = useRef<HTMLDivElement>(null);
    // 새로운 메세지가 올 때 스크롤될 div
    const endRef = useRef<HTMLDivElement>(null);

    // 현재 requestId가 있는지
    const requestIdRef = useRef<string | null>(null);

    // 현재 메세지
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [socketError, setSocketError] = useState("");

    // 응답으로 오는 값 보여주는 state
    const [response, setResponse] = useState("");

    // sst
    const [isListening, setIsListening] = useState(false);
    const [routine, setRoutine] = useState<RoutineResponse | null>(null);
    const [sources, setSources] = useState<ChatSource[]>([]);

    // 큐에 사용되는 타이머
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    // 백에서 넘어오는 event.text 를 저장해두는 큐
    const queueRef = useRef<string[]>([]);
    // 이벤트가 끝났는지 확인
    const doneEventRef = useRef<ChatbotDoneEvent | null>(null);

    const activeSessionIdRef = useRef(sessionId);
    const [intentHint, setIntentHint] = useState<string>();
    const [quickReplies, setQuickReplies] = useState<ChatbotQuickReply[]>([]);

    const parseDoneJson = <T,>(value: string | null, fallback: T) => {
        if (!value) {
            return fallback;
        }

        try {
            return JSON.parse(value) as T;
        } catch (error) {
            console.error("챗봇 응답 파싱 실패", error);
            return fallback;
        }
    };

    const resetStreamingMeta = () => {
        setRoutine(null);
        setSources([]);
    };

    useEffect(() => {
        activeSessionIdRef.current = sessionId;
    }, [sessionId]);

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
        });
    };

    const refreshChatbotData = async (doneEvent: ChatbotDoneEvent) => {
        try {
            await queryClient.invalidateQueries({
                queryKey: ["chatbot", "session"],
            });

            await queryClient.invalidateQueries({
                queryKey: ["chatbot", "messages"],
            });

            setResponse((previous) => previous === doneEvent.answer
                ? ""
                : previous
            );
        } catch (error) {
            console.error("챗봇 세션 갱신 실패", error);
        }
    };

    const startQueue = () => {
        if (timeout.current !== null) {
            return;
        }

        if (queueRef.current.length === 0) {
            const doneEvent = doneEventRef.current;

            if (doneEvent) {
                setResponse(doneEvent.answer);
                setRoutine(parseDoneJson<RoutineResponse | null>(doneEvent.routine, null));
                setSources(parseDoneJson<ChatSource[]>(doneEvent.sources, []));
                setQuickReplies(doneEvent.quickReplies ?? []);
                setLoading(false);
                requestIdRef.current = null;
                doneEventRef.current = null;
                refreshChatbotData(doneEvent);
            }

            return;
        }


        setResponse((previous) => previous + queueRef.current.shift());


        timeout.current = setTimeout(() => {
            timeout.current = null;
            startQueue();
        }, 30);
    };

    useEffect(() => {
        return () => {
            if (timeout.current) {
                clearTimeout(timeout.current);
                timeout.current = null;
            }
            queueRef.current = [];
            doneEventRef.current = null;
            resetStreamingMeta();
        };
    }, []);

    const handleChatbotEvent = (event: ChatbotSocketEvent) => {
        switch (event.type) {
            case "started": {
                if (timeout.current !== null) {
                    clearTimeout(timeout.current);
                    timeout.current = null;
                }

                queueRef.current = [];
                doneEventRef.current = null;
                requestIdRef.current = event.requestId;
                resetStreamingMeta();

                activeSessionIdRef.current = event.sessionId;
                setQuickReplies([]);

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
                queueRef.current.push(...event.text.split(''))
                startQueue();
                break;
            }
            case "done": {
                if (requestIdRef.current && requestIdRef.current !== event.requestId) {
                    return;
                }

                doneEventRef.current = event;
                startQueue();
                break;
            }
            case "error": {
                if (requestIdRef.current && event.requestId && requestIdRef.current !== event.requestId) {
                    return;
                }
                if (timeout.current !== null) {
                    clearTimeout(timeout.current);
                    timeout.current = null;
                }

                queueRef.current = [];
                doneEventRef.current = null;
                resetStreamingMeta();

                setSocketError(event.message);
                setLoading(false);
                requestIdRef.current = null;
                break;
            }
        }
    }

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
        setQuickReplies([]);
        resetStreamingMeta();

        const sent = sendMessage({
            sessionId: sessionId,
            content,
            intentHint,
            quickReply: null,
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

        setIntentHint(undefined);
    };

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
        resetStreamingMeta();

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

    const handleSuggestionSelect = (suggestionMessage: string, suggestionIntentHint: string) => {
        setMessage(suggestionMessage);
        setIntentHint(suggestionIntentHint);
    };

    const handleMessageChange = (nextMessage: string) => {
        setMessage(nextMessage);
        setIntentHint(undefined);
    };

    const handleSTTMessageChange = (value: SetStateAction<string>) => {
        setMessage(value);
        setIntentHint(undefined);
    };

    useLayoutEffect(() => {
        scrollToBottom();
    }, [messages.length]);


    return (
        <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden pt-[70px] md:w-5/7 md:pt-0">

            <div className="flex min-h-0 w-full flex-1 flex-col overflow-y-auto px-5 py-6 pb-20 sm:px-10 sm:pb-24 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {(!sessionId && !loading) && (
                    <ChatWelcome onSelect={handleSuggestionSelect} />
                )}
                {isError ? (
                    <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-[#99A1AF]">
                        {error.message === '챗봇 접근 권한이 필요합니다.' ? '구독 결제가 필요합니다.' : error.message}
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
                                routine={routine}
                                sources={sources}
                                content={response || "답변을 준비하고 있습니다..."}
                            />
                        )}

                        <ChatQuickReplies
                            quickReplies={quickReplies}
                            disabled={loading || !isConnected}
                            onSelect={handleQuickReply}
                        />

                        <div ref={endRef}></div>
                    </div>
                )}
            </div>

            <ChatInputForm
                message={message}
                loading={loading}
                isConnected={isConnected}
                isListening={isListening}
                socketError={socketError}
                onMessageChange={handleMessageChange}
                onSubmit={handleSubmit}
                onScrollToBottom={scrollToBottom}
                setMessage={handleSTTMessageChange}
                setIsListening={setIsListening}
            />
        </div>
    );
}

