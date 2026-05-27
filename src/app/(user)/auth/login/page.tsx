import Link from "next/link";

export default function Page() {
    return (
        <div className="w-screen">
            <form className="flex gap-2 flex-col m-auto w-md items-center">
                <h1 className="font-black text-4xl text-white mb-2.5">로그인</h1>
                <p className="text-[#99A1AF] text-sm font-normal mb-8">다시 만나서 반가워요!</p>
                <label className="w-full text-[#D1D5DC] text-sm font-medium">이메일</label>
                <input
                    name="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    className="w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                <label className="w-full text-[#D1D5DC] text-sm font-medium">비밀번호</label>
                <div
                    className="flex w-full py-3 px-4 mb-11 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        className="w-full focus:outline-0"
                    /><img />
                </div>

                <button className="w-full text-base font-bold mb-6 text-black bg-[#BFFF0B] py-4 rounded-md">로그인</button>
                <Link
                    className="w-full mb-8.5 font-normal text-sm text-[#99A1AF]"
                    href='/auth/login/find'>
                    비밀번호를 잊으셨나요?
                </Link>
                <div className="flex font-normal text-sm text-[#99A1AF]">
                    <p>아직 계정이없으신가요?</p>
                    <Link href='/auth/register' className="text-[#BFFF0B]">회원가입</Link>
                </div>
            </form>
        </div>
    );
}