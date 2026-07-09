import { getReport } from "@/service/report.service";
import ReportDataList from "../ReportDataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page } = await searchParams;
    const response = await getReport('FEEDBACK', page);
    const reposts: Reposts[] = response.data.reports;
    const totalPage: number = response.data.totalPages

    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mb-5 sm:mb-6 lg:mb-8">피드백 신고 조회</h1>
            <ReportDataList mode='FEEDBACK' reposts={reposts} totalPage={totalPage} page={page} />
        </section>
    );
}