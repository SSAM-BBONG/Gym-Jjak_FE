import Link from "next/link";
import { CommonLocation, FooterBlog, FooterEmail, FooterInsta, FooterNumber, FooterYoutube, Logo } from "../ui/image";
import Image from "next/image";

export default function UserFooter() {
  return (
    <div className="bg-black px-40 py-10">
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3 items-center">
            <div className="flex items-center justify-center size-10 rounded-[10px]">
              <div className="relative w-10 h-10">
                <Image
                  src={Logo}
                  alt="하단바 로고"
                  fill
                  sizes="w-20 h-20"
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex flex-col ">
              <p className="text-[14px] text-[#BFFF0B]">GYMJJAK</p>
              <p className="text-[#6A7282] text-[10px]">Fitness Platform </p>
            </div>
          </div>
          <p className="text-[#99A1AF]">
            당신의 건강한 삶을 위한 최고의 파트너 <br />
            전문 트레이너와 함께하는 체계적인 운동 관리 플랫폼
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <div className="relative w-4 h-4">
                <Image
                  src={FooterEmail}
                  alt="하단바 이메일 로고"
                  fill
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </div>
              <p className="text-[#99A1AF]"> ssambbong@eulji.com </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative w-4 h-4">
                <Image
                  src={FooterNumber}
                  alt="하단바 전화번호 로고"
                  fill
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </div>
              <p className="text-[#99A1AF]"> 02-1004-5678 </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="relative w-4 h-4">
                <Image
                  src={CommonLocation}
                  alt="하단바 위치 로고"
                  fill
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </div>
              <p className="text-[#99A1AF]"> 경기도 성남시 수정구 산성대로 553 을지대학교 </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center size-10 rounded-full bg-[#1E2939]">
              <p className="relative w-4 h-4">
                <Image
                  src={FooterBlog}
                  alt="하단바 블로그 로고"
                  fill
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </p>
            </div>
            <div className="flex items-center justify-center size-10 rounded-full bg-[#1E2939]">
              <p className="relative w-4 h-4">
                <Image
                  src={FooterInsta}
                  alt="하단바 인스타 로고"
                  fill
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </p>
            </div>
            <div className="flex items-center justify-center size-10 rounded-full bg-[#1E2939]">
              <p className="relative w-4 h-4">
                <Image
                  src={FooterYoutube}
                  alt="하단바 유튜브 로고"
                  fill
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <p className="text-white"> 서비스 </p>
          <Link href="/pt">
            <p className="text-[#99A1AF] hover:text-[#BFFF0B] cursor-pointer"> PT ZONE </p>
          </Link>
          <p className="text-[#99A1AF] hover:text-[#BFFF0B] cursor-pointer"> 홈트 ZONE </p>
          <Link href="/community">
            <p className="text-[#99A1AF] hover:text-[#BFFF0B] cursor-pointer"> 커뮤니티 </p>
          </Link>
          <Link href="/calender">
            <p className="text-[#99A1AF] hover:text-[#BFFF0B] cursor-pointer"> 캘린더 </p>
          </Link>
        </div>
      </div>
      <hr className="border-t-[#1E2939] mt-10" />
      <div className="flex gap-4 mt-6 mb-4">
        <p className="text-[#6A7282] hover:text-white"> 이용약관 </p>
        <p className="text-[#6A7282]"> | </p>
        <p className="text-[#6A7282] hover:text-white"> 개인정보처리방침 </p>
        <p className="text-[#6A7282]"> | </p>
        <p className="text-[#6A7282] hover:text-white"> 위치기반서비스이용약관 </p>
      </div>
      <p className="text-[#4A5565]"> (주)쌈뽕 | 대표이사: 서주원 | 사업자등록번호: 123-45-67890 | </p>
      <p className="text-[#4A5565]"> 주소: 경기도 성남시 수정구 산성대로 553 을지대학교 | 이메일: ssambbong@eulji.com  | 대표전화: 1234-5678 </p>
    </div>
  );
}
