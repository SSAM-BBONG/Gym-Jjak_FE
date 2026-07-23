"use server";

import {
  getOrganizationPtCourses,
  getOrganizationPtStudents,
  getPublicOrganizationDetail,
  getOrganizationSales,
  getOrganizationStats,
  getOrganizationTrainerStats,
} from "@/service/organization.service";
import {
  OrganizationPublicDetailData,
  OrganizationSalesData,
  OrganizationStatsData,
} from "./type";

type OrganizationDashboardActionResult<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      message: string;
    };

export const getOrganizationStatsAction = async () => {
  try {
    const response = await getOrganizationStats();

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "헬스장 통계 조회에 실패하였습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const getOrganizationSalesAction = async () => {
  try {
    const response = await getOrganizationSales();

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "매출 관리 조회에 실패하였습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const getOrganizationTrainerStatsAction = async () => {
  try {
    const response = await getOrganizationTrainerStats();

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "트레이너별 통계 조회에 실패하였습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};

export const getOrganizationPtCoursesAction = async () => {
    return await getOrganizationPtCourses();
};

export const getOrganizationPtStudentsAction = async (ptCourseId: number) => {
  try {
    const response = await getOrganizationPtStudents(ptCourseId);

    return {
      success: true as const,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "PT 수강생 목록 조회에 실패하였습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false as const,
      message: errorMessage,
    };
  }
};

export const getPublicOrganizationDetailAction = async (
  organizationId: number
): Promise<OrganizationDashboardActionResult<OrganizationPublicDetailData>> => {
  try {
    const response = await getPublicOrganizationDetail(organizationId);

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    let errorMessage = "조직 상세 조회에 실패하였습니다.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      success: false,
      message: errorMessage,
    };
  }
};
