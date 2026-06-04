"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createPtCourse } from "@/service/ptzone.service";
import { PtActionState } from "./type";

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
  _prevState: PtActionState,
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