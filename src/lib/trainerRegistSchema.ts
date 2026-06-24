import * as z from 'zod';
// 트레이너 등록 스키마 정의

// 필수 자격증, 프로필 이미지 등록 가능 파일크기 상수화
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// 프로필 이미지
const requiredProfileImg = z
// 프로필 이미지는 null 값이 허용이니 null 값을 포함해서 조건 설정
  .custom<File | null>((value) => value === null || value instanceof File)
  .refine(
    // 파일이 없을때 그리고 형식에 충족할떄 에러메시지 설정
    (file) =>
      !file || ["image/jpeg", "image/png", "image/webp"].includes(file.type),
    {
      message: "프로필 이미지는 JPG, PNG, WEBP 파일만 등록할 수 있습니다.",
    }
  )
  // 파일이 없을때 그리고 파일 사이즈가 기준에 충족하지 않을때 에러메시지 설정
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: "프로필 이미지는 10MB 이하만 등록할 수 있습니다.",
  });

// 필수 자격증
const requiredEssentialQualification = z.custom<File> (
        (value) => value instanceof File && value.size > 0,
        {
            message: "필수 자격증을 등록해주세요"
        }
    )
    // 파일 형식 설정
    .refine((file) => ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(file.type), {
        message: "필수 자격증은 JPG, PNG, WEBP, PDF 파일만 등록할 수 있습니다."
    })
    // 크기 설정
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "필수 자격증은는 10MB 이하의 파일만 등록할 수 있습니다."
    }) 

// 자기소개
const requiredSelfIntroduction = z.string().trim().min(1, "자기소개를 입력해주세요").max(1000, "자기소개는 1,000자까지 입력할 수 있습니다.")

// 트레이너 신청 수정 이미지 action 타입
const profileImageActionSchema = z.enum(["KEEP", "REPLACE", "DELETE"]);


export const trainerRegistCreateSchema = z.object({
  profileImageFile: requiredProfileImg.nullable(),
  profileImageAction: profileImageActionSchema.default("KEEP"),
  certificateFile: requiredEssentialQualification,
  qualifications: z.array(z.string().trim().min(1, "자격증명을 입력해주세요.")),
  awardHistories: z.array(z.string().trim().min(1, "수상 경력을 입력해주세요.")),
  introduction: requiredSelfIntroduction,
});

export const trainerRegistEditSchema = trainerRegistCreateSchema.extend({
  certificateFile: requiredEssentialQualification.optional(),
  profileImageAction: profileImageActionSchema.default("KEEP"),
});

export type TrainerRegistFormValue = z.infer<typeof trainerRegistEditSchema>;
