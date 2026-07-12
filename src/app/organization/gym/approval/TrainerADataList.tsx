import SearchBar from "@/feature/admin/components/SearchBar";
import TrainerADataItem from "./TrainerADataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";
import Pagination from "@/components/ui/Pagination";


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
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-7 md:grid-cols-11 px-2 sm:px-3 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="col-span-3">이메일</p>
                    <p className="col-span-2 hidden md:block">이름</p>
                    <p className="col-span-2">닉네임</p>
                    <p className="col-span-2 hidden md:block">상태</p>
                    <p className="col-span-2">상세</p>
                </div>
                {trainers?.map((trainer) => (
                    <TrainerADataItem trainer={trainer} key={trainer.trainerApplicationId} />
                ))}

                {trainers?.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        트레이너 신청이 없습니다.
                    </div>
                )}
            </section>
            <Pagination url={`organization/gym/approval`} page={page} totalPage={totalPage} />

        </div>
    );
}
