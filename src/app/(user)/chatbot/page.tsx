import CalendarQueryProvider from "../calendar/CalendarQueryProvider";
import ChatbotList from "./ChatbotList";
import ChatCt from "./ChatCt";

export default async function Page({ params }: { params: Promise<{ sessionId?: string }> }) {
    const { sessionId } = await params;

    return (
        <CalendarQueryProvider>
            <main className="flex">
                <ChatbotList sessionId={sessionId} />
                <ChatCt sessionId={sessionId} />
            </main>
        </CalendarQueryProvider>
    );
}
