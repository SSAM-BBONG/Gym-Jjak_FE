'use client'

import { MealCalendar } from "@/components/ui/MealCalendar";
import MealCard from "./MealCard";
import MealAddButton from "./MealAddButton";
import { useState } from "react";
import MealGoalCard from "@/feature/Meal/components/MealGoalCard";
import { useQuery } from "@tanstack/react-query";
import { mealListGetAction } from "@/feature/Meal/action";
import { Meals } from "@/feature/Meal/type";
import Pagination from "@/components/ui/Pagination";
import { Spinner } from "@/components/ui/spinner";
import { format } from "date-fns";
import MealAiPlanCard from "@/feature/Meal/components/MealAiPlanCard";

export default function MealCt({ page, myStatus }: { page: string, myStatus?: "ACTIVE" | "EXPIRED" }) {

    const [selectDate, setSelectDate] = useState<Date>(new Date())

    const {
        data: mealListData = { meals: [] },
        isLoading: isMealListLoading,
        isError: isMealListError,
        error: mealListError,
    } = useQuery({
        queryKey: ["meals", "list", format(selectDate, 'yyyy-MM-dd'), page],
        queryFn: () => mealListGetAction(format(selectDate, 'yyyy-MM-dd'), page),
        select: (response) => response.data,
    });

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h1 className="text-[36px] font-black text-white"> 식단 관리 </h1>
                    <p className="text-[#99A1AF] font-normal text-[14px] mt-[10px]"> 오늘의 식사를 기록하고 영양 균형을 확인하세요 </p>
                </div>
                <MealAddButton myStatus={!!myStatus} />
            </div>
            <div className="flex justify-between items-center mt-[30px]">
                <MealCalendar
                    selectDate={selectDate}
                    setSelectDate={setSelectDate} />
            </div>
            {!myStatus &&
                <MealAiPlanCard />
            }
            <MealGoalCard />
            {isMealListLoading ? (
                <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10  flex items-center gap-3 flex-col text-sm text-muted-foreground">
                    <Spinner className="size-5" />
                    오늘의 식단을 불러오는 중입니다...
                </div>
            ) : (
                <>
                    {mealListData.meals.map((meal: Meals) => {
                        return <MealCard meal={meal} key={meal.mealId} myStatus={!!myStatus} />
                    })}
                    {mealListData.meals.length === 0 && ((
                        <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                            오늘의 식단을 남겨주세요
                        </div>
                    ))}
                </>
            )}

            {!selectDate && (
                <Pagination url="meal" page={page} totalPage={mealListData.totalPages} />

            )}
        </>
    );
}
