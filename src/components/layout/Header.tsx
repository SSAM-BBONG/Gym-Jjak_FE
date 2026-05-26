import UserProfile from "@/feature/common/Profile";
import { Alarm, HeaderLogout, HeaderProfile, Logo, Profile } from "../ui/image";
import NavBar from "./NavBar";
import Link from "next/link";

export default function Header() {
    return (
        <div className="h-17.5 bg-black flex-1 flex items-center justify-between px-30">
            <div className="flex items-center gap-3">
                <div className="bg-[#BFFF0B] size-10 rounded-[10px] flex items-center justify-center">
                    <img src={Logo} alt="로고"/>
                </div>
                <div className="flex-col">
                <p className="text-[#BFFF0B] text-[12px]">GYMJJAK</p>
                <p className="text-white text text-[10px]">Fitness Platform </p>
                </div>
            </div>
            <NavBar/>
            <div className="flex gap-5 items-center">
                {/* <img src={Alarm.src} alt="알림" /> */}
                {/* <img src="images/header-alarm.svg" alt="알림"/> */}
                <Link href="/alarm">
                <div className="relative">
                    <img src={Alarm} alt="알림"/>
                        <div className="absolute left-2 font-extrabold text-[10px] top-[-4] size-4 flex items-center justify-center bg-[#BFFF0B] text-black rounded-full"> 5 </div>
                </div>
                </Link>
                {/* <Image src={Alarm} alt="알림"/> */}
                <button className="bg-[#BFFF0B] px-4 py-2 rounded-[10px] text[14px]"> 로그인 </button>
                <UserProfile/>
            </div>
        </div>
    );
}
