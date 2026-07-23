import { GymCumulativePt, GymCurrentPt, GymMonthUser, GymThisMonthSales, GymTrainerNumber } from "@/components/ui/image";
import {
    getOrganizationStatsAction,
    getOrganizationTrainerStatsAction,
} from "@/feature/organization/actions";
import GymDashboard, { GymDashboardCard } from "@/feature/organization/components/GymDashboard";
import GymDashboardTrainerState from "@/feature/organization/components/GymDashboardTrainerState";

export default async function GymDashBoardPage() {
    const [statsResult, trainerStatsResult] = await Promise.all([
        getOrganizationStatsAction(),
        getOrganizationTrainerStatsAction(),
    ]);

    const cards: GymDashboardCard[] = [
        {
            icon: GymCumulativePt,
            highlighted: true,
            title: "누적 PT 이용자 수",
            value: `${statsResult.data?.totalUserCount ?? 0}명`,
            description: "서비스 시작 이후 총 이용자",
        },
        {
            icon: GymCurrentPt,
            title: "현재 PT 이용자 수",
            value: `${statsResult.data?.currentUserCount ?? 0}명`,
            description: "현재 진행 중인 PT 수강생",
        },
        {
            icon: GymTrainerNumber,
            title: "트레이너 수",
            value: `${statsResult.data?.trainerCount ?? 0}명`,
            description: "현재 활성 트레이너",
        },
        {
            icon: GymThisMonthSales,
            title: "이번 달 매출",
            value: `${statsResult.data?.thisMonthRevenue.toLocaleString() ?? 0}원`,
            description: "7월 기준",
        },
    ];

    return (
        <div className="flex flex-col gap-6 p-6">
            <h1 className="font-extrabold text-4xl text-white"> 헬스장 통계 </h1>
            <GymDashboard
                cards={cards}
                chartIcon={GymMonthUser}
                chartTitle="월별 이용자 추이"
                chartLabel="월별 이용자"
                chartData={{
                    monthly: (statsResult.data?.trend.monthly ?? []).map((item) => ({ date: item.date, value: item.count })),
                    threeMonthly: (statsResult.data?.trend.threeMonthly ?? []).map((item) => ({ date: item.date, value: item.count })),
                    sixMonthly: (statsResult.data?.trend.sixMonthly ?? []).map((item) => ({ date: item.date, value: item.count })),
                }}
            />
            <GymDashboardTrainerState
                data={trainerStatsResult.data}
                errorMessage={trainerStatsResult.message}
            />
        </div>
    );
}
