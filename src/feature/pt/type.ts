// PT 상세조회 응답 타입
export interface PtDetailResponse {
  status: number;
  code: string;
  message: string;
  data: PtDetail;
}

// PT 상세조회 타입
export interface PtDetail {
  ptCourseId: number;
  categoryName: string;
  tagId: number;
  thumbnailUrl: string;
  title: string;
  description: string;
  price: number;
  totalSessionCount: number;
  status: "VISIBLE" | "HIDDEN" | "DELETED";

  organizationId: number;
  organizationName: string;
  organizationAddress: string;
  organizationPhone: string;
  websiteUrl: string;
  instagramUrl: string;

  trainerProfileId: number;
  trainerName: string;
  trainerSpec: string;
  trainerIntroduction: string;
  averageRating: number;
  reviewCount: number;

  certifications: PtTrainerCertification[];
  awards: PtTrainerAward[];
  curriculums: PtCourseCurriculum[];
  recentReviews: PtRecentReview[];
}

// PT 상세조회 자격증 타입
export interface PtTrainerCertification {
  certificationId?: number;
  name: string;
  issuer: string;
  acquiredDate: string;
}

// PT 상세조회 수상경력 타입
export interface PtTrainerAward {
  awardId?: number;
  competitionName: string;
  awardName: string;
  awardDate: string;
}

// PT 상세조회 커리큘럼 타입
export interface PtCourseCurriculum {
  curriculumId: number;
  sessionNo: number;
  title: string;
  content: string;
}

// PT 상세조회 리뷰 타입
export interface PtRecentReview {
  reviewId: number;
  userNickname: string;
  ptCourseTitle: string;
  rating: number;
  content: string;
  createdAt: string;
}


// PT 목록 조회
export interface PtListData {
  content: PtContent[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
}

// PT 목록 응답 타입
export interface PtListResponse {
  status: number;
  code: string;
  message: string;
  data: PtContent[];
}
// PT 목록 타입
export interface PtContent {
  ptCourseId: number;
  title: string;
  thumbnailUrl: string;
  price: number;
  totalSessionCount: number;

  categoryName: string;
  tag: string;

  organizationName: string;
  organizationAddress: string;
  latitude: number;
  longitude: number;

  trainerName: string;

  averageRating: number;
  reviewCount: number;

  status: "VISIBLE" | "HIDDEN" | "DELETED";
}

// 온보딩 응답 타입
export interface OnboardingResponse {
  status: number;
  code: string;
  message: string;
  data: Onboarding;
}

// 온보딩 타입
export interface Onboarding {
  onboardingId: number;
  exerciseGoal: string;
  exercisePeriod: string;
  exerciseFrequency: string;
  preferredExercise: string;
  preferredRegion: PreferredRegion;
  height: number;
  weight: number;
}

// 온보딩 지역 타입
export interface PreferredRegion {
  regionId: number;
  sido: string;
  sigungu: string;
  eupmyeondong: string;
  fullName: string;
  latitude: number;
  longitude: number;
}

export interface PtActionState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

export interface PtCourseCreateResponse {
  status: number;
  code: string;
  message: string;
  data: PtCourseCreateData;
}

export interface PtCourseCreateData {
  ptCourseId: number;
  title: string;
  description: string;
  categoryId: number;
  tagId: number;
  price: number;
  totalSessionCount: number;
  thumbnailUrl?: string;
}

// 트레이너 등록 API
// 트레이너 등록 요청 타입
export interface TrainerApplicationData {
  profileImageFile: TrainerFileData | null;
  certificateFile: TrainerFileData;
  qualifications: string[] | null;
  awardHistories: string[] | null;
  introduction: string;
}

// 트레이너 이미지 요청 타입
export interface TrainerFileData {
    fileKey: string,
    originalName: string,
    contentType: string,
    fileSize: number
}

// 트레이너 등록 응답 타입
export interface TrainerApplicationResponse {
  status: number,
  code: string,
  message: string
  data: {
        trainerApplicationId: number
    }
}

// 트레이너 신청 ID 타입
export interface TrainerApplicationId {
  trainerApplicationId: number
}

// 트레이너 신청 상세 조회 응답 타입
export interface TrainerApplicationDetailResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerApplicationDetail
}

// 트레이너 신청 상세 조회 data 타입
export interface TrainerApplicationDetail {
    trainerApplicationId: number
    userId: number;
    profileImageUrl: string | null;
    certificateUrl: string;
    qualifications: string[];
    awardHistories: string[];
    introduction: string;
    status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
    rejectReason: string | null;
    reviewedBy: number | null;
    reviewedAt: string | null; 
    createdAt: string;
    updatedAt: string;
}