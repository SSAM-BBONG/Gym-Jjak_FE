import BarChart from "@/components/ui/BarChart";
import { GymCumulativePt, GymCurrentPt, GymMonthUser, GymTrainerNumber, PtZonePtManage } from "@/components/ui/image";
import PieChart from "@/components/ui/PieChart";
import AdminDashboardCard from "@/feature/admin/components/AdminDashboardCard";
import { getUserDashboard } from "@/service/admin.service";
import { GymDashboardCard } from "@/feature/organization/components/GymDashboard";
import LineChart from "@/components/ui/LineChart";



export default async function Page() {
    const response = await getUserDashboard();
    const dashboard: UserSituation = response.data;
    const monthlyUsers: MonthlyCount[] = response.data.monthlyUserSignups;

    const cards: GymDashboardCard[] = [
        {
            icon: GymCumulativePt,
            highlighted: true,
            title: "총 이용자수",
            value: `${dashboard.totalUserCount ?? 0}명`,
            description: "서비스 시작 이후 총 이용자",
        },
        {
            icon: GymCurrentPt,
            title: "총 조직수",
            value: `${dashboard.totalOrganizationCount ?? 0}명`,
            description: "현재 진행 중인 PT 수강생",
        },
        {
            icon: GymTrainerNumber,
            title: "총 트레이너수",
            value: `${dashboard.totalTrainerCount ?? 0}명`,
            description: "현재 활성 트레이너",
        }
    ];

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">회원 현황</h1>
            <section className="flex gap-3 w-full">
            </section>
            <div className="grid grid-cols-3 gap-4 mb-5">
                {cards.map((card, index) => (
                    <AdminDashboardCard card={card} key={index} />
                ))}
            </div>
            <section className="grid grid-cols-1 h-90 border border-[#1E2939] rounded-[16px] bg-[#101828] p-5 mb-5">
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymMonthUser} />
                    <p className="text-[14px] text-white font-black">월 별 회원 추이</p>
                </div>
                <LineChart monthData={monthlyUsers} mode='회원' />
            </section>
            <section className="grid grid-cols-1 h-90 border border-[#1E2939] rounded-[16px] bg-[#101828] p-5">
                <div className="flex items-center gap-2 pb-4">
                    <img src={GymMonthUser} />
                    <p className="text-[14px] text-white font-black">사용자 추이</p>
                </div>
                <PieChart userSituation={dashboard} />
            </section>
        </section>
    );
}