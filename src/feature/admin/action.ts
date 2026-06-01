'use server'

import { createCategories, deleteCategories, updateCategories } from "@/service/admin.service";
import { approvalOrganization, approvalReport, getOrganizationbyId, getReportPtbyId, rejectOrganization, rejectReport } from "@/service/report.service"
import axios from "axios";
import { redirect } from "next/navigation";

export const OrganizationDetailAction = async (applicationId: number) => {
    try {
        const response = await getOrganizationbyId(applicationId);
        return response.data;
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}

export const ReportPtDetailAction = async (reportGroupId: number) => {
    try {
        const response = await getReportPtbyId(reportGroupId);
        return response.data;
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}


export const ReportApprovalAction = async (reportGroupId: number, reportId: number) => {
    try {
        const response = await approvalReport(reportGroupId, reportId);
        return response.data;
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }


}



export const ReportRejectAction = async (reportGroupId: number, reportId: number) => {
    try {
        const response = await rejectReport(reportGroupId, reportId);
        return response.data;
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

}

export const organizationApprovalAction = async (applicationId: number) => {
    try {
        await approvalOrganization(applicationId);
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/approvals/organizations?page=1')
}



export const organizationRejectAction = async (applicationId: number, formData: FormData) => {
    const reason = formData.get('reason') as string;

    if (!reason.trim()) {
        return;
    }

    const payload = {
        rejectReason: reason
    }

    try {
        await rejectOrganization(applicationId, payload);

    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/approvals/organizations?page=1')
}



export const deleteCategoryAction = async (categoryId: number) => {
    try {
        await deleteCategories(categoryId);
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }


    redirect('/admin/systems/categories?page=1')
}


export const createCategoryAction = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const payload = {
        name
    }

    try {
        await createCategories(payload);
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/systems/categories?page=1')

}


export const updateCategoryAction = async (id: number, formData: FormData) => {
    const name = formData.get('name') as string;
    const payload = {
        name
    }

    try {
        await updateCategories(id, payload);
    } catch (error) {
        let errorMessage: string = 'Unknown Error';
        if (axios.isAxiosError(error)) {
            // Axios 자체 에러인 경우
            errorMessage = (error.response && error.response.data) ? error.response.data.message : error.message
        } else if (error instanceof Error) {
            // 일반적인 JS 에러인 경우
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/systems/categories?page=1')

}