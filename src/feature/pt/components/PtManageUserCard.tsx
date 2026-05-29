export default function PtManageUserCard() {
    return (
        <div className="
        flex gap-4 items-start
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex-1 size-24 border-[3px] border-[#6A7282] rounded-full"></div>
            <div className="flex flex-col gap-4 flex-9">
                <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-2">
                        <p className="text-[20px] font-black text-white"> 운동초보 </p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 최근 강습: 2026-05-15 </p>
                    </div>
                    <div className="px-4 py-1 border border-[#BFFF0B4D] bg-[#BFFF0B4D] rounded-full text-[12px] font-extrabold text-[#BFFF0B]"> 수강중 </div>
                </div>

                <div className="flex gap-6">
                    <div className="flex flex-3 flex-col gap-1 p-4 rounded-[10px] bg-[#1E293980]"> 
                        <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 </p>
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 3/12 </p>
                    </div>
                    <div className="flex flex-7 flex-col gap-1 p-4 rounded-[10px] bg-[#1E293980]"> 
                        <p className="text-[12px] font-normal text-[#6A7282]"> 완료율 </p>
                        <div className="flex h-2 rounded-full bg-[#364153]">
                                <p className="w-[30%] rounded-full bg-[#BFFF0B]"></p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="px-5 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 피드백 작성 </button>
                    <button className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white"> 채팅하기 </button>
                    <button className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white"> 신고 </button>
                    <select className="px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white appearance-none"> 
                        <option> 상태변경 </option>
                        <option> 수강중 </option>
                        <option> 예약됨 </option>
                        <option> 완료 </option>
                        <option> 취소 </option>
                        
                    </select>
                </div>
            </div>
        </div>
    );
}