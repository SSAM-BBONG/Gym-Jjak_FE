import { MyOnboardingPurpose } from "@/components/ui/image";
import { MyOnboardingResponse } from "@/feature/auth/type";
import OnboardingDetailCard from "@/feature/mypage/components/OnboardingDetailCard";
import { getMyOnboarding } from "@/service/auth.service";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    const response = await getMyOnboarding();
    const myOnboarding: MyOnboardingResponse = response.data;

    return (
        <div className="flex flex-col px-4 sm:px-2.5 md:px-20 lg:px-40 gap-2 pt-6 sm:pt-8 lg:pt-10">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-2xl sm:text-3xl lg:text-[36px] font-black text-white"> 온보딩 정보</p>
                    <p className="text-xs sm:text-sm lg:text-[14px] font-normal text-[#99A1AF] mb-6 sm:mb-7 lg:mb-8"> 나의 운동 프로필을 확인하세요</p>
                </div>
                <Link href="/mypage/onboarding/edit"><button className="bg-[#BFFF0B] text-black px-4 sm:px-5 lg:px-6 py-2.5 lg:py-3 font-bold text-sm lg:text-base rounded-[10px]">수정하기</button></Link>
            </div>

            <OnboardingDetailCard title="운동 목적" content={myOnboarding.exerciseGoal} />
            <OnboardingDetailCard title='운동 경험' content={myOnboarding.exercisePeriod} />
            <OnboardingDetailCard title='운동 빈도' content={myOnboarding.exerciseFrequency} />
            <OnboardingDetailCard title='선호 운동' content={myOnboarding.preferredExercise} />
            <div className="
                                flex gap-2 sm:gap-3
                                p-5 sm:p-6 lg:p-8
                                rounded-[12px] sm:rounded-[14px] lg:rounded-[16px]
                                border
                                border-[#36415380]
                                bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                                mb-3 sm:mb-4">
                <div className="bg-[#BFFF0B1A] w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-[10px] p-1.5 sm:p-2 flex justify-center items-center">
                    <div className="relative w-4 h-4 lg:w-5 lg:h-5">
                        <Image
                            src={MyOnboardingPurpose}
                            alt="온보딩 개별 사진"
                            fill
                            sizes="w-10 h-10"
                            className="object-cover hover:cursor-pointer"
                        />
                    </div>
                </div>
                <div className=" flex flex-col gap-3 sm:gap-4 lg:gap-5 w-full">
                    <p className="text-base sm:text-lg lg:text-xl flex items-center h-8 sm:h-9 lg:h-10 text-white font-extrabold ">신체 정보</p>
                    <div className="flex w-full">
                        <div className="w-full">
                            <p className="font-normal text-xs sm:text-sm text-[#99A1AF]">키</p>
                            <p className="font-black text-xl sm:text-[22px] lg:text-2xl text-[#BFFF0B]">{myOnboarding.height}cm</p>
                        </div>
                        <div className="w-full">
                            <p className="font-normal text-xs sm:text-sm text-[#99A1AF]">체중</p>
                            <p className="font-black text-xl sm:text-[22px] lg:text-2xl text-[#BFFF0B]">{myOnboarding.weight}kg</p>
                        </div>
                    </div>
                </div>
            </div>
            <OnboardingDetailCard title='선호 지역' content={myOnboarding.preferredRegion.fullName} />
        </div>
    );
}
