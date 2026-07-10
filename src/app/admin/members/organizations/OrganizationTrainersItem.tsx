export default function OrganizationTrainerItem({ trainer }: { trainer: OrganizationTrainers }) {
    return (
        <div
            style={{ display: 'grid' }}
            className="gird grid-cols-5 sm:grid-cols-8 px-2 md:px-4 lg:px-6 text-white font-normal text-[10px] md:text-xs lg:text-sm border-t border-[#364153] h-14 md:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-2">{trainer.trainerName}</p>
            <p className="col-span-3">{trainer.email}</p>
            <p className="col-span-3 hidden sm:block">{trainer.registeredAt}</p>
            {/* {`${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()}`} */}
        </div>
    );
}
