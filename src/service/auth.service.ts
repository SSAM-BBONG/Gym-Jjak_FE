import { LoginRequest, onbordingRequest, RegisterRequest } from "@/feature/auth/type";
import { axiosFetch } from "@/lib/api"
import { fetchWithoutAuth } from "@/lib/feth";

export const login = async (user: LoginRequest) => {
    const response = await fetchWithoutAuth('/api/auth/login', {
        method: "POST",
        body: JSON.stringify(user)
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '로그인에 실패하였습니다.')
    }

    return response;
}

export const register = async (userInfo: RegisterRequest) => {
    const response = await fetchWithoutAuth('/api/auth/signup', {
        method: "POST",
        body: JSON.stringify(userInfo)
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '회원가입에 실패하였습니다.')
    }

    return response.json();
}

export const logout = async () => {
    const response = await fetchWithoutAuth('/api/auth/logout', {
        method: "POST",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '로그아웃에 실패하였습니다.')
    }

    return response.json();
}

export const onboarding = async (onbordingInfo: onbordingRequest) => {
    const response = await fetchWithoutAuth('/api/onboarding/me', {
        method: "POST",
        body: JSON.stringify(onbordingInfo)
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || '온보딩 등록에 실패하였습니다.')
    }

    return response.json();
}
