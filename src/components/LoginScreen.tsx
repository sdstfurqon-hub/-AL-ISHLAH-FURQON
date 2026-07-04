import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  UserCheck, 
  Sparkles, 
  BookOpen, 
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export type UserRole = 
  | 'Super Admin' 
  | 'Kepala Sekolah' 
  | 'Mudir Tahfidz' 
  | 'Guru Tahfidz' 
  | 'Bendahara' 
  | 'Wali Kelas' 
  | 'Orang Tua' 
  | 'Santri';

interface LoginScreenProps {
  onLoginSuccess: (role: UserRole) => void;
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('Orang Tua');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Available 8 Roles
  const rolesList: UserRole[] = [
    'Super Admin',
    'Kepala Sekolah',
    'Mudir Tahfidz',
    'Guru Tahfidz',
    'Bendahara',
    'Wali Kelas',
    'Orang Tua',
    'Santri'
  ];

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 1200);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4" id="login-screen-module">
      {/* Premium Glassmorphic Card */}
      <div className="w-full max-w-md bg-white/95 dark:bg-slate-900/90 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 border border-white/50 dark:border-slate-800 shadow-2xl space-y-5">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#064E3B] to-amber-700 text-white flex items-center justify-center shadow-lg mx-auto">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tight text-slate-900 dark:text-white uppercase">PPTA Al-Ishlah Furqon</h2>
            <p className="text-[10px] text-[#064E3B] font-bold uppercase tracking-widest mt-0.5">Pusat Pemantauan Tahfidz Al-Qur'an</p>
          </div>
        </div>

        {/* Roles Quick chips selectors */}
        <div className="space-y-1.5">
          <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block text-center">Pilih Peran Akses Anda ({rolesList.length} Peran)</label>
          <div className="flex flex-wrap gap-1.5 justify-center max-h-[85px] overflow-y-auto p-1.5 bg-slate-50 dark:bg-slate-950/40 rounded-2xl border border-slate-100 dark:border-slate-800/80 no-scrollbar">
            {rolesList.map(role => (
              <button
                key={role}
                type="button"
                onClick={() => setSelectedRole(role)}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold border transition-all cursor-pointer ${
                  selectedRole === role
                    ? 'bg-[#064E3B] text-white border-emerald-950'
                    : 'bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border-slate-100 dark:border-slate-800 hover:bg-slate-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Login form */}
        <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <div className="space-y-1">
            <label className="block pl-1">ID Akses / Email Sekolah</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ustadz.hamzah@alishlah.id"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-900 focus:outline-none text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block pl-1">Sandi Rahasia</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-900 focus:outline-none text-slate-800 dark:text-slate-100"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-[#064E3B] to-emerald-800 hover:to-emerald-950 text-white font-black text-xs rounded-2xl transition-all shadow-xs uppercase tracking-wider flex items-center justify-center space-x-2 cursor-pointer"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                <span>Menghubungkan...</span>
              </>
            ) : (
              <>
                <span>Masuk ke Dashboard ({selectedRole})</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security disclaimer */}
        <div className="flex justify-center items-center space-x-1.5 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Sesi terenkripsi standar SSL & MD3</span>
        </div>

      </div>
    </div>
  );
}
