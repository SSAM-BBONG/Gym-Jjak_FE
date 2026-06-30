"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { chagnePtzoneStatus, createPtCourse, getPtResrvationAvailableDates, getPtResrvationAvailableTimes, getTrainerCancel, trainerApplication, updateTrainerApplication } from "@/service/ptzone.service";
import { PtRegistRequest, PtRegistSchedule, TrainerApplicationData, TrainerApplicationEditData } from "./type";
import { uploadFilesPresignedUrl } from "@/service/file.service";

type PtRegistCurriculumFormData = {
  title: string;
  content: string;
};

// PT 등록 액션
export const createPtRegistAction = async (formData: FormData) => {
  const thumbnailFile = formData.get("thumbnailFile");

  if (!(thumbnailFile instanceof File) || thumbnailFile.size === 0) {
    return {
      success: false,
      message: "썸네일 이미지를 등록해주세요.",
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
    categoryId: Number(formData.get("categoryId")),
    tagId: Number(formData.get("tagId")),
    price: Number(formData.get("price")),
    thumbnailFile: uploadedThumbnailFile,
    curriculums: curriculums.map((curriculum, index) => ({
      sessionNo: index + 1,
      title: curriculum.title,
      content: curriculum.content,
    })),
    schedules,
  };

  await createPtCourse(payload);

  revalidatePath("/pt");
  revalidatePath("/pt/find");
  revalidatePath("/pt/manage");

  redirect("/pt/manage");
};

// 트레이너 등록 액션
export const trainerApplicationAction = async (formData: FormData) => {
  const profileImageFile = formData.get("profileImageFile");
  const certificateFile = formData.get("certificateFile");

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
    profileImageFile: hasProfileImage ? uploadedFiles[0] : null,
    certificateFile: hasProfileImage ? uploadedFiles[1] : uploadedFiles[0],
    qualifications,
    awardHistories,
    introduction,
  };

  await trainerApplication(payload);

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
  await updateTrainerApplication(id, payload);

  revalidatePath("/pt/trainer-apply");
  revalidatePath("/pt/trainer-apply/edit");

  redirect("/pt/trainer-apply");
};

export const deleteTrainerApplication = async (id:number) => {
  await getTrainerCancel(id);

  revalidatePath('/pt/trainer-apply');
  revalidatePath('/pt/trainer-apply/edit');
  redirect('/pt');
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

export const getPtAvailableDatesAction = async (ptCourseId: number) => {
  return getPtResrvationAvailableDates(ptCourseId);
};

export const getPtAvailableTimesAction = async (
  ptCourseId: number,
  date: string
) => {
  return getPtResrvationAvailableTimes(ptCourseId, date);
};