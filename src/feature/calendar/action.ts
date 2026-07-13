'use server'

import { deleteCalendar, getCalendarDate, getCalendarMonth, getDiaryCategories, patchCalendar, postCalendar } from "@/service/calendar.service";

interface ActionState {
    success: boolean;
    message?: string;
}

export const calendargetMonthAction = async (year: string, month: string) => {
    if (!year || !month) {

    }

    try {
        const response = await getCalendarMonth(year, month);
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}

export const calendargetDateAction = async (date: string) => {
    try {
        const response = await getCalendarDate(date);
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}

export const calendarPostAction = async (selectedSettingDate: string, formData: FormData): Promise<ActionState> => {
    const diaryDate = selectedSettingDate;
    const exercise = formData.get('exerciseName') as string;
    const part = formData.get('part') as Part;
    const kgs = formData.getAll('kg') as string[];
    const reps = formData.getAll('rep') as string[];

    if (!exercise || !part || !kgs.every(kg => kg.trim()) || !reps.every(rep => rep.trim())) {
        return {
            success: false,
            message: '값을 모두 입력해주세요'
        }
    }



    const sets: ExerciseSet[] = kgs.map((kg, index) => {
        return { setOrder: index + 1, weight: Number(kg), reps: Number(reps[index]) }
    })

    const payload: DiaryRequest = {
        diaryDate, exercise, part, sets
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

export const getCalendarCategory = async () => {
    try {
        const response = await getDiaryCategories();
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
}