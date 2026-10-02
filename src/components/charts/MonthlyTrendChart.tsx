import React from 'react';
import { Line } from 'react-chartjs-2';
import './chartSetup';
import { Respondent, Month } from '../../types/survey';

interface MonthlyTrendChartProps {
  respondents: Respondent[];
}

export const MonthlyTrendChart: React.FC<MonthlyTrendChartProps> = ({ respondents }) => {
  const months: Month[] = ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'];

  const monthlyCounts = months.map((m) => {
    return respondents.filter((r) => r.month === m).length;
  });

  const total = respondents.length;
  const maxMonthVal = Math.max(...monthlyCounts, 1);
  const highestMonthIndex = monthlyCounts.indexOf(maxMonthVal);
  const highestMonthName = months[highestMonthIndex];

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Respons Bulanan',
        data: monthlyCounts,
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.08)',
        fill: true,
        tension: 0.35,
        pointBackgroundColor: '#4F46E5',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return ` ${context.label}: ${context.raw} respons`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
          color: '#64748B',
        },
      },
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(12, maxMonthVal + 2),
        grid: {
          color: 'rgba(226, 232, 240, 0.6)',
        },
        ticks: {
          stepSize: 2,
          font: {
            size: 11,
          },
          color: '#64748B',
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Jumlah Respons Mengikut Bulan
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Trend pengumpulan respons tinjauan sepanjang tahun
          </p>
        </div>
        <div className="text-right">
          <span className="text-[11px] text-slate-400 block">Puncak Tertinggi</span>
          <span className="text-xs font-semibold text-indigo-600 tabular-nums">
            {highestMonthName} ({maxMonthVal})
          </span>
        </div>
      </div>

      <div className="h-60 my-2">
        <Line data={data} options={options} />
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
        <span>Jumlah Keseluruhan: <strong className="text-slate-800 tabular-nums">{total}</strong> respons</span>
        <span className="text-[11px] text-slate-400">Purata: {(total / 12).toFixed(1)} / bulan</span>
      </div>
    </div>
  );
};
