import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
} from "chart.js";
import { format } from "date-fns/format";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
);

export default function BarChart({ monthData, mode }: {
    monthData: MonthlyCount[],
    mode: string
}) {

    const barChartData = {
        labels: monthData.map((data) => data.month),
        datasets: [
            {
                label: `${mode} 현황`,
                data: monthData.map((data) => data.count),
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: `${format(new Date(), "yyyy년")} ${mode} 현황`,
            },
        },
    };

    return (
        <Bar data={barChartData} options={chartOptions} />
    );
}