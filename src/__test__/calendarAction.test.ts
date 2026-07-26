import {
    calendarPatchAction,
    calendarPostAction,
    deleteCalendarAction,
} from '@/feature/calendar/action';
import {
    deleteCalendar,
    patchCalendar,
    postCalendar,
} from '@/service/calendar.service';

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
});
