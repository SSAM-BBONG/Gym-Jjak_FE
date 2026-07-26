"use client";

import { useAlarmSocket } from "@/components/hooks/useAlarmSocket";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface AlarmSocketProps {
  enabled: boolean;
}

export default function AlarmSocket({ enabled }: AlarmSocketProps) {
  const router = useRouter();

  useAlarmSocket({
    enabled,
    maxReconnectAttempts: 5,
    reconnectDelay: 5000,

    onNotification: (alarm) => {
      const isTrainerReportAlarm = alarm.type === "TRAINER_REPORT_CREATED";

      toast(alarm.title, {
        description: alarm.content,
        duration: 5000,
        action: isTrainerReportAlarm
          ? undefined
          : {
              label: "알림 확인",
              onClick: () => router.push("/alarm"),
          },
      });

      if (
        "Notification" in window &&
        Notification.permission === "granted" &&
        document.visibilityState !== "visible"
      ) {
        const browserNotification = new Notification(alarm.title, {
          body: alarm.content,
          tag: `alarm-${alarm.notificationId}`,
        });

        browserNotification.onclick = () => {
          window.focus();
          router.push("/alarm");
          browserNotification.close();
        };
      }
    },

    onError: (error) => {
      console.error("알림 오류:", error);
    },
  });

  return null;
}
