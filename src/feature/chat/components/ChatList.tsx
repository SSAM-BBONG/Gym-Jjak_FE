"use client";

import { useMemo, useState } from "react";
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
            <input
                type="search"
                value={searchName}
                onChange={(event) => setSearchName(event.target.value)}
                className="px-6 py-3 bg-[#101828] border border-[#1E2939] rounded-[14px] text-white placeholder:text-[#6A7282]"
                placeholder="이름으로 검색"
                aria-label="상대방 이름으로 채팅 검색"
            />

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
