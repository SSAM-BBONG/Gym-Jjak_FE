import type { MyPaymentHistoryItem } from "../type";
import { CreditCard, ReceiptText } from "lucide-react";
import { format } from "date-fns";

interface MyPaymentHistoryProps {
  payments: MyPaymentHistoryItem[];
}

const productLabels = {
  PT: "PT 강습",
  SUBSCRIPTIONS: "AI 구독",
} as const;

const statusStyles = {
  PENDING: { label: "처리 중", className: "bg-[#FEF3C7] text-[#B45309]" },
  PAID: { label: "결제 완료", className: "bg-[#DCFCE7] text-[#15803D]" },
  CANCELLED: { label: "결제 취소", className: "bg-[#E5E7EB] text-[#4B5563]" },
  FAILED: { label: "결제 실패", className: "bg-[#FEE2E2] text-[#DC2626]" },
} as const;

export default function MyPaymentHistory({ payments }: MyPaymentHistoryProps) {
  if (payments.length === 0) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-[16px] border border-[#36415380] bg-[#101828] px-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#1E2939] text-[#BFFF0B]">
          <ReceiptText size={24} />
        </div>
        <h2 className="text-[18px] font-bold text-white">결제 내역이 없습니다</h2>
        <p className="mt-2 text-[14px] text-[#99A1AF]">PT 강습 또는 AI 구독 결제 내역이 여기에 표시됩니다.</p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-3">
      {payments.map((payment, index) => {
        const status = statusStyles[payment.status];

        return (
          <li
            key={`${payment.productType}-${payment.itemName}-${payment.processedAt ?? "pending"}-${index}`}
            className="flex flex-col gap-4 rounded-[16px] border border-[#36415380] bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#BFFF0B] text-[#101828]">
                <CreditCard size={22} />
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[#364153] px-2 py-1 text-[11px] font-bold text-[#D1D5DC]">
                    {productLabels[payment.productType]}
                  </span>
                  <span className={`rounded-full px-2 py-1 text-[11px] font-bold ${status.className}`}>
                    {status.label}
                  </span>
                </div>
                <p className="truncate text-[16px] font-bold text-white">{payment.itemName}</p>
                <time className="mt-1 block text-[13px] text-[#99A1AF]">{(payment.processedAt)?.split("T")[0]}</time>
              </div>
            </div>
            <p className="shrink-0 text-right text-[18px] font-extrabold text-white">
              {payment.amount.toLocaleString("ko-KR")}원
            </p>
          </li>
        );
      })}
    </ul>
  );
}
