import {
  OnboardingResponse, PtCourseCreateResponse, PtDetailResponse, PtListResponse,
  TrainerApplicationData,
  TrainerApplicationDetailResponse,
  TrainerApplicationEditData,
  TrainerApplicationResponse
} from "@/feature/pt/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

// PT 상세 조회 API
export const getPtDetail = async (ptCourseId: string | number): Promise<PtDetailResponse> => {
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
export const getPtLists = async (): Promise<PtListResponse> => {
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
export const createPtCourse = async (formData: FormData): Promise<PtCourseCreateResponse> => {
  const response = await fetchWithAuth("/api/pt-courses", {
    method: "POST",
    body: formData,
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
  const response = await fetchWithAuth(`/api/trainer-applications/me`);

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
      "트레이너 신청에 실패하였습니다."
    );

    throw new Error(message);
  }

  return response.json();
};