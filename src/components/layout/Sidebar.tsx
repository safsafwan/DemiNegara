import React from 'react';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileEdit,
  Info,
  RotateCcw,
  Shield,
  X,
} from 'lucide-react';

export type NavTab = 'dashboard' | 'respondents' | 'analytics' | 'survey' | 'about';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  onResetData: () => void;
  respondentCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  isOpenMobile,
  onCloseMobile,
  onResetData,
  respondentCount,
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard, desc: 'Ringkasan & Carta Utama' },
    { id: 'respondents' as NavTab, label: 'Responden', icon: Users, desc: 'Jadual Data Anonim' },
    { id: 'analytics' as NavTab, label: 'Analitik', icon: BarChart3, desc: 'Korelasi & Taburan Silang' },
    { id: 'survey' as NavTab, label: 'Isi Tinjauan', icon: FileEdit, desc: 'Tambah Respons Baru' },
    { id: 'about' as NavTab, label: 'Tentang', icon: Info, desc: 'Privasi & Etika' },
  ];

  const content = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 w-64 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
            FC
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-tight text-slate-900">
                FriendCircle
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 tracking-wider">
                DEMO DATA
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-medium truncate">
              Anonymous Friends Survey
            </p>
          </div>
        </div>

        {isOpenMobile && (
          <button
            onClick={onCloseMobile}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Menu Utama
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                isActive
                  ? 'bg-indigo-50/80 text-indigo-700 font-semibold shadow-xs'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  isActive ? 'text-indigo-600' : 'text-slate-400'
                }`}
              />
              <div className="flex-1 truncate">
                <span className="block truncate">{item.label}</span>
              </div>
              {item.id === 'respondents' && (
                <span className="text-[11px] font-mono text-slate-400 tabular-nums">
                  {respondentCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Info & Reset Action */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
        <div className="p-3 bg-white rounded-lg border border-slate-200/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-700 font-semibold mb-1">
            <Shield className="w-3.5 h-3.5 text-indigo-600" />
            <span>Kerahsiaan Terjamin</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            Semua maklumat adalah sintetik dan agregat tanpa pengenalan diri.
          </p>
        </div>

        <button
          type="button"
          onClick={onResetData}
          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors border border-transparent hover:border-slate-200"
        >
          <RotateCcw className="w-3 h-3 text-slate-400" />
          <span>Reset Data Demo (80)</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden md:block shrink-0 sticky top-0 h-screen z-20">
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};
