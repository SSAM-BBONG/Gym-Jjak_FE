'use server'

import { SignUpFormData } from "@/lib/registerSchema";
import { login, logout, onboarding, register } from "@/service/auth.service";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { onbordingRequest } from "./type";
import { decodeJWT } from "@/lib/decode";

interface ActionState {
    success: boolean;
    message?: string;
    errors?: Record<string, string>;
}

export const getHeaderUserAction = async () => {
    const user = await decodeJWT();

    if (!user?.sub) {
        return null;
    }

    return {
        sub: user.sub,
        username: user.username,
        role: user.role,
    }
}

export const loginAction = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    if (!username.trim() || !password.trim()) {
        return {
            success: false,
            message: '값을 입력해주세요'
        }
    }

    const payload = { username, password }

    let response
    try {
        response = await login(payload);
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

    const cookieStore = await cookies();

    cookieStore.set('accessToken', response.data.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 1,
        path: '/'
    });

    //백에서 보낸 쿠키 헤더 가져오기
    const setCookieHeader = response.headers['set-cookie'];

    // console.log(setCookieHeader)
    // [
    //     'refreshToken=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxOSIsInVzZXJuYW1lIjoic2lldW5AdGVzdC5jb20iLCJpYXQiOjE3ODAxMTA2MzAsImV4cCI6MTc4MTMyMDIzMH0.6wPwgV2PnS8nhq6qyKyrr022gbAyp-cjMH5cHdwNMPU; Path=/; Max-Age=1209600; Expires=Sat, 13 Jun 2026 03:10:31 GMT; HttpOnly; SameSite=Lax'
    // ]

    //쿠키에서 토큰 찾아서 넣는 부분
    if (setCookieHeader) {
        const refreshToken = setCookieHeader.find((cookie) => cookie.startsWith('refreshToken='));

        const refreshValue = refreshToken?.split(';')[0].replace('refreshToken=', '');

        if (refreshValue) {
            cookieStore.set('refreshToken', refreshValue, {
                httpOnly: true,
                maxAge: 60 * 60 * 3,
                path: '/'
            });
        }

    }


    if (response.data.data.onboardingCompleted) {
        redirect('/');
    } else {
        redirect('/auth/onboarding?page=1');
    }
}

export const registerAction = async (payload: SignUpFormData): Promise<ActionState> => {
    const { username, password, name, nickname, phone } = payload;

    try {
        await register({ username, password, name, nickname, phone });
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

    return {
        success: true,
        message: '회원가입 성공'
    }

}

export const logoutAction = async () => {
    try {
        await logout();
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }
        return {
            success: false,
            message: errorMessage
        }
    }
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
}


export const onboardingAction = async (payload: onbordingRequest): Promise<ActionState> => {
    try {
        await onboarding(payload);
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }
        return {
            success: false,
            message: errorMessage
        }
    }
    redirect('/');
}

