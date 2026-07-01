import { CloseButton, MypageMyActivity, PtFeedBackOnBoard, PtRecordVideo } from "@/components/ui/image";
import { useEffect, useState } from "react";
import { getFeedbackDetailAction } from "../actions";
import { FeedbackDetailData } from "../type";
import Image from "next/image";

interface TrainerRejectModal {
    isModal: boolean;
    closeModal: () => void;
    reservationId: string;
    feedbackId: number | null;
}


export default function PtFeeBackCheckModal({ isModal, closeModal, reservationId, feedbackId }: TrainerRejectModal) {
    const [feedbackDetail, setFeedbackDetail] = useState<FeedbackDetailData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!isModal || feedbackId === null) return;

        const fetchFeedbackDetail = async () => {
            try {
                setIsLoading(true);
                setErrorMessage("");

                const response = await getFeedbackDetailAction(
                    reservationId,
                    feedbackId
                );

                setFeedbackDetail(response.data);
            } catch (error) {
                setErrorMessage(
                    error instanceof Error
                        ? error.message
                        : "피드백 상세 조회에 실패했습니다."
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchFeedbackDetail();
    }, [isModal, reservationId, feedbackId]);
    if (!isModal) return null;

    const beforeMedia = feedbackDetail?.mediaList.find(
        (media) => media.mediaType === "BEFORE"
    );

    const afterMedia = feedbackDetail?.mediaList.find(
        (media) => media.mediaType === "AFTER"
    );


    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-2xl rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex justify-between items-center pt-2">
                            <h3 className="font-bold text-xl text-[#E8EAF0]"> 피드백 확인</h3>
                            <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                                <Image
                                    src={CloseButton}
                                    alt="모달 닫기 버튼"
                                    fill
                                    priority
                                    sizes="w-4 h-4"
                                />
                            </button>                        </div>
                        <p className="text-[14px] font-normal text-[#99A1AF] border-b-[#1E2939] border-b pb-8"> {feedbackDetail?.sessionNo}회차 - {feedbackDetail?.curriculumTitle} </p>
                    </div>
                    <div className="flex flex-col gap-6 mt-6">
                        <div className="flex justify-between items-center">
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
                                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 동영상 피드백 </p>
                            </div>
                            <p className="text-[12px] font-normal text-[#6A7282]"> {feedbackDetail?.createdAt} </p>
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="
                            flex flex-col gap-3
                            bg-[#1E293980]
                            border border-[#364153] rounded-[10px]
                            p-6 ">
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
                                    <p className="text-[14px] font-extrabold text-[#D1D5DC]"> Before 영상 </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative w-15 h-15">
                                        <Image
                                            src={PtRecordVideo}
                                            alt="피드백 동영상"
                                            fill
                                            priority
                                            sizes="w-30 h-30"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 영상 피드백이 등록되었습니다. </p>
                                    <a
                                        href={beforeMedia?.fileUrl}
                                        target="_blank"
                                        className="px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black text-center"
                                    >
                                        영상 보기
                                    </a>
                                </div>
                            </div>
                            <div className="
                            flex flex-col gap-3
                            bg-[#1E293980]
                            border border-[#364153] rounded-[10px]
                            p-6 ">
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
                                    <p className="text-[14px] font-extrabold text-[#D1D5DC]"> After 영상 </p>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="relative w-15 h-15">
                                        <Image
                                            src={PtRecordVideo}
                                            alt="피드백 동영상"
                                            fill
                                            priority
                                            sizes="w-30 h-30"
                                            className="object-cover"
                                        />
                                    </div>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 영상 피드백이 등록되었습니다. </p>

                                    <a
                                        href={afterMedia?.fileUrl}
                                        target="_blank"
                                        className="px-5 py-2 bg-[#BFFF0B] rounded-[10px] text-[14px] font-extrabold text-black text-center"
                                    >
                                        영상 보기
                                    </a>

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
                                </div>
                                <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 텍스트 피드백 </p>
                            </div>
                            <div className="
                            border border-[#364153] rounded-[10px]
                            bg-[#1E293980]
                            p-6
                            ">
                                <p className="text-[14px] font-normal text-[#D1D5DC]"> {feedbackDetail?.content} </p>
                            </div>
                        </div>
                    </div>
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={closeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        닫기
                    </button>
                </article>
            </form>
        </section>
    );
}