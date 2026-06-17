export default function DetailTop() {
    return (
        <div
            // style={{
            //     backgroundImage: `
            //     linear-gradient(0deg, #000 0%, rgba(0,0,0,0.60) 50%, rgba(0,0,0,0.00) 100%),
            //     url(${response.data.thumbnailUrl})
            // `,
            // }}
            className="
                h-100 
                flex flex-col justify-end 
                bg-cover bg-center bg-no-repeat bg-gray-300
                rounded-[14px]  
                p-6">
            <p className="text-[36px] font-black text-white"> 제목 </p>
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="text-[#BFFF0B] text-[20px]"> ★ </div>
                    <p className="text-[18px] font-extrabold text-white">
                        4.7  <span className="text-[14px] font-normal text-[#99A1AF]">(4개)</span>
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-[36px] font-black text-[#BFFF0B]"> 40,000원</p>
                    <p className="text-[14px] font-normal text-[#99A1AF] text-right"> 신청 가능 인원: 10 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF] text-right"> 진행 기간: 4주</p>
                </div>
            </div>
        </div>
    );
}