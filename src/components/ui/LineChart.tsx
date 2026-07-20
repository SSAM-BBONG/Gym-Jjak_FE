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

export default function LineChart({ monthData, mode }: {
    monthData: MonthlyCount[]
    mode: string
}) {
    const data = {
        labels: monthData.map((data) => data.month),
        datasets: [
            {
                label: `${mode} 현황`,
                data: monthData.map((data) => data.count),
                borderColor: "#BFFF0B90",
                backgroundColor: "#BFFF0B70",
                tension: 0.4,
                pointRadius: 4
            },
        ],
    };

    const options = {
        responsive: true, // 반응형
        plugins: {
            legend: {
                display: true, // 범례 표시
                position: 'bottom' as const // 범례 위치, chartjs 사용할때는 타입을 정의시켜줘야함, 
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
        <div className='bg-[#101828] text-red-300'>
            <Line data={data} options={options} />
        </div>
    );
}