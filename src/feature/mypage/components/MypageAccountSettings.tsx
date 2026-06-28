'use client'

import { MypageAccountSetting } from "@/components/ui/image";
import Link from "next/link";
import { deleteMyAccountAction } from "../action";
import { useState } from "react";
import PasswordCheckModal from "./PasswordCheckModal";

export default function MypageAccountSettings() {

    const [passwordCheckModal, setpasswordCheckModal] = useState(false);

    const handleUserDelectionClick = async () => {
      const result = await deleteMyAccountAction();
    }
    return (
      <>
         <div
                className="
            flex flex-col
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#82181A4D]
            rounded-[16px]
            p-6
            gap-6"
              >
                <div className="flex gap-2 items-center">
                  <img src={MypageAccountSetting} alt="마이페이지 계정 설정" />
                  <p className="text-[18px] font-extrabold text-[#FF6467]">
                    계정 설정
                  </p>
                </div>

                <Link href="/mypage/password">
                  <div className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px]">
                    <p className="text-[14px] font-medium text-[#99A1AF]">
                      비밀번호 변경
                    </p>
                    <p className="text-[12px] font-medium text-[#6A7282]"> 〉 </p>
                  </div>
                </Link>

                <div className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px]">
                  <p className="text-[14px] font-medium text-[#99A1AF]">
                    회원 탈퇴
                  </p>
                  <button 
                    type="button"
                    onClick={() => setpasswordCheckModal(true)}
                    className="text-[12px] font-medium text-[#6A7282] hover:cursor-pointer"> 〉 </button>
                </div>
              </div>

              <PasswordCheckModal
                isModal={passwordCheckModal}
                closeModal={() => setpasswordCheckModal(false)}
                checkPassword={handleUserDelectionClick}
              />
      </>
    );
}