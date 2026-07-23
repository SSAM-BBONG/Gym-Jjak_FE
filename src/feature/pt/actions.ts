"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { chagnePtzoneResrvationStatus, chagnePtzoneStatus, createFeedback, createPtCourse, createPtReservation, createPtReview, deletePtCourse, deletePtReview, getFeedbackDetail, getMyPtReservationDetail, getMyPtReservationLists, getMyTrainerApplicationDetail, getMyTrainerApplicationList, getOnboarding, getPopularPtLists, getPtResrvationAvailableDates, getPtResrvationAvailableTimes, getTrainerCancel, getTrainerPtDashboard, getTrainerReviewList, getTrainerReviewSummary, getWithoutOnboarding, searchOrganizations, trainerApplication, updatePtCourse, updatePtReview, updateTrainerApplication } from "@/service/ptzone.service";
import { FeedbackDetailData, MyPtRecordDetailData, MyPtResrvationListsData, OrganizationSearchItem, PtCourseUpdateRequest, PtRegistRequest, PtRegistSchedule, PtReservationRequest, PtReservationStatusChangeRequest, PtReviewCreateRequest, TrainerApplicationData, TrainerApplicationEditData, TrainerPtDashboardData, TrainerReviewListData, TrainerReviewListRequest, TrainerReviewSummaryData } from "./type";
import { uploadFilesPresignedUrl } from "@/service/file.service";
import { cookies } from "next/headers";

export const getPopularPtListsAction = async () => {
  return getPopularPtLists();
};

type TrainerPtDashboardActionResult =
  | {
      success: true;
      data: TrainerPtDashboardData;
    }
  | {
      success: false;
      message: string;
    };

// 트레이너 PT Zone 대시보드 조회 액션
export const getTrainerPtDashboardAction =
  async () => {
    try {
      const response = await getTrainerPtDashboard();

      return {
        success: true as const,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false as const,
        message:
          error instanceof Error
            ? error.message
            : "트레이너 PT Zone 대시보드 조회에 실패하였습니다.",
      };
    }
  };

// 내 트레이너 신청 목록 조회 액션
export const getMyTrainerApplicationListAction = async (page: number = 0) => {
  try {
    const response = await getMyTrainerApplicationList(page);

    return { 
      success: true, 
      data: response.data 
    };
  } catch (error) {
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "트레이너 신청 목록 조회에 실패하였습니다.",
    };
  }
};

type OrganizationSearchActionResult =
  | {
      success: true;
      data: OrganizationSearchItem[];
    }
  | {
      success: false;
      message: string;
    };

// 조직 검색 액션
export const organizationSearchAction = async (keyword: string): Promise<OrganizationSearchActionResult> => {
  if (!keyword.trim()) {
    return { success: true, data: [] };
  }

  try {
    const response = await searchOrganizations({
      keyword,
      page: 0,
      size: 10,
    });

    return {
      success: true,
      data: response.data.content,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "조직 검색에 실패하였습니다.";

    return {
      success: false,
      message,
    };
  }
};

type PtRegistCurriculumFormData = {
  title: string;
  content: string;
};

type FeedbackDetailActionResult =
  | {
      success: true;
      data: FeedbackDetailData;
    }
  | {
      success: false;
      message: string;
    };

type MyPtReservationListsActionResult =
  | {
      success: true;
      data: MyPtResrvationListsData;
    }
  | {
      success: false;
      message: string;
    };

type MyPtReservationDetailActionResult =
  | {
      success: true;
      data: MyPtRecordDetailData;
    }
  | {
      success: false;
      message: string;
    };

// PT 등록 액션
export const createPtRegistAction = async (formData: FormData) => {
  try {
    const thumbnailFile = formData.get("thumbnailFile");

    if (!(thumbnailFile instanceof File) || thumbnailFile.size === 0) {
      return {
        success: false,
        message: "썸네일 이미지를 등록해주세요.",
      };
    }

    const part = String(formData.get("part") ?? "");
    const organizationId = Number(formData.get("organizationId"));
    const parts: Part[] = ["CHEST", "BACK", "SHOULDER", "ARM", "ABS", "CORE", "LEG", "GLUTE", "FULL_BODY"];

    if (!parts.includes(part as Part)) {
      return {
        success: false,
        message: "운동 부위를 선택해주세요.",
      };
    }

    if (!Number.isInteger(organizationId) || organizationId <= 0) {
      return {
        success: false,
        message: "소속 헬스장을 선택해주세요.",
      };
    }

    const [uploadedThumbnailFile] = await uploadFilesPresignedUrl([
      {
        file: thumbnailFile,
        fileType: "PT_THUMBNAIL",
      },
    ]);

    const curriculums = JSON.parse(
      String(formData.get("curriculums") ?? "[]")
    ) as PtRegistCurriculumFormData[];

    const schedules = JSON.parse(
      String(formData.get("schedules") ?? "[]")
    ) as PtRegistSchedule[];

    const payload: PtRegistRequest = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      part: part as Part,
      price: Number(formData.get("price")),
      thumbnailFile: uploadedThumbnailFile,
      curriculums: curriculums.map((curriculum, index) => ({
        sessionNo: index + 1,
        title: curriculum.title,
        content: curriculum.content,
      })),
      schedules,
      organizationId,
    };

    await createPtCourse(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : "PT 등록에 실패하였습니다.";

    return {
      success: false,
      message,
    };
  }

  revalidatePath("/pt");
  revalidatePath("/pt/find");
  revalidatePath("/pt/manage");

  redirect("/pt/manage");
};

// 트레이너 등록 액션
export const trainerApplicationAction = async (formData: FormData) => {
  const profileImageFile = formData.get("profileImageFile");
  const certificateFile = formData.get("certificateFile");
  const organizationIdsValue = String(formData.get("organizationIds") ?? "[]");
  let organizationIds: number[];

  try {
    organizationIds = JSON.parse(organizationIdsValue) as number[];
  } catch {
    return {
      success: false,
      message: "소속 헬스장 정보를 확인해주세요.",
    };
  }

  const qualifications = JSON.parse(
    String(formData.get("qualifications") ?? "[]")
  ) as string[];

  const awardHistories = JSON.parse(
    String(formData.get("awardHistories") ?? "[]")
  ) as string[];

  const introduction = String(formData.get("introduction") ?? "").trim();

  if (!(certificateFile instanceof File) || certificateFile.size === 0) {
    return {
      success: false,
      message: "필수 자격증 파일을 등록해주세요.",
    };
  }

  if (!introduction) {
    return {
      success: false,
      message: "자기소개를 입력해주세요.",
    };
  }

  if (!Array.isArray(organizationIds)) {
    return {
      success: false,
      message: "소속 헬스장 정보를 확인해주세요.",
    };
  }

  const selectedOrganizationIds = [...new Set(organizationIds)];

  if (
    selectedOrganizationIds.length === 0 ||
    selectedOrganizationIds.some(
      (organizationId) => !Number.isInteger(organizationId) || organizationId <= 0
    )
  ) {
    return {
      success: false,
      message: "소속 헬스장을 선택해주세요.",
    };
  }

  const uploadTargets = [];

  const hasProfileImage =
    profileImageFile instanceof File && profileImageFile.size > 0;

  if (hasProfileImage) {
    uploadTargets.push({
      file: profileImageFile,
      fileType: "PROFILE_IMAGE" as const,
    });
  }

  uploadTargets.push({
    file: certificateFile,
    fileType: "CERTIFICATION" as const,
  });

  const uploadedFiles = await uploadFilesPresignedUrl(uploadTargets);

  const payload: TrainerApplicationData = {
    organizationIds: selectedOrganizationIds,
    profileImageFile: hasProfileImage ? uploadedFiles[0] : null,
    certificateFile: hasProfileImage ? uploadedFiles[1] : uploadedFiles[0],
    qualifications,
    awardHistories,
    introduction,
  };

  try {
    await trainerApplication(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

  revalidatePath("/pt/trainer-apply");
  redirect("/pt/trainer-apply");
};

// 트레이너 등록 수정 액션
export const trainerApplicationEditAction = async (
  id: number,
  formData: FormData
) => {
  const profileImageFile = formData.get("profileImageFile");

  const profileImageAction = String(
    formData.get("profileImageAction") ?? "KEEP"
  ) as "KEEP" | "REPLACE" | "DELETE";

  const qualifications = JSON.parse(
    String(formData.get("qualifications") ?? "[]")
  ) as string[];

  const awardHistories = JSON.parse(
    String(formData.get("awardHistories") ?? "[]")
  ) as string[];

  const introduction = String(formData.get("introduction") ?? "").trim();

  if (!introduction) {
    return {
      success: false,
      message: "자기소개를 입력해주세요.",
    };
  }

  let uploadedProfileImage = null;

if (profileImageAction === "REPLACE") {
  const profileImageFile = formData.get("profileImageFile");

  if (!(profileImageFile instanceof File) || profileImageFile.size === 0) {
    return {
      success: false,
      message: "프로필 이미지를 교체하려면 파일이 필요합니다.",
    };
  }

  const uploadedFiles = await uploadFilesPresignedUrl([
    {
      file: profileImageFile,
      fileType: "PROFILE_IMAGE",
    },
  ]);

  uploadedProfileImage = uploadedFiles[0];
}

const payload: TrainerApplicationEditData = {
  profileImageAction,
  profileImageFile: profileImageAction === "REPLACE" ? uploadedProfileImage  : null,
  qualifications,
  awardHistories,
  introduction,
};
  try {
    await updateTrainerApplication(id, payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }

  revalidatePath("/pt/trainer-apply");
  revalidatePath(`/pt/trainer-apply/${id}`);
  revalidatePath(`/pt/trainer-apply/${id}/edit`);

  redirect(`/pt/trainer-apply/${id}`);
};

// 트레이너 삭제 액션
export const deleteTrainerApplication = async (id:number) => {
    try {
      await getTrainerCancel(id);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage
        }
    }
  
  revalidatePath('/pt/trainer-apply');
  revalidatePath(`/pt/trainer-apply/${id}`);
  revalidatePath(`/pt/trainer-apply/${id}/edit`);
  redirect('/pt/trainer-apply');
}

export const changePtStatus = async (
  id:number, 
  status: "VISIBLE" | "HIDDEN"
) => {
  await chagnePtzoneStatus(id, { status });

  revalidatePath('/pt/manage');
  revalidatePath('/pt/find');
  redirect('/pt/manage');
}

type PtCourseEditFormData = {
  id?: number;
  sessionNo?: number;
  title: string;
  content: string;
  dayOfWeek?: PtRegistSchedule["dayOfWeek"];
  startTime?: string;
  endTime?: string;
};

export const updatePtCourseAction = async (ptCourseId: number, formData: FormData) => {
  try {
    const curriculums = JSON.parse(String(formData.get("curriculums") ?? "[]")) as PtCourseEditFormData[];
    const schedules = JSON.parse(String(formData.get("schedules") ?? "[]")) as PtCourseEditFormData[];
    const thumbnailFile = formData.get("thumbnailFile");

    if (!curriculums.length || !schedules.length) {
      return { success: false as const, message: "커리큘럼과 수업 시간을 각각 1개 이상 등록해 주세요." };
    }

    const payload: PtCourseUpdateRequest = {
      title: String(formData.get("title") ?? "").trim(),
      description: String(formData.get("description") ?? "").trim(),
      part: String(formData.get("part")) as Part,
      price: Number(formData.get("price")),
      curriculums: curriculums.map((curriculum, index) => ({
        id: curriculum.id,
        sessionNo: index + 1,
        title: curriculum.title.trim(),
        content: curriculum.content.trim(),
      })),
      schedules: schedules.map((schedule) => ({
        id: schedule.id,
        dayOfWeek: schedule.dayOfWeek as PtRegistSchedule["dayOfWeek"],
        startTime: String(schedule.startTime),
        endTime: String(schedule.endTime),
      })),
    };

    if (thumbnailFile instanceof File && thumbnailFile.size > 0) {
      const [uploadedThumbnail] = await uploadFilesPresignedUrl([
        { file: thumbnailFile, fileType: "PT_THUMBNAIL" },
      ]);
      payload.thumbnailFile = uploadedThumbnail;
    }

    const parts: Part[] = ["CHEST", "BACK", "SHOULDER", "ARM", "ABS", "CORE", "LEG", "GLUTE", "FULL_BODY"];

    if (!payload.title || !payload.description || !parts.includes(payload.part) || !Number.isFinite(payload.price) || payload.price < 0) {
      return { success: false as const, message: "강습 정보 입력값을 확인해 주세요." };
    }

    await updatePtCourse(ptCourseId, payload);
    revalidatePath("/pt");
    revalidatePath("/pt/find");
    revalidatePath("/pt/manage");
    revalidatePath(`/pt/manage/${ptCourseId}`);

    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "PT 강습 수정에 실패하였습니다.",
    };
  }
};

export const deletePtCourseAction = async (ptCourseId: number) => {
  try {
    await deletePtCourse(ptCourseId);
    revalidatePath("/pt");
    revalidatePath("/pt/find");
    revalidatePath("/pt/manage");

    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "PT 강습 삭제에 실패하였습니다.",
    };
  }
};

export const getPtAvailableDatesAction = async (ptCourseId: number) => {
  return getPtResrvationAvailableDates(ptCourseId);
};

export const getPtAvailableTimesAction = async (
  ptCourseId: number,
  date: string
) => {
  return getPtResrvationAvailableTimes(ptCourseId, date);
};

// PT 예약하기 액션
export const createPtReservationAction = async (
  ptCourseId: number,
  payload: PtReservationRequest
) => {
  return createPtReservation(ptCourseId, payload);
};

// PT 예약 수강 상태 변경
export const changePtReservationStatus = async (
  ptCourseId: number,
  reservationId: number,
  status: PtReservationStatusChangeRequest["status"]
) => {
  try {
    const response = await chagnePtzoneResrvationStatus(reservationId, {
      status,
    });

    revalidatePath(`/pt/manage/${ptCourseId}`);

    return {
      success: true as const,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error
          ? error.message
          : "수강생 상태 변경에 실패했습니다.",
    };
  }
};

// 내 예약 기록 목록 조회 액션
export const getMyPtReservationListsAction =
  async (): Promise<MyPtReservationListsActionResult> => {
    try {
      const response = await getMyPtReservationLists();

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "내 예약 기록 목록 조회에 실패하였습니다.",
      };
    }
  };

// 내 예약 기록 상세 조회 액션
export const getMyPtReservationDetailAction = async (
  reservationId: string
): Promise<MyPtReservationDetailActionResult> => {
  try {
    const response = await getMyPtReservationDetail(reservationId);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "내 예약 기록 상세 조회에 실패하였습니다.",
    };
  }
};

// 수강평 작성
export const createPtReviewAction = async (
  ptCourseId: number,
  ptReservationId: string,
  payload: PtReviewCreateRequest
) => {
  try {
    const response = await createPtReview(ptCourseId, ptReservationId, {
      rating: payload.rating,
      content: payload.content.trim(),
    });

    revalidatePath(`/pt/records/${ptReservationId}`);

    return { success: true, message: response.message };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "수강평 등록에 실패하였습니다.",
    };
  }
};
type TrainerReviewListActionResult =
  | {
      success: true;
      data: TrainerReviewListData;
    }
  | {
      success: false;
      message: string;
    };

// 강사평 목록 조회
export const getTrainerReviewListAction = async (
  trainerProfileId: number,
  request: TrainerReviewListRequest = {}
): Promise<TrainerReviewListActionResult> => {
  try {
    const response = await getTrainerReviewList(trainerProfileId, request);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "수강평 목록 조회에 실패하였습니다.",
    };
  }
};

// 강사평 요약 조회
export const getTrainerReviewSummaryAction = async (
  trainerProfileId: number
) => {
  try {
    const response = await getTrainerReviewSummary(trainerProfileId);

    return {
      success: true as const,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false as const,
      message:
        error instanceof Error
          ? error.message
          : "강사평 요약 조회에 실패하였습니다.",
    };
  }
};

// 수강평 수정
export const updatePtReviewAction = async (
  ptCourseId: string,
  reviewId: number,
  payload: PtReviewCreateRequest
) => {
  try {
    if (!Number.isInteger(payload.rating) || payload.rating < 1 || payload.rating > 5) {
      return { success: false, message: "별점을 선택해주세요." };
    }

    if (!payload.content.trim()) {
      return { success: false, message: "수강평을 입력해주세요." };
    }

    const response = await updatePtReview(reviewId, {
      rating: payload.rating,
      content: payload.content.trim(),
    });

    revalidatePath(`/pt/${ptCourseId}/reviews`);

    return { 
      success: true, 
      message: response.message 
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "수강평 수정에 실패하였습니다.",
    };
  }
};

// 수강평 삭제
export const deletePtReviewAction = async (ptCourseId: string, reviewId: number) => {
  try {
    const response = await deletePtReview(reviewId);

    revalidatePath(`/pt/${ptCourseId}/reviews`);

    return { 
      success: true, 
      message: response.message 
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "수강평 삭제에 실패하였습니다.",
    };
  }
};

// 피드백 등록
export const createPtFeedbackAction = async (
  reservationId: string,
  ptCourseId: string,
  formData: FormData
) => {
  const beforeFile = formData.get("beforeFile");
  const afterFile = formData.get("afterFile");

  if (!(beforeFile instanceof File) || beforeFile.size === 0) {
    return { success: false, message: "Before 영상을 업로드해주세요." };
  }

  if (!(afterFile instanceof File) || afterFile.size === 0) {
    return { success: false, message: "After 영상을 업로드해주세요." };
  }

  const uploadedFiles = await uploadFilesPresignedUrl([
    { file: beforeFile, fileType: "FEEDBACK_VIDEO" },
    { file: afterFile, fileType: "FEEDBACK_VIDEO" },
  ]);

  await createFeedback(reservationId, {
    ptCurriculumId: Number(formData.get("ptCurriculumId")),
    content: String(formData.get("content") ?? "").trim(),
    media: [
      { file: uploadedFiles[0], mediaType: "BEFORE" },
      { file: uploadedFiles[1], mediaType: "AFTER" },
    ],
  });

  revalidatePath(`/pt/manage/${ptCourseId}/users/${reservationId}`);

  return { success: true };
};

// 피드백 상세조회 액션
export const getFeedbackDetailAction = async (
  reservationId: string,
  feedbackId: number
): Promise<FeedbackDetailActionResult> => {
  try {
    const response = await getFeedbackDetail(reservationId, String(feedbackId));

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "피드백 상세 조회에 실패하였습니다.",
    };
  }
};

// 온보딩 목록 액션 
export const getOnboardingAction = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if(!accessToken) {
      return null;
    } else {
      return getOnboarding();
    }
}
