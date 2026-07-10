import ActiveStatus from "@/feature/admin/components/ActiveStatus";
import StatusButton from "@/feature/admin/components/StatusButton";
import TrainerDetailButton from "@/feature/admin/components/TrainerDetailButtton";

export default function TrainerDataItem({ trainer }: { trainer: Trainers }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="grid md:grid-cols-13 grid-cols-9 px-2 sm:px-3 md:px-4 lg:px-6 text-white font-normal text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3">{trainer.username}</p>
            <p className="col-span-2 hidden md:block">{trainer.name}</p>
            <p className="col-span-2">{trainer.nickname}</p>
            <div className="col-span-2 hidden md:block"><ActiveStatus text={trainer.status} nickname={trainer.nickname} /></div>
            <div className="col-span-2 "><StatusButton userId={trainer.userId} nickname={trainer.nickname} status={trainer.status} /></div>
            <div className="col-span-2"><TrainerDetailButton mode='trainerView' trainerId={trainer.trainerProfileId} /></div>
        </div>
    );
}
