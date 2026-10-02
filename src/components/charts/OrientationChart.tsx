import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './chartSetup';
import { Respondent } from '../../types/survey';
import { Info } from 'lucide-react';

interface OrientationChartProps {
  respondents: Respondent[];
}

export const OrientationChart: React.FC<OrientationChartProps> = ({ respondents }) => {
  // Aggregate orientation data
  const counts = {
    Heteroseksual: respondents.filter((r) => r.orientation === 'Heteroseksual').length,
    Homoseksual: respondents.filter((r) => r.orientation === 'Homoseksual').length,
    Biseksual: respondents.filter((r) => r.orientation === 'Biseksual').length,
    'Lain-lain / Tidak pasti': respondents.filter(
      (r) => r.orientation === 'Lain-lain / Tidak pasti' || r.orientation === 'Tidak mahu menjawab'
    ).length,
  };

  const total = respondents.length;

  const data = {
    labels: ['Heteroseksual', 'Homoseksual', 'Biseksual', 'Lain-lain / Tidak pasti'],
    datasets: [
      {
        data: [
          counts.Heteroseksual,
          counts.Homoseksual,
          counts.Biseksual,
          counts['Lain-lain / Tidak pasti'],
        ],
        backgroundColor: [
          '#4F46E5', // Indigo
          '#0D9488', // Teal
          '#8B5CF6', // Violet
          '#F59E0B', // Amber
        ],
        borderWidth: 2,
        borderColor: '#FFFFFF',
        hoverOffset: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const val = context.raw || 0;
            const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
            return ` ${context.label}: ${val} orang (${pct}%)`;
          },
        },
      },
    },
  };

  const items = [
    { label: 'Heteroseksual', count: counts.Heteroseksual, color: '#4F46E5', bg: 'bg-indigo-600' },
    { label: 'Homoseksual', count: counts.Homoseksual, color: '#0D9488', bg: 'bg-teal-600' },
    { label: 'Biseksual', count: counts.Biseksual, color: '#8B5CF6', bg: 'bg-purple-600' },
    { label: 'Lain-lain / Tidak pasti', count: counts['Lain-lain / Tidak pasti'], color: '#F59E0B', bg: 'bg-amber-500' },
  ];

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 tracking-tight">
            Pecahan Jawapan Orientasi Seksual
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Taburan kategori daripada tinjauan kendiri anonim
          </p>
        </div>
        <span className="text-xs font-medium text-slate-500 tabular-nums">
          N = {total}
        </span>
      </div>

      <div className="relative h-60 my-2 flex items-center justify-center">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-2xl font-bold text-slate-900 tabular-nums">
            {total}
          </span>
          <span className="text-xs text-slate-400 font-medium">Responden</span>
        </div>
      </div>

      {/* Legend & Breakdown Table */}
      <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-100">
        {items.map((item) => {
          const pct = total > 0 ? ((item.count / total) * 100).toFixed(1) : '0';
          return (
            <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
              <div className="flex items-center gap-2 truncate pr-1">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${item.bg}`} />
                <span className="text-xs text-slate-700 font-medium truncate">{item.label}</span>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-semibold text-slate-900 tabular-nums">{item.count}</span>
                <span className="text-[11px] text-slate-500 tabular-nums ml-1">({pct}%)</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mandatory Note */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-start gap-2 text-xs text-slate-500 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed text-amber-900">
          <strong>Nota:</strong> Data ini ialah data sintetik untuk tujuan demonstrasi dan tidak mewakili individu sebenar.
        </p>
      </div>
    </div>
  );
};
