'use server'

import { axiosFetch } from "@/lib/api";
import { SignUpFormData } from "@/lib/registerSchema";
import { login, logout, register } from "@/service/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ActionState {
    success: boolean;
    message?: string;
    errors?: Record<string, string>;
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
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown Error'
        }
    }

    const cookieStore = await cookies();

    cookieStore.set('accessToken', response.data.data.accessToken, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: '/'
    });

    // redirect('/');

    return {
        success: true,
        message: '로그인 성공'
    }
}

export const registerAction = async (payload: SignUpFormData): Promise<ActionState> => {
    const { username, password, passwordCheck, name, nickname, phone } = payload;


    if (!username.trim() || !password.trim() || !passwordCheck.trim() || !name.trim() || !nickname.trim() || !phone.trim()) {
        return {
            success: false,
            message: '값을 입력해주세요'
        }
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{}|;':",./<>?~`]).+$/;
    if (password.length < 8 || password.length > 16) {
        return {
            success: false,
            message: '비밀번호는 8자 이상 16자 이하여야 합니다.'
        }
    }
    if (!passwordRegex.test(password)) {
        return {
            success: false,
            message: '비밀번호는 영어, 숫자, 특수문자가 하나씩 포함되어야 합니다.'
        }
    }
    if (password !== passwordCheck) {
        return {
            success: false,
            message: '비밀번호가 일치하지 않습니다.'
        }
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(username)) {
        return {
            success: false,
            message: '이메일 형식이 맞지 않습니다.'
        }
    }
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/
    if (!phoneRegex.test(phone)) {
        return {
            success: false,
            message: '전화번호 형식이 맞지 않습니다.'
        }
    }



    try {
        // await axiosFetch.post('/api/auth/signup', { username, password, name, nickname, phone })
        // await axios.post('http://localhost:8081/api/auth/signup', { username, password, name, nickname, phone });
        await register({ username, password, name, nickname, phone });
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Unknown Error'
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
    } catch(error) {
    }
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');

    redirect('/');
}