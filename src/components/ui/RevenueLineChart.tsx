'use client'

import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export default function ReveanueLineChart({ monthData, mode }: {
    monthData: MonthlyRevenueCount[]
    mode: string
}) {
    const barChartData = {
        labels: monthData.map((data) => data.month),
        datasets: [
            {
                label: `pt ${mode} 현황`,
                data: monthData.map((data) => data.ptCommissionRevenue),
                borderColor: "#BFFF0B90",
                backgroundColor: "#BFFF0B70",
                tension: 0.4,
                pointRadius: 4
            },
            {
                label: `구독 ${mode} 현황`,
                data: monthData.map((data) => data.subscriptionRevenue),
                borderColor: "#BFFF0B90",
                backgroundColor: "#22D3EE70",
                tension: 0.4,
                pointRadius: 4
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom' as const
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.08)',
                },
                ticks: {
                    color: '#99A1AF',
                },
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.08)',
                },
                ticks: {
                    color: '#99A1AF',
                },
            },
        },
        maintainAspectRatio: false
    }

    return (
        <div className="w-full ">
            <Line data={barChartData} options={options} />
        </div>
    );
}