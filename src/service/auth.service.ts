import { LoginRequest, onbordingRequest, MyOnboardingResponse, RegisterRequest } from "@/feature/auth/type";
import { axiosFetch } from "@/lib/api"
import { fetchWithAuth, fetchWithoutAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const login = async (user: LoginRequest) => {
    const response = await fetchWithoutAuth('/api/auth/login', {
        method: "POST",
        body: JSON.stringify(user)
    })

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '로그인에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response;
}

export const register = async (userInfo: RegisterRequest) => {
    const response = await fetchWithoutAuth('/api/auth/signup', {
        method: "POST",
        body: JSON.stringify(userInfo)
    })

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '회원가입에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const logout = async () => {
    const response = await fetchWithAuth('/api/auth/logout', {
        method: "POST",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '로그아웃에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const onboarding = async (onbordingInfo: onbordingRequest) => {
    const response = await fetchWithAuth('/api/onboarding/me', {
        method: "POST",
        body: JSON.stringify(onbordingInfo)
    })

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '온보딩 등록에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const getMyOnboarding = async () => {
    const response = await fetchWithAuth('/api/onboarding/me')

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '온보딩 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}
