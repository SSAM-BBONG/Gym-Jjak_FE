import * as z from "zod";

const MAX_MEASUREMENT_VALUE = 999.99;

const hasAtMostTwoDecimalPlaces = (value: number) =>
  Math.abs(value * 100 - Math.round(value * 100)) < 1e-8;

const measurementSchema = (label: string, minimum: number) =>
  z
    .number({ error: `${label}을(를) 입력해주세요.` })
    .min(minimum, `${label}은(는) ${minimum} 이상이어야 합니다.`)
    .max(
      MAX_MEASUREMENT_VALUE,
      `${label}은(는) 정수 3자리, 소수 2자리까지 입력할 수 있습니다.`,
    )
    .refine(hasAtMostTwoDecimalPlaces, {
      message: `${label}은(는) 소수 2자리까지 입력할 수 있습니다.`,
    });


export const inbodySchema = z.object({
  measuredDate: z.string({ error: `날짜를 입력해주세요.` }),
  height: z.number({ error: `키를 입력해주세요.` })
    .min(0, `키는 0 이상이어야 합니다.`)
    .max(
      MAX_MEASUREMENT_VALUE,
      `키는 정수 3자리, 소수 2자리까지 입력할 수 있습니다.`,
    ).refine(hasAtMostTwoDecimalPlaces, {
      message: `키는 소수 2자리까지 입력할 수 있습니다.`,
    }),
  weight: measurementSchema("몸무게", 0.01),
  bodyFatPercentage: measurementSchema("체지방률", 0).optional(),
  skeletalMuscleMass: measurementSchema("골격근량", 0).optional(),
});

export type InbodyFormType = z.infer<typeof inbodySchema>;
