import * as z from 'zod';


export const onBoarding1Schema = z.object({
    exerciseGoal: z.string().min(1, { message: "운동 목적을 하나 선택해 주세요." }),
})

export const onBoarding2Schema = z.object({
    exercisePeriod: z.string().min(1, { message: "운동 경험을 하나 선택해 주세요." }),
})

export const onBoarding3Schema = z.object({
    exerciseFrequency: z.string().min(1, { message: "운동 빈도를 하나 선택해 주세요." }),
})

export const onBoarding4Schema = z.object({
    preferredExercise: z.string().min(1, { message: "선호하는 운동을 하나 선택해 주세요." }),
})

export const onBoarding5Schema = z.object({
    height: z
        .number()
        .min(1, { message: '키를 입력해 주세요.' }),
    weight: z
        .number()
        .min(1, { message: '체중을 입력해 주세요.' }),
})

export const onBoarding6Schema = z.object({
    region: z.object({
        sido: z.string().min(1),
        sigungu: z.string().min(1),
        eupmyeondong: z.string().min(1),
        fullName: z.string().min(1, { message: "선호 지역을 선택해 주세요." }),
        latitude: z.number(),
        longitude: z.number()
    }, { message: "선호 지역을 검색 후 선택해 주세요." })
});

export type OnBoarding1Type = z.infer<typeof onBoarding1Schema>;
export type OnBoarding2Type = z.infer<typeof onBoarding2Schema>;
export type OnBoarding3Type = z.infer<typeof onBoarding3Schema>;
export type OnBoarding4Type = z.infer<typeof onBoarding4Schema>;
export type OnBoarding5Type = z.infer<typeof onBoarding5Schema>;
export type OnBoarding6Type = z.infer<typeof onBoarding6Schema>;

export const onboardingSchema = onBoarding1Schema
    .merge(onBoarding2Schema)
    .merge(onBoarding3Schema)
    .merge(onBoarding4Schema)
    .merge(onBoarding5Schema)
    .merge(onBoarding6Schema);

export type OnboardingType = z.infer<typeof onboardingSchema>;