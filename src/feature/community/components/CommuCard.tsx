import { CommunityComment, CommunityLike, CommunityView } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";


export default function CommuCard() {
  return (
    <Link
      href='/community/1'
      className="
        w-full 
        rounded-[8px]
        md:rounded-[16px]
        p-5
        md:p-6
        bg-[linear-gradient(135deg,_rgba(16,24,40,0.90)_0%,_rgba(30,41,57,0.90)_100%)]
        border-[1px] 
        border-[#36415380]
        flex
        flex-col
        gap-1.5
        md:gap-3
        mt-6
        hover:cursor-pointer">

      <p className="
        flex items-center justify-center
        self-baseline
        rounded-[2px]
        md:rounded-[4px]
        px-3 py-1 
        text-[#D1D5DC] bg-[#364153]
        md:text-[12px]
        text-[10px]
        font-extrabold"> 자유게시판 </p>

      <p className="text-[14px] md:text-[18px] font-extrabold text-white"> 게시글 제목 </p>

      <p className="text-[12px] md:text-[14px] font-normal text-[#99A1AF]"> 게시글 내용 </p>


      <div className="flex justify-between mt-1.5 md:mt-3">
        <div className="flex gap-1 md:gap-4">
          <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> 작성자 아이디</p>
          <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> 2025-05-10 19:00</p>
        </div>
        <div className="flex gap-1 md:gap-2">
          <div className="flex gap-0.5 md:gap-1 items-center">
            <div className="relative w-3 h-3 md:w-4 md:h-4">
              <Image
                src={CommunityView}
                alt="커뮤니티 조회수"
                fill
                sizes="w-8 h-8"
                className="object-cover"
              />
            </div>
            <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> 255</p>
          </div>
          <div className="flex gap-1 items-center">
            <div className="relative w-3 h-3 md:w-4 md:h-4">
              <Image
                src={CommunityLike}
                alt="커뮤니티 좋아요수"
                fill
                sizes="w-8 h-8"
                className="object-cover"
              />
            </div>
            <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> 24</p>
          </div>
          <div className="flex gap-1 items-center">
            <div className="relative w-3 h-3 md:w-4 md:h-4">
              <Image
                src={CommunityComment}
                alt="커뮤니티 댓글수"
                fill
                sizes="w-8 h-8"
                className="object-cover"
              />
            </div>
            <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> 12</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
