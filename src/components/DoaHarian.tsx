import React, { useState } from 'react';
import { 
  Search, 
  BookMarked, 
  Bookmark, 
  Play, 
  Pause, 
  Volume2, 
  Compass, 
  Sparkles,
  Award,
  BookOpen
} from 'lucide-react';

interface Doa {
  id: string;
  title: string;
  category: 'Belajar' | 'Harian' | 'Masjid' | 'Kendaraan' | 'Sholat' | 'Orang Tua';
  arabic: string;
  latin: string;
  translation: string;
}

const DEFAULT_DOA: Doa[] = [
  {
    id: 'd1',
    title: 'Doa Sebelum Belajar',
    category: 'Belajar',
    arabic: 'رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهْمًا',
    latin: 'Robbi zidnii \'ilman warzuqnii fahman',
    translation: 'Ya Allah, tambahkanlah kepadaku ilmu pengetahuan dan berikanlah kepadaku pemahaman yang baik.'
  },
  {
    id: 'd2',
    title: 'Doa Sesudah Belajar',
    category: 'Belajar',
    arabic: 'اللَّهُمَّ أَرِنَا الْحَقَّ حَقًّا وَارْزُقْنَا اتِّبَاعَهُ وَأَرِنَا الْبَاطِلَ بَاطِلًا وَارْزُقْنَا اجْتِنَابَهُ',
    latin: 'Allahumma arinal haqqa haqqan warzuqnat tibaa\'ahu, wa arinal baatila baatilan warzuqnaj tinaabahu',
    translation: 'Ya Allah, tunjukkanlah kepada kami yang benar itu benar, dan berikanlah kami kekuatan untuk mengikutinya; serta tunjukkanlah kepada kami yang batil itu batil, dan berikanlah kami kekuatan untuk menjauhinya.'
  },
  {
    id: 'd3',
    title: 'Doa Sebelum Makan',
    category: 'Harian',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    latin: 'Allahumma baariklanaa fiimaa razaqtanaa wa qinaa \'adzaaban naar',
    translation: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.'
  },
  {
    id: 'd4',
    title: 'Doa Masuk Masjid',
    category: 'Masjid',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    latin: 'Allahummaftah lii abwaaba rahmatik',
    translation: 'Ya Allah, bukakanlah bagiku pintu-pintu rahmat-Mu.'
  },
  {
    id: 'd5',
    title: 'Doa Keluar Masjid',
    category: 'Masjid',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    latin: 'Allahumma inni as\'aluka min fadhlik',
    translation: 'Ya Allah, sesungguhnya aku memohon keutamaan dari-Mu.'
  },
  {
    id: 'd6',
    title: 'Doa Naik Kendaraan',
    category: 'Kendaraan',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ',
    latin: 'Subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahu muqriniin, wa innaa ilaa rabbinaa lamunqalibuun',
    translation: 'Maha Suci Allah yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya, dan sesungguhnya kami akan kembali kepada Tuhan kami.'
  },
  {
    id: 'd7',
    title: 'Doa Kedua Orang Tua',
    category: 'Orang Tua',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    latin: 'Rabbighfir lii waliwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa',
    translation: 'Ya Tuhanku, ampunilah aku dan kedua orang tuaku, dan kasihilah mereka berdua sebagaimana mereka berdua telah mendidik aku sewaktu kecil.'
  }
];

export default function DoaHarian() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>(['d1', 'd7']); // pre-marked

  const categories = ['Semua', 'Belajar', 'Harian', 'Masjid', 'Kendaraan', 'Orang Tua'];

  const filteredDoa = DEFAULT_DOA.filter(doa => {
    const matchesSearch = doa.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doa.translation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || doa.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleBookmark = (id: string) => {
    setBookmarks(prev => 
      prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
    );
  };

  const toggleAudio = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      // Automatically stop after 5 seconds to simulate audio play ending
      setTimeout(() => {
        setPlayingId(current => current === id ? null : current);
      }, 5000);
    }
  };

  return (
    <div className="space-y-4" id="doa-harian-module">
      
      {/* Search Input Custom Design */}
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </span>
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cari doa harian, belajar, orang tua..."
          className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-semibold focus:ring-2 focus:ring-emerald-900 focus:outline-none shadow-xs text-slate-700 dark:text-slate-100"
        />
      </div>

      {/* Categories Horizontal Scrolling Container */}
      <div className="flex space-x-2 overflow-x-auto pb-1.5 no-scrollbar scroll-smooth">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border cursor-pointer transition-all ${
              activeCategory === cat 
                ? 'bg-emerald-900 text-white border-emerald-950 shadow-sm' 
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Doa Cards List */}
      <div className="space-y-3.5">
        {filteredDoa.length > 0 ? (
          filteredDoa.map(doa => {
            const isBookmarked = bookmarks.includes(doa.id);
            const isPlaying = playingId === doa.id;
            return (
              <div 
                key={doa.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-4 transition-all hover:shadow-md hover:border-emerald-100/50"
              >
                {/* Doa Card Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/40 uppercase tracking-wider">
                      {doa.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-1">
                    {/* Audio simulated button */}
                    <button 
                      onClick={() => toggleAudio(doa.id)}
                      className={`p-2 rounded-xl transition-all ${
                        isPlaying 
                          ? 'bg-amber-100 text-amber-800 animate-pulse' 
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100'
                      }`}
                      title="Dengarkan Audio Lafadz"
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Bookmark Toggle */}
                    <button 
                      onClick={() => toggleBookmark(doa.id)}
                      className={`p-2 rounded-xl transition-all ${
                        isBookmarked 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-300 hover:bg-slate-100'
                      }`}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-emerald-700 text-emerald-700' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Doa Title */}
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100">{doa.title}</h4>

                {/* Arabic Script */}
                <p className="text-right text-slate-900 dark:text-white font-arabic text-2xl font-bold leading-relaxed pt-1.5 tracking-wide antialiased">
                  {doa.arabic}
                </p>

                {/* Latin & Translation */}
                <div className="space-y-1.5 border-l-2 border-amber-500/40 pl-3 pt-0.5">
                  <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 italic font-mono leading-relaxed">{doa.latin}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{doa.translation}</p>
                </div>

                {/* Simulated Audio Wave when active */}
                {isPlaying && (
                  <div className="flex items-center space-x-2 bg-amber-50/50 p-2 rounded-xl border border-amber-200/40 animate-fade-in text-[10px] font-bold text-amber-800">
                    <span className="flex space-x-0.5 items-end h-3 shrink-0">
                      <span className="w-1 bg-amber-600 rounded-full h-full animate-bounce"></span>
                      <span className="w-1 bg-amber-600 rounded-full h-2 animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                      <span className="w-1 bg-amber-600 rounded-full h-3 animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                    </span>
                    <span>Memutar Simulasi Audio Doa (Lafadz Qori)...</span>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-100 dark:border-slate-800 text-center text-slate-400 space-y-2">
            <span className="text-2xl">🔍</span>
            <p className="text-xs font-semibold">Doa tidak ditemukan.</p>
            <p className="text-[10px] text-slate-400">Silakan gunakan kata kunci pencarian yang berbeda.</p>
          </div>
        )}
      </div>

    </div>
  );
}
