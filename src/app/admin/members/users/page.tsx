import AdminList from "@/feature/admin/components/AdminList";
import SearchBar from "@/feature/admin/components/SearchBar";

export default function Page() {
    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl">사용자 조회</h1>
            <SearchBar></SearchBar>
            <AdminList />
        </section>
    );
}