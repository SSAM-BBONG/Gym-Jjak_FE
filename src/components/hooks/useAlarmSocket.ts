"use client";

import type { Alarm, WebSocketAlarmError } from "@/feature/alarm/type";
import { Client, type IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useEffect, useRef } from "react";

interface UseAlarmSocketProps {
  enabled: boolean;
  onNotification: (alarm: Alarm) => void;
  onError?: (error: WebSocketAlarmError) => void;
  maxReconnectAttempts?: number;
  reconnectDelay?: number;
}

export function useAlarmSocket({
  enabled,
  onNotification,
  onError,
  maxReconnectAttempts = 5,
  reconnectDelay = 5000,
}: UseAlarmSocketProps) {
  const notificationHandler = useRef(onNotification);
  const errorHandler = useRef(onError);

  useEffect(() => {
    notificationHandler.current = onNotification;
    errorHandler.current = onError;
  }, [onNotification, onError]);

  useEffect(() => {
    if (!enabled) return;

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      console.error("NEXT_PUBLIC_API_BASE_URL이 없습니다.");
      return;
    }

    let reconnectAttempts = 0;
    let isUnmounting = false;

    const socketUrl = `${window.location.origin}/ws`;

    const client = new Client({
      webSocketFactory: () => new SockJS(socketUrl),

      reconnectDelay,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      connectionTimeout: 10000,

      onConnect: () => {
        reconnectAttempts = 0;

        client.subscribe("/user/queue/notifications", (message: IMessage) => {
          try {
            const alarm = JSON.parse(message.body) as Alarm;
            notificationHandler.current(alarm);
          } catch (error) {
            console.error("알림 메시지 파싱 실패:", message.body, error);
          }
        });

        client.subscribe("/user/queue/errors", (message: IMessage) => {
          try {
            const socketError = JSON.parse(message.body) as WebSocketAlarmError;
            errorHandler.current?.(socketError);
          } catch (error) {
            console.error("알림 에러 메시지 파싱 실패:", message.body, error);
          }
        });
      },

      onStompError: (frame) => {
        console.error("STOMP 오류:", {
          message: frame.headers.message,
          body: frame.body,
        });
      },

      onWebSocketError: (event) => {
        console.error("WebSocket 연결 오류:", {
          type: event.type,
        });
      },

      onWebSocketClose: (event) => {
        if (isUnmounting) return;

        reconnectAttempts += 1;

        console.warn("WebSocket 연결 종료:", {
          code: event.code,
          reason: event.reason,
          wasClean: event.wasClean,
          reconnectAttempts,
          maxReconnectAttempts,
        });

        if (reconnectAttempts >= maxReconnectAttempts) {
          console.warn(
            `WebSocket 재연결을 ${maxReconnectAttempts}회 시도했지만 실패하여 중단합니다.`,
          );

          void client.deactivate({ force: true });
        }
      },
    });

    client.activate();

    return () => {
      isUnmounting = true;
      void client.deactivate();
    };
  }, [enabled, maxReconnectAttempts, reconnectDelay]);
}