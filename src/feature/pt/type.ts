// PT 상세조회 커리큘럼 타입
export interface PtCourseCurriculum {
  curriculumId: number;
  sessionNo: number;
  title: string;
  content: string;
}

// PT 상세조회 시간(스케쥴) 타입
export interface PtCourseSchedule {
  scheduleId: number;
  dayOfWeek: string;
  startTime: string; 
  endTime: string; 
}

// PT 상세조회 리뷰 타입
export interface PtCourseReview {
  reviewId: number;
  rating: number;
  content: string;
  createdAt: string;
}

// PT 상세조회 데이터 타입
export interface PtCourseDetailData {
  ptCourseId: number;
  thumbnailUrl: string;
  title: string;
  description: string;
  price: number;
  totalSessionCount: number;
  organizationId: number;
  trainerProfileId: number;
  curriculums: PtCourseCurriculum[];
  schedules: PtCourseSchedule[];
  recentReviews: PtCourseReview[];
}

// PT 상세조회 응답값
export interface PtCourseDetailResponse {
  status: number;
  code: string;
  message: string;
  data: PtCourseDetailData;
}

// PT 목록 데이터 타입
export interface PtCourseListData {
  ptCourseId: number;
  title: string;
  thumbnailUrl: string;
  price: number;
  tagId: number;
  tagName: string;
  categoryId: number;
  categoryName: string;
  trainerName: string;
  organizationId: number;
  businessName: string;
  roadAddress: string;
  latitude: number;
  longitude: number;
  reviewCount: number;
}

// PT 목록 응답 타입
export interface PtCourseListResponse {
  status: number;
  code: string;
  message: string;
  data: PtCourseListData[];
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

// PT 등록 응답값
export interface PtRegistResponse {
  status: number;
  code: string;
  message: string;
  data: PtRegistData;
}

// PT 등록 데이터 타입
export interface PtRegistData {
  ptCourseId: number
}

// PT 등록 요청값
export interface PtRegistRequest {
  title: string;
  description: string;
  categoryId: number;
  tagId: number;
  price: number;
  thumbnailFile: TrainerFileData;
  curriculums: PtRegistCurriculum[];
  schedules: PtRegistSchedule[];
}

// PT 등록 커리큘럼 타입
export interface PtRegistCurriculum {
  sessionNo: number;
  title: string;
  content: string;
}

// PT 등록 시간 타입 
export interface PtRegistSchedule {
  dayOfWeek:
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY";
  startTime: string;
  endTime: string;
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

// 트레이너 이미지 action 타입
export type ProfileImageAction = "KEEP" | "REPLACE" | "DELETE";

// 트레이너 신청 수정 요청 타입
export interface TrainerApplicationEditData {
  profileImageAction: ProfileImageAction;
  profileImageFile?: TrainerFileData | null;
  qualifications: string[] | null;
  awardHistories: string[] | null;
  introduction: string | null;
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
    profileImageOriginalName: string | null,
    certificateUrl: string;
    certificateOriginalName: string,
    qualifications: string[];
    awardHistories: string[];
    introduction: string;
    status: "" | "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
    rejectReason: string | null;
    reviewedBy: number | null;
    reviewedAt: string | null; 
    createdAt: string;
    updatedAt: string;
}

// PT 통계 조회 응답 타입
export interface PtStatsResponse {
  
  status: number;
  code: string;
  message: string;
  data: PtStats;
}

// PT 통계 조회 데이터 타입
export interface PtStats {
  organizationCount: number;
  activeTrainerCount: number;
  inProgressPtCount: number;
  averageSatisfaction: number;
}

// PT 등록 카테고리 목록 조회 응답 타입
export interface PtRegistCategoryReponse {
  status: number;
  code: string;
  message: string;
  data: PtRegistCategoryData[];
}

// PT 등록 카테고리 데이터
export interface PtRegistCategoryData {
  categoryId: number,
  name: string,
  createdAt: string,
  usageCount: number
}

// PT 등록 태그 응답값
export interface PtRegistTagReponse {
  status: number;
  code: string;
  message: string;
  data: PtRegistTagData[];
}

// PT 등록 태그 데이터
export interface PtRegistTagData {
  tagId: number;
  name: string;
  createdAt: string;
  usageCount: number;
}

// PT 강습 관리 목록 데이터
export interface PtManageListData {
  ptCourseId: number;
  thumbnailFileId: number;
  title: string;
  trainerName: string;
  status: "VISIBLE" | "HIDDEN";
  activeReservationCount: number;
  totalReservationCount: number;
}

// PT 강습 관리 목록 응답값
export interface MyPtManageListResponse {
  status: number;
  code: string;
  message: string;
  data: PtManageListData[];
}

// PT 강습 상태 변경 요청값
export interface PtStatusChangeRequest {
  status: "VISIBLE" | "HIDDEN";
}

// PT 강습 상태 변경 응답값
export interface PtStatusChangeResponse {
  status: number;
  code: string;
  message: string;
  data: null;
}
