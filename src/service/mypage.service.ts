import {
  OrganizationApplicationCreateResponse,
  OrganizationApplicationDetailResponse,
  OrganizationApplicationResponse,
} from "@/feature/mypage/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";
import { cache } from "react";

// 조직 계정 신청 목록 조회 API
export const getOrganizationApplications = cache(async (): Promise<OrganizationApplicationResponse> => {
  const response = await fetchWithAuth("/api/organization-applications/me");

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 목록 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
});

// 조직 계정 신청 상세 조회 API
export const getOrganizationApplication = cache(async (applicationId: string): Promise<OrganizationApplicationDetailResponse> => {
  const response = await fetchWithAuth(`/api/organization-applications/${applicationId}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 상세 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
});

// 조직 계정 신청 등록 API
export const createOrganizationApplication = async (formData: FormData): Promise<OrganizationApplicationCreateResponse> => {
  const response = await fetchWithAuth("/api/organization-applications", {
    method: "POST",
    body: formData,
  }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 등록에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};
