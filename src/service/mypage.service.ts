import {
  MyPagePasswordCheck,
  MyPageUserDelection,
  OrganizationApplicationCreateResponse,
  OrganizationApplicationDetailResponse,
  OrganizationApplicationRequest,
  OrganizationApplicationResponse,
  OrganizationManageEditRequest,
  OrganizationManageResponse,
  OrganizationManageTrainerAdd,
  OrganizationManageTrainerAddData,
  OrganizationManageTrainerDeleteResponse,
  OrganizationManageTrainerSearchReqeust,
  OrgnaizationManageTrainerSearchResponse,
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

// 조직 신청 취소 API 
export const organizationApplicationCancel = async (applicationId: number) => {
  const response = await fetchWithAuth(`/api/organization-applications/${applicationId}/cancel`,{
    method: "PATCH",
    }
  )

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '조직 계정 신청 취소에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
}

// 내 조직 정보 조회 API
export const getOrganizationManageInformation = async (): Promise<OrganizationManageResponse> => {
  const response = await fetchWithAuth(`/api/organizations/me`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '내 조직 정보 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
}

// 내 조직 정보 수정 API
export const editOrganizationManageInformation = async (
  payload: OrganizationManageEditRequest
): Promise<OrganizationManageResponse> => {
  const response = await fetchWithAuth(`/api/organizations/me`, {
    method: "PATCH",
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '내 조직 정보 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
}

// 내 조직 트레이너 추가 API
export const addOrganizationManageTrainer = async (
  trainerProfileId: OrganizationManageTrainerAddData
): Promise<OrganizationManageTrainerAdd> => {
  const response = await fetchWithAuth(`/api/organizations/me/trainers`, {
    method: "POST",
    body: JSON.stringify(trainerProfileId)
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '내 조직 정보 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
}

// 내 조직 트레이너 검색 API 
export const getOraganizationsearchTrainers = async ({
  keyword,
  page = 0,
  size = 10,
}: OrganizationManageTrainerSearchReqeust = {}): Promise<OrgnaizationManageTrainerSearchResponse> => {
  const params = new URLSearchParams();

  if (keyword?.trim()) {
    params.set("keyword", keyword.trim());
  }

  params.set("page", String(page));
  params.set("size", String(size));

  const response = await fetchWithAuth(`/api/trainers/search?${params.toString()}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "트레이너 검색에 실패했습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 내 조직 트레이너 목록 조회 API 
export const getOraganizationTrainerLists = async () => {
  const response = await fetchWithAuth(`/api/organizations/me/trainers`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '내 조직 정보 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 내 조직 트레이너 목록 조회 API 
export const deleteOraganizationTrainer = async (
  organizationTrainerId: number
): Promise<OrganizationManageTrainerDeleteResponse> => {
  const response = await fetchWithAuth(
    `/api/organizations/me/trainers/${organizationTrainerId}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '트레이너 삭제에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 비밀번호 확인 API
export const checkPassword = async (password: string): Promise<MyPagePasswordCheck> => {
  const response = await fetchWithAuth(
    `/api/users/me/password-verification`,
    {
      method: "POST",
      body: JSON.stringify({password})
    }
  );

  if (!response.ok) {
  const message = await getErrorMessage(
    response,
    '비밀번호 확인에 실패하였습니다.'
  );

    throw new Error(message);
  }

  return response.json();
}

// 회원탈퇴 APi
export const deleteMyAccount = async (): Promise<MyPageUserDelection> => {
  const response = await fetchWithAuth(
    `/api/users/me`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
  const message = await getErrorMessage(
    response,
    '회원탈퇴에 실패하였습니다..'
  );

    throw new Error(message);
  }

  return response.json();
}


