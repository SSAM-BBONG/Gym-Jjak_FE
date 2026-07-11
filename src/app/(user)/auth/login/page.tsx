import Link from "next/link";
import LoginForm from "./LoginForm";
import { GoogleLogo, NaverLogo } from "@/components/ui/image";
import Image from "next/image";


export default function Page() {
    return (
        <div
            className="flex gap-2 flex-col m-auto w-[calc(100%-5rem)] sm:w-sm md:w-md lg:w-md items-center mt-6 sm:mt-8 lg:mt-10">
            <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-2.5 lg:mb-2.5">로그인</h1>
            <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm font-normal mb-6 sm:mb-7 lg:mb-8">다시 만나서 반가워요!</p>
            <LoginForm />
            <Link
                className="w-full mb-6 sm:mb-7 lg:mb-8.5 font-normal text-xs sm:text-sm lg:text-sm text-[#99A1AF]"
                href='/auth/login/find-pw'>
                비밀번호를 잊으셨나요?
            </Link>
            <div className="flex gap-1 lg:gap-0 font-normal text-xs sm:text-sm lg:text-sm text-[#99A1AF] pb-3 sm:pb-4 lg:pb-4">
                <p>아직 계정이없으신가요?</p>
                <Link href='/auth/register' className="text-[#BFFF0B]">회원가입</Link>
            </div>
            <div className="flex justify-center gap-4 sm:gap-5 lg:gap-6 border-t border-[#99A1AF] w-full p-4 sm:p-5 lg:p-6">
                <a href={`/oauth2/authorization/naver`} className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 rounded-full">
                    <Image
                        src={NaverLogo}
                        alt="네이버로 계속하기"
                        fill
                        priority
                        sizes="w-20 h-20"
                        className="object-cover"
                    />
                </a>
                <a href={`/oauth2/authorization/google`} className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 rounded-full">
                    <Image
                        src={GoogleLogo}
                        alt="구글로 계속하기"
                        fill
                        priority
                        sizes="w-20 h-20"
                        className="object-cover"
                    />
                </a>
            </div>
        </div>
    );
}
