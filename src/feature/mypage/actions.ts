"use server";

import { addOrganizationManageTrainer, checkMyProfileNicknameAvailability, checkPassword, createOrganizationApplication, deleteInbody, deleteMyAccount, deleteOraganizationTrainer, editMyProfileInformation, editMyTrainerProfileInformation, editOrganizationManageInformation, getInbodyAdd, getMyCommu, getMyPageInformation, getOraganizationsearchTrainers, organizationApplicationCancel, organizationApplicationDupliCationId, patchInbody, postInbody, updatePassword } from "@/service/mypage.service";
import { uploadFilesPresignedUrl } from "@/service/file.service";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { InbodyFormType } from "@/lib/inbodySchema";

export const getHeaderProfileAction = async () => {
  try {
    const response = await getMyPageInformation();

    return response.data;
  } catch {
    return null;
  }
};

// 조직 신청 액션
export const createOrganizationApplicationAction = async (
  formData: FormData
) => {
  try {
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

  const response = await createOrganizationApplication(payload);

  revalidatePath("/mypage/organization");
  revalidatePath("/mypage/organization/application");
  return {
    success: true,
    message: response.message || "조직 계정 신청이 완료되었습니다.",
  };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error
        ? error.message
        : "조직 계정 신청에 실패했습니다. 다시 시도해주세요.",
    };
  }
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

export const checkMyProfileNicknameAvailabilityAction = async (
  nickname: string
) => {
  try {
    const response = await checkMyProfileNicknameAvailability(nickname.trim());

    return {
      success: response.data.available,
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error
        ? error.message
        : "닉네임 중복 확인에 실패했습니다. 다시 시도해주세요.",
    };
  }
};

// 조직 신청 취소 액션
export const organizationApplicationCancelAction = async (applicationId: number) => {
  try {
    await organizationApplicationCancel(applicationId);
    revalidatePath("/mypage/organization");
    revalidatePath("/mypage/organization/application");
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

  redirect("/mypage/organization");
  return {
    success: true,
    message: '중복 확인을 완료헀습니다.'
  }
}

// 내 조직 정보 수정 액션
export const editOrganizationManageInformationAction = async (
  formData: FormData
) => {
  try {
    const payload = {
      facilityPhone: String(formData.get("facilityPhone") ?? "").trim() || undefined,
      instagramUrl: String(formData.get("instagramUrl") ?? "").trim() || undefined,
      blogUrl: String(formData.get("blogUrl") ?? "").trim() || undefined,
      websiteUrl: String(formData.get("websiteUrl") ?? "").trim() || undefined,
    };

    await editOrganizationManageInformation(payload);

    revalidatePath("/mypage/organization/manage");

    return {
      success: true,
      message: "조직 정보가 수정되었씁니다.",
    };
  } catch (error) {
    let errorMessage = "알 수 없는 오류입니다. 다시 시도해주세요.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 내 조직 트레이너 검색 액션
export const organizationTrainerSearchAction = async (keyword: string) => {
  try {
    const response = await getOraganizationsearchTrainers({
      keyword,
      page: 0,
      size: 10,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "트레이너 검색에 실패했습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 내 조직 트레이너 추가 액션
export const addorganizationTrainerAction = async (trainerProfileId: number) => {
  try {
    const response = await addOrganizationManageTrainer({
      trainerProfileId,
    });

    revalidatePath("/mypage/organization/manage/trainer");

    return {
      success: true,
      data: response.data,
      message: "트레이너가 추가되었습니다.",
    };
  } catch (error) {
    let errorMessage = "트레이너 추가에 실패했습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 내 조직 트레니어 삭제 액션
export const deleteOrganizationTrainerAction = async (
  organizationTrainerId: number
) => {
  try {
    await deleteOraganizationTrainer(organizationTrainerId);

    revalidatePath("/mypage/organization/manage/trainer");

    return {
      success: true,
      message: "트레이너가 삭제되었습니다.",
    };
  } catch (error) {
    let errorMessage = "트레이너 삭제에 실패했습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 마이페이지 비밀번호 확인 액션
export const checkPasswordAction = async (password: string) => {
  try {
    if (!password.trim()) {
      return {
        success: false,
        message: "비밀번호를 입력해주세요.",
      };
    }

    await checkPassword(password);

    return {
      success: true,
      message: "비밀번호가 확인되었습니다.",
    };
  } catch (error) {
    let errorMessage = "비밀번호 확인을 실패하였습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 마이페이지 회원탈퇴 액션
export const deleteMyAccountAction = async () => {
  try {
    await deleteMyAccount();

    revalidatePath("/");
  } catch (error) {
    let errorMessage = "회원탈퇴에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");

  return {
    success: true,
    message: "회원탈퇴가 완료되었습니다.",
  };
};

// 마이페이지 비밀번호 변경 액션
export const updatePasswordAction = async (formData: FormData) => {
  try {
    const payload = {
      newPassword: String(formData.get("newPassword") ?? "").trim(),
      checkNewPassword: String(formData.get("checkNewPassword") ?? "").trim(),
    };

    await updatePassword(payload);

    return {
      success: true,
      message: "비밀번호가 변경되었습니다.",
    };
  } catch (error) {
    let errorMessage = "비밀번호 변경에 실패했습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 마이페이지 내 프로필 수정 액션 
export const editMyProfileInformationAction = async (formData: FormData) => {
  try {
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      nickname: String(formData.get("nickname") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
    };

    await editMyProfileInformation(payload);
    revalidatePath("/mypage/profile");

    return {
      success: true,
      message: "프로필 정보가 수정되었습니다."
    };
  } catch (error) {
    let errorMessage = "내 프로필 수정에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

// 내 트레이너 프로필 수정 액션 
export const editMyTrainerProfileInformationAction = async (
  formData: FormData
) => {
  try {
    const profileImageAction = String(
      formData.get("profileImageAction") ?? "KEEP"
    ) as "KEEP" | "REPLACE" | "DELETE";

    const profileImageFile = formData.get("profileImageFile");

    const introduction = String(formData.get("introduction") ?? "").trim();

    const awardHistories = JSON.parse(String(formData.get("awardHistories") ?? "[]")
    ) as string[];

    const additionalCertifications = JSON.parse(String(formData.get("additionalCertifications") ?? "[]")
    ) as string[];

    let uploadedProfileImage = null;

    if (profileImageAction === "REPLACE") {
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

    const payload = {
      profileImageAction,
      profileImageFile: profileImageAction === "REPLACE" ? uploadedProfileImage : null,
      additionalCertifications,
      awardHistories,
      introduction
    };

    await editMyTrainerProfileInformation(payload);

    revalidatePath("/mypage/trainerprofile");

    return {
      success: true,
      message: "트레이너 프로필이 수정되었습니다.",
    };
  } catch (error) {
    let errorMessage = "트레이너 프로필 수정에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const getInbodyDetailAction = async (nextInbodyId: number, nextInbodyDate: string) => {
  try {
    const response = await getInbodyAdd(nextInbodyDate, nextInbodyId);
    return response;
  } catch (error) {
    let errorMessage = "내 인바디 추가 조회에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }

};

export const createInbodyAction = async (data: InbodyFormType) => {
  try {
    await postInbody(data);
  } catch (error) {
    let errorMessage = "내 인바디 등록에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }

  redirect('/mypage/inbody');
};


export const updateInbodyAction = async (inbodyId: number, formData: FormData) => {
  const payload = {

  };
  try {
    // await patchInbody(inbodyId, payload);
    return {
      success: false,
      message: '인바디 수정에 성공하였습니다.',
    };
  } catch (error) {
    let errorMessage = "내 인바디 수정에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }

  return {
    success: false,
    message: '인바디 수정에 성공하였습니다.',
  };
};


export const deleteInbodyAction = async (inbodyId: number) => {
  try {
    await deleteInbody(inbodyId);
  } catch (error) {
    let errorMessage = "내 인바디 삭제에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }

  redirect('/mypage/inbody');
};


export const getMyCommuAction = async (page: string) => {
  try {
    const response = await getMyCommu(page);
    return response;
  } catch (error) {
    let errorMessage = "내 게시글 조회에 실패하였습니다.";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }

};
