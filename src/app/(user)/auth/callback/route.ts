// src/app/(user)/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

//route.ts는 화면 없이 요청을 처리하는 파일
export async function GET(request: NextRequest) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const onboardingCompleted = request.nextUrl.searchParams.get("onboardingCompleted") === "true";
    const socialSignupCompleted = request.nextUrl.searchParams.get("socialSignupCompleted") === "true";

    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!accessToken || !refreshToken) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    let redirectPath = "/";

    if (!socialSignupCompleted) {
        redirectPath = "/auth/register/social";
    } else if (!onboardingCompleted) {
        redirectPath = "/auth/onboarding?page=1";
    }

    //쿠키를 담아서 path로 리다이렉트
    const response = NextResponse.redirect(new URL(redirectPath, request.url));

    response.cookies.set("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: "/",
        sameSite: "lax",
    });

    response.cookies.set("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 3,
        path: "/",
        sameSite: "lax",
    });

    return response;
}