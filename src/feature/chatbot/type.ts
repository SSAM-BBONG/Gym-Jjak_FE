export type ChatMessageRole = "USER" | "ASSISTANT";

export interface ChatSession {
    sessionId: string;
    title: string;
    lastMessage: string;
    lastActivityAt: string;
}

export interface ChatSessions {
    sessions: ChatSession[];
    nextCursor: string | null;
    hasNext: boolean;
}

export interface ChatRoutine {
    name: string;
}

export interface ChatSource {
    title: string;
}

export interface ChatMessage {
    messageId: number;
    role: ChatMessageRole;
    content: string;
    intentHint: string | null;
    category: string | null;
    routine: ChatRoutine | null;
    sources: ChatSource[];
    limited: boolean | null;
    createdAt: string;
}

export interface ChatMessages {
    messages: ChatMessage[];
    nextCursor: string | null;
    hasNext: boolean;
}

// 수정된 코드 시작
export interface ChatbotQuickReplyRequest {
    questionId: string;
    value: string;
}

export interface ChatbotQuickReply {
    questionId: string;
    label: string;
    value: string;
}
// 수정된 코드 끝

export interface ChatRequest {
    sessionId?: string;
    content: string;
    intentHint?: string;
    // 수정된 코드 시작
    quickReply?: ChatbotQuickReplyRequest | null;
    // 수정된 코드 끝
}

export interface ChatbotStartedEvent {
    type: "started";
    sessionId: string;
    requestId: string;
}

export interface ChatbotDeltaEvent {
    type: "delta";
    sessionId: string;
    requestId: string;
    text: string;
}

export interface ChatbotDoneEvent {
    type: "done";
    sessionId: string;
    requestId: string;
    answer: string;
    category: string | null;
    routine: string | null;
    sources: string | null;
    limited: boolean;
    // 수정된 코드 시작
    quickReplies: ChatbotQuickReply[];
    // 수정된 코드 끝
}

export interface ChatbotErrorEvent {
    type: "error";
    sessionId: string | null;
    requestId: string | null;
    code: string;
    message: string;
    retryable: boolean;
}

export type ChatbotSocketEvent =
    | ChatbotStartedEvent
    | ChatbotDeltaEvent
    | ChatbotDoneEvent
    | ChatbotErrorEvent;
