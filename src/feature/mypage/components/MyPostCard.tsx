import {
  CommunityComment,
  CommunityLike,
  CommunityView,
} from "@/components/ui/image";

export default function MyPostCard() {
  return (
    <div
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
        <p className="text-[12px] font-normal text-[#6A7282]"> 3일전</p>
      </div>
      <p className="text-[20px] text-white font-extrabold"> 헬스장 추천 부탁드립니다! </p>
      <p className="text-[14px] text-[#99A1AF] font-normal">
        강남역 근처에 괜찮은 헬스장 있을까요? PT도 받고 싶은데 추천부탁드려요.
      </p>
      <div className="flex gap-3 mt-2">
        <div className="flex gap-1 items-center">
          <img src={CommunityLike} alt="커뮤니티 좋아요수" />
          <p className="text-[12px] font-normal text-[#6A7282]"> 24</p>
        </div>
        <div className="flex gap-1 items-center">
          <img src={CommunityComment} alt="커뮤니티 댓글수" />
          <p className="text-[12px] font-normal text-[#6A7282]"> 12</p>
        </div>
        <div className="flex gap-1 items-center">
          <img src={CommunityView} alt="커뮤니티 조회수" />
          <p className="text-[12px] font-normal text-[#6A7282]"> 255</p>
        </div>
      </div>
    </div>
  );
}
