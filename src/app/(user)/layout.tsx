import Header from "@/components/layout/Header";
import UserFooter from "@/components/layout/UserFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <header className="flex">
            <Header />
        </header>
        <section className="bg-[#0B0F19] px-30 min-h-[700px]">
            {children}
        </section>
        <footer className="w-full">
            <UserFooter />
        </footer>
        </>
    );
}