import Header from "@/components/layout/Header";
import SideBarAdmin from "./SideBarAdmin";
import type { Metadata } from "next";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default async function Layout({ children }: { children: React.ReactNode }) {

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