"use client";

import { getHeaderUserAction } from "@/feature/auth/action";
import { getHeaderProfileAction } from "@/feature/mypage/actions";
import UserProfile from "@/feature/common/Profile";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MyTokenPayload } from "@/lib/decode";

interface AdminHeaderAuthAreaProps {
    userInf?: MyTokenPayload;
}

type HeaderUser = Awaited<ReturnType<typeof getHeaderUserAction>>;
type HeaderProfile = Awaited<ReturnType<typeof getHeaderProfileAction>>;

export default function AdminHeaderAuthArea({ userInf }: AdminHeaderAuthAreaProps) {
    const [user, setUser] = useState<HeaderUser>(null);
    const [profile, setProfile] = useState<HeaderProfile>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const getHeaderUser = async () => {
            setIsLoading(true);

            try {
                const result = await getHeaderUserAction();
                const profileResult = result ? await getHeaderProfileAction() : null;

                if (!ignore) {
                    setUser(result);
                    setProfile(profileResult);
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
    }, []);

    if (isLoading) {
        return <div className="h-9 w-17 min-w-5" />;
    }

    if (user) {
        return <UserProfile userInf={userInf} profile={profile} />;
    }

    return (
        <Link href="/auth/login">
            <button className="min-w-4 cursor-pointer rounded-[10px] bg-[#BFFF0B] px-4 py-2 text-[14px] font-extrabold text-black">
                로그인
            </button>
        </Link>
    );
}
