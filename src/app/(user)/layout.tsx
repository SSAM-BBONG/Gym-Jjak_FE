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
        <footer className="w-full">
            <UserFooter />
        </footer>
        </>
    );
}