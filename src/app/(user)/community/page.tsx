import CommuCard from "@/feature/community/components/CommuCard";
import CommuWriteButton from "@/feature/community/components/CommuWriteButton";
import CommuSearchBar from "@/feature/community/components/SearchBar";
import Link from "next/link";

export default function CommuPage() {
  return (
    <div className="px-10 sm:px-20 md:px-30 lg:px-40 pt-5">
      <p className="text-[36px] font-black text-white"> 커뮤니티 </p>
      <p className="text-[#99A1AF] font-normal text-[14px] mt-[10px]"> 운동 정보를 공유하고 소통해보세요 </p>

      <div className="flex justify-between items-center mt-[30px]">
        <div className="flex gap-1 md:gap-4">
          <button className="bg-[#1E2939] text-[#99A1AF] text-[10px] md:text-[14px] font-medium px-3 py-2 rounded-[5px] md:rounded-[10px] hover:cursor-pointer"> 전체 </button>
          <button className="bg-[#1E2939] text-[#99A1AF] text-[10px] md:text-[14px] font-medium px-3 py-2 rounded-[5px] md:rounded-[10px] hover:cursor-pointer"> 자유게시판 </button>
          <button className="bg-[#1E2939] text-[#99A1AF] text-[10px] md:text-[14px] font-medium px-3 py-2 rounded-[5px] md:rounded-[10px] hover:cursor-pointer"> 공지 </button>
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

      <CommuCard />
    </div>
  );
}
