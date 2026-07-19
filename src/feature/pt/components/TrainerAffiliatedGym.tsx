export default function TrainerAffiliatedGym() {
    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
            <div className="flex flex-col gap-1">
                <p className="text-[20px] font-extrabold text-white"> 소속 헬스장 </p>
                <p className="text-[12px] font-normal text-[#6A7282]"> 소속될 헬스장을 검색하여 추가하세요. 여러 헬스장을 선택할 수 있습니다. </p>
            </div>
        
        <div className="w-full">
            <input
                placeholder="ex): 건강운동관리사"
                name="qulification"
                className="w-full bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white placeholder:text-[#FFFFFF80]"
            />
            <div>
                <div>
                    <img />
                    <div>
                        <p> 헬스장 이름</p>
                        <p> 헬스장 위치</p>
                    </div>
                </div>
            </div>
          </div>
    </div>
    );
}