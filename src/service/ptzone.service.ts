import {
  FeedbackCreateRequest,
  FeedbackCreateResponse,
  FeedbackDetailResponse,
  FeedbackListsResponse,
  MyPtManageListResponse,
  MyPtResrvationDetailResponse,
  MyPtResrvationListsResponse,
  OnboardingResponse, PtCourseDetailResponse,
  PtCourseListResponse,
  PtPopularCourseResponse,
  PtRegistOrganizationListResponse,
  PtRegistRequest,
  PtRegistResponse,
  PtReservationAvailableDatesResponse,
  PtReservationRequest,
  PtReservationResponse,
  PtReservationStatusChangeRequest,
  PtReservationStatusChangeResponse,
  PtReservationStudentDetailResponse,
  PtReservationStudentsResponse,
  PtResrvationAvailableTimesResponse,
  PtReviewCreateRequest,
  PtReviewCreateResponse,
  PtReviewDeleteResponse,
  PtReviewUpdateResponse,
  PtStatsResponse,
  PtStatusChangeRequest,
  PtStatusChangeResponse,
  TrainerReviewListRequest,
  TrainerReviewListResponse,
  OrganizationSearchRequest,
  OrganizationSearchResponse,
  TrainerApplicationData,
  TrainerApplicationDetailResponse,
  TrainerApplicationListResponse,
  TrainerApplicationEditData,
  TrainerApplicationResponse
} from "@/feature/pt/type";
import { fetchWithAuth, fetchWithAuthGet, fetchWithoutAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

// PT 상세 조회 API
export const getPtDetail = async (ptCourseId: string): Promise<PtCourseDetailResponse> => {
  const response = await fetchWithAuthGet(`/api/pt-courses/${ptCourseId}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 상세 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 목록 조회 API
export const getPtLists = async (): Promise<PtCourseListResponse> => {
  const response = await fetchWithoutAuth(`/api/pt-courses`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 목록 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 온보딩 조회 API (사용자가 작성한 선호지역 위도, 경도)
export const getWithoutOnboarding = async (): Promise<OnboardingResponse> => {
  const response = await fetchWithoutAuth(`/api/onboarding/me`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '온보딩 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

export const getOnboarding = async (): Promise<OnboardingResponse> => {
  const response = await fetchWithAuthGet(`/api/onboarding/me`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '온보딩 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 등록 API 
export const createPtCourse = async (
  payload: PtRegistRequest
): Promise<PtRegistResponse> => {
  const response = await fetchWithAuth("/api/pt-courses", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 등록에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

export const getMyPtRegistOrganizations = async (): Promise<PtRegistOrganizationListResponse> => {
  const response = await fetchWithAuth("/api/organizations/trainer/my-organizations");

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "소속 헬스장 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};


// PT 인기 강습 목록 조회 API
export const getPopularPtLists = async (): Promise<PtPopularCourseResponse> => {
  const response = await fetchWithoutAuth(`/api/pt-courses/popular`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "인기 강습 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 트레이너 등록 API
export const trainerApplication = async (
  payload: TrainerApplicationData
): Promise<TrainerApplicationResponse> => {
  const response = await fetchWithAuth("/api/trainer-applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "트레이너 신청에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 트레이너 신청 조직 검색
export const searchOrganizations = async (
  { keyword = "", page = 0, size = 10 }: OrganizationSearchRequest
): Promise<OrganizationSearchResponse> => {
  const params = new URLSearchParams({
    keyword: keyword.trim(),
    page: String(page),
    size: String(size),
  });
  const response = await fetchWithAuth(`/api/organizations/search?${params}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "조직 검색에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 내 트레이너 신청서 목록 조회
export const getMyTrainerApplicationList = async (
  page: number = 0
): Promise<TrainerApplicationListResponse> => {
  const response = await fetchWithAuth(`/api/trainer-applications/me?page=${page}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '트레이너 신청 목록 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 내 트레이너 신청서 상세 조회
export const getMyTrainerApplicationDetail = async (
  trainerApplicationId: number
): Promise<TrainerApplicationDetailResponse> => {
  const response = await fetchWithAuth(
    `/api/trainer-applications/me/${trainerApplicationId}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '트레이너 신청서 상세 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 트레이너 신청 취소 API 
export const getTrainerCancel = async (trainerApplicationId: number) => {
  const response = await fetchWithAuth(`/api/trainer-applications/${trainerApplicationId}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "트레이너 신청 취소에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 트레이너 신청 수정 API
export const updateTrainerApplication = async (
  trainerApplicationId: number,
  payload: TrainerApplicationEditData
): Promise<TrainerApplicationResponse> => {
  const response = await fetchWithAuth(`/api/trainer-applications/${trainerApplicationId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "트레이너 신청 수정에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// PTZONE - PT 통계 조회 API
export const getPtzoneStats = async (): Promise<PtStatsResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/stats`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 통계 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 강습 관리 목록 조회 API 
export const getPtzonePtManageList = async (): Promise<MyPtManageListResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/me`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 강습 관리 목록 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 강습 상태 변경 API
export const chagnePtzoneStatus = async (
  ptCourseId: number,
  status: PtStatusChangeRequest
): Promise<PtStatusChangeResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/${ptCourseId}/status`, {
    method: "PATCH",
    body: JSON.stringify(status)
  }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 강습 상태 변경에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 예약 가능 날짜 API
export const getPtResrvationAvailableDates = async (
  ptCourseId: number
): Promise<PtReservationAvailableDatesResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/${ptCourseId}/available-dates`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "예약 가능 날짜 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 예약 가능 시간 API
export const getPtResrvationAvailableTimes = async (
  ptCourseId: number,
  date: string
): Promise<PtResrvationAvailableTimesResponse> => {
  const response = await fetchWithAuth(
    `/api/pt-courses/${ptCourseId}/available-time-slots?date=${date}`
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response, "예약 가능 시간 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 예약하기 API
export const createPtReservation = async (
  ptCourseId: number,
  payload: PtReservationRequest
): Promise<PtReservationResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/${ptCourseId}/reservations`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "PT 예약에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 깅습 수강생 목록 조회 API 
export const getPtStudentsList = async (
  ptCourseId: number
): Promise<PtReservationStudentsResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/${ptCourseId}/reservations`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "PT 강습 수강생 목록 조회에 실패하였습니다"
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 강습 수강생 상세 조회 API 
export const getPtStudentDetail = async (
  reservationId: string
): Promise<PtReservationStudentDetailResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/reservations/${reservationId}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "PT 강습 수강생 상세 조회에 실패하였습니다"
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 예약 수강 상태 변경
export const chagnePtzoneResrvationStatus = async (
  reservationId: number,
  status: PtReservationStatusChangeRequest
): Promise<PtReservationStatusChangeResponse> => {
  const response = await fetchWithAuth(`/api/reservations/${reservationId}/status
`, {
    method: "PATCH",
    body: JSON.stringify(status)
  }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      'PT 예약 수강 상태 변경에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// 내 예약 기록 목록 조회
export const getMyPtReservationLists = async (): Promise<MyPtResrvationListsResponse> => {
  const response = await fetchWithAuth(`/api/reservations/me`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "내 예약 기록 목록 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 내 예약 기록 상세 조회
export const getMyPtReservationDetail = async (
  reservationId: string
): Promise<MyPtResrvationDetailResponse> => {
  const response = await fetchWithAuth(`/api/reservations/me/${reservationId}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "내 예약 기록 상세 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 강사평 작성
export const createPtReview = async (
  ptCourseId: number,
  ptReservationId: string,
  payload: PtReviewCreateRequest
): Promise<PtReviewCreateResponse> => {
  const response = await fetchWithAuth(
    `/api/pt-courses/${ptCourseId}/reservations/${ptReservationId}/reviews`,
    {
      method: "POST",
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "수강평 등록에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};

// 강사평 수정
export const updatePtReview = async (
  reviewId: number,
  payload: PtReviewCreateRequest
): Promise<PtReviewUpdateResponse> => {
  const response = await fetchWithAuth(`/api/reviews/${reviewId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "수강평 수정에 실패하였습니다.");

    throw new Error(message);
  }

  return response.json();
};

// 강사평 삭제
export const deletePtReview = async (
  reviewId: number
): Promise<PtReviewDeleteResponse> => {
  const response = await fetchWithAuth(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const message = await getErrorMessage(response, "수강평 삭제에 실패하였습니다.");

    throw new Error(message);
  }

  return response.json();
};

// 강사평 목록 조회
export const getTrainerReviewList = async (
  trainerProfileId: number,
  { cursor, cursorRating, size = 10, sort = "LATEST" }: TrainerReviewListRequest = {}
): Promise<TrainerReviewListResponse> => {
  const params = new URLSearchParams({ size: String(size), sort });

  if (cursor !== undefined) params.set("cursor", String(cursor));
  if (cursorRating !== undefined) params.set("cursorRating", String(cursorRating));

  const response = await fetchWithAuth(
    `/api/trainer-profiles/${trainerProfileId}/reviews?${params}`
  );

  if (!response.ok) {
    const message = await getErrorMessage(response, "수강평 목록 조회에 실패하였습니다.");

    throw new Error(message);
  }

  return response.json();
};

// 피드백 목록 조회
export const getFeedBackLists = async (reservationId: string): Promise<FeedbackListsResponse> => {
  const response = await fetchWithAuth(`/api/reservations/${reservationId}/feedbacks`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "피드백 목록 조회르 실패하였습니다.."
    );

    throw new Error(message);
  }

  return response.json();
};

// 피드백 등록 
export const createFeedback = async (
  reservationId: string,
  payload: FeedbackCreateRequest
): Promise<FeedbackCreateResponse> => {
  const response = await fetchWithAuth(`/api/reservations/${reservationId}/feedbacks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "피드백 등록에 실패하였습니다.");

    throw new Error(message);
  }

  return response.json();
};

// 피드백 상세 조회
export const getFeedbackDetail = async (
  reservationId: string,
  feedbackId: string
): Promise<FeedbackDetailResponse> => {
  const response = await fetchWithAuth(`/api/reservations/${reservationId}/feedbacks/${feedbackId}`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      "피드백 상세 조회에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};
