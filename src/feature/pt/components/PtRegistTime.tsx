export default function PtRegistTime() {
    return (
    <div className="
        flex flex-col gap-6
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        p-6
        ">
            <div className="flex justify-between items-center"> 
                <p className="text-[18px] font-extrabold text-white"> 수업 시간 </p>
                <button className="px-4 py-2 bg-[#364153] rounded-[10px] text-white text-[14px] font-medium">  + 시간 추가</button>
            </div>
            <div className="flex gap-3">
                    <select className="
                bg-[#1E2939]
                border border-[#364153] rounded-[10px]
                py-2
                px-8
                text-white
                ">
                        <option> 웙</option>
                        <option> 화</option>
                        <option> 수</option>
                        <option> 목</option>
                        <option> 금</option>
                        <option> 토</option>
                        <option> 일</option>
                    </select>
                    <select className="
                    flex-1
                    bg-[#1E2939]
                    border border-[#364153] rounded-[10px]
                    py-2
                    px-4
                text-white">
                        <option> 01:00</option>
                        <option> 02:00</option>
                        <option> 03:00</option>
                        <option> 04:00</option>
                        <option> 05:00</option>
                        <option> 06:00</option>
                        <option> 07:00</option>
                        <option> 08:00</option>
                        <option> 09:00</option>
                        <option> 10:00</option>
                        <option> 11:00</option>
                        <option> 12:00</option>
                        <option> 13:00</option>
                        <option> 14:00</option>
                        <option> 15:00</option>
                        <option> 16:00</option>
                        <option> 17:00</option>
                        <option> 18:00</option>
                        <option> 19:00</option>
                        <option> 20:00</option>
                        <option> 21:00</option>
                        <option> 22:00</option>
                        <option> 23:00</option>
                        <option> 24:00</option>
                    </select>
            </div>
        </div>
    );
}