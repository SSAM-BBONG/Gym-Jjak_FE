import {
    deleteMeal,
    deleteNutritionGoal,
    getMeal,
    getMeals,
    getNutritionGoal,
    getTrainerMeal,
    getTrainerMeals,
    MealAiRequestError,
    patchMeal,
    patchNutritionGoal,
    postAiMeal,
    postMeal,
    postNutritionGoal,
} from '@/service/meal.service';
import { fetchWithAuth } from '@/lib/feth';
import { getErrorMessage } from '@/lib/stateError';
import type { GoalRequest, MealAiRequest, MealRequest } from '@/feature/Meal/type';

jest.mock('@/lib/feth', () => ({
    fetchWithAuth: jest.fn(),
}));

jest.mock('@/lib/stateError', () => ({
    getErrorMessage: jest.fn(),
}));

const mockedFetchWithAuth = jest.mocked(fetchWithAuth);
const mockedGetErrorMessage = jest.mocked(getErrorMessage);

const meal: MealRequest = {
    mealType: '점심',
    mealTime: '2026-07-26 12:30',
    menu: '닭가슴살 샐러드',
    kcal: 430,
    carbohydrate: 35,
    protein: 42,
    fat: 12,
    file: null,
};

const goal: GoalRequest = {
    goalCarbohydrate: 250,
    goalProtein: 140,
    goalFat: 60,
    dailyGoalKcal: 2100,
};

type MealServiceCase = {
    name: string;
    execute: () => Promise<unknown>;
    url: string;
    options?: RequestInit;
};

const serviceCases: MealServiceCase[] = [
    { name: '식단을 등록한다', execute: () => postMeal(meal), url: '/api/diet/meals', options: { method: 'POST', body: JSON.stringify(meal) } },
    { name: '식단 상세를 조회한다', execute: () => getMeal(3), url: '/api/diet/meals/3' },
    { name: '식단을 수정한다', execute: () => patchMeal(3, meal), url: '/api/diet/meals/3', options: { method: 'PATCH', body: JSON.stringify(meal) } },
    { name: '조건 없이 식단 목록을 조회한다', execute: () => getMeals(), url: '/api/diet/meals' },
    { name: '식단을 삭제한다', execute: () => deleteMeal(3), url: '/api/diet/meals/3', options: { method: 'DELETE' } },
    { name: '회원 식단 상세를 조회한다', execute: () => getTrainerMeal(3, 9), url: '/api/diet/meals/3?targetUserId=9' },
    { name: '회원 식단 목록을 조회한다', execute: () => getTrainerMeals(9, '2026-07-27'), url: '/api/diet/meals?targetUserId=9&date=2026-07-27' },
    { name: '회원 식단 목록을 날짜 없이 조회한다', execute: () => getTrainerMeals(9), url: '/api/diet/meals?targetUserId=9' },
    { name: '영양 목표를 조회한다', execute: () => getNutritionGoal(), url: '/api/diet/nutrition-goals' },
    { name: '영양 목표를 등록한다', execute: () => postNutritionGoal(goal), url: '/api/diet/nutrition-goals', options: { method: 'POST', body: JSON.stringify(goal) } },
    { name: '영양 목표를 수정한다', execute: () => patchNutritionGoal(goal), url: '/api/diet/nutrition-goals', options: { method: 'PATCH', body: JSON.stringify(goal) } },
    { name: '영양 목표를 삭제한다', execute: () => deleteNutritionGoal(), url: '/api/diet/nutrition-goals', options: { method: 'DELETE' } },
];

describe('식단 서비스', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockedGetErrorMessage.mockResolvedValue('API 오류');
    });

    test('선택한 날짜와 페이지를 쿼리로 전달해 식단 목록을 조회한다', async () => {
        // Given
        const responseData = {
            data: {
                meals: [],
                totalPages: 0,
            },
        };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await getMeals('2026-07-26', '0');

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledTimes(1);
        expect(mockedFetchWithAuth).toHaveBeenCalledWith(
            '/api/diet/meals?date=2026-07-26&page=0',
        );
        expect(result).toEqual(responseData);
    });

    test('입력한 식단 정보를 JSON 요청 본문으로 전달해 등록한다', async () => {
        // Given
        const responseData = {
            data: {
                mealId: 1,
                ...meal,
            },
        };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await postMeal(meal);

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledTimes(1);
        expect(mockedFetchWithAuth).toHaveBeenCalledWith('/api/diet/meals', {
            method: 'POST',
            body: JSON.stringify(meal),
        });
        expect(result).toEqual(responseData);
    });

    test.each(serviceCases)('$name - API 요청과 응답을 처리한다', async ({ execute, url, options }) => {
        // Given
        const responseData = { success: true };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await execute();

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledWith(url, ...(options ? [options] : []));
        expect(result).toEqual(responseData);
    });

    test.each(serviceCases)('$name - 실패 응답을 서비스 오류로 변환한다', async ({ execute }) => {
        // Given
        mockedFetchWithAuth.mockResolvedValue({
            ok: false,
        } as Response);

        // When & Then
        await expect(execute()).rejects.toThrow('API 오류');
        expect(mockedGetErrorMessage).toHaveBeenCalledTimes(1);
    });

    test('AI 식단 분석 성공 응답을 반환한다', async () => {
        // Given
        const aiMeal: MealAiRequest = {
            mealType: '점심',
            mealTime: '2026-07-27 12:30',
        };
        const responseData = { success: true };
        mockedFetchWithAuth.mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(responseData),
        } as unknown as Response);

        // When
        const result = await postAiMeal(aiMeal);

        // Then
        expect(mockedFetchWithAuth).toHaveBeenCalledWith('/api/diet/meals/ai-analyze', {
            method: 'POST',
            body: JSON.stringify(aiMeal),
        });
        expect(result).toEqual(responseData);
    });

    test('AI 식단 분석 실패 정보를 전용 오류에 담는다', async () => {
        // Given
        const aiMeal: MealAiRequest = {
            mealType: '점심',
            mealTime: '2026-07-27 12:30',
        };
        mockedFetchWithAuth.mockResolvedValue({
            ok: false,
            url: 'https://api.test/api/diet/meals/ai-analyze',
            status: 502,
            headers: new Headers({ 'content-type': 'text/html' }),
        } as Response);

        // When
        const result = postAiMeal(aiMeal);

        // Then
        await expect(result).rejects.toMatchObject<MealAiRequestError>({
            name: 'MealAiRequestError',
            message: 'API 오류',
            requestUrl: 'https://api.test/api/diet/meals/ai-analyze',
            status: 502,
            contentType: 'text/html',
        });
    });
});
