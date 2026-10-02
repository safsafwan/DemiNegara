import React from 'react';
import { Respondent, FilterCriteria } from '../../types/survey';
import { KpiCards } from './KpiCards';
import { OrientationChart } from '../charts/OrientationChart';
import { AgeDistributionChart } from '../charts/AgeDistributionChart';
import { ResponseStatusChart } from '../charts/ResponseStatusChart';
import { MonthlyTrendChart } from '../charts/MonthlyTrendChart';
import { FilterBar } from '../common/FilterBar';
import { PrivacyNotice } from '../common/PrivacyNotice';
import { ArrowRight, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { NavTab } from '../layout/Sidebar';

interface DashboardViewProps {
  allRespondents: Respondent[];
  filteredRespondents: Respondent[];
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  onResetFilters: () => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  allRespondents,
  filteredRespondents,
  filters,
  onFilterChange,
  onResetFilters,
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6">
      {/* Privacy Notice Banner */}
      <PrivacyNotice />

      {/* Filter Bar for Dynamic Updates */}
      <FilterBar
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
        totalFiltered={filteredRespondents.length}
        totalCount={allRespondents.length}
      />

      {/* 4 KPI Cards */}
      <KpiCards
        respondents={filteredRespondents}
        totalBaseline={allRespondents.length}
      />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Carta Utama: Pecahan Jawapan Orientasi Seksual */}
        <OrientationChart respondents={filteredRespondents} />

        {/* 2. Carta Umur: Taburan Responden Mengikut Umur */}
        <AgeDistributionChart respondents={filteredRespondents} />

        {/* 3. Carta Status Respons: Status Respons Tinjauan */}
        <ResponseStatusChart respondents={filteredRespondents} />

        {/* 4. Trend Bulanan: Jumlah Respons Mengikut Bulan */}
        <MonthlyTrendChart respondents={filteredRespondents} />
      </div>

      {/* Quick Action & Snapshot Strip */}
      <div className="bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Pangkalan Data Responden Anonim ({allRespondents.length} rekod)
            </h4>
            <p className="text-xs text-slate-500">
              Semua jawapan dipaparkan tanpa identiti peribadi. Anda boleh menapis, menyusun atau mengeksport rekod ke format CSV.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => onNavigateTab('respondents')}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <span>Buka Jadual Responden</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
