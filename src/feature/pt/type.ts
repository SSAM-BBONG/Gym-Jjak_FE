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
  thumbnailUrl: string | null;
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
  averageRating: number;
}

// PT 목록 응답 타입
export interface PtCourseListResponse {
  status: number;
  code: string;
  message: string;
  data: PtCourseListData[];
}

export type PtRecommendationTargetPart =
  | "CHEST" | "BACK" | "SHOULDER" | "ARM" | "ABS" | "CORE" | "LEG" | "GLUTE" | "FULL_BODY";

export type PainOnset = "ACUTE" | "SUBACUTE" | "CHRONIC";

export interface PtRecommendationRequest {
  targetParts: PtRecommendationTargetPart[];
  distanceLevel: number;
  hasPain: boolean;
  painArea: string | null;
  painOnset: PainOnset | null;
}

export interface PtRecommendationResponse {
  status: number;
  code: string;
  message: string;
  data: PtRecommendationData;
}

export interface PtRecommendationData {
  recommendations: PtRecommendationItem[];
}

export interface PtRecommendationItem {
  courseId: number;
  courseName: string;
  trainerId: number;
  trainerName: string;
  reason: string;
}

// PT 인기 강습 목록 데이터 타입
export interface PtPopularCourseData {
  ptCourseId: number;
  title: string;
  price: number;
  thumbnailUrl: string;
  part: string;
  trainerName: string;
  businessName: string;
}

// PT 인기 강습 목록 응답 타입
export interface PtPopularCourseResponse {
  status: number;
  code: string;
  message: string;
  data: PtPopularCourseData[];
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
  part: Part;
  price: number;
  thumbnailFile: TrainerFileData;
  curriculums: PtRegistCurriculum[];
  schedules: PtRegistSchedule[];
  organizationId: number;
}

export interface PtRegistOrganizationListResponse {
  status: number;
  code: string;
  message: string;
  data: PtRegistOrganizationData[];
}

export interface PtRegistOrganizationData {
  organizationId: number;
  businessName: string;
  roadAddress: string;
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
  organizationIds: number[];
  profileImageFile: TrainerFileData | null;
  certificateFile: TrainerFileData;
  qualifications: string[] | null;
  awardHistories: string[] | null;
  introduction: string;
}

// 트레이너 신청용 조직 검색 응답 타입
export interface OrganizationSearchRequest {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface OrganizationSearchResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationSearchData;
}

export interface OrganizationSearchData {
  content: OrganizationSearchItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface OrganizationSearchItem {
  organizationId: number;
  businessName: string;
  representativeName: string;
  roadAddress: string;
  detailAddress: string;
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
export type TrainerApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";

// 내 트레이너 신청서 목록 조회 응답 타입
export interface TrainerApplicationListResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerApplicationListData;
}

export interface TrainerApplicationListData {
  content: TrainerApplicationListItem[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface TrainerApplicationListItem {
  trainerApplicationId: number;
  organizationName: string;
  status: TrainerApplicationStatus;
  createdAt: string;
  reviewedAt: string | null;
  rejectReason: string | null;
}

// 내 트레이너 신청서 상세 조회 응답 타입
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
  status: TrainerApplicationStatus;
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

// 트레이너 PT Zone 대시보드 조회 응답 타입
export interface TrainerPtDashboardResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerPtDashboardData;
}

// 트레이너 PT Zone 대시보드 조회 데이터 타입
export interface TrainerPtDashboardData {
  organizationCount: number;
  currentStudentCount: number;
  averageRating: number;
  reviewCount: number;
  inProgressPtCourses: TrainerPtDashboardCourse[];
}

// 트레이너 PT Zone 대시보드 진행 중 강습 타입
export interface TrainerPtDashboardCourse {
  ptCourseId: number;
  thumbnailUrl: string;
  title: string;
  trainerName: string;
  organizationName: string;
  price: number;
  currentStudentCount: number;
}

// 트레이너 시장 동향 리포트 목록 조회 응답 타입
export interface TrainerReportListResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerReportListData;
}

export interface TrainerReportListData {
  items: TrainerReportListItem[];
  hasNext: boolean;
}

export interface TrainerReportListItem {
  trainerReportId: number;
  targetMonth: string;
}

// 트레이너 시장 동향 리포트 상세 조회 응답 타입
export interface TrainerReportDetailResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerReportDetailData;
}

export interface TrainerReportDetailData {
  trainerReportId: number;
  targetMonth: string;
  report: string;
  marketTrendsSnapshot: TrainerMarketTrendsSnapshot;
}

export interface TrainerMarketTrendsSnapshot {
  popularBodyParts: TrainerReportBodyPartDistribution[];
  priceDistribution: TrainerReportPriceDistribution[];
  pricePerSessionDistribution: TrainerReportPriceDistribution[];
  sessionCountDistribution: TrainerReportSessionCountDistribution[];
  locationDistribution: TrainerReportLocationDistribution[];
}

export interface TrainerReportBodyPartDistribution {
  bodyPart: string;
  percentage: number;
  percentageChangeFromLastMonth: number | null;
}

export interface TrainerReportPriceDistribution {
  priceRange: string;
  minPrice: number;
  maxPrice: number | null;
  percentage: number;
  percentageChangeFromLastMonth: number | null;
}

export interface TrainerReportSessionCountDistribution {
  sessionCount: number;
  percentage: number;
  percentageChangeFromLastMonth: number | null;
}

// 현재 API는 항상 빈 배열을 반환하지만, 응답 구조 확장에 대비해 타입을 유지한다.
export interface TrainerReportLocationDistribution {
  location: string;
  percentage: number;
  percentageChangeFromLastMonth: number | null;
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
  thumbnailUrl: string | null;
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

// PT 예약 가능 날짜 조회 응답값
export interface PtReservationAvailableDatesResponse {
  status: number;
  code: string;
  message: string;
  data: PtReservationAvailableDateData


}

// PT 예약 가능 날짜 조회 데이터
export interface PtReservationAvailableDateData {
  availableDates: string[];
}

// PT 예약 가능 시간 조회 데이터
export interface PtResrvationAvailableTimeData {
  data: string;
  timeSlots: PtResrvationAvailableTimeSlot[]
}

// PT 예약 가능 시간 조회 timeslot 타입
export interface PtResrvationAvailableTimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

// PT 예약 가능 시간 조회 응답값
export interface PtResrvationAvailableTimesResponse {
  status: number;
  code: string;
  message: string;
  data: PtResrvationAvailableTimeData;
}

// PT 예약하기 요청값
export interface PtReservationRequest {
  reservedStartAt: string;
  reservedEndAt: string;
}

// PT 예약하기 응답값
export interface PtReservationResponse {
  status: number;
  code: string;
  message: string;
  data: PtReservationData
}

// PT 예약하기 데이터값 
export interface PtReservationData {
  ptReservationId: number;
  status: string;
}

// PT 강습별 수강생 목록 조회 응답값
export interface PtReservationStudentsResponse {
  status: number;
  code: string;
  message: string;
  data: PtReservationStudentsData;
}

// PT 강습별 수강생 목록 데이터
export interface PtReservationStudentsData {
  title: string;
  ptReservations: PtReservationStudent[];
}

// PT 강습별 수강생 목록 ptReservations 데이터
export interface PtReservationStudent {
  ptReservationId: number;
  userId: number;
  nickname: string;
  status: string;
  lastPtDate: string | null;
  progressCount: number;
  totalSessionCount: number;
}

// PT 수강생 상세조회 응답값
export interface PtReservationStudentDetailResponse {
  status: number;
  code: string;
  message: string;
  data: PtReservationStudentDetailData;
}

// PT 수강생 상세조회 데이터
export interface PtReservationStudentDetailData {
  nickname: string,
  email: string,
  phone: string,
  status: string,
  progressCount: number,
  totalSessionCount: number,
  title: string
}

// PT 예약 수강 상태 변경 응답값
export interface PtReservationStatusChangeResponse {
  status: number;
  code: string;
  message: string;
  data: PtReservationStatusChangeData;
}

// PT 예약 수강 상태 변경 데이터
export interface PtReservationStatusChangeData {
  status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED" | "RESERVED"
  progressCount: number,
  totalSessionCount: number
}

// PT 예약 수강 상태 변경 요청값
export interface PtReservationStatusChangeRequest {
  status: string
}

// 내 예약 기록 목록 조회 응답값
export interface MyPtResrvationListsResponse {
  status: number;
  code: string;
  message: string;
  data: MyPtResrvationListsData;
}

// 내 예약 기록 목록 조회 데이터
export interface MyPtResrvationListsData {
  ptReservations: MyPtReservationList[]
}

// 내 예약 기록 목록
export type MyPtReservationStatus =
  | "COMPLETED"
  | "RESERVED"
  | "IN_PROGRESS"
  | "CANCELLED";

export interface MyPtReservationList {
  ptReservationId: number,
  thumbnailUrl: string,
  title: string,
  trainerName: string,
  status: MyPtReservationStatus,
  lastPtDate: string,
  progressCount: number,
  totalSessionCount: number
}

export type PtSessionReservationStatus = "RESERVED" | "COMPLETED" | "CANCELLED";

export interface PtSessionReservationListResponse {
  status: number;
  code: string;
  message: string;
  data: PtSessionReservationListData;
}

export interface PtSessionReservationListData {
  sessions: PtSessionReservation[];
}

export interface PtSessionReservation {
  ptReservationId: number;
  ptCourseId: number;
  ptCourseTitle: string;
  trainerName: string;
  reservedStartAt: string;
  reservedEndAt: string;
  sessionStatus: PtSessionReservationStatus;
}

export interface PtSessionReservationCancelResponse {
  status: number;
  code: string;
  message: string;
  data: {
    sessionStatus: "CANCELLED";
    cancelledAt: string;
  };
}

// 내 예약 기록 상세 조회 커리큘럼
export interface MyPtRecordDetailCurriculum {
  id: number;
  sessionNo: number;
  title: string;
  feedbackId: number | null;
}

// 내 예약 기록 상세 조회 데이터
export interface MyPtRecordDetailData {
  ptCourseId: number;
  thumbnailUrl: string;
  title: string;
  trainerName: string;
  status: string;
  progressCount: number;
  totalSessionCount: number;
  curriculums: MyPtRecordDetailCurriculum[];
}

// 강사평 작성 요청값
export interface PtReviewCreateRequest {
  rating: number;
  content: string;
}

// 강사평 작성 응답값
export interface PtReviewCreateResponse {
  status: number;
  code: string;
  message: string;
  data: PtReviewCreateData;
}

// 강사평 작성 응답 데이터
export interface PtReviewCreateData {
  trainerReviewId: number;
}

// 강사평 수정 응답값
export interface PtReviewUpdateResponse {
  status: number;
  code: string;
  message: string;
  data: PtReviewCreateData;
}

// 강사평 삭제 응답값
export interface PtReviewDeleteResponse {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 강사평 목록 조회 요청값
export interface TrainerReviewListRequest {
  cursor?: number;
  cursorRating?: number;
  size?: number;
  sort?: "LATEST" | "HIGH_RATING";
}

// 강사평 목록 조회 응답값
export interface TrainerReviewListResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerReviewListData;
}

// 강사평 목록 조회 데이터
export interface TrainerReviewListData {
  reviews: TrainerReview[];
  nextCursor: number | null;
  nextCursorRating: number | null;
  hasNext: boolean;
}

export interface PtCourseUpdateCurriculum extends PtRegistCurriculum {
  id?: number;
}

export interface PtCourseUpdateSchedule extends PtRegistSchedule {
  id?: number;
}

export interface PtCourseUpdateRequest {
  title: string;
  description: string;
  part: Part;
  price: number;
  thumbnailFile?: TrainerFileData;
  curriculums: PtCourseUpdateCurriculum[];
  schedules: PtCourseUpdateSchedule[];
}

export interface PtCourseUpdateResponse {
  status: number;
  code: string;
  message: string;
  data: PtCourseDetailData;
}

export interface PtCourseDeleteResponse {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 강사평 요약 조회 응답값
export interface TrainerReviewSummaryResponse {
  status: number;
  code: string;
  message: string;
  data: TrainerReviewSummaryData;
}

// 강사평 요약 조회 데이터
export interface TrainerReviewSummaryData {
  trainerName: string;
  introduction: string;
  averageRating: number;
  reviewCount: number;
  ratingDistribution: TrainerReviewRatingDistribution;
}

// 별점별 강사평 수
export interface TrainerReviewRatingDistribution {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

// 강사평 목록 항목
export interface TrainerReview {
  trainerReviewId: number;
  nickname: string;
  ptCourseTitle: string;
  rating: number;
  content: string;
  createdAt: string;
  isMine: boolean;
}

// 내 예약 기록 상세 조회 응답값
export interface MyPtResrvationDetailResponse {
  status: number;
  code: string;
  message: string;
  data: MyPtRecordDetailData;
}

// 피드백 목록
export interface Feedback {
  feedbackId: number;
  content: string;
  createdAt: string;
}

// 피드백 목록 조회 커리큘럼
export interface StudentFeedbackCurriculum {
  ptCurriculumId: number;
  sessionNo: number;
  title: string;
  reservedStartAt: string;
  feedbacks: Feedback | null;
}

// 피드백 목록 조회 응답값
export interface FeedbackListsResponse {
  status: number;
  code: string;
  message: string;
  data: StudentFeedbackCurriculum[];
}

// 피드백 등록 요청값
export interface FeedbackCreateRequest {
  ptCurriculumId: number;
  media: FeedbackCreateMedia[]
  content: string;
}

// 피드백 등록 media 
export interface FeedbackCreateMedia {
  file: TrainerFileData;
  mediaType: "BEFORE" | "AFTER";
}
// 피드백 등록 응답값
export interface FeedbackCreateResponse {
  status: number;
  code: string;
  message: string;
  data: FeedbackCreateData
}

// 피드백 등록 데이터
export interface FeedbackCreateData {
  feedbackId: number;
}

// 피드백 수정 요청값
export interface FeedbackUpdateRequest {
  content: string;
  media: FeedbackCreateMedia[];
}

// 피드백 수정 응답값
export interface FeedbackUpdateResponse {
  status: number;
  code: string;
  message: string;
  data: FeedbackCreateData;
}

// 피드백 삭제 응답값
export interface FeedbackDeleteResponse {
  status: number;
  code: string;
  message: string;
  data: null;
}

// 피드백 상세조회 
export interface FeedbackDetailResponse {
  status: number;
  code: string;
  message: string;
  data: FeedbackDetailData
}

export interface FeedbackDetailData {
  sessionNo: number,
  curriculumTitle: string,
  content: string,
  mediaList: FeedbackDetailMedia[];
  createdAt: string
}

interface FeedbackDetailMedia {
  mediaType: string;
  fileUrl: string;
}

