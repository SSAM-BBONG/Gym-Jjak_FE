'use client'

import { MypageOnboarding, MypageProfile, MypageUserEdit } from "@/components/ui/image";
import Link from "next/link";
import { useState } from "react";
import PasswordCheckModal from "./PasswordCheckModal";
import Image from "next/image";

export default function MypageUserProfileEdit() {

  const [passwordMoveModal, setPasswordMoveModal] = useState(false);

  return (
    <>
      <div
        className="
          flex flex-col
          bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
          border border-[#36415380]
          rounded-[16px]
          p-6
          gap-6
          "
      >
        <div className="flex gap-2 items-center">
          <div className="relative w-5 h-5">
            <Image
              src={MypageUserEdit}
              alt="마이페이지 회원 프로필 수정"
              fill
              priority
              sizes="w-10 h-10"
              className="object-cover"
            />
          </div>
          <p className="text-white text-[18px] font-extrabold">
            회원 프로필 수정
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3">

          <div className="p-4 flex flex-col gap-2 bg-[#1E2939] rounded-[14px]">
            <div className="flex justify-between items-center">
              <div className="relative w-5 h-5">
                <Image
                  src={MypageProfile}
                  alt="마이페이지 트레이너 프로필"
                  fill
                  priority
                  sizes="w-10 h-10"
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setPasswordMoveModal(true)}
                className="text-[#6A7282] text-[12px] font-black hover:cursor-pointer"> 〉 </button>
            </div>
            <p className="text-[14px] font-extrabold text-white">
              트레이너 프로필
            </p>
            <p className="text-[12px] font-medium text-[#99A1AF]">
              트레이너 프로필 수정
            </p>
          </div>
          <div className="p-4 flex flex-col gap-2 bg-[#1E2939] rounded-[14px]">
            <div className="flex justify-between items-center">
              <div className="relative w-5 h-5">
                <Image
                  src={MypageProfile}
                  alt="마이페이지 회원 프로필"
                  fill
                  priority
                  sizes="w-10 h-10"
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => setPasswordMoveModal(true)}
                className="text-[#6A7282] text-[12px] font-black hover:cursor-pointer"> 〉 </button>
            </div>
            <p className="text-[14px] font-extrabold text-white">
              회원 프로필
            </p>
            <p className="text-[12px] font-medium text-[#99A1AF]">
              기본 프로필 수정
            </p>
          </div>
          <Link href="/mypage/onboarding">
            <div className="p-4 flex flex-col gap-2 bg-[#1E2939] rounded-[14px]">
              <div className="flex justify-between items-center">
                <div className="relative w-5 h-5">
                  <Image
                    src={MypageOnboarding}
                    alt="마이페이지 온보딩 정보"
                    fill
                    priority
                    sizes="w-10 h-10"
                    className="object-cover"
                  />
                </div>
                <p className="text-[#6A7282] text-[12px] font-black"> 〉</p>
              </div>
              <p className="text-[14px] font-extrabold text-white">
                온보딩 정보
              </p>
              <p className="text-[12px] font-medium text-[#99A1AF]">
                온보딩 정보 확인/재설정
              </p>
            </div>
          </Link>
        </div>
      </div>

      <PasswordCheckModal
        isModal={passwordMoveModal}
        closeModal={() => setPasswordMoveModal(false)}
        movePath="/mypage/profile"
      />

      <PasswordCheckModal
        isModal={passwordMoveModal}
        closeModal={() => setPasswordMoveModal(false)}
        movePath="/mypage/trainerprofile"
      />
    </>

  );
}