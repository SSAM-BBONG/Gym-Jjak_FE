import { CommuDetailDeclaration, CommuDetailEdit, CommuDetailLike, CommuDetailRemove } from "@/components/ui/image";
import CommuCommentCard from "@/feature/community/components/CommuCommentCard";

export default function CommuDetailPage() {
  return (
    <div className="flex flex-col gap-3 
    bg-[linear-gradient(135deg,_rgba(16,24,40,0.90)_0%,_rgba(30,41,57,0.90)_100%)]
    border-[#36415380] border-[1px]
    rounded-[16px]
    mx-40
    p-8
    ">
      <p
        className="
        flex items-center justify-center
        self-baseline
        rounded-[4px] px-3 py-1 
        text-[#D1D5DC] bg-[#364153]
        text-[12px]
        font-extrabold"
      >
        자유게시판
      </p>
      <p className="text-[30px] font-black text-white"> 게시글 제목 </p>

      <div className="flex justify-between my-5 items-center">
        <div className="flex gap-3">
          <p className="text-[14px] text-white font-medium"> 사용자 아이디</p>
          <p className="text-[14px] text-[#99A1AF] font-normal">
            2025-05-13 14:30
          </p>
          <p className="text-[14px] text-[#99A1AF] font-normal"> 조회 160</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className=" flex gap-2 items-center self-center px-4 py-2 bg-[#1E2939] rounded-[10px] font-extrabold text-[16px] text-white">
            <img className="hover:cursor-pointer" src={CommuDetailLike} alt="커뮤니티 상세조회 좋아요" />
            <p> 24 </p>
          </div>

          <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
            <img className="hover:cursor-pointer" src={CommuDetailEdit} alt="게시글 수정" />
          </div>

          <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
            <img className="hover:cursor-pointer" src={CommuDetailRemove} alt="게시글 삭제" />
          </div>

          <div className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
            <img className="hover:cursor-pointer" src={CommuDetailDeclaration} alt="게시글 신고" />
          </div>
        </div>
      </div>
      <hr className="border-[#1E2939]"/>

      <p className="text-[16px] font-normal text-[#D1D5DC] py-8"> 게시글 내용 </p>

      <hr className="border-[#1E2939]"/>

      <div className="flex gap-3 items-center">
        <p className="text-[18px] text-white font-extrabold"> 댓글</p>
        <p className="text-[18px] text-[#BFFF0B] font-extrabold"> 3</p>
      </div>
      <CommuCommentCard/>
    </div>
  );
}
