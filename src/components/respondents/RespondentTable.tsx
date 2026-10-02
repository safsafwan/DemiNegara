import React, { useState, useMemo } from 'react';
import {
  Respondent,
  FilterCriteria,
} from '../../types/survey';
import {
  Download,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { FilterBar } from '../common/FilterBar';

interface RespondentTableProps {
  allRespondents: Respondent[];
  filters: FilterCriteria;
  onFilterChange: (filters: FilterCriteria) => void;
  onResetFilters: () => void;
}

type SortField = 'id' | 'age' | 'gender' | 'orientation' | 'status' | 'month';

export const RespondentTable: React.FC<RespondentTableProps> = ({
  allRespondents,
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  // Filtered respondents
  const filtered = useMemo(() => {
    return allRespondents.filter((item) => {
      // Search by ID
      if (
        filters.search &&
        !item.id.toLowerCase().includes(filters.search.toLowerCase().trim())
      ) {
        return false;
      }

      // Gender filter
      if (filters.gender !== 'all' && item.gender !== filters.gender) {
        return false;
      }

      // Age range filter
      if (filters.ageRange !== 'all') {
        if (filters.ageRange === '18-20' && (item.age < 18 || item.age > 20)) return false;
        if (filters.ageRange === '21-23' && (item.age < 21 || item.age > 23)) return false;
        if (filters.ageRange === '24-26' && (item.age < 24 || item.age > 26)) return false;
        if (filters.ageRange === '27-29' && (item.age < 27 || item.age > 29)) return false;
        if (filters.ageRange === '30+' && item.age < 30) return false;
      }

      // Orientation filter
      if (filters.orientation !== 'all' && item.orientation !== filters.orientation) {
        return false;
      }

      // Status filter
      if (filters.status !== 'all' && item.status !== filters.status) {
        return false;
      }

      // Month filter
      if (filters.month !== 'all' && item.month !== filters.month) {
        return false;
      }

      return true;
    });
  }, [allRespondents, filters]);

  // Sorted respondents
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (sortField === 'age') {
        return sortAsc ? valA - valB : valB - valA;
      }

      if (typeof valA === 'string') {
        return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }

      return 0;
    });
  }, [filtered, sortField, sortAsc]);

  // Pagination
  const totalPages = Math.ceil(sorted.length / pageSize) || 1;
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage]);

  const handleExportCSV = () => {
    const headers = ['ID', 'Umur', 'Jantina', 'Jawapan', 'Status', 'Bulan', 'Tarikh'];
    const rows = sorted.map((r) => [
      r.id,
      r.age,
      r.gender,
      `"${r.orientation}"`,
      r.status,
      r.month,
      r.submittedAt,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `friendcircle_survey_respondents_anonymized.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        onFilterChange={(f) => {
          onFilterChange(f);
          setCurrentPage(1);
        }}
        onResetFilters={() => {
          onResetFilters();
          setCurrentPage(1);
        }}
        totalFiltered={filtered.length}
        totalCount={allRespondents.length}
      />

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] overflow-hidden">
        {/* Table Header Controls */}
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-semibold text-slate-900">
              Jadual Data Anonim Responden
            </span>
            <span className="text-[11px] text-slate-500">
              (Tiada sebarang identiti atau nama peribadi disimpan)
            </span>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Eksport CSV ({sorted.length})</span>
          </button>
        </div>

        {/* Table Element */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th
                  onClick={() => handleSort('id')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>ID Responden</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('age')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors text-right"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>Umur</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('gender')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Jantina</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('orientation')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Jawapan Orientasi</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Status</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('month')}
                  className="py-3 px-4 cursor-pointer hover:text-slate-900 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    <span>Bulan</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginated.length > 0 ? (
                paginated.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/70 transition-colors"
                  >
                    {/* ID */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-900">
                      {item.id}
                    </td>

                    {/* Age */}
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-700">
                      {item.age}
                    </td>

                    {/* Gender */}
                    <td className="py-3 px-4 text-slate-700">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            item.gender === 'Lelaki'
                              ? 'bg-blue-500'
                              : item.gender === 'Perempuan'
                              ? 'bg-rose-500'
                              : 'bg-slate-400'
                          }`}
                        />
                        <span>{item.gender}</span>
                      </span>
                    </td>

                    {/* Sexual Orientation */}
                    <td className="py-3 px-4 text-slate-800 font-medium">
                      <span className="inline-flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            item.orientation === 'Heteroseksual'
                              ? 'bg-indigo-600'
                              : item.orientation === 'Homoseksual'
                              ? 'bg-teal-600'
                              : item.orientation === 'Biseksual'
                              ? 'bg-purple-600'
                              : 'bg-amber-500'
                          }`}
                        />
                        <span>{item.orientation}</span>
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center text-xs font-medium ${
                          item.status === 'Lengkap'
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            item.status === 'Lengkap'
                              ? 'bg-emerald-500'
                              : 'bg-amber-500'
                          }`}
                        />
                        {item.status}
                      </span>
                    </td>

                    {/* Month */}
                    <td className="py-3 px-4 text-slate-500 font-mono">
                      {item.month}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400">
                    <p className="text-sm font-medium text-slate-600">
                      Tiada responden sepadan dengan penapis.
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Sila cuba tetapkan semula penapis carian.
                    </p>
                    <button
                      type="button"
                      onClick={onResetFilters}
                      className="mt-3 px-3 py-1.5 text-xs text-indigo-600 font-medium bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    >
                      Reset Semua Penapis
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            Menunjukkan{' '}
            <strong className="text-slate-800 font-mono">
              {filtered.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
            </strong>{' '}
            –{' '}
            <strong className="text-slate-800 font-mono">
              {Math.min(currentPage * pageSize, filtered.length)}
            </strong>{' '}
            daripada{' '}
            <strong className="text-slate-800 font-mono">{filtered.length}</strong>{' '}
            rekod
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>

            <span className="px-3 py-1 font-mono text-slate-700 bg-white border border-slate-200 rounded-lg">
              Halaman {currentPage} / {totalPages}
            </span>

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
