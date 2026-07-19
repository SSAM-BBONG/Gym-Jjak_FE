export interface ChatRoomListResponse {
    status: number;
    code: string;
    message: string;
    data: ChatRoomListData;
}

export interface ChatRoomListData {
    totalCount: number;
    totalUnreadCount: number;
    chatRooms: ChatRoomData[];
}

export interface ChatRoomData {
    chatRoomId: number;
    partnerName: string;
    partnerRole: "USER" | "TRAINER";
    partnerProfileImageUrl: string | null;
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
}

export interface ChatMessageData {
    messageId: number;
    chatRoomId: number;
    senderId: number;
    content: string;
    read: boolean;
    createdAt: string;
}

export interface WebSocketChatError {
    timestamp: string;
    code: string;
    message: string;
}
