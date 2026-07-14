import Link from "next/link";
import RegisterForm from "./RegisterForm";

export default function Page() {
    return (
        <div className="flex gap-2 flex-col m-auto w-[calc(100%-5rem)] sm:w-sm md:w-md lg:w-md items-center mt-10 sm:mt-8 lg:mt-10">
            <h1 className="font-black text-2xl sm:text-3xl lg:text-4xl text-white mb-2 sm:mb-2.5 lg:mb-2.5">회원가입</h1>
            <p className="text-[#99A1AF] text-xs sm:text-sm lg:text-sm font-normal mb-6 sm:mb-7 lg:mb-8">GymJjak과 함께 시작하세요</p>
            <RegisterForm />
            <div className="flex gap-1 lg:gap-0 font-normal text-xs sm:text-sm lg:text-sm text-[#99A1AF] mb-10 ">
                <p>이미 계정이 있으신가요?</p>
                <Link href='/auth/login' className="text-[#BFFF0B]">로그인</Link>
            </div>
        </div>
    );
}
