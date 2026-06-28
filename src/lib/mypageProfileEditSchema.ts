import * as z from "zod";

export const myapgeProfileEditSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요."),
  nickname: z.string().trim().min(1, "닉네임을 입력해주세요."),
  phone: z
    .string()
    .trim()
    .regex(/^0\d{1,2}-\d{3,4}-\d{4}$/, "전화번호는 010-1111-2222 형식으로 입력해주세요."),
});

export type MyapgeProfileEditFormValue = z.infer<typeof myapgeProfileEditSchema>;