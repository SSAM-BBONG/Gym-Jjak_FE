import Link from "next/link";
import { ChartNoAxesCombined } from "lucide-react";

export default function TrainerMarketReportCard() {
  return (
    <Link
      href="/pt/reports"
      className="flex flex-col items-start gap-3 rounded-[16px] border border-[#36415380] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)] p-6 hover:border-[#BFFF0B66] hover:bg-[linear-gradient(135deg,rgba(191,255,11,0.20)0%,rgba(168,230,0,0.10)100%)]"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#BFFF0B1A] text-[#BFFF0B]">
        <ChartNoAxesCombined size={25} strokeWidth={2.2} aria-hidden />
      </div>
      <p className="text-[24px] font-black text-white">트레이너 리포트</p>
      <p className="text-[14px] text-[#D1D5DC]">월별 시장 동향을 확인하세요.</p>
      <p className="text-[14px] font-extrabold text-[#99A1AF]">리포트 보기 →</p>
    </Link>
  );
}
