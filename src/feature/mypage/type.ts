// 조직 신청 타입
export interface OrganizationApplication {
  organizationApplicationId: number;
  businessName: string;
  requestedLoginId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | 'CANCELED';
  businessRegistrationNumber: string;
  representativeName: string;
  createdAt: string;
}

// 조직 신청 응답 타입
export interface OrganizationApplicationResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationApplication[];
}

// 조직 신청시 응답 타입
export interface OrganizationApplicationCreateResponse {
  status: number;
  code: string;
  message: string;
  data?: OrganizationApplication;
}

// 조직 상세조회 타입 
export interface OrganizationApplicationDetail {
  organizationApplicationId: number;
  requestedLoginId: string;
  businessRegistrationNumber: string;
  businessName: string;
  representativeName: string;
  representativePhone: string;
  openingDate: string;
  roadAddress: string;
  jibunAddress: string;
  detailAddress: string;
  latitude: number;
  longitude: number;
  websiteUrl: string;
  instagramUrl: string;
  blogUrl: string;
  facilityPhone: string;
  businessLicenseFileUrl: string;
}

// 조직 상세조회 응답 타입
export interface OrganizationApplicationDetailResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationApplicationDetail;
}

// 액션 타입
export interface MypageActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}
