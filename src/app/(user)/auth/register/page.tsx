import Link from "next/link";

export default function Page() {
    return (
        <div className="w-screen">
            <form className="flex gap-2 flex-col m-auto w-md items-center">
                <h1 className="font-black text-4xl text-white mb-2.5">회원가입</h1>
                <p className="text-[#99A1AF] text-sm font-normal mb-8">GymJjak과 함께 시작하세요</p>
                <label className="w-full text-[#D1D5DC] text-sm font-medium">이메일</label>
                <input
                    name="email"
                    type="email"
                    placeholder="이메일을 입력해주세요"
                    className="w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                <label className="w-full text-[#D1D5DC] text-sm font-medium">비밀번호</label>
                <div
                    className="flex w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                    <input
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        className="w-full focus:outline-0"
                    /><img />
                </div>
                <label className="w-full text-[#D1D5DC] text-sm font-medium">비밀번호 확인</label>
                <div
                    className="flex w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:border-[#BFFF0B] text-white focus-within:border-[#BFFF0B]">
                    <input
                        name="passwordCheck"
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요"
                        className="w-full focus:outline-0"
                    /><img />
                </div>
                <label className="w-full text-[#D1D5DC] text-sm font-medium">본명</label>
                <input
                    name="name"
                    type="text"
                    placeholder="본명을 입력해주세요"
                    className="w-full py-3 px-4 mb-5 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                <label className="w-full text-[#D1D5DC] text-sm font-medium">닉네임</label>
                <div className="w-full mb-5 flex gap-2">
                    <input
                        name="nickname"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        className="w-full py-3 px-4 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />
                    <button
                        type="button"
                        className="py-3 px-4 w-35 text-base font-normal rounded-md bg-[#1E2939] text-white">
                        중복 확인
                    </button>
                </div>
                <label className="w-full text-[#D1D5DC] text-sm font-medium">전화번호</label>
                <input
                    name="tel"
                    type="tel"
                    placeholder="전화번호를 입력해주세요"
                    className="w-full py-3 px-4 mb-11 text-base font-normal rounded-md bg-[#101828] border-[#364153] border focus:outline-0 focus:border-[#BFFF0B] text-white" />



                <button className="w-full text-base font-bold mb-6.5 text-black bg-[#BFFF0B] py-4 rounded-md">회원가입</button>

                <div className="flex font-normal text-sm text-[#99A1AF]">
                    <p>이미 계정이 있으신가요?</p>
                    <Link href='/auth/login' className="text-[#BFFF0B]">로그인</Link>
                </div>
            </form>
        </div>
    );
}