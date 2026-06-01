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
    errors[field] = "?꾩닔 ?낅젰媛믪엯?덈떎.";
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
    errors[field] = "?レ옄濡??낅젰?댁＜?몄슂.";
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
    errors.categoryId = "移댄뀒怨좊━瑜??좏깮?댁＜?몄슂.";
  }

  if (tagId < 1) {
    errors.tagId = "?쒓렇瑜??좏깮?댁＜?몄슂.";
  }

  if (price < 0) {
    errors.price = "媛寃⑹? 0 ?댁긽?댁뼱???⑸땲??";
  }

  if (totalSessionCount < 1) {
    errors.totalSessionCount = "?꾩껜 ?뚯감 ?섎뒗 1 ?댁긽?댁뼱???⑸땲??";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "?낅젰媛믪쓣 ?뺤씤?댁＜?몄슂.",
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
    let message = "PT 媛뺤뒿 ?깅줉 以??ㅻ쪟媛 諛쒖깮?덉뒿?덈떎.";

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
