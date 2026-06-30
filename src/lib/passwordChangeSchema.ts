import * as z from "zod";

export const passwordChangeSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, { message: "비밀번호는 8자 이상이어야 합니다." })
      .max(16, { message: "비밀번호는 16자 이하여야 합니다." })
      .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-[\]{}|;':",./<>?~`]).+$/, {
        message: "영문, 숫자, 특수문자를 모두 포함해야 합니다.",
      }),
    checkNewPassword: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .refine((data) => data.newPassword === data.checkNewPassword, {
    path: ["checkNewPassword"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type PasswordChangeFormValue = z.infer<typeof passwordChangeSchema>;