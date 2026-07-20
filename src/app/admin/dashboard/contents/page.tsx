import BarChart from "@/components/ui/BarChart";
import { GymCurrentPt, GymMonthUser, GymTrainerNumber, PtZonePtManage } from "@/components/ui/image";
import LineChart from "@/components/ui/LineChart";
import PieChart from "@/components/ui/PieChart";
import AdminDashboardCard from "@/feature/admin/components/AdminDashboardCard";
import { GymDashboardCard } from "@/feature/organization/components/GymDashboard";
import { getContentDashboard, getReservationDashboard, getUserDashboard } from "@/service/admin.service";

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
            value: `${dashboard.activePtCourseCount ?? 0}명`,
            description: "서비스 시작 이후 총 이용자",
        },
        {
            icon: GymCurrentPt,
            title: "비활성된 pt 수",
            value: `${dashboard.blindedPtCourseCount ?? 0}명`,
            description: "현재 진행 중인 PT 수강생",
        },
        {
            icon: GymCurrentPt,
            title: "대기 신고 수",
            value: `${dashboard.pendingReportGroupCount ?? 0}명`,
            description: "현재 활성 트레이너",
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