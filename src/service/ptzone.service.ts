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
  PtRegistCategoryReponse,
  PtRegistRequest,
  PtRegistResponse,
  PtRegistTagReponse,
  PtReservationAvailableDatesResponse,
  PtReservationRequest,
  PtReservationResponse,
  PtReservationStatusChangeRequest,
  PtReservationStatusChangeResponse,
  PtReservationStudentDetailResponse,
  PtReservationStudentsResponse,
  PtResrvationAvailableTimesResponse,
  PtStatsResponse,
  PtStatusChangeRequest,
  PtStatusChangeResponse,
  TrainerApplicationData,
  TrainerApplicationDetailResponse,
  TrainerApplicationEditData,
  TrainerApplicationResponse
} from "@/feature/pt/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

// PT 상세 조회 API
export const getPtDetail = async (ptCourseId: string): Promise<PtCourseDetailResponse> => {
  const response = await fetchWithAuth(`/api/pt-courses/${ptCourseId}`);

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
  const response = await fetchWithAuth(`/api/pt-courses`);

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
export const getOnboarding = async (): Promise<OnboardingResponse> => {
  const response = await fetchWithAuth(`/api/onboarding/me`);

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


// PT 인기 강습 API
// export const getPopularPtLists = async (): Promise<PtPopularLists> => {
//   const response = await fetch(`${BASE_URL}/api/pt-courses/popular`);

//   return response.json();
// };

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

// 트레이너 신청 상세 조회
export const getTrainerApplication = async (): Promise<TrainerApplicationDetailResponse> => {
  const response = await fetchWithAuth(`/api/trainer-applications/me`, {
    // 삭제 후 코드가 변경되면 이전 삭제한 트레이너 정보가 조회되어 SSR로 변경
    cache: "no-store",
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    if (data?.code === 'TRAINER_APPLICATION_404_1') {
      return data;
    }
    const message = await getErrorMessage(
      response,
      '트레이너 신청 상세 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return data;
};

// 트레이너 신청 취소 API 
export const getTrainerCancel = async ( trainerApplicationId: number ) => {
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
  trainerApplicationId:number,
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

// PT 등록 카테고리 API
export const getPtzoneCategory = async (): Promise<PtRegistCategoryReponse> => {
  const response = await fetchWithAuth(`/api/categories`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '카테고리 목록 조회에 실패하였습니다.'
    );

    throw new Error(message);
  }

  return response.json();
};

// PT 등록 태그 API
export const getPtzoneTag = async (): Promise<PtRegistTagReponse> => {
  const response = await fetchWithAuth(`/api/tags`);

  if (!response.ok) {
    const message = await getErrorMessage(
      response,
      '태그 목록 조회에 실패하였습니다.'
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
) : Promise<PtReservationStudentsResponse> => {
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
) : Promise<PtReservationStudentDetailResponse> => {
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
export const getMyPtReservationLists = async () : Promise<MyPtResrvationListsResponse> => {
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
) : Promise<MyPtResrvationDetailResponse> => {
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

// 피드백 목록 조회
export const getFeedBackLists = async (reservationId: string) : Promise<FeedbackListsResponse> => {
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
) : Promise<FeedbackDetailResponse> => {
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
