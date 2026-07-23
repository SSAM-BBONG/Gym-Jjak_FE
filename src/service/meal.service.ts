import type { GoalRequest, MealAiRequest, MealRequest } from "@/feature/Meal/type";
import { fetchWithAuth } from "@/lib/feth";
import { getErrorMessage } from "@/lib/stateError";

export const postMeal = async (meal: MealRequest) => {
    const response = await fetchWithAuth(`/api/diet/meals`, {
        method: "POST",
        body: JSON.stringify(meal),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "식단 등록에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const getMeal = async (mealId: number) => {
    const response = await fetchWithAuth(`/api/diet/meals/${mealId}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "식단 상세 조회에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const patchMeal = async (mealId: number, meal: MealRequest) => {
    const response = await fetchWithAuth(`/api/diet/meals/${mealId}`, {
        method: "PATCH",
        body: JSON.stringify(meal),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "식단 수정에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const getMeals = async (date?: string, page?: string) => {
    const params = new URLSearchParams();

    if (date) {
        params.set("date", date);
    }

    if (page !== undefined) {
        params.set("page", String(page));
    }

    const query = params.toString();

    const response = await fetchWithAuth(`/api/diet/meals${query ? `?${query}` : ""}`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "식단 목록 조회에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const deleteMeal = async (mealId: number) => {
    const response = await fetchWithAuth(`/api/diet/meals/${mealId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "식단 삭제에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

// 트레이너용 식단 상세 조회
export const getTrainerMeal = async (mealId: number, targetUserId: number) => {
    const params = new URLSearchParams();
    params.set("targetUserId", String(targetUserId));

    const response = await fetchWithAuth(
        `/api/diet/meals/${mealId}?${params.toString()}`
    );

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "회원 식단 상세 조회에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

// 트레이너용 식단 목록 조회
export const getTrainerMeals = async (targetUserId: number, date?: string, page?: number) => {
    const params = new URLSearchParams();
    params.set("targetUserId", String(targetUserId));

    if (date) {
        params.set("date", date);
    }

    if (page !== undefined) {
        params.set("page", String(page));
    }

    const response = await fetchWithAuth(
        `/api/diet/meals?${params.toString()}`
    );

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "회원 식단 목록 조회에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const getNutritionGoal = async () => {
    const response = await fetchWithAuth(`/api/diet/nutrition-goals`);

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "영양 목표 조회에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const postNutritionGoal = async (goal: GoalRequest) => {
    const response = await fetchWithAuth(`/api/diet/nutrition-goals`, {
        method: "POST",
        body: JSON.stringify(goal),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "영양 목표 등록에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const patchNutritionGoal = async (goal: GoalRequest) => {
    const response = await fetchWithAuth(`/api/diet/nutrition-goals`, {
        method: "PATCH",
        body: JSON.stringify(goal),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "영양 목표 수정에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};

export const deleteNutritionGoal = async () => {
    const response = await fetchWithAuth(`/api/diet/nutrition-goals`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "영양 목표 삭제에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};


export const postAiMeal = async (meal: MealAiRequest) => {
    const response = await fetchWithAuth(`/api/diet/meals/ai-analyze`, {
        method: "POST",
        body: JSON.stringify(meal),
    });

    if (!response.ok) {
        const message = await getErrorMessage(
            response,
            "식단 분석 및 등록에 실패했습니다."
        );

        throw new Error(message);
    }

    return response.json();
};
