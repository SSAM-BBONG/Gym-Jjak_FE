'use server'

import { SignUpFormData } from "@/lib/registerSchema";
import { editMyOnboarding, getTemporaryPw, login, logout, onboarding, register } from "@/service/auth.service";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginResponse, onbordingRequest } from "./type";
import { decodeJWT } from "@/lib/decode";
import { ReissueResponse } from "@/lib/refreshType";
import { OnboardingType } from "@/lib/onboardingSchema";

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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

    const resData = (await response.json()) as LoginResponse;

    const cookieStore = await cookies();

    cookieStore.set('accessToken', resData.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: '/'
    });

    //백에서 보낸 쿠키 헤더 가져오기
    const setCookieHeaders: string[] =
        response.headers.getSetCookie?.() ?? [];


    const newRefreshToken = setCookieHeaders.find((cookie) => cookie.startsWith("refreshToken="))
    const newRefreshValue = newRefreshToken?.split(';')[0].replace('refreshToken=', '');

    if (newRefreshValue) {
        cookieStore.set('refreshToken', newRefreshValue, {
            httpOnly: true,
            maxAge: 60 * 60 * 3,
            path: '/'
        });
    }


    if (resData.data.onboardingCompleted) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }
    redirect('/');
}

export const onboardingEditAction = async (payload: OnboardingType): Promise<ActionState> => {
    try {
        await editMyOnboarding(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }
    redirect('/mypage/onboarding');

}

export const temporaryPwAction = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
    const username = formData.get('username') as string;
    const payload = { username }
    try {
        const response = await getTemporaryPw(payload);

        return {
            success: true,
            message: response.message || '임시 비밀번호가 발급'
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }
}
