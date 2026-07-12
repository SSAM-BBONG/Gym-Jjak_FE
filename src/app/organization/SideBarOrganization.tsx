import AccountOrgDropDown from "@/feature/organization/components/AccountOrgDropDown";
import DashboardOrgDropDown from "@/feature/organization/components/DashboardOrgDropDown";
import GymOrgDropDown from "@/feature/organization/components/GymOrgDropDown";

export default function SideBarOrganization() {
    return (
        <aside
            className="w-xs p-6 pt-23.5 h-screen bg-linear-to-t from-[#000000] to-[#101828]
                            overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                            fixed hidden lg:block">
            <div className="flex items-center gap-2 mb-6">
                <div className="bg-[#BFFF0B] w-2 h-2 rounded-full"></div>
                <h1 className="text-white text-xl font-extrabold">헬스장 메뉴</h1>
            </div>
            <DashboardOrgDropDown />
            <GymOrgDropDown />
            <AccountOrgDropDown />
        </aside>
    );
}