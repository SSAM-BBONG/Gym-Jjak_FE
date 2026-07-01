import Link from "next/link";
import LoginForm from "./LoginForm";
import { GoogleLogo, NaverLogo } from "@/components/ui/image";


export default function Page() {
    return (
        <div
            className="flex gap-2 flex-col m-auto w-md items-center mt-10">
            <h1 className="font-black text-4xl text-white mb-2.5">로그인</h1>
            <p className="text-[#99A1AF] text-sm font-normal mb-8">다시 만나서 반가워요!</p>
            <LoginForm />
            <Link
                className="w-full mb-8.5 font-normal text-sm text-[#99A1AF]"
                href='/auth/login/find-pw'>
                비밀번호를 잊으셨나요?
            </Link>
            <div className="flex font-normal text-sm text-[#99A1AF] pb-4">
                <p>아직 계정이없으신가요?</p>
                <Link href='/auth/register' className="text-[#BFFF0B]">회원가입</Link>
            </div>
            <div className="flex justify-center gap-6 border-t border-[#99A1AF] w-full p-6">
                <a href={`/oauth2/authorization/naver`} className="w-15 h-15 rounded-full">
                    <img src={NaverLogo} alt="네이버로 계속하기" />
                </a>
                <a href={`/oauth2/authorization/google`} className="w-15 h-15 rounded-full">
                    <img src={GoogleLogo} alt="구글로 계속하기" />
                </a>
            </div>
        </div>
    );
}