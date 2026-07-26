import { inbodySchema } from '@/lib/inbodySchema';

const validInbodyData = {
    measuredDate: '2026-07-26',
    height: 175.25,
    weight: 70.55,
    bodyFatPercentage: 18.75,
    skeletalMuscleMass: 32.4,
};

describe('인바디 스키마', () => {
    test('올바른 인바디 측정값은 검증에 성공한다', () => {
        // Given
        const data = validInbodyData;

        // When
        const result = inbodySchema.safeParse(data);

        // Then
        expect(result.success).toBe(true);
    });

    test('선택값인 체지방률과 골격근량을 입력하지 않아도 검증에 성공한다', () => {
        // Given
        const data = {
            measuredDate: '2026-07-26',
            height: 175,
            weight: 70,
        };

        // When
        const result = inbodySchema.safeParse(data);

        // Then
        expect(result.success).toBe(true);
    });

    test('몸무게가 최솟값보다 작으면 검증에 실패한다', () => {
        // Given
        const data = {
            ...validInbodyData,
            weight: 0,
        };

        // When
        const result = inbodySchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['weight'],
                    message: '몸무게은(는) 0.01 이상이어야 합니다.',
                }),
            );
        }
    });

    test('측정값이 999.99를 초과하면 검증에 실패한다', () => {
        // Given
        const data = {
            ...validInbodyData,
            height: 1000,
        };

        // When
        const result = inbodySchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['height'],
                    message: '키는 정수 3자리, 소수 2자리까지 입력할 수 있습니다.',
                }),
            );
        }
    });

    test('소수점 셋째 자리까지 입력하면 검증에 실패한다', () => {
        // Given
        const data = {
            ...validInbodyData,
            skeletalMuscleMass: 32.456,
        };

        // When
        const result = inbodySchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['skeletalMuscleMass'],
                    message: '골격근량은(는) 소수 2자리까지 입력할 수 있습니다.',
                }),
            );
        }
    });

    test('필수 측정값을 입력하지 않으면 검증에 실패한다', () => {
        // Given
        const data = {
            measuredDate: '2026-07-26',
        };

        // When
        const result = inbodySchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues.map((issue) => issue.path[0])).toEqual(
                expect.arrayContaining(['height', 'weight']),
            );
        }
    });
});
