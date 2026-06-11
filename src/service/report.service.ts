import { axiosFetch } from "@/lib/api"
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";
import { cache } from "react";

export const getReport = cache(async (targetType: string, page: string) => {
    const response = await fetchWithAuth(`/api/reportgroup/list?targetType=${targetType}&page=${page}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '신고 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
})

export const getReportPtbyId = cache(async (reportGroupId: number) => {
    const response = await fetchWithAuth(`/api/reportgroup/detail/${reportGroupId}`)

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '신고 상세 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
})

export const approvalReport = async (reportGroupId: number, reportId: number) => {
    const response = await fetchWithAuth(`/api/reportgroup/${reportGroupId}/reports/${reportId}/approve`, {
        method: "PATCH",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '신고 승인에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const rejectReport = async (reportGroupId: number, reportId: number) => {
    const response = await fetchWithAuth(`/api/reportgroup/${reportGroupId}/reports/${reportId}/reject`, {
        method: "PATCH",
    })

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '신고 반려에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const getOrganization = cache(async () => {
    const response = await fetchWithAuth('/api/organization-applications');

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
})

export const getOrganizationbyId = cache(async (applicationId: number) => {
    const response = await fetchWithAuth(`/api/organization-applications/${applicationId}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 상세 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
})


export const approvalOrganization = async (applicationId: number) => {
    const response = await fetchWithAuth(`/api/organization-applications/${applicationId}/approve`, {
        method: "PATCH",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 승인에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const rejectOrganization = async (applicationId: number, reason: { rejectReason: string }) => {
    const response = await fetchWithAuth(`/api/organization-applications/${applicationId}/reject`, {
        method: "PATCH",
        body: JSON.stringify(reason)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '기관 반려에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}
