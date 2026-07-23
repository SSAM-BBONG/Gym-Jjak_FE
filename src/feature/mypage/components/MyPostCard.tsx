import {
  CommunityComment,
  CommunityLike,
  CommunityView,
} from "@/components/ui/image";
import Image from "next/image";
import { MyCommu } from "../type";
import { format } from "date-fns";
import Link from "next/link";

export default function MyPostCard({ myPost }: { myPost: MyCommu }) {
  return (
    <Link
      href={`/community/${myPost.postId}`}
      className="
        flex flex-col gap-2
            p-6
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]
            mt-8"
    >
      <div className="flex gap-3 items-center">
        <p className="bg-[#364153] rounded-[4px] px-2 py-1 text-[12px] font-extrabold text-[#D1D5DC]"> 자유게시판</p>
        <p className="text-[12px] font-normal text-[#6A7282]"> {format(myPost.createdAt, 'yyyy-MM-dd')}</p>
      </div>
      <p className="text-[20px] text-white font-extrabold"> {myPost.title} </p>
      <p className="text-[14px] text-[#99A1AF] font-normal">
        {myPost.content}
      </p>
      <div className="flex gap-3 mt-2">
        <div className="flex gap-1 items-center">
          <div className="relative w-4 h-4">
            <Image
              src={CommunityLike}
              alt="커뮤니티 좋아요수"
              fill
              sizes="w-8 h-8"
              className="object-cover"
            />
          </div>
          <p className="text-[12px] font-normal text-[#6A7282]">{myPost.likeCount}</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="relative w-4 h-4">
            <Image
              src={CommunityComment}
              alt="커뮤니티 댓글수"
              fill
              sizes="w-8 h-8"
              className="object-cover"
            />
          </div>
          <p className="text-[12px] font-normal text-[#6A7282]"> {myPost.commentCount}</p>
        </div>
        <div className="flex gap-1 items-center">
          <div className="relative w-4 h-4">
            <Image
              src={CommunityView}
              alt="커뮤니티 조회수"
              fill
              sizes="w-8 h-8"
              className="object-cover"
            />
          </div>
          <p className="text-[12px] font-normal text-[#6A7282]">{myPost.viewCount}</p>
        </div>
      </div>
    </Link>
  );
}
