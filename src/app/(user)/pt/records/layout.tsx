import CheckRole from "@/components/layout/CheckRole";

export default async function Layout({ children }: { children: React.ReactNode }) {

    return (
        <section>
            <CheckRole mode="login" />
            {children}
        </section>
    );
}