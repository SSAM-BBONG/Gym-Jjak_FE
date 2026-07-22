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
