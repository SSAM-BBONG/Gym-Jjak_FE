import { getUserList } from "@/service/admin.service";
import UserDataList from "./UserDataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
        keyword: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page, keyword } = await searchParams;
    const response = await getUserList(page, keyword);
    const users: Users[] = response.data.content;
    const totalPage: number = response.data.totalPages

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">사용자 조회</h1>
            <UserDataList users={users} totalPage={totalPage} page={page} />
        </section>
    );
}