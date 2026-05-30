import Onboarding6Form from "./Onboarding6Form";

export default function Onboarding6() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">6단계</p><p className="font-medium text-sm text-[#BFFF0B]">100%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-6/6 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">선호 지역을 입력해주세요</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">맞춤형 운동 추천을 위해 필요해요</p>
            </article>
        </>
    );
}