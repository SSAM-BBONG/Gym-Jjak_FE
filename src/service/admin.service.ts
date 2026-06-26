import { axiosFetch } from "@/lib/api";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";
import { cache } from "react";

export const getCategories = cache(async () => {
    const response = await fetchWithAuth('/api/categories');

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
})


export const createCategories = async (payload: { name: string }) => {
    const response = await fetchWithAuth(`/api/categories`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 등록에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const updateCategories = async (categoryId: number, payload: { name: string }) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 수정에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const deleteCategories = async (categoryId: number) => {
    const response = await fetchWithAuth(`/api/categories/${categoryId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 삭제에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

//조직 목록 조회
export const getOrganization = async (page: string = '0') => {
    const response = await fetchWithAuth(`/api/organizations?page=${page}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

//조직 상세 조회


//트레이너 신청 목록 조회
export const getTrainerApplications = async (page: string = '0', status: string | null, keyword: string | null) => {
    const response = await fetchWithAuth(`/api/trainer-applications?page=${page}${status ? `&status=${status}` : ""}${keyword ? `&keyword=${keyword}` : ""}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '트레이너 신청 목록 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const getTrainerApplicationsById = async (applicationId: number) => {
    const response = await fetchWithAuth(`/api/trainer-applications/${applicationId}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '트레이너 신청 상세 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const approvalTrainerApplication = async (trainerApplicationId: number) => {
    const response = await fetchWithAuth(`/api/trainer-applications/${trainerApplicationId}/approve`, {
        method: "PATCH"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '트레이너 승인에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const rejectTrainerApplication = async (applicationId: number, reason: { rejectReason: string }) => {
    const response = await fetchWithAuth(`/api/trainer-applications/${applicationId}/reject`, {
        method: "PATCH",
        body: JSON.stringify(reason)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '트레이너 반려에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const getUserList = async (page: string = '0', keyword: string) => {
    const response = await fetchWithAuth(`/api/users/all?page=${page}${keyword ? `&keyword=${keyword}` : ''}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '유저 목록 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const getBlacklist = async (page: string = '0', keyword: string) => {
    const response = await fetchWithAuth(`/api/users/blacklist?page=${page}${keyword ? `&keyword=${keyword}` : ''}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '블랙리스트 목록 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const getTrainer = async (page: string = '0', keyword: string) => {
    const response = await fetchWithAuth(`/api/users/trainer?page=${page}${keyword ? `&keyword=${keyword}` : ''}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '트레이너 목록 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const getTrainerDetail = async (trainerProfileId: number) => {
    const response = await fetchWithAuth(`/api/trainers/${trainerProfileId}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '트레이너 목록 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const patchUserStatus = async (userId: number, reason: UserStatusRequest) => {
    const response = await fetchWithAuth(`/api/users/${userId}/status`, {
        method: 'PATCH',
        body: JSON.stringify(reason)
    })

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '유저 상태 변경에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}


