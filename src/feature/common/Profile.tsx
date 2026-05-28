'use client'

import { HeaderLogout, HeaderProfile, Profile } from "@/components/ui/image";
import Link from "next/link";
import { useState } from "react";

export default function UserProfile() {

    const [ visible, setVisible ] = useState(false);

    const handleProfileClick = () => {
        setVisible(!visible);
    }
    return (
         <div className="relative">
                    <div onClick={handleProfileClick} className="rounded-full size-8 border-[#99A1AF] border-[1px] overflow-hidden flex items-center justify-center hover:cursor-pointer">
                        <img src={Profile} alt="프로필 이미지"/> 
                    </div>
                    { visible && (
                    <div className="absolute top-full right-0 w-[190px] h-[160px] border-[#364153] bg-[#101828] px-3 py-4 flex flex-col gap-3 rounded-[10px] ">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-[14px]"> 사용자 이름</p>
                            <p className="text-[#99A1AF] text-[12px]"> 사용자 이메일 </p>
                        </div>
                        <hr className="border-t-[#1E2939]"/>
                        <div className="flex gap-3 items-center">
                            <img src={HeaderProfile} alt="헤더 마이페이지"/>
                            <Link href='/mypage'><p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"> 마이페이지</p> </Link>
                        </div>
                        <div className="flex gap-3 items-center">
                            <img src={HeaderLogout} alt="로그아웃"/>
                            <p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"> 로그아웃 </p>
                        </div>
                    </div>
                    )}
                </div>
    );
}