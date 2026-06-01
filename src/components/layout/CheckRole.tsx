'use client'

import { getHeaderUserAction } from "@/feature/auth/action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckRole({ mode }: { mode: 'login' | 'nopermission' }) {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        let ignore = false;

        const getHeaderUser = async () => {
            try {
                const result = await getHeaderUserAction();
                if (!ignore) {
                    if (mode === 'login') {
                        if (!result?.role) {
                            router.push('/auth/login');
                        }
                    } else {
                        if (result?.role === 'USER' || !result?.role) {
                            router.push('/nopermission');
                        }
                    }
                }
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        }

        getHeaderUser();

        return () => {
            ignore = true;
        }
    }, []);


    return (
        <div></div>
    );
}