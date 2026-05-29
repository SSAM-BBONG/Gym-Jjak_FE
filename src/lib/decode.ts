'use server'

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"
import { refreshGet } from "./stateError";

interface MyTokenPayload {
    sub: string;
    username: string;
    role: string;
    iat: number; //발급시간
    exp: number; //만료 시간
}

export const decodeJWT = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken');

    if (!token) {
        return {
            sub: '',
            username: '',
            role: '',
            iat: 0,
            exp: 0
        }
    }
    try {
        const decoded = jwtDecode<MyTokenPayload>(token.value);

        const expiryTime = decoded.exp * 1000;
        const currentTime = Date.now();

        if (currentTime >= expiryTime) {
            console.log("토큰 만료됨, 재발급 시작");
            const newToken = await refreshGet();

            if (!newToken) return {
                sub: '',
                username: '',
                role: '',
                iat: 0,
                exp: 0
            };

            return jwtDecode<MyTokenPayload>(newToken);
        }
        return decoded
    } catch (error) {
        return {
            sub: '',
            username: '',
            role: '',
            iat: 0,
            exp: 0
        }
    }
} 