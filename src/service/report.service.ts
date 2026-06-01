import { axiosFetch } from "@/lib/api"
import { cache } from "react";

export const getReport = cache(async (targetType: string, page: string) => {
    const response = await axiosFetch(`/api/reportgroup/list?targetType=${targetType}&page=${page}`);

    return response;
})

export const getReportPtbyId = cache(async (reportGroupId: number) => {
    const response = await axiosFetch(`/api/reportgroup/detail/${reportGroupId}`)

    return response
})

export const approvalReport = async (reportGroupId: number, reportId: number) => {
    const response = await axiosFetch.patch(`/api/reportgroup/${reportGroupId}/reports/${reportId}/approve`)

    return response;
}


export const rejectReport = async (reportGroupId: number, reportId: number) => {
    const response = await axiosFetch.patch(`/api/reportgroup/${reportGroupId}/reports/${reportId}/reject`)

    return response;
}

export const getOrganization = cache(async () => {
    const response = await axiosFetch('/api/organization-applications');

    return response;
})

export const getOrganizationbyId = cache(async (applicationId: number) => {
    const response = await axiosFetch(`/api/organization-applications/${applicationId}`);

    return response;
})


export const approvalOrganization = async (applicationId: number) => {
    const response = await axiosFetch.patch(`/api/organization-applications/${applicationId}/approve`)

    return response;
}


export const rejectOrganization = async (applicationId: number, reason: { rejectReason: string }) => {
    const response = await axiosFetch.patch(`/api/organization-applications/${applicationId}/reject`, reason)

    return response;
}
