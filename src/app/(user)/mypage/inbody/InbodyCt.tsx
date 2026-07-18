export default function InbodyCt() {
    return (
        <div className=" p-4 rounded-md bg-[#1E2939] border-[#364153] border mb-3">
            <div className="flex justify-between">
                <p className="font-normal text-[#99A1AF] text-sm">2026-05-18</p>
                <p className="text-black text-[12px] bg-[#BFFF0B] font-bold py-1 px-2 rounded-xl">최신</p>
            </div>
            <div className="flex gap-4 mb-3">
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        키
                    </p>
                    <p className="text-sm font-bold text-white" >15</p>
                </div>
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        몸무게
                    </p>
                    <p className="text-sm font-bold text-white" >15</p>
                </div>
            </div>
            <div className="flex gap-4 mb-3">
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        체지방률
                    </p>
                    <p className="text-sm font-bold text-white" >15</p>
                </div>
                <div className="w-full">
                    <p className="text-[#6A7282] text-sm font-normal">
                        골격근량
                    </p>
                    <p className="text-sm font-bold text-white" >15</p>
                </div>
            </div>
            <div className="w-full">
                <p className="text-[#6A7282] text-sm font-normal">
                    BMI
                </p>
                <p className="text-sm font-bold text-[#FDC700]" >24.2 (과체중)</p>
            </div>
            <button className="w-full">
                <p className="text-[#6A7282] text-end text-sm font-normal">
                    더보기 →
                </p>
            </button>
        </div>
    );
}