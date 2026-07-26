import { ChartLoadingUI } from "@/components/ui/ChartLoadingUi";
import { GymCurrentPt, GymMonthUser, GymTrainerNumber } from "@/components/ui/image";
import AdminDashboardCard from "@/feature/admin/components/AdminDashboardCard";
import { GymDashboardCard } from "@/feature/organization/components/GymDashboard";
import { getContentDashboard, getReservationDashboard } from "@/service/admin.service";
import dynamic from "next/dynamic";

const LineChart = dynamic(() => import("@/components/ui/LineChart"), {
    loading: () => <ChartLoadingUI />,
})

export default async function Page() {
    const responseReservation = await getReservationDashboard();
    const responseContent = await getContentDashboard();
    const dashboard: ContentSituation = responseContent.data;
    const monthlyReservation: MonthlyCount[] = responseReservation.data.monthlyReservations;

    const cards: GymDashboardCard[] = [
        {
            icon: GymTrainerNumber,
            highlighted: true,
            title: "활성된 pt 수",
            value: `${dashboard.activePtCourseCount ?? 0}개`,
            description: "현재 진행 중인 활성된 pt 수",
        },
        {
            icon: GymTrainerNumber,
            title: "비활성된 pt 수",
            value: `${dashboard.blindedPtCourseCount ?? 0}개`,
            description: "현재 진행 중인 비활성된 pt 수",
        },
        {
            icon: GymCurrentPt,
            title: "대기 신고 수",
            value: `${dashboard.pendingReportGroupCount ?? 0}개`,
            description: "현재 대기되어 있는 신고 수",
        }
    ];

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">콘텐츠 현황</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                {cards.map((card, index) => (
                    <AdminDashboardCard card={card} key={index} />
                ))}
            </div>
            <section className="grid grid-cols-1 h-90 border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymMonthUser} />
                    <p className="text-[14px] text-white font-black">월 별 pt 예약 추이</p>
                </div>
                <LineChart monthData={monthlyReservation} mode='pt 예약' />
            </section>

        </section>
    );
}