'use server'

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"
import { cache } from "react";
import { refreshGet } from "./stateError";

export interface MyTokenPayload {
    sub: string;
    username: string;
    role: string;
    iat: number; //발급시간
    exp: number; //만료 시간
}

const defaultUserInfo = {
    sub: '',
    username: '',
    role: '',
    iat: 0,
    exp: 0
}

export const decodeJWT = cache(async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return defaultUserInfo
    }
    if (refreshToken && !token) {
        try {
            console.log("토큰 만료됨, 재발급 시작(디코더)");
            const newToken = await refreshGet();

            if (!newToken) return defaultUserInfo
            console.log('발급 성공(디코더)')
            return jwtDecode<MyTokenPayload>(newToken);
        } catch (error) {
            return defaultUserInfo
        }
    }
    if (refreshToken && token) {
        const decoded = jwtDecode<MyTokenPayload>(token);

        if (Date.now() >= decoded.exp * 1000) {
            const newToken = await refreshGet();
            if (!newToken) return defaultUserInfo;
            return jwtDecode<MyTokenPayload>(newToken);
        }

        return decoded;
    }

})
