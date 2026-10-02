import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chartSetup';
import { Respondent } from '../../types/survey';

interface AgeDistributionChartProps {
  respondents: Respondent[];
}

export const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ respondents }) => {
  const brackets = [
    { label: '18–20', min: 18, max: 20 },
    { label: '21–23', min: 21, max: 23 },
    { label: '24–26', min: 24, max: 26 },
    { label: '27–29', min: 27, max: 29 },
    { label: '30+', min: 30, max: 120 },
  ];

  const counts = brackets.map((b) => {
    return respondents.filter((r) => r.age >= b.min && r.age <= b.max).length;
  });

  const total = respondents.length;

  const data = {
    labels: brackets.map((b) => b.label),
    datasets: [
      {
        label: 'Bilangan Responden',
        data: counts,
        backgroundColor: [
          '#60A5FA', // Blue 400
          '#3B82F6', // Blue 500
          '#2563EB', // Blue 600
          '#1D4ED8', // Blue 700
          '#1E40AF', // Blue 800
        ],
        borderRadius: 6,
        borderSkipped: false,
        maxBarThickness: 38,
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
            const val = context.raw || 0;
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
            return ` Responden: ${val} (${pct}%)`;
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
        grid: {
          color: 'rgba(226, 232, 240, 0.6)',
        },
        ticks: {
          stepSize: 5,
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
            Taburan Responden Mengikut Umur
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Segmentasi umur responden kaji selidik
          </p>
        </div>
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          5 Kumpulan Umur
        </span>
      </div>

      <div className="h-60 my-2">
        <Bar data={data} options={options} />
      </div>

      <div className="grid grid-cols-5 gap-1.5 mt-4 pt-4 border-t border-slate-100 text-center">
        {brackets.map((b, idx) => (
          <div key={b.label} className="p-1.5 rounded-lg bg-slate-50">
            <span className="text-[11px] text-slate-500 block truncate">{b.label}</span>
            <span className="text-xs font-bold text-slate-900 tabular-nums">
              {counts[idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
