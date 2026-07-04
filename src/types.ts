export interface Santri {
  id: string;
  name: string;
  class: string;
  parentName: string;
  nis: string;
  avatarUrl: string;
}

export interface TahfidzProgress {
  id: string;
  santriId: string;
  surahName: string;
  startAyat: number;
  endAyat: number;
  juz: number;
  tajwidScore: number; // 0-100
  fluentScore: number; // 0-100
  notes: string;
  date: string;
  ustadzName: string;
}

export interface SppBill {
  id: string;
  santriId: string;
  category: 'SPP Bulanan' | 'Uang Makan' | 'Uang Gedung';
  month: string;
  year: number;
  amount: number;
  status: 'Lunas' | 'Pending';
  dueDate: string;
}

export interface SpmbRegistrant {
  id: string;
  name: string;
  gender: 'Laki-laki' | 'Perempuan';
  schoolOrigin: string;
  registrationDate: string;
  examScore: number;
  documentStatus: 'Lengkap' | 'Belum Lengkap';
  status: 'Lulus' | 'Pending' | 'Gagal';
  parentPhone: string;
}

export type UserRole = 'Kepala Sekolah' | 'Guru & Ustadz' | 'Wali Santri';
