"use client";

import { chat, ChatSendButton, HeaderProfile } from "@/components/ui/image";
import type { ChatMessageData, ChatMessageHistoryData } from "@/feature/chat/type";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useCallback, useEffect, useState } from "react";
import ChatRoomMenu from "./ChatRoomMenu";
import { useChatRoomSocket } from "@/components/hooks/useChatRoomSocket";

interface ChatRoomProps {
    chatRoomId: number;
    partnerName?: string;
    partnerProfileImageUrl?: string | null;
    messages: ChatMessageHistoryData[];
    currentUserId?: number;
}

export default function ChatRoom({
    chatRoomId,
    partnerName,
    partnerProfileImageUrl,
    messages,
    currentUserId,
}: ChatRoomProps) {
    const [chatMessages, setChatMessages] = useState<ChatMessageHistoryData[]>(messages);
    const [content, setContent] = useState("");

    useEffect(() => {
        setChatMessages((previousMessages) => {
            const messageById = new Map(
                previousMessages.map((message) => [message.messageId, message])
            );

            messages.forEach((message) => {
                messageById.set(message.messageId, message);
            });

            return [...messageById.values()].sort(
                (firstMessage, secondMessage) => firstMessage.messageId - secondMessage.messageId
            );
        });
    }, [messages]);

    const handleMessage = useCallback((message: ChatMessageData) => {
        setChatMessages((previousMessages) => {
            if (previousMessages.some(({ messageId }) => messageId === message.messageId)) {
                return previousMessages;
            }

            return [...previousMessages, message];
        });
    }, []);

    useEffect(() => {
        const handleGlobalChatMessage = (event: Event) => {
            const message = (event as CustomEvent<ChatMessageData>).detail;

            if (message.chatRoomId === chatRoomId) {
                handleMessage(message);
            }
        };

        window.addEventListener("chat-message", handleGlobalChatMessage);

        return () => {
            window.removeEventListener("chat-message", handleGlobalChatMessage);
        };
    }, [chatRoomId, handleMessage]);

    const { isConnected, connectionError, sendMessage } = useChatRoomSocket({
        chatRoomId,
        onMessage: handleMessage,
    });
    const hasMessages = chatMessages.length > 0;
    const reportMessageId = currentUserId
        ? [...chatMessages]
            .reverse()
            .find((message) => message.senderId !== currentUserId)?.messageId
        : undefined;

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const trimmedContent = content.trim();

        if (!trimmedContent || !sendMessage(trimmedContent)) {
            return;
        }

        setContent("");
    };

    return (
        <main className="mx-auto flex min-h-[calc(100vh-70px)] w-full max-w-[880px] items-center px-4 py-7 sm:px-6">
            <section className="flex min-h-[calc(100vh-126px)] w-full flex-col overflow-hidden rounded-[20px] border border-[#1E2939] bg-[#101828]">
                <header className="flex h-[70px] shrink-0 items-center justify-between border-b border-[#253046] px-5 sm:px-6">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/chat"
                            aria-label="채팅 목록으로 돌아가기"
                            className="text-[#99A1AF] text-[25px] hover:text-white"
                        >
                            ⭠
                        </Link>

                        <div className="h-10 w-10 overflow-hidden rounded-full border border-[#364153] bg-[#101828]">
                            <img
                                src={partnerProfileImageUrl || HeaderProfile}
                                alt={`${partnerName} 프로필`}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <p className="text-[15px] font-bold text-white sm:text-base">
                            {partnerName}
                        </p>
                    </div>

                    <ChatRoomMenu
                        chatRoomId={chatRoomId}
                        reportMessageId={reportMessageId}
                        partnerName={partnerName}
                    />
                </header>

                <div className="flex flex-1 flex-col overflow-y-auto px-5 py-6 sm:px-10">
                    {hasMessages ? (
                        <div className="flex flex-col gap-4">
                            {chatMessages.map((message) => {
                                const isMyMessage = message.senderId === currentUserId;

                                return (
                                    <div
                                        key={message.messageId}
                                        className={`flex max-w-[85%] items-end gap-2 ${
                                            isMyMessage ? "ml-auto flex-row-reverse" : ""
                                        }`}
                                    >
                                        {!isMyMessage && (
                                            <div className="mb-5 h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#364153] bg-[#101828]">
                                                <img
                                                    src={partnerProfileImageUrl || HeaderProfile}
                                                    alt={`${partnerName} 프로필`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <p
                                                className={`rounded-2xl px-4 py-3 text-sm ${
                                                    isMyMessage
                                                        ? "rounded-br-md bg-[#BFFF0B] text-black font-bold"
                                                        : "rounded-bl-md bg-[#1E2939] text-white"
                                                }`}
                                            >
                                                {message.content}
                                            </p>
                                            <p
                                                className={`mt-1 text-xs text-[#6A7282] ${
                                                    isMyMessage ? "text-right" : ""
                                                }`}
                                            >
                                                {isMyMessage && `${message.read ? "읽음" : "전송됨"} · `}
                                                {(message.createdAt).split("T")[0]}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="m-auto flex flex-col items-center text-center">
                            <div className="relative mb-7 h-20 w-20 rounded-full border-[4px] border-[#3A455B]">
                                <div className="absolute bottom-[-6px] right-[-9px] flex h-7 w-7 items-center justify-center rounded-full bg-[#BFFF0B]">
                                    <Image src={chat} alt="채팅" width={15} height={15} />
                                </div>
                            </div>

                            <h1 className="text-xl font-bold text-white">
                                {partnerName}
                            </h1>
                            <p className="mt-2 text-sm text-[#99A1AF]">
                                아직 주고받은 메시지가 없어요.
                            </p>
                            <p className="mt-2 text-xs text-[#6A7282]">
                                먼저 말을 걸어보세요!
                            </p>
                        </div>
                    )}
                </div>

                {connectionError && (
                    <p className="px-5 pb-2 text-center text-xs text-[#FB7185]">
                        {connectionError}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-3 px-4 pb-4 sm:px-5 sm:pb-5">
                    <input
                        type="text"
                        placeholder={`${partnerName}에게 메시지 보내기...`}
                        aria-label="메시지 입력"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        maxLength={2000}
                        disabled={!isConnected}
                        className="h-11 min-w-0 flex-1 rounded-[15px] border border-[#364153] bg-[#0F172A] px-4 text-sm text-white outline-none placeholder:text-[#6A7282] focus:border-[#65748B]"
                    />
                    <button
                        type="submit"
                        aria-label="메시지 전송"
                        disabled={!isConnected || !content.trim()}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#BFFF0B] hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <Image src={ChatSendButton} alt="채팅 보내기 버튼" width={20} height={15} />
                    </button>
                </form>
            </section>
        </main>
    );
}
