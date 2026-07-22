'use server'

import { deleteAlarms, getAlarmUnreadCount, patchReadAlarms } from "@/service/alarm.service";
import { revalidatePath } from "next/cache";

export const getAlarmUnreadCountAction = async () => {
    try {
        const response = await getAlarmUnreadCount();

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        let errorMessage = '미읽음 알림 개수 조회에 실패하였습니다.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
};

export const readAlarmsAction = async (notificationIds: number[]) => {
    try {
        await patchReadAlarms({ notificationIds });
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
    revalidatePath('/alarm');
    return { success: true };
}

export const deleteAlarmsAction = async (notificationIds: number[]) => {
    try {
        await deleteAlarms({ notificationIds });
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.'
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage)
    }
    revalidatePath('/alarm');
    return { success: true };

}
