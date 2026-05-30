import Onboarding1Form from "./Onboarding1Form";

export default function Onboarding1() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">1단계</p><p className="font-medium text-sm text-[#BFFF0B]">17%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-1/6 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">운동 목적을 알려주세요</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">어떤 목표를 가지고 계신가요?</p>
            </article>
        </>
    );
}