"use client";

import { MealCalendar } from "@/components/ui/MealCalendar";
import { trainerMealListGetAction } from "@/feature/Meal/action";
import type { Meals } from "@/feature/Meal/type";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import PtManageMealCard from "./PtManageMealCard";

interface PtManageMealProps {
    userId: number;
}

export default function PtManageMeal({ userId }: PtManageMealProps) {
    const targetUserId = userId;
    const [selectDate, setSelectDate] = useState<Date>(new Date());
    const selectedDate = format(selectDate, "yyyy-MM-dd");

    const {
        data: mealListData = { meals: [] },
    } = useQuery({
        queryKey: ["trainer", "meals", "list", targetUserId, selectedDate],
        queryFn: () => trainerMealListGetAction(targetUserId, selectedDate),
        enabled: Number.isFinite(targetUserId),
        select: (response) => response.data,
    });

    return (
        <section>

            <div className="mt-[30px] flex items-center justify-between">
                <MealCalendar
                    selectDate={selectDate}
                    setSelectDate={setSelectDate}
                />
            </div>


            {mealListData.meals.map((meal: Meals) => (
                <PtManageMealCard key={meal.mealId} targetUserId={targetUserId} meal={meal} />
            ))}

            {mealListData.meals.length === 0 && (
                <div className="px-3 py-8 text-center text-xs text-muted-foreground sm:px-4 sm:text-sm lg:px-6 lg:py-10">
                    등록된 식단이 없습니다.
                </div>
            )}



        </section>
    );
}
