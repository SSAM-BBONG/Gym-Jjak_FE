import BarChart from "@/components/ui/BarChart";
import { PtZonePtManage } from "@/components/ui/image";
import PieChart from "@/components/ui/PieChart";
import AdminDashboardCard from "@/feature/admin/components/AdminDashboardCard";
import { getUserDashboard } from "@/service/admin.service";

export default async function Page() {
    // const response = await getUserDashboard();
    // const dashboard: UserSituation = response.data;
    // const monthlyUsers: MonthlyCount[] = response.data.monthlyUserSignups;

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">매출 현황</h1>
            <section className="flex gap-3 w-full">
                <AdminDashboardCard imgsrc={PtZonePtManage} title='이번 달 총 매출' content='150' />
                <AdminDashboardCard imgsrc={PtZonePtManage} title='이번 달 pt 매출' content='10' />
                <AdminDashboardCard imgsrc={PtZonePtManage} title='이번 달 AI 매출' content='150' />
            </section>
            <section className="flex">
                {/* <BarChart monthData={monthlyUsers} mode='매출'/>*/}
            </section>
        </section>
    );
}