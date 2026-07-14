export default function CalendarSetRead({ sets }: { sets: Sets }) {
    return (
        <div className="flex gap-1 items-center  mb-6 mt-3">
            <p className="p-3 text-[#BFFF0B]">{sets.setOrder}</p>
            <div
                className="border-[#364153] text-sm md:text-base border w-full py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none"
            >{sets.weight}</div>
            <label htmlFor="kg" className="md:p-3">kg</label>
            <div
                className="border-[#364153] text-sm md:text-base border w-full py-3 md:px-6 px-3 bg-[#1E2939] rounded-md focus:border-[#BFFF0B] text-white focus:outline-none"
            >{sets.reps}</div>
            <label htmlFor="회" className="md:p-3">회</label>
        </div>
    );
}