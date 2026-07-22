import { BarChart3 } from "lucide-react";

export default function ReportFeatureCard() {
    return (
        <article className="w-full rounded-[16px] border border-[#36415380] bg-[#101828] p-8">
            <div className="flex items-center gap-5">
                <div className="flex items-center justify-center w-14 h-14 rounded-[14px] bg-[#1E2939] text-[#BFFF0B]">
                    <BarChart3 size={28} />
                </div>
                <div className="w-full">
                    <h3 className="text-[24px] text-white font-extrabold">트레이너 시장동향 리포트</h3>
                    <p className="text-[15px] text-[#6A7282] font-normal mt-1">트레이너·조직 계정 전용</p>
                </div>
            </div>
            <p className="text-[16px] text-[#99A1AF] font-normal leading-8 mt-7">
                서비스 데이터를 기반으로 내 PT 상품을 시장과 비교, 가격·회차·인기 부위 트렌드를 읽기 쉬운 리포트로 정기 발송합니다.
            </p>
            <div className="flex gap-4 mt-7">
                {["인기 부위·가격대·평균 회차 시장 리포트", "내 PT 상품 vs 시장 비교 포지셔닝 조언", "정기 자동 발송"].map((item) => (
                    <p key={item} className="w-full flex items-center gap-3 rounded-[12px] bg-[#1E2939] px-5 py-4 text-[15px] text-[#D1D5DC] font-normal">
                        <BarChart3 size={18} className="text-[#BFFF0B]" />
                        {item}
                    </p>
                ))}
            </div>
        </article>
    );
}
