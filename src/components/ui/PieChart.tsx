'use client'

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    ArcElement,
} from "chart.js";
import { format } from "date-fns/format";
import { Pie } from "react-chartjs-2";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    ArcElement,

);

export default function PieChart({ userSituation }: { userSituation: UserSituation }) {

    // Pie 차트 데이터
    const pieChartData = {
        labels: ["회원", "트레이너", "시설"],
        datasets: [
            {
                data: [
                    userSituation.totalUserCount,
                    userSituation.totalTrainerCount,
                    userSituation.totalOrganizationCount,
                ],
                backgroundColor: [
                    "#BFFF0B70",
                    "#22D3EE70",
                    "#A78BFA70",
                ],
                borderColor: [
                    "#BFFF0B90",
                    "#22D3EE90",
                    "#A78BFA90",
                ],
                borderWidth: 1,
            },
        ],
    };

    // 차트 옵션
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `${format(new Date(), "yyyy년")} 매출 및 순이익 현황`,
            },
        },
    };

    return (
        <div className="w-full">
            <Pie data={pieChartData} options={chartOptions} />
        </div>
    );
}