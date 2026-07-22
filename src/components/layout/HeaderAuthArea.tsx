"use client";

import { getHeaderUserAction } from "@/feature/auth/action";
import UserProfile from "@/feature/common/Profile";
import AlarmSocket from "@/feature/alarm/components/AlarmSocket";
import { Alarm, chat } from "../ui/image";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MyTokenPayload } from "@/lib/decode";
import { AlarmUnreadCountData } from "@/feature/alarm/type";
import { ChatRoomUnreadCountData } from "@/feature/chat/type";
import { useChatRoomListSocket } from "@/components/hooks/useChatRoomListSocket";

interface HeaderAuthAreaProps {
  userInf?: MyTokenPayload
  notification?: AlarmUnreadCountData;
  chatCount?: ChatRoomUnreadCountData;
  
}

type HeaderUser = Awaited<ReturnType<typeof getHeaderUserAction>>;

const ALARM_SOCKET_DISABLED_PATHS = ["/alarm", "/admin"];

export default function HeaderAuthArea({ userInf, notification, chatCount }: HeaderAuthAreaProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<HeaderUser>(null);
  const [isLoading, setIsLoading] = useState(true);
  const unreadCount = notification?.unreadCount ?? 0;
  const unreadChat = chatCount?.totalUnreadCount ?? 0;
  

  const isAlarmSocketEnabled =
    Boolean(user) &&
    !ALARM_SOCKET_DISABLED_PATHS.some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );

  useChatRoomListSocket({
    enabled: Boolean(user),
    refreshKey: pathname,
  });

  useEffect(() => {
    let ignore = false;

    const getHeaderUser = async () => {
      setIsLoading(true);

      try {
        const result = await getHeaderUserAction();

        if (!ignore) {
          setUser(result);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    getHeaderUser();
    window.addEventListener("auth-changed", getHeaderUser);

    return () => {
      ignore = true;
      window.removeEventListener("auth-changed", getHeaderUser);
    };
  }, [pathname]);

  return (
    <div className="grid grid-cols-[20px_20px_80px] items-center justify-end gap-5 min-w-32">
      {user && <AlarmSocket enabled={isAlarmSocketEnabled} />}

      <Link href="/alarm">
        <div className="relative min-w-5">
          <div className="relative h-5 w-5">
            <Image
              src={Alarm}
              alt="알림"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          {unreadCount > 0 && (
            <div className="absolute top-[-4px] left-2 flex size-4 items-center justify-center rounded-full bg-[#BFFF0B] text-[10px] font-extrabold text-black">
              {unreadCount}
            </div>
          )}
        </div>
      </Link>

      <Link href="/chat">
        <div className="relative">
          <div className="relative h-5 w-5">
            <Image
              src={chat}
              alt="채팅"
              fill
              sizes="20px"
              className="object-cover"
            />
          </div>
          {unreadChat > 0 && (
            <div className="absolute top-[-4px] left-2 flex size-4 items-center justify-center rounded-full bg-[#BFFF0B] text-[10px] font-extrabold text-black">
              {unreadChat}
            </div>
          )}
        </div>
      </Link>

      {isLoading ? (
        <div className="h-9 w-17 min-w-5" />
      ) : user ? (
        <UserProfile 
          userInf={userInf}
        />
      ) : (
        <Link href="/auth/login">
          <button className="min-w-4 cursor-pointer rounded-[10px] bg-[#BFFF0B] px-4 py-2 text-[14px] font-extrabold text-black">
            로그인
          </button>
        </Link>
      )}
    </div>
  );
}
