import Link from "next/link";
import FindPwForm from "./FindPwForm";

export default function Page() {
    return (
        <div
            className="flex gap-2 flex-col w-md mx-auto items-center mt-30">
            <h1 className="font-black text-4xl text-white mb-2.5">비밀번호 발급</h1>
            <p className="text-[#99A1AF] text-sm font-normal mb-8">비밀번호를 잊으셨나요?</p>
            <FindPwForm />
            <div className="flex font-normal text-sm text-[#99A1AF]">
                <p>이미 계정이 있으신가요?</p>
                <Link href='/auth/login' className="text-[#BFFF0B]">로그인</Link>
            </div>
        </div>
    );
}