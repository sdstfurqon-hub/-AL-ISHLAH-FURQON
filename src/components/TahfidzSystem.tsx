import React, { useState } from 'react';
import { 
  BookOpen, 
  PlusCircle, 
  Award, 
  CheckCircle, 
  Clock, 
  Calendar, 
  Star, 
  User, 
  ChevronRight,
  TrendingUp,
  LineChart,
  Activity,
  UserCheck
} from 'lucide-react';
import { Santri, TahfidzProgress } from '../types';

interface TahfidzSystemProps {
  santris: Santri[];
  records: TahfidzProgress[];
  onAddRecord: (newRec: TahfidzProgress) => void;
}

export default function TahfidzSystem({ santris, records, onAddRecord }: TahfidzSystemProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profil' | 'setor'>('profil');
  const [selectedSantriId, setSelectedSantriId] = useState<string>('s1');
  
  // Setor form
  const [surahName, setSurahName] = useState('An-Naba');
  const [startAyat, setStartAyat] = useState<number>(1);
  const [endAyat, setEndAyat] = useState<number>(10);
  const [juz, setJuz] = useState<number>(30);
  const [tajwidScore, setTajwidScore] = useState<number>(85);
  const [fluentScore, setFluentScore] = useState<number>(85);
  const [notes, setNotes] = useState('');

  const activeSantri = santris.find(s => s.id === selectedSantriId) || santris[0];

  const activeRecords = records.filter(r => r.santriId === selectedSantriId);

  // Helper stats for active student
  const totalVerses = activeRecords.reduce((sum, r) => sum + (r.endAyat - r.startAyat + 1), 0);
  const lastJuz = activeRecords.length > 0 ? activeRecords[activeRecords.length - 1].juz : 30;
  const averageTajwid = activeRecords.length > 0 
    ? Math.round(activeRecords.reduce((sum, r) => sum + r.tajwidScore, 0) / activeRecords.length) 
    : 0;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surahName) {
      alert('Pilih nama surah.');
      return;
    }

    const newRecord: TahfidzProgress = {
      id: `t${Date.now()}`,
      santriId: selectedSantriId,
      surahName,
      startAyat,
      endAyat,
      juz,
      tajwidScore,
      fluentScore,
      notes: notes || 'Hafalan kokoh dan bersemangat.',
      date: new Date().toISOString().split('T')[0],
      ustadzName: 'Ustadz Hamzah Al-Hafidz'
    };

    onAddRecord(newRecord);
    setNotes('');
    alert('Catatan Setoran Baru Santri berhasil direkam!');
  };

  return (
    <div className="space-y-4" id="tahfidz-system-module">
      
      {/* Student Profile Quick Switcher */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
            <User className="w-4 h-4 text-[#064E3B]" />
          </div>
          <div>
            <span className="text-[9px] text-slate-400 uppercase font-bold">Santri Aktif</span>
            <select
              value={selectedSantriId}
              onChange={(e) => setSelectedSantriId(e.target.value)}
              className="font-extrabold text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer text-sm"
            >
              {santris.map(s => (
                <option key={s.id} value={s.id}>{s.name} ({s.class})</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/50 text-xs font-bold w-full">
        <button
          onClick={() => setActiveSubTab('profil')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'profil'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Profil & Capaian</span>
        </button>

        <button
          onClick={() => setActiveSubTab('setor')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'setor'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Setoran Baru</span>
        </button>
      </div>

      {activeSubTab === 'profil' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Target Milestone widget */}
          <div className="bg-gradient-to-br from-[#064E3B] via-emerald-800 to-amber-700 text-white rounded-3xl p-5 shadow-lg space-y-3 relative overflow-hidden border border-emerald-800">
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <span className="bg-amber-500/30 text-amber-200 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-400/20">
                  Ringkasan Tahfidz
                </span>
                <h3 className="text-lg font-black mt-1.5">{activeSantri.name}</h3>
                <p className="text-[10px] text-emerald-200 font-semibold uppercase font-mono mt-0.5">NIS: {activeSantri.nis}</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden shrink-0">
                <img src={activeSantri.avatarUrl} alt="Santri Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Micro details row */}
            <div className="grid grid-cols-3 gap-3.5 pt-3.5 border-t border-white/10 text-center text-xs font-semibold z-10 relative">
              <div>
                <span className="text-[9px] text-emerald-300 block uppercase">Juz Akhir</span>
                <span className="font-mono text-amber-300 text-sm font-extrabold">{lastJuz}</span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-300 block uppercase">Jumlah Ayat</span>
                <span className="font-mono text-white text-sm font-extrabold">{totalVerses}</span>
              </div>
              <div>
                <span className="text-[9px] text-emerald-300 block uppercase">Rata Tajwid</span>
                <span className="font-mono text-emerald-100 text-sm font-extrabold">{averageTajwid}%</span>
              </div>
            </div>
          </div>

          {/* Progress Circle & Target Timeline */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
            <div>
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-emerald-700" />
                <span>Target & Estimasi Khatam</span>
              </h4>
              <p className="text-[10px] text-slate-400 font-medium">Target kelulusan standar PPTA Al-Ishlah Furqon adalah minimal 5 Juz pertahun.</p>
            </div>

            {/* Progress Bar inside standard component */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-600">Progres Target Semester Genap</span>
                <span className="text-emerald-800 dark:text-emerald-400 font-bold">85% Tercapai</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-700 h-full rounded-full" style={{ width: '85%' }}></div>
              </div>
              <div className="flex justify-between text-[9px] text-slate-400">
                <span>Estimasi Khatam 30 Juz:</span>
                <span className="font-bold text-slate-600">Desember 2027</span>
              </div>
            </div>
          </div>

          {/* Record History Logs */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1 block">Riwayat Setoran Terbaru</span>
            {activeRecords.map(rec => (
              <div 
                key={rec.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-400 font-extrabold px-1.5 py-0.2 rounded border border-amber-200/40">JUZ {rec.juz}</span>
                    <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 mt-1.5">QS. {rec.surahName}</h4>
                    <p className="text-[10px] text-slate-400 font-medium">Ayat {rec.startAyat} - {rec.endAyat}</p>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold">{rec.date}</span>
                </div>

                <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-bold">
                  <div className="flex items-center space-x-3.5 text-slate-500">
                    <div>Tajwid: <span className="text-slate-800 dark:text-slate-200 text-xs font-extrabold">{rec.tajwidScore}</span></div>
                    <div>Kelancaran: <span className="text-slate-800 dark:text-slate-200 text-xs font-extrabold">{rec.fluentScore}</span></div>
                  </div>
                  <div className="text-[9px] text-slate-400 truncate max-w-[50%]">Oleh {rec.ustadzName}</div>
                </div>

                {rec.notes && (
                  <p className="text-[10px] bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-xl text-slate-500 dark:text-slate-400 font-semibold italic border-l-2 border-emerald-800/50">
                    "{rec.notes}"
                  </p>
                )}
              </div>
            ))}
          </div>

        </div>
      )}

      {activeSubTab === 'setor' && (
        <form onSubmit={handleFormSubmit} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div>
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm uppercase flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-emerald-700 animate-spin" />
              <span>Input Setoran Hafalan Baru</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">Hanya dapat diakses oleh Ustadz pembina halaqah tahfidz pondok.</p>
          </div>

          <div className="space-y-1">
            <label className="block">Nama Surah Al-Quran</label>
            <input 
              type="text"
              value={surahName}
              onChange={(e) => setSurahName(e.target.value)}
              required
              placeholder="Contoh: An-Naba, Al-Mulk, Al-Baqarah"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block">Juz</label>
              <input 
                type="number"
                value={juz}
                onChange={(e) => setJuz(parseInt(e.target.value) || 30)}
                required
                min={1}
                max={30}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block">Ayat Mulai</label>
              <input 
                type="number"
                value={startAyat}
                onChange={(e) => setStartAyat(parseInt(e.target.value) || 1)}
                required
                min={1}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block">Ayat Akhir</label>
              <input 
                type="number"
                value={endAyat}
                onChange={(e) => setEndAyat(parseInt(e.target.value) || 10)}
                required
                min={1}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block">Nilai Tajwid & Makhraj</label>
              <input 
                type="number"
                value={tajwidScore}
                onChange={(e) => setTajwidScore(parseInt(e.target.value) || 85)}
                required
                min={0}
                max={100}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1">
              <label className="block">Nilai Kelancaran</label>
              <input 
                type="number"
                value={fluentScore}
                onChange={(e) => setFluentScore(parseInt(e.target.value) || 85)}
                required
                min={0}
                max={100}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block">Catatan Guru Pembina</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Sebutkan kesalahan tajwid atau catatan kelancaran di sini..."
              rows={3}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-100 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#064E3B] hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all uppercase tracking-wider cursor-pointer"
          >
            Simpan Catatan Setoran Baru
          </button>
        </form>
      )}

    </div>
  );
}
