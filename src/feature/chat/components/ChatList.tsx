"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import type { ChatRoomData } from "../type";
import ChatListItem from "./ChatListItem";

type PartnerRoleFilter = "ALL" | ChatRoomData["partnerRole"];

interface ChatListProps {
    chatRooms: ChatRoomData[];
}

const roleFilters: { label: string; value: PartnerRoleFilter }[] = [
    { label: "전체", value: "ALL" },
    { label: "트레이너", value: "TRAINER" },
    { label: "수강생", value: "USER" },
];

export default function ChatList({ chatRooms }: ChatListProps) {

    const [selectedRole, setSelectedRole] = useState<PartnerRoleFilter>("ALL");
    const [searchName, setSearchName] = useState("");

    const filteredChatRooms = useMemo(() => {
        const normalizedSearchName = searchName.trim().toLocaleLowerCase();

        return chatRooms.filter((chatRoom) => {
            const matchesRole =
                selectedRole === "ALL" || chatRoom.partnerRole === selectedRole;
            const matchesName =
                normalizedSearchName === "" ||
                chatRoom.partnerName.toLocaleLowerCase().includes(normalizedSearchName);

            return matchesRole && matchesName;
        });
    }, [chatRooms, searchName, selectedRole]);

    const hasChatRooms = chatRooms.length > 0;

    return (
        <>
            <div className="relative rounded-[16px] border border-[#364153] bg-[#101828] p-2 sm:p-3">
                <input
                    type="text"
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                    className="w-full rounded-[12px] border border-[#1E2939] bg-[#0F172A] px-3 py-2 pr-10 text-[14px] text-white placeholder:text-[#6A7282] sm:px-4 sm:py-3 sm:pr-12 sm:rounded-[14px] sm:text-base lg:px-6"
                    placeholder="이름으로 검색"
                    aria-label="상대방 이름으로 채팅 검색"
                />
                {searchName && (
                    <button
                        type="button"
                        onClick={() => setSearchName("")}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#99A1AF] transition-colors hover:text-white"
                        aria-label="검색어 지우기"
                    >
                        <X size={18} aria-hidden />
                    </button>
                )}
            </div>

            <div className="flex gap-2 rounded-[16px] border border-[#1E2939] bg-[#101828] p-2 sm:p-3" aria-label="상대방 역할 필터">
                {roleFilters.map(({ label, value }) => {
                    const isSelected = selectedRole === value;

                    return (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setSelectedRole(value)}
                            aria-pressed={isSelected}
                            className={
                                isSelected
                                    ? "bg-[#BFFF0B] text-[12px] text-black font-bold px-3 py-1.5 rounded-full sm:px-4 sm:py-2 sm:text-sm"
                                    : "bg-[#101828] text-[12px] text-[#99A1AF] font-bold px-3 py-1.5 rounded-full border border-[#1E2939] sm:px-4 sm:py-2 sm:text-sm"
                            }
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            <div className="mt-5 mb-3 flex flex-col gap-3 sm:mt-6">
                <p className="mb-3 text-[12px] font-bold text-[#BFFF0B] sm:text-sm">모든 대화</p>

                {!hasChatRooms ? (
                    <p className="py-12 text-center text-[#99A1AF]">
                        아직 채팅이 없습니다.
                    </p>
                ) : filteredChatRooms.length === 0 ? (
                    <p className="py-12 text-center text-[#99A1AF]">
                        조건에 맞는 채팅이 없습니다.
                    </p>
                ) : (
                    filteredChatRooms.map((chat) => (
                        <ChatListItem key={chat.chatRoomId} chat={chat} />
                    ))
                )}
            </div>
        </>
    );
}
