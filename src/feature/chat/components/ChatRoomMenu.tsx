"use client";

import useModal from "@/components/hooks/useModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { closeChatRoomAction } from "@/feature/chat/actions";
import { LogOut, TriangleAlert } from "lucide-react";
import { useState, useTransition } from "react";
import ChatReportButton from "./ChatReportButton";

interface ChatRoomMenuProps {
    chatRoomId: number;
    reportMessageId?: number;
    partnerName?: string;
}

export default function ChatRoomMenu({ chatRoomId, reportMessageId, partnerName }: ChatRoomMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [, startTransition] = useTransition();
    const leaveModal = useModal(() => {
        startTransition(async () => {
            await closeChatRoomAction(chatRoomId);
        });
    });

    return (
        <div className="relative shrink-0">
            <button
                type="button"
                aria-label="채팅방 메뉴"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[21px] text-[#99A1AF] transition-colors hover:bg-[#1E2939] hover:text-white"
            >
                &#8942;
            </button>

            {isOpen && (
                <div className="absolute right-0 top-full z-20 w-[180px] overflow-hidden rounded-[20px] border border-[#364153] bg-[#101828] py-1">
                    {reportMessageId && (
                        <ChatReportButton
                            title={`${partnerName ?? "상대방"}님의 메시지`}
                            messageId={reportMessageId}
                            className="flex w-full items-center gap-4 px-6 py-3 text-left text-[15px] font-bold text-[#F5A524] transition-colors hover:bg-[#1E2939]"
                        >
                            <TriangleAlert size={20} strokeWidth={2} />
                            채팅 신고하기
                        </ChatReportButton>
                    )}

                    {reportMessageId && <div className="h-px bg-[#253046]" />}

                    <button
                        type="button"
                        onClick={() => {
                            setIsOpen(false);
                            leaveModal.openModal();
                        }}
                        className="flex w-full items-center gap-4 px-6 py-3 text-center text-[15px] font-bold text-[#FB7185] transition-colors hover:bg-[#1E2939]"
                    >
                        <LogOut size={20} strokeWidth={2} />
                        채팅방 나가기
                    </button>
                </div>
            )}

            <TwoButtonModal
                isModal={leaveModal.isModal}
                closeModal={leaveModal.closeModal}
                activeModal={leaveModal.activeModal}
                title="채팅방 나가기"
                content="채팅방을 나가시겠습니까?"
            />
        </div>
    );
}
