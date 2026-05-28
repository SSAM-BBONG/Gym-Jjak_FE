export default function TrainerReviewCard() {
    return (
        <div className="
        flex flex-col gap-5
        bg-[#101828]
        border border-[#36415380] rounded-[16px]
        p-8">
            <div className="flex items-start gap-3">
                <p className="px-3 py-2 text-[14px] font-extrabold text-white bg-[#1E2939] rounded-full"> 운</p>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <p className="text-[16px] font-extrabold text-white"> 운동초보 </p>
                            <p className="px-3 py-1 bg-[#1E2939] rounded-[4px] text-[12px] font-normal text-[#99A1AF]"> 체계적 근육 강화 PT과정 </p>
                        </div>
                        <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-10</p>
                    </div>
                    <p className="text-[#BFFF0B]"> ★★★★★★ </p>
                    <p className="text-[16px] font-normal text-[#D1D5DC]"> 정말 체계적으로 가르쳐주십니다. 3개월만에 몸이 확실히 달라졌어요! 트레이너님이 자세 하나하나 세심하게 봐주시고, 식단도 관리해주셔서 정말 만족스럽습니다. </p>
                </div>
            </div>
        </div>
    );
}