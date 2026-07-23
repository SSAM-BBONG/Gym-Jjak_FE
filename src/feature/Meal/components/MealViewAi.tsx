'use client';

import { CloseButton } from '@/components/ui/image';
import Image from 'next/image';
import { MealAi } from '../type';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

interface MealViewModalProps {
    mealData: MealAi
}

export default function MealViewAi({ mealData }: MealViewModalProps) {

    return (
        <>
            <div className="flex flex-1 flex-col gap-6">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <span className="inline-flex rounded-sm bg-[#364153] px-3 py-1 text-xs font-extrabold text-[#D1D5DC]">
                            {mealData?.mealType}
                        </span>
                        <h4 className="mt-3 text-lg font-bold text-white md:text-xl">
                            {mealData?.menu}
                        </h4>
                        <p className="mt-1 text-sm text-[#99A1AF]">
                            {mealData?.mealTime}
                        </p>
                    </div>
                    <strong className="shrink-0 text-lg text-[#BFFF0B] md:text-xl">
                        {mealData?.kcal || 0} kcal
                    </strong>
                </div>

                <div>
                    <h4 className="mb-3 text-base font-bold text-white md:text-lg">
                        영양 정보
                    </h4>
                    <div className="grid grid-cols-3 gap-2 md:gap-3">
                        <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                            <div className="text-xs text-[#99A1AF] md:text-sm">탄수화물</div>
                            <div className="mt-1 text-sm font-bold text-white md:text-base">
                                {mealData?.carbohydrate || 0}
                            </div>
                        </div>
                        <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                            <div className="text-xs text-[#99A1AF] md:text-sm">단백질</div>
                            <div className="mt-1 text-sm font-bold text-white md:text-base">
                                {mealData?.protein || 0}
                            </div>
                        </div>
                        <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-3 py-4 text-center">
                            <div className="text-xs text-[#99A1AF] md:text-sm">지방</div>
                            <div className="mt-1 text-sm font-bold text-white md:text-base">
                                {mealData?.fat || 0}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="mb-3 text-base font-bold text-white md:text-lg">
                        AI 식단 평가
                    </h4>
                    <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-4 py-4">
                        <p className="text-sm leading-6 text-[#D1D5DC]">
                            {mealData?.evaluation}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-[#364153] pt-4">
                            <span className="text-xs text-[#99A1AF] md:text-sm">
                                분석 신뢰도
                            </span>
                            <strong className="text-sm text-[#BFFF0B] md:text-base">
                                {mealData ? `${Math.round(mealData.confidence * 100)}%` : '-'}
                            </strong>
                        </div>
                    </div>
                </div>
                <div>
                    <h4 className="mb-3 text-base font-bold text-white md:text-lg">
                        주의사항
                    </h4>
                    <div className="rounded-lg border border-[#364153] bg-[#1E2939] px-4 py-4">
                        <ul className="flex list-disc flex-col gap-2 pl-5 text-xs leading-5 text-[#99A1AF] md:text-sm md:leading-6">
                            {mealData?.warnings.map((warning) => (
                                <li key={warning}>{warning}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
