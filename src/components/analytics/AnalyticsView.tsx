import React from 'react';
import { Respondent, FilterCriteria } from '../../types/survey';
import { FilterBar } from '../common/FilterBar';
import { Bar } from 'react-chartjs-2';
import '../charts/chartSetup';
import { SlidersHorizontal, TableProperties, TrendingUp } from 'lucide-react';

interface AnalyticsViewProps {
  allRespondents: Respondent[];
  filteredRespondents: Respondent[];
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  onResetFilters: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  allRespondents,
  filteredRespondents,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const total = filteredRespondents.length;
  const categories = ['Heteroseksual', 'Homoseksual', 'Biseksual', 'Lain-lain / Tidak pasti'];

  // Cross-tabulation data: Gender vs Orientation
  const crossGender = {
    Lelaki: {
      Heteroseksual: filteredRespondents.filter((r) => r.gender === 'Lelaki' && r.orientation === 'Heteroseksual').length,
      Homoseksual: filteredRespondents.filter((r) => r.gender === 'Lelaki' && r.orientation === 'Homoseksual').length,
      Biseksual: filteredRespondents.filter((r) => r.gender === 'Lelaki' && r.orientation === 'Biseksual').length,
      'Lain-lain / Tidak pasti': filteredRespondents.filter(
        (r) => r.gender === 'Lelaki' && (r.orientation === 'Lain-lain / Tidak pasti' || r.orientation === 'Tidak mahu menjawab')
      ).length,
    },
    Perempuan: {
      Heteroseksual: filteredRespondents.filter((r) => r.gender === 'Perempuan' && r.orientation === 'Heteroseksual').length,
      Homoseksual: filteredRespondents.filter((r) => r.gender === 'Perempuan' && r.orientation === 'Homoseksual').length,
      Biseksual: filteredRespondents.filter((r) => r.gender === 'Perempuan' && r.orientation === 'Biseksual').length,
      'Lain-lain / Tidak pasti': filteredRespondents.filter(
        (r) => r.gender === 'Perempuan' && (r.orientation === 'Lain-lain / Tidak pasti' || r.orientation === 'Tidak mahu menjawab')
      ).length,
    },
  };

  // Grouped Bar chart: Orientation broken down by gender
  const groupedBarData = {
    labels: categories,
    datasets: [
      {
        label: 'Lelaki',
        data: categories.map((cat) => (crossGender.Lelaki as any)[cat]),
        backgroundColor: '#3B82F6', // Blue
        borderRadius: 4,
      },
      {
        label: 'Perempuan',
        data: categories.map((cat) => (crossGender.Perempuan as any)[cat]),
        backgroundColor: '#F43F5E', // Rose
        borderRadius: 4,
      },
    ],
  };

  const groupedBarOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          boxWidth: 12,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => ` ${context.dataset.label}: ${context.raw} orang`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 11 }, color: '#64748B' },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(226, 232, 240, 0.6)' },
        ticks: { stepSize: 5, font: { size: 11 }, color: '#64748B' },
      },
    },
  };

  // Age group cross tabulation
  const ageGroups = [
    { label: '18–20', min: 18, max: 20 },
    { label: '21–23', min: 21, max: 23 },
    { label: '24–26', min: 24, max: 26 },
    { label: '27–29', min: 27, max: 29 },
    { label: '30+', min: 30, max: 120 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Filter Controls */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalFiltered={filteredRespondents.length}
        totalCount={allRespondents.length}
      />

      {/* Analytics Summary Banner */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Analitik & Korelasi Agregat
            </h3>
            <p className="text-xs text-slate-500">
              Menganalisis taburan data tinjauan mengikut jantina, umur, dan kadar penyempurnaan borang
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-600 self-stretch md:self-auto justify-between md:justify-end bg-slate-50 p-2 rounded-lg">
          <span>Sampel Aktif: <strong className="text-slate-900 tabular-nums">{total}</strong></span>
          <span>·</span>
          <span>Peratus Sampel: <strong className="text-slate-900 tabular-nums">{((total / allRespondents.length) * 100).toFixed(1)}%</strong></span>
        </div>
      </div>

      {/* Grid: Grouped Chart & Cross Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grouped Bar Chart */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <span>Pecahan Orientasi Mengikut Jantina</span>
              </h4>
              <span className="text-[11px] text-slate-400">Perbandingan Lelaki vs Perempuan</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Perbandingan bilangan kategori responden lelaki dan perempuan dalam kumpulan data semasa.
            </p>
          </div>

          <div className="h-64 my-2">
            <Bar data={groupedBarData} options={groupedBarOptions} />
          </div>

          <p className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 text-center">
            *Data adalah sintetik semata-mata untuk demonstrasi perwakilan carta berkumpulan.
          </p>
        </div>

        {/* Matrix / Cross-Tabulation Table */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <TableProperties className="w-4 h-4 text-indigo-600" />
                <span>Matriks Taburan Silang (Cross-Tabulation)</span>
              </h4>
              <span className="text-[11px] text-slate-400">Umur vs Orientasi</span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Jadual taburan silang menunjukkan bilangan responden bagi setiap julat umur.
            </p>
          </div>

          <div className="overflow-x-auto my-2">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/80">
                  <th className="py-2.5 px-3">Julat Umur</th>
                  <th className="py-2.5 px-2 text-right">Hetero</th>
                  <th className="py-2.5 px-2 text-right">Homo</th>
                  <th className="py-2.5 px-2 text-right">Bi</th>
                  <th className="py-2.5 px-2 text-right">Lain-lain</th>
                  <th className="py-2.5 px-3 text-right">Jumlah</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {ageGroups.map((group) => {
                  const subset = filteredRespondents.filter((r) => r.age >= group.min && r.age <= group.max);
                  const hCount = subset.filter((r) => r.orientation === 'Heteroseksual').length;
                  const hmCount = subset.filter((r) => r.orientation === 'Homoseksual').length;
                  const biCount = subset.filter((r) => r.orientation === 'Biseksual').length;
                  const othCount = subset.filter(
                    (r) => r.orientation === 'Lain-lain / Tidak pasti' || r.orientation === 'Tidak mahu menjawab'
                  ).length;
                  const groupTotal = subset.length;

                  return (
                    <tr key={group.label} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-2.5 px-3 font-medium text-slate-800">{group.label}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums text-indigo-600 font-semibold">{hCount}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums text-teal-600 font-semibold">{hmCount}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums text-purple-600 font-semibold">{biCount}</td>
                      <td className="py-2.5 px-2 text-right tabular-nums text-amber-600 font-semibold">{othCount}</td>
                      <td className="py-2.5 px-3 text-right tabular-nums font-bold text-slate-900 bg-slate-50/50">
                        {groupTotal}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Baris: Kategori Umur</span>
            <span>Lajur: Orientasi Seksual</span>
          </div>
        </div>
      </div>
    </div>
  );
};
