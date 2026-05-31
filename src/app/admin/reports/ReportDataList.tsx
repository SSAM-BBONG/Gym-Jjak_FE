import SearchBar from "@/feature/admin/components/SearchBar";
import ReportDataItem from "./ReportDataItem";
import AdminPagination from "@/feature/admin/components/AdminPagination";

interface ReportDataListProps {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST';
    searchParams: Promise<{
        page: string;
    }>;
    reposts: Reposts[]
    totalPage: number
}

export default async function ReportDataList({ mode, searchParams, reposts, totalPage }: ReportDataListProps) {

    const { page } = await searchParams;

    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="!gird grid-cols-21 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-3">신고 번호</p>
                    <p className="col-span-3">신고 대상</p>
                    <p className="col-span-3">신고자</p>
                    <p className="col-span-3">신고 사유</p>
                    <p className="col-span-2">신고 날짜</p>
                    <p className="col-span-2">누적 신고</p>
                    <p className="col-span-2">상태</p>
                    <p className="col-span-3">관리</p>
                </div>
                {reposts?.map((repost) => (
                    <ReportDataItem mode={mode} repost={repost} key={repost.reportGroupId} />
                ))}

                {reposts?.length === 0 && (
                    <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                        신고가 없습니다.
                    </div>
                )}
            </section>
            <AdminPagination mode={mode} page={page} totalPage={totalPage} />
        </div>
    );
}