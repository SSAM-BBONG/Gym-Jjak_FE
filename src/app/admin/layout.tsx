export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex">
            <aside></aside>
            <section>
                {children}
            </section>
        </section>
    );
}