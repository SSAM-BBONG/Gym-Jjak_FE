"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPtCourse, getTrainerCancel, trainerApplication, updateTrainerApplication } from "@/service/ptzone.service";
import { PtActionState, TrainerApplicationData, TrainerApplicationEditData } from "./type";
import { uploadFilesPresignedUrl } from "@/service/file.service";

type RequiredField =
  | "title"
  | "description"
  | "categoryId"
  | "tagId"
  | "price"
  | "totalSessionCount";

const requiredFields: RequiredField[] = [
  "title",
  "description",
  "categoryId",
  "tagId",
  "price",
  "totalSessionCount",
] as const;

const getRequiredString = (
  formData: FormData,
  field: RequiredField,
  errors: Record<string, string>
) => {
  const value = formData.get(field);

  if (typeof value !== "string" || !value.trim()) {
    errors[field] = "필수 입력값입니다.";
    return "";
  }

  return value.trim();
};

const getNumber = (
  value: string,
  field: string,
  errors: Record<string, string>
) => {
  const numberValue = Number(value);

  if (!Number.isFinite(numberValue)) {
    errors[field] = "숫자로 입력해주세요.";
    return 0;
  }

  return numberValue;
};

export const createPtCourseAction = async (
  prevState: PtActionState,
  formData: FormData
): Promise<PtActionState> => {
  const thumbnail = formData.get("thumbnail");
  const errors: Record<string, string> = {};

  const values = requiredFields.reduce((acc, field) => {
    acc[field] = getRequiredString(formData, field, errors);
    return acc;
  }, {} as Record<RequiredField, string>);

  const {
    title,
    description,
    categoryId: categoryIdValue,
    tagId: tagIdValue,
    price: priceValue,
    totalSessionCount: totalSessionCountValue,
  } = values;

  const categoryId = getNumber(categoryIdValue, "categoryId", errors);
  const tagId = getNumber(tagIdValue, "tagId", errors);
  const price = getNumber(priceValue, "price", errors);
  const totalSessionCount = getNumber(
    totalSessionCountValue,
    "totalSessionCount",
    errors
  );

  if (categoryId < 1) {
    errors.categoryId = "카테고리를 선택해주세요.";
  }

  if (tagId < 1) {
    errors.tagId = "태그를 선택해주세요.";
  }

  if (price < 0) {
    errors.price = "가격은 0 이상이어야 합니다.";
  }

  if (totalSessionCount < 1) {
    errors.totalSessionCount = "전체 회차 수는 1 이상이어야 합니다.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors,
    };
  }

  const request = {
    title,
    description,
    categoryId,
    tagId,
    price,
    totalSessionCount,
  };

  const payload = new FormData();

  if (thumbnail instanceof File && thumbnail.size > 0) {
    payload.append("thumbnail", thumbnail);
  }

  payload.append(
    "data",
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  );

  try {
    await createPtCourse(payload);
  } catch (error) {
    let message = "PT 강습 등록 중 오류가 발생했습니다.";

    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    return {
      success: false,
      message,
      errors: {},
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