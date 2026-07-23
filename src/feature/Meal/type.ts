export type MealType = '아침' | '점심' | '저녁' | '간식';

export interface UploadedFile {
    fileKey: string;
    originalName: string;
    contentType: string;
    fileSize: number;
}

export interface MealRequest {
    mealType: MealType;
    mealTime: string;
    menu: string;
    kcal?: number;
    carbohydrate?: number | null;
    protein?: number | null;
    fat?: number | null;
    file?: UploadedFile | null;
}

export interface MealAiRequest {
    mealType: MealType;
    mealTime: string;
    file?: UploadedFile | null;
}

export interface Meal {
    mealId: number;
    mealType: MealType;
    mealTime: string;
    menu: string;
    kcal: number | null;
    carbohydrate: number | null;
    protein: number | null;
    fat: number | null;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Meals {
    mealId: number;
    mealType: MealType;
    mealTime: string;
    menu: string;
}

export interface GoalRequest {
    goalProtein: number;
    goalCarbohydrate: number;
    goalFat: number;
    dailyGoalKcal: number;
}

export interface Goal {
    goalProtein: number;
    goalCarbohydrate: number;
    goalFat: number;
    dailyGoalKcal: number;
    goalId: number;
    createdAt: string;
    updatedAt: string;
}

export interface MealAi {
    mealId: number;
    mealType: MealType;
    mealTime: string;
    menu: string;
    kcal: number | null;
    carbohydrate: number | null;
    protein: number | null;
    fat: number | null;
    fileId: number;
    createdAt: string;
    updatedAt: string;
    evaluation: string;
    confidence: number;
    warnings: string[];
}