import AdminDeleteButton from "@/feature/admin/components/AdminDeleteButton";
import AdminUpdateButton from "@/feature/admin/components/AdminUpdateButton";


export default function SystemDataItem({ exercise }: { exercise: Exercise }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-8 sm:grid-cols-11 md:grid-cols-14 px-2 sm:px-3 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="md:col-span-4 col-span-2">{exercise.exerciseName}</p>
            <p className="col-span-2 sm:col-span-3">날짜</p>
            <p className="md:col-span-3 col-span-2 hidden sm:block text-[#BFFF0B]">{exercise.part}</p>
            <div className="col-span-2"><AdminUpdateButton id={exercise.exerciseId} exercise={exercise} /></div>
            <div className="col-span-2"><AdminDeleteButton id={exercise.exerciseId} /></div>
        </div>
    );
}
