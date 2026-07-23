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

export interface ChatRoomCreateRequest {
    ptCourseId: number;
    userId?: number | null;
}

export interface ChatRoomCreateResponse {
    status: number;
    code: string;
    message: string;
    data: ChatRoomCreateData;
}

export interface ChatRoomCreateData {
    chatRoomId: number;
}

export interface ChatRoomUnreadCountResponse {
    status: number;
    code: string;
    message: string;
    data: ChatRoomUnreadCountData;
}

export interface ChatRoomUnreadCountData {
    totalUnreadCount: number;
}

export interface ChatMessageData {
    messageId: number;
    chatRoomId: number;
    senderId: number;
    content: string;
    read: boolean;
    createdAt: string;
}

export interface ChatMessageListResponse {
    status: number;
    code: string;
    message: string;
    data: ChatMessageListData;
}

export interface ChatMessageListData {
    messages: ChatMessageHistoryData[];
    nextCursor: number;
    hasNext: boolean;
}

export interface ChatMessageHistoryData {
    messageId: number;
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

export type ChatMessageReportReason =
    | "ABUSE"
    | "AD"
    | "OBSCENE"
    | "FRAUD"
    | "FALSE_INFO";
