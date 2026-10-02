import React, { useState } from 'react';
import {
  Respondent,
  Gender,
  SexualOrientation,
  ResponseStatus,
  Month,
} from '../../types/survey';
import {
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  Send,
  Sparkles,
} from 'lucide-react';

interface SurveyFormProps {
  existingRespondents: Respondent[];
  onAddRespondent: (newRespondent: Respondent) => void;
  onNavigateToDashboard: () => void;
}

export const SurveyForm: React.FC<SurveyFormProps> = ({
  existingRespondents,
  onAddRespondent,
  onNavigateToDashboard,
}) => {
  // Generate next ID
  const nextId = (() => {
    let maxNum = 80;
    existingRespondents.forEach((r) => {
      const match = r.id.match(/\d+/);
      if (match) {
        const num = parseInt(match[0], 10);
        if (num > maxNum) maxNum = num;
      }
    });
    return `R${String(maxNum + 1).padStart(3, '0')}`;
  })();

  const [id, setId] = useState<string>(nextId);
  const [age, setAge] = useState<number>(24);
  const [gender, setGender] = useState<Gender>('Lelaki');
  const [orientation, setOrientation] = useState<SexualOrientation>('Heteroseksual');
  const [status, setStatus] = useState<ResponseStatus>('Lengkap');
  const [month, setMonth] = useState<Month>('Okt');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newRecord: Respondent = {
      id: id.trim() || nextId,
      age: Number(age) || 20,
      gender,
      orientation,
      status,
      month,
      submittedAt: new Date().toISOString().split('T')[0],
      notes: notes.trim() || undefined,
    };

    onAddRespondent(newRecord);
    setLastSubmittedId(newRecord.id);
    setIsSubmitted(true);

    // Prepare for next entry
    const numericPart = parseInt(newRecord.id.replace(/\D/g, ''), 10) || 80;
    setId(`R${String(numericPart + 1).padStart(3, '0')}`);
  };

  const handleResetForm = () => {
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Borang Respons Tinjauan Anonim
            </h2>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Borang simulasi ini membolehkan kemasukan data tinjauan baru untuk demonstrasi dashboard.
              Data yang dimasukkan tidak memerlukan nama atau butiran peribadi, dan pilihan “Tidak mahu menjawab”
              tersedia tanpa paksaan.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>Privasi Dijamin:</strong> Respons disimpan dalam LocalStorage peranti anda dan akan mengemaskini
            semua KPI, carta agihan dan jadual responden serta-merta.
          </span>
        </div>
      </div>

      {/* Success Notification */}
      {isSubmitted && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-xs transition-all">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-semibold text-emerald-900">
                  Respons {lastSubmittedId} Berjaya Disimpan!
                </h4>
                <p className="text-xs text-emerald-700 mt-1">
                  Dashboard dan statistik carta telah dikemaskini dengan maklumat terkini.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleResetForm}
                className="px-3 py-1.5 text-xs font-medium text-emerald-800 bg-white border border-emerald-200 rounded-lg hover:bg-emerald-100/50 transition-colors"
              >
                Isi Respons Lagi
              </button>
              <button
                type="button"
                onClick={onNavigateToDashboard}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors shadow-xs"
              >
                Lihat Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.04)] space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* ID Responden */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              ID Responden
            </label>
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="cth: R081"
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Pengenalpastian anonim automatik (contoh: R081)
            </span>
          </div>

          {/* Umur */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Umur (Tahun)
            </label>
            <input
              type="number"
              min={18}
              max={80}
              required
              value={age}
              onChange={(e) => setAge(Math.max(18, Math.min(90, parseInt(e.target.value, 10) || 18)))}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Had umur dewasa: 18 - 80 tahun
            </span>
          </div>
        </div>

        {/* Jantina */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Jantina
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Lelaki', 'Perempuan', 'Tidak dinyatakan'] as Gender[]).map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGender(g)}
                className={`py-2.5 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                  gender === g
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 font-semibold shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Orientasi Seksual */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Orientasi Seksual (Pilihan Bebas)
            </label>
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <HelpCircle className="w-3 h-3 text-slate-400" />
              Pilihan tidak dipaksa
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              { val: 'Heteroseksual', label: 'Heteroseksual', desc: 'Tertarik kepada jantina berlawanan' },
              { val: 'Homoseksual', label: 'Homoseksual', desc: 'Tertarik kepada jantina yang sama' },
              { val: 'Biseksual', label: 'Biseksual', desc: 'Tertarik kepada lebih daripada satu jantina' },
              { val: 'Lain-lain / Tidak pasti', label: 'Lain-lain / Tidak pasti', desc: 'Kategori lain atau sedang meneroka' },
              { val: 'Tidak mahu menjawab', label: 'Tidak mahu menjawab', desc: 'Memilih untuk merahsiakan jawapan' },
            ].map((opt) => (
              <button
                type="button"
                key={opt.val}
                onClick={() => setOrientation(opt.val as SexualOrientation)}
                className={`text-left p-3 rounded-lg border transition-all ${
                  orientation === opt.val
                    ? 'border-indigo-600 bg-indigo-50/60 text-indigo-950 shadow-xs'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="font-semibold text-xs flex items-center justify-between">
                  <span>{opt.label}</span>
                  {orientation === opt.val && (
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Status Respons */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Status Respons
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ResponseStatus)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              <option value="Lengkap">Lengkap (Semua soalan diselesaikan)</option>
              <option value="Belum lengkap">Belum lengkap (Draf / separa isi)</option>
            </select>
          </div>

          {/* Bulan */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Bulan Respons
            </label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value as Month)}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {(
                ['Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun', 'Jul', 'Ogos', 'Sep', 'Okt', 'Nov', 'Dis'] as Month[]
              ).map((m) => (
                <option key={m} value={m}>
                  {m} 2026
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Nota Tambahan Simulasi */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Catatan Tambahan (Pilihan)
          </label>
          <input
            type="text"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="cth: Penyertaan tinjauan berkumpulan sesi petang"
            className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onNavigateToDashboard}
            className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Hantar Respons & Kemaskini Dashboard</span>
          </button>
        </div>
      </form>
    </div>
  );
};
