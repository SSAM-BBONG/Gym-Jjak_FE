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
        <div className="flex flex-col gap-6 px-60 pt-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="text-[40px] font-black text-white"> 채팅 </p>
                    <p className="text-[16px] font-normal text-[#99A1AF]"> 총 {response.data.totalCount}개의 대화 </p>
                </div>
                <button className="bg-[#BFFF0B33] border border-[#BFFF0B4D] px-3 py-2 rounded-full text-[#BFFF0B] text-[14px] fond-bold"> 읽지 않은 메시지 : {response.data.totalUnreadCount}</button>
            </div>

            <ChatList chatRooms={response.data.chatRooms} />

        </div>
    );
}
