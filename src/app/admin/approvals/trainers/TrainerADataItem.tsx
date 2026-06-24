import TrainerApplicationStatus from "@/feature/admin/components/modals/TrainerApplicationStatus";
import TrainerDetailButton from "@/feature/admin/components/TrainerDetailButtton";

export default function TrainerADataItem({ trainer }: { trainer: TrainerApplications }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-11 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">{trainer.username}</p>
            <p className="col-span-2">{trainer.name}</p>
            <p className="col-span-2">{trainer.nickname}</p>
            <div className="col-span-2"><TrainerApplicationStatus text={trainer.status} /></div>
            <div className="col-span-2"><TrainerDetailButton mode='trainerApprove' trainerId={trainer.trainerApplicationId} /></div>
        </div>
    );
}