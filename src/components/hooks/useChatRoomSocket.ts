"use client";

import type { ChatMessageData, WebSocketChatError } from "@/feature/chat/type";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseChatRoomSocketProps {
    chatRoomId: number;
    onMessage: (message: ChatMessageData) => void;
    onError?: (error: WebSocketChatError) => void;
}

export function useChatRoomSocket({
    chatRoomId,
    onMessage,
    onError,
}: UseChatRoomSocketProps) {
    const clientRef = useRef<Client | null>(null);
    const messageHandlerRef = useRef(onMessage);
    const errorHandlerRef = useRef(onError);
    const [isConnected, setIsConnected] = useState(false);
    const [connectionError, setConnectionError] = useState<string | null>(null);

    useEffect(() => {
        messageHandlerRef.current = onMessage;
        errorHandlerRef.current = onError;
    }, [onError, onMessage]);

    useEffect(() => {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!apiBaseUrl) {
            setConnectionError("채팅 서버 주소가 설정되지 않았습니다.");
            return;
        }

        let isUnmounting = false;
        let reconnectAttempts = 0;
        const socketUrl = `${apiBaseUrl.replace(/\/$/, "")}/ws`;
        const client = new Client({
            webSocketFactory: () => new SockJS(socketUrl),
            reconnectDelay: 5000,
            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,
            connectionTimeout: 10000,
            onConnect: () => {
                reconnectAttempts = 0;
                setIsConnected(true);
                setConnectionError(null);

                client.subscribe(`/topic/chat.room.${chatRoomId}`, (frame: IMessage) => {
                    try {
                        messageHandlerRef.current(JSON.parse(frame.body) as ChatMessageData);
                    } catch (error) {
                        console.error("채팅 메시지 파싱 실패:", frame.body, error);
                    }
                });

                client.subscribe("/user/queue/errors", (frame: IMessage) => {
                    try {
                        const socketError = JSON.parse(frame.body) as WebSocketChatError;
                        setConnectionError(socketError.message);
                        errorHandlerRef.current?.(socketError);
                    } catch (error) {
                        console.error("채팅 웹소켓 에러 파싱 실패:", frame.body, error);
                    }
                });
            },
            onStompError: (frame) => {
                const message = frame.headers.message || "채팅 서버 연결에 실패했습니다.";
                setConnectionError(message);
                console.error("채팅 STOMP 오류:", { message, body: frame.body });
            },
            onWebSocketClose: () => {
                if (!isUnmounting) {
                    setIsConnected(false);
                    reconnectAttempts += 1;

                    if (reconnectAttempts >= 5) {
                        setConnectionError("채팅 서버 재연결에 실패했습니다.");
                        void client.deactivate({ force: true });
                    }
                }
            },
            onWebSocketError: () => {
                setConnectionError("채팅 서버와 연결할 수 없습니다.");
            },
        });

        clientRef.current = client;
        client.activate();

        return () => {
            isUnmounting = true;
            clientRef.current = null;
            setIsConnected(false);
            void client.deactivate();
        };
    }, [chatRoomId]);

    const sendMessage = useCallback((content: string) => {
        const client = clientRef.current;

        if (!client?.connected) {
            setConnectionError("채팅 서버 연결 후 메시지를 보낼 수 있습니다.");
            return false;
        }

        client.publish({
            destination: "/app/chat.send",
            body: JSON.stringify({ chatRoomId, content }),
        });

        return true;
    }, [chatRoomId]);

    return { isConnected, connectionError, sendMessage };
}
