import { decodeJWT } from "@/lib/decode";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await decodeJWT();
    if (!user?.role) {
        redirect('/auth/login');
    }
    return (
        <section>
            {children}
        </section>
    );
}