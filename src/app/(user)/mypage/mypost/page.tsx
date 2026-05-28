import MyPostCard from "@/feature/mypage/components/MyPostCard";

export default function Page() {
    return (
        <div className="flex flex-col px-40 pt-10">
            <p className="text-[36px] font-black text-white"> 내가 작성한 게시글 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 총 n개의 게시글 </p>
            <MyPostCard/>
        </div>
    );
}