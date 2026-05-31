"use server";

import axios from "axios";
import { createOrganizationApplication } from "@/service/mypage.service";
import { MypageActionState } from "./type";

// 필수 입력값 설정
const requiredFields = [
  "requestedLoginId",
  "businessRegistrationNumber",
  "businessName",
  "representativeName",
  "representativePhone",
  "openingDate",
  "roadAddress",
] as const; //정확한 문자열 리터럴 목록으로 고정하기 위해 사용

export const createOrganizationApplicationAction = async (prevState: MypageActionState, formData: FormData): Promise<MypageActionState> => {
  const file = formData.get("file");
  const requestedLoginId = formData.get("requestedLoginId") as string;
  const businessRegistrationNumber = formData.get("businessRegistrationNumber") as string;
  const businessName = formData.get("businessName") as string;
  const representativeName = formData.get("representativeName") as string;
  const representativePhone = formData.get("representativePhone") as string;
  const openingDate = formData.get("openingDate") as string;
  const roadAddress = formData.get("roadAddress") as string;
  const jibunAddress = formData.get("jibunAddress") as string;
  const latitude = formData.get("latitude") as string;
  const longitude = formData.get("longitude") as string;
  const facilityPhone = formData.get("facilityPhone") as string;
  const instagramUrl = formData.get("instagramUrl") as string;
  const blogUrl = formData.get("blogUrl") as string;
  const websiteUrl = formData.get("websiteUrl") as string;

  // 유효성 검사 ( 대부분 AI 작성 코드 )
  // 에러 저장할 객체
  const errors: Record<string, string> = {};

  // 파일 X && 크기 0 일때 오류 발생하도록 설정
  if (!(file instanceof File) || file.size === 0) {
    errors.file = "사업자등록증 파일을 첨부해주세요.";
  }

  // 위에서 작성한 필수 배열값 forEach로 반복
  requiredFields.forEach((field) => {
    const value = formData.get(field);

    // 필수 값들이 문자열이 아니면 에러처리
    if (typeof value !== "string" || !value.trim()) {
      errors[field] = "필수 입력값입니다.";
    }
  });

  // 사업자 번호 숫자 10자리 아닐경우 에러처리
  if (
    businessRegistrationNumber &&
    !/^\d{10}$/.test(businessRegistrationNumber)
  ) {
    errors.businessRegistrationNumber =
      "사업자등록번호는 숫자 10자리여야 합니다.";
  }

  // 개업일자 입력시 검사하도록 설정
  if (openingDate) {
    // 개업일자가 현재 날짜보다 지난날짜면 에러처리
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const inputDate = new Date(openingDate);

    if (Number.isNaN(inputDate.getTime()) || inputDate > today) {
      errors.openingDate = "개업일자는 오늘 또는 과거 날짜여야 합니다.";
    }
  }

  // 에러객체가 하나라도 있으면 에러처리
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors,
    };
  }

  // 데이터 가공, 백엔드에 보낼 데이터 생성
  const request = {
    requestedLoginId: requestedLoginId.trim(),
    businessRegistrationNumber: businessRegistrationNumber.trim(),
    businessName: businessName.trim(),
    representativeName: representativeName.trim(),
    representativePhone: representativePhone.trim(),
    openingDate: openingDate.trim(),
    roadAddress: roadAddress.trim(),
    jibunAddress: jibunAddress?.trim() ?? "", // 선택
    latitude: Number(latitude),
    longitude: Number(longitude),
    facilityPhone: facilityPhone?.trim() ?? "", // 선택
    instagramUrl: instagramUrl?.trim() ?? "", // 선택
    blogUrl: blogUrl?.trim() ?? "", // 선택
    websiteUrl: websiteUrl?.trim() ?? "", // 선택
  };


  // AI 도움 코드
  // 파일과 JSON을 같이 보내기 위해 ForMData() 생성
  const payload = new FormData();

  // 사업자등록증 파일 fileㅣ 이름으로 추가
  payload.append("file", file as File);
  
  payload.append(
    "request",
    // 백엔드에 보낼 JSON 데이터 이름
    new Blob([JSON.stringify(request)], {
      type: "application/json",
    })
  );

  // API 요청
  try {
    await createOrganizationApplication(payload);
  } catch (error) {
    let message = "조직 계정 신청 중 오류가 발생했습니다.";

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

  return {
    success: true,
    message: "조직 계정 신청이 완료되었습니다.",
    errors: {},
  };
};