import type {
    ChatRoomCreateRequest,
    ChatRoomCreateResponse,
    ChatMessageReportReason,
    ChatMessageListResponse,
    ChatRoomListResponse,
    ChatRoomUnreadCountResponse,
} from "@/feature/chat/type";
import { fetchWithAuth, fetchWithAuthGet } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const getChatRoomList = async (): Promise<ChatRoomListResponse> => {
    const response = await fetchWithAuth("/api/chat/rooms");

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅방 목록 조회에 실패하였습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const createChatRoom = async (
    payload: ChatRoomCreateRequest
): Promise<ChatRoomCreateResponse> => {
    const response = await fetchWithAuth("/api/chat/rooms", {
        method: "POST",
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅방 생성에 실패하였습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const getChatMessageList = async (
    chatRoomId: number,
    cursor?: number,
    size?: number
): Promise<ChatMessageListResponse> => {
    const searchParams = new URLSearchParams();

    if (cursor !== undefined) {
        searchParams.set("cursor", String(cursor));
    }

    if (size !== undefined) {
        searchParams.set("size", String(size));
    }

    const query = searchParams.size ? `?${searchParams.toString()}` : "";
    const response = await fetchWithAuth(
        `/api/chat/rooms/${chatRoomId}/messages${query}`
    );

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅 메시지 조회에 실패하였습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const getChatRoomUnreadCount = async (): Promise<ChatRoomUnreadCountResponse> => {
    const response = await fetchWithAuth("/api/chat/rooms/unread-count");

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "안 읽은 메시지 수 조회에 실패하였습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const closeChatRoom = async (chatRoomId: number): Promise<void> => {
    const response = await fetchWithAuth(`/api/chat/rooms/${chatRoomId}/leave`, {
        method: "PATCH",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅방 나가기에 실패하였습니다."
        );

        throw new Error(message);
    }
};

export const createChatMessageReport = async (
    messageId: number,
    reason: ChatMessageReportReason
): Promise<void> => {
    const response = await fetchWithAuth(`/api/chat/messages/${messageId}/reports`, {
        method: "POST",
        body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "채팅 메시지 신고에 실패하였습니다."
        );

        throw new Error(message);
    }
};
