import { getMyPaymentHistoryAction } from "@/feature/mypage/actions";
import MyPaymentHistory from "@/feature/mypage/components/MyPaymentHistory";
import { CircleAlert } from "lucide-react";

export default async function MyPaymentsPage() {
  const result = await getMyPaymentHistoryAction();

  return (
    <main className="flex flex-col px-6 pb-12 pt-10 sm:px-12 lg:px-40">
      <h1 className="text-[36px] font-black text-white">내 결제 내역</h1>
      <p className="mt-1 text-[14px] font-normal text-[#99A1AF]">
        PT 강습과 AI 구독 결제 내역을 확인하세요
      </p>

      <section className="mt-8">
        {result.success ? (
          <MyPaymentHistory payments={result.data.payments} />
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-[16px] border border-[#7F1D1D] bg-[#101828] px-6 text-center">
            <CircleAlert className="mb-4 text-[#FF6467]" size={28} />
            <h2 className="text-[18px] font-bold text-white">결제 내역을 불러오지 못했습니다</h2>
            <p className="mt-2 text-[14px] text-[#99A1AF]">{result.message}</p>
          </div>
        )}
      </section>
    </main>
  );
}
