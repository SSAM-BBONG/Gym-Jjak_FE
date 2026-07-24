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
            <div className="relative">
                <input
                    type="text"
                    value={searchName}
                    onChange={(event) => setSearchName(event.target.value)}
                    className="w-full px-6 py-3 pr-12 bg-[#101828] border border-[#1E2939] rounded-[14px] text-white placeholder:text-[#6A7282]"
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

            <div className="flex gap-2" aria-label="상대방 역할 필터">
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
                                    ? "bg-[#BFFF0B] text-black font-bold px-4 py-2 rounded-full"
                                    : "bg-[#101828] text-[#99A1AF] font-bold px-4 py-2 rounded-full border border-[#1E2939]"
                            }
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-col gap-3 mt-5">
                <p className="text-[12px] text-[#6A7282] font-bold">모든 대화</p>

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
