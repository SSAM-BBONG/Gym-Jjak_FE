import { NextRequest, NextResponse } from "next/server";
import { MyTokenPayload } from "./lib/decode";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

async function getRefreshToken(request: NextRequest) {
    const base_url = process.env.NEXT_API_BASE_URL;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    try {
        const res = await axios.post(
            `${base_url}/api/token/reissue`,
            {},
            {
                headers: {
                    Cookie: `refreshToken=${refreshToken}`
                }
            }
        );

        return res.data.data.accessToken;
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    let accessToken = request.cookies.get('accessToken')?.value;
    const refreshToken = request.cookies.get('refreshToken')?.value;

    //새로운 response
    let response = NextResponse.next();

    if ((!accessToken && !refreshToken) || (accessToken && !refreshToken)) {
        //어세스랑 리프레시 둘다 없는경우
        return NextResponse.redirect(new URL('/auth/login', request.url));
    } else if (!accessToken && refreshToken) {
        //어세스만 없는 경우
        const newToken = await getRefreshToken(request);
        console.log('token', newToken)

        if (!newToken) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        response = NextResponse.next();

        accessToken = newToken;
        response.cookies.set("accessToken", newToken, {
            httpOnly: true,
            maxAge: 60 * 1,
            path: "/",
        });
    }

    let user: MyTokenPayload;

    try {
        if (!accessToken) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
        user = jwtDecode<MyTokenPayload>(accessToken);
    } catch {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    if (pathname.startsWith('/admin') && user?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/nopermission', request.url));
    }

    if ((pathname.startsWith('/pt/manage') || pathname.startsWith('/pt/regist')) && user?.role === 'USER') {
        return NextResponse.redirect(new URL('/nopermission', request.url));
    }

    //세팅해놓은 응답 반환
    return response;
}
// 어디로 가려는지: request.nextUrl.pathname
// 쿠키를 들고 왔는지: request.cookies
// 어떤 URL로 왔는지: request.url

//렌더링 전에 거칠 페이지들
export const config = {
    matcher: ['/admin/:path*', '/alarm/:path*', '/calendar/:path*', '/community/:path*', '/mypage/:path*', '/pt/manage/:path*', '/pt/records/:path*', '/pt/regist', '/pt/trainer'],
};//:path* 는 모든 페이지