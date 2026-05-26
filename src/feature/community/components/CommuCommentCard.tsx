import { CommuCommentDeclaration, CommuCommentEdit, CommuCommentRemove } from "@/components/ui/image";

export default function CommuCommentCard() {
  return (
    <div className="bg-[#1E293980] p-4 flex flex-col gap-3 rounded-[10px]">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-[12px] font-medium text-white"> 작성자 아이디</p>
          <p className="text-[12px] font-normal text-[#99A1AF]"> 2026-05-13 15:00</p>
        </div>
        <div className="flex gap-2 items-center">
          <img src={CommuCommentDeclaration} alt="댓글 신고" />
          <img src={CommuCommentEdit} alt="댓글 수정" />
          <img src={CommuCommentRemove} alt="댓글 삭제" />
        </div>
      </div>
      <p className="text-[14px] font-normal text-[#D1D5DC]"> 댓글 내용</p>
    </div>
  );
}
