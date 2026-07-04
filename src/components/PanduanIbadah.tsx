import React, { useState } from 'react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  FileText, 
  Sparkles,
  Info,
  CheckCircle,
  Video
} from 'lucide-react';

interface GuideStep {
  step: number;
  title: string;
  desc: string;
  illustration: string;
}

interface Guide {
  id: string;
  title: string;
  category: 'Thaharah' | 'Sholat' | 'Rukun Islam' | 'Adab';
  desc: string;
  steps: GuideStep[];
  videoUrlPlaceholder: string;
}

const IBADAH_GUIDES: Guide[] = [
  {
    id: 'g1',
    title: 'Tata Cara Berwudhu',
    category: 'Thaharah',
    desc: 'Langkah demi langkah menyucikan diri sebelum melaksanakan sholat sesuai tuntunan sunnah.',
    videoUrlPlaceholder: 'https://youtube.com/watch?placeholder=WudhuGuide',
    steps: [
      { step: 1, title: 'Membaca Niat & Membasuh Telapak Tangan', desc: 'Membaca "Bismillah" dan mencuci kedua pergelangan tangan hingga sela-sela jari.', illustration: '💧' },
      { step: 2, title: 'Berkumur-kumur', desc: 'Berkumur secara sempurna sebanyak 3 kali untuk membersihkan sisa makanan di mulut.', illustration: '👄' },
      { step: 3, title: 'Menghirup Air ke Hidung (Istinsyaq)', desc: 'Menghirup air ke dalam hidung kemudian mengeluarkannya kembali sebanyak 3 kali.', illustration: '👃' },
      { step: 4, title: 'Membasuh Wajah', desc: 'Membasuh seluruh bagian luar wajah mulai dari batas tumbuh rambut hingga dagu sebanyak 3 kali.', illustration: '👤' },
      { step: 5, title: 'Membasuh Kedua Tangan Hingga Siku', desc: 'Membasuh tangan kanan terlebih dahulu kemudian tangan kiri dari ujung jari hingga melebihi siku sebanyak 3 kali.', illustration: '💪' },
      { step: 6, title: 'Mengusap Kepala & Telinga', desc: 'Mengusap sebagian atau seluruh kepala dilanjutkan dengan membersihkan telinga kanan dan kiri sebanyak 1 kali.', illustration: '👂' },
      { step: 7, title: 'Membasuh Kedua Kaki Hingga Mata Kaki', desc: 'Membasuh kaki kanan dilanjutkan kaki kiri hingga di atas kedua mata kaki sebanyak 3 kali.', illustration: '👣' },
    ]
  },
  {
    id: 'g2',
    title: 'Tuntunan Sholat Wajib',
    category: 'Sholat',
    desc: 'Panduan lengkap gerakan dan bacaan sholat fardhu lima waktu dari Takbiratul Ihram hingga Salam.',
    videoUrlPlaceholder: 'https://youtube.com/watch?placeholder=SholatGuide',
    steps: [
      { step: 1, title: 'Berdiri Tegak & Takbiratul Ihram', desc: 'Menghadap Kiblat, melafadzkan takbir "Allahu Akbar" dan bersedekap meletakkan tangan kanan di atas tangan kiri.', illustration: '🧘‍♂️' },
      { step: 2, title: 'Rukuk dengan Thuma\'ninah', desc: 'Membungkukkan badan dengan punggung rata sejajar kepala dan memegang lutut seraya membaca doa rukuk.', illustration: '📐' },
      { step: 3, title: 'I\'tidal (Bangkit dari Rukuk)', desc: 'Berdiri tegak kembali setelah rukuk, mengangkat kedua tangan seraya membaca pujian tahmid.', illustration: '🚶‍♂️' },
      { step: 4, title: 'Sujud dengan Thuma\'ninah', desc: 'Meletakkan dahi, hidung, kedua telapak tangan, lutut, dan jari-jari kaki di lantai seraya bertasbih.', illustration: '🙇‍♂️' },
      { step: 5, title: 'Duduk di Antara Dua Sujud', desc: 'Duduk dengan tenang (iftirasy) di antara kedua sujud sambil membaca doa ampunan.', illustration: '🧎‍♂️' },
      { step: 6, title: 'Tahiyyat Akhir & Salam', desc: 'Duduk tawarruk pada rakaat terakhir, membaca tasyahhud, bersholawat, lalu menoleh ke kanan dan kiri.', illustration: '👋' }
    ]
  },
  {
    id: 'g3',
    title: 'Adab Menuntut Ilmu',
    category: 'Adab',
    desc: 'Pedoman etika bagi santri tahfidz Al-Quran dalam belajar agar mendapatkan ilmu yang berkah.',
    videoUrlPlaceholder: 'https://youtube.com/watch?placeholder=AdabIlmu',
    steps: [
      { step: 1, title: 'Ikhlas Karena Allah SWT', desc: 'Meluruskan niat belajar murni untuk mengharap ridha Allah, bukan demi sanjungan manusia.', illustration: '❤️' },
      { step: 2, title: 'Berdoa Sebelum Belajar', desc: 'Memohon kemudahan dan keberkahan pemahaman sebelum membuka mushaf quran.', illustration: '🤲' },
      { step: 3, title: 'Menghormati Ustadz & Guru', desc: 'Mendengarkan dengan khusyuk penjelasan ustadz, berkata sopan, dan menjaga adab bicara.', illustration: '🤝' },
      { step: 4, title: 'Menjaga Kebersihan Mushaf', desc: 'Hanya memegang mushaf Al-Quran dalam keadaan suci dari hadats besar dan kecil.', illustration: '📖' }
    ]
  }
];

export default function PanduanIbadah() {
  const [selectedGuideId, setSelectedGuideId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPdfDownloading, setIsPdfDownloading] = useState<string | null>(null);

  const activeGuide = IBADAH_GUIDES.find(g => g.id === selectedGuideId);

  const handleSelectGuide = (id: string) => {
    setSelectedGuideId(id);
    setCurrentStepIndex(0);
  };

  const handleNextStep = () => {
    if (!activeGuide) return;
    if (currentStepIndex < activeGuide.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const simulatePdfDownload = (id: string) => {
    setIsPdfDownloading(id);
    setTimeout(() => {
      setIsPdfDownloading(null);
      alert('Dokumen PDF berhasil diunduh ke perangkat Anda.');
    }, 1500);
  };

  return (
    <div className="space-y-4" id="panduan-ibadah-module">
      
      {!selectedGuideId ? (
        // LIST OF AVAILABLE GUIDES
        <div className="space-y-3.5 animate-fade-in">
          <div className="flex items-center space-x-2 px-1">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <span className="text-xs font-bold text-slate-700">Pilih Panduan Praktis</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {IBADAH_GUIDES.map(guide => (
              <div 
                key={guide.id}
                onClick={() => handleSelectGuide(guide.id)}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-xs flex justify-between items-center cursor-pointer hover:shadow-md hover:border-emerald-100 transition-all duration-300 group"
              >
                <div className="space-y-2 max-w-[80%]">
                  <span className="text-[9px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-extrabold px-2.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-900/40 uppercase tracking-wide">
                    {guide.category}
                  </span>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 group-hover:text-emerald-800">{guide.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed font-medium">{guide.desc}</p>
                </div>
                <div className="w-9 h-9 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-800 flex items-center justify-center transition-all">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // ACTIVE STEP-BY-STEP INTERACTIVE WALKTHROUGH
        activeGuide && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-xs space-y-5 animate-fade-in">
            {/* Header / Back navigation */}
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <button 
                onClick={() => setSelectedGuideId(null)}
                className="flex items-center space-x-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Panduan {activeGuide.category}
              </span>
            </div>

            {/* Guide Title & Summary */}
            <div className="space-y-1 text-center">
              <h3 className="font-black text-slate-900 dark:text-slate-100 text-base">{activeGuide.title}</h3>
              <p className="text-[10px] text-slate-400 max-w-sm mx-auto font-medium">{activeGuide.desc}</p>
            </div>

            {/* Simulated Illustration Frame */}
            <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col items-center justify-center relative overflow-hidden min-h-[160px]">
              <div className="absolute top-2 left-3 bg-emerald-900/10 text-[#064E3B] font-mono text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                Langkah {activeGuide.steps[currentStepIndex].step} dari {activeGuide.steps.length}
              </div>
              
              <span className="text-5xl animate-bounce mb-3.5">
                {activeGuide.steps[currentStepIndex].illustration}
              </span>

              <h4 className="text-xs font-extrabold text-slate-800 dark:text-slate-200">
                {activeGuide.steps[currentStepIndex].title}
              </h4>
            </div>

            {/* Step Description text */}
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center leading-relaxed font-semibold px-2">
              {activeGuide.steps[currentStepIndex].desc}
            </p>

            {/* Navigation controls (Prev / Next with Progress indicator) */}
            <div className="flex justify-between items-center gap-4">
              <button
                onClick={handlePrevStep}
                disabled={currentStepIndex === 0}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center space-x-1 ${
                  currentStepIndex === 0
                    ? 'border-slate-100 text-slate-300 bg-slate-50 dark:bg-slate-800 cursor-not-allowed'
                    : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Mundur</span>
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStepIndex === activeGuide.steps.length - 1}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1 ${
                  currentStepIndex === activeGuide.steps.length - 1
                    ? 'bg-slate-100 text-slate-300 dark:bg-slate-800 cursor-not-allowed border border-transparent'
                    : 'bg-[#064E3B] text-white hover:bg-emerald-950 font-extrabold'
                }`}
              >
                <span>Maju</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Progress Bar indicator */}
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-700 h-full rounded-full transition-all duration-300" 
                style={{ width: `${((currentStepIndex + 1) / activeGuide.steps.length) * 100}%` }}
              ></div>
            </div>

            {/* Resource Downloads Bar */}
            <div className="flex flex-col sm:flex-row gap-3 border-t border-slate-100 dark:border-slate-800 pt-4 text-xs font-semibold">
              <a 
                href="#simulate-video"
                onClick={(e) => { e.preventDefault(); alert('Memutar video panduan HD...'); }}
                className="flex-1 py-2 bg-amber-50 dark:bg-amber-950/20 text-amber-800 dark:text-amber-400 border border-amber-200/40 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-amber-100"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Video Tutorial</span>
              </a>

              <button 
                onClick={() => simulatePdfDownload(activeGuide.id)}
                disabled={isPdfDownloading === activeGuide.id}
                className="flex-1 py-2 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/50 rounded-xl flex items-center justify-center space-x-1.5 hover:bg-slate-100"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{isPdfDownloading === activeGuide.id ? 'Mengunduh...' : 'Unduh Buku Panduan (PDF)'}</span>
              </button>
            </div>
          </div>
        )
      )}

    </div>
  );
}
