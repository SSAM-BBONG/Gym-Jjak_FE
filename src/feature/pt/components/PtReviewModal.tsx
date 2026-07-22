"use client";

import { CloseButton } from "@/components/ui/image";
import { createPtReviewAction } from "@/feature/pt/actions";
import Image from "next/image";
import { type FormEvent, useState } from "react";


interface PtReviewModalProps {
    isModal: boolean;
    closeModal: () => void;
    ptCourseId: number;
    reservationId: string;
    title: string;
}


export default function PtReviewModal({ isModal, closeModal, ptCourseId, reservationId, title }: PtReviewModalProps) {
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isModal) return null;

    const handleClose = () => {
        setRating(0);
        setContent("");
        setErrorMessage("");
        closeModal();
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        setIsSubmitting(true);

        const result = await createPtReviewAction(ptCourseId, reservationId, { rating, content });

        setIsSubmitting(false);

        if (result.success === false) {
            setErrorMessage(result.message);
            return;
        }

        setRating(0);
        setContent("");
        handleClose();
    };

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={handleClose} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-2xl rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}
                onSubmit={handleSubmit}>
                <article>
                    <div className="flex flex-col gap-2 ">
                        <div className="flex justify-between items-center pt-2">
                            <h3 className="font-bold text-xl text-[#E8EAF0]"> 수강평 작성 </h3>
                            <button type="button" onClick={handleClose} className="relative ml-auto w-5 h-5 hover:cursor-pointer">
                                <Image
                                    src={CloseButton}
                                    alt="모달 닫기 버튼"
                                    fill
                                    priority
                                    sizes="w-4 h-4"
                                />
                            </button>                        </div>
                        <p className="text-[14px] font-normal text-[#99A1AF] border-b-[#1E2939] border-b pb-8"> {title} </p>
                    </div>
                    <div className="flex flex-col gap-4 my-8">
                        <div className="flex flex-col">
                            <p className="text-[14px] font-medium text-white"> 별점</p>
                            <div className="flex gap-1" role="radiogroup" aria-label="별점">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        aria-label={`${value}점`}
                                        aria-checked={rating === value}
                                        role="radio"
                                        onClick={() => setRating(value)}
                                        className={`text-[40px] hover:cursor-pointer ${value <= rating ? "text-[#BFFF0B]" : "text-[#364153]"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <p className="text-[14px] font-medium text-white"> 수강평</p>
                            <textarea
                                placeholder="트레이너와 커리큘럼에 대한 솔직한 후기를 남겨주세요."
                                className="border-[#364153] border w-full h-47 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                            />
                            {errorMessage && <p className="text-sm text-[#FF6467]">{errorMessage}</p>}
                        </div>
                    </div>
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={handleClose}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939] hover:cursor-pointer'
                    >
                        취소
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        aria-busy={isSubmitting}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B] hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-60'
                    >
                        {isSubmitting ? "등록 중..." : "수강평 등록"}
                    </button>
                </article>
            </form>
        </section>
    );
}
