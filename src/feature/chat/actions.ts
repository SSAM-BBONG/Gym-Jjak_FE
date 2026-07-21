'use server'

import { closeChatRoom, getChatRoomList } from "@/service/chat.service";
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
