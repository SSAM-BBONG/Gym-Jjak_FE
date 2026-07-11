'use client'

import { CommuCommentDeclaration, CommuCommentEdit, CommuCommentRemove } from "@/components/ui/image";
import Image from "next/image";
import { CommunityComments } from "../type";
import { format } from "date-fns";
import CommuDeleteComent from "./CommuDeleteComment";
import CommuUpdateComent from "./CommuUpdateComment";
import { useState } from "react";
import useModal from "@/components/hooks/useModal";
import { useForm } from "react-hook-form";
import { CommentUpdateAction } from "../action";
import { useRouter } from "next/navigation";
import OneButtonModal from "@/components/ui/OneButtonModal";

export default function CommuCommentCard({ comment }: { comment: CommunityComments }) {
  const [updateMode, setUpdateMode] = useState<boolean>(false);
  const [commentState, setCommentState] = useState<string>('');
  const router = useRouter();
  const modal = useModal();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<{ comment: string }>({
    mode: 'onSubmit',
  });

  const onSubmit = async (data: { comment: string }) => {
    if (!data.comment.trim()) {
      return;
    }

    const formData = new FormData();
    formData.set('comment', data.comment);

    try {
      const response = await CommentUpdateAction(comment.commentId, formData);
      if (response) {
        setCommentState(response)
        modal.openModal();
        return;
      }
      setUpdateMode(false);
      reset();
      router.refresh();
    } catch (error) {
      setCommentState(`네트워크 오류입니다\n다시 시도해주세요`);
      modal.openModal();
    }
  }

  return (
    <div className="bg-[#1E293980] p-4 flex flex-col gap-3 rounded-[10px]">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <p className="text-[12px] font-medium text-white"> {comment.author}</p>
          <p className="text-[10px] md:text-[12px] font-normal text-[#99A1AF]"> {format(comment.createdAt, 'yyyy-MM-dd HH:mm')}</p>
        </div>
        <div className="flex gap-2 items-center">
          {comment.mine ? (
            <>
              <CommuUpdateComent commentId={comment.commentId} setUpdateMode={setUpdateMode} />
              <CommuDeleteComent commentId={comment.commentId} />
            </>
          ) : (
            <div className="relative w-3 h-3 md:w-4 md:h-4">
              <Image
                src={CommuCommentDeclaration}
                alt="댓글 신고"
                fill
                sizes="w-8 h-8"
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
      {updateMode ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full gap-1 md:gap-3">
          <input
            aria-label="댓글 수정 내용"
            {...register('comment')}
            defaultValue={comment.content}
            className="flex items-center w-full rounded-[5px] md:rounded-[10px] border-[#364153] bg-[#1E2939] mx-0 py-4 px-4 gap-4 text-[12px] md:text-[14px] font-normal text-[#D1D5DC]" />
          <button
            type='button'
            onClick={() => {
              reset();
              setUpdateMode(false);
            }}
            className="bg-[#364153] text-white rounded-[5px] md:rounded-[10px] px-2  py-4 md:px-4 text-[12px] md:text-[14px] font-bold w-20">
            취소
          </button>
          <button
            disabled={isSubmitting}
            className="bg-[#BFFF0B] rounded-[5px] md:rounded-[10px] px-2 py-4 md:px-4 text-[12px] md:text-[14px] font-bold w-20">
            수정
          </button>
        </form>
      ) : (
        <p className="text-[12px] md:text-[14px] font-normal text-[#D1D5DC]"> {comment.content}</p>
      )
      }
      <OneButtonModal
        isModal={modal.isModal}
        closeModal={modal.closeModal}
        title="댓글 수정"
        content={commentState}
      />
    </div >
  );
}
