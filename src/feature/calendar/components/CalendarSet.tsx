export default function CalendarSet({ set, sets }: { set: number, sets?: ExerciseSet }) {
    return (
        <div className="flex gap-1 items-center  mb-6 mt-3">
            <p className="p-3 text-[#BFFF0B]">{set}</p>
            <input
                type="number"
                defaultValue={sets ? sets.weight : 0}
                id="kg"
                name="kg"
                placeholder="무게를 입력해주세요"
                className="border-[#364153] text-sm md:text-base border w-full py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none"
            />
            <label htmlFor="kg" className="md:p-3">kg</label>
            <input
                type="number"
                defaultValue={sets ? sets.reps : 0}
                id="rep"
                name="rep"
                placeholder="횟수를 입력해주세요"
                className="border-[#364153] text-sm md:text-base border w-full py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none"
            />
            <label htmlFor="rep" className="md:p-3">회</label>
        </div>
    );
}