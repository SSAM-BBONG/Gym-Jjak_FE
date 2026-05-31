import {  OnboardingResponse, PtDetailResponse, PtListResponse} from "@/feature/pt/type";
import { axiosFetch } from "@/lib/api";

// PT 상세 조회 API
export const getPtDetail = async ( ptCourseId: string | number): Promise<PtDetailResponse> => {
      const response = await axiosFetch.get(`/api/pt-courses/${ptCourseId}`  );
  return response.data;
};

// PT 목록 조회 API
export const getPtLists = async (): Promise<PtListResponse> => {
      const response = await axiosFetch.get(`/api/pt-courses`);
  return response.data;
};

// 온보딩 조회 API (사용자가 작성한 선호지역 위도, 경도)
export const getOnboarding = async (): Promise<OnboardingResponse> => {
      const response = await axiosFetch.get(`/api/onboarding/me`);
  return response.data;
};
