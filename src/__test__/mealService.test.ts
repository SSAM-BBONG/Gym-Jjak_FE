import { getMeals, postMeal } from '@/service/meal.service';
import { fetchWithAuth } from '@/lib/feth';
import type { MealRequest } from '@/feature/Meal/type';

jest.mock('@/lib/feth', () => ({
    fetchWithAuth: jest.fn(),
}));

jest.mock('@/lib/stateError', () => ({
    getErrorMessage: jest.fn(),
}));

const mockedFetchWithAuth = jest.mocked(fetchWithAuth);

describe('식단 서비스', () => {
    beforeEach(() => {
        jest.clearAllMocks();
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
});
