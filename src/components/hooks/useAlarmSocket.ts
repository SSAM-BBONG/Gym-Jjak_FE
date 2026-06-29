"use client";

import { Alarm, WebSocketAlarmError } from "@/feature/alarm/type";
import { Client, IMessage } from "@stomp/stompjs";
import { useEffect, useRef } from "react";


interface UseAlarmSocketProps {
    enabled: boolean;
    onNotification: (alarm: Alarm) => void;
    onError?: (error: WebSocketAlarmError) => void;
}

export function useAlarmSocket({
    enabled,
    onNotification,
    onError,
}: UseAlarmSocketProps) {
    const notificationHandler = useRef(onNotification);
    const errorHandler = useRef(onError);

    useEffect(() => {
        notificationHandler.current = onNotification;
        errorHandler.current = onError;
    }, [onNotification, onError]);

    useEffect(() => {
        if (!enabled) return;

        const httpUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        if (!httpUrl) {
            console.error("url이 없습니다");
            return;
        }

        const websocketUrl = `${httpUrl.replace(/^http/, "ws")}/ws`;

        const client = new Client({
            brokerURL: websocketUrl,

            // 연결이 끊어지면 5초 후 재연결
            reconnectDelay: 5000,

            heartbeatIncoming: 10000,
            heartbeatOutgoing: 10000,

            onConnect: () => {
                client.subscribe(
                    "/user/queue/notifications",
                    (message: IMessage) => {
                        const notification = JSON.parse(
                            message.body,
                        ) as Alarm;

                        notificationHandler.current(notification);
                    },
                );

                client.subscribe("/user/queue/errors", (message: IMessage) => {
                    const error = JSON.parse(message.body) as WebSocketAlarmError;
                    errorHandler.current?.(error);
                });
            },

            onStompError: (frame) => {
                console.error("STOMP 오류:", frame.headers.message, frame.body);
            },

            onWebSocketError: (event) => {
                console.error("WebSocket 연결 오류:", event);
            },
        });

        client.activate();

        return () => {
            void client.deactivate();
        };
    }, [enabled]);
}