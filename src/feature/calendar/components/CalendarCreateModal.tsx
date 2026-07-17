'use client'

import { CloseButton } from "@/components/ui/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { calendargetExeriseAction, calendarPatchAction, calendarPostAction } from "../action";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CalendarSet from "./CalendarSet";
import PartSelecter from "@/components/ui/PartSelecter";
import CalendarNameSelecter from "./CalendarNameSelecter";

type CalendarCreateModalProps = {
    isModal: boolean;
    closeModal: () => void;
    selectedSettingDate: string;
    openCheck: () => void;
} & (
        {
            mode?: "create";
            data?: never;
        }
        | {
            mode: "update";
            data: Diary;
        }
    );

interface Set {
    setId?: number;
    setOrder: number;
    weight: number;
    reps: number;
}

export default function CalendarCreateModal({ isModal, closeModal, selectedSettingDate, openCheck, data, mode = 'create' }: CalendarCreateModalProps) {

    const [exerciseSet, setExerciseSet] = useState<Set[]>(data ? data.sets : [{
        setOrder: 1,
        weight: 0,
        reps: 0,
    }])
    const [exerciseName, setExerciseName] = useState<{ searchExercise: string, selectExercise: string }>({ searchExercise: '', selectExercise: data ? data.exercise : '' });
    const [isSelect, setIsSelect] = useState(false);
    const [selectPart, setSelectPart] = useState<PartKo | ''>(data ? data?.part : '')

    // useEffet 사용으로 마운트 시 작동 useRef로 막아도 제대로 작동하지 않음
    // const isFirstRender = useRef(true);

    // useEffect(() => {
    //     if (isFirstRender.current) {
    //         isFirstRender.current = false;
    //         return;
    //     } else {
    //         setExerciseName({ searchExercise: '', selectExercise: '' });
    //     }
    // }, [selectPart])

    const currentPart = useRef(selectPart);

    if (currentPart.current !== selectPart) {
        currentPart.current = selectPart;
        setExerciseName({ searchExercise: '', selectExercise: '' });
    }

    const isFirstRender = useRef(true);

    const {
        data: exerciseData = [],
        isLoading: isExerciseLoading,
        isError: isExerciseError,
    } = useQuery({
        queryKey: ['exercise', selectPart, exerciseName.searchExercise],
        queryFn: () => calendargetExeriseAction(selectPart, exerciseName.searchExercise),
        enabled: selectPart !== "",
        select: (response) => response.data,
    });

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
            openCheck();
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
                className="bg-gradient-to-br from-[#101828] to-[#000] w-4/5 max-h-120 sm:w-md sm:h-100 md:w-lg md:h-120 lg:w-lg rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
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
                    <div className="flex gap-2 mb-6 mt-3">
                        <PartSelecter visible={true} part={data ? data?.part : ''} setPart={setSelectPart} />
                        {!exerciseData && <p className="text-white">해당 부위에 맞는 운동이 없습니다</p>}
                        {selectPart && (
                            <CalendarNameSelecter isSelect={isSelect} setIsSelect={setIsSelect} exerciseName={exerciseName} setExerciseName={setExerciseName} exerciseData={exerciseData} exerciseId={data && data?.exerciseId} />
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
                            onClick={() => setExerciseSet([...exerciseSet, {
                                setOrder: exerciseSet.length + 1,
                                weight: 0,
                                reps: 0,
                            }])}
                            type="button"
                            className="bg-[#BFFF0B] w-8 h-8 font-bold text-black rounded-[5px]">
                            +</button>
                    </div>
                    {exerciseSet.map((set) => {
                        return <CalendarSet set={set.setOrder} sets={set} key={set.setOrder} />
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