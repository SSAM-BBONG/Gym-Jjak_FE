"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BrowserNotificationEnableButtonProps {
  enabled: boolean;
}

export default function BrowserNotificationEnableButton({
  enabled,
}: BrowserNotificationEnableButtonProps) {
  const [permission, setPermission] =
    useState<NotificationPermission | "unsupported" | null>(null);

  useEffect(() => {
    if (!("Notification" in window)) {
      setPermission("unsupported");
      return;
    }

    setPermission(Notification.permission);
  }, []);

  const handleEnableBrowserNotification = async () => {
    if (!("Notification" in window)) {
      toast.error("이 브라우저는 시스템 알림을 지원하지 않습니다.");
      return;
    }

    const nextPermission = await Notification.requestPermission();
    setPermission(nextPermission);

    if (nextPermission === "granted") {
      toast.success("브라우저 알림이 활성화되었습니다.");
      return;
    }

    toast.error("브라우저 알림 권한이 허용되지 않았습니다.");
  };

  if (!enabled || permission !== "default") {
    return null;
  }

  return (
    <button
      type="button"
      onClick={handleEnableBrowserNotification}
      className="cursor-pointer whitespace-nowrap rounded-md border border-[#BFFF0B] px-2 py-1 text-xs font-bold text-[#BFFF0B]"
    >
      알림 켜기
    </button>
  );
}
