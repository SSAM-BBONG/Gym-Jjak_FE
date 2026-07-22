import { HeaderProfile } from "@/components/ui/image";
import { ChatRoomData } from "../type";
import Link from "next/link";
import ChatRoomMenu from "./ChatRoomMenu";

interface ChatListItemProps {
    chat: ChatRoomData
}

export default function ChatListItem( {chat}: ChatListItemProps) {
    return (
        <div 
            key={chat.chatRoomId}
            className="flex gap-4 items-center py-5 px-4 rounded-[16px] bg-[#101828] border border-[#1E2939]">
            <Link className="flex-1" href={`/chat/${chat.chatRoomId}`}>
            <div className="flex gap-3 flex-1 justify-between">
                <div className="border border-[#364153] rounded-full w-[55px] h-[55px] flex justify-center items-center">
                    <img src={chat.partnerProfileImageUrl || HeaderProfile} className="object-cover w-[70%]"/>
                </div>
                <div className="flex flex-1 justify-between items-center">
                    <div className="flex flex-col gap-2 justify-center">
                        <div className="flex gap-3 items-center">
                            <p className="text-[14px] font-bold text-white"> {chat.partnerName} </p>
                            <p className="border border-[#364153] bg-[#1E2939] rounded-full px-2 py-1 text-[10px] font-normal text-[#99A1AF]"> {chat.partnerRole === "USER" ? "유저" : "트레이너" } </p>
                        </div>
                        <p className="text-[12px] font-normal text-[#99A1AF]"> {chat.lastMessage}</p>
                    </div>
                        <div className="flex gap-6 items-center justify-center">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <p className="text-[#6A7282] text-[11px] font-normal"> 
                                      {chat.lastMessageAt
                                        ? chat.lastMessageAt.split("T")[0]
                                        : "대화 시작 전"}
                                </p>
                                <p className="bg-[#BFFF0B] rounded-full px-2 py-1 text-[10px] text-black font-bold self-end"> {chat.unreadCount} </p>
                            </div>
                        </div>
                    </div>
            </div>
            </Link>
                <ChatRoomMenu chatRoomId={chat.chatRoomId} />
        </div>
    );
}
