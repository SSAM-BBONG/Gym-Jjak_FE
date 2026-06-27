interface DiaryRequest {
    diaryDate: string;
    categoryName: string;
    title: string;
    content: string;
}

interface DiaryUpdate {
    categoryName: string;
    title: string;
    content: string;
}

interface Days {
    date: string;
    pt?: true,
    diaryTitle?: string;
}

interface Pt {
    date: string;
    title: string;
    ptId: number;
}

interface Diary {
    title: string;
    content: string;
    date: string;
    category: string;
}

interface DayDetail {
    date: string;
    pts: Pt[];
    diary: Diary;
}