import React, { useState } from 'react';
import { 
  UserPlus, 
  Upload, 
  CheckCircle, 
  FileText, 
  Printer, 
  Search, 
  Smartphone, 
  ArrowRight,
  Sparkles,
  RefreshCw,
  QrCode
} from 'lucide-react';
import { SpmbRegistrant } from '../types';

interface SpmbSystemProps {
  registrants: SpmbRegistrant[];
  onAddRegistrant: (newReg: SpmbRegistrant) => void;
}

export default function SpmbSystem({ registrants, onAddRegistrant }: SpmbSystemProps) {
  const [activeSubTab, setActiveSubTab] = useState<'daftar' | 'status'>('daftar');
  
  // Form values
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'Laki-laki' | 'Perempuan'>('Laki-laki');
  const [schoolOrigin, setSchoolOrigin] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [justRegistered, setJustRegistered] = useState<SpmbRegistrant | null>(null);

  const [searchQuery, setSearchQuery] = useState('');

  const handleFileUploadSim = (docName: string) => {
    if (uploadedFiles.includes(docName)) {
      setUploadedFiles(prev => prev.filter(f => f !== docName));
    } else {
      setUploadedFiles(prev => [...prev, docName]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !schoolOrigin || !parentPhone) {
      alert('Mohon lengkapi seluruh kolom formulir.');
      return;
    }

    const regNo = `REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecord: SpmbRegistrant = {
      id: regNo,
      name,
      gender,
      schoolOrigin,
      registrationDate: new Date().toISOString().split('T')[0],
      examScore: Math.floor(75 + Math.random() * 20),
      documentStatus: uploadedFiles.length >= 3 ? 'Lengkap' : 'Belum Lengkap',
      status: 'Pending',
      parentPhone
    };

    onAddRegistrant(newRecord);
    setJustRegistered(newRecord);
    
    // Clear Form
    setName('');
    setSchoolOrigin('');
    setParentPhone('');
    setUploadedFiles([]);
  };

  const filteredRegistrants = registrants.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4" id="spmb-system-module">
      
      {/* Tab Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/50 text-xs font-bold w-full">
        <button
          onClick={() => { setActiveSubTab('daftar'); setJustRegistered(null); }}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'daftar'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <UserPlus className="w-4 h-4" />
          <span>Formulir PPDB Online</span>
        </button>

        <button
          onClick={() => { setActiveSubTab('status'); }}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activeSubTab === 'status'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Pengumuman Kelulusan</span>
        </button>
      </div>

      {activeSubTab === 'daftar' && (
        <div className="space-y-4 animate-fade-in">
          
          {!justRegistered ? (
            <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div>
                <h3 className="font-black text-slate-900 dark:text-slate-100 text-sm uppercase flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Registrasi Santri Baru (PPDB)</span>
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed font-medium">Lengkapi formulir pendaftaran di bawah untuk mendapatkan Nomor Ujian Seleksi otomatis.</p>
              </div>

              {/* Form Input fields */}
              <div className="space-y-1">
                <label className="block">Nama Lengkap Calon Santri</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Contoh: Muhammad Faiz"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-900 focus:outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="block">Jenis Kelamin</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none text-slate-800 dark:text-slate-100"
                  >
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block">No. HP Orang Tua / Wali</label>
                  <input 
                    type="tel"
                    value={parentPhone}
                    onChange={(e) => setParentPhone(e.target.value)}
                    required
                    placeholder="Contoh: 0812345678"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-900 focus:outline-none text-slate-800 dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block">Asal Sekolah (SD / MI / Sederajat)</label>
                <input 
                  type="text"
                  value={schoolOrigin}
                  onChange={(e) => setSchoolOrigin(e.target.value)}
                  required
                  placeholder="Contoh: MI Al-Ishlah Surabaya"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-900 focus:outline-none text-slate-800 dark:text-slate-100"
                />
              </div>

              {/* File Upload Checklist */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Unggah Berkas Persyaratan (Simulasi)</span>
                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
                  {['Foto 3x4', 'Kartu Keluarga', 'Akta Kelahiran', 'Ijazah / Rapor'].map(doc => {
                    const isUploaded = uploadedFiles.includes(doc);
                    return (
                      <button
                        type="button"
                        key={doc}
                        onClick={() => handleFileUploadSim(doc)}
                        className={`p-2 rounded-xl border flex items-center justify-between transition-all ${
                          isUploaded
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-slate-50 text-slate-600 border-slate-200/60 hover:bg-slate-100'
                        }`}
                      >
                        <span className="truncate">{doc}</span>
                        <Upload className={`w-3.5 h-3.5 shrink-0 ml-1.5 ${isUploaded ? 'text-emerald-700' : 'text-slate-400'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#064E3B] hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all uppercase tracking-wider cursor-pointer"
              >
                Kirim Formulir Pendaftaran
              </button>
            </form>
          ) : (
            // ENROLLMENT CARD WITH QR CODE
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 animate-fade-in text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shadow-xs mx-auto">
                <CheckCircle className="w-7 h-7" />
              </div>
              
              <div>
                <h4 className="font-black text-slate-900 dark:text-slate-100 text-sm">Pendaftaran Berhasil Terkirim!</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Simpan kartu ujian seleksi digital ini untuk ditunjukkan kepada panitia pendaftaran PPTA.</p>
              </div>

              {/* Printable Ticket Mockup Card */}
              <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 rounded-2xl p-4 text-left text-xs font-semibold space-y-3.5 max-w-sm mx-auto relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#064E3B]/10 rounded-bl-full flex items-center justify-center">
                  <QrCode className="w-5 h-5 text-[#064E3B]" />
                </div>
                
                <div>
                  <span className="text-[9px] text-[#064E3B] font-extrabold uppercase bg-emerald-100/50 px-2 py-0.5 rounded border border-emerald-200">Kartu Seleksi Baru</span>
                  <p className="font-mono text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-1.5">{justRegistered.id}</p>
                </div>

                <div className="space-y-1 text-[11px]">
                  <p className="text-slate-400 text-[9px] uppercase tracking-wider">Nama Calon Santri</p>
                  <p className="text-slate-900 dark:text-slate-100 font-extrabold">{justRegistered.name}</p>
                  
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[10px]">
                    <div>
                      <span className="text-slate-400 block uppercase text-[8px]">Asal Sekolah</span>
                      <span className="text-slate-700 dark:text-slate-300 font-bold truncate">{justRegistered.schoolOrigin}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase text-[8px]">No. HP Wali</span>
                      <span className="text-slate-700 dark:text-slate-300 font-bold">{justRegistered.parentPhone}</span>
                    </div>
                  </div>
                </div>

                {/* QR Code generator integration */}
                <div className="pt-3 border-t border-slate-200/40 flex justify-between items-center gap-3">
                  <div>
                    <span className="text-[9px] text-slate-400 block uppercase">Pindai Kartu</span>
                    <span className="text-[10px] text-emerald-800 font-bold">Verifikasi Panitia</span>
                  </div>
                  <div className="w-16 h-16 bg-white p-1 rounded-lg border border-slate-200 flex items-center justify-center">
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${justRegistered.id}`} referrerPolicy="no-referrer" alt="Registrant QR" className="w-14 h-14" />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => alert('Mencetak Bukti Pendaftaran digital...')}
                  className="flex-1 py-2.5 bg-[#064E3B] text-white text-xs font-bold rounded-xl hover:bg-emerald-950 flex items-center justify-center space-x-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak Kartu</span>
                </button>
                <button
                  onClick={() => setJustRegistered(null)}
                  className="flex-1 py-2.5 bg-slate-50 border border-slate-200 text-xs text-slate-600 font-bold rounded-xl hover:bg-slate-100"
                >
                  Daftar Lagi
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {activeSubTab === 'status' && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Status Search */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama santri atau No. Registrasi..."
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold focus:outline-none"
            />
          </div>

          {/* Registrant Lists */}
          <div className="space-y-3">
            {filteredRegistrants.map(reg => {
              const isLulus = reg.status === 'Lulus';
              const isGagal = reg.status === 'Gagal';
              const isPending = reg.status === 'Pending';
              
              return (
                <div 
                  key={reg.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] text-slate-400 font-mono font-bold">{reg.id}</span>
                      <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 mt-0.5">{reg.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">Asal Sekolah: {reg.schoolOrigin}</p>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      isLulus 
                        ? 'bg-emerald-900 text-emerald-100' 
                        : isGagal 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {reg.status === 'Pending' ? 'Seleksi' : reg.status}
                    </span>
                  </div>

                  {/* Marks and verification bar */}
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-bold">
                    <div className="flex items-center space-x-2 text-slate-500">
                      <span>Nilai Seleksi:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-mono text-xs">{reg.examScore}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1.5">
                      <span className="text-slate-400">Dokumen:</span>
                      <span className={`px-1.5 py-0.2 rounded-full font-extrabold ${reg.documentStatus === 'Lengkap' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-700'}`}>
                        {reg.documentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
