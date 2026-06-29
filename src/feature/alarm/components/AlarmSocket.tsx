"use client";

import { useAlarmSocket } from "@/components/hooks/useAlarmSocket";


export default function AlarmSocket() {
    useAlarmSocket({
        enabled: true,

        onNotification: (alarm) => {
            console.log("새 알림:", alarm);
        },

        onError: (error) => {
            console.error("알림 오류:", error);
        },
    });

    return null;
}