'use client'

import { GoogleLogo, NaverLogo } from "@/components/ui/image";
import { getSocial } from "@/service/auth.service";

export default function SocialButton({ social }: { social: 'naver' | 'google' }) {

    const rediectSocial = async () => {
        await getSocial(social);
    }

    return (
        <button onClick={rediectSocial} className="w-15 h-15 rounded-full"><img src={social === 'naver' ? NaverLogo : GoogleLogo} /></button>
    );
}