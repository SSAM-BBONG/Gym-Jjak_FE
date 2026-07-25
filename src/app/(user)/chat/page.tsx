import ChatList from "@/feature/chat/components/ChatList";
import { getChatRoomList } from "@/service/chat.service";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function ChatListPage() {

    const response = await getChatRoomList();

    return (
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5 px-4 pt-5 pb-12 sm:px-10 sm:pt-6 sm:pb-12 md:gap-6 md:px-16 md:pt-7 lg:px-20 lg:pt-8">
            <div className="flex items-center justify-between rounded-[20px] border border-[#364153] bg-gradient-to-r from-[#19210F] via-[#101828] to-[#101828] px-4 py-4 sm:px-6 sm:py-5">
                <div className="flex flex-col gap-1 sm:gap-2">
                    <p className="text-[24px] font-black text-white md:text-[32px] lg:text-[40px]"> 채팅방 </p>
                    <p className="text-[13px] font-normal text-[#99A1AF] md:text-[14px] lg:text-[16px]"> 총 {response.data.totalCount}개의 대화 </p>
                </div>
                <button className="rounded-full border border-[#BFFF0B4D] bg-[#BFFF0B1A] px-2 py-1.5 text-[10px] font-bold text-[#BFFF0B] sm:px-3 sm:py-2 sm:text-[12px] lg:text-[14px]"> 읽지 않은 메시지 : {response.data.totalUnreadCount}</button>
            </div>

            <ChatList chatRooms={response.data.chatRooms} />

        </div>
    );
}
