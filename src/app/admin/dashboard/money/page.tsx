import ReveanueBarChart from "@/components/ui/RevenueBarChart";
import { getRevenuesDashboard } from "@/service/admin.service";

export default async function Page() {
    const response = await getRevenuesDashboard();
    const monthlyRevenues: MonthlyRevenueCount[] = response.data.monthlyRevenues;

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">매출 현황</h1>
            <section className="grid grid-cols-1">
                <ReveanueBarChart monthData={monthlyRevenues} mode='매출' />
            </section>
        </section>
    );
}