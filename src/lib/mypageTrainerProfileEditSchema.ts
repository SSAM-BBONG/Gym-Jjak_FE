import * as z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const profileImageFileSchema = z
  .custom<File | null>((value) => value === null || value instanceof File)
  .refine(
    (file) => !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    { message: "프로필 이미지는 JPG, PNG, WEBP 파일만 등록할 수 있습니다." }
  )
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "프로필 이미지는 10MB 이하만 등록할 수 있습니다.",
  });

export const mypageTrainerProfileSchema = z.object({
  profileImageFile: profileImageFileSchema.nullable(),
  profileImageAction: z.enum(["KEEP", "REPLACE", "DELETE"]).default("KEEP"),
  additionalCertifications: z.array(
    z.string().trim().min(1, "자격증명을 입력해주세요.")
  ),
  awardHistories: z.array(
    z.string().trim().min(1, "수상 경력을 입력해주세요.")
  ),
  introduction: z
    .string()
    .trim()
    .min(1, "자기소개를 입력해주세요.")
    .max(1000, "자기소개는 1,000자까지 입력할 수 있습니다."),
});

export type MypageTrainerProfileFormValue = z.infer<
  typeof mypageTrainerProfileSchema
>;