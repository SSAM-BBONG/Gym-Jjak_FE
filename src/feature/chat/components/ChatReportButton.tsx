"use client";

import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { createChatMessageReportAction } from "@/feature/chat/actions";
import type { ChatMessageReportReason } from "@/feature/chat/type";
import type { ReactNode } from "react";
import { useState } from "react";

interface ChatReportButtonProps {
    title: string;
    messageId: number;
    className?: string;
    children?: ReactNode;
}

export default function ChatReportButton({
    title,
    messageId,
    className,
    children,
}: ChatReportButtonProps) {
    const reportModal = useModal();
    const checkModal = useModal();
    const [reportState, setReportState] = useState({ success: false, message: "" });
    const [reason, setReason] = useState<ChatMessageReportReason | "">("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitReport = async () => {
        if (!reason) {
            setReportState({ success: false, message: "신고 사유를 선택해주세요." });
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createChatMessageReportAction(messageId, reason);

            setReportState(result);

            if (result.success) {
                setReason("");
                reportModal.closeModal();
                checkModal.openModal();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                type="button"
                onClick={() => {
                    reportModal.openModal();
                    setReportState({ success: false, message: "" });
                    setReason("");
                }}
                className={className}
            >
                {children ?? "채팅 신고하기"}
            </button>
            {reportModal.isModal && (
                <section
                    className="fixed left-0 top-0 z-999 h-screen w-screen bg-black/50"
                    onClick={reportModal.closeModal}
                >
                    <div
                        className="fixed left-1/2 top-1/2 z-1000 w-5/6 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#1E2939] bg-gradient-to-br from-[#101828] to-black p-6 sm:w-md"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h3 className="border-b border-[#1E2939] pb-5 text-lg font-bold text-[#E8EAF0]">신고 접수</h3>
                        <p className="my-4 text-base font-bold text-[#E8EAF0]">{title}</p>
                        <select
                            value={reason}
                            onChange={(event) => setReason(event.target.value as ChatMessageReportReason)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-[#BFFF0B] focus:outline-none"
                        >
                            <option value="" disabled>신고 사유</option>
                            <option value="ABUSE">욕설</option>
                            <option value="AD">광고</option>
                            <option value="OBSCENE">음란물</option>
                            <option value="FRAUD">사기</option>
                            <option value="FALSE_INFO">허위 정보</option>
                        </select>
                        {!reportState.success && reportState.message && (
                            <p className="mt-3 text-sm text-red-400">{reportState.message}</p>
                        )}
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={reportModal.closeModal}
                                className="flex w-full justify-center rounded-lg bg-[#1E2939] py-3 text-sm font-semibold text-white"
                            >
                                취소
                            </button>
                            <button
                                type="button"
                                disabled={isSubmitting}
                                onClick={submitReport}
                                className="flex w-full justify-center rounded-lg bg-[#BFFF0B] py-3 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                신고
                            </button>
                        </div>
                    </div>
                </section>
            )}
            <OneButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                title="신고 접수"
                content={reportState.message}
            />
        </>
    );
}
