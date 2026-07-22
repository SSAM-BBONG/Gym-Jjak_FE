"use client";

import { getChatRoomListAction } from "@/feature/chat/actions";
import type { ChatMessageData } from "@/feature/chat/type";
import { Client, type IMessage } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";
import { useEffect } from "react";

interface UseChatRoomListSocketProps {
    enabled: boolean;
    refreshKey: string;
}

export function useChatRoomListSocket({
    enabled,
    refreshKey,
}: UseChatRoomListSocketProps) {
    const router = useRouter();

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiBaseUrl) {
            return;
        }

        let isUnmounting = false;
        let client: Client | null = null;

        const connect = async () => {
            try {
                const response = await getChatRoomListAction();

                if (isUnmounting) {
                    return;
                }

                client = new Client({
                    webSocketFactory: () => new SockJS(`${apiBaseUrl.replace(/\/$/, "")}/ws`),
                    reconnectDelay: 5000,
                    onConnect: () => {
                        response.data.chatRooms.forEach(({ chatRoomId }) => {
                            client?.subscribe(
                                `/topic/chat.room.${chatRoomId}`,
                                (frame: IMessage) => {
                                    try {
                                        const message = JSON.parse(frame.body) as ChatMessageData;
                                        window.dispatchEvent(
                                            new CustomEvent<ChatMessageData>("chat-message", {
                                                detail: message,
                                            })
                                        );
                                        router.refresh();
                                    } catch (error) {
                                        console.error("채팅 목록 메시지 파싱 실패:", frame.body, error);
                                    }
                                }
                            );
                        });
                    },
                    onStompError: (frame) => {
                        console.error("채팅 목록 STOMP 오류:", frame.headers.message);
                    },
                });

                client.activate();
            } catch (error) {
                console.error("채팅 목록 실시간 연결 준비 실패:", error);
            }
        };

        void connect();

        return () => {
            isUnmounting = true;
            void client?.deactivate();
        };
    }, [enabled, refreshKey, router]);
}
