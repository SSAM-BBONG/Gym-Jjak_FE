import SearchBar from "@/feature/admin/components/SearchBar";
import ReportDataItem from "./ReportDataItem";

interface ReportMode {
    mode: 'review' | 'comment' | 'PT' | 'feedback' | 'post'
}

export default function ReportDataList({ mode }: ReportMode) {
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
                <ReportDataItem mode={mode} />
            </section>
        </div>
    );
}