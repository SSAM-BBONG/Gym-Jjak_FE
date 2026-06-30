import * as z from "zod";

const MAX_VIDEO_FILE_SIZE = 10 * 1024 * 1024;

const feedbackVideoFileSchema = z
  .custom<File>((value) => value instanceof File && value.size > 0, {
    message: "영상을 업로드해주세요.",
  })
  .refine((file) => file.type.startsWith("video/"), {
    message: "영상 파일만 업로드할 수 있습니다.",
  })
  .refine((file) => file.size <= MAX_VIDEO_FILE_SIZE, {
    message: "10MB 이하 영상만 업로드할 수 있습니다.",
  });

export const ptFeedbackSchema = z.object({
  beforeFile: feedbackVideoFileSchema,
  afterFile: feedbackVideoFileSchema,
  content: z.string().trim().min(1, "텍스트 피드백을 입력해주세요."),
});

export type PtFeedbackFormValue = z.infer<typeof ptFeedbackSchema>;