export default function PtRegistCurriculum() {
    return (
    <div className="
        flex flex-col gap-6
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex justify-between items-center"> 
                <p className="text-[18px] font-extrabold text-white"> 커리큘럼 </p>
                <button className="px-4 py-2 bg-[#364153] rounded-[10px] text-white text-[14px] font-medium">  + 회차 추가</button>
            </div>
            <div className="
            flex flex-col gap-6
            bg-[#1E2939]
            rounded-[10px]
            p-4"> 
                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 1회차 </p>
                <div className="flex flex-col gap-4">
                    <input 
                        className="
                        bg-[#101828]
                        border border-[#364153] rounded-[10px]
                        px-3 py-2
                        text-[14px] font-normal text-white"
                        type="text" 
                        placeholder="회차 제목"/>
                    <textarea 
                        className="
                        bg-[#101828]
                        border border-[#364153] rounded-[10px]
                        px-3 py-2
                        text-[14px] font-normal text-white"    
                        placeholder="회차 설명"/>
                </div>
            </div>
        </div>
    );
} 