import { CommunityComment, CommunityLike, CommunityView } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";
import { Communities } from "../type";
import { format } from "date-fns";


export default function CommuCard({ community }: { community: Communities }) {
  return (
    <Link
      href={`/community/${community.postId}`}
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
        font-extrabold"> {community.type === 'FREE' ? '자유게시판' : '공지'} </p>

      <p className="text-[14px] md:text-[18px] font-extrabold text-white"> {community.title} </p>

      <p className="text-[12px] md:text-[14px] font-normal text-[#99A1AF]"> {community.content} </p>


      <div className="flex justify-between mt-1.5 md:mt-3">
        <div className="flex gap-1 md:gap-4">
          <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> {community.author}</p>
          <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> {format(community.createdAt, 'yyyy-MM-dd')}</p>
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
            <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> {community.viewCount}</p>
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
            <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> {community.likeCount}</p>
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
            <p className="text-[10px] md:text-[12px] font-normal text-[#6A7282]"> {community.commentCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
