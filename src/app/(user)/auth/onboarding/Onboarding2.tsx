import Onboarding2Form from "./Onboarding2Form";

export default function Onboarding2() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-xs sm:text-sm lg:text-sm">2단계</p><p className="font-medium text-xs sm:text-sm lg:text-sm text-[#BFFF0B]">33%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-8 sm:mb-10 lg:mb-12"><div className="w-2/6 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
            <article className="text-center">
                <h1 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 lg:mb-4.5">운동 경험을 알려주세요</h1>
                <p className="font-normal text-sm sm:text-base lg:text-lg text-[#99A1AF] mb-8 sm:mb-10 lg:mb-12">얼마나 운동하셨나요?</p>
            </article>
        </>
    )
}
