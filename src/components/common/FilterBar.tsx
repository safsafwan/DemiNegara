import React from 'react';
import { Search, RotateCcw, Filter } from 'lucide-react';
import { FilterCriteria, Gender, SexualOrientation, ResponseStatus } from '../../types/survey';

interface FilterBarProps {
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  onResetFilters: () => void;
  totalFiltered: number;
  totalCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFiltered,
  totalCount,
}) => {
  const isFiltered =
    filters.search !== '' ||
    filters.gender !== 'all' ||
    filters.ageRange !== 'all' ||
    filters.orientation !== 'all' ||
    filters.status !== 'all' ||
    filters.month !== 'all';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, search: e.target.value });
  };

  const handleGenderChange = (gender: 'all' | Gender) => {
    onFilterChange({ ...filters, gender });
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, ageRange: e.target.value as any });
  };

  const handleOrientationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, orientation: e.target.value as any });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ ...filters, status: e.target.value as any });
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search by ID */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari ID responden (cth: R001)..."
            value={filters.search}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        {/* Quick Gender Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            type="button"
            onClick={() => handleGenderChange('all')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.gender === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Jantina
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange('Lelaki')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.gender === 'Lelaki'
                ? 'bg-white text-blue-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Lelaki
          </button>
          <button
            type="button"
            onClick={() => handleGenderChange('Perempuan')}
            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
              filters.gender === 'Perempuan'
                ? 'bg-white text-rose-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Perempuan
          </button>
        </div>

        {/* Select Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Umur */}
          <select
            value={filters.ageRange}
            onChange={handleAgeChange}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Semua Umur</option>
            <option value="18-20">18–20 tahun</option>
            <option value="21-23">21–23 tahun</option>
            <option value="24-26">24–26 tahun</option>
            <option value="27-29">27–29 tahun</option>
            <option value="30+">30+ tahun</option>
          </select>

          {/* Orientasi */}
          <select
            value={filters.orientation}
            onChange={handleOrientationChange}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Semua Kategori Jawapan</option>
            <option value="Heteroseksual">Heteroseksual</option>
            <option value="Homoseksual">Homoseksual</option>
            <option value="Biseksual">Biseksual</option>
            <option value="Lain-lain / Tidak pasti">Lain-lain / Tidak pasti</option>
            <option value="Tidak mahu menjawab">Tidak mahu menjawab</option>
          </select>

          {/* Status */}
          <select
            value={filters.status}
            onChange={handleStatusChange}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            <option value="all">Semua Status</option>
            <option value="Lengkap">Lengkap</option>
            <option value="Belum lengkap">Belum lengkap</option>
          </select>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Feedback Indicator */}
      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-indigo-500" />
          <span>
            Menunjukkan <strong className="text-slate-900 tabular-nums">{totalFiltered}</strong> daripada{' '}
            <strong className="text-slate-900 tabular-nums">{totalCount}</strong> responden
          </span>
        </div>
        {isFiltered && (
          <span className="text-indigo-600 font-medium text-[11px]">
            Penapis aktif dikemaskini pada semua KPI & carta
          </span>
        )}
      </div>
    </div>
  );
};
