'use client'

import { HeaderLogout, HeaderProfile, Profile } from "@/components/ui/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { logoutAction } from "../auth/action";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MyTokenPayload } from "@/lib/decode";

interface UserProfileProps {
  userInf?: MyTokenPayload
}

export default function UserProfile( {userInf}: UserProfileProps) {
    console.log(userInf);
    const router = useRouter();
    const [visible, setVisible] = useState<boolean>(false);

    const [logoutConfirmModal, setLogoutConfirmModal] = useState<boolean>(false);
    const [logoutCheckModal, setLogoutCheckModal] = useState<boolean>(false);

    const handleProfileClick = () => {
        setVisible(!visible);
    }

    // 로그아웃 버튼 클릭 시 TwoButtonModal 열기
    const handleLogoutClick = () => {
        setVisible(false);
        setLogoutConfirmModal(true);
    }

    // TwoButtonModal에서 확인 클릭 시 OneButtonModal 열기
    const handleLogoutConfirmClick = () => {
        setLogoutConfirmModal(false);
        setLogoutCheckModal(true);
    }

    // OneButtonModal에서 확인 클릭 시 기존 로그아웃 로직 실행
    const handleLogoutFinalClick = async () => {
        await logoutAction();
        router.push("/");
        router.refresh();
        window.dispatchEvent(new Event('auth-changed'));
    }

    return (
        <>
            <div className="relative min-w-5">
                <div
                    onClick={handleProfileClick}
                    className="rounded-full size-8 border-gray-700 border-2 overflow-hidden flex items-center justify-center
                    hover:cursor-pointer hover:border-[#BFFF0B]"
                >
                    <div className="relative w-8 h-8">
                        <Image
                            src={Profile}
                            alt="프로필 이미지"
                            fill
                            sizes="w-16 h-16"
                            className="object-cover"
                        />
                    </div>
                </div>

                {visible && (
                    <div className="absolute top-11 right-0 w-47.5 h-40 border border-[#364153] bg-[#101828] px-3 py-4 flex flex-col gap-3 rounded-[10px]">
                        <div className="flex flex-col gap-2">
                            <p className="text-white text-[14px]">사용자 이름</p>
                            <p className="text-[#99A1AF] text-[12px]">사용자 내용</p>
                        </div>

                        <hr className="border-t-[#1E2939]" />

                        <div className="flex gap-3 items-center">
                            <div className="relative w-5 h-5">
                                <Image
                                    src={HeaderProfile}
                                    alt="마이페이지"
                                    fill
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div>
                            {userInf?.role === "ORGANIZATION" 
                            ? 
                            <Link href="/organization/dashboard/gym">
                                <p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer">
                                    마이페이지
                                </p>
                            </Link>
                            :
                            <Link href="/mypage">
                                <p className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer">
                                    마이페이지
                                </p>
                            </Link>
                            }
                        </div>

                        <div className="flex gap-3 items-center">
                            <div className="relative w-5 h-5">
                                <Image
                                    src={HeaderLogout}
                                    alt="로그아웃"
                                    fill
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div>
                            <p
                                onClick={handleLogoutClick}
                                className="text-[#D1D5DC] text-[14px] hover:text-[#BFFF0B] cursor-pointer"
                            >
                                로그아웃
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <TwoButtonModal
                isModal={logoutConfirmModal}
                closeModal={() => setLogoutConfirmModal(false)}
                activeModal={handleLogoutConfirmClick}
                title="로그아웃 확인"
                content="로그아웃 하시겠습니까?"
            />

            <OneButtonModal
                isModal={logoutCheckModal}
                closeModal={() => setLogoutCheckModal(false)}
                activeModal={handleLogoutFinalClick}
                title="로그아웃 완료"
                content="로그아웃이 완료되었습니다."
            />
        </>
    );
}
