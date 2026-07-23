'use client'

import type { ChatbotSocketEvent, ChatRequest } from '@/feature/chatbot/type';
import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';

const MAX_RECONNECT_ATTEMPTS = 5;

interface UseChatbotSocketOptions {
    onEvent: (event: ChatbotSocketEvent) => void;
}

export function useChatbotSocket({ onEvent }: UseChatbotSocketOptions) {

    const clientRef = useRef<Client | null>(null)
    const onEventRef = useRef(onEvent);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        onEventRef.current = onEvent;
    }, [onEvent]);

    useEffect(() => {

        let reconnectAttempts = 0;

        const connect = () => {
            const socketUrl = `${window.location.origin}/ws`;

            const client = new Client({
                webSocketFactory: () => new SockJS(socketUrl),
                reconnectDelay: 5000,

                onConnect: () => {
                    reconnectAttempts = 0;
                    setIsConnected(true);
                    console.log("챗봇 WebSocket 연결 성공");

                    client.subscribe("/user/queue/chatbot", (msg) => {
                        try {
                            const event = JSON.parse(msg.body) as ChatbotSocketEvent;
                            onEventRef.current(event);
                        } catch (error) {
                            console.error("챗봇 이벤트 파싱 실패:", error, msg.body);
                        }
                    });
                },

                onDisconnect: () => {
                    setIsConnected(false);
                },

                onWebSocketClose: () => {
                    setIsConnected(false);
                    reconnectAttempts += 1;

                    if (reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
                        console.warn(
                            `WebSocket 재연결을 ${MAX_RECONNECT_ATTEMPTS}회 시도했지만 실패하여 중단합니다.`,
                        );

                        void client.deactivate({ force: true });
                    }
                },

                onStompError: (frame) => {
                    console.error("STOMP 오류:", frame.headers.message);
                    console.error(frame.body);
                },

                onWebSocketError: (error) => {
                    console.error("WebSocket 오류:", error);
                },

                debug: (message) => {
                    console.log("[STOMP]", message);
                },
            });

            clientRef.current = client;
            client.activate();
        };
        void connect();

        return () => {
            if (clientRef.current) {
                void clientRef.current.deactivate();
                clientRef.current = null;
            }
        }
    }, [])

    const sendMessage = useCallback((request: ChatRequest) => {
        const client = clientRef.current;

        if (!client?.connected) {
            console.error("챗봇 WebSocket이 연결되지 않았습니다.");
            return false;
        }

        client.publish({
            destination: "/app/chatbot.send",
            body: JSON.stringify(request),
        });

        return true;
    }, []);

    return { sendMessage, isConnected };

}
