'use server'

import { approvalOrganization, approvalReport, getOrganizationbyId, getReportPtbyId, rejectOrganization, rejectReport } from "@/service/report.service"
import { redirect } from "next/navigation";

export const OrganizationDetailAction = async (applicationId: number) => {
    try {
        const response = await getOrganizationbyId(applicationId);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const ReportPtDetailAction = async (reportGroupId: number) => {
    try {
        const response = await getReportPtbyId(reportGroupId);
        console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
    }
}


export const ReportApprovalAction = async (reportGroupId: number, reportId: number) => {
    try {
        const response = await approvalReport(reportGroupId, reportId);
        return response.data;
    } catch (error) {
        console.log(error);
    }


}



export const ReportRejectAction = async (reportGroupId: number, reportId: number) => {
    try {
        const response = await rejectReport(reportGroupId, reportId);
        return response.data;
    } catch (error) {
        console.log(error);
    }

}

export const organizationApprovalAction = async (applicationId: number) => {
    try {
        await approvalOrganization(applicationId);
    } catch (error) {
        console.log(error);
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
        console.log('반려됨:', reason);
    } catch (error) {
        console.log(error);
    }

    redirect('/admin/approvals/organizations?page=1')
}