import Onboarding2Form from "./Onboarding2Form";

export default function Onboarding2() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">2단계</p><p className="font-medium text-sm text-[#BFFF0B]">33%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-2/6 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">운동 경험을 알려주세요</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">얼마나 운동하셨나요?</p>
            </article>
        </>
    )
}