/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Respondent,
  FilterCriteria,
} from './types/survey';
import {
  getStoredRespondents,
  saveStoredRespondents,
  resetStoredRespondents,
} from './data/initialData';
import { Sidebar, NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { RespondentTable } from './components/respondents/RespondentTable';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { SurveyForm } from './components/survey/SurveyForm';
import { AboutView } from './components/about/AboutView';
import { Check, AlertTriangle } from 'lucide-react';

const INITIAL_FILTERS: FilterCriteria = {
  search: '',
  gender: 'all',
  ageRange: 'all',
  orientation: 'all',
  status: 'all',
  month: 'all',
};

export default function App() {
  const [respondents, setRespondents] = useState<Respondent[]>([]);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState<FilterCriteria>(INITIAL_FILTERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Initialize respondents from LocalStorage on mount
  useEffect(() => {
    const data = getStoredRespondents();
    setRespondents(data);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered respondents applied globally
  const filteredRespondents = useMemo(() => {
    return respondents.filter((item) => {
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
  }, [respondents, filters]);

  // Add new survey response
  const handleAddRespondent = (newRespondent: Respondent) => {
    const updated = [newRespondent, ...respondents];
    setRespondents(updated);
    saveStoredRespondents(updated);
    triggerToast(`Respons anonim (${newRespondent.id}) berjaya ditambah & disimpan.`);
  };

  // Reset to default 80 synthetic records
  const handleConfirmReset = () => {
    const resetData = resetStoredRespondents();
    setRespondents(resetData);
    setFilters(INITIAL_FILTERS);
    setShowResetConfirm(false);
    triggerToast('Data telah diset semula kepada 80 rekod sintetik asal.');
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex text-slate-800">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOpenMobile={isMobileMenuOpen}
        onCloseMobile={() => setIsMobileMenuOpen(false)}
        onResetData={() => setShowResetConfirm(true)}
        respondentCount={respondents.length}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          activeTab={activeTab}
          onTabChange={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onResetData={() => setShowResetConfirm(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              allRespondents={respondents}
              filteredRespondents={filteredRespondents}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'respondents' && (
            <RespondentTable
              allRespondents={respondents}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsView
              allRespondents={respondents}
              filteredRespondents={filteredRespondents}
              filters={filters}
              onFilterChange={setFilters}
              onResetFilters={() => setFilters(INITIAL_FILTERS)}
            />
          )}

          {activeTab === 'survey' && (
            <SurveyForm
              existingRespondents={respondents}
              onAddRespondent={handleAddRespondent}
              onNavigateToDashboard={() => setActiveTab('dashboard')}
            />
          )}

          {activeTab === 'about' && (
            <AboutView
              onResetDemoData={() => setShowResetConfirm(true)}
              totalRecords={respondents.length}
            />
          )}
        </main>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-xl shadow-lg border border-slate-800 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-xl border border-slate-200">
            <div className="flex items-center gap-3 text-amber-600 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Set Semula Data Sintetik?
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tindakan ini akan memadam sebarang respons yang baru anda tambahkan dan mengembalikan semula
              80 rekod sintetik asal (46 Lelaki, 34 Perempuan, 73 Lengkap, 52 Heteroseksual).
            </p>
            <div className="mt-5 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors shadow-xs"
              >
                Ya, Set Semula Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
