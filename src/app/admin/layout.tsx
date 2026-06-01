import Header from "@/components/layout/Header";
import SideBarAdmin from "./SideBarAdmin";
import { redirect } from "next/navigation";
import { decodeJWT } from "@/lib/decode";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await decodeJWT();
    if (user?.role !== 'ADMIN') {
        redirect('/nopermission');
    }
    return (
        <section className="flex">
            <Header />
            <SideBarAdmin />
            <section className="flex-1 pt-17.5">
                {children}
            </section>
        </section >
    );
}