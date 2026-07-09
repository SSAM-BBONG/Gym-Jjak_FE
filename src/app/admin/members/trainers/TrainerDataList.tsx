'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import TrainerDataItem from "./TrainerDataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";


interface TrainerDataListProps {
    trainers: Trainers[]
    totalPage: number;
    page: string;
}

export default function TrainerDataList({ trainers, totalPage, page }: TrainerDataListProps) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid md:grid-cols-13 grid-cols-9 px-2 sm:px-3 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="col-span-3">이메일</p>
                    <p className="col-span-2 hidden md:block">이름</p>
                    <p className="col-span-2">닉네임</p>
                    <p className="col-span-2 hidden md:block">상태</p>
                    <p className="col-span-2">관리</p>
                    <p className="col-span-2">상세</p>
                </div>
                {trainers?.map((trainer) => (
                    <TrainerDataItem trainer={trainer} key={trainer.trainerProfileId} />
                ))}

                {trainers?.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        트레이너 목록이 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={`members/trainers`} page={page} totalPage={totalPage} />

        </div>
    );
}
