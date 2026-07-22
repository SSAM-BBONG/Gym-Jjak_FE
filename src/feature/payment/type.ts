export interface PtPaymentCreateRequest {
  ptCourseId: number;
}

export interface PtPaymentCreateData {
  orderId: string;
  amount: number;
}

export interface PtPaymentCreateResponse {
  status: number;
  code: string;
  message: string;
  data: PtPaymentCreateData;
}

export interface PtPurchaseStatusData {
  isPurchased: boolean;
}

export interface PtPurchaseStatusResponse {
  status: number;
  code: string;
  message: string;
  data: PtPurchaseStatusData;
}


export type AiPlanType = 'MONTHLY' | 'YEARLY';

export interface AiPlan {
  planType: AiPlanType;
  price: number;
}

export interface AiPlans {
  plans: AiPlan[];
}

export interface MyPlan {
  planType: AiPlanType;
  status: "ACTIVE" | "EXPIRED";
  startedAt: string;
  expiredAt: string;
}

export interface AiPlanRequest {
  planType: AiPlanType;
}

