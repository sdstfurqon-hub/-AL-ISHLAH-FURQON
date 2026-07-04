import React, { useState } from 'react';
import { 
  Smartphone, 
  Tablet as TabletIcon, 
  BookOpen, 
  CreditCard, 
  ChevronRight, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  Award,
  DollarSign,
  UserCheck,
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';
import { Santri, TahfidzProgress, SppBill } from '../types';
import { DEFAULT_SANTRI, DEFAULT_TAHFIDZ, DEFAULT_SPP_BILLS } from '../data';

export default function FlutterSimulator() {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet'>('mobile');
  const [currentScreen, setCurrentScreen] = useState<'tahfidz' | 'spp'>('tahfidz');
  
  // State variables replicating Dart AppStateController
  const [santris] = useState<Santri[]>(DEFAULT_SANTRI);
  const [tahfidzRecords, setTahfidzRecords] = useState<TahfidzProgress[]>(DEFAULT_TAHFIDZ);
  const [sppBills, setSppBills] = useState<SppBill[]>(DEFAULT_SPP_BILLS);
  
  // Mobile UI selected/expanded record
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>('t1');
  
  // Tablet UI selected record
  const [selectedSantriIndex, setSelectedSantriIndex] = useState<number>(0);
  
  // Payment Modal state
  const [payingBill, setPayingBill] = useState<SppBill | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Helper calculation
  const totalPendingSpp = sppBills
    .filter(b => b.status === 'Pending')
    .reduce((sum, b) => sum + b.amount, 0);

  // Handle bill payment simulator
  const handlePayBill = (bill: SppBill) => {
    setPayingBill(bill);
    setIsProcessingPayment(false);
  };

  const confirmPayment = () => {
    if (!payingBill) return;
    setIsProcessingPayment(true);
    
    setTimeout(() => {
      setSppBills(prev => prev.map(b => b.id === payingBill.id ? { ...b, status: 'Lunas' } : b));
      setPayingBill(null);
      setIsProcessingPayment(false);
    }, 1500);
  };

  const formatCurrency = (amount: number) => {
    return 'Rp ' + amount.toLocaleString('id-ID');
  };

  // Simulated device time
  const simulatedTime = "06.55";

  return (
    <div className="space-y-6" id="flutter-simulator-container">
      {/* Simulation Controls & Info Banner */}
      <div className="bg-[#064E3B] text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border border-emerald-800/40">
        <div>
          <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-700/50">
            Interactive Flutter Emulator
          </span>
          <h2 className="text-xl font-bold mt-2.5 text-white">Simulator Aplikasi Mobile & Tablet</h2>
          <p className="text-xs text-emerald-200">
            Uji responsivitas, navigasi, dan logika pembayaran SPP interaktif pada perangkat Android.
          </p>
        </div>

        {/* Device selector buttons */}
        <div className="flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-700/30 self-stretch md:self-auto justify-center space-x-1">
          <button 
            onClick={() => setDeviceType('mobile')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceType === 'mobile' 
                ? 'bg-[#D97706] text-white shadow-sm' 
                : 'text-emerald-100/75 hover:bg-emerald-800/50 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>Ponsel Android (HP)</span>
          </button>
          <button 
            onClick={() => setDeviceType('tablet')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              deviceType === 'tablet' 
                ? 'bg-[#D97706] text-white shadow-sm' 
                : 'text-emerald-100/75 hover:bg-emerald-800/50 hover:text-white'
            }`}
          >
            <TabletIcon className="w-4 h-4" />
            <span>Tablet Android</span>
          </button>
        </div>
      </div>

      {/* Main simulator frame container */}
      <div className="flex justify-center items-center py-6 bg-slate-100 rounded-3xl border border-slate-200 shadow-inner relative overflow-hidden">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

        {/* Simulated Device Frame */}
        <div 
          className={`bg-slate-950 p-2 sm:p-4 rounded-[40px] shadow-2xl border-4 border-slate-800 transition-all duration-500 relative z-10 ${
            deviceType === 'mobile' 
              ? 'w-full max-w-[375px] h-[660px] sm:h-[740px]' 
              : 'w-full max-w-[900px] h-[500px] sm:h-[640px]'
          }`}
        >
          {/* Mobile Notch Speaker */}
          {deviceType === 'mobile' && (
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full flex justify-center items-center space-x-2 border border-slate-800/80 z-40">
              <span className="w-8 h-1 bg-slate-700 rounded-full"></span>
              <span className="w-2.5 h-2.5 bg-slate-800 rounded-full"></span>
            </div>
          )}

          {/* Device Screen Area */}
          <div className="w-full h-full bg-slate-50 rounded-[28px] overflow-hidden flex flex-col relative text-slate-800">
            
            {/* 1. Simulated Android OS Status Bar */}
            <div className="bg-emerald-950 text-emerald-200 text-[10px] px-5 py-2 flex justify-between items-center select-none shrink-0 z-30 font-medium">
              <span>{simulatedTime}</span>
              <div className="flex items-center space-x-1.5">
                <span className="text-[9px] font-mono tracking-widest text-emerald-300">LTE</span>
                {/* Simulated battery bar */}
                <div className="w-5 h-2.5 border border-emerald-300/60 rounded-sm p-[1px] flex items-center">
                  <div className="w-4 h-full bg-emerald-400 rounded-2xs"></div>
                </div>
              </div>
            </div>

            {/* 2. Flutter Custom AppBar */}
            <div className="bg-[#064E3B] text-white px-5 py-4 flex justify-between items-center shrink-0 shadow-sm z-20">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-[13px] font-extrabold tracking-wide uppercase text-white">PPTA Tahfidz & Pay</h3>
                  <p className="text-[9px] text-emerald-200">v3.0 - Mobile Portal</p>
                </div>
              </div>
              <span className="text-[10px] font-semibold bg-emerald-900/60 text-amber-400 px-2 py-0.5 rounded border border-emerald-800/80 uppercase">
                {currentScreen === 'tahfidz' ? 'Tahfidz Tracker' : 'SPP Billing'}
              </span>
            </div>

            {/* 3. Screen content goes here (Main Viewport) */}
            <div className="flex-1 overflow-y-auto">
              
              {/* SCREEN 1: TAHFIDZ PROGRESS SCREEN */}
              {currentScreen === 'tahfidz' && (
                <div className="h-full flex flex-col">
                  {deviceType === 'mobile' ? (
                    // MOBILE LAYOUT: List vertical progress hafalan with expandable drawer
                    <div className="p-4 space-y-3">
                      <div className="flex justify-between items-center px-1">
                        <span className="text-xs font-bold text-slate-700">Daftar Setoran Hafalan</span>
                        <span className="text-[10px] font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Bulan Ini</span>
                      </div>

                      <div className="space-y-3">
                        {tahfidzRecords.map(record => {
                          const isExpanded = expandedRecordId === record.id;
                          return (
                            <div 
                              key={record.id} 
                              className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300"
                            >
                              {/* Header element click to expand/collapse */}
                              <div 
                                onClick={() => setExpandedRecordId(isExpanded ? null : record.id)}
                                className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-slate-50/60"
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-900 flex items-center justify-center font-bold text-xs border border-emerald-100">
                                    Jz {record.juz}
                                  </div>
                                  <div>
                                    <h4 className="text-xs font-bold text-slate-800">{record.santriName}</h4>
                                    <p className="text-[10px] text-slate-500">QS. {record.surahName} (Ayat {record.startAyat}-{record.endAyat})</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                                </div>
                              </div>

                              {/* Expanded items details (Flutter expansiontile style) */}
                              {isExpanded && (
                                <div className="px-4 pb-4 pt-1 bg-slate-50/50 border-t border-slate-100 text-[11px] space-y-3">
                                  <div className="grid grid-cols-2 gap-2 pt-2">
                                    <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-3xs">
                                      <p className="text-[9px] text-slate-400 uppercase font-semibold">Skor Tajwid</p>
                                      <p className="text-xs font-bold text-emerald-700">{record.tajwidScore} / 100</p>
                                    </div>
                                    <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-3xs">
                                      <p className="text-[9px] text-slate-400 uppercase font-semibold">Kelancaran</p>
                                      <p className="text-xs font-bold text-amber-600">{record.fluentScore} / 100</p>
                                    </div>
                                  </div>

                                  <div className="space-y-1 bg-white p-2.5 rounded-lg border border-slate-100">
                                    <p className="text-[9px] font-semibold text-slate-400 uppercase">Catatan Ustadz</p>
                                    <p className="text-[11px] italic text-slate-700 font-medium">"{record.notes}"</p>
                                  </div>

                                  <div className="flex justify-between items-center text-[9px] text-slate-400 px-1 pt-1 font-medium">
                                    <span>Penyimak: {record.ustadzName}</span>
                                    <span>Setor: {record.date}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    // TABLET LAYOUT: Split Screen (Left master, Right detail grafis bar chart)
                    <div className="h-full flex divide-x divide-slate-200 bg-white">
                      {/* Left: Master List of Students */}
                      <div className="w-1/3 h-full overflow-y-auto bg-slate-50/50">
                        <div className="p-4 border-b border-slate-100 bg-white">
                          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">Daftar Santri Binaan</p>
                        </div>
                        <div className="divide-y divide-slate-100">
                          {tahfidzRecords.map((record, index) => {
                            const isSelected = selectedSantriIndex === index;
                            return (
                              <div
                                key={record.id}
                                onClick={() => setSelectedSantriIndex(index)}
                                className={`p-4 flex items-center space-x-3 cursor-pointer transition-all ${
                                  isSelected 
                                    ? 'bg-emerald-900/10 border-l-4 border-emerald-900' 
                                    : 'hover:bg-slate-100/50'
                                }`}
                              >
                                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                                  isSelected ? 'bg-emerald-900 text-white' : 'bg-slate-200 text-slate-700'
                                }`}>
                                  Jz{record.juz}
                                </div>
                                <div className="truncate">
                                  <p className={`text-xs font-bold ${isSelected ? 'text-emerald-950' : 'text-slate-800'}`}>
                                    {record.santriName}
                                  </p>
                                  <p className="text-[10px] text-slate-500">QS. {record.surahName}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Right: Splitted Detail & Progress Bar Chart */}
                      <div className="flex-1 h-full overflow-y-auto p-6 space-y-5 bg-slate-50/40">
                        <div>
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="text-sm font-extrabold text-emerald-950">
                                {tahfidzRecords[selectedSantriIndex]?.santriName}
                              </h4>
                              <p className="text-[10px] text-slate-500">Detail Capaian Target & Statistik Hafalan</p>
                            </div>
                            <Award className="w-5 h-5 text-amber-500" />
                          </div>
                        </div>

                        {/* Metric score blocks */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white p-3.5 rounded-xl border border-slate-150 shadow-3xs flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                              <BookOpen className="w-4 h-4 text-emerald-800" />
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Nilai Tajwid</p>
                              <p className="text-sm font-extrabold text-emerald-900">
                                {tahfidzRecords[selectedSantriIndex]?.tajwidScore}
                              </p>
                            </div>
                          </div>

                          <div className="bg-white p-3.5 rounded-xl border border-slate-150 shadow-3xs flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-amber-500" />
                            </div>
                            <div>
                              <p className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">Kelancaran</p>
                              <p className="text-sm font-extrabold text-amber-600">
                                {tahfidzRecords[selectedSantriIndex]?.fluentScore}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Simulated Flutter Bar Chart */}
                        <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-3xs space-y-3">
                          <h5 className="text-[11px] font-bold text-slate-700">Grafik Pencapaian Target Juz (Aktif)</h5>
                          <div className="flex items-end justify-around h-32 pt-4 px-2">
                            {/* Juz 30 Bar */}
                            <div className="flex flex-col items-center space-y-1.5 w-1/4">
                              <div className="w-6 bg-slate-100 rounded-t-sm h-24 relative flex items-end">
                                <div className="w-full bg-emerald-900 rounded-t-sm h-full shadow-inner"></div>
                              </div>
                              <span className="text-[9px] font-bold text-emerald-950">Juz 30</span>
                            </div>

                            {/* Juz 29 Bar */}
                            <div className="flex flex-col items-center space-y-1.5 w-1/4">
                              <div className="w-6 bg-slate-100 rounded-t-sm h-24 relative flex items-end">
                                <div className="w-full bg-emerald-900 rounded-t-sm h-4/5 shadow-inner"></div>
                              </div>
                              <span className="text-[9px] font-bold text-emerald-950">Juz 29</span>
                            </div>

                            {/* Juz 28 Bar */}
                            <div className="flex flex-col items-center space-y-1.5 w-1/4">
                              <div className="w-6 bg-slate-100 rounded-t-sm h-24 relative flex items-end">
                                <div className="w-full bg-amber-500/40 rounded-t-sm h-2/5"></div>
                              </div>
                              <span className="text-[9px] text-slate-400">Juz 28</span>
                            </div>

                            {/* Juz 27 Bar */}
                            <div className="flex flex-col items-center space-y-1.5 w-1/4">
                              <div className="w-6 bg-slate-100 rounded-t-sm h-24 relative flex items-end">
                                <div className="w-full bg-amber-500/10 rounded-t-sm h-1/12"></div>
                              </div>
                              <span className="text-[9px] text-slate-400">Juz 27</span>
                            </div>
                          </div>
                        </div>

                        {/* Recitation notes card */}
                        <div className="bg-white p-4 rounded-xl border border-slate-150 shadow-3xs space-y-2">
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Evaluasi Penyimak</p>
                          <p className="text-xs italic text-slate-700">
                            "{tahfidzRecords[selectedSantriIndex]?.notes}"
                          </p>
                          <div className="border-t border-slate-100 pt-2 flex justify-between text-[9px] text-slate-400">
                            <span>Oleh: {tahfidzRecords[selectedSantriIndex]?.ustadzName}</span>
                            <span>{tahfidzRecords[selectedSantriIndex]?.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SCREEN 2: SPP PAYMENT SCREEN */}
              {currentScreen === 'spp' && (
                <div className="p-4 space-y-4">
                  
                  {/* Bill Summary Box (Flutter Glassmorphic Simulation) */}
                  <div className="bg-gradient-to-tr from-[#064E3B] to-[#043d2e] rounded-2xl p-4.5 text-white shadow-md relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>
                    <span className="text-[9px] uppercase tracking-widest text-emerald-200 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
                      Keuangan Wali Santri
                    </span>
                    <p className="text-[11px] text-emerald-100/80 mt-3">Total Tagihan Belum Dibayar</p>
                    <p className="text-xl font-black text-white mt-1">{formatCurrency(totalPendingSpp)}</p>
                    
                    <div className="mt-3 flex items-center space-x-2 bg-amber-600/20 border border-amber-500/30 p-2 rounded-lg text-[10px] text-amber-300 font-semibold">
                      <Info className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>Jatuh tempo setiap tanggal 10 bulan berjalan.</span>
                    </div>
                  </div>

                  {/* Active Bills Section */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-center px-1">
                      <span className="text-xs font-bold text-slate-700">Daftar Tagihan Aktif</span>
                      <span className="text-[10px] text-slate-400 font-medium">Bulan Juli 2026</span>
                    </div>

                    <div className="space-y-2.5">
                      {sppBills.map(bill => {
                        const isLunas = bill.status === 'Lunas';
                        return (
                          <div 
                            key={bill.id} 
                            className="bg-white p-3.5 rounded-xl border border-slate-100 shadow-3xs flex justify-between items-center text-xs"
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${isLunas ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                                <CheckCircle className="w-4 h-4" />
                              </div>
                              <div>
                                <h4 className="font-bold text-slate-800">{bill.category}</h4>
                                <p className="text-[10px] text-slate-500">{bill.month} {bill.year}</p>
                                <p className="text-[9px] text-red-500 font-semibold">Jatuh Tempo: {bill.dueDate}</p>
                              </div>
                            </div>

                            <div className="text-right space-y-1.5">
                              <p className="font-extrabold text-slate-900 text-xs">{formatCurrency(bill.amount)}</p>
                              {isLunas ? (
                                <span className="inline-block text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                  Lunas
                                </span>
                              ) : (
                                <button
                                  onClick={() => handlePayBill(bill)}
                                  className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded text-[10px] transition-all cursor-pointer shadow-3xs"
                                >
                                  Bayar
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* 4. Simulated Bottom Navigation Bar (Flutter style) */}
            <div className="bg-white border-t border-slate-200 py-2.5 px-6 flex justify-around items-center shrink-0 z-30 shadow-lg">
              <button 
                onClick={() => setCurrentScreen('tahfidz')}
                className={`flex flex-col items-center space-y-1 cursor-pointer transition-all ${
                  currentScreen === 'tahfidz' ? 'text-emerald-900 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <BookOpen className="w-5 h-5" />
                <span className="text-[9px]">Tahfidz</span>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('spp')}
                className={`flex flex-col items-center space-y-1 cursor-pointer transition-all ${
                  currentScreen === 'spp' ? 'text-emerald-900 font-bold' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span className="text-[9px]">Bayar SPP</span>
              </button>
            </div>

          </div>

          {/* Secure Payment Gateway Simulating Modal overlay inside the screen */}
          {payingBill && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-3xs rounded-[28px] m-4 flex items-center justify-center p-6 z-50">
              <div className="bg-white rounded-2xl w-full p-5 space-y-4 border border-slate-100 shadow-xl max-w-sm">
                <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-800">
                    <DollarSign className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800">PPTA Pay Gateway</h4>
                    <p className="text-[9px] text-slate-500">Virtual Account Integration</p>
                  </div>
                </div>

                <div className="text-xs space-y-2">
                  <p className="text-slate-500 font-medium">Anda akan mensimulasikan pembayaran untuk:</p>
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-medium">
                    <p className="font-bold text-slate-800">{payingBill.category}</p>
                    <p className="text-[10px] text-slate-500">Bulan {payingBill.month} {payingBill.year}</p>
                    <p className="font-extrabold text-slate-900 mt-1 text-sm">{formatCurrency(payingBill.amount)}</p>
                  </div>
                </div>

                {isProcessingPayment ? (
                  <div className="py-4 flex flex-col items-center space-y-3">
                    <div className="w-8 h-8 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-[10px] font-bold text-emerald-900 animate-pulse">Memproses Pembayaran Aman...</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                    <button
                      onClick={() => setPayingBill(null)}
                      className="w-full py-2 border border-slate-200 rounded-lg font-bold text-slate-600 hover:bg-slate-50 cursor-pointer text-center"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmPayment}
                      className="w-full py-2 bg-[#064E3B] hover:bg-[#053d2e] text-white font-bold rounded-lg shadow-sm cursor-pointer text-center"
                    >
                      Bayar Sekarang
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
