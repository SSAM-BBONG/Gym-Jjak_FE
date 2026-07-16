import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

//운동 종류
export const getExercises = async (part?: PartKo | '', keyword?: string) => {
    const params = new URLSearchParams();

    if (part) {
        params.set("part", part);
    }

    if (keyword) {
        params.set("keyword", keyword);
    }

    const queryString = params.toString();

    const response = await fetchWithAuth(
        `/api/exercises${queryString ? `?${queryString}` : ""}`
    );

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '운동 종류 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const createExercises = async (payload: ExerciseRequest) => {
    const response = await fetchWithAuth(`/api/exercises`, {
        method: "POST",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '운동 종류 등록에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const updateExercises = async (exerciseId: number, payload: ExerciseUpdateRequest) => {
    const response = await fetchWithAuth(`/api/exercises/${exerciseId}`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '운동 종류 수정에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const deleteExercises = async (exerciseId: number) => {
    const response = await fetchWithAuth(`/api/exercises/${exerciseId}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '운동 종류 삭제에 실패하였습니다.'
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
export const getOrganizationDetailAdmin = async (organizationId: number) => {
    const response = await fetchWithAuth(`/api/organizations/${organizationId}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 상세 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

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
            '트레이너 상세 조회에 실패했습니다.'
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



export const getUserDashboard = async () => {
    const response = await fetchWithAuth(`/api/dashboard/admin/members`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '대시보드 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const getContentDashboard = async () => {
    const response = await fetchWithAuth(`/api/dashboard/admin/contents`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '대시보드 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const getReservationDashboard = async () => {
    const response = await fetchWithAuth(`/api/dashboard/admin/reservations`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '대시보드 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}


