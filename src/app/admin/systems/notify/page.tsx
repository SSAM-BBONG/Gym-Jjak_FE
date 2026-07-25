import Pagination from "@/components/ui/Pagination";
import CommuCard from "@/feature/community/components/CommuCard";
import CommuSearchBar from "@/feature/community/components/SearchBar";
import { Communities } from "@/feature/community/type";
import { getCommunity } from "@/service/community.service";
import Link from "next/link";
import NotifyButton from "./NotifyButton";

interface paramsProps {
    searchParams: Promise<{
        page: string;
        keyword: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {

    const { page, keyword } = await searchParams;
    const response = await getCommunity(page, "NOTICE", keyword);
    const communities: Communities[] = response.data.content;
    const totalPage: number = response.data.totalPages

    return (

        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <div className="flex items-center  mb-5 sm:mb-6 lg:mb-8">
                <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">공지사항</h1>
                <NotifyButton />
            </div>

            <CommuSearchBar />
            {
                communities.map((commu) => {
                    return <CommuCard community={commu} key={commu.postId} />
                })
            }
            {communities.length === 0 && (
                <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                    공지가 없습니다
                </div>
            )}

            <Pagination url={`amdmin/systems/notify`} page={page} totalPage={totalPage} />
        </section>
    );
}
