import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Bell, 
  BellOff, 
  ChevronRight, 
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface SholatTime {
  name: string;
  time: string;
  icon: string;
}

export default function PrayerTimes() {
  const [selectedCity, setSelectedCity] = useState<string>('Surabaya');
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentKiblatAngle, setCurrentKiblatAngle] = useState<number>(294); // Kiblat angle for Indonesia
  const [compassHeading, setCompassHeading] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<string>('01:45:20');
  const [nextSholat, setNextSholat] = useState<string>('Ashar');

  // Simulated Sholat Schedules based on city
  const sholatSchedules: Record<string, SholatTime[]> = {
    Surabaya: [
      { name: 'Imsak', time: '04:09', icon: '🌅' },
      { name: 'Subuh', time: '04:19', icon: '🕌' },
      { name: 'Dzuhur', time: '11:35', icon: '☀️' },
      { name: 'Ashar', time: '14:55', icon: '⛅' },
      { name: 'Maghrib', time: '17:28', icon: '🌇' },
      { name: 'Isya', time: '18:42', icon: '🌙' },
    ],
    Jakarta: [
      { name: 'Imsak', time: '04:26', icon: '🌅' },
      { name: 'Subuh', time: '04:36', icon: '🕌' },
      { name: 'Dzuhur', time: '11:53', icon: '☀️' },
      { name: 'Ashar', time: '15:14', icon: '⛅' },
      { name: 'Maghrib', time: '17:48', icon: '🌇' },
      { name: 'Isya', time: '19:01', icon: '🌙' },
    ],
    Medan: [
      { name: 'Imsak', time: '04:44', icon: '🌅' },
      { name: 'Subuh', time: '04:54', icon: '🕌' },
      { name: 'Dzuhur', time: '12:22', icon: '☀️' },
      { name: 'Ashar', time: '15:48', icon: '⛅' },
      { name: 'Maghrib', time: '18:31', icon: '🌇' },
      { name: 'Isya', time: '19:46', icon: '🌙' },
    ],
    Makassar: [
      { name: 'Imsak', time: '04:32', icon: '🌅' },
      { name: 'Subuh', time: '04:42', icon: '🕌' },
      { name: 'Dzuhur', time: '12:01', icon: '☀️' },
      { name: 'Ashar', time: '15:24', icon: '⛅' },
      { name: 'Maghrib', time: '17:59', icon: '🌇' },
      { name: 'Isya', time: '19:13', icon: '🌙' },
    ],
  };

  const activeSchedules = sholatSchedules[selectedCity] || sholatSchedules['Surabaya'];

  // Simulate compass movement
  useEffect(() => {
    const interval = setInterval(() => {
      setCompassHeading(prev => (prev + (Math.random() * 4 - 2) + 360) % 360);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const handleGpsSync = () => {
    setIsGpsActive(true);
    setTimeout(() => {
      setSelectedCity('Surabaya'); // simulated GPS returns Surabaya
      setIsGpsActive(false);
    }, 1200);
  };

  return (
    <div className="space-y-4" id="prayer-times-module">
      {/* Top GPS Status & Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-xs flex justify-between items-center gap-2">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-emerald-600 animate-bounce" />
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Lokasi Pemantauan</span>
            <div className="flex items-center space-x-1.5">
              <select 
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="font-extrabold text-sm text-slate-800 dark:text-slate-100 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Surabaya">Surabaya, Jatim</option>
                <option value="Jakarta">Jakarta, DKI</option>
                <option value="Medan">Medan, Sumut</option>
                <option value="Makassar">Makassar, Sulsel</option>
              </select>
            </div>
          </div>
        </div>
        
        <button 
          onClick={handleGpsSync}
          disabled={isGpsActive}
          className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 rounded-xl text-xs font-bold border border-emerald-100 dark:border-emerald-900/40 transition-all hover:bg-emerald-100"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isGpsActive ? 'animate-spin' : ''}`} />
          <span>{isGpsActive ? 'Mencari...' : 'GPS Otomatis'}</span>
        </button>
      </div>

      {/* Countdown Card Widget */}
      <div className="bg-gradient-to-br from-[#064E3B] via-emerald-800 to-amber-700 text-white rounded-3xl p-5 shadow-lg relative overflow-hidden border border-emerald-800">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-8 -mt-8"></div>
        <div className="relative z-10 flex justify-between items-center">
          <div className="space-y-1">
            <span className="bg-amber-500/30 text-amber-200 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-amber-400/20">
              Menuju Waktu Sholat
            </span>
            <h3 className="text-2xl font-black flex items-baseline gap-1.5">
              {nextSholat} <span className="text-xs font-medium text-emerald-200">({activeSchedules.find(s => s.name === nextSholat)?.time || '14:55'})</span>
            </h3>
            <p className="text-[11px] text-emerald-100 font-medium">Jangan lewatkan jamaah di Masjid Al-Ishlah</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-mono font-bold text-amber-300 tracking-wider animate-pulse">{timeRemaining}</p>
            <span className="text-[9px] text-emerald-200 uppercase font-bold tracking-widest">Sisa Waktu</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Times & Kiblat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Sholat Schedule List */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2.5">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 uppercase">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Jadwal Sholat Hari Ini</span>
            </h4>
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
            >
              {isMuted ? <BellOff className="w-4 h-4 text-red-500" /> : <Bell className="w-4 h-4 text-emerald-600 animate-swing" />}
            </button>
          </div>

          <div className="space-y-2">
            {activeSchedules.map((schedule) => {
              const isNext = schedule.name === nextSholat;
              return (
                <div 
                  key={schedule.name}
                  className={`flex justify-between items-center p-3 rounded-2xl transition-all ${
                    isNext 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/30' 
                      : 'border border-transparent'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{schedule.icon}</span>
                    <div>
                      <p className={`text-xs font-bold ${isNext ? 'text-emerald-950 dark:text-emerald-300 text-sm' : 'text-slate-700 dark:text-slate-300'}`}>
                        {schedule.name}
                      </p>
                      {isNext && <span className="text-[9px] bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold px-1.5 py-0.2 rounded uppercase">Mendatang</span>}
                    </div>
                  </div>
                  <span className={`font-mono font-bold text-sm ${isNext ? 'text-emerald-900 dark:text-emerald-400 text-base' : 'text-slate-800 dark:text-slate-200'}`}>
                    {schedule.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Qibla Direction Compass Widget */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs flex flex-col items-center justify-between text-center min-h-[290px]">
          <div className="w-full">
            <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1.5 uppercase">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>Arah Kiblat (Kompas)</span>
            </h4>
            <p className="text-[10px] text-slate-400 mt-1">Arah Ka'bah dari lokasi Anda adalah {currentKiblatAngle}° Barat Laut</p>
          </div>

          {/* Simulated Compass Ring */}
          <div className="relative w-36 h-36 rounded-full border-4 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center transition-transform duration-700" style={{ transform: `rotate(${-compassHeading}deg)` }}>
            {/* Compass Directions */}
            <span className="absolute top-1 font-bold text-[10px] text-red-500">U</span>
            <span className="absolute bottom-1 font-bold text-[10px] text-slate-400">S</span>
            <span className="absolute right-2 font-bold text-[10px] text-slate-400">B</span>
            <span className="absolute left-2 font-bold text-[10px] text-slate-400">T</span>

            {/* Qibla Needle Marker */}
            <div 
              className="absolute w-1.5 h-16 bg-gradient-to-b from-amber-500 to-amber-600 rounded-full z-10 origin-center"
              style={{ transform: `rotate(${currentKiblatAngle}deg) translateY(-8px)` }}
            >
              {/* Gold star tip indicating Kiblat direction */}
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center shadow-xs">
                <span className="text-[6px]">🕋</span>
              </div>
            </div>

            {/* General compass needle (North-South) */}
            <div className="w-1 h-20 bg-slate-300 dark:bg-slate-700 rounded-full transform rotate-0 opacity-50"></div>
          </div>

          <div className="w-full">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
              Status Keakuratan: <span className="text-emerald-600">Sangat Tinggi</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
