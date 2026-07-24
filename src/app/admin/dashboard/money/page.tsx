import { GymMonthUser } from "@/components/ui/image";
import ReveanueLineChart from "@/components/ui/RevenueLineChart";
import { getRevenuesDashboard } from "@/service/admin.service";

export default async function Page() {
    const response = await getRevenuesDashboard();
    const monthlyRevenues: MonthlyRevenueCount[] = response.data.monthlyRevenues;

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">매출 현황</h1>
            <section className="grid grid-cols-1 h-90 border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymMonthUser} />
                    <p className="text-[14px] text-white font-black">월별 매출</p>
                </div>
                <ReveanueLineChart monthData={monthlyRevenues} mode='매출' />
            </section>
        </section>
    );
}