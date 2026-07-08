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
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(54, 162, 235, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 99, 132, 1)",
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
        <Pie data={pieChartData} options={chartOptions} />
    );
}