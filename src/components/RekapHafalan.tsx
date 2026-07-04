import React, { useState } from 'react';
import { 
  BarChart2, 
  Download, 
  Printer, 
  Search, 
  Filter, 
  Award, 
  CheckCircle,
  TrendingUp,
  Briefcase,
  Users
} from 'lucide-react';
import { TahfidzProgress, Santri } from '../types';

interface RekapHafalanProps {
  santris: Santri[];
  records: TahfidzProgress[];
}

export default function RekapHafalan({ santris, records }: RekapHafalanProps) {
  const [filterMonth, setFilterMonth] = useState<string>('Semua');
  const [filterHalaqah, setFilterHalaqah] = useState<string>('Semua');
  const [filterClass, setFilterClass] = useState<string>('Semua');
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Filter logic
  const filteredRecords = records.filter(rec => {
    const santri = santris.find(s => s.id === rec.santriId);
    if (!santri) return false;

    const matchesClass = filterClass === 'Semua' || santri.class === filterClass;
    // Simple filter mocks
    return matchesClass;
  });

  // Calculate summaries
  const totalSetoran = filteredRecords.length;
  const totalMurajaah = Math.floor(totalSetoran * 1.5); // Mocked statistics ratios
  const totalImtihan = Math.floor(totalSetoran * 0.4);

  const simulateExport = (type: 'Excel' | 'PDF') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Laporan Rekapitulasi Tahfidz (${type}) berhasil diekspor.`);
    }, 1500);
  };

  return (
    <div className="space-y-4" id="rekap-hafalan-module">
      
      {/* Filtering Control Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-3.5 text-xs font-semibold">
        <h4 className="text-slate-800 dark:text-slate-200 uppercase font-extrabold flex items-center gap-1.5 text-[11px] tracking-wider">
          <Filter className="w-4 h-4 text-emerald-700" />
          <span>Filter Laporan Rekapitulasi</span>
        </h4>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-slate-400 block uppercase text-[9px]">Pilih Kelas</label>
            <select
              value={filterClass}
              onChange={(e) => setFilterClass(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none"
            >
              <option value="Semua">Semua Kelas</option>
              <option value="Kelas IX-A">Kelas IX-A</option>
              <option value="Kelas VIII-B">Kelas VIII-B</option>
              <option value="Kelas VII-C">Kelas VII-C</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-400 block uppercase text-[9px]">Halaqah Guru</label>
            <select
              value={filterHalaqah}
              onChange={(e) => setFilterHalaqah(e.target.value)}
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none"
            >
              <option value="Semua">Semua Pembimbing</option>
              <option value="Ust Hamzah">Ustadz Hamzah</option>
              <option value="Ust Mansur">Ustadz Mansur</option>
              <option value="Ust Malik">Ustadz Malik</option>
            </select>
          </div>
        </div>
      </div>

      {/* Aggregate Metric Cards */}
      <div className="grid grid-cols-3 gap-2.5 text-center text-xs font-semibold">
        <div className="bg-emerald-50 dark:bg-emerald-950/25 p-3 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
          <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Setoran Baru</span>
          <span className="text-emerald-950 dark:text-emerald-400 text-sm font-black mt-1 block">{totalSetoran} Kali</span>
        </div>
        <div className="bg-amber-50 dark:bg-amber-950/25 p-3 rounded-2xl border border-amber-100 dark:border-amber-900/30">
          <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Murojaah</span>
          <span className="text-amber-700 dark:text-amber-400 text-sm font-black mt-1 block">{totalMurajaah} Juz</span>
        </div>
        <div className="bg-blue-50 dark:bg-blue-950/25 p-3 rounded-2xl border border-blue-100 dark:border-blue-900/30">
          <span className="text-slate-400 block text-[8px] uppercase tracking-wider">Tasmi / Imtihan</span>
          <span className="text-blue-950 dark:text-blue-400 text-sm font-black mt-1 block">{totalImtihan} Kali</span>
        </div>
      </div>

      {/* Targets vs Realization progress visualization */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-3.5">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider">Pencapaian Target Pondok</h4>
            <p className="text-[10px] text-slate-400 font-medium">Realisasi hafalan kumulatif santri terhadap target kurikulum semester.</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-slate-600">Realisasi Semester</span>
            <span className="text-[#064E3B] font-bold">120 Juz / 150 Juz (80%)</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-800 to-amber-600 h-full rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>

      {/* Mini Ranking Board */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-3">
        <h4 className="text-[11px] text-slate-800 dark:text-slate-200 font-extrabold uppercase tracking-wider flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-500 animate-pulse" />
          <span>Papan Peringkat Tahfidz</span>
        </h4>

        <div className="space-y-2">
          {santris.slice(0, 3).map((santri, idx) => (
            <div 
              key={santri.id}
              className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl text-xs font-semibold"
            >
              <div className="flex items-center space-x-2.5">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                  idx === 0 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  idx === 1 ? 'bg-slate-200 text-slate-800 border border-slate-300' :
                  'bg-[#f59e0b]/20 text-amber-900 border border-amber-300/30'
                }`}>
                  {idx + 1}
                </span>
                <div>
                  <h5 className="text-slate-800 dark:text-slate-100 font-bold text-xs">{santri.name}</h5>
                  <p className="text-[9px] text-slate-400">{santri.class}</p>
                </div>
              </div>

              <span className="font-mono text-emerald-800 dark:text-emerald-400 font-extrabold text-xs">{idx === 0 ? '30' : idx === 1 ? '12' : '8'} Juz</span>
            </div>
          ))}
        </div>
      </div>

      {/* Export Controls */}
      <div className="flex gap-3 text-xs font-bold text-slate-700">
        <button
          onClick={() => simulateExport('Excel')}
          disabled={isExporting}
          className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Download className="w-4 h-4 text-emerald-800" />
          <span>{isExporting ? 'Proses...' : 'Ekspor Excel'}</span>
        </button>

        <button
          onClick={() => simulateExport('PDF')}
          disabled={isExporting}
          className="flex-1 py-2.5 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
        >
          <Printer className="w-4 h-4 text-amber-600" />
          <span>{isExporting ? 'Proses...' : 'Ekspor PDF'}</span>
        </button>
      </div>

    </div>
  );
}
