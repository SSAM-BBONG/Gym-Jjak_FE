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
            className="flex items-center gap-2 rounded-[12px] border border-[#1E2939] bg-[#101828] px-3 py-3 transition-colors hover:border-[#BFFF0B4D] hover:bg-gradient-to-r hover:from-[#19210F] hover:via-[#101828] hover:to-[#101828] sm:gap-3 sm:px-4 sm:py-4 sm:rounded-[16px] lg:gap-4 lg:py-5">
            <Link className="flex-1 min-w-0" href={`/chat/${chat.chatRoomId}`}>
            <div className="flex gap-2 flex-1 min-w-0 justify-between sm:gap-3">
                <div className="border border-[#364153] rounded-full w-10 h-10 flex shrink-0 justify-center items-center overflow-hidden sm:w-[45px] sm:h-[45px] lg:w-[55px] lg:h-[55px]">
                    <img src={chat.partnerProfileImageUrl || HeaderProfile} className="h-full w-full object-cover"/>
                </div>
                <div className="flex flex-1 min-w-0 justify-between items-center">
                    <div className="flex flex-col gap-1.5 min-w-0 justify-center sm:gap-2">
                        <div className="flex gap-2 items-center sm:gap-3">
                            <p className="text-[12px] font-bold text-white sm:text-[13px] lg:text-[14px]"> {chat.partnerName} </p>
                            <p className="border border-[#364153] bg-[#1E2939] rounded-full px-1.5 py-0.5 text-[10px] font-normal text-[#99A1AF] sm:px-2 sm:py-1"> {chat.partnerRole === "USER" ? "유저" : "트레이너" } </p>
                        </div>
                        <p className="text-[10px] font-normal text-[#99A1AF] sm:text-[12px]"> {chat.lastMessage}</p>
                    </div>
                        <div className="flex gap-2 items-center justify-center sm:gap-4 lg:gap-6">
                            <div className="flex flex-col gap-1.5 justify-center items-center sm:gap-2">
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
