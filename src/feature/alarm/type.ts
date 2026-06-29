export interface Alarm {
    notificationId: number;
    receiverId: number;
    type: string;
    category: string;
    categoryLabel: string;
    title: string;
    content: string;
    targetType: string;
    targetId: number;
    read: boolean;
    eventAt: string;
}


export interface WebSocketAlarmError {
    timestamp: string;
    code: string;
    message: string;
}