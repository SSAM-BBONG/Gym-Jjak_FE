import ChatItem from "@/feature/chat/components/ChatListItem";
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

            <input
                type="text"
                className="px-6 py-3 bg-[#101828] border border-[#1E2939] rounded-[14px] text-[#6A7282]"
                placeholder="이름 또는 메시지로 검색"
            />

            <div className="flex gap-2">
                <button className="bg-[#BFFF0B] text-black font-bold px-4 py-2 rounded-full"> 전체 </button>
                <button className="bg-[#101828] text-[#99A1AF] font-bold px-4 py-2 rounded-full border border-[#1E2939]"> 트레이너 </button>
                <button className="bg-[#101828] text-[#99A1AF] font-bold px-4 py-2 rounded-full border border-[#1E2939]"> 수강생 </button>
            </div>

            <div className="flex flex-col gap-3 mt-5">
                <p className="text-[12px] text-[#6A7282] font-bold"> 모든 대화</p>

            {response.data.chatRooms.map((chat) => (
                <ChatItem 
                key={chat.chatRoomId}
                chat={chat}/>
            ))}
            </div>

        </div>
    );
}