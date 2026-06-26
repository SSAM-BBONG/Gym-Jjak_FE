export default function OrganizationTrainerItem({ trainer }: { trainer: OrganizationTrainers }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="gird grid-cols-8 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-2">{trainer.trainerName}</p>
            <p className="col-span-3">{trainer.email}</p>
            <p className="col-span-3">{trainer.registeredAt}</p>
            {/* {`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`} */}
        </div>
    );
}