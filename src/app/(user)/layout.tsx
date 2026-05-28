import Header from "@/components/layout/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
        <section className="pt-17.5 bg-[#0B0F19] px-30 min-h-screen">
            {children}
        </section>
        </>
    );
}