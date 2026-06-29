'use client'

import UserProfile from "@/feature/common/Profile";
import { getHeaderUserAction } from "@/feature/auth/action";
import { Alarm } from "../ui/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
// import AlarmSocket from "@/feature/alarm/components/AlarmSocket";

type HeaderUser = Awaited<ReturnType<typeof getHeaderUserAction>>;

export default function HeaderAuthArea() {
    const pathname = usePathname();
    const [user, setUser] = useState<HeaderUser>(null);
    const [isLoading, setIsLoading] = useState(true);

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
        }

        getHeaderUser();
        window.addEventListener('auth-changed', getHeaderUser);

        return () => {
            ignore = true;
            window.removeEventListener('auth-changed', getHeaderUser);
        }
    }, [pathname]);

    return (
        <div className="flex gap-5 items-center justify-end">
            {/* {user && <AlarmSocket />} */}
            {user?.role === 'ADMIN' && (
                <Link href="/admin/approvals/organizations?page=1">
                    <button className="text-[#BFFF0B] border-[#BFFF0B] border px-4 py-2 rounded-[10px] text-[14px] font-extrabold bg-black cursor-pointer"> 관리자 </button>
                </Link>
            )}
            <Link href="/alarm">
                <div className="relative">
                    <img src={Alarm} alt="알림" />
                    <div className="absolute left-2 font-extrabold text-[10px] top-[-4] size-4 flex items-center justify-center bg-[#BFFF0B] text-black rounded-full"> 5 </div>
                </div>
            </Link>
            {isLoading ? (
                <div className="w-17 h-9" />
            ) : user ? (
                <UserProfile />
            ) : (
                <Link href="/auth/login">
                    <button className="bg-[#BFFF0B] px-4 py-2 rounded-[10px] text-[14px] font-extrabold text-black cursor-pointer"> 로그인</button>
                </Link>
            )}
        </div>
    );
}
