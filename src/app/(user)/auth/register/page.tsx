import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function Page() {
    return (
        <div className="flex gap-2 flex-col m-auto w-md items-center mt-10">
            <h1 className="font-black text-4xl text-white mb-2.5">회원가입</h1>
            <p className="text-[#99A1AF] text-sm font-normal mb-8">GymJjak과 함께 시작하세요</p>
            <RegisterForm />
            <div className="flex font-normal text-sm text-[#99A1AF] mb-10">
                <p>이미 계정이 있으신가요?</p>
                <Link href='/auth/login' className="text-[#BFFF0B]">로그인</Link>
            </div>
        </div>
    );
}