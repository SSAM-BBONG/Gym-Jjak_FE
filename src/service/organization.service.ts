import {
  OrganizationSalesResponse,
  OrganizationStatsResponse,
  OrganizationTrainerStatsResponse,
} from "@/feature/organization/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const getOrganizationStats = async (): Promise<OrganizationStatsResponse> => {
  const response = await fetchWithAuth("/api/dashboard/organization/stats", {
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "헬스장 통계 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

export const getOrganizationSales = async (): Promise<OrganizationSalesResponse> => {
  const response = await fetchWithAuth("/api/dashboard/organization/sales", {
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "매출 관리 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

export const getOrganizationTrainerStats = async (): Promise<OrganizationTrainerStatsResponse> => {
  const response = await fetchWithAuth(
    "/api/dashboard/organization/trainers/clients",
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "트레이너별 통계 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};
