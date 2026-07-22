'use client'

import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import {
  createPtPaymentAction,
  getPtPurchaseStatusAction,
} from "@/feature/payment/actions";
import { createChatRoomAction } from "@/feature/chat/actions";
import PortOne from "@portone/browser-sdk/v2";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PURCHASE_STATUS_RETRY_INTERVAL_MS = 1_000;
const PURCHASE_STATUS_MAX_RETRY_COUNT = 10;

type PurchaseConfirmationResult =
  | { status: "purchased" }
  | { status: "pending" }
  | { status: "error"; message: string };

interface PtDetailReservationButtonProps {
  ptCourseId: number;
  title: string;
}

const PtReservationModal = dynamic(
  () => import("./PtReservationModal"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50">
        <p className="text-white">예약 화면을 불러오는 중입니다...</p>
      </div>
    ),
  },
);

export default function PtDetailButton({
  title,
  ptCourseId,
}: PtDetailReservationButtonProps) {
  const reservationModal = useModal();
  const resultModal = useModal();
  const chatErrorModal = useModal();
  const router = useRouter();
  const [isPurchased, setIsPurchased] = useState(false);
  const [isPurchaseStatusLoading, setIsPurchaseStatusLoading] = useState(true);
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false);
  const [isPaymentPending, setIsPaymentPending] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [chatErrorMessage, setChatErrorMessage] = useState("");
  const [resultModalState, setResultModalState] = useState({
    title: "",
    content: "",
  });

  const showResultModal = (modalTitle: string, content: string) => {
    setResultModalState({ title: modalTitle, content });
    resultModal.openModal();
  };

  const fetchPurchaseStatus = async () => {
    const result = await getPtPurchaseStatusAction(ptCourseId);

    if (result.success) {
      setIsPurchased(result.data.isPurchased);
    }

    return result;
  };

  const confirmPurchaseStatus = async (): Promise<PurchaseConfirmationResult> => {
    for (
      let retryCount = 0;
      retryCount < PURCHASE_STATUS_MAX_RETRY_COUNT;
      retryCount += 1
    ) {
      const result = await fetchPurchaseStatus();

      if (!result.success) {
        return { status: "error", message: result.message };
      }

      if (result.data.isPurchased) {
        setIsPaymentPending(false);
        return { status: "purchased" };
      }

      await new Promise((resolve) => {
        window.setTimeout(resolve, PURCHASE_STATUS_RETRY_INTERVAL_MS);
      });
    }

    return { status: "pending" };
  };

  useEffect(() => {
    const initializePurchaseStatus = async () => {
      try {
        await fetchPurchaseStatus();
      } finally {
        setIsPurchaseStatusLoading(false);
      }
    };

    initializePurchaseStatus();
  }, [ptCourseId]);

  const handlePayment = async () => {
    const storeId = process.env.NEXT_PUBLIC_PORTONE_STORE_ID;
    const channelKey = process.env.NEXT_PUBLIC_PORTONE_CHANNEL_KEY;

    if (!storeId || !channelKey) {
      showResultModal(
        "결제 설정 오류",
        "포트원 결제 설정을 확인해주세요."
      );
      return;
    }

    try {
      setIsPaymentSubmitting(true);

      const paymentReadyResult = await createPtPaymentAction(ptCourseId);

      if (!paymentReadyResult.success) {
        showResultModal("결제 요청 실패", paymentReadyResult.message);
        return;
      }

      const paymentResponse = await PortOne.requestPayment({
        storeId,
        channelKey,
        paymentId: paymentReadyResult.data.orderId,
        orderName: title,
        totalAmount: paymentReadyResult.data.amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        easyPay: {
          easyPayProvider: "EASY_PAY_PROVIDER_TOSSPAY",
        },
      });

      if (!paymentResponse || paymentResponse.code !== undefined) {
        showResultModal(
          "결제가 완료되지 않았습니다.",
          paymentResponse?.message ?? "결제가 취소되었습니다."
        );
        return;
      }

      setIsPaymentPending(true);

      const purchaseConfirmation = await confirmPurchaseStatus();

      if (purchaseConfirmation.status === "error") {
        showResultModal("결제 확인 실패", purchaseConfirmation.message);
        return;
      }

      if (purchaseConfirmation.status === "pending") {
        showResultModal(
          "결제 확인 중",
          "결제는 완료되었습니다. 잠시 후 결제 상태를 다시 확인해주세요."
        );
        return;
      }

      showResultModal("결제 완료", "PT 결제가 완료되었습니다.");
    } catch (error) {
      showResultModal(
        "결제 오류",
        error instanceof Error
          ? error.message
          : "결제 처리 중 오류가 발생했습니다."
      );
    } finally {
      setIsPaymentSubmitting(false);
    }
  };

  const handlePurchaseStatusRetry = async () => {
    try {
      setIsPaymentSubmitting(true);

      const purchaseConfirmation = await confirmPurchaseStatus();

      if (purchaseConfirmation.status === "error") {
        showResultModal("결제 확인 실패", purchaseConfirmation.message);
        return;
      }

      if (purchaseConfirmation.status === "pending") {
        showResultModal(
          "결제 확인 중",
          "아직 결제 처리가 완료되지 않았습니다. 잠시 후 다시 확인해주세요."
        );
        return;
      }

      showResultModal("결제 완료", "PT 결제가 완료되었습니다.");
    } finally {
      setIsPaymentSubmitting(false);
    }
  };

  const handleChatClick = async () => {
    if (isCreatingChat) return;

    setIsCreatingChat(true);

    try {
      const result = await createChatRoomAction({ ptCourseId });

      if (!result.success) {
        setChatErrorMessage(result.message);
        chatErrorModal.openModal();
        return;
      }

      router.push(`/chat/${result.data.chatRoomId}`);
    } finally {
      setIsCreatingChat(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {isPurchaseStatusLoading ? (
          <button
            type="button"
            disabled
            className="py-4 rounded-[14px] bg-[#1E2939] text-[16px] font-extrabold text-white opacity-60"
          >
            구매 상태 확인 중...
          </button>
        ) : isPurchased ? (
          <button
            data-testid="reservation-open-button"
            type="button"
            onClick={reservationModal.openModal}
            className="py-4 rounded-[14px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:text-black hover:bg-[#BFFF0B]"
          >
            예약하기
          </button>
        ) : isPaymentPending ? (
          <button
            type="button"
            onClick={handlePurchaseStatusRetry}
            disabled={isPaymentSubmitting}
            className="py-4 rounded-[14px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:text-black hover:bg-[#BFFF0B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPaymentSubmitting ? "결제 상태 확인 중..." : "결제 상태 다시 확인"}
          </button>
        ) : (
          <button
            data-testid="payment-open-button"
            type="button"
            onClick={handlePayment}
            disabled={isPaymentSubmitting}
            className="py-4 rounded-[14px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:text-black hover:bg-[#BFFF0B] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPaymentSubmitting ? "결제 요청 중..." : "결제하기"}
          </button>
        )}

        <button
          type="button"
          onClick={handleChatClick}
          disabled={isCreatingChat}
          className="py-4 rounded-[14px] bg-[#1E2939] text-[16px] font-extrabold text-white hover:text-black hover:bg-[#BFFF0B] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isCreatingChat ? "채팅방 생성 중..." : "채팅하기"}
        </button>
      </div>

      {reservationModal.isModal && (
        <PtReservationModal
          ptCourseId={ptCourseId}
          isModal={reservationModal.isModal}
          closeModal={reservationModal.closeModal}
          activeModal={reservationModal.activeModal}
          noneActiveModal={reservationModal.noneActiveModal}
          title={title}
        />
      )}

      <OneButtonModal
        isModal={resultModal.isModal}
        closeModal={resultModal.closeModal}
        title={resultModalState.title}
        content={resultModalState.content}
      />
      <OneButtonModal
        isModal={chatErrorModal.isModal}
        closeModal={chatErrorModal.closeModal}
        title="채팅방 생성 실패"
        content={chatErrorMessage}
      />
    </>
  );
}
