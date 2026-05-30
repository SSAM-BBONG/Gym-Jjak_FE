import { LoginRequest, RegisterRequest } from "@/feature/auth/type";
import { axiosFetch } from "@/lib/api"

export const login = async (user: LoginRequest) => {

    const response = await axiosFetch.post('/api/auth/login', user)

    return response;

}

export const register = async (userInfo: RegisterRequest) => {
    const response = await axiosFetch.post('/api/auth/signup', userInfo)

    return response;
}

export const logout = async () => {
    const response = await axiosFetch.post('/api/auth/logout');

    return response;
}