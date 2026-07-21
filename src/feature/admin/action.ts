'use server'

import { approvalTrainerApplication, createExercises, deleteExercises, getOrganizationDetailAdmin, getTrainerApplicationsById, getTrainerDetail, patchUserStatus, rejectTrainerApplication, updateExercises } from "@/service/admin.service";
import { approvalOrganization, approvalReport, createReport, deleteReportGroup, getOrganizationApplicationDetailAdmin, getReportPtbyId, getReportSnapshot, rejectOrganization, rejectReport } from "@/service/report.service"
interface ActionState {
    success: boolean;
    message: string;
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

export const organizationApprovalAction = async (applicationId: number): Promise<ActionState> => {
    try {
        await approvalOrganization(applicationId);

        return {
            success: true,
            message: '기관 승인이 완료되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}



export const organizationRejectAction = async (applicationId: number, formData: FormData): Promise<ActionState> => {
    const reasonValue = formData.get('reason');
    const reason = typeof reasonValue === 'string' ? reasonValue.trim() : '';

    if (!reason) {
        return {
            success: false,
            message: '반려 사유를 입력해주세요',
        }
    }

    const payload = {
        rejectReason: reason
    }

    try {
        await rejectOrganization(applicationId, payload);

        return {
            success: true,
            message: '기관 반려가 완료되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}



export const deleteExerciseAction = async (exerciseId: number): Promise<ActionState> => {
    try {
        await deleteExercises(exerciseId);

        return {
            success: true,
            message: '운동 종류가 삭제되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}


export const createExerciseAction = async (formData: FormData): Promise<ActionState> => {
    const partValue = formData.get('part');
    const exerciseNameValue = formData.get('exerciseName');
    const part = typeof partValue === 'string' ? partValue : '';
    const exerciseName = typeof exerciseNameValue === 'string' ? exerciseNameValue.trim() : '';

    if (!part) {
        return {
            success: false,
            message: '운동 부위를 선택해주세요',
        }
    }

    if (!exerciseName) {
        return {
            success: false,
            message: '운동 이름을 입력해주세요',
        }
    }

    const payload: ExerciseRequest = {
        part: part as PartKo,
        exerciseName
    }

    try {
        await createExercises(payload);

        return {
            success: true,
            message: '운동 종류가 등록되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}


export const updateExerciseAction = async (id: number, formData: FormData): Promise<ActionState> => {
    const exerciseName = formData.get('exerciseName') as string;

    if (!exerciseName.trim()) {
        return {
            success: false,
            message: '운동 이름을 입력해주세요',
        }
    }

    const payload: ExerciseUpdateRequest = {
        exerciseName
    }

    try {
        await updateExercises(id, payload);

        return {
            success: true,
            message: '운동 종류가 수정되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}


export const changeUserStatusAction = async (
    applicationId: number,
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

export const approvalTrainerApplicationAction = async (trainerApplicationId: number): Promise<ActionState> => {
    try {
        await approvalTrainerApplication(trainerApplicationId);

        return {
            success: true,
            message: '트레이너 승인이 완료되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
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


export const deleteReportGroupAction = async (reportGroupId: number): Promise<ActionState> => {
    try {
        await deleteReportGroup(reportGroupId);

        return {
            success: true,
            message: '신고가 수동 삭제되었습니다',
        }
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        }
    }
}

export const getRepostSnapshotAction = async (reportGroupId: number): Promise<RepostSnapshot> => {
    try {
        const response = await getReportSnapshot(reportGroupId);
        return response.data;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}