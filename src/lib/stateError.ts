'use server'

import axios from "axios";
import { cookies } from "next/headers";

export const refreshGet = async () => {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

    const res = await axios.post(`${base_url}/api/users/token/reissue`)
    const cookieStore = await cookies();
    cookieStore.set('accessToken', res.data.accessToken, {
        httpOnly: true,   // 자바스크립트 접근 불가(xss 방지)
        maxAge: 60 * 60,   // 1시간
        path: '/'
    })
}

export const accessDenied = () => {
    // redirect('/accessdenied');
}