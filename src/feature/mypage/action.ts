"use server";

import { createOrganizationApplication, organizationApplicationCancel, organizationApplicationDupliCationId } from "@/service/mypage.service";
import { uploadFilesPresignedUrl } from "@/service/file.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 조직 신청 액션
export const createOrganizationApplicationAction = async (
  formData: FormData
) => {
  const businessLicenseFile = formData.get("businessLicenseFile");

  if (!(businessLicenseFile instanceof File) || businessLicenseFile.size === 0) {
    return {
      success: false,
      message: "사업자등록증 파일을 등록해주세요.",
    };
  }

  const [uploadedBusinessLicenseFile] = await uploadFilesPresignedUrl([
    {
      file: businessLicenseFile,
      fileType: "BUSINESS_LICENSE",
    },
  ]);

  const latitude = String(formData.get("latitude") ?? "");
  const longitude = String(formData.get("longitude") ?? "");
  
  const payload = {
    businessLicenseFile: uploadedBusinessLicenseFile,
    requestedLoginId: String(formData.get("requestedLoginId") ?? "").trim(),
    businessRegistrationNumber: String(formData.get("businessRegistrationNumber") ?? "").trim(),
    businessName: String(formData.get("businessName") ?? "").trim(),
    representativeName: String(formData.get("representativeName") ?? "").trim(),
    representativePhone: String(formData.get("representativePhone") ?? "").trim(),
    openingDate: String(formData.get("openingDate") ?? "").trim(),
    roadAddress: String(formData.get("roadAddress") ?? "").trim(),
    jibunAddress: String(formData.get("jibunAddress") ?? "").trim() || undefined,
    detailAddress: String(formData.get("detailAddress") ?? "").trim() || undefined,
    latitude: latitude ? Number(latitude) : undefined,
    longitude: longitude ? Number(longitude) : undefined,
    websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || undefined,
    instagramUrl: String(formData.get("instagramUrl") ?? "").trim() || undefined,
    blogUrl: String(formData.get("blogUrl") ?? "").trim() || undefined,
    facilityPhone: String(formData.get("facilityPhone") ?? "").trim() || undefined,
  };

  await createOrganizationApplication(payload);

  revalidatePath("/mypage/organization");
  revalidatePath("/mypage/organization/application");
  redirect("/mypage/organization/application");
}

// 조직 신청 ID 중복확인 액션
export const organizationIdDuplicationCheckAction = async (loginId: string) => {
      try {
          await organizationApplicationDupliCationId(loginId);
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
  
      return {
          success: true,
          message: '중복 확인을 완료헀습니다.'
      }
} 

export const organizationApplicationCancelAction = async (applicationId:string) => {
  try {
    await organizationApplicationCancel(applicationId);
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
  
      return {
          success: true,
          message: '중복 확인을 완료헀습니다.'
      }
}