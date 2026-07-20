"use client";

import { deletePtReviewAction, updatePtReviewAction } from "@/feature/pt/actions";
import { TrainerReview } from "@/feature/pt/type";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TrainerReviewCardProps {
    review: TrainerReview;
    ptCourseId: string;
}

export default function TrainerReviewCard({ review, ptCourseId }: TrainerReviewCardProps) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
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
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-4 items-center">
                            <p className="text-[16px] font-extrabold text-white"> {review.nickname} </p>
                            <p className="px-3 py-1 bg-[#1E2939] rounded-[4px] text-[12px] font-normal text-[#99A1AF]"> {review.ptCourseTitle} </p>
                        </div>
                        <p className="text-[12px] font-normal text-[#6A7282]"> {review.createdAt.slice(0, 10)}</p>
                    </div>
                    {isEditing ? (
                        <div className="flex flex-col gap-3">
                            <select
                                value={rating}
                                onChange={(event) => setRating(Number(event.target.value))}
                                className="w-28 rounded bg-[#1E2939] p-2 text-white"
                            >
                                {[1, 2, 3, 4, 5].map((value) => <option key={value} value={value}>{value}점</option>)}
                            </select>
                            <textarea
                                value={content}
                                onChange={(event) => setContent(event.target.value)}
                                className="min-h-28 rounded border border-[#364153] bg-[#1E2939] p-3 text-[#D1D5DC]"
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
                            <div className="mt-3 flex gap-2">
                                <button type="button" onClick={() => setIsEditing(true)} className="text-sm text-[#BFFF0B]">수정</button>
                                <button type="button" onClick={handleDelete} disabled={isSubmitting} className="text-sm text-[#FF6467] disabled:opacity-60">삭제</button>
                            </div>
                        </>
                    )}
                    {message && <p className="text-sm text-[#FF6467]">{message}</p>}
                </div>
            </div>
        </div>
    );
}
