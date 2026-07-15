'use client'

import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, // x축
  LinearScale,   // y축
  PointElement,  // 각 데이터 포인트의 점 그리는 역할
  LineElement,   // 각 데이터 포인트들을 선으로 연결하는 역할    
  Title,         // 차트의 제목 표시
  Tooltip,       // 정보 표현 툴팁 표시
  Legend         // 데이터 셋의 이름(범례) 표시
)

export default function GymDashboard() {
  const data = {
        labels: ['1월', '2월', '3월', '4월', '5월', '6월'], // x축 레이블
        datasets: [{
          label: '2026년 PT 이용자 수', // 데이터셋 이름
          data: [1200, 900, 756, 302, 2500, 1590], // 실제 데이터
          borderColor: 'rgba(191, 255, 11, 1)', // 선 색상
          backgroundColor: 'rgba(54, 65, 83, 1)', // 영역 배경색
          tension: 0.4, // 선의 곡률 (0: 직선, 1: 부드러운 곡선)
          // fill: true
          pointRadius:4
        }]
      }

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
                grid: {
                display: false,
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
            <Line data={data} options={options}/>
        </div>
    );
}