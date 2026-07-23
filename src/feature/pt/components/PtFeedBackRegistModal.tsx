"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CloseButton, MypageMyActivity, PtFeedBackOnBoard, PtRecordVideo } from "@/components/ui/image";
import { createPtFeedbackAction, getFeedbackDetailAction, updatePtFeedbackAction } from "../actions";
import type { StudentFeedbackCurriculum } from "../type";
import { ptFeedbackSchema, PtFeedbackFormValue } from "@/lib/ptFeedbackSchema";
import Image from "next/image";

interface PtFeeBackRegistModalProps {
  isModal: boolean;
  closeModal: () => void;
  reservationId: string;
  ptCourseId: string;
  curriculum: StudentFeedbackCurriculum | null;
  feedbackId?: number | null;
}

export default function PtFeeBackRegistModal({
  isModal,
  closeModal,
  reservationId,
  ptCourseId,
  curriculum,
  feedbackId = null,
}: PtFeeBackRegistModalProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState("");
  const [existingMedia, setExistingMedia] = useState<{ beforeUrl?: string; afterUrl?: string }>({});
  const [previewUrls, setPreviewUrls] = useState<{ beforeUrl?: string; afterUrl?: string }>({});

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PtFeedbackFormValue>({
    resolver: zodResolver(ptFeedbackSchema) as Resolver<PtFeedbackFormValue>,
    defaultValues: {
      beforeFile: undefined,
      afterFile: undefined,
      content: "",
    },
    mode: "onSubmit",
  });

  const beforeFile = watch("beforeFile");
  const afterFile = watch("afterFile");

  useEffect(() => {
    const beforeUrl = beforeFile ? URL.createObjectURL(beforeFile) : undefined;
    const afterUrl = afterFile ? URL.createObjectURL(afterFile) : undefined;

    setPreviewUrls({ beforeUrl, afterUrl });

    return () => {
      if (beforeUrl) URL.revokeObjectURL(beforeUrl);
      if (afterUrl) URL.revokeObjectURL(afterUrl);
    };
  }, [beforeFile, afterFile]);

  useEffect(() => {
    if (!isModal) return;

    const resetForm = async () => {
      reset({
      beforeFile: undefined,
      afterFile: undefined,
      content: "",
      });
      setExistingMedia({});
      setSubmitError("");

      if (feedbackId === null) return;

      const result = await getFeedbackDetailAction(reservationId, feedbackId);
      if (result.success === false) {
        setSubmitError(result.message);
        return;
      }

      reset({ beforeFile: undefined, afterFile: undefined, content: result.data.content });
      setExistingMedia({
        beforeUrl: result.data.mediaList.find((media) => media.mediaType === "BEFORE")?.fileUrl,
        afterUrl: result.data.mediaList.find((media) => media.mediaType === "AFTER")?.fileUrl,
      });
    };

    void resetForm();
  }, [feedbackId, isModal, reservationId, curriculum?.ptCurriculumId, reset]);

  if (!isModal || !curriculum) return null;

  const onSubmit: SubmitHandler<PtFeedbackFormValue> = async (values) => {
    const formData = new FormData();

    formData.append("ptCurriculumId", String(curriculum.ptCurriculumId));
    formData.append("beforeFile", values.beforeFile);
    formData.append("afterFile", values.afterFile);
    formData.append("content", values.content);

    try {
      const result = feedbackId === null
        ? await createPtFeedbackAction(reservationId, ptCourseId, formData)
        : await updatePtFeedbackAction(reservationId, feedbackId, ptCourseId, formData);

      if (result?.success === false) {
        setSubmitError(result.message ?? "피드백 등록에 실패하였습니다.");
        return;
      }

      closeModal();
      router.refresh();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "피드백 등록에 실패하였습니다."
      );
    }
  };

  return (
    <section
      className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
      onClick={closeModal}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
        bg-gradient-to-br from-[#101828] to-[#000]
        h-150 w-2xl rounded-2xl border border-[#1E2939]
        z-1000 fixed top-1/2 left-1/2 p-6
        flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
        overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        <article>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center pt-2">
              <h3 className="font-bold text-xl text-[#E8EAF0]">
                {feedbackId === null ? "피드백 등록" : "피드백 수정"}
              </h3>

              <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                <Image
                  src={CloseButton}
                  alt="모달 닫기 버튼"
                  fill
                  priority
                  sizes="w-4 h-4"
                />
              </button>
            </div>

            <p className="text-[14px] font-normal text-[#99A1AF] border-b-[#1E2939] border-b pb-8">
              {curriculum.sessionNo}회차 - {curriculum.title}
            </p>
          </div>

          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-2 items-center">
              <div className="relative w-4 h-4">
                <Image
                  src={PtRecordVideo}
                  alt="피드백 동영상"
                  fill
                  priority
                  sizes="w-8 h-8"
                  className="object-cover"
                />
              </div>
              <p className="text-[14px] font-extrabold text-[#BFFF0B]">
                영상 피드백
              </p>
            </div>

            <div className="flex flex-col gap-5">
              <div
                className="
                flex flex-col gap-3
                bg-[#1E293980]
                border border-[#364153] rounded-[10px]
                p-6
                "
              >
                <div className="flex gap-3">
                  <div className="relative w-6 h-6">
                    <Image
                      src={PtFeedBackOnBoard}
                      alt="피드백 녹화"
                      fill
                      priority
                      sizes="w-12 h-12"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[14px] font-extrabold text-[#D1D5DC]">
                    Before 영상
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  {previewUrls.beforeUrl || existingMedia.beforeUrl ? (
                    <video
                      key={previewUrls.beforeUrl ?? existingMedia.beforeUrl}
                      controls
                      preload="metadata"
                      className="aspect-video w-full rounded-lg bg-black object-contain"
                      src={previewUrls.beforeUrl ?? existingMedia.beforeUrl}
                    >
                      브라우저가 영상 재생을 지원하지 않습니다.
                    </video>
                  ) : (
                    <div className="relative w-15 h-15">
                      <Image
                        src={PtRecordVideo}
                        alt="BEFORE 영상 업로드"
                        fill
                        priority
                        sizes="w-30 h-30"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-[12px] font-normal text-[#99A1AF] text-center">
                    {beforeFile
                      ? beforeFile.name
                      : existingMedia.beforeUrl
                        ? "기존 Before 영상이 등록되어 있습니다."
                        : "Before 영상을 업로드해주세요."}
                  </p>

                  <label
                    htmlFor="ptmanage-feedback-before"
                    className="px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black cursor-pointer"
                  >
                    업로드
                  </label>

                  <input
                    id="ptmanage-feedback-before"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;

                      setValue("beforeFile", file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />

                  {errors.beforeFile?.message && (
                    <p className="text-[12px] font-medium text-red-400">
                      {errors.beforeFile.message}
                    </p>
                  )}
                </div>
              </div>

              <div
                className="
                flex flex-col gap-3
                bg-[#1E293980]
                border border-[#364153] rounded-[10px]
                p-6
                "
              >
                <div className="flex gap-3">
                  <div className="relative w-6 h-6">
                    <Image
                      src={PtFeedBackOnBoard}
                      alt="피드백 녹화"
                      fill
                      priority
                      sizes="w-12 h-12"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[14px] font-extrabold text-[#D1D5DC]">
                    After 영상
                  </p>
                </div>

                <div className="flex flex-col items-center gap-3">
                  {previewUrls.afterUrl || existingMedia.afterUrl ? (
                    <video
                      key={previewUrls.afterUrl ?? existingMedia.afterUrl}
                      controls
                      preload="metadata"
                      className="aspect-video w-full rounded-lg bg-black object-contain"
                      src={previewUrls.afterUrl ?? existingMedia.afterUrl}
                    >
                      브라우저가 영상 재생을 지원하지 않습니다.
                    </video>
                  ) : (
                    <div className="relative w-15 h-15">
                      <Image
                        src={PtRecordVideo}
                        alt="AFTER 영상 업로드"
                        fill
                        priority
                        sizes="w-30 h-30"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-[12px] font-normal text-[#99A1AF] text-center">
                    {afterFile
                      ? afterFile.name
                      : existingMedia.afterUrl
                        ? "기존 After 영상이 등록되어 있습니다."
                        : "After 영상을 업로드해주세요."}
                  </p>

                  <label
                    htmlFor="ptmanage-feedback-after"
                    className="px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black cursor-pointer"
                  >
                    업로드
                  </label>

                  <input
                    id="ptmanage-feedback-after"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;

                      setValue("afterFile", file, {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    }}
                  />

                  {errors.afterFile?.message && (
                    <p className="text-[12px] font-medium text-red-400">
                      {errors.afterFile.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div className="flex gap-2 items-center">
                <div className="relative w-5 h-5">
                  <Image
                    src={MypageMyActivity}
                    alt="피드백 텍스트 피드백"
                    fill
                    priority
                    sizes="w-10 h-10"
                    className="object-cover"
                  />
                </div>                <p className="text-[14px] font-extrabold text-[#BFFF0B]">
                  텍스트 피드백
                </p>
              </div>

              <div
                className="
                flex
                border border-[#364153] rounded-[10px]
                bg-[#1E293980]
                p-6
                "
              >
                <textarea
                  {...register("content")}
                  className="flex-1 text-[14px] font-normal text-[#D1D5DC] bg-transparent outline-none resize-none"
                  placeholder="텍스트 피드백을 작성해주세요."
                  rows={10}
                />
              </div>

              {errors.content?.message && (
                <p className="text-[12px] font-medium text-red-400">
                  {errors.content.message}
                </p>
              )}

              {submitError && (
                <p className="text-[12px] font-medium text-red-400">
                  {submitError}
                </p>
              )}
            </div>
          </div>
        </article>

        <article className="flex gap-3">
          <button
            type="button"
            onClick={closeModal}
            disabled={isSubmitting}
            className="w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939] disabled:opacity-60"
          >
            취소
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B] disabled:opacity-60"
          >
            {isSubmitting ? "저장 중" : feedbackId === null ? "등록" : "수정"}
          </button>
        </article>
      </form>
    </section>
  );
}
