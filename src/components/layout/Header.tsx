import { Alarm, HeaderLogout, HeaderProfile, Logo, Profile } from "../ui/image";
import NavBar from "./NavBar";

export default function Header() {
    return (
        <div className="h-17.5 bg-black flex-1 flex items-center justify-evenly">
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
                <img src={Alarm} alt="알림"/>
                {/* <Image src={Alarm} alt="알림"/> */}
                <button className="bg-[#BFFF0B] px-4 py-2 rounded-[10px] text[14px]"> 로그인 </button>
                <div className="relative">
                    <div className="rounded-full size-8 border-[#99A1AF] border-[1px] overflow-hidden flex items-center justify-center">
                    <img src={Profile} alt="프로필 이미지"/> </div>
                    <div className="absolute top-full right-0 w-[190px] h-[160px] border-[#364153] bg-[#101828] px-3 py-4 flex flex-col gap-3 rounded-[10px] ">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-[14px]"> 사용자 이름</p>
                            <p className="text-[#99A1AF] text-[12px]"> 사용자 이메일 </p>
                        </div>
                        <hr className="border-t-[#1E2939]"/>
                        <div className="flex gap-3 items-center">
                            <img src={HeaderProfile} alt="헤더 마이페이지"/>
                            <p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"> 마이페이지</p>
                        </div>
                        <div className="flex gap-3 items-center">
                            <img src={HeaderLogout} alt="로그아웃"/>
                            <p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"> 로그아웃 </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
