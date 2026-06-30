import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const getCalendarMonth = async (year: string, month: string) => {
    const response = await fetch(
        `/api/calendar/month?year=${year}&month=${month}`
    );
    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '캘린더 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}



export const getCalendarDate = async (date: string) => {
    const response = await fetch(`/api/calendar/day?date=${date}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '캘린더 일별 조회에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}

export const postCalendar = async (diary: DiaryRequest) => {
    const response = await fetchWithAuth(`/api/calendar/diaries`, {
        method: 'POST',
        body: JSON.stringify(diary)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '캘린더 일별 등록에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}


export const patchCalendar = async (diaryId: number, diary: DiaryUpdate) => {
    const response = await fetchWithAuth(`/api/calendar/diaries/${diaryId}`, {
        method: 'PATCH',
        body: JSON.stringify(diary)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '캘린더 일별 수정에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}


export const deleteCalendar = async (diaryId: number) => {
    const response = await fetchWithAuth(`/api/calendar/diaries/${diaryId}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '캘린더 일별 삭제에 실패했습니다.'
        );

        throw new Error(message);
    }
    return response.json();
}


export const getDiaryCategories = async () => {
    const response = await fetch('/api/categories');

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '카테고리 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}



