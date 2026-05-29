import Header from "@/components/layout/Header";
import SideBarAdmin from "./SideBarAdmin";


export default function Layout({ children }: { children: React.ReactNode }) {
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