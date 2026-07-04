import React, { useState } from 'react';
import { 
  UserCheck, 
  QrCode, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Camera, 
  Sparkles,
  RefreshCw,
  Bell
} from 'lucide-react';
import { Santri } from '../types';

interface AttendanceSystemProps {
  santris: Santri[];
}

interface AttendanceRecord {
  id: string;
  santriName: string;
  class: string;
  time: string;
  status: 'Hadir' | 'Sakit' | 'Izin' | 'Alfa';
}

export default function AttendanceSystem({ santris }: AttendanceSystemProps) {
  const [activeSubTab, setActiveSubTab] = useState<'daftar' | 'scan'>('daftar');
  const [scannedLogs, setScannedLogs] = useState<AttendanceRecord[]>([
    { id: 'att1', santriName: 'Ahmad Faiz Al-Fatih', class: 'Kelas IX-A', time: '06:45', status: 'Hadir' },
    { id: 'att2', santriName: 'M. Wildan Al-Ghazali', class: 'Kelas IX-A', time: '06:48', status: 'Hadir' },
    { id: 'att3', santriName: 'Fatimah Az-Zahra', class: 'Kelas VIII-B', time: '06:52', status: 'Hadir' },
  ]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanStatus, setScanStatus] = useState<string | null>(null);

  const simulateQrScan = () => {
    setIsScanning(true);
    setScanStatus('Mengaktifkan lensa kamera simulator...');
    
    setTimeout(() => {
      setScanStatus('Mencari barcode / QR Code kartu santri...');
    }, 1200);

    setTimeout(() => {
      const luckySantri = santris[Math.floor(Math.random() * santris.length)];
      
      const newLog: AttendanceRecord = {
        id: `att${Date.now()}`,
        santriName: luckySantri.name,
        class: luckySantri.class,
        time: new Date().toTimeString().split(' ')[0].slice(0, 5),
        status: 'Hadir'
      };

      setScannedLogs(prev => [newLog, ...prev]);
      setScanStatus(`Berhasil Memindai! ${luckySantri.name} terdaftar: Hadir.`);
      setIsScanning(false);
      
      setTimeout(() => setScanStatus(null), 3000);
    }, 2800);
  };

  return (
    <div className="space-y-4" id="attendance-system-module">
      
      {/* Tab Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/50 text-xs font-bold w-full">
        <button
          onClick={() => setActiveSubTab('daftar')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'daftar'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Rekap Absensi Harian</span>
        </button>

        <button
          onClick={() => setActiveSubTab('scan')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'scan'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Scan Kartu QR</span>
        </button>
      </div>

      {activeSubTab === 'daftar' && (
        <div className="space-y-4 animate-fade-in">
          {/* Absensi summaries */}
          <div className="grid grid-cols-4 gap-2 text-center text-xs font-semibold">
            <div className="bg-emerald-50 dark:bg-emerald-950/25 p-2 rounded-xl border border-emerald-100">
              <span className="text-slate-400 text-[8px] uppercase tracking-wider block">Hadir</span>
              <span className="text-emerald-900 dark:text-emerald-400 font-extrabold text-xs block mt-0.5">96%</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/25 p-2 rounded-xl border border-amber-100">
              <span className="text-slate-400 text-[8px] uppercase tracking-wider block">Izin</span>
              <span className="text-amber-800 dark:text-amber-400 font-extrabold text-xs block mt-0.5">2%</span>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/25 p-2 rounded-xl border border-blue-100">
              <span className="text-slate-400 text-[8px] uppercase tracking-wider block">Sakit</span>
              <span className="text-blue-900 dark:text-blue-400 font-extrabold text-xs block mt-0.5">1%</span>
            </div>
            <div className="bg-red-50 dark:bg-red-950/25 p-2 rounded-xl border border-red-100">
              <span className="text-slate-400 text-[8px] uppercase tracking-wider block">Alfa</span>
              <span className="text-red-900 dark:text-red-400 font-extrabold text-xs block mt-0.5">1%</span>
            </div>
          </div>

          {/* Scanned attendance Log */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 px-1 block">Presensi Santri Hari Ini</span>
            
            {scannedLogs.map(log => (
              <div 
                key={log.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-4 flex justify-between items-center text-xs font-semibold shadow-xs"
              >
                <div>
                  <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">{log.santriName}</h4>
                  <p className="text-[10px] text-slate-400">{log.class} &bull; Masuk: {log.time}</p>
                </div>

                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-50 text-emerald-800 border border-emerald-100">
                  {log.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'scan' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 text-center space-y-4 animate-fade-in">
          <div>
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm uppercase flex items-center justify-center gap-1.5">
              <Camera className="w-5 h-5 text-emerald-700" />
              <span>Simulasi Scan Kartu Santri</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">Dekatkan barcode kartu digital atau cetak santri pada kamera pemindai gerbang asrama.</p>
          </div>

          {/* Interactive view finder with green scanner line */}
          <div className="relative w-48 h-48 rounded-3xl border-4 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 mx-auto overflow-hidden flex flex-col items-center justify-center">
            {isScanning && (
              /* Scanning laser line */
              <div className="absolute top-0 inset-x-0 h-1 bg-green-500 shadow-lg shadow-green-500/80 animate-scan z-20"></div>
            )}
            
            <QrCode className={`w-16 h-16 ${isScanning ? 'text-green-500 scale-110 transition-transform duration-1000' : 'text-slate-300'}`} />
            
            {isScanning && (
              <span className="absolute bottom-2 text-[8px] font-mono text-green-500 animate-pulse uppercase tracking-wider">Kamera Aktif...</span>
            )}
          </div>

          {scanStatus && (
            <div className="bg-emerald-50 text-emerald-950 border border-emerald-150 p-3 rounded-2xl text-[10px] font-bold leading-relaxed max-w-xs mx-auto">
              {scanStatus}
            </div>
          )}

          <button
            onClick={simulateQrScan}
            disabled={isScanning}
            className="w-full max-w-xs py-3 bg-[#064E3B] hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all uppercase tracking-wider cursor-pointer"
          >
            {isScanning ? 'Membaca Kode...' : 'Mulai Pindai Kartu'}
          </button>
        </div>
      )}

    </div>
  );
}
