import * as z from 'zod';

// 최대 파일 크기 상수화
const MAX_FILE_SIZE = 10 * 1024 * 1024;

// 사업자 등록증 파일 검증
const requiredBusinessLicenseFile = z
  .custom<File>(
    (value) => value instanceof File && value.size > 0,
    {
      message: "사업자등록증 파일을 등록해주세요.",
    }
  )
  .refine(
    (file) =>
      ["image/jpeg", "image/png", "image/webp", "application/pdf"].includes(
        file.type
      ),
    {
      message: "사업자등록증은 JPG, PNG, WEBP, PDF 파일만 등록할 수 있습니다.",
    }
  )
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "사업자등록증은 10MB 이하 파일만 등록할 수 있습니다.",
  });

// 대표자 전화번호, 시설 전화번호 검증 ( - 있는지)
const requiredPhoneNumber = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine(
    (value) => !value || /^0\d{1,2}-\d{3,4}-\d{4}$/.test(value),
    {
      message: "번호는 02-1234-5678 형식으로 입력해주세요.",
    }
  );

// URL 검증
const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => !value || /^https?:\/\/.+/.test(value), {
    message: "URL은 http:// 또는 https://로 시작해야 합니다.",
  });

export const organizationApplicationSchema = z.object({
   // 조직 아이디 검증 
  requestedLoginId: z
    .string()
    .trim()
    .min(1, "조직 아이디를 입력해주세요.")
    .regex(/^[a-zA-Z0-9_-]+$/, "영문, 숫자, _, - 만 사용할 수 있습니다."),

  // 사업자등록즘 검증
    businessLicenseFile: requiredBusinessLicenseFile,

  // 사업자등록번호 검증
  businessRegistrationNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "사업자등록번호는 숫자 10자리여야 합니다."),

  // 상호(사업장 이름) 검증
  businessName: z.string().trim().min(1, "상호명을 입력해주세요."),

  // 대표자 이름 검증   
  representativeName: z.string().trim().min(1, "대표자명을 입력해주세요."),
  
  // 개업일자 검증
  openingDate: z
    .string()
    .min(1, "개업일자를 입력해주세요.")
    .refine((value) => {
      const inputDate = new Date(value);
      const today = new Date();
      today.setHours(23, 59, 59, 999);

      return !Number.isNaN(inputDate.getTime()) && inputDate <= today;
    }, "개업일자는 오늘 또는 과거 날짜여야 합니다."),

  // 대표자 전화번호 검증 
  representativePhone: requiredPhoneNumber,

  // 운동시설번호 검증
  facilityPhone: requiredPhoneNumber,

  // 사업장 주소 검증
  roadAddress: z.string().trim().min(1, "주소를 입력해주세요."),
  jibunAddress: z.string().optional(),
  detailAddress: z.string().optional(),

  // 위도, 경도 검증
  latitude: z.string().optional(),
  longitude: z.string().optional(),

  // 웹사이트 url 검증
  websiteUrl: optionalUrl,

  // 인스타 url 검증
  instagramUrl: optionalUrl,

  // 블로그 url 검증 
  blogUrl: optionalUrl,
});

export type OrganizationApplicationFormValue = z.infer<
  typeof organizationApplicationSchema
>;