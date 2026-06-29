import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const getAlarms = async () => {
    const response = await fetchWithAuth('/api/notifications');

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '알림 전체 조회에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}

export const patchReadAlarms = async (payload: { notificationIds: number[] }) => {
    const response = await fetchWithAuth(`/api/notifications/read`, {
        method: "PATCH",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '알림 읽음 처리에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}


export const deleteAlarms = async (payload: { notificationIds: number[] }) => {
    const response = await fetchWithAuth(`/api/notifications`, {
        method: "DELETE",
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            '알림 삭제에 실패하였습니다.'
        );

        throw new Error(message);
    }

    return response.json();
}