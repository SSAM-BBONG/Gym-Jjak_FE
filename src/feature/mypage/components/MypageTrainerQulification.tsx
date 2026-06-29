export default function MypageTrainerQulification( {data}) {
    return (
                    <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
                <div className="flex justify-between items-center">
                <p className="text-[20px] font-extrabold text-white"> 자격증 </p>
                    <button className="bg-[#364153] px-4 py-2 rounded-[10px] text-[16px] text-white font-medium"> + &nbsp; 추가 </button>
                </div>
                {data.certifications.map((item) => (
                    <div 
                        key={item.trainerCertificationId}
                        className="flex gap-3">
                      <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-[#FFFFFF80]"> {item.name} </p>
                      <button className="px-4 py- bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"> ✕ </button>
                    </div>
                ))}
            </div>
    );
}