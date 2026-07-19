'use server'

import { closeChatRoom, getChatRooms } from "@/service/chat.service";
import { redirect } from "next/navigation";

export const getChatRoomsAction = async () => {
    try {
        const response = await getChatRooms();

        return {
            success: true,
            data: response.data,
            message: response.message,
        };
    } catch (error) {
        let errorMessage = "채팅방 목록을 불러오지 못했습니다.";

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            data: null,
            message: errorMessage,
        };
    }
};

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
