export default function ReviewPreview() {
    return (
        <div className="flex flex-col gap-1 py-6 border-b border-b-[#364153]">
            <div className="flex justify-between">
                <p className="text-[14px] font-extrabold text-white"> 운동초보 </p>
                <p className="text-[12px] font-normal text-[#6A7282]"> 2026-05-10 </p>
            </div>
            <div className="text-[#BFFF0B]">
                ★★★☆☆
            </div>
            <div className="text-[12px] font-normal text-[#D1D5DC]">
                정말 체계적으로 가르쳐주십니다. 3개월만에 몸이 확실히 달라졌어요! 친절하고 자세 교정을 정말 세심하게 해주셔서 부상 없이 운동할 수 있었습니다.
            </div>
        </div>
    );
}