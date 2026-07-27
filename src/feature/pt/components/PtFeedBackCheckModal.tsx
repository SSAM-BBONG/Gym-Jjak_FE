import { CloseButton, MypageMyActivity, PtFeedBackOnBoard, PtRecordVideo } from "@/components/ui/image";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFeedbackDetailAction } from "../actions";
import type { FeedbackDetailData } from "../type";

interface PtFeedBackCheckModalProps {
    isModal: boolean;
    closeModal: () => void;
    reservationId: string;
    feedbackId: number | null;
}

interface FeedbackMediaPreviewProps {
    title: string;
    mediaUrl?: string;
}

function FeedbackMediaPreview({ title, mediaUrl }: FeedbackMediaPreviewProps) {
    return (
        <div className="flex min-w-0 flex-col gap-3 rounded-[10px] border border-[#364153] bg-[#1E293980] p-4 sm:p-5 lg:p-6">
            <div className="flex items-center gap-3">
                <div className="relative h-6 w-6 shrink-0">
                    <Image
                        src={PtFeedBackOnBoard}
                        alt={`${title} 아이콘`}
                        fill
                        priority
                        sizes="24px"
                        className="object-cover"
                    />
                </div>
                <p className="text-[14px] font-extrabold text-[#D1D5DC]">{title}</p>
            </div>

            {mediaUrl ? (
                <video
                    controls
                    preload="metadata"
                    className="aspect-video w-full rounded-lg bg-black object-contain"
                    src={mediaUrl}
                >
                    브라우저가 영상을 재생하지 못합니다.
                </video>
            ) : (
                <div className="flex aspect-video flex-col items-center justify-center gap-3 rounded-lg bg-black/40 px-4 text-center">
                    <div className="relative h-12 w-12">
                        <Image
                            src={PtRecordVideo}
                            alt={`${title} 없음`}
                            fill
                            priority
                            sizes="48px"
                            className="object-cover opacity-60"
                        />
                    </div>
                    <p className="text-[12px] font-normal text-[#99A1AF]">등록된 영상이 없습니다.</p>
                </div>
            )}
        </div>
    );
}

export default function PtFeeBackCheckModal({
    isModal,
    closeModal,
    reservationId,
    feedbackId,
}: PtFeedBackCheckModalProps) {
    const [feedbackDetail, setFeedbackDetail] = useState<FeedbackDetailData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!isModal || feedbackId === null) return;

        let isCurrentRequest = true;

        const fetchFeedbackDetail = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");
                setFeedbackDetail(null);

                const response = await getFeedbackDetailAction(reservationId, feedbackId);

                if (!isCurrentRequest) return;

                if (response.success === false) {
                    setErrorMessage(response.message);
                    return;
                }

                setFeedbackDetail(response.data);
            } catch (error) {
                if (!isCurrentRequest) return;

                setErrorMessage(
                    error instanceof Error ? error.message : "피드백 상세 조회에 실패했습니다."
                );
            } finally {
                if (isCurrentRequest) setIsLoading(false);
            }
        };

        void fetchFeedbackDetail();

        return () => {
            isCurrentRequest = false;
        };
    }, [isModal, reservationId, feedbackId]);

    if (!isModal) return null;

    const beforeMedia = feedbackDetail?.mediaList.find((media) => media.mediaType === "BEFORE");
    const afterMedia = feedbackDetail?.mediaList.find((media) => media.mediaType === "AFTER");

    return (
        <section
            className="fixed inset-0 z-999 flex items-center justify-center bg-black/50 pt-17.5 pr-3 pb-6 pl-3 sm:pr-6 sm:pb-6 sm:pl-6"
            onClick={closeModal}
        >
            <form
                onSubmit={(event) => event.preventDefault()}
                className="z-1000 flex max-h-[calc(100dvh-6rem)] w-5/6 flex-col rounded-2xl border border-[#1E2939] bg-gradient-to-br from-[#101828] to-[#000] p-4 sm:w-4/5 sm:p-5 md:w-3/5 md:p-6 lg:w-2xl"
                onClick={(event) => event.stopPropagation()}
            >
                <article className="min-h-0 flex-1 overflow-y-auto pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between pt-2">
                            <h3 className="text-xl font-bold text-[#E8EAF0]">피드백 확인</h3>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="relative ml-auto h-5 w-5 cursor-pointer"
                                aria-label="피드백 모달 닫기"
                            >
                                <Image src={CloseButton} alt="" fill priority sizes="20px" />
                            </button>
                        </div>
                        <p className="border-b border-[#1E2939] pb-5 text-[14px] font-normal text-[#99A1AF] sm:pb-8">
                            {feedbackDetail?.sessionNo}회차 - {feedbackDetail?.curriculumTitle}
                        </p>
                    </div>

                    {isLoading && (
                        <p className="mt-6 text-[14px] font-medium text-[#99A1AF]">피드백을 불러오는 중입니다.</p>
                    )}

                    {errorMessage && (
                        <p className="mt-6 text-[14px] font-medium text-red-400">{errorMessage}</p>
                    )}

                    {!isLoading && !errorMessage && feedbackDetail && (
                        <div className="mt-4 flex flex-col gap-4 sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6">
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="relative h-4 w-4">
                                        <Image
                                            src={PtRecordVideo}
                                            alt="영상 피드백"
                                            fill
                                            priority
                                            sizes="16px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="text-[14px] font-extrabold text-[#BFFF0B]">영상 피드백</p>
                                </div>
                                <p className="text-[12px] font-normal text-[#6A7282]">{feedbackDetail.createdAt}</p>
                            </div>

                            <div className="flex flex-col gap-4 sm:gap-5">
                                <FeedbackMediaPreview title="Before 영상" mediaUrl={beforeMedia?.fileUrl} />
                                <FeedbackMediaPreview title="After 영상" mediaUrl={afterMedia?.fileUrl} />
                            </div>

                            <div className="mb-2 flex flex-col gap-4 sm:mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="relative h-5 w-5">
                                        <Image
                                            src={MypageMyActivity}
                                            alt="텍스트 피드백"
                                            fill
                                            priority
                                            sizes="20px"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="text-[14px] font-extrabold text-[#BFFF0B]">텍스트 피드백</p>
                                </div>
                                <div className="rounded-[10px] border border-[#364153] bg-[#1E293980] p-4 sm:p-5 lg:p-6">
                                    <p className="whitespace-pre-wrap break-words text-[14px] font-normal text-[#D1D5DC]">
                                        {feedbackDetail.content}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </article>

                <article className="mt-4 flex shrink-0 gap-3 border-t border-[#1E2939] pt-4">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="flex w-full items-center justify-center rounded-lg bg-[#1E2939] py-3 text-center text-sm font-semibold text-white cursor-pointer md:text-base"
                    >
                        닫기
                    </button>
                </article>
            </form>
        </section>
    );
}
