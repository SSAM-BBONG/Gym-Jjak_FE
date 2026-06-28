'use server'

import { deleteCalendar, patchCalendar, postCalendar } from "@/service/calendar.service";
import { redirect } from "next/navigation";

interface ActionState {
    success: boolean;
    message?: string;
}

export const calendarPostAction = async (selectedSettingDate: string, formData: FormData): Promise<ActionState> => {
    const diaryDate = selectedSettingDate;
    const categoryName = formData.get('category') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!categoryName || !title.trim() || !content.trim()) {
        return {
            success: false,
            message: '값을 모두 입력해주세요'
        }
    }

    const payload: DiaryRequest = {
        diaryDate, categoryName, title, content
    }

    try {
        await postCalendar(payload)
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
        message: '등록되었습니다'
    }
}

export const calendarPatchAction = async (diaryId: number, formData: FormData): Promise<ActionState> => {
    const categoryName = formData.get('category') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;

    if (!categoryName || !title.trim() || !content.trim()) {
        return {
            success: false,
            message: '값을 모두 입력해주세요'
        }
    }

    const payload: DiaryUpdate = {
        categoryName, title, content
    }

    try {
        await patchCalendar(diaryId, payload)
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
        message: '수정되었습니다'
    }
}

export const deleteCalendarAction = async (diaryId: number) => {
    try {
        await deleteCalendar(diaryId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}
