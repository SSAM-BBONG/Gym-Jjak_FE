import { passwordChangeSchema } from '@/lib/passwordChangeSchema';

describe('비밀번호 변경 스키마', () => {
    test('영문, 숫자, 특수문자를 포함한 일치하는 비밀번호는 검증에 성공한다', () => {
        // Given
        const data = {
            newPassword: 'Password1!',
            checkNewPassword: 'Password1!',
        };

        // When
        const result = passwordChangeSchema.safeParse(data);

        // Then
        expect(result.success).toBe(true);
    });

    test('새 비밀번호가 8자 미만이면 검증에 실패한다', () => {
        // Given
        const data = {
            newPassword: 'Pass1!',
            checkNewPassword: 'Pass1!',
        };

        // When
        const result = passwordChangeSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['newPassword'],
                    message: '비밀번호는 8자 이상이어야 합니다.',
                }),
            );
        }
    });

    test('새 비밀번호가 16자를 초과하면 검증에 실패한다', () => {
        // Given
        const password = 'Password12345678!';
        const data = {
            newPassword: password,
            checkNewPassword: password,
        };

        // When
        const result = passwordChangeSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['newPassword'],
                    message: '비밀번호는 16자 이하여야 합니다.',
                }),
            );
        }
    });

    test.each([
        ['영문', '12345678!'],
        ['숫자', 'Password!'],
        ['특수문자', 'Password1'],
    ])('%s가 없으면 검증에 실패한다', (_missingType, password) => {
        // Given
        const data = {
            newPassword: password,
            checkNewPassword: password,
        };

        // When
        const result = passwordChangeSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['newPassword'],
                    message: '영문, 숫자, 특수문자를 모두 포함해야 합니다.',
                }),
            );
        }
    });

    test('비밀번호 확인을 입력하지 않으면 검증에 실패한다', () => {
        // Given
        const data = {
            newPassword: 'Password1!',
            checkNewPassword: '',
        };

        // When
        const result = passwordChangeSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['checkNewPassword'],
                    message: '비밀번호 확인을 입력해주세요.',
                }),
            );
        }
    });

    test('새 비밀번호와 비밀번호 확인이 다르면 검증에 실패한다', () => {
        // Given
        const data = {
            newPassword: 'Password1!',
            checkNewPassword: 'Different1!',
        };

        // When
        const result = passwordChangeSchema.safeParse(data);

        // Then
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.issues).toContainEqual(
                expect.objectContaining({
                    path: ['checkNewPassword'],
                    message: '비밀번호가 일치하지 않습니다.',
                }),
            );
        }
    });
});
