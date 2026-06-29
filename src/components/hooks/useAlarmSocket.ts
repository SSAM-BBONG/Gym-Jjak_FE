// "use client";

// import type { Alarm, WebSocketAlarmError } from "@/feature/alarm/type";
// import { Client, type IMessage } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import { useEffect, useRef } from "react";

// interface UseAlarmSocketProps {
//     enabled: boolean;
//     onNotification: (alarm: Alarm) => void;
//     onError?: (error: WebSocketAlarmError) => void;
// }

// // SockJS: 백엔드 /ws와 실제 연결 담당   통신 통로
// // STOMP: 연결 위에서 구독 주소와 메시지 구조 관리     통로에서 메시지를 주고받는 규칙
// // IMessage: STOMP로 받은 메시지 타입

// export function useAlarmSocket({
//     enabled,
//     onNotification,
//     onError,
// }: UseAlarmSocketProps) {
//     const notificationHandler = useRef(onNotification);
//     const errorHandler = useRef(onError);

//     // WebSocket을 재연결하지 않고 최신 콜백으로 교체
//     useEffect(() => {
//         notificationHandler.current = onNotification;
//         errorHandler.current = onError;
//     }, [onNotification, onError]);

//     useEffect(() => {
//         if (!enabled) return;

//         const httpUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

//         if (!httpUrl) {
//             console.error("NEXT_PUBLIC_API_BASE_URL이 없습니다.");
//             return;
//         }

//         // SockJS는 ws://가 아닌 http:// 주소를 전달
//         const socketUrl = `${httpUrl.replace(/\/$/, "")}/ws`;

//         const client = new Client({
//             // 재연결할 때마다 새로운 SockJS 연결 객체가 생성됨
//             // HttpOnly 쿠키는 프론트 코드에서 직접 넣지 x 브라우저의 쿠키 도메인과 SameSite 조건이 맞으면 SockJS 연결 요청에 자동으로 포함
//             webSocketFactory: () => new SockJS(socketUrl),

//             // 연결이 끊기면 5초 후 재연결
//             reconnectDelay: 5000,

//             // 연결 상태 확인
//             heartbeatIncoming: 10000, //서버 신호 확인
//             heartbeatOutgoing: 10000, //클라이언트 신호 전송

//             // 연결 제한 시간 10초동안 연결되지 않으면 reconnectDelay 설정에 따라 다시 연결 시도
//             connectionTimeout: 10000,

//             //연결 성공
//             onConnect: () => {
//                 // 실시간 알림 구독
//                 client.subscribe(
//                     "/user/queue/notifications",
//                     (message: IMessage) => {
//                         try {
//                             const alarm = JSON.parse(message.body) as Alarm;
//                             notificationHandler.current(alarm);
//                         } catch (error) {
//                             console.error(
//                                 "알림 메시지 파싱 실패:",
//                                 message.body,
//                                 error,
//                             );
//                         }
//                     },
//                 );

//                 // 사용자별 에러 메시지 구독
//                 client.subscribe(
//                     "/user/queue/errors",
//                     (message: IMessage) => {
//                         try {
//                             const socketError = JSON.parse(message.body) as WebSocketAlarmError;
//                             errorHandler.current?.(socketError);
//                         } catch (error) {
//                             console.error(
//                                 "에러 메시지 파싱 실패:",
//                                 message.body,
//                                 error,
//                             );
//                         }
//                     },
//                 );
//             },

//             // STOMP 서버가 ERROR 프레임을 보낸 경우
//             onStompError: (frame) => {
//                 console.error("STOMP 오류:", {
//                     message: frame.headers.message,
//                     body: frame.body,
//                 });
//             },

//             // WebSocket 연결 자체가 실패한 경우
//             onWebSocketError: (event) => {
//                 console.error("WebSocket 연결 오류:", {
//                     type: event.type,
//                 });
//             },

//             // WebSocket 연결이 종료된 경우
//             onWebSocketClose: (event) => {
//                 console.warn("WebSocket 연결 종료:", {
//                     code: event.code,
//                     reason: event.reason,
//                     wasClean: event.wasClean,
//                 });
//             },
//         });

//         client.activate();

//         return () => {
//             void client.deactivate();
//         };
//     }, [enabled]);
// }