'use server'

import { deleteMeal, deleteNutritionGoal, getMeal, getMeals, getNutritionGoal, getTrainerMeal, getTrainerMeals, MealAiRequestError, patchMeal, patchNutritionGoal, postAiMeal, postMeal, postNutritionGoal, } from "@/service/meal.service";
import type { GoalRequest, MealAi, MealAiRequest, MealRequest, MealType } from "./type";
import { uploadFilesPresignedUrl } from "@/service/file.service";

interface ActionState {
    success: boolean;
    message?: string;
}

export const mealGetAction = async (mealId: number) => {
    try {
        const response = await getMeal(mealId);
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const mealListGetAction = async (date?: string, page?: string) => {
    try {
        const response = await getMeals(date, page);
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const trainerMealGetAction = async (mealId: number, targetUserId: number) => {
    try {
        const response = await getTrainerMeal(mealId, targetUserId);
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 다시 시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const trainerMealListGetAction = async (targetUserId: number, date?: string) => {
    try {
        const response = await getTrainerMeals(targetUserId, date);
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 다시 시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const mealPostAction = async (formData: FormData): Promise<ActionState> => {
    const mealType = formData.get('mealType') as MealType;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const menu = formData.get('menu') as string;
    const kcal = formData.get('kcal') as string | null;
    const carbohydrate = formData.get('carbohydrate') as string | null;
    const protein = formData.get('protein') as string | null;
    const fat = formData.get('fat') as string | null;

    const mealTime = `${date} ${time}`;

    const mealImageFile = formData.get('mealImageFile');

    if (!mealType || !mealTime?.trim() || !menu?.trim()) {
        return {
            success: false,
            message: '필수 값을 모두 입력해주세요.',
        };
    }

    let uploadedMealImageFile = null;
    if (mealImageFile instanceof File && mealImageFile.size > 0) {
        const [uploadedFile] = await uploadFilesPresignedUrl([
            {
                file: mealImageFile,
                fileType: "MEAL_IMAGE",
            },
        ]);
        uploadedMealImageFile = uploadedFile;
    }

    const payload: MealRequest = {
        mealType,
        mealTime,
        menu,
        kcal: Number(kcal),
        carbohydrate: Number(carbohydrate) || null,
        protein: Number(protein) || null,
        fat: Number(fat) || null,
        file: uploadedMealImageFile || null
    };

    try {
        await postMeal(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }

    return {
        success: true,
        message: '등록되었습니다.',
    };
};

export const mealPatchAction = async (mealId: number, formData: FormData): Promise<ActionState> => {
    const mealType = formData.get('mealType') as MealType;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;
    const menu = formData.get('menu') as string;
    const kcal = formData.get('kcal') as string | null;
    const carbohydrate = formData.get('carbohydrate') as string | null;
    const protein = formData.get('protein') as string | null;
    const fat = formData.get('fat') as string | null;

    const mealTime = `${date} ${time}`;

    const mealImageFile = formData.get('mealImageFile');


    if (!mealType || !mealTime?.trim() || !menu?.trim()) {
        return {
            success: false,
            message: '필수 값을 모두 입력해주세요.',
        };
    }

    let uploadedMealImageFile = null;
    if (mealImageFile instanceof File && mealImageFile.size > 0) {
        const [uploadedFile] = await uploadFilesPresignedUrl([
            {
                file: mealImageFile,
                fileType: "MEAL_IMAGE",
            },
        ]);
        uploadedMealImageFile = uploadedFile;
    }

    const image = {
        file: uploadedMealImageFile || null
    }

    const ai = {
        carbohydrate: Number(carbohydrate) || null,
        protein: Number(protein) || null,
        fat: Number(fat) || null,
    }

    let payload: MealRequest = {
        mealType,
        mealTime,
        menu,
        kcal: Number(kcal),
    };

    if (mealImageFile instanceof File && mealImageFile.size > 0) {
        payload = { ...payload, ...image }
    }
    if (carbohydrate || protein || fat) {
        payload = { ...payload, ...ai }
    }

    try {
        await patchMeal(mealId, payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }

    return {
        success: true,
        message: '수정되었습니다.',
    };
};

export const mealDeleteAction = async (mealId: number) => {
    try {
        await deleteMeal(mealId);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
    return {
        success: true,
        message: '식단이 삭제되었습니다.',
    };
};

export const nutritionGoalGetAction = async () => {
    try {
        const response = await getNutritionGoal();
        return response;
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

export const nutritionGoalPostAction = async (formData: FormData): Promise<ActionState> => {
    const goalProteinValue = formData.get('goalProtein') as string;
    const goalCarbohydrateValue = formData.get('goalCarbohydrate') as string;
    const goalFatValue = formData.get('goalFat') as string;
    const dailyGoalKcalValue = formData.get('dailyGoalKcal') as string;

    const payload: GoalRequest = {
        goalProtein: Number(goalProteinValue),
        goalCarbohydrate: Number(goalCarbohydrateValue),
        goalFat: Number(goalFatValue),
        dailyGoalKcal: Number(dailyGoalKcalValue),
    };

    try {
        await postNutritionGoal(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }

    return {
        success: true,
        message: '등록되었습니다.',
    };
};

export const nutritionGoalPatchAction = async (formData: FormData): Promise<ActionState> => {
    const goalProteinValue = formData.get('goalProtein') as string;
    const goalCarbohydrateValue = formData.get('goalCarbohydrate') as string;
    const goalFatValue = formData.get('goalFat') as string;
    const dailyGoalKcalValue = formData.get('dailyGoalKcal') as string;

    const payload: GoalRequest = {
        goalProtein: Number(goalProteinValue),
        goalCarbohydrate: Number(goalCarbohydrateValue),
        goalFat: Number(goalFatValue),
        dailyGoalKcal: Number(dailyGoalKcalValue),
    };

    try {
        await patchNutritionGoal(payload);
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }

    return {
        success: true,
        message: '수정되었습니다.',
    };
};

export const nutritionGoalDeleteAction = async () => {
    try {
        await deleteNutritionGoal();
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
        };
    }
    return {
        success: true,
        message: '영양 목표가 삭제되었습니다.',
    };
};


interface ActionStateAi {
    success: boolean;
    message: string;
    data?: MealAi;
    debug?: {
        requestUrl: string;
        status: number;
        contentType: string | null;
    };
}

export const mealAiPostAction = async (formData: FormData): Promise<ActionStateAi> => {
    const mealType = formData.get('mealType') as MealType;
    const date = formData.get('date') as string;
    const time = formData.get('time') as string;

    const mealTime = `${date} ${time}`;

    const mealImageFile = formData.get('mealImageFile');

    if (!mealType || !mealTime?.trim()) {
        return {
            success: false,
            message: '필수 값을 모두 입력해주세요.',
        };
    }

    let uploadedMealImageFile = null;
    if (mealImageFile instanceof File && mealImageFile.size > 0) {
        const [uploadedFile] = await uploadFilesPresignedUrl([
            {
                file: mealImageFile,
                fileType: "MEAL_IMAGE",
            },
        ]);
        uploadedMealImageFile = uploadedFile;
    } else {
        return {
            success: false,
            message: '이미지를 입력해주세요.',
        };
    }

    const payload: MealAiRequest = {
        mealType,
        mealTime,
        file: uploadedMealImageFile || null
    };

    try {
        const response = await postAiMeal(payload);

        return {
            success: true,
            message: '식단 분석이 완료되었습니다',
            data: response.data
        };
    } catch (error) {
        let errorMessage: string = '알 수 없는 오류입니다. 재시도해주세요.';
        if (error instanceof Error) {
            errorMessage = error.message;
        }

        return {
            success: false,
            message: errorMessage,
            ...(error instanceof MealAiRequestError && {
                debug: {
                    requestUrl: error.requestUrl,
                    status: error.status,
                    contentType: error.contentType,
                },
            }),
        };
    }
};
