import { Sparkles } from "lucide-react";

export default function AiAnswerScope() {
    return (
        <section className="w-full rounded-[16px] border border-[#36415380] bg-[#101828] p-8 mt-24">
            <h3 className="flex items-center gap-2 text-[20px] text-white font-extrabold">
                <Sparkles size={18} className="text-[#BFFF0B]" />
                AI 챗봇 답변 범위
            </h3>
            <div className="flex gap-5 mt-6">
                <div className="w-full rounded-[12px] bg-[#1E2939] p-6">
                    <p className="text-[15px] text-[#BFFF0B] font-extrabold">가능</p>
                    <div className="flex flex-col gap-2 mt-4">
                        {["서비스·환불·고객센터 정책", "결제 내역 / 잔여 PT / PT 이력", "내 운동기록 기반 루틴 추천", "오늘 식단 기반 한줄평"].map((item) => (
                            <p key={item} className="text-[14px] text-[#99A1AF] font-normal">· {item}</p>
                        ))}
                    </div>
                </div>
                <div className="w-full rounded-[12px] bg-[#1E2939] p-6">
                    <p className="text-[15px] text-[#BFFF0B] font-extrabold">답변 한계</p>
                    <div className="flex flex-col gap-2 mt-4">
                        {["서비스와 무관한 질문", "개인 의료 조언 요청", "구독 혜택 외 세부 정책 심화 상담", "PT 중도 해약 분쟁 등은 고객센터 기준으로 안내"].map((item) => (
                            <p key={item} className="text-[14px] text-[#99A1AF] font-normal">· {item}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
