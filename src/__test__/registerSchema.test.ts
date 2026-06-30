import {
    signUpSchema,
    socialSignUpSchema,
} from '@/lib/registerSchema';

const validSignUpData = {
    username: 'test@example.com',
    password: 'Password1!',
    passwordCheck: 'Password1!',
    name: '홍길동',
    nickname: '길동이',
    phone: '010-1234-5678',
};

describe('회원가입 스키마 테스트', () => {
    test('올바른 회원가입 정보는 검증에 성공한다', () => {
        const data = validSignUpData;

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeTruthy();
    });

    test('이메일 형식이 올바르지 않으면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            username: 'invalid-email',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('비밀번호가 8자 미만이면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            password: 'Ab1!xyz',
            passwordCheck: 'Ab1!xyz',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('비밀번호가 16자를 초과하면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            password: 'Abcdefghijklmno1!',
            passwordCheck: 'Abcdefghijklmno1!',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('비밀번호에 특수문자가 없으면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            password: 'Password1',
            passwordCheck: 'Password1',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('비밀번호와 비밀번호 확인이 다르면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            passwordCheck: 'Different1!',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();

        if (!result.success) {
            const passwordCheckError = result.error.issues.find(
                (issue) => issue.path[0] === 'passwordCheck',
            );

            expect(passwordCheckError).toBeDefined();
            expect(passwordCheckError?.message).toBe(
                '비밀번호가 일치하지 않습니다.',
            );
        }
    });

    test('이름이 비어 있으면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            name: '',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('닉네임이 비어 있으면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            nickname: '',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('전화번호 형식이 올바르지 않으면 검증에 실패한다', () => {
        const data = {
            ...validSignUpData,
            phone: '01012345678',
        };

        const result = signUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });
});

describe('소셜 회원가입 스키마 테스트', () => {
    test('올바른 소셜 회원가입 정보는 검증에 성공한다', () => {
        const data = {
            nickname: '길동이',
            phone: '010-1234-5678',
        };

        const result = socialSignUpSchema.safeParse(data);

        expect(result.success).toBeTruthy();
    });

    test('닉네임이 비어 있으면 검증에 실패한다', () => {
        const data = {
            nickname: '',
            phone: '010-1234-5678',
        };

        const result = socialSignUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });

    test('전화번호 형식이 올바르지 않으면 검증에 실패한다', () => {
        const data = {
            nickname: '길동이',
            phone: '01012345678',
        };

        const result = socialSignUpSchema.safeParse(data);

        expect(result.success).toBeFalsy();
    });
});