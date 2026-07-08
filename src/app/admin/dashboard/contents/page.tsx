import BarChart from "@/components/ui/BarChart";
import { PtZonePtManage } from "@/components/ui/image";
import PieChart from "@/components/ui/PieChart";
import AdminDashboardCard from "@/feature/admin/components/AdminDashboardCard";
import { getContentDashboard, getReservationDashboard, getUserDashboard } from "@/service/admin.service";

export default async function Page() {
    // const responseReservation = await getReservationDashboard();
    // const responseContent = await getContentDashboard();
    // const dashboard: UserSituation = response.data;
    // const monthlyReservation: MonthlyCount[] = response.data.monthlyReservations;

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">콘텐츠 현황</h1>
            <section className="flex gap-3 w-full">
                <AdminDashboardCard imgsrc={PtZonePtManage} title='활성된 pt 수' content='150' />
                <AdminDashboardCard imgsrc={PtZonePtManage} title='비활성된 pt 수' content='10' />
                <AdminDashboardCard imgsrc={PtZonePtManage} title='대기 신고 수' content='150' />
            </section>
            <section className="flex">
                {/* <BarChart monthData={monthlyReservation} mode='pt 예약' />*/}
            </section>

        </section>
    );
}