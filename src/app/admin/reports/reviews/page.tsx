import { getReport } from "@/service/report.service";
import ReportDataList from "../ReportDataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page } = await searchParams;
    const response = await getReport('TRAINER_REVIEW', page);
    const reposts: Reposts[] = response.data.reports;
    const totalPage: number = response.data.totalPages;

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">리뷰 신고 조회</h1>
            <ReportDataList mode='TRAINER_REVIEW' reposts={reposts} totalPage={totalPage} page={page} />
        </section>
    );
}