'use server'

import { approvalTrainerApplication, createCategories, createTags, deleteCategories, deleteTags, getOrganizationDetailAdmin, getTrainerApplicationsById, getTrainerDetail, patchUserStatus, rejectTrainerApplication, updateCategories, updateTags } from "@/service/admin.service";
import { approvalOrganization, approvalReport, getOrganizationApplicationDetailAdmin, getReportPtbyId, rejectOrganization, rejectReport } from "@/service/report.service"
import { redirect } from "next/navigation";

interface ActionState {
    success: boolean;
    message?: string;
}

export const OrganizationApplicationAdminDetailAction = async (organizationId: number) => {
    try {
        const response = await getOrganizationApplicationDetailAdmin(organizationId);
        return response.data;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}

export const OrganizationAdminDetailAction = async (organizationId: number) => {
    try {
        const response = await getOrganizationDetailAdmin(organizationId);
        return response.data;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

}

export const organizationApprovalAction = async (applicationId: number) => {
    try {
        await approvalOrganization(applicationId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
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
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/systems/categories?page=1')

}


export const deleteTagAction = async (tagId: number) => {
    try {
        await deleteTags(tagId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }


    redirect('/admin/systems/tags?page=1')
}


export const createTagAction = async (formData: FormData) => {
    const name = formData.get('name') as string;
    const payload = {
        name
    }

    try {
        await createTags(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/systems/tags?page=1')

}


export const updateTagAction = async (tagId: number, formData: FormData) => {
    const name = formData.get('name') as string;
    const payload = {
        name
    }

    try {
        await updateTags(tagId, payload)
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/systems/tags?page=1')

}

export const changeUserStatusAction = async (
    applicationId: number,
    prevState: ActionState,
    formData: FormData
) => {
    const reason = formData.get('reason') as string;
    const status = formData.get('status') as 'ACTIVE' | 'DAY_7' | 'ETERNAL';

    if (status !== 'ACTIVE' && !reason.trim()) {
        return {
            success: false,
            message: '사유를 입력해주세요',
        }
    }

    const payload = {
        status,
        reason
    }

    try {
        await patchUserStatus(applicationId, payload)

        return {
            success: true,
            message: '변경이 완료되었습니다',
        }
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

}

export const TrainerApplicationAdminDetailAction = async (applicationId: number) => {
    try {
        const response = await getTrainerApplicationsById(applicationId);
        return response.data;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}

export const approvalTrainerApplicationAction = async (trainerApplicationId: number) => {
    try {
        await approvalTrainerApplication(trainerApplicationId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect('/admin/approvals/trainers');
}


export const rejectTrainerApplicationAction = async (applicationId: number, prevState: ActionState, formData: FormData) => {
    const reason = formData.get('reason') as string;

    if (!reason.trim()) {
        return {
            success: false,
            message: '사유를 입력해주세요',
        }
    }

    const payload = {
        rejectReason: reason
    }

    try {
        await rejectTrainerApplication(applicationId, payload);

        return {
            success: true,
            message: '반려가 완료되었습니다',
        }
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
}


export const TrainerAdminDetailAction = async (trainerId: number) => {
    try {
        const response = await getTrainerDetail(trainerId);
        return response.data;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}
