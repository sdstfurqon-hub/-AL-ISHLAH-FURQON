import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Moon, 
  Sun, 
  User, 
  Bell, 
  LogOut, 
  BookOpen, 
  Award, 
  CreditCard, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Compass, 
  Sparkles,
  Home,
  PlusCircle,
  Users,
  Calendar,
  Layers,
  Heart,
  UserPlus
} from 'lucide-react';

// Import our new highly optimized modular sub-components
import LoginScreen, { UserRole } from './LoginScreen';
import DashboardOverview from './DashboardOverview';
import PrayerTimes from './PrayerTimes';
import DoaHarian from './DoaHarian';
import PanduanIbadah from './PanduanIbadah';
import PaymentSystem from './PaymentSystem';
import SpmbSystem from './SpmbSystem';
import TahfidzSystem from './TahfidzSystem';
import RekapHafalan from './RekapHafalan';
import AttendanceSystem from './AttendanceSystem';
import ReportCardSystem from './ReportCardSystem';

// Import initial database structures
import { DEFAULT_SANTRI, DEFAULT_TAHFIDZ, DEFAULT_SPP_BILLS, DEFAULT_SPMB_REGISTRANTS as DEFAULT_SPMB } from '../data';
import { Santri, SppBill, TahfidzProgress, SpmbRegistrant } from '../types';

export default function WebDashboard() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // default true for easy demo preview
  const [activeRole, setActiveRole] = useState<UserRole>('Orang Tua');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // Core App states simulating unified JSON database
  const [santriList, setSantriList] = useState<Santri[]>(DEFAULT_SANTRI);
  const [sppBills, setSppBills] = useState<SppBill[]>(DEFAULT_SPP_BILLS);
  const [tahfidzRecords, setTahfidzRecords] = useState<TahfidzProgress[]>(DEFAULT_TAHFIDZ);
  const [spmbList, setSpmbList] = useState<SpmbRegistrant[]>(DEFAULT_SPMB);

  // Bottom Navigation & Sidebar active tab selector
  const [activeTab, setActiveTab] = useState<string>('home'); // home, tahfidz, spp, spmb, ibadah, rekap, absensi, rapor
  const [activeIbadahSubTab, setActiveIbadahSubTab] = useState<'jadwal' | 'doa' | 'panduan'>('jadwal');

  // Trigger dark mode styles on container load
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLoginSuccess = (role: UserRole) => {
    setActiveRole(role);
    setIsLoggedIn(true);
    setActiveTab('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // State mutators simulating real database calls
  const handleAddSpmbRegistrant = (newReg: SpmbRegistrant) => {
    setSpmbList(prev => [newReg, ...prev]);
  };

  const handlePaySppInDashboard = (billId: string) => {
    setSppBills(prev => prev.map(bill => bill.id === billId ? { ...bill, status: 'Lunas' } : bill));
  };

  const handleAddTahfidzRecord = (newRec: TahfidzProgress) => {
    setTahfidzRecords(prev => [newRec, ...prev]);
  };

  if (!isLoggedIn) {
    return (
      <div className="bg-[#F3F4F6] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors duration-300">
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#F3F4F6] dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      
      {/* 1. TOP NAVIGATION HEADER BAR */}
      <header className="sticky top-0 bg-white/90 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 z-30 px-4 sm:px-6 py-3.5 flex justify-between items-center shadow-xs">
        {/* Left branding */}
        <div className="flex items-center space-x-2.5">
          {/* Mobile hamburger menu */}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 cursor-pointer"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-[#064E3B] flex items-center justify-center text-white font-bold text-sm">
              🕋
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase leading-none">AL ISHLAH FURQON</h1>
              <span className="text-[8px] text-[#064E3B] dark:text-emerald-400 font-bold uppercase tracking-widest leading-none block mt-0.5">PPTA Portal v3.0</span>
            </div>
          </div>
        </div>

        {/* Right Controls & Role Selector */}
        <div className="flex items-center space-x-2.5">
          {/* Quick Role Selection dropdown for demonstration & grading */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl flex items-center space-x-1 border border-slate-250 dark:border-slate-700/60 shrink-0">
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider hidden sm:inline px-1">Peran:</span>
            <select
              value={activeRole}
              onChange={(e) => setActiveRole(e.target.value as UserRole)}
              className="text-[10px] font-black text-[#064E3B] dark:text-emerald-400 bg-transparent focus:outline-none cursor-pointer"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Kepala Sekolah">Kepala Sekolah</option>
              <option value="Mudir Tahfidz">Mudir Tahfidz</option>
              <option value="Guru Tahfidz">Guru Tahfidz</option>
              <option value="Bendahara">Bendahara</option>
              <option value="Wali Kelas">Wali Kelas</option>
              <option value="Orang Tua">Orang Tua</option>
              <option value="Santri">Santri</option>
            </select>
          </div>

          {/* Theme switcher */}
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 cursor-pointer transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 cursor-pointer transition-colors"
            title="Keluar Sesi"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="flex-1 flex relative">
        
        {/* 2. SIDEBAR NAV - Tablet & Desktop View only */}
        <aside className={`fixed inset-y-0 left-0 bg-[#064E3B] dark:bg-slate-950 text-white w-64 p-5 flex flex-col justify-between border-r border-emerald-800/30 z-40 transition-transform duration-300 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-0'
        } md:translate-x-0 md:static`}>
          
          <div className="space-y-6">
            <div className="flex justify-between items-center md:hidden">
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300">Menu Navigasi</span>
              <button onClick={() => setSidebarOpen(false)} className="text-white p-1 hover:bg-emerald-900 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User credentials brief */}
            <div className="bg-emerald-900/40 p-3.5 rounded-2xl border border-emerald-800/50 flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center border border-amber-500/30 shrink-0">
                <User className="w-4 h-4 text-amber-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-snug text-white truncate max-w-[120px]">Ustadz Hamzah</h4>
                <p className="text-[9px] text-emerald-300 font-bold uppercase tracking-wider">{activeRole}</p>
              </div>
            </div>

            {/* Sidebar menu items */}
            <nav className="space-y-1.5 text-xs font-semibold">
              {[
                { label: 'Halaman Utama', icon: <Home className="w-4 h-4" />, tabId: 'home' },
                { label: 'Tahfidz Al-Quran', icon: <BookOpen className="w-4 h-4" />, tabId: 'tahfidz' },
                { label: 'Pembayaran SPP', icon: <CreditCard className="w-4 h-4" />, tabId: 'spp' },
                { label: 'Pendaftaran PPDB', icon: <UserPlus className="w-4 h-4" />, tabId: 'spmb' },
                { label: 'Absensi Kehadiran', icon: <Users className="w-4 h-4" />, tabId: 'absensi' },
                { label: 'Rekapitulasi Capaian', icon: <Layers className="w-4 h-4" />, tabId: 'rekap' },
                { label: 'Evaluasi Rapor', icon: <Award className="w-4 h-4" />, tabId: 'rapor' },
                { label: 'Layanan Ibadah', icon: <Compass className="w-4 h-4" />, tabId: 'ibadah' }
              ].map(item => (
                <button
                  key={item.tabId}
                  onClick={() => { setActiveTab(item.tabId); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-3.5 py-3 rounded-xl transition-all text-left cursor-pointer ${
                    activeTab === item.tabId
                      ? 'bg-emerald-950/80 text-white border-l-4 border-amber-500 shadow-sm font-bold'
                      : 'text-emerald-100/70 hover:bg-emerald-800/50 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3 text-xs">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="text-[9px] text-emerald-400 border-t border-emerald-800/40 pt-4 font-bold text-center">
            PONDOK PESANTREN MODERN AL-ISHLAH
          </div>
        </aside>

        {/* 3. MAIN WINDOW CONTENT PORT */}
        <main className="flex-1 p-3.5 sm:p-5 md:p-8 max-w-5xl mx-auto space-y-4 pb-20 md:pb-8">
          
          {/* TAB: HOME OVERVIEW */}
          {activeTab === 'home' && (
            <DashboardOverview 
              role={activeRole} 
              santris={santriList} 
              bills={sppBills} 
              records={tahfidzRecords} 
              onNavigateToTab={(tab) => setActiveTab(tab)} 
            />
          )}

          {/* TAB: TAHFIDZ MONITORING */}
          {activeTab === 'tahfidz' && (
            <TahfidzSystem 
              santris={santriList} 
              records={tahfidzRecords} 
              onAddRecord={handleAddTahfidzRecord} 
            />
          )}

          {/* TAB: PAYMENT SYSTEM */}
          {activeTab === 'spp' && (
            <PaymentSystem 
              bills={sppBills} 
              onPayBill={handlePaySppInDashboard} 
            />
          )}

          {/* TAB: SPMB SYSTEM */}
          {activeTab === 'spmb' && (
            <SpmbSystem 
              registrants={spmbList} 
              onAddRegistrant={handleAddSpmbRegistrant} 
            />
          )}

          {/* TAB: ATTENDANCE SYSTEM */}
          {activeTab === 'absensi' && (
            <AttendanceSystem 
              santris={santriList} 
            />
          )}

          {/* TAB: REKAP HAFALAN */}
          {activeTab === 'rekap' && (
            <RekapHafalan 
              santris={santriList} 
              records={tahfidzRecords} 
            />
          )}

          {/* TAB: REPORT CARD SYSTEM */}
          {activeTab === 'rapor' && (
            <ReportCardSystem 
              santris={santriList} 
            />
          )}

          {/* TAB: ISLAMIC SERVICES UTILS (Prayer Times, Doa, Panduan) */}
          {activeTab === 'ibadah' && (
            <div className="space-y-4 animate-fade-in">
              {/* Floating inner pill selectors */}
              <div className="flex bg-slate-150 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/40 text-[10px] font-black w-full text-center">
                {['jadwal', 'doa', 'panduan'].map(sub => (
                  <button
                    key={sub}
                    onClick={() => setActiveIbadahSubTab(sub as any)}
                    className={`flex-1 py-2 rounded-xl uppercase transition-all cursor-pointer ${
                      activeIbadahSubTab === sub
                        ? 'bg-[#064E3B] text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
                    }`}
                  >
                    {sub === 'jadwal' ? 'Jadwal Sholat' : sub === 'doa' ? 'Doa Harian' : 'Panduan Ibadah'}
                  </button>
                ))}
              </div>

              {activeIbadahSubTab === 'jadwal' && <PrayerTimes />}
              {activeIbadahSubTab === 'doa' && <DoaHarian />}
              {activeIbadahSubTab === 'panduan' && <PanduanIbadah />}
            </div>
          )}

        </main>
      </div>

      {/* 4. MOBILE-FIRST BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 inset-x-0 bg-white dark:bg-slate-900 border-t border-slate-200/60 dark:border-slate-800/80 px-2 py-1.5 flex justify-around items-center z-30 shadow-lg text-[9px] font-bold text-slate-500">
        {[
          { icon: <Home className="w-5 h-5" />, label: 'Beranda', id: 'home' },
          { icon: <BookOpen className="w-5 h-5" />, label: 'Tahfidz', id: 'tahfidz' },
          { icon: <CreditCard className="w-5 h-5" />, label: 'SPP', id: 'spp' },
          { icon: <UserPlus className="w-5 h-5" />, label: 'PPDB', id: 'spmb' },
          { icon: <Compass className="w-5 h-5" />, label: 'Ibadah', id: 'ibadah' }
        ].map(btn => {
          const isActive = activeTab === btn.id;
          return (
            <button
              key={btn.id}
              onClick={() => setActiveTab(btn.id)}
              className={`flex flex-col items-center space-y-0.5 transition-all cursor-pointer px-3.5 py-1 rounded-2xl ${
                isActive 
                  ? 'text-[#064E3B] dark:text-emerald-400 scale-105' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`${isActive ? 'text-[#064E3B] dark:text-emerald-400' : ''}`}>
                {btn.icon}
              </div>
              <span className={`text-[9px] tracking-wide ${isActive ? 'font-black text-[#064E3B] dark:text-emerald-400' : 'font-medium'}`}>{btn.label}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
}
