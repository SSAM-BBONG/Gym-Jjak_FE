// 조직 대시보드 통계 조회 응답 타입
export interface OrganizationStatsResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationStatsData;
}

// 조직 대시보드 통계 조회 데이터 타입
export interface OrganizationStatsData {
  trainerCount: number;
  totalUserCount: number;
  currentUserCount: number;
  thisMonthRevenue: number;
  trend: OrganizationStatsTrend;
}

// 조직 대시보드 통계 타입
export interface OrganizationStatsTrend {
  weekly: OrganizationStatsTrendItem[];
  monthly: OrganizationStatsTrendItem[];
  threeMonthly: OrganizationStatsTrendItem[];
  sixMonthly: OrganizationStatsTrendItem[];
}

// 조직 대시보드 통계 항목 타입
export interface OrganizationStatsTrendItem {
  date: string;
  count: number;
}

// 조직 매출 조회 응답 타입
export interface OrganizationSalesResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationSalesData;
}

// 조직 매출 조회 데이터 타입
export interface OrganizationSalesData {
  totalRevenue: number;
  thisMonthRevenue: number;
  monthOverMonthRate: number;
  revenueTrend: OrganizationRevenueTrend;
  trainerSales: OrganizationTrainerSalesItem[];
}

// 조직 매출 타입
export interface OrganizationRevenueTrend {
  weekly: OrganizationRevenueTrendItem[];
  monthly: OrganizationRevenueTrendItem[];
  threeMonthly: OrganizationRevenueTrendItem[];
  sixMonthly: OrganizationRevenueTrendItem[];
}

// 조직 매출 항목 타입
export interface OrganizationRevenueTrendItem {
  date: string;
  amount: number;
}

// 트레이너별 매출 항목 타입
export interface OrganizationTrainerSalesItem {
  trainerProfileId: number;
  trainerName: string;
  thisMonthAmount: number;
  totalAmount: number;
  ratio: number;
}

// 조직 트레이너별 회원·PT 통계 조회 응답 타입
export interface OrganizationTrainerStatsResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationTrainerStatsData[];
}

// 조직 트레이너별 회원·PT 통계 데이터 타입
export interface OrganizationTrainerStatsData {
  trainerProfileId: number;
  trainerName: string;
  clientCount: number;
  ptCount: number;
}

// 조직 PT 강습 목록 조회 응답 타입
export interface OrganizationPtCourseResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationPtCourseData[];
}

// 조직 PT 강습 목록 데이터 타입
export interface OrganizationPtCourseData {
  ptCourseId: number;
  title: string;
  price: number;
  totalSessionCount: number;
  status: "VISIBLE" | "HIDDEN";
  trainerName: string;
  currentStudentCount: number;
}

// 조직 PT 강습 수강생 목록 조회 응답 타입
export interface OrganizationPtStudentsResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationPtStudentData[];
}

// 조직 PT 강습 수강생 목록 데이터 타입
export interface OrganizationPtStudentData {
  userName: string;
  enrolledAt: string;
  progressCount: number;
  totalSessionCount: number;
}

// 사용자용 조직 상세 조회 응답 타입
export interface OrganizationPublicDetailResponse {
  status: number;
  code: string;
  message: string;
  data: OrganizationPublicDetailData;
}

// 사용자용 조직 상세 조회 데이터 타입
export interface OrganizationPublicDetailData {
  businessName: string;
  roadAddress: string;
  detailAddress: string | null;
  facilityPhone: string | null;
  instagramUrl: string | null;
  blogUrl: string | null;
  websiteUrl: string | null;
  trainerCount: number;
  avgRating: number;
  accumulatedMembers: number;
  trainers: OrganizationPublicDetailTrainer[];
}

// 사용자용 조직 상세 조회 소속 트레이너 타입
export interface OrganizationPublicDetailTrainer {
  trainerName: string;
  averageRating: number;
  reviewCount: number;
}
