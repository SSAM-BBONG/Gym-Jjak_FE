'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import ReportDataItem from "./ReportDataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";

interface ReportDataListProps {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST';
    reports: Reports[]
    totalPage: number;
    page: string;
}

export default function ReportDataList({ mode, reports, totalPage, page }: ReportDataListProps) {

    const modeType = { 'TRAINER_REVIEW': 'reviews', 'COMMENT': 'comments', 'PT_COURSE': 'pt', 'FEEDBACK': 'feedbacks', 'POST': 'posts' }

    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-11 md:grid-cols-23 px-1 sm:px-2 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[10px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="col-span-3 hidden md:block">신고 번호</p>
                    <p className="col-span-3">신고 대상</p>
                    <p className="col-span-3 hidden md:block">신고자</p>
                    <p className="col-span-2 hidden md:block">신고 날짜</p>
                    <p className="col-span-2 hidden md:block">누적 신고</p>
                    <p className="col-span-2 hidden md:block">상태</p>
                    <p className="col-span-3">신고 사유</p>
                    <p className="col-span-5">관리</p>
                </div>
                {reports?.map((report) => (
                    <ReportDataItem mode={mode} report={report} key={report.reportGroupId} />
                ))}

                {reports?.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        신고가 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination url={`reports/${modeType[mode]}`} page={page} totalPage={totalPage} />
        </div>
    );
}
