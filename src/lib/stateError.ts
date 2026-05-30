'use server'

import axios from "axios";
import { cookies } from "next/headers";

export const refreshGet = async () => {
    const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';
    try {
        const cookieStore = await cookies();

        const refreshToken = cookieStore.get('refreshToken')?.value
        const res = await axios.post(
            `${base_url}/api/token/reissue`,
            {},
            {
                headers: {
                    Cookie: `refreshToken=${refreshToken}`
                }
            }
        );

        cookieStore.set('accessToken', res.data.data.accessToken, {
            httpOnly: true,   // 자바스크립트 접근 불가(xss 방지)
            maxAge: 60 * 15,   // 15분
            path: '/'
        })

        const setCookieHeader = res.headers['set-cookie'];

        if (setCookieHeader) {
            const newRefreshToken = setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='));
            const newRefreshValue = newRefreshToken?.split(';')[0].replace('refreshToken=', '');

            if (newRefreshValue) {
                cookieStore.set('refreshToken', newRefreshValue, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 3,
                    path: '/'
                });
            }
        }

        return res.data.data.accessToken;
    } catch (error) {
        console.log(error);
        const cookieStore = await cookies();
        cookieStore.delete('accessToken');

        return null;
    }
}
