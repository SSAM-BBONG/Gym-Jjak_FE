import AdminNavLink from "@/feature/admin/components/AdminNavLink";
import ApprovalsAdminDropDown from "./ApprovalsAdminDropDown";
import LogsAdminDropDown from "./LogsAdminDropDown";
import MembersAdminDropDown from "./MembersAdminDropDown";
import ReportsAdminDropDown from "./RepostsAdminDropDown";
import SystemLogsAdminDropDown from "./SystemLogsAdminDropDown";
import SystemsAdminDropDown from "./SystemsAdminDropDown";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <section className="flex">
            <aside className="w-sm p-6 h-screen bg-linear-to-t from-[#000000] to-[#101828]">
                <div className="flex items-center gap-2 mb-6">
                    <div className="bg-[#BFFF0B] w-2 h-2 rounded-full"></div>
                    <h1 className="text-white text-xl font-extrabold">관리자 메뉴</h1>
                </div>
                <AdminNavLink href="/admin" mode="main">대시보드</AdminNavLink>
                <MembersAdminDropDown />
                <ApprovalsAdminDropDown />
                <ReportsAdminDropDown />
                <LogsAdminDropDown />
                <SystemLogsAdminDropDown />
                <SystemsAdminDropDown />
            </aside>
            <section className="flex-1">
                {children}
            </section>
        </section>
    );
}