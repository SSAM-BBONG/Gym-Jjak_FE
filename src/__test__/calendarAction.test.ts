import {
    calendargetDateAction,
    calendargetExeriseAction,
    calendargetMonthAction,
    calendarPatchAction,
    calendarPostAction,
    deleteCalendarAction,
    trainerCalendargetDateAction,
    trainerCalendargetMonthAction,
} from '@/feature/calendar/action';
import {
    deleteCalendar,
    getCalendarDate,
    getCalendarMonth,
    getTrainerCalendarDate,
    getTrainerCalendarMonth,
    patchCalendar,
    postCalendar,
} from '@/service/calendar.service';
import { getExercises } from '@/service/admin.service';

jest.mock('@/service/calendar.service', () => ({
    deleteCalendar: jest.fn(),
    getCalendarDate: jest.fn(),
    getCalendarMonth: jest.fn(),
    getTrainerCalendarDate: jest.fn(),
    getTrainerCalendarMonth: jest.fn(),
    patchCalendar: jest.fn(),
    postCalendar: jest.fn(),
}));

jest.mock('@/service/admin.service', () => ({
    getExercises: jest.fn(),
}));

const mockedPostCalendar = jest.mocked(postCalendar);
const mockedPatchCalendar = jest.mocked(patchCalendar);
const mockedDeleteCalendar = jest.mocked(deleteCalendar);
const mockedGetCalendarMonth = jest.mocked(getCalendarMonth);
const mockedGetCalendarDate = jest.mocked(getCalendarDate);
const mockedGetTrainerCalendarMonth = jest.mocked(getTrainerCalendarMonth);
const mockedGetTrainerCalendarDate = jest.mocked(getTrainerCalendarDate);
const mockedGetExercises = jest.mocked(getExercises);

const createWorkoutFormData = () => {
    const formData = new FormData();
    formData.set('exerciseName', '12');
    formData.set('part', 'CHEST');
    formData.append('kg', '40');
    formData.append('kg', '45');
    formData.append('rep', '12');
    formData.append('rep', '10');

    return formData;
};

describe('운동일지 액션', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('입력한 운동 정보와 세트 순서를 변환해 운동일지를 등록한다', async () => {
        // Given
        const formData = createWorkoutFormData();
        mockedPostCalendar.mockResolvedValue({} as never);

        // When
        const result = await calendarPostAction('2026-07-26', formData);

        // Then
        expect(mockedPostCalendar).toHaveBeenCalledTimes(1);
        expect(mockedPostCalendar).toHaveBeenCalledWith({
            diaryDate: '2026-07-26',
            exerciseId: 12,
            part: 'CHEST',
            sets: [
                {
                    setOrder: 1,
                    weight: 40,
                    reps: 12,
                },
                {
                    setOrder: 2,
                    weight: 45,
                    reps: 10,
                },
            ],
        });
        expect(result).toEqual({
            success: true,
            message: '등록되었습니다',
        });
    });

    test('필수 운동 정보가 누락되면 운동일지를 등록하지 않는다', async () => {
        // Given
        const formData = createWorkoutFormData();
        formData.set('exerciseName', '');

        // When
        const result = await calendarPostAction('2026-07-26', formData);

        // Then
        expect(mockedPostCalendar).not.toHaveBeenCalled();
        expect(result).toEqual({
            success: false,
            message: '값을 모두 입력해주세요',
        });
    });

    test('세트의 무게나 횟수가 비어 있으면 운동일지를 등록하지 않는다', async () => {
        // Given
        const formData = createWorkoutFormData();
        formData.set('kg', ' ');

        // When
        const result = await calendarPostAction('2026-07-26', formData);

        // Then
        expect(mockedPostCalendar).not.toHaveBeenCalled();
        expect(result.success).toBe(false);
    });

    test('운동일지 등록 실패 메시지를 반환한다', async () => {
        // Given
        mockedPostCalendar.mockRejectedValue(new Error('등록 API 오류'));

        // When
        const result = await calendarPostAction('2026-07-26', createWorkoutFormData());

        // Then
        expect(result).toEqual({
            success: false,
            message: '등록 API 오류',
        });
    });

    test('운동일지 ID와 변경된 운동 정보를 전달해 수정한다', async () => {
        // Given
        const diaryId = 31;
        const formData = createWorkoutFormData();
        formData.set('exerciseName', '18');
        formData.set('part', 'BACK');
        mockedPatchCalendar.mockResolvedValue({} as never);

        // When
        const result = await calendarPatchAction(diaryId, formData);

        // Then
        expect(mockedPatchCalendar).toHaveBeenCalledTimes(1);
        expect(mockedPatchCalendar).toHaveBeenCalledWith(diaryId, {
            exerciseId: 18,
            part: 'BACK',
            sets: [
                {
                    setOrder: 1,
                    weight: 40,
                    reps: 12,
                },
                {
                    setOrder: 2,
                    weight: 45,
                    reps: 10,
                },
            ],
        });
        expect(result).toEqual({
            success: true,
            message: '수정되었습니다',
        });
    });

    test('운동일지 ID를 전달해 삭제한다', async () => {
        // Given
        const diaryId = 31;
        mockedDeleteCalendar.mockResolvedValue({} as never);

        // When
        await deleteCalendarAction(diaryId);

        // Then
        expect(mockedDeleteCalendar).toHaveBeenCalledTimes(1);
        expect(mockedDeleteCalendar).toHaveBeenCalledWith(diaryId);
    });

    test('운동일지 수정 필수값이 누락되면 수정하지 않는다', async () => {
        // Given
        const formData = createWorkoutFormData();
        formData.set('rep', '');

        // When
        const result = await calendarPatchAction(31, formData);

        // Then
        expect(mockedPatchCalendar).not.toHaveBeenCalled();
        expect(result.success).toBe(false);
    });

    test('운동일지 수정 실패 메시지를 반환한다', async () => {
        // Given
        mockedPatchCalendar.mockRejectedValue(new Error('수정 API 오류'));

        // When
        const result = await calendarPatchAction(31, createWorkoutFormData());

        // Then
        expect(result).toEqual({
            success: false,
            message: '수정 API 오류',
        });
    });

    test('운동일지 삭제 오류를 전달한다', async () => {
        // Given
        mockedDeleteCalendar.mockRejectedValue(new Error('삭제 API 오류'));

        // When & Then
        await expect(deleteCalendarAction(31)).rejects.toThrow('삭제 API 오류');
    });

    test.each([
        {
            name: '월별 운동일지',
            execute: () => calendargetMonthAction('2026', '07'),
            mock: mockedGetCalendarMonth,
            args: ['2026', '07'],
        },
        {
            name: '일별 운동일지',
            execute: () => calendargetDateAction('2026-07-27'),
            mock: mockedGetCalendarDate,
            args: ['2026-07-27'],
        },
        {
            name: '회원 월별 운동일지',
            execute: () => trainerCalendargetMonthAction(9, '2026', '07'),
            mock: mockedGetTrainerCalendarMonth,
            args: [9, '2026', '07'],
        },
        {
            name: '회원 일별 운동일지',
            execute: () => trainerCalendargetDateAction(9, '2026-07-27'),
            mock: mockedGetTrainerCalendarDate,
            args: [9, '2026-07-27'],
        },
        {
            name: '운동 종목',
            execute: () => calendargetExeriseAction('가슴', '벤치'),
            mock: mockedGetExercises,
            args: ['가슴', '벤치'],
        },
    ])('$name 조회 결과를 반환한다', async ({ execute, mock, args }) => {
        // Given
        const response = { data: [] };
        mock.mockResolvedValue(response as never);

        // When
        const result = await execute();

        // Then
        expect(mock).toHaveBeenCalledWith(...args as never);
        expect(result).toEqual(response);
    });

    test.each([
        {
            name: '월별 운동일지',
            execute: () => calendargetMonthAction('2026', '07'),
            mock: mockedGetCalendarMonth,
        },
        {
            name: '일별 운동일지',
            execute: () => calendargetDateAction('2026-07-27'),
            mock: mockedGetCalendarDate,
        },
        {
            name: '회원 월별 운동일지',
            execute: () => trainerCalendargetMonthAction(9, '2026', '07'),
            mock: mockedGetTrainerCalendarMonth,
        },
        {
            name: '회원 일별 운동일지',
            execute: () => trainerCalendargetDateAction(9, '2026-07-27'),
            mock: mockedGetTrainerCalendarDate,
        },
        {
            name: '운동 종목',
            execute: () => calendargetExeriseAction(),
            mock: mockedGetExercises,
        },
    ])('$name 조회 오류를 전달한다', async ({ execute, mock }) => {
        // Given
        mock.mockRejectedValue(new Error('조회 API 오류'));

        // When & Then
        await expect(execute()).rejects.toThrow('조회 API 오류');
    });
});
