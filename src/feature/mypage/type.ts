export interface OrganizationApplication {
  organizationApplicationId: number;
  businessName: string;
  requestedLoginId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  businessRegistrationNumber: string;
  representativeName: string;
  createdAt: string;
}

export interface OrganizationApplicationResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationApplication[];
}

export interface OrganizationApplicationCreateResponse {
  status: number;
  code: string;
  message: string;
  data?: OrganizationApplication;
}

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

export interface OrganizationApplicationDetailResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationApplicationDetail;
}

export interface MypageActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}
