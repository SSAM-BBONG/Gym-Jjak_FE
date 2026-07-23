"use server";

import { getChatbotMessageList, getChatbotSessionList } from "@/service/chatbot.service";

export const getChatbotSessionListAction = async (cursor = "") => {
    try {
        const response = await getChatbotSessionList(cursor);
        return response;
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "채팅 목록 조회에 실패하였습니다."
        );
    }
};


export const getChatbotMessageListAction = async (sessionId: string, cursor = "") => {
    try {
        const response = await getChatbotMessageList(sessionId, cursor);
        return response;
    } catch (error) {
        throw new Error(
            error instanceof Error
                ? error.message
                : "채팅 메세지 목록 조회에 실패하였습니다."
        );
    }
};

