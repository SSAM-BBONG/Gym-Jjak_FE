'use server'

import { approvalTrainerApplication, createExercises, deleteExercises, getExercises, getOrganizationDetailAdmin, getTrainerApplicationsById, getTrainerDetail, patchUserStatus, rejectTrainerApplication, updateExercises } from "@/service/admin.service";
import { approvalOrganization, approvalReport, createReport, getOrganizationApplicationDetailAdmin, getReportPtbyId, rejectOrganization, rejectReport } from "@/service/report.service"
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



export const deleteExerciseAction = async (exerciseId: number) => {
    try {
        await deleteExercises(exerciseId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }


    redirect('/admin/systems/exercises')
}


export const createExerciseAction = async (formData: FormData) => {
    const part = formData.get('part') as PartKo;
    const exerciseName = formData.get('exerciseName') as string;
    const payload: ExerciseRequest = {
        part, exerciseName
    }

    try {
        await createExercises(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect(`/admin/systems/exercises?part=하체`)

}


export const updateExerciseAction = async (id: number, formData: FormData) => {
    const exerciseName = formData.get('exerciseName') as string;
    const part = formData.get('part') as PartKo;

    const payload: ExerciseUpdateRequest = {
        exerciseName
    }

    try {
        await updateExercises(id, payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }

    redirect(`/admin/systems/exercises?part=하체`)

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



//신고 등록
export const createReportAction = async (
    targetId: number,
    targetType: "PT_COURSE" | "TRAINER_REVIEW" | "COMMENT" | "POST" | "FEEDBACK",
    formData: FormData
) => {
    const reason = formData.get('reason') as "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC" | 'default';
    const detail = formData.get('detail') as string;

    if (!detail.trim()) {
        return {
            success: false,
            message: '사유를 입력해주세요',
        }
    }

    if (reason === 'default') {
        return {
            success: false,
            message: '신고 사유를 선택해주세요',
        }
    }

    const payload: ReportRequest = { targetId, targetType, reason, detail }

    try {
        await createReport(payload);

        return {
            success: true,
            message: '신고가 접수되었습니다',
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

    return {
        success: true,
        message: '신고가 접수되었습니다',
    }
}
