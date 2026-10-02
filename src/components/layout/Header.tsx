import React from 'react';
import { Menu, Plus, RefreshCw, Lock } from 'lucide-react';
import { NavTab } from './Sidebar';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onOpenMobileMenu: () => void;
  onResetData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenMobileMenu,
  onResetData,
}) => {
  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Papan Pemuka Utama';
      case 'respondents':
        return 'Senarai Responden Anonim';
      case 'analytics':
        return 'Analitik & Taburan Silang';
      case 'survey':
        return 'Borang Respons Tinjauan';
      case 'about':
        return 'Tentang & Privasi';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-xs border-b border-slate-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile Toggle & Brand / Title */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900">
              FriendCircle
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
              DEMO DATA
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Anonymous Friends Survey</span>
            <span className="text-slate-300">/</span>
            <span className="font-medium text-slate-700">{getTabTitle()}</span>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onResetData}
          title="Reset ke 80 rekod sintetik asal"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-lg transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Data</span>
        </button>

        {activeTab !== 'survey' && (
          <button
            type="button"
            onClick={() => onTabChange('survey')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Isi Tinjauan</span>
          </button>
        )}
      </div>
    </header>
  );
};
