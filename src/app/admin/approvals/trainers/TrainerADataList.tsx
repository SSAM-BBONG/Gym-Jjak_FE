import SearchBar from "@/feature/admin/components/SearchBar";
import TrainerADataItem from "./TrainerADataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";


interface TrainerApplicationDataListProps {
    trainers: TrainerApplications[]
    totalPage: number;
    page: string;
    keyword: string | null;
    status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED" | null;
}

export default function TrainerADataList({ trainers, totalPage, page, keyword, status }: TrainerApplicationDataListProps) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="!gird grid-cols-11 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-3">이메일</p>
                    <p className="col-span-2">이름</p>
                    <p className="col-span-2">닉네임</p>
                    <p className="col-span-2">상태</p>
                    <p className="col-span-2">상세</p>
                </div>
                {trainers?.map((trainer) => (
                    <TrainerADataItem trainer={trainer} key={trainer.trainerApplicationId} />
                ))}

                {trainers?.length === 0 && (
                    <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                        트레이너 신청이 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={`approvals/trainers`} page={page} totalPage={totalPage} />

        </div>
    );
}