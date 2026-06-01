import Onboarding4Form from "./Onboarding4Form";

export default function Onboarding4() {
    return (
        <>
            <div className="w-full flex justify-between mb-3">
                <p className="text-[#99A1AF] font-normal text-sm">4단계</p><p className="font-medium text-sm text-[#BFFF0B]">67%</p>
            </div>
            <div className="w-full h-2 bg-[#1E2939] rounded-xl mb-12"><div className="w-4/6 h-2 bg-[#BFFF0B] rounded-xl "></div></div>
            <article className="text-center">
                <h1 className="font-black text-5xl text-white mb-4.5">어떤 운동을 가장 좋아하시나요?</h1>
                <p className="font-normal text-lg text-[#99A1AF] mb-12">선호하는 운동을 선택해주세요</p>
            </article>
        </>

    );
}