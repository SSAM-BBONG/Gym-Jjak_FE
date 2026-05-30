import {
  OrganizationApplicationCreateResponse,
  OrganizationApplicationDetailResponse,
  OrganizationApplicationResponse,
} from "@/feature/mypage/type";
import { axiosFetch } from "@/lib/api";

// 조직 계정 신청 목록 조회 API
export const getOrganizationApplications = async (): Promise<OrganizationApplicationResponse> => {
    const response = await axiosFetch.get("/api/organization-applications/me");
    return response.data;
  };

// 조직 계정 신청 상세 조회 API
export const getOrganizationApplication = async (applicationId: string): Promise<OrganizationApplicationDetailResponse> => {
  const response = await axiosFetch.get(
    `/api/organization-applications/${applicationId}`);
  return response.data;
};

// 조직 계정 신청 등록 API
export const createOrganizationApplication = async (formData: FormData): Promise<OrganizationApplicationCreateResponse> => {
  const response = await axiosFetch.post( "/api/organization-applications",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
