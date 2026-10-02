import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './chartSetup';
import { Respondent } from '../../types/survey';
import { CheckCircle2, Clock } from 'lucide-react';

interface ResponseStatusChartProps {
  respondents: Respondent[];
}

export const ResponseStatusChart: React.FC<ResponseStatusChartProps> = ({ respondents }) => {
  const lengkap = respondents.filter((r) => r.status === 'Lengkap').length;
  const belumLengkap = respondents.filter((r) => r.status === 'Belum lengkap').length;
  const total = respondents.length;

  const lengkapPct = total > 0 ? ((lengkap / total) * 100).toFixed(1) : '0';
  const belumPct = total > 0 ? ((belumLengkap / total) * 100).toFixed(1) : '0';

  const data = {
    labels: ['Lengkap', 'Belum lengkap'],
    datasets: [
      {
        data: [lengkap, belumLengkap],
        backgroundColor: ['#10B981', '#F59E0B'],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const val = context.raw || 0;
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
            return ` ${context.label}: ${val} (${pct}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Status Respons Tinjauan
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Kadar penyempurnaan borang tinjauan
          </p>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded tabular-nums">
          {lengkapPct}% Selesai
        </span>
      </div>

      <div className="relative h-48 my-2 flex items-center justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-900 tabular-nums">
            {lengkapPct}%
          </span>
          <span className="text-xs text-slate-400 font-medium">Kadar Lengkap</span>
        </div>
      </div>

      <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-100">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-medium text-emerald-950">Lengkap</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-emerald-900 tabular-nums">{lengkap}</span>
            <span className="text-[11px] text-emerald-700 ml-1.5 tabular-nums">({lengkapPct}%)</span>
          </div>
        </div>

        <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/60 border border-amber-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-medium text-amber-950">Belum lengkap</span>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-amber-900 tabular-nums">{belumLengkap}</span>
            <span className="text-[11px] text-amber-700 ml-1.5 tabular-nums">({belumPct}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
