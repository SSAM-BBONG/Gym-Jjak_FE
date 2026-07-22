'use server'

import {
    closeChatRoom,
    createChatRoom,
    createChatMessageReport,
    getChatMessageList,
    getChatRoomList,
    getChatRoomUnreadCount,
} from "@/service/chat.service";
import type {
    ChatMessageReportReason,
    ChatRoomCreateRequest,
} from "@/feature/chat/type";
import { redirect } from "next/navigation";

export const closeChatRoomAction = async (chatRoomId: number) => {
    try {
        await closeChatRoom(chatRoomId);
    } catch (error) {
        let errorMessage = "채팅방 나가기에 실패하였습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }

    redirect("/chat");
};

export const createChatRoomAction = async (payload: ChatRoomCreateRequest) => {
    try {
        const response = await createChatRoom(payload);

        return {
            success: true as const,
            data: response.data,
        };
    } catch (error) {
        let errorMessage = "채팅방 생성에 실패하였습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false as const,
            message: errorMessage,
        };
    }
};

export const createChatMessageReportAction = async (
    messageId: number,
    reason: ChatMessageReportReason
) => {
    try {
        await createChatMessageReport(messageId, reason);

        return {
            success: true,
            message: "신고가 접수되었습니다.",
        };
    } catch (error) {
        let errorMessage = "채팅 메시지 신고에 실패하였습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const getChatRoomUnreadCountAction = async () => {
    try {
        return await getChatRoomUnreadCount();
    } catch (error) {
        let errorMessage = "안 읽은 메시지 수 조회에 실패하였습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const getChatRoomListAction = async () => {
    try {
        return await getChatRoomList();
    } catch (error) {
        let errorMessage = "채팅방 목록 조회에 실패하였습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const getChatMessageListAction = async (
    chatRoomId: number,
    cursor?: number,
    size?: number
) => {
    try {
        return await getChatMessageList(chatRoomId, cursor, size);
    } catch (error) {
        let errorMessage = "채팅 메시지 조회에 실패하였습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};
