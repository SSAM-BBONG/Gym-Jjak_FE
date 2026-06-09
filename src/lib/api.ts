// use server를 쓰면 서버 액션으로 판단될 수 있어 next 규칙과 충돌할 수 있음
import 'server-only';

import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

declare module 'axios' {
    interface InternalAxiosRequestConfig {
        _retry?: boolean;
    }
}

// 공통 설정
export const axiosFetch = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081',
    timeout: 5000,// 백엔드의 응답을 기다리는 시간(경과되면 오류터짐), 없으면 서버의 응답을 무한으로 기다림(무한 로딩)
    headers: {
        'Content-Type': 'application/json',
    },
})

//요청 인터셉터(HTTP요청을 서버로 보내기 전에 실행)
axiosFetch.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // config 안에 백엔드 주소, method, headers 정보가 들어있음
        // method 나 request 객체들은 알아서 전송됨

        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

//응답 인터셉터(응답을 받은 후)
axiosFetch.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    async (error) => {
        if (error.response) {
            const { status } = error.response;

            switch (status) {
                case 401:
                    const cookieStore = await cookies();
                    if (!cookieStore.get('refreshToken')?.value) {
                        return Promise.reject(error);
                    }

                    if (error.config._retry) {
                        cookieStore.delete('accessToken');
                        cookieStore.delete('refreshToken');
                        return Promise.reject(error);
                    }
                    error.config._retry = true;

                    try {
                        const base_url = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8081';

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
                            maxAge: 60 * 1,   // 15분
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

                        //원래 하려던 요청을 다시 요청
                        //근데 원래 요청의 헤더에는 예전의 accessToken이 들어있으니 이를 새로 발급받은 토큰으로 교체
                        error.config.headers.Authorization = `Bearer ${res.data.data.accessToken}`;
                        return axiosFetch(error.config)
                    } catch (refreshError) {
                        cookieStore.delete('accessToken');

                        return Promise.reject(refreshError);
                    }


                default:
                    return Promise.reject(error);

            }
        }
        return Promise.reject(error)
    }
)

//특정 요청에만 응답 요청 시간을 늘리는 법
// axiosFetch.post('/api/v1/upload', formData, { timeout: 10000 });

// withCredentials: true
//서버야, 내가 너한테 요청 보낼 때 내 브라우저에 저장된 소중한 쿠키(또는 인증 정보)도 같이 짐 싸서 보낼게! 라고 허락해 주는 설정입니다.
//연동할 떄 프론트랑 백이랑 도메인이 다르면 남남이라고 생각해서 로그인 토큰이 담긴 쿠키(Cookie)같은 중요 정보를 안넘김
//내 브라우저 쿠키 저장소에 안전하게 보관되어 있던 리프레시 토큰 쿠키를 요청에 알아서 장착시켜 줍니다.
//사용하려면 백에서 cors 설정해줘야함


// Next.js의 redirect 함수는 내부적으로 특수한 에러(NEXT_REDIRECT 에러)를 일부러 발생시켜서 Next.js 프레임워크가 이를 감지하고 페이지를 이동시키는 방식으로 작동합니다.
// 그래서 리다이렉트를 try catch 안에 작성할 경우 통신 에러로 잘못 탐지할 수도 있음.
// 그래서 따로 빼서 코드를 작성해야함
