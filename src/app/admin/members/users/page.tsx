import UserDataList from "./UserDataList";

export default function Page() {
    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">사용자 조회</h1>
            <UserDataList />
        </section>
    );
}