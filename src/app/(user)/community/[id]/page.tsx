import { CommuDetailDeclaration, CommuDetailEdit, CommuDetailLike, CommuDetailLikeFill, CommuDetailRemove } from "@/components/ui/image";
import CommuCommentCard from "@/feature/community/components/CommuCommentCard";
import Image from "next/image";
import CommentBar from "./CommentBar";
import { getCommunityById } from "@/service/community.service";
import { Community } from "@/feature/community/type";
import { format } from "date-fns";
import CommuLikeButton from "./CommuLikeButton";

export default async function CommuDetailPage({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params;
  const response = await getCommunityById(Number(id));
  if (!response?.data) {
    return (
      <div className="p-8">
        <div className="flex flex-col items-center justify-center text-center text-white m-auto">
          <p className="mt-5">존재하지 않는 게시물입니다.</p>
        </div>
      </div>
    )
  }
  const post: Community = response.data;

  return (
    <div className="flex flex-col gap-3 
    md:bg-[linear-gradient(135deg,_rgba(16,24,40,0.90)_0%,_rgba(30,41,57,0.90)_100%)]
    md:border-[#36415380] md:border-[1px]
    md:rounded-[16px]
    sm:mx-10
    md:mx-25
    lg:mx-40
    mt-5
    md:mt-10
    p-8
    
    ">
      <h2
        className="
        flex items-center justify-center
        self-baseline
        rounded-[4px] px-3 py-1 
        text-[#D1D5DC] bg-[#364153]
        text-[12px]
        font-extrabold"
      >
        {post.type === 'FREE' ? '자유게시판' : '공지'}
      </h2>
      <h1 className="text-[22px] md:text-[30px] font-black text-white"> {post.title} </h1>

      <div className="flex justify-between mt-5 md:my-5 items-center">
        <div className="flex flex-col md:flex-row gap-3">
          <p className="text-[10px] md:text-[12px] lg:text-[14px] text-white font-medium"> {post.author}</p>
          <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#99A1AF] font-normal">
            {format(post.createdAt, 'yyyy-MM-dd HH:mm')}
          </p>
          <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#99A1AF] font-normal"> 조회 {post.viewCount}</p>
        </div>
        <div className="flex gap-3 items-center">
          <CommuLikeButton like={post.likedByMe} likeCount={post.likeCount} postId={post.postId} />
          {
            post.mine ? (
              <>
                <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                  <div className="relative w-3 h-3 md:w-4 md:h-4">
                    <Image
                      src={CommuDetailEdit}
                      alt="게시글 수정"
                      fill
                      sizes="w-8 h-8"
                      className="object-cover hover:cursor-pointer"
                    />
                  </div>
                </div>

                <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                  <div className="relative w-3 h-3 md:w-4 md:h-4">
                    <Image
                      src={CommuDetailRemove}
                      alt="게시글 삭제"
                      fill
                      sizes="w-8 h-8"
                      className="object-cover hover:cursor-pointer"
                    />
                  </div>
                </div>

              </>
            ) : (
              <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                <div className="relative w-3 h-3 md:w-4 md:h-4">
                  <Image
                    src={CommuDetailDeclaration}
                    alt="게시글 신고"
                    fill
                    sizes="w-8 h-8"
                    className="object-cover hover:cursor-pointer"
                  />
                </div>
              </div>
            )
          }

        </div>
      </div>

      <p className="text-[13px] md:text-[16px] font-normal text-[#D1D5DC] py-8">{post.content} </p>

      <hr className="border-[#1E2939]" />

      <div className="flex gap-3 items-center">
        <p className="text-[14px] md:text-[18px] text-white font-extrabold"> 댓글</p>
        <p className="text-[14px] md:text-[18px] text-[#BFFF0B] font-extrabold"> {post.commentCount}</p>
      </div>
      <div className="hidden md:block">
        <CommentBar postId={post.postId} />
      </div>
      <div className="mb-20 md:mb-0 flex flex-col gap-3 ">
        {post.comments.content.map((comment) => {
          return <CommuCommentCard comment={comment} key={comment.commentId} />
        })}
        {post.comments.content.length === 0 && (
          <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
            게시글이 없습니다.
          </div>
        )}

      </div>
      <div className="block md:hidden fixed bottom-0 left-0 w-full bg-[#0B0F19] ">
        <CommentBar postId={post.postId} />
      </div>
    </div>
  );
}
