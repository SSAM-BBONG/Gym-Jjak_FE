// 조직 신청 요청 타입
export interface OrganizationApplicationRequest {
  businessLicenseFile: OrganizationBusineesLicenseFile;
  requestedLoginId: string;
  businessRegistrationNumber: string;
  businessName: string;
  representativeName: string;
  representativePhone: string;
  openingDate: string;
  roadAddress: string;
  jibunAddress?: string;
  detailAddress?: string;
  latitude?: number;
  longitude?: number;
  websiteUrl?: string 
  instagramUrl?: string 
  blogUrl?: string; 
  facilityPhone?: string 
}

export interface OrganizationBusineesLicenseFile {
    fileKey: string;
    originalName: string;
    contentType: string;
    fileSize: number;
}

// 조직 신청 목록 조회 응답 타입
export interface OrganizationApplicationResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationApplicationRequest[];
}

// 조직 신청 응답 타입
export interface OrganizationApplicationCreateResponse {
  status: number;
  code: string;
  message: string;
  data: {
    organizationApplicationId: number;
  }
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
  businessLicenseOriginalName: string;
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
