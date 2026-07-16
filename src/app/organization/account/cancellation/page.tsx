import { GymCanceliationDanger, GymCanceliationEmail, GymCanceliationPhone, GymCanceliationTime } from "@/components/ui/image";

export default function CancellationPage() {
    return (
        <div className="
            flex flex-col gap-4 items-center
            mx-auto w-100 p-6
            border border-[#1E2939] rounded-[16px] bg-[#101828]
            mt-20
            ">
            <div className="bg-[#FB2C361A] rounded-full w-16 y-16 p-4">
                <img src={GymCanceliationDanger}/>
            </div>
            <p className="text-[18px] text-white font-black"> 헬스장 해지 안내 </p>
            <p className="text-[14px] text-[#99A1AF] font-normal text-center"> 헬스장 계정 해지를 원하시면 <br/> 아래 연락처를 통해 관리자에게 직접 문의해주세요. </p>

            <div className="w-full border border-[#364153] bg-[#1E293999] rounded-[14px] px-6 py-4 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                    <img src={GymCanceliationPhone}/>
                    <div>
                        <p className="text-[10px] text-[#6A7282] font-normal"> 고객센터 전화</p>
                        <p className="text-[14px] text-white font-bold"> 1588-0000</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <img src={GymCanceliationEmail}/>
                    <div>
                        <p className="text-[10px] text-[#6A7282] font-normal"> 이메일 문의</p>
                        <p className="text-[14px] text-white font-bold"> gymjjack@gmail.com</p>
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <img src={GymCanceliationTime}/>
                    <div>
                        <p className="text-[10px] text-[#6A7282] font-normal"> 운영시간</p>
                        <p className="text-[14px] text-white font-bold"> 평일 09:00 ~ 18:00 </p>
                    </div>
                </div>
            </div>

            <p className="text-[12px] text-[#4A5565] font-normal"> 해지 시 모든 데이터가 삭제되어 복구가 불가능합니다.</p>
        </div>
    );
}