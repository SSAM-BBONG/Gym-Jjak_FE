import Pagination from "@/components/ui/Pagination";
import { getMyCommuAction } from "@/feature/mypage/actions";
import MyPostCard from "@/feature/mypage/components/MyPostCard";
import { MyCommu } from "@/feature/mypage/type";

interface paramsProps {
    searchParams: Promise<{
        page: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page } = await searchParams;
    const response = await getMyCommuAction(page);
    const myPosts: MyCommu[] = response.data.content;
    const totalPage: number = response.data.totalPages
    console.log(response.data.content)
    // console.log(response)
    return (
        <div className="flex flex-col px-40 pt-10">
            <p className="text-[36px] font-black text-white"> 내가 작성한 게시글 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 총 {myPosts?.length || 0}개의 게시글 </p>
            {myPosts.map((myPost) => {
                return <MyPostCard myPost={myPost} key={myPost.postId} />
            })}
            {myPosts?.length === 0 && (
                <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                    내 게시글이 없습니다.
                </div>
            )}

            {
                totalPage && <Pagination url={'mypage/mypost'} page={page} totalPage={totalPage} />
            }

        </div>
    );
}