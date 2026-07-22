import ChatRoom from "@/feature/chat/components/ChatRoom";
import { getChatMessageListAction } from "@/feature/chat/actions";
import { decodeJWT } from "@/lib/decode";
import { getChatRoomList } from "@/service/chat.service";
import { notFound } from "next/navigation";

interface ChatDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ChatDetailPage({ params }: ChatDetailPageProps) {
    const { id } = await params;
    const chatRoomId = Number(id);

    const response = await getChatRoomList();
    const messageResponse = await getChatMessageListAction(chatRoomId);
    const user = await decodeJWT();

    const chatRoom = response.data.chatRooms.find(
        (room) => room.chatRoomId === chatRoomId
    );


    const parsedUserId = Number(user?.sub);
    const currentUserId = Number(parsedUserId)
        ? parsedUserId
        : undefined;

    return (
        <ChatRoom
            chatRoomId={chatRoomId}
            partnerName={chatRoom?.partnerName}
            partnerProfileImageUrl={chatRoom?.partnerProfileImageUrl}
            messages={messageResponse.data.messages}
            currentUserId={currentUserId}
        />
    );
}
