import Onboarding3Form from "./Onboarding3Form";

export default function Onboarding3() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">3단계</p><p className="font-medium text-sm text-[#BFFF0B]">50%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-3/6 h-2 bg-[#BFFF0B] rounded-xl"></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">일주일에 몇 번 운동하시나요?</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">목표 운동 빈도를 선택해주세요</p>
            </article>
        </>

    );
}