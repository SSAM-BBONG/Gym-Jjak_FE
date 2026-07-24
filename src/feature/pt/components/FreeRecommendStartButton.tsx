"use client";

import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FreeRecommendStartButtonProps {
  isAuthenticated: boolean;
}

export default function FreeRecommendStartButton({
  isAuthenticated,
}: FreeRecommendStartButtonProps) {
  const router = useRouter();
  const loginModal = useModal(() => router.push("/auth/login"));
  const className = "shrink-0 rounded-xl bg-[#bfff0b] px-5 py-3.5 text-center text-sm font-extrabold text-[#0b0f19] transition hover:bg-[#d4ff65] focus:outline-none focus:ring-2 focus:ring-white";

  if (isAuthenticated) {
    return (
      <Link href="/pt/recommend" className={className}>
        무료 추천 시작하기 →
      </Link>
    );
  }

  return (
    <>
      <button type="button" onClick={loginModal.openModal} className={className}>
        무료 추천 시작하기 →
      </button>

      <OneButtonModal
        isModal={loginModal.isModal}
        closeModal={loginModal.closeModal}
        activeModal={loginModal.activeModal}
        title="로그인이 필요합니다"
        content="로그인을 진행해주세요"
      />
    </>
  );
}
