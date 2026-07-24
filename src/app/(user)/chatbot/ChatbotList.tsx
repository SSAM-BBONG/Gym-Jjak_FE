"use client";

import { getChatbotSessionListAction } from "@/feature/chatbot/action";
import ChatAddButton from "@/feature/chatbot/components/ChatAddButton";
import ChatbotListItem from "@/feature/chatbot/components/ChatbotListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MessageSquareText } from "lucide-react";
import { useEffect, useRef } from "react";

export default function ChatbotList({ sessionId }: { sessionId?: string }) {

    const targetRef = useRef<HTMLDivElement>(null);

    const useChatbotListQuery = () => {
        return useInfiniteQuery({
            queryKey: ["chatbot", "session"],
            // 첫 요청에 전달되는 커서 
            initialPageParam: undefined as string | undefined,
            // 두 번째 요청부터 pageParam에 nextCursor가 들어감
            queryFn: ({ pageParam }) => {
                return getChatbotSessionListAction(pageParam);
            },
            getNextPageParam: (lastPage) => {
                if (!lastPage.data.hasNext) {
                    return undefined;
                }

                return lastPage.data.nextCursor ?? undefined;
            },
        })
    }

    const {
        data,
        isPending,
        isError,
        error,
        fetchNextPage, // 다음 커서로 API 요청
        hasNextPage,
        isFetchingNextPage, // 현재 다음 데이터를 요청 중인지
    } = useChatbotListQuery();

    useEffect(() => {
        const target = targetRef.current;

        if (!target) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (
                    entry.isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    void fetchNextPage();
                }
            },
            {
                rootMargin: "200px",
            }
            // 사용자가 끝에 도달하기 200px 전 감지
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

    const sessions = data?.pages.flatMap((page) => page.data.sessions) ?? [];

    return (
        <aside className="hidden h-full min-h-0 w-2/7 shrink-0 flex-col overflow-hidden border-r border-[#253046] bg-[#0B0F19] md:flex">
            <header className="flex h-[70px] shrink-0 items-center justify-between px-5 lg:px-6">
                <div>
                    <h2 className="text-base font-bold text-white lg:text-lg">
                        AI 대화 목록
                    </h2>
                    <p className="mt-0.5 text-xs text-[#6A7282]">
                        {sessions.length}개의 대화
                    </p>
                </div>
                <ChatAddButton />
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto p-3 [scrollbar-width:none] [-ms-overflow-style:none] lg:p-4 [&::-webkit-scrollbar]:hidden">
                <div className="flex min-h-full flex-col gap-2">
                    {isError ? (
                        <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-[#99A1AF]">
                            {error.message}
                        </div>
                    ) : (
                        <>
                            {sessions.map((session) => (
                                <ChatbotListItem
                                    key={session.sessionId}
                                    session={session}
                                    isSelected={sessionId === session.sessionId}
                                />
                            ))}

                            {!isPending && sessions.length === 0 && (
                                <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                                    <div className="flex size-12 items-center justify-center rounded-full border border-[#364153] bg-[#101828]">
                                        <MessageSquareText className="size-5 text-[#6A7282]" />
                                    </div>
                                    <p className="mt-4 text-sm font-semibold text-[#D1D5DC]">
                                        아직 대화 내역이 없어요
                                    </p>
                                    <p className="mt-1 text-xs text-[#6A7282]">
                                        AI와 새로운 대화를 시작해보세요.
                                    </p>
                                </div>
                            )}

                            {hasNextPage && (
                                <div
                                    ref={targetRef}
                                    className="h-1 shrink-0"
                                    aria-hidden="true"
                                />
                            )}

                            {isFetchingNextPage && (
                                <div className="group w-full shrink-0 rounded-xl border border-transparent bg-[#101828] p-4 text-left transition-colors hover:border-[#364153] hover:bg-[#1E2939]"></div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}
