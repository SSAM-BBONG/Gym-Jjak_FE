import UserFooter from "@/components/layout/UserFooter";
import {
  MainCalender,
  MainCommunity,
  MainCrewDefender,
  MainHomeTraining,
  MainImg,
} from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-6 px-40">
      <div className="flex justify-between mt-20 mb-22.5">
        <div className="flex flex-col gap-8">
          <p className="font-normal text-[14px] text-[#99A1AF]"> 전문적인 PT를 원하는 사람들</p>
          <p className="font-black text-white text-[56px] leading-17.5"> 당신의 잠재력을 <br />
            <span className="text-[#BFFF0B]"> 폭발시켜라 </span> <br />
            오늘부터 시작하세요. </p>
          <p className="font-normal text-[14px] text-[#99A1AF]">
            최고의 트레이너 관리와 과학적 데이터 기반 PT를 시작해보세요. <br />
            당신의 목표를 달성할 수 있습니다.
          </p>
          <Link href="/pt">
            <button className="bg-[#BFFF0B] text-black font-extrabold text-[16px] px-9 py-3.5 rounded-[10px] cursor-pointer hover:opacity-80"> 지금 바로 체험하기</button>
          </Link>
        </div>

        <div>
          <div className="relative w-165 h-100">
            <Image
              src={MainImg}
              alt="메인페이지 설명이미지"
              fill
              priority
              placeholder="blur"
              sizes="w-200 h-200"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 justify-between">
        <div
          className="
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)]
        border border-[#BFFF0B66] rounded-[24px]
        w-[70%]
        p-7
        flex flex-col gap-6
        "
        >
          <div className="text-white text-[48px]">
            <p className="leading-12 font-black">전문 트레이너와</p>
            <p className="leading-12 font-black"> 1:1 PT 매칭 </p>
          </div>
          <p className="text-[#D1D5DC] text-[18px]">
            전국의 검증된 트레이너를 찾아보세요. <br />내 위치 기반으로 가까운
            PT 센터를 쉽게 찾을 수 있습니다.
          </p>
          <div className="text-[#D1D5DC] text-[16px] flex gap-2">
            <p className="rounded-full size-6 bg-[#BFFF0B] text-black flex items-center justify-center font-black">
              ☆
            </p>
            <p> 원하는 트레이너와 함께 </p>
          </div>
          <div className="text-[#D1D5DC] text-[16px] flex gap-2">
            <p className="rounded-full size-6 bg-[#BFFF0B] text-black flex items-center justify-center font-black">
              ☆
            </p>
            <p>후기로 검증된 트레이너</p>
          </div>
          <div className="text-[#D1D5DC] text-[16px] flex gap-2">
            <p className="rounded-full size-6 bg-[#BFFF0B] text-black flex items-center justify-center font-black">
              ☆
            </p>
            <p>목표 맞춤 PT 프로그램</p>
          </div>
          <button className="bg-[#BFFF0B] rounded-[10px] text-black flex items-center justify-center px-6 py-2 font-bold
          hover:cursor-pointer hover:opacity-80">
            PT 센터 찾기
          </button>
        </div>
        <div
          className="
        flex-1
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)]
        rounded-[24px]
        p-7
        flex
        flex-col
        justify-between
        "
        >
          <div className="flex flex-col gap-6 items-baseline">
            <div className="relative w-13 h-13">
              <Image
                src={MainCommunity}
                alt="메인페이지 커뮤니티"
                fill
                sizes="w-26 h-26"
                className="object-cover"
              />
            </div>
            <p className="text-[30px] font-black text-white">
              함께하는 <br /> 커뮤니티
            </p>
            <p className="text-[#D1D5DC] font-normal">

              운동 팁을 공유하고 <br /> 동기부여를 받으세요
            </p>
          </div>
          <Link href="/community">
            <button className="w-full bg-[#1E2939] text-white px-2 py-2.5 text-center rounded-[10px] font-extrabold
          hover:bg-[#BFFF0B] hover:text-black hover:cursor-pointer">
              커뮤니티 가기
            </button>
          </Link>
        </div>
        <div
          className="
        w-[31%]
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)]
        rounded-[24px]
        p-7
        flex
        flex-col
        justify-between"
        >
          <div className="flex flex-col gap-6 items-baseline">
            <div className="bg-[#1E2939] rounded-[16px] border border-[#364153] p-3.5">
              <div className="relative w-8 h-8">
                <Image
                  src={MainHomeTraining}
                  alt="메인페이지 홈트"
                  fill
                  sizes="w-16 h-16"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-[30px] font-black text-white">
              홈트 <br /> 프로그램
            </p>
            <p className="text-[#D1D5DC] font-normal">

              집에서 할 수 있는 <br /> 맞춤형 운동 루틴
            </p>
          </div>
          <button className="w-full bg-[#1E2939] text-white px-2 py-2.5 text-center rounded-[10px] font-extrabold
          hover:bg-[#BFFF0B] hover:text-black hover:cursor-pointer">
            홈트 ZONE 가기
          </button>
        </div>
        <div className="w-[31%] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)] rounded-[24px] p-7">
          <div className="flex flex-col gap-6 items-baseline">
            <div className="bg-[#1E2939] rounded-[16px] border border-[#364153] p-3.5">
              <div className="relative w-8 h-8">
                <Image
                  src={MainCalender}
                  alt="메인페이지 캘린더"
                  fill
                  sizes="w-16 h-16"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-[30px] font-black text-white">

              운동 <br /> 캘린더
            </p>
            <p className="text-[#D1D5DC] font-normal">

              운동 일정을 관리하고 <br /> 습관을 만드세요
            </p>
          </div>
          <Link href="/calendar">
            <button className="w-full bg-[#1E2939] text-white px-2 py-3 text-center rounded-[10px] font-extrabold mt-8
                      hover:bg-[#BFFF0B] hover:text-black hover:cursor-pointer">
              캘린더 가기
            </button>
          </Link>
        </div>
        <div className="w-[31%] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)_0%,rgba(30,41,57,0.90)_100%)] rounded-[24px] p-7">
          <div className="flex flex-col gap-6 items-baseline">
            <div className="bg-[#1E2939] rounded-[16px] border border-[#364153] p-3.5">
              <div className="relative w-8 h-8">
                <Image
                  src={MainCrewDefender}
                  alt="메인페이지 길드 대항전"
                  fill
                  sizes="w-16 h-16"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="text-[30px] font-black text-white">

              길드 <br /> 대항전
            </p>
            <p className="text-[#D1D5DC] font-normal">

              팀을 만들고 함께 <br /> 목표를 달성하세요
            </p>
          </div>
          <button className="w-full bg-[#1E2939] text-white px-2 py-3 rounded-[10px] font-extrabold mt-8
                    hover:bg-[#BFFF0B] hover:text-black hover:cursor-pointer">
            길드 대항전 참여하기
          </button>
        </div>
      </div>

      <div
        className="flex justify-around 
            bg-[linear-gradient(90deg,rgba(16,24,40,0.90)_100%,rgba(30,41,57,0.90)_100%)]
            border
            border-[#36415380]
            rounded-[24px]
            p-8
            mb-37.5
            "
      >
        <div>
          <p className="text-[#BFFF0B] text-[32px] font-black text-center">
            1234
          </p>
          <p className="text-[#99A1AF] text-center"> 전문 트레이너</p>
        </div>
        <div>
          <p className="text-[#BFFF0B] text-[32px] font-black text-center">
            15,678
          </p>
          <p className="text-[#99A1AF] text-center"> 소속 회원</p>
        </div>
        <div>
          <p className="text-[#BFFF0B] text-[32px] font-black text-center">
            892
          </p>
          <p className="text-[#99A1AF] text-center"> PT 센터</p>
        </div>
        <div>
          <p className="text-[#BFFF0B] text-[32px] font-black text-center">
            4.8
          </p>
          <p className="text-[#99A1AF] text-center"> 평균 만족도</p>
        </div>
      </div>
      <footer className="w-auto -mx-40">
        <UserFooter />
      </footer>
    </div>
  );
}
