import OrganizationDataList from "./OrganizationDataList";

export default function Page() {
    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">조직 조회</h1>
            <OrganizationDataList />
        </section>
    );
}