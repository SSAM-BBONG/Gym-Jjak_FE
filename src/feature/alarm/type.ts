export interface Alarm {
    notificationId: number;
    receiverId: number;
    type: 'TRAINER_APPLICATION_APPROVED' | 'TRAINER_APPLICATION_REJECTED' | 'ORGANIZATION_APPLICATION_APPROVED' | 'ORGANIZATION_APPLICATION_REJECTED' | 'PT_RESERVATION_REQUESTED' | 'PT_RESERVATION_APPROVED' | 'PT_RESERVATION_REJECTED' | 'PT_RESERVATION_CANCELED' | 'PT_REMINDER' | 'FEEDBACK_CREATED';
    category: string;
    categoryLabel: string;
    title: string;
    content: string;
    targetType: 'PT_RESERVATION' | 'FEEDBACK' | 'ORGANIZATION_APPLICATION' | 'TRAINER_APPLICATION';
    targetId: number;
    read: boolean;
    eventAt: string;
}

export interface WebSocketAlarmError {
    timestamp: string;
    code: string;
    message: string;
}

export interface AlarmUnreadCountResponse {
    status: number;
    code: string;
    message: string;
    data: AlarmUnreadCountData;
}

export interface AlarmUnreadCountData {
    unreadCount: number;
}
