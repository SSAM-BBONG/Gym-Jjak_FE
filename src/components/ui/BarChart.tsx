'use client'

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
    monthData: MonthlyCount[]
    mode: string
}) {
    const barChartData = {
        labels: monthData.map((data) => data.month),
        datasets: [
            {
                label: `${mode} 현황`,
                data: monthData.map((data) => data.count),
                borderColor: "#BFFF0B90",
                backgroundColor: "#BFFF0B70",
                borderWidth: 1,
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
        <div className="w-full ">
            <Bar data={barChartData} options={chartOptions} />
        </div>
    );
}