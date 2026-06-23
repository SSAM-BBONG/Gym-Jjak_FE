import { getBlacklist } from "@/service/admin.service";
import BlackListDataList from "./BlackListDataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
        keyword: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page, keyword } = await searchParams;
    const response = await getBlacklist(page, keyword);
    const blacklists: Blacklists[] = response.data.content;
    const totalPage: number = response.data.totalPages

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">블랙리스트 조회</h1>
            <BlackListDataList blacklists={blacklists} totalPage={totalPage} page={page} />
        </section>
    );
}