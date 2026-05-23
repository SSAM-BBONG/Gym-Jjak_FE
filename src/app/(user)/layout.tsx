import Header from "@/components/layout/Header";
import UserFooter from "@/components/layout/UserFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <header className="flex">
            <Header />
        </header>
        <section>
            {children}
        </section>
        <footer className="fixed bottom-0 w-full">
            <UserFooter />
        </footer>
        </>
    );
}