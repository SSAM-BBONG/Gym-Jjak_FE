import BlackListDataList from "./BlackListDataList";

export default function Page() {
    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">블랙리스트 조회</h1>
            <BlackListDataList />
        </section>
    );
}