import OrganizationTrainerItem from "./OrganizationTrainersItem";

export default function OrganizationTrainerList() {
    return (
        <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
            <div style={{ display: 'grid' }} className="!gird grid-cols-10 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                <p className="col-span-2">이름</p>
                <p className="col-span-3">이메일</p>
                <p className="col-span-3">등록일</p>
                <p className="col-span-2">상태</p>
            </div>
            <OrganizationTrainerItem />
            <OrganizationTrainerItem />
            <OrganizationTrainerItem />
        </section>
    );
}