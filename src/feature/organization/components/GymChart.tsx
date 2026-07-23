'use client'

import { useState } from 'react';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2';

export type GymChartItem = {
  date: string;
  value: number;
};

export type GymChartPeriod = 'monthly' | 'threeMonthly' | 'sixMonthly';

export type GymChartData = Record<GymChartPeriod, GymChartItem[]>;

type GymChartProps = {
  data: GymChartData;
  label: string;
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const PERIOD_OPTIONS: { value: GymChartPeriod; label: string }[] = [
  { value: 'monthly', label: '1개월' },
  { value: 'threeMonthly', label: '3개월' },
  { value: 'sixMonthly', label: '6개월' },
];

export default function GymChart({ data: chartData, label }: GymChartProps) {
  const [period, setPeriod] = useState<GymChartPeriod>('monthly');
  const chartItems = period === 'monthly' ? chartData.monthly.slice(-12) : chartData[period];

  const data = {
    labels: chartItems.map(({ date }) => date),
    datasets: [{
      label,
      data: chartItems.map(({ value }) => value),
      borderColor: 'rgba(191, 255, 11, 1)',
      backgroundColor: 'rgba(54, 65, 83, 1)',
      tension: 0.4,
      pointRadius: 4,
    }],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: { color: '#99A1AF' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255, 255, 255, 0.08)' },
        ticks: { color: '#99A1AF' },
      },
    },
    maintainAspectRatio: false,
  }

  return (
    <div className='bg-[#101828]'>
      <div className="mb-4 flex gap-2">
        {PERIOD_OPTIONS.map((option) => (
          <button
            type="button"
            key={option.value}
            onClick={() => setPeriod(option.value)}
            className={
              period === option.value
                ? 'rounded-md bg-[#BFFF0B] px-3 py-1.5 text-sm font-bold text-[#101828]'
                : 'rounded-md border border-[#1E2939] px-3 py-1.5 text-sm text-[#99A1AF]'
            }
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="h-64">
        <Line data={data} options={options}/>
      </div>
    </div>
  );
}
