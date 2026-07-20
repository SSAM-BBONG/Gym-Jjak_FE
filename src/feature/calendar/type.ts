type Part = "CHEST" | "BACK" | "SHOULDER" | "ARM" | "ABS" | "CORE" | "LEG" | "GLUTE" | "FULL_BODY";
type PartKo = '가슴' | '등' | '어깨' | '팔' | '복근' | '코어' | '하체' | '둔근' | '전신';

//일지 등록
interface DiaryRequest {
    diaryDate: string;
    part: Part;
    exerciseId: number;
    sets: ExerciseSet[];
}

//일지 수정
interface DiaryUpdate {
    part: Part;
    exerciseId: number;
    sets: ExerciseSet[];
}
//월별 조회
interface Days {
    date: string;
    pt?: true,
    diarySummary?: string;
}

//일별 상세 조회의 pt
interface Pt {
    date: string;
    title: string;
    ptId: number;
}

//일별 상세 조회의 다이어리
interface Diary {
    workoutDiaryId: number;
    exercise: string;
    exerciseId: number;
    date: string;
    part: PartKo;
    sets: Sets[];
}

//일별 상세 조회의 셋
interface Sets {
    setId: number;
    setOrder: number;
    weight: number;
    reps: number;
}
//일별 상세 조회
interface DayDetail {
    date: string;
    pts: Pt[];
    diaries: Diary[];
}

interface ExerciseSet {
    setOrder: number;
    weight: number;
    reps: number;
}