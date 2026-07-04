import React, { useState } from 'react';
import { 
  Award, 
  Calendar, 
  Heart, 
  BookOpen, 
  TrendingUp, 
  Sparkles, 
  User, 
  Bell, 
  DollarSign,
  UserCheck,
  ChevronRight,
  Clock,
  BookMarked
} from 'lucide-react';
import { Santri, SppBill, TahfidzProgress } from '../types';

interface DashboardOverviewProps {
  role: string;
  santris: Santri[];
  bills: SppBill[];
  records: TahfidzProgress[];
  onNavigateToTab: (tab: string) => void;
}

const ISLAMIC_QUOTES = [
  { text: "Sebaik-baik kalian adalah orang yang belajar Al-Qur'an dan mengajarkannya.", source: "HR. Bukhari" },
  { text: "Bacalah Al-Qur'an, karena ia akan datang pada hari kiamat sebagai syafaat bagi pembacanya.", source: "HR. Muslim" },
  { text: "Hati yang di dalamnya tidak ada Al-Qur'an ibarat rumah yang runtuh.", source: "HR. Tirmidzi" }
];

export default function DashboardOverview({ role, santris, bills, records, onNavigateToTab }: DashboardOverviewProps) {
  const [quoteIndex] = useState(() => Math.floor(Math.random() * ISLAMIC_QUOTES.length));
  const activeQuote = ISLAMIC_QUOTES[quoteIndex];

  // Hijri Calendar Calculations (Mocked for 1448 H)
  const hijriDate = "09 Muharram 1448 H";
  const gregorianDate = "Sabtu, 4 Juli 2026";

  // Calculations
  const pendingBillsCount = bills.filter(b => b.status === 'Pending').length;
  const recentRecords = records.slice(0, 3);

  return (
    <div className="space-y-4" id="dashboard-overview-module">
      
      {/* Dynamic Time & Hijri Greeting Widget */}
      <div className="bg-gradient-to-r from-emerald-950 via-[#064E3B] to-amber-800 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-6 -mt-6"></div>
        <div className="relative z-10 space-y-2.5">
          <div className="flex justify-between items-center text-xs font-semibold">
            <span className="bg-amber-500/30 text-amber-200 text-[9px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full border border-amber-400/20">
              {hijriDate}
            </span>
            <span className="text-emerald-200">{gregorianDate}</span>
          </div>

          <div className="space-y-0.5">
            <h2 className="text-base sm:text-lg font-black text-white">Assalamualaikum, r/Akses {role}!</h2>
            <p className="text-[10px] sm:text-xs text-emerald-100 font-semibold leading-relaxed">
              Selamat datang di Portal PPTA Al-Ishlah Furqon. Mari awali pagi ini dengan membaca Juz Amma.
            </p>
          </div>
        </div>
      </div>

      {/* Islamic Daily Quote Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-1.5 border-l-4 border-amber-500">
        <span className="text-[9px] text-amber-800 font-extrabold uppercase tracking-wider block">Kutipan Hadits Hari Ini</span>
        <p className="text-[11px] text-slate-600 dark:text-slate-300 font-semibold italic leading-relaxed">
          "{activeQuote.text}"
        </p>
        <span className="text-[9px] text-slate-400 block font-bold">- {activeQuote.source}</span>
      </div>

      {/* Quick Action Hub */}
      <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold">
        {[
          { label: 'Jadwal Sholat', icon: '🕌', tab: 'sholat' },
          { label: 'Setor Tahfidz', icon: '📖', tab: 'tahfidz' },
          { label: 'Bayar SPP', icon: '💳', tab: 'spp' },
          { label: 'Presensi', icon: '✅', tab: 'absensi' }
        ].map(act => (
          <button
            key={act.label}
            onClick={() => onNavigateToTab(act.tab)}
            className="p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center space-y-1 group"
          >
            <span className="text-xl group-hover:scale-110 transition-transform">{act.icon}</span>
            <span className="text-slate-700 dark:text-slate-300 truncate max-w-full leading-tight font-semibold">{act.label}</span>
          </button>
        ))}
      </div>

      {/* ROLE SPECIFIC INTERACTIVE PANELS */}
      
      {/* Role 1: Wali / Orang Tua / Santri View */}
      {(role === 'Orang Tua' || role === 'Santri') && (
        <div className="space-y-3.5">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1 block">Pantauan Utama Ananda</span>
          
          {/* Quick billing status widget */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex justify-between items-center text-xs font-semibold shadow-xs">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center font-bold">💳</div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">Tagihan Belum Lunas</h4>
                <p className="text-[10px] text-slate-400 font-medium">Selesaikan sebelum tanggal jatuh tempo</p>
              </div>
            </div>
            
            <button 
              onClick={() => onNavigateToTab('spp')}
              className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200 hover:bg-amber-100"
            >
              Bayar ({pendingBillsCount})
            </button>
          </div>

          {/* Quick tahfidz review */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                <BookMarked className="w-4 h-4 text-emerald-700" />
                <span>Riwayat Setoran Hafalan</span>
              </h4>
              <button onClick={() => onNavigateToTab('tahfidz')} className="text-[10px] text-[#064E3B] font-extrabold">Lihat Semua</button>
            </div>

            <div className="space-y-2">
              {recentRecords.map(rec => (
                <div key={rec.id} className="flex justify-between items-center text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                  <span>QS. {rec.surahName} (Juz {rec.juz})</span>
                  <span className="font-mono text-slate-800 dark:text-slate-100 font-bold">{rec.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Role 2: Staff / Admin / Ustadz Panels */}
      {(role !== 'Orang Tua' && role !== 'Santri') && (
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1 block">Metrik Aktivitas Sekolah</span>

          <div className="grid grid-cols-2 gap-3.5 text-center text-xs font-semibold">
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl shadow-xs space-y-1">
              <span className="text-slate-400 text-[9px] uppercase tracking-wider block">Santri Mengantri</span>
              <span className="text-[#064E3B] text-base font-black block">12 Santri</span>
              <span className="text-[8px] text-slate-400 font-medium block">Pembimbing: Ustadz Hamzah</span>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-3xl shadow-xs space-y-1">
              <span className="text-slate-400 text-[9px] uppercase tracking-wider block">Capaian Kelas Hari Ini</span>
              <span className="text-emerald-700 text-base font-black block">88 Ayat</span>
              <span className="text-[8px] text-emerald-600 font-bold block">100% Target Tercapai</span>
            </div>
          </div>
        </div>
      )}

      {/* Hijri School Agenda */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 shadow-xs space-y-3">
        <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-[#064E3B]" />
          <span>Agenda & Libur Sekolah</span>
        </h4>

        <div className="space-y-2.5 text-xs font-semibold">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
              <span className="text-slate-700 dark:text-slate-300">Imtihan Semester Ganjil</span>
            </div>
            <span className="text-[9px] text-slate-400 font-bold">12 Juli 2026</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-emerald-700 rounded-full"></span>
              <span className="text-slate-700 dark:text-slate-300">Hari Tasmi Akbar Juz 30</span>
            </div>
            <span className="text-[9px] text-slate-400 font-bold">18 Juli 2026</span>
          </div>
        </div>
      </div>

    </div>
  );
}
