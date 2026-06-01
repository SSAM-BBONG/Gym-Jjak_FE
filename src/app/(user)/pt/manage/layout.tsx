import { decodeJWT } from "@/lib/decode";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await decodeJWT();
    if (user?.role === 'USER' || !user?.role) {
        redirect('/nopermission');
    }
    return (
        <section>
            {children}
        </section>
    );
}