import { PtDetail, PtDetailResponse} from "@/feature/pt/type";
import { axiosFetch } from "@/lib/api";

// PT 강습 상세 조회 API
export const getPtDetail = async ( ptCourseId: string | number): Promise<PtDetailResponse> => {
      const response = await axiosFetch.get(`/api/pt-courses/${ptCourseId}`  );
  return response.data;
};
