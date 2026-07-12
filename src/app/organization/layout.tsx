import Header from "@/components/layout/Header";
import type { Metadata } from "next";
import SideBarOrganization from "./SideBarOrganization";

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
            <SideBarOrganization />
            <section className="flex-1 pt-17.5 lg:ml-80">
                {children}
            </section>
        </section >
    );
}