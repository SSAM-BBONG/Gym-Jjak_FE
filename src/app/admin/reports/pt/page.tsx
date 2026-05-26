import ReportDataList from "../ReportDataList";

export default function Page() {
    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">피티 신고 조회</h1>
            <ReportDataList mode="PT" />
        </section>
    );
}