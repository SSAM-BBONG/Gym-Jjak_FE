import ChatbotFloatingButton from "@/components/ui/ChatbotFloatingButton";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <section>
            {children}
            <ChatbotFloatingButton />
        </section>
    );
}