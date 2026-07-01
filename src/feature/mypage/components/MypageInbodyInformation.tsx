import { MypageInbody, MypageOnboarding } from "@/components/ui/image";
import Image from "next/image";

export default function MypageInbodyInformation() {
  return (
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
            src={MypageOnboarding}
            alt="마이페이지 인바디 정보"
            fill
            priority
            sizes="w-10 h-10"
            className="object-cover"
          />
        </div>
        <p className="text-[18px] font-extrabold text-white">
          인바디 정보
        </p>
      </div>

      <div className="flex flex-col items-center gap-3 bg-[#1E2939] p-6 rounded-[14px]">
        <div className="flex items-center justify-center rounded-full bg-[#BFFF0B1A] p-3">
          <div className="relative w-6 h-6">
            <Image
              src={MypageInbody}
              alt="마이페이지 인바디 입력하기"
              fill
              priority
              sizes="w-10 h-10"
              className="object-cover"
            />
          </div>
        </div>
        <p className="text-[16px] font-extrabold text-white">
          인바디 입력하기
        </p>
        <p className="text-[12px] font-medium text-[#99A1AF]">
          키, 몸무게, 체지방률 등을 기록하세요
        </p>
        <button className="px-4 py-2 text-[14px] font-bold text-black bg-[#BFFF0B] rounded-[16px]">
          입력하기
        </button>
      </div>
    </div>
  );
}