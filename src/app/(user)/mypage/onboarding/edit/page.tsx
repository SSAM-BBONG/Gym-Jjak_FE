import { MyOnboardingPurpose } from "@/components/ui/image";
import { MyOnboardingResponse } from "@/feature/auth/type";
import OnboardingAdressCard from "@/feature/mypage/components/OnboardingAdressCard";
import OnboardingDetailEditCard from "@/feature/mypage/components/OnboardingDetailEditCard";
import { getMyOnboarding } from "@/service/auth.service";

export default async function Page() {
    const response = await getMyOnboarding();
    const myOnboarding: MyOnboardingResponse = response.data;

    return (
        <form className="flex flex-col px-40 gap-2 pt-10">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-[36px] font-black text-white"> 온보딩 수정</p>
                    <p className="text-[14px] font-normal text-[#99A1AF] mb-8"> 나의 운동 프로필을 수정하세요</p>
                </div>
            </div>

            <OnboardingDetailEditCard title="운동 목적" content={myOnboarding.exerciseGoal} options={['다이어트', '벌크업', '체력증진', '재활']} />
            <OnboardingDetailEditCard title='운동 경험' content={myOnboarding.exercisePeriod} options={['처음 시작해요', '6개월 미만', '6개월 ~ 1년', '1년 ~ 2년', '2년 이상']} />
            <OnboardingDetailEditCard title='운동 빈도' content={myOnboarding.exerciseFrequency} options={['1회 이하', '2~4회', '5~7회']} />
            <OnboardingDetailEditCard title='선호 운동' content={myOnboarding.preferredExercise} options={['웨이트 트레이닝', '크로스핏', '요가', '필라테스', '수영', '러닝', '사이클', '복싱', '댄스', '클라이밍']} />
            <div className="
                                flex gap-3
                                p-8 
                                rounded-[16px]
                                border
                                border-[#36415380]
                                bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                                mb-4">
                <div className="bg-[#BFFF0B1A] w-10 h-10 rounded-[10px] p-2 flex justify-center items-center"><img src={MyOnboardingPurpose} alt="온보딩 개별 사진" /></div>
                <div className=" flex flex-col gap-5 w-full">
                    <p className="text-xl flex items-center h-10 text-white font-extrabold ">신체 정보</p>
                    <div className="flex w-full gap-4">
                        <div className="w-full">
                            <p className="font-normal text-sm text-[#99A1AF]">키</p>
                            <input
                                className="font-normal text-base text-white w-full bg-[#1E2939] border-[#364153] p-3 rounded-[10px]"
                                defaultValue={myOnboarding.height} />
                        </div>
                        <div className="w-full">
                            <p className="font-normal text-sm text-[#99A1AF]">체중</p>
                            <input
                                className="font-normal text-base text-white w-full bg-[#1E2939] border-[#364153] p-3 rounded-[10px]"
                                defaultValue={myOnboarding.weight} />
                        </div>
                    </div>
                </div>
            </div>
            <OnboardingAdressCard title='선호 지역' content={myOnboarding.preferredRegion.fullName} />
            <button className="bg-[#BFFF0B] text-black px-6 py-3 font-bold text-base rounded-[10px] w-full">등록하기</button>
        </form>
    );
}