import ReportDataList from "../ReportDataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
    }>
}

export default function Page({ searchParams }: paramsProps) {
    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">리뷰 신고 조회</h1>
            <ReportDataList mode='TRAINER_REVIEW' searchParams={searchParams} />
        </section>
    );
}