import { Complete, OrganApplicationDate, OrganBusinessInf, OrganUnderReview } from "@/components/ui/image";

export default function OrganizationApplicationCard() {
    return (
        <div className="flex flex-col px-40 pt-10 gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[36px] font-black text-white"> 조직 신청 내역 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 나의 조직 계정 신청 목록을 확인하세요 </p>
            </div>
            
            <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-6
            border border-[#36415380] rounded-[10px]
            ">
                <div className="flex justify-between">
                    <div className="flex gap-3">
                        <p className="text-[20px] font-extrabold text-white"> 을지대학교 헬스장</p>
                        <p className="flex gap-2 px-4 py-1 items-center bg-[#F0B1001A] rounded-full text-[12px] font-extrabold text-[#F0B100]"> 
                            <img src={OrganUnderReview} alt="조직 승인 내역 검토중"/>
                            검토중
                        </p>
                        <p className="flex gap-2 px-4 py-1 items-center bg-[#BFFF0B1A] rounded-full text-[12px] font-extrabold text-[#BFFF0B]">  
                            <img src={Complete} alt="조직 승인"/>
                            승인됨
                        </p>
                    </div>
                    <p className="text-[#6A7282] font-black"> 〉</p>
                </div>
                <div>
                    <p className="text-[14px] font-normal text-[#6A7282]"> 조직 ID : eulji_organ1</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-4">
                        <div className="flex gap-2 items-center">
                            <img src={OrganBusinessInf} alt="조직 신청 내역 사업자 정보"/>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 사업자 정보 </p>
                        </div>
                        <p className="text-[14px] font-extrabold text-white"> 1001098765 </p>
                        <p className="text-[12px] font-normal text-[#99A1AF]"> 대표 : 정지훈 </p>
                    </div>

                    <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-4">
                        <div className="flex gap-2 items-center">
                            <img src={OrganApplicationDate} alt="조직 신청 내역 신청 일시"/>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 신청 일시</p>
                        </div>
                        <p className="text-[14px] font-extrabold text-white"> 2026년 5월 18일 오후 07:33</p>
                    </div>
                </div>

                <div className="flex items-baseline gap-4 bg-[#F0B1001A] border border-[#F0B1004D] p-4 rounded-[10px]">
                    <img src={OrganUnderReview} alt="조직 신청 내역 검토중"/>
                    <div> 
                        <p className="text-[14px] text-[#FDC700] font-normal"> 검토 중</p>
                        <p className="text-[12px] text-[#D1D5DC] font-normal"> 영업일 기준 2~3일 소요되며, 결과는 이메일로 안내됩니다.</p>
                    </div>
                </div>
            </div>

            <div className="
            flex items-center justify-center gap-3
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-6
            border border-[#36415380] rounded-[10px]
            mb-20
            ">
                <p className="text-[16px] text-white font-extrabold"> 새로운 조직 계정 신청하기 </p>
                <p className="text-[#6A7282] font-black"> 〉</p>
            </div>
        </div>
    );
}