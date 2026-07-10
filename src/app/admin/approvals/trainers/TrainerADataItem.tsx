import TrainerApplicationStatus from "@/feature/admin/components/modals/TrainerApplicationStatus";
import TrainerDetailButton from "@/feature/admin/components/TrainerDetailButtton";

export default function TrainerADataItem({ trainer }: { trainer: TrainerApplications }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-7 md:grid-cols-11 px-2 sm:px-3 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3">{trainer.username}</p>
            <p className="col-span-2 hidden md:block">{trainer.name}</p>
            <p className="col-span-2">{trainer.nickname}</p>
            <div className="col-span-2 hidden md:block"><TrainerApplicationStatus text={trainer.status} /></div>
            <div className="col-span-2"><TrainerDetailButton mode='trainerApprove' trainerId={trainer.trainerApplicationId} /></div>
        </div>
    );
}
