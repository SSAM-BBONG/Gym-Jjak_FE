import CalendarQueryProvider from "../calendar/CalendarQueryProvider";
import ChatbotList from "./ChatbotList";
import ChatCt from "./ChatCt";

interface paramsProps {
    searchParams: Promise<{
        sessionId: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { sessionId } = await searchParams;

    return (
        <CalendarQueryProvider>
            <main className="flex">
                <ChatbotList sessionId={sessionId} />
                <ChatCt sessionId={sessionId} />
            </main>
        </CalendarQueryProvider>
    );
}
