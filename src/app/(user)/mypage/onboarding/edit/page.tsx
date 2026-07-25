import { MyOnboardingResponse } from "@/feature/auth/type";
import { getMyOnboarding } from "@/service/auth.service";
import OnboardingForm from "./OnboardingForm";

export default async function Page() {
    const response = await getMyOnboarding();
    const myOnboarding: MyOnboardingResponse = response.data;

    return (
        <div className="flex flex-col px-4 sm:px-2.5 md:px-20 lg:px-40 gap-2 pt-6 sm:pt-8 lg:pt-10">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-2xl sm:text-3xl lg:text-[36px] font-black text-white"> 온보딩 수정</p>
                    <p className="text-xs sm:text-sm lg:text-[14px] font-normal text-[#99A1AF] mb-6 sm:mb-7 lg:mb-8"> 나의 운동 프로필을 수정하세요</p>
                </div>
            </div>
            <OnboardingForm myOnboarding={myOnboarding} />
        </div>
    );
}
