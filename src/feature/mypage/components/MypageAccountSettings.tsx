'use client'

import { MypageAccountSetting } from "@/components/ui/image";
import Link from "next/link";
import { deleteMyAccountAction } from "../actions";
import { useState } from "react";
import PasswordCheckModal from "./PasswordCheckModal";
import Image from "next/image";
import useModal from "@/components/hooks/useModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MypageAccountSettingsProps {
  socialUser: boolean;
}

export default function MypageAccountSettings( {socialUser}: MypageAccountSettingsProps) {
  const router = useRouter();

  const [passwordCheckModal, setpasswordCheckModal] = useState(false);
  const [passwordMoveModal, setPasswordMoveModal] = useState(false);

  const handleUserDelectionConfirm = async () => {
    const result = await deleteMyAccountAction();

    if (!result?.success) {
      toast.error(result?.message ?? "회원탈퇴에 실패했습니다.");
      return;
    }

    toast.success(result.message);
    router.push("/");
    router.refresh();
  };

  const withdrawalModal = useModal(handleUserDelectionConfirm);
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
          <div className="relative w-5 h-5">
            <Image
              src={MypageAccountSetting}
              alt="마이페이지 계정 설정"
              fill
              sizes="w-10 h-10"
              className="object-cover"
            />
          </div>
          <p className="text-[18px] font-extrabold text-[#FF6467]">
            계정 설정
          </p>
        </div>


       {!socialUser && (
          <div 
            className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px] hover:cursor-pointer"
            onClick={() => setPasswordMoveModal(true)}  
          >
            <p className="text-[14px] font-medium text-[#99A1AF]">
              비밀번호 변경
            </p>
            <p
              className="text-[12px] font-medium text-[#6A7282]"> 〉 </p>
          </div>
        )}

        <div 
          className=" flex justify-between items-center p-4 bg-[#1E293980] rounded-[10px] hover:cursor-pointer"
          onClick={() => setPasswordMoveModal(true)}    
        >
          <p className="text-[14px] font-medium text-[#99A1AF]">
            회원 탈퇴
          </p>
          <p
            className="text-[12px] font-medium text-[#6A7282] hover:cursor-pointer"> 〉 </p>
        </div>
      </div>

      {!socialUser && (
        <PasswordCheckModal
          isModal={passwordMoveModal}
          closeModal={() => setPasswordMoveModal(false)}
          movePath="/mypage/password"
        />
      )}
      <TwoButtonModal
        isModal={withdrawalModal.isModal}
        closeModal={withdrawalModal.closeModal}
        activeModal={withdrawalModal.activeModal}
        title="회원탈퇴"
        content="회원탈퇴 하시겠습니까?"
      />
    </>
  );
}