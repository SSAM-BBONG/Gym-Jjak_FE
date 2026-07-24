"use client";

import { useAlarmSocket } from "@/components/hooks/useAlarmSocket";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Alarm } from "../type";

interface AlarmSocketProps {
  enabled: boolean;
}

export default function AlarmSocket({ enabled }: AlarmSocketProps) {
  const [alarm, setAlarm] = useState<Alarm | null>(null);
  const router = useRouter();

  useAlarmSocket({
    enabled,
    maxReconnectAttempts: 5,
    reconnectDelay: 5000,

    onNotification: (alarm) => {
      setAlarm(alarm);
    },

    onError: (error) => {
      console.error("알림 오류:", error);
    },
  });

  useEffect(() => {
    if (!enabled) {
      setAlarm(null);
    }
  }, [enabled]);

  useEffect(() => {
    if (!alarm) return;

    const timer = setTimeout(() => {
      setAlarm(null);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [alarm]);

  if (!alarm) {
    return null;
  }

  const isTrainerReportAlarm = alarm.type === "TRAINER_REPORT_CREATED";

  return (
    <div>
      <div
        onClick={isTrainerReportAlarm ? undefined : () => {
          router.push("/alarm");
          setAlarm(null);
        }}
        className={`fixed top-22 left-1/2 z-[10000] flex h-8 w-50 -translate-x-1/2 items-center justify-center rounded-full border border-[#BFFF0B66] bg-[#BFFF0B40] text-sm font-semibold text-[#000000] shadow-[0_0_8px_2px_rgba(191,255,11,0.5)] ${isTrainerReportAlarm ? "" : "cursor-pointer"}`}
      >
        {alarm.title}
      </div>
    </div>
  );
}