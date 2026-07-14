import Pagination from "@/components/ui/Pagination";
import CommuCard from "@/feature/community/components/CommuCard";
import CommuSearchBar from "@/feature/community/components/SearchBar";
import { Communities } from "@/feature/community/type";
import { getCommunity } from "@/service/community.service";
import Link from "next/link";

interface paramsProps {
  searchParams: Promise<{
    page: string;
    type: "FREE" | "NOTICE";
  }>
}

export default async function CommuPage({ searchParams }: paramsProps) {

  const { page, type } = await searchParams;
  const response = await getCommunity(page, type);
  const communities: Communities[] = response.data.content;
  const totalPage: number = response.data.totalPages

  return (
    <div className="px-10 sm:px-20 md:px-30 lg:px-40 pt-5">
      <p className="text-[36px] font-black text-white"> 커뮤니티 </p>
      <p className="text-[#99A1AF] font-normal text-[14px] mt-[10px]"> 운동 정보를 공유하고 소통해보세요 </p>

      <div className="flex justify-between items-center mt-[30px]">
        <div className="flex gap-1 md:gap-4">
          <Link
            href={'/community?page=0'}
            className={`${type === undefined ? 'bg-[#BFFF0B] text-black font-semibold' : "bg-[#1E2939] text-[#99A1AF]"} text-[10px] md:text-[14px] font-medium px-3 py-2 rounded-[5px] md:rounded-[10px] hover:cursor-pointer`}>
            전체
          </Link>
          <Link
            href={'/community?page=0&type=FREE'}
            className={`${type === 'FREE' ? 'bg-[#BFFF0B] text-black font-semibold' : "bg-[#1E2939] text-[#99A1AF]"}  text-[10px] md:text-[14px] font-medium px-3 py-2 rounded-[5px] md:rounded-[10px] hover:cursor-pointer`}>
            자유게시판
          </Link>
          <Link
            href={'/community?page=0&type=NOTICE'}
            className={` ${type === 'NOTICE' ? 'bg-[#BFFF0B] text-black font-semibold' : "bg-[#1E2939] text-[#99A1AF]"}  text-[10px] md:text-[14px] font-medium px-3 py-2 rounded-[5px] md:rounded-[10px] hover:cursor-pointer`}>
            공지
          </Link>
        </div>

        <Link
          href='/community/create'
          className="
            bg-[#BFFF0B]
            rounded-[5px] md:rounded-[10px]
            text-[12px]
            md:text-[16px] text-black 
            flex items-center justify-center font-semibold md:font-extrabold px-5 py-2
            hover:cursor-pointer"
        >
          + 글쓰기
        </Link>
      </div>

      <CommuSearchBar />
      {
        communities.map((commu) => {
          return <CommuCard community={commu} key={commu.postId} />

        })
      }
      {communities.length === 0 && (
        <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
          첫 게시글을 남겨주세요
        </div>
      )}

      <Pagination url={`community`} page={page} totalPage={totalPage} />
    </div>
  );
}
