import UserProfile from "@/feature/common/Profile";
import { Alarm, HeaderLogout, HeaderProfile, Logo, Profile } from "../ui/image";
import NavBar from "./NavBar";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Header() {

    // 쿠키 저장 
    const cookieStore = await cookies();

    // 쿠키 꺼내오기
    const accessToken = cookieStore.get("accessToken"); 

    return (
        <header className="fixed top-0 left-0 w-full h-17.5 bg-black flex-1 flex items-center justify-between px-30 z-9999 border-b border-b-[#1E2939]">
            <div className="flex items-center gap-3">
                <Link href="/">
                    <div className="bg-[#BFFF0B] size-10 rounded-[10px] flex items-center justify-center cursor-pointer">
                        <img src={Logo} alt="로고" />
                    </div>
                </Link>
                <Link href="/">
                <div className="flex-col cursor-pointer">
                    <p className="text-[#BFFF0B] text-[12px]">GYMJJAK</p>
                    <p className="text-white text text-[10px]">Fitness Platform </p>
                </div>
                </Link>
            </div>
            <NavBar />
            <div className="flex gap-5 items-center">
                <Link href="/alarm">
                    <div className="relative">
                        <img src={Alarm} alt="알림" />
                        <div className="absolute left-2 font-extrabold text-[10px] top-[-4] size-4 flex items-center justify-center bg-[#BFFF0B] text-black rounded-full"> 5 </div>
                    </div>
                </Link>
                {/* 쿠키가 없으면 로그인 버튼 있을때는 프로필 보이도록 설정 */}
                {/* accessToken === undefined <- 쿠키에 null 값이 들어갈때 문제생김 수정 */}
                { !accessToken
                    ? 
                    ( 
                    <Link href="/auth/login">
                    <button className="bg-[#BFFF0B] px-4 py-2 rounded-[10px] text-[14px] font-extrabold text-black cursor-pointer"> 로그인 </button>
                    </Link>
                    )
                    :
                    (
                    <UserProfile />
                    )
                }   
            </div>
        </header>
    );
}
