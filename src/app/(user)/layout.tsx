import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <header className="flex">
            <Header />
        </header>
        <section className="mt-17.5 bg-[#0B0F19] px-30 min-h-[700px]">
            {children}
        </section>
        </>
    );
}