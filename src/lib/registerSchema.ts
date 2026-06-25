import * as z from 'zod';

export const signUpSchema = z.object({
    username: z
        .email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z
        .string()
        .min(8, { message: '비밀번호는 8자 이상 16자 이하여야 합니다.' })
        .max(16, { message: '비밀번호는 8자 이상 16자 이하여야 합니다.' })
        .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{}|;':",./<>?~`]).+$/, {
            message: '비밀번호는 영어, 숫자, 특수문자가 하나씩 포함되어야 합니다.',
        }),
    passwordCheck: z
        .string()
        .min(1, { message: '비밀번호 확인을 입력해 주세요.' }),
    name: z
        .string()
        .min(1, { message: '이름을 입력해 주세요.' }),
    nickname: z
        .string()
        .min(1, { message: '닉네임은 최소 1자 이상이어야 합니다.' }),
    phone: z
        .string()
        .regex(/^\d{3}-\d{4}-\d{4}$/, { message: '전화번호 형식이 맞지 않습니다. (예: 010-1234-5678)' }),
}).refine((data) => data.password === data.passwordCheck, {
    path: ['passwordCheck'],
    message: '비밀번호가 일치하지 않습니다.',
});


export const socialSignUpSchema = z.object({
    nickname: z
        .string()
        .min(1, { message: '닉네임은 최소 1자 이상이어야 합니다.' }),
    phone: z
        .string()
        .regex(/^\d{3}-\d{4}-\d{4}$/, { message: '전화번호 형식이 맞지 않습니다. (예: 010-1234-5678)' }),
})

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SocialSignUpFormData = z.infer<typeof socialSignUpSchema>;