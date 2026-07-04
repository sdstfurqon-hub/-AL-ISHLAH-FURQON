import React, { useState } from 'react';
import { 
  Award, 
  Download, 
  FileText, 
  User, 
  CheckCircle, 
  TrendingUp, 
  Star,
  Printer
} from 'lucide-react';
import { Santri } from '../types';

interface ReportCardSystemProps {
  santris: Santri[];
}

export default function ReportCardSystem({ santris }: ReportCardSystemProps) {
  const [selectedStudentId, setSelectedStudentId] = useState<string>('s1');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  const activeSantri = santris.find(s => s.id === selectedStudentId) || santris[0];

  const handleDownloadRapor = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert(`Berkas PDF Rapor Hasil Belajar untuk ${activeSantri.name} berhasil diunduh.`);
    }, 1500);
  };

  return (
    <div className="space-y-4" id="report-card-system-module">
      
      {/* Student Selector Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2.5">
          <User className="w-4 h-4 text-[#064E3B]" />
          <div>
            <span className="text-slate-400 block text-[9px] uppercase">Rapor Santri</span>
            <select
              value={selectedStudentId}
              onChange={(e) => setSelectedStudentId(e.target.value)}
              className="font-extrabold text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer text-sm"
            >
              {santris.map(s => (
                <option key={s.id} value={s.id}>{s.name} - {s.class}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Rapor Transcript Details */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 uppercase tracking-wider">Lembar Evaluasi Semester</h4>
          <span className="text-[9px] text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded border border-amber-200 uppercase font-bold">Ganjil 2026</span>
        </div>

        {/* Scoring Matrix */}
        <div className="space-y-3">
          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider">Capaian & Kelayakan</span>
          
          <div className="space-y-2 text-xs font-semibold">
            {/* Tajwid & Makhraj */}
            <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-600 dark:text-slate-300">Tajwid & Makhraj</span>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-800 dark:text-emerald-400 font-extrabold text-sm font-mono">92</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black uppercase">Sangat Baik</span>
              </div>
            </div>

            {/* Kelancaran (Fluent) */}
            <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-600 dark:text-slate-300">Kelancaran Hafalan</span>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-800 dark:text-emerald-400 font-extrabold text-sm font-mono">94</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black uppercase">Sangat Baik</span>
              </div>
            </div>

            {/* Adab */}
            <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-600 dark:text-slate-300">Adab & Akhlaq Belajar</span>
              <div className="flex items-center space-x-2">
                <span className="text-emerald-800 dark:text-emerald-400 font-extrabold text-sm font-mono">96</span>
                <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-black uppercase">Istimewa</span>
              </div>
            </div>

            {/* Ibadah Harian */}
            <div className="flex justify-between items-center p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
              <span className="text-slate-600 dark:text-slate-300">Kedisiplinan Sholat Jamaah</span>
              <div className="flex items-center space-x-2">
                <span className="text-amber-800 dark:text-amber-400 font-extrabold text-sm font-mono">88</span>
                <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-black uppercase">Baik</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes from headmaster / mudir */}
        <div className="bg-amber-50/50 border border-amber-200/40 p-4 rounded-2xl space-y-2 text-xs font-semibold">
          <span className="text-[9px] text-amber-800 uppercase block tracking-wider">Catatan Mudir Tahfidz</span>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium italic">"MasyaAllah, ananda menunjukkan semangat tinggi dalam menyetorkan juz-juz awal. Kelancaran mad thabi'i dan ketukan dengung sangat mumpuni. Pertahankan tajwid yang baik di semester mendatang."</p>
        </div>

        {/* PDF transcript generator triggers */}
        <button
          onClick={handleDownloadRapor}
          disabled={isDownloading}
          className="w-full py-3 bg-[#064E3B] hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>{isDownloading ? 'Menghasilkan Berkas...' : 'Unduh Transkrip Rapor (PDF)'}</span>
        </button>
      </div>

    </div>
  );
}
