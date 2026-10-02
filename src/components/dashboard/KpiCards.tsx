import React from 'react';
import { Users, User, UserCheck, CheckCircle } from 'lucide-react';
import { Respondent } from '../../types/survey';

interface KpiCardsProps {
  respondents: Respondent[];
  totalBaseline?: number;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ respondents, totalBaseline = 80 }) => {
  const total = respondents.length;
  const lelaki = respondents.filter((r) => r.gender === 'Lelaki').length;
  const perempuan = respondents.filter((r) => r.gender === 'Perempuan').length;
  const lengkap = respondents.filter((r) => r.status === 'Lengkap').length;

  const lelakiPct = total > 0 ? ((lelaki / total) * 100).toFixed(1) : '0';
  const perempuanPct = total > 0 ? ((perempuan / total) * 100).toFixed(1) : '0';
  const lengkapPct = total > 0 ? ((lengkap / total) * 100).toFixed(1) : '0';

  const cards = [
    {
      title: 'Jumlah Responden',
      value: total,
      subtext: total === totalBaseline ? 'Kumpulan sasaran tercapai' : `Ditapis daripada ${totalBaseline}`,
      icon: Users,
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      borderColor: 'hover:border-indigo-200',
      badge: '100% sampel',
      badgeColor: 'text-indigo-700 bg-indigo-50/70',
    },
    {
      title: 'Responden Lelaki',
      value: lelaki,
      subtext: `${lelakiPct}% daripada sampel`,
      icon: User,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderColor: 'hover:border-blue-200',
      badge: `${lelakiPct}%`,
      badgeColor: 'text-blue-700 bg-blue-50/70',
    },
    {
      title: 'Responden Perempuan',
      value: perempuan,
      subtext: `${perempuanPct}% daripada sampel`,
      icon: UserCheck,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
      borderColor: 'hover:border-rose-200',
      badge: `${perempuanPct}%`,
      badgeColor: 'text-rose-700 bg-rose-50/70',
    },
    {
      title: 'Respons Lengkap',
      value: lengkap,
      subtext: `${lengkapPct}% borang diisi penuh`,
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      borderColor: 'hover:border-emerald-200',
      badge: `${lengkapPct}% kadar`,
      badgeColor: 'text-emerald-700 bg-emerald-50/70',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div
            key={c.title}
            className={`bg-white rounded-xl p-5 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 ${c.borderColor} hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {c.title}
              </span>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${c.iconBg}`}>
                <Icon className={`w-5 h-5 ${c.iconColor}`} />
              </div>
            </div>

            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-bold tracking-tight text-slate-900 tabular-nums">
                {c.value}
              </span>
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${c.badgeColor} tabular-nums`}>
                {c.badge}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2 truncate">
              {c.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
};
