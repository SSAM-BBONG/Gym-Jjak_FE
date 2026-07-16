import { Dispatch, SetStateAction } from "react";

interface Props {
    isSelect: boolean;
    setIsSelect: Dispatch<SetStateAction<boolean>>;
    exerciseName: {
        searchExercise: string;
        selectExercise: string;
    }
    setExerciseName: Dispatch<SetStateAction<{
        searchExercise: string;
        selectExercise: string;
    }>>
    exerciseData: Exercise[];
    exerciseId?: number;
}

export default function CalendarNameSelecter({ isSelect, setIsSelect, exerciseName, setExerciseName, exerciseData, exerciseId }: Props) {
    return (
        <div className="relative w-full"
            onClick={(e) => { e.stopPropagation(); }}>
            <button
                onClick={() => setIsSelect(true)}
                type="button"
                className="flex items-center border-[#364153] text-sm md:text-base border w-full py-3.5 px-6 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none">
                {exerciseName.selectExercise || '운동 종류'}
            </button>
            <div className={`${!isSelect && 'hidden'} absolute w-full top-14 md:top-15 left-0 border-[#364153] bg-[#1E2939]`}>
                <div className="p-2">
                    <input value={exerciseName.searchExercise} onChange={(e) => setExerciseName({ ...exerciseName, searchExercise: e.target.value })} className="box-border bg-[#364153] text-sm md:text-base border w-full py-2 px-3 rounded-md focus:border-[#BFFF0B] text-white focus:outline-none " />
                </div>
                <ul>
                    {exerciseData?.map((e) => {
                        console.log(e.exerciseId)
                        console.log(exerciseId)
                        console.log(e.exerciseId === exerciseId)
                        return (
                            <li
                                onClick={() => setIsSelect(false)}
                                className="p-2 hover:bg-[#364153]" key={e.exerciseId}>
                                <label className="w-full block" htmlFor={e.exerciseName}>
                                    <input
                                        defaultChecked={e.exerciseId === exerciseId}
                                        onChange={() => setExerciseName({ ...exerciseName, selectExercise: e.exerciseName })}
                                        id={e.exerciseName}
                                        type="radio"
                                        name="exerciseName"
                                        hidden
                                        value={e.exerciseId} />
                                    {e.exerciseName}
                                </label>
                            </li>)
                    })}
                </ul>
            </div>
        </div>
    );
}