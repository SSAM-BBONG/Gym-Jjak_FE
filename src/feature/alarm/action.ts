'use server'

import { deleteAlarms, patchReadAlarms } from "@/service/alarm.service";
import { redirect } from "next/navigation";

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
    redirect('/alarm');
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
    redirect('/alarm');

}