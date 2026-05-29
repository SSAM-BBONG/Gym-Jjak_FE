'use server'

import axios from "axios";
import { cookies } from "next/headers";

export const refreshGet = async () => {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';
    try {
        console.log('1');
        const res = await axios.post(`${base_url}/api/token/reissue`,
            {},
            { withCredentials: true })
        console.log('2');

        const cookieStore = await cookies();
        cookieStore.set('accessToken', res.data.data.accessToken, {
            httpOnly: true,   // 자바스크립트 접근 불가(xss 방지)
            maxAge: 60 * 15,   // 15분
            path: '/'
        })

        return res.data.data.accessToken;
    } catch (error) {
        console.log(error);
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');

        return null;
    }
}
