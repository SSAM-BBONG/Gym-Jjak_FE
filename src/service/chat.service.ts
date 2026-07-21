import type { ChatRoomListResponse } from "@/feature/chat/type";
import { fetchWithAuth } from "@/lib/feth";
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

export const closeChatRoom = async (chatRoomId: number): Promise<void> => {
    const response = await fetchWithAuth(`/api/chat/rooms/${chatRoomId}/close`, {
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
