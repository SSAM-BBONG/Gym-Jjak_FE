'use client'

import { HeaderLogout, HeaderProfile, Profile } from "@/components/ui/image";
import Link from "next/link";
import { useState } from "react";
import { logoutAction } from "../auth/action";

export default function UserProfile() {

    // 클릭시 프로필 부분 보이도록 useState로 관리
    const [ visible, setVisible ] = useState<boolean>(false);

    // 클릭시 상태값 변하게 설정
    const handleProfileClick = () => {
        setVisible(!visible);
    }

    const handleLogoutClick = () => {
        logoutAction();
    }
    return (
         <div className="relative">
                    {/* 프로필 클릭시마다 handleProfileClick 실행 */}
                    <div onClick={handleProfileClick} className="rounded-full size-8 border-[#99A1AF] border overflow-hidden flex items-center justify-center hover:cursor-pointer">
                        <img src={Profile} alt="프로필 이미지"/> 
                    </div>
                    { visible && (
                    <div className="absolute top-11 right-0 w-47.5 h-40 border border-[#364153] bg-[#101828] px-3 py-4 flex flex-col gap-3 rounded-[10px] ">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-[14px]"> 사용자 이름</p>
                            <p className="text-[#99A1AF] text-[12px]"> 사용자 이메일 </p>
                        </div>
                        <hr className="border-t-[#1E2939]"/>
                        <div className="flex gap-3 items-center">
                            <img src={HeaderProfile} alt="헤더 마이페이지"/>
                            <Link href='/mypage'>
                                <p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"> 마이페이지</p> </Link>
                        </div>
                        <div className="flex gap-3 items-center">
                            <img src={HeaderLogout} alt="로그아웃"/>
                            <p 
                            onClick={handleLogoutClick}
                            className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"> 로그아웃 </p>
                        </div>
                    </div>
                    )}
                </div>
    );
}