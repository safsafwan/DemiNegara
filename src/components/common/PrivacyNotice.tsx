import React, { useState } from 'react';
import { ShieldAlert, Info, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export const PrivacyNotice: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 border border-slate-800 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <Lock className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                PRIVACY NOTICE & ETHICAL COMPLIANCE
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-medium border border-amber-400/30">
                DATA SINTETIK SAHAJA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium leading-relaxed">
              This demonstration uses synthetic data only. Sexual orientation is sensitive personal information.
              Do not use this application to infer or identify another person's sexual orientation.
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors py-1 px-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 shrink-0 self-end sm:self-center"
        >
          <span>{expanded ? 'Tutup Prinsip Etika' : 'Prinsip Perlindungan'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-300">
          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 space-y-1.5">
            <div className="font-semibold text-rose-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Larangan Tegas (Strict Prohibitions):
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
              <li>TIADA fungsi mengenal pasti seseorang sebagai gay atau orientasi lain melalui foto / wajah.</li>
              <li>TIADA algoritma ramalan, corak pakaian, atau “gay probability score”.</li>
              <li>TIADA integrasi media sosial, penjejakan profil, atau penyenaraian individu sebenar.</li>
            </ul>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/60 space-y-1.5">
            <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              Jaminan Anonimiti & Privasi (Privacy Guarantees):
            </div>
            <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
              <li>Semua rekod adalah ID rawak (contoh: R001) tanpa nama atau data biometrik.</li>
              <li>Semua pengiraan dilakukan secara agregat dan tersimpan secara setempat (LocalStorage).</li>
              <li>Pilihan “Tidak mahu menjawab” disediakan secara bebas tanpa sebarang paksaan.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
