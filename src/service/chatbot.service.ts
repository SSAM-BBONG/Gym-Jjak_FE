import type { ChatMessages, ChatSessions } from "@/feature/chatbot/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

interface ChatSessionListResponse {
    status: number;
    code: string;
    message: string;
    data: ChatSessions;
}

interface ChatMessageListResponse {
    status: number;
    code: string;
    message: string;
    data: ChatMessages;
}

export const getChatbotSessionList = async (cursor: string): Promise<ChatSessionListResponse> => {
    const params = new URLSearchParams();

    if (cursor) {
        params.set("cursor", cursor);
    }

    const response = await fetchWithAuth(`/api/chatbot/sessions?${params.toString()}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅 목록 조회에 실패하였습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const getChatbotMessageList = async (
    sessionId: string,
    cursor: string
): Promise<ChatMessageListResponse> => {
    const params = new URLSearchParams();

    if (cursor) {
        params.set("cursor", cursor);
    }
    const response = await fetchWithAuth(
        `/api/chatbot/sessions/${sessionId}/messages?${params.toString()}`
    );

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅방 메시지 조회에 실패하였습니다."
        );

        throw new Error(message);
    }

    return response.json();
};
