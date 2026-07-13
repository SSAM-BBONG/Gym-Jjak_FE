import { CloseButton } from "@/components/ui/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { calendarPatchAction, calendarPostAction, getCalendarCategory } from "../action";
import Image from "next/image";
import { useState } from "react";
import CalendarSet from "./CalendarSet";
import CalendarNameSelecter from "./CalendarNameSelecter";

type CalendarCreateModalProps = {
    isModal: boolean;
    closeModal: () => void;
    selectedSettingDate: string;
} & (
        | {
            mode?: "create";
            data?: never;
        }
        | {
            mode: "update";
            data: Diary;
        }
    );

export default function CalendarCreateModal({ isModal, closeModal, selectedSettingDate, data, mode = 'create' }: CalendarCreateModalProps) {

    const [exerciseSet, setExerciseSet] = useState<number[]>([1])
    const [exerciseName, setExerciseName] = useState<{ searchExercise: string, selectExercise: string }>({ searchExercise: '', selectExercise: '' });
    const [isSelect, setIsSelect] = useState(false);
    const [exerciseNames, setExerciseNames] = useState<Exercises[]>([
        {
            exerciseId: 1,
            part: "하체",
            exerciseName: '운동'
        },
        {
            exerciseId: 2,
            part: "하체",
            exerciseName: '하체'
        },
        {
            exerciseId: 3,
            part: "하체",
            exerciseName: '하반신'
        }
    ])

    const filterExerciseNames = exerciseNames.filter((e) => {
        return e.exerciseName.includes(exerciseName.searchExercise)
    })

    // 일지 등록
    // 데이터를 변경하는 요청을 관리하는 mutation을 생성
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        // createMutation.mutate(formData)가 호출되면 실행되는 함수 
        mutationFn: ((formData: FormData) => (
            (mode === 'update' && data) ? calendarPatchAction(data.workoutDiaryId, formData) : calendarPostAction(selectedSettingDate, formData)
        )),
        // 요청이 성공일 때
        onSuccess: (result) => {
            // 액션에서 넘어오는 return 값이 result
            // 리액트 쿼리는 리턴값을 넘겨주면 성공한걸로 생각하기 때문에 따로 if 문으로 false 반환될 시 처리 
            if (!result.success) {
                return;
            }

            void queryClient.invalidateQueries({
                queryKey: ["calendar-month"],
            });
            // "calendar-month"로 등록된 캐시 무효화

            void queryClient.invalidateQueries({
                queryKey: ["calendar-date", selectedSettingDate],
            });
            // 지금 날짜 캐시 무효화

            closeModal();
        },
    });

    const handleClose = () => {
        createMutation.reset();
        closeModal();
    };


    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={handleClose} >
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    createMutation.mutate(new FormData(event.currentTarget));
                }}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-4/5 max-h-120 sm:w-md sm:h-100 md:w-lg md:h-100 lg:w-3xl lg:h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => { e.stopPropagation(); setIsSelect(false) }}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-6 md:pb-8 md:pt-2 mb-8">
                        <h3 className="font-bold text-base md:text-lg text-[#E8EAF0]">{mode === 'create' ? '일지 추가' : '일지 수정'}</h3>
                        <button onClick={handleClose} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <label className="font-bold text-base md:text-xl text-white ">운동 종류</label>
                    <div className="flex gap-2">
                        <select
                            name="part"
                            className="border-[#364153] text-sm md:text-base border w-1/3 py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none mb-6 mt-3"
                            defaultValue={'부위'}>
                            <option disabled hidden>부위</option>
                            <option value='CHEST'>가슴</option>
                            <option value='BACK'>등</option>
                            <option value='SHOULDER'>어깨</option>
                            <option value='ARM'>팔</option>
                            <option value='ABS'>복근</option>
                            <option value='CORE'>코어</option>
                            <option value='LEG'>하체</option>
                            <option value='GLUTE'>둔근</option>
                            <option value='FULL_BODY'>전신</option>
                        </select>
                        {exerciseNames.length > 0 && (
                            <CalendarNameSelecter isSelect={isSelect} setIsSelect={setIsSelect} exerciseName={exerciseName} setExerciseName={setExerciseName} filterExerciseNames={filterExerciseNames} />
                        )}

                    </div>
                    <div className="flex gap-2">
                        <label className="font-bold text-base md:text-xl text-white ">운동 세트</label>
                        <button
                            onClick={() => (exerciseSet.length !== 1) && setExerciseSet([...exerciseSet].slice(0, -1))}
                            type="button"
                            className="bg-[#1E2939] w-8 h-8 font-bold rounded-[5px] ml-auto">
                            -</button>
                        <button
                            onClick={() => setExerciseSet([...exerciseSet, exerciseSet.length + 1])}
                            type="button"
                            className="bg-[#BFFF0B] w-8 h-8 font-bold text-black rounded-[5px]">
                            +</button>
                    </div>
                    {exerciseSet.map((set) => {
                        return <CalendarSet set={set} key={set} />
                    })}

                    {createMutation.data?.success === false && (
                        <p className="text-red-500 text-md m-2">{createMutation.data.message}</p>
                    )}
                </article>
                <article className='flex gap-3 mt-10'>
                    <button
                        type="button"
                        onClick={handleClose}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-s md:text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-s md:text-base bg-[#BFFF0B]'
                    >
                        {mode === 'create' ? '저장하기' : '수정하기'}
                    </button>
                </article>
            </form>
        </section>
    );
}