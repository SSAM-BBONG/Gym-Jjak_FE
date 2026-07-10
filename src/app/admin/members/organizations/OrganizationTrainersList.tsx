import OrganizationTrainerItem from "./OrganizationTrainersItem";

export default function OrganizationTrainerList({ trainers }: { trainers: OrganizationTrainers[] }) {
    return (
        <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-4 lg:mt-6 rounded-md w-full ">
            <div style={{ display: 'grid' }} className="gird grid-cols-5 sm:grid-cols-8 px-2 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] md:text-xs lg:text-sm border-0 h-11 md:h-12 lg:h-13 items-center">
                <p className="col-span-2">이름</p>
                <p className="col-span-3">이메일</p>
                <p className="col-span-3 hidden sm:block">등록일</p>
            </div>
            {trainers.map(trainer => <OrganizationTrainerItem trainer={trainer} key={trainer.trainerName} />)}
            {trainers.length === 0 && (
                <div className="px-3 md:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                    소속 트레이너가 없습니다.
                </div>
            )}
        </section>
    );
}
