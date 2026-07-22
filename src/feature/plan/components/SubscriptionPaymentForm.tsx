"use client";

import {
    createSubscriptionsPaymentAction,
    getMyPlanAction,
} from "@/feature/payment/actions";
import type { AiPlanType } from "@/feature/payment/type";
import PortOne from "@portone/browser-sdk/v2";
import { ChevronRight, CreditCard } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import { toast } from "sonner";

interface SubscriptionPaymentFormProps {
    children: ReactNode;
}

const delay = (ms: number) =>
    new Promise<void>((resolve) => {
        window.setTimeout(resolve, ms);
    });

const waitForSubscription = async () => {
    const maxAttempts = 5;

    for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
        const result = await getMyPlanAction();

        if (result.success && result.data?.status === "ACTIVE") {
            return result.data;
        }

        await delay(1000);
    }

    return null;
};

const planNames: Record<AiPlanType, string> = {
    MONTHLY: "AI 월간 구독",
    YEARLY: "AI 연간 구독",
};

export default function SubscriptionPaymentForm({
    children,
}: SubscriptionPaymentFormProps) {
    const [isPending, setIsPending] = useState(false);

    const handlePayment = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isPending) return;

        const formData = new FormData(event.currentTarget);
        const selectedPlanType = formData.get("planType");

        if (selectedPlanType !== "MONTHLY" && selectedPlanType !== "YEARLY") {
            toast.error("구독 플랜을 선택해주세요.");
            return;
        }

        const planType: AiPlanType = selectedPlanType;
        const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
        const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

        if (!storeId || !channelKey) {
            toast.error("PortOne 결제 설정을 확인해주세요.");
            return;
        }

        try {
            setIsPending(true);

            const readyResult = await createSubscriptionsPaymentAction(planType);

            if (!readyResult.success) {
                toast.error(readyResult.message);
                return;
            }

            const paymentResponse = await PortOne.requestPayment({
                storeId,
                channelKey,
                paymentId: readyResult.data.orderId,
                orderName: planNames[planType],
                totalAmount: readyResult.data.amount,
                currency: "CURRENCY_KRW",
                payMethod: "EASY_PAY",
                easyPay: {
                    easyPayProvider: "EASY_PAY_PROVIDER_TOSSPAY",
                },
            });

            if (!paymentResponse) {
                toast.error("결제가 완료되지 않았습니다.");
                return;
            }

            if (paymentResponse.code !== undefined) {
                toast.error(paymentResponse.message ?? "결제에 실패했습니다.");
                return;
            }

            const myPlanResult = await waitForSubscription();

            if (!myPlanResult) {
                toast.info(
                    "결제는 완료됐지만 구독 정보를 처리하고 있습니다. 잠시 후 다시 확인해주세요."
                );
                return;
            }

            toast.success("구독 결제가 완료되었습니다.");
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "결제 처리 중 오류가 발생했습니다."
            );
        } finally {
            setIsPending(false);
        }
    };

    return (
        <form
            className="w-full flex flex-col items-center mt-28"
            onSubmit={handlePayment}
        >
            {children}
            <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-3 mt-8 py-6 rounded-[16px] bg-[#BFFF0B] text-black text-[24px] font-black disabled:cursor-not-allowed disabled:opacity-60"
            >
                <CreditCard size={28} />
                {isPending ? "결제 처리 중..." : "구독 시작"}
                <ChevronRight size={30} />
            </button>
            <p className="text-[16px] text-[#6A7282] font-normal mt-8">
                언제든지 해지 가능 · 자동 갱신 · 부가세 포함
            </p>
        </form>
    );
}
