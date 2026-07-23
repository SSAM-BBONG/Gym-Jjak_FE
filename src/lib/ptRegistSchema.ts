import * as z from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const thumbnailFileSchema = z
  .custom<File>((value) => value instanceof File && value.size > 0, {
    message: "썸네일 이미지를 등록해주세요.",
  })
  .refine((file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type), {
    message: "JPG, PNG, WEBP 파일만 등록할 수 있습니다.",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "10MB 이하 파일만 등록할 수 있습니다.",
  });

export const ptRegistSchema = z.object({
  thumbnailFile: thumbnailFileSchema,
  title: z.string().trim().min(1, "강습명을 입력해주세요."),
  description: z.string().trim().min(1, "강습 소개를 입력해주세요."),
  part: z.enum(["CHEST", "BACK", "SHOULDER", "ARM", "ABS", "CORE", "LEG", "GLUTE", "FULL_BODY"], { error: "운동 부위를 선택해주세요." }),
  organizationId: z.coerce.number().int().positive("소속 헬스장을 선택해주세요."),
  price: z.coerce.number().min(0, "가격은 0원 이상이어야 합니다."),
  curriculums: z.array(z.object({
    id: z.number().int().positive().optional(),
    title: z.string().trim().min(1, "회차 제목을 입력해주세요."),
    content: z.string().trim().min(1, "회차 설명을 입력해주세요."),
  })).min(1),
  schedules: z.array(z.object({
    id: z.number().int().positive().optional(),
    dayOfWeek: z.enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
  })).min(1),
});

export type PtRegistFormValue = z.infer<typeof ptRegistSchema>;
