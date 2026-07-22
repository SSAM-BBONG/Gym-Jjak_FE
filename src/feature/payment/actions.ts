"use server";

import { createPtPayment, createSubscriptionsPayment, getMyPlan, getPlan, getPtPurchaseStatus } from "@/service/payment.service";
import { AiPlanType, PtPaymentCreateData, PtPurchaseStatusData } from "./type";

type PaymentActionResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };

export const createPtPaymentAction = async (
  ptCourseId: number
): Promise<PaymentActionResult<PtPaymentCreateData>> => {
  try {
    const response = await createPtPayment(ptCourseId);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "PT 결제 요청에 실패하였습니다.",
    };
  }
};

export const getPtPurchaseStatusAction = async (
  ptCourseId: number
): Promise<PaymentActionResult<PtPurchaseStatusData>> => {
  try {
    const response = await getPtPurchaseStatus(ptCourseId);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "PT 구매 상태 조회에 실패하였습니다.",
    };
  }
};


export const createSubscriptionsPaymentAction = async (planType: AiPlanType) => {
  const payload = {
    planType
  }
  try {
    const response = await createSubscriptionsPayment(payload);

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "구독 결제 요청에 실패하였습니다.",
    };
  }
};

export const getPlanAction = async () => {
  try {
    const response = await getPlan();

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "구독 플랜 조회에 실패하였습니다.",
    };
  }
};

export const getMyPlanAction = async () => {
  try {
    const response = await getMyPlan();

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "내 구독 플랜 조회에 실패하였습니다.",
    };
  }
};