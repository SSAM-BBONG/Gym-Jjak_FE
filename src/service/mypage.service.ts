import {
  OrganizationApplicationCreateResponse,
  OrganizationApplicationDetailResponse,
  OrganizationApplicationRequest,
  OrganizationApplicationResponse,
} from "@/feature/mypage/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

// 조직 계정 신청 목록 조회 API
export const getOrganizationApplications = async (): Promise<OrganizationApplicationResponse> => {
  const response = await fetchWithAuth("/api/organization-applications/me");

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 목록 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 조직 계정 신청 상세 조회 API
export const getOrganizationApplication = async (applicationId: string): Promise<OrganizationApplicationDetailResponse> => {
  const response = await fetchWithAuth(`/api/organization-applications/${applicationId}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 상세 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 조직 계정 신청 등록 API
export const createOrganizationApplication = async (
  payload: OrganizationApplicationRequest
): Promise<OrganizationApplicationCreateResponse> => {
  const response = await fetchWithAuth("/api/organization-applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 등록에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 조직 계정 신청 아이디 중복 확인 API
export const organizationApplicationDupliCationId = async ( 
  loginId : string
) => {
  const params = new URLSearchParams({
    requestedLoginId: loginId,
  });
  const response = await fetchWithAuth(`/api/organization-applications/login-id/duplicate?${params.toString()}`)

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '아이디 중복 확인에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
}