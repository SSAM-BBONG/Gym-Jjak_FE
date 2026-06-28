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
  data: OrganizationApplicationListData[];
}

// 조직 신청 목록 조회 데이터 응답 타입
export interface OrganizationApplicationListData {
  organizationApplicationId: number;
  businessName: string;
  requestedLoginId: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";
  businessRegistrationNumber: string;
  representativeName: string;
  createdAt: string;
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

// 내 조직 정보 조회 응답 타입
export interface OrganizationManageResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationManageData;
}

// 내 조직 정보 조회 데이터 응답 타입
export interface OrganizationManageData {
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
    businessLicenseFileUrl: string;
    facilityPhone: string;
    instagramUrl: string;
    blogUrl: string;
    websiteUrl: string;
}

// 내 조직 정보 수정 요청 타입
export interface OrganizationManageEditRequest {
  facilityPhone?: string;
  instagramUrl?: string;
  blogUrl?: string;
  websiteUrl?: string;
}

// 내 조직 트레이너 추가 타입
export interface OrganizationManageTrainerAdd {
  status: number;
  code: string;
  message: string;
  data: OrganizationManageTrainerAddData
}

// 내 조직 트레이너 추가 Request 데이터 타입
export interface OrganizationManageTrainerAddData {
  trainerProfileId: number;
}

// 내 조직 트레이너 검색 데이터 content값 타입
export interface OrganizationManageTrainerSearchItem {
  trainerProfileId: number;
  name: string;
  username: string;
  nickname: string;
}

// 내 조직 트레이너 검색 응답값 데이터 타입
export interface OrganizationManageTrainerSearchData {
  content: OrganizationManageTrainerSearchItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

// 내 조직 트레이너 검색 응답값 타입
export interface OrgnaizationManageTrainerSearchResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationManageTrainerSearchData;
}

// 내 조직 트레이너 검색 요청값
export interface OrganizationManageTrainerSearchReqeust {
  keyword?: string | null;
  page?: number;
  size?: number;
}

// 내 조직 트레이너 목록 조회 응답값 타입
export interface OrganizationManageTrainerListResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationManageTrainerListData;
}

// 내 조직 트레이너 목록 조회 데이터 타입
export interface OrganizationManageTrainerListData {
  trainers: OrganizationManageTrainerListItem[];
}

// 내 조직 트레이너 목록 조회 데이터 트레이너 타입
export interface OrganizationManageTrainerListItem {
  organizationTrainerId: number;
  trainerProfileId: number;
  username: string;
  trainerName: string;
  registeredAt: string;
}

// 내 조직 트레이너 삭제 응답 타입 
export interface OrganizationManageTrainerDeleteResponse {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 비밀번호 확인 응답 타입
export interface MyPagePasswordCheck {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 회원 탈퇴 응답 타입
export interface MyPageUserDelection {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 비밀번호 변경 요청값
export interface MyPagePasswordChangeRequest {
  newPassword: string;
  checkNewPassword: string;
}

// 비밀번호 변경 응답값
export interface MyPagePasswordChangeResponse {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 내 프로필 조회 응답값
export interface MyPageUserProfileResponse {
  status: number;
  code: string;
  message: string;
  data: MypageUserProfileData;
}

export interface MypageUserProfileData {
  name: string;
  nickname: string;
  phone: string;
}