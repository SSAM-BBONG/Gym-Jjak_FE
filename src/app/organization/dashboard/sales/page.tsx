import { GymCumulativeSales, GymThisMonthSale, GymMonthSales } from "@/components/ui/image";
import { getOrganizationSalesAction } from "@/feature/organization/actions";
import GymDashboard, { GymDashboardCard } from "@/feature/organization/components/GymDashboard";
import GymDashboardTrainerSales from "@/feature/organization/components/GymDashboardTrainerSales";

export default async function GymSalesDashboardPage() {
    const result = await getOrganizationSalesAction();

    const cards: GymDashboardCard[] = [
        {
            icon: GymCumulativeSales,
            iconWrapped: true,
            highlighted: true,
            title: "누적 매출",
            value: `${result.data?.totalRevenue.toLocaleString() ?? 0}원`,
            description: "서비스 시작 이후 총 매출",
        },
        {
            icon: GymThisMonthSale,
            iconWrapped: true,
            title: "이번 달 매출 (7월)",
            value: `${result.data?.thisMonthRevenue.toLocaleString() ?? 0}원`,
            description: `전월 대비 ${result.data?.monthOverMonthRate ?? 0 >= 0 ? "+" : ""}${result.data?.monthOverMonthRate ?? 0}%`,
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <GymDashboard cards={cards} chartIcon={GymMonthSales} chartTitle="월별 이용자 추이"/>
            <GymDashboardTrainerSales data={result.data} errorMessage={result.message}/>
        </div>
    );
}
