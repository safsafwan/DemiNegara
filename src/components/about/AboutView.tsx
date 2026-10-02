import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  UserX,
  Database,
  EyeOff,
  Scale,
  RotateCcw,
} from 'lucide-react';

interface AboutViewProps {
  onResetDemoData: () => void;
  totalRecords: number;
}

export const AboutView: React.FC<AboutViewProps> = ({ onResetDemoData, totalRecords }) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Primary Banner */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 border border-slate-800 shadow-md">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold tracking-wider uppercase text-indigo-400">
                Ethical Design & Compliance Architecture
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30">
                DEMO DATA SAHAJA
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              FriendCircle – Anonymous Orientation Survey Dashboard
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Aplikasi ini adalah <strong>DEMO & UI SAHAJA</strong> untuk menunjukkan bagaimana data tinjauan
              anonim dalam kalangan sekumpulan kawan boleh dipaparkan dalam bentuk dashboard visual yang moden,
              teratur dan menghormati hak privasi.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-800 text-xs sm:text-sm text-amber-200/90 bg-amber-950/40 p-4 rounded-lg border border-amber-800/40 leading-relaxed">
          <strong className="text-amber-100 uppercase tracking-wide block mb-1">
            PRIVACY NOTICE
          </strong>
          “This demonstration uses synthetic data only. Sexual orientation is sensitive personal information.
          Do not use this application to infer or identify another person's sexual orientation.”
        </div>
      </div>

      {/* Prohibited Practices vs Protected Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Larangan Mutlak */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5 text-rose-700 font-bold text-sm mb-4">
            <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
            </div>
            <span>Larangan Tegas (Strict Boundaries)</span>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Sistem ini secara tegas menolak dan tidak mempunyai sebarang modul untuk:
          </p>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>Pengecaman Wajah / Gambar:</strong> Tiada pengimbasan biometrik wajah untuk meneka orientasi.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>Skor Ramalan Kebarangkalian:</strong> Tiada penghasilan sebarang “gay probability score” atau algoritma ramalan orientasi.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>Analisis Gaya & Media Sosial:</strong> Tiada tekaan berdasarkan pakaian, gaya hidup, atau akaun media sosial.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-rose-500 font-bold shrink-0">✕</span>
              <span><strong>Penjejakan Orang Sebenar:</strong> Tiada profiling, de-anonymization atau pencarian individu sebenar.</span>
            </li>
          </ul>
        </div>

        {/* Jaminan Keselamatan & Privasi */}
        <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-2.5 text-emerald-700 font-bold text-sm mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <span>Jaminan Keselamatan & Etika</span>
          </div>

          <p className="text-xs text-slate-500 mb-4">
            Ciri-ciri perlindungan privasi yang diterapkan dalam aplikasi ini:
          </p>

          <ul className="space-y-3 text-xs text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Anonim Sepenuhnya:</strong> Pengenalan berasaskan ID rawak (cth: R001) tanpa sebarang nama atau identiti individu.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Hak Menolak:</strong> Pilihan “Tidak mahu menjawab” disediakan secara jelas dan tiada soalan dipaksa.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Data Tempatan (LocalStorage):</strong> Tiada data sensitif dihantar ke pelayan luaran (client-side only).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-emerald-500 font-bold shrink-0">✓</span>
              <span><strong>Paparan Agregat:</strong> Visualisasi carta membentangkan taburan agregat dan bukannya profil individu.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Synthetic Baseline Information & Reset Utility */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Pengurusan Data Demonstrasi (Synthetic Store)
              </h3>
              <p className="text-xs text-slate-500">
                Jumlah data tersimpan semasa: <strong className="text-slate-800 tabular-nums">{totalRecords} rekod</strong>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onResetDemoData}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Kepada 80 Data Sintetik Asal</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 text-xs">
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-500 block text-[11px]">Jumlah Sasaran</span>
            <span className="text-base font-bold text-slate-900 tabular-nums">80 Responden</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-500 block text-[11px]">Lelaki / Perempuan</span>
            <span className="text-base font-bold text-slate-900 tabular-nums">46 / 34</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-500 block text-[11px]">Status Lengkap</span>
            <span className="text-base font-bold text-emerald-700 tabular-nums">73 Responden</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-50">
            <span className="text-slate-500 block text-[11px]">Kategori Hetero</span>
            <span className="text-base font-bold text-indigo-700 tabular-nums">52 (65%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
