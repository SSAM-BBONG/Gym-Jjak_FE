"use client";

import { getChatRoomListAction } from "@/feature/chat/actions";
import type { ChatMessageData } from "@/feature/chat/type";
import { Client, type IMessage } from "@stomp/stompjs";
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";
import { useEffect } from "react";

const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_DELAY = 5000;

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
        const socketUrl = process.env.NODE_ENV === "production"
            ? `${window.location.origin}/ws`
            : `${apiBaseUrl?.replace(/\/$/, "")}/ws`;

        if (!apiBaseUrl && process.env.NODE_ENV !== "production") {
            return;
        }

        let isUnmounting = false;
        let reconnectAttempts = 0;
        let client: Client | null = null;

        const connect = async () => {
            try {
                const response = await getChatRoomListAction();

                if (isUnmounting) {
                    return;
                }

                client = new Client({
                    // 배포 환경에서는 현재 사이트 origin의 프록시를 경유해야
                    // accessToken 쿠키가 WebSocket 핸드셰이크에 함께 전달된다.
                    webSocketFactory: () => new SockJS(socketUrl),
                    reconnectDelay: RECONNECT_DELAY,
                    onConnect: () => {
                        reconnectAttempts = 0;
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
                    onWebSocketClose: (event) => {
                        if (isUnmounting) {
                            return;
                        }

                        reconnectAttempts += 1;

                        console.warn("채팅 목록 WebSocket 연결 종료:", {
                            code: event.code,
                            reason: event.reason,
                            wasClean: event.wasClean,
                            reconnectAttempts,
                            maxReconnectAttempts: MAX_RECONNECT_ATTEMPTS,
                        });

                        if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                            console.warn(
                                `채팅 목록 WebSocket 재연결을 ${MAX_RECONNECT_ATTEMPTS}회 시도했지만 실패하여 중단합니다.`,
                            );
                            void client?.deactivate({ force: true });
                        }
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
