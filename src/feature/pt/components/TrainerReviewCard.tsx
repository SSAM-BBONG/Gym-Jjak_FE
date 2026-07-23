"use client";

import { deletePtReviewAction, updatePtReviewAction } from "@/feature/pt/actions";
import { TrainerReview } from "@/feature/pt/type";
import { EllipsisVertical, Pencil, Trash2, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TrainerReviewCardProps {
    review: TrainerReview;
    ptCourseId: string;
}

export default function TrainerReviewCard({ review, ptCourseId }: TrainerReviewCardProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [rating, setRating] = useState(review.rating);
    const [content, setContent] = useState(review.content);
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleUpdate = async () => {
        setMessage("");
        setIsSubmitting(true);
        const result = await updatePtReviewAction(ptCourseId, review.trainerReviewId, { rating, content });
        setIsSubmitting(false);

        if (result.success === false) {
            setMessage(result.message);
            return;
        }

        setIsEditing(false);
        router.refresh();
    };

    const handleDelete = async () => {
        if (!window.confirm("수강평을 삭제하시겠습니까?")) return;

        setMessage("");
        setIsSubmitting(true);
        const result = await deletePtReviewAction(ptCourseId, review.trainerReviewId);
        setIsSubmitting(false);

        if (result.success === false) {
            setMessage(result.message);
            return;
        }

        router.refresh();
    };

    return (
        <div className="
        flex flex-col gap-5
        bg-[#101828]
        border border-[#36415380] rounded-[16px]
        p-8">
            <div className="flex items-start gap-3">
                <p className="px-3 py-2 text-[14px] font-extrabold text-white bg-[#1E2939] rounded-full"> {review.nickname.slice(0, 1)} </p>
                <div className="flex flex-col flex-1 gap-1">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <p className="text-[16px] font-extrabold text-white"> {review.nickname} </p>
                            <p className="px-3 py-1 bg-[#1E2939] rounded-[4px] text-[12px] font-normal text-[#99A1AF]"> {review.ptCourseTitle} </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-[12px] font-normal text-[#6A7282]"> {review.createdAt.slice(0, 10)}</p>
                            <div className="relative shrink-0">
                                <button
                                    type="button"
                                    aria-label="강사평 메뉴"
                                    aria-expanded={isMenuOpen}
                                    onClick={() => setIsMenuOpen((previous) => !previous)}
                                    className="flex items-center justify-center rounded-full text-[#99A1AF] transition-colors hover:bg-[#1E2939] hover:text-white"
                                >
                                    <EllipsisVertical size={20} />
                                </button>

                                {isMenuOpen && (
                                    <div className="absolute right-1 top-full z-20 w-[100px] overflow-hidden rounded-[15px] border border-[#364153] bg-[#101828]">
                                        {review.isMine ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        setIsEditing(true);
                                                    }}
                                                    className="flex w-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-bold text-white hover:bg-[#1E2939] pt-3"
                                                >
                                                    <Pencil size={17} strokeWidth={2} />
                                                    수정
                                                </button>
                                                <div className="h-px bg-[#253046]" />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsMenuOpen(false);
                                                        handleDelete();
                                                    }}
                                                    disabled={isSubmitting}
                                                    className="flex w-full items-center justify-center gap-2 px-3 py-2 text-[14px] font-bold text-[#FB7185] hover:bg-[#1E2939] pb-3"
                                                >
                                                    <Trash2 size={17} strokeWidth={2} />
                                                    삭제
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setIsMenuOpen(false)}
                                                className="flex w-full items-center justify-center gap-3 px-3 py-3 text-[12px] font-bold text-[#F5A524] hover:bg-[#1E2939]"
                                            >
                                                <TriangleAlert size={15} strokeWidth={2} />
                                                신고하기
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {isEditing ? (
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-1" role="radiogroup" aria-label="별점">
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <button
                                        key={value}
                                        type="button"
                                        role="radio"
                                        aria-label={`${value}점`}
                                        aria-checked={rating === value}
                                        onClick={() => setRating(value)}
                                        className={`text-[32px] hover:cursor-pointer ${value <= rating ? "text-[#BFFF0B]" : "text-[#364153]"}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                            <textarea
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                className="min-h-70 rounded-[20px] border border-[#364153] bg-[#1E2939] p-3 text-[#D1D5DC] resize-none"
                            />
                            <div className="flex gap-2">
                                <button type="button" onClick={handleUpdate} disabled={isSubmitting} className="rounded bg-[#BFFF0B] px-3 py-2 text-sm font-bold text-black disabled:opacity-60">저장</button>
                                <button type="button" onClick={() => { setIsEditing(false); setRating(review.rating); setContent(review.content); setMessage(""); }} className="rounded bg-[#1E2939] px-3 py-2 text-sm text-white">취소</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-[#BFFF0B]"> {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)} </p>
                            <p className="text-[16px] font-normal text-[#D1D5DC]"> {review.content} </p>
                        </>
                    )}
                    {message && <p className="text-sm text-[#FF6467]">{message}</p>}
                </div>
            </div>
        </div>
    );
}
