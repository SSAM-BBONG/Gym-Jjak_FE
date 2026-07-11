import Onboarding4Form from "./Onboarding4Form";

export default function Onboarding4() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-xs sm:text-sm lg:text-sm">4단계</p><p className="font-medium text-xs sm:text-sm lg:text-sm text-[#BFFF0B]">67%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-8 sm:mb-10 lg:mb-12"><div className="w-4/6 h-2 bg-[#BFFF0B] rounded-xl "></div></div>
            <article className="text-center">
                <h1 className="font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white mb-3 sm:mb-4 lg:mb-4.5">어떤 운동을 가장 좋아하시나요?</h1>
                <p className="font-normal text-sm sm:text-base lg:text-lg text-[#99A1AF] mb-8 sm:mb-10 lg:mb-12">선호하는 운동을 선택해주세요</p>
            </article>
        </>

    );
}
