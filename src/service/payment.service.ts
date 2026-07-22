import {
  AiPlanRequest,
  PtPaymentCreateResponse,
  PtPurchaseStatusResponse,
} from "@/feature/payment/type";
import { fetchWithAuth, fetchWithoutAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const createPtPayment = async (
  ptCourseId: number
): Promise<PtPaymentCreateResponse> => {
  const response = await fetchWithAuth("/api/payments/pt", {
    method: "POST",
    body: JSON.stringify({ ptCourseId }),
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


export const createSubscriptionsPayment = async (planType: AiPlanRequest) => {
  const response = await fetchWithAuth("/api/payments/subscriptions", {
    method: "POST",
    body: JSON.stringify(planType),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "구독 결제 요청에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

export const getPlan = async () => {
  const response = await fetchWithoutAuth('/api/subscriptions/plans');

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "구독 플랜 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};


export const getMyPlan = async () => {
  const response = await fetchWithAuth('/api/subscriptions/me');

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "내 구독 플랜 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};


