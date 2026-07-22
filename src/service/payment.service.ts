import {
  PtPaymentCreateResponse,
  PtPaymentCreateRequest,
  PtPurchaseStatusResponse,
} from "@/feature/payment/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const createPtPayment = async (
  ptCourseId: number
): Promise<PtPaymentCreateResponse> => {
  const payload: PtPaymentCreateRequest = { ptCourseId };

  const response = await fetchWithAuth("/api/payments/pt", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "PT 결제 요청에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

export const getPtPurchaseStatus = async (
  ptCourseId: number
): Promise<PtPurchaseStatusResponse> => {
  const response = await fetchWithAuth(
    `/api/payments/pt-courses/${ptCourseId}/my-status`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "PT 구매 상태 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};
