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
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-13 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-3">이메일</p>
                    <p className="col-span-2">이름</p>
                    <p className="col-span-2">닉네임</p>
                    <p className="col-span-2">상태</p>
                    <p className="col-span-2">관리</p>
                    <p className="col-span-2">상세</p>
                </div>
                {trainers?.map((trainer) => (
                    <TrainerDataItem trainer={trainer} key={trainer.trainerId} />
                ))}

                {trainers?.length === 0 && (
                    <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                        트레이너 목록이 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={`members/trainers`} page={page} totalPage={totalPage} />

        </div>
    );
}