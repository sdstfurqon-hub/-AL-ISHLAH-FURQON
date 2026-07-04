import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, AppWindow } from 'lucide-react';

interface CodeFile {
  name: string;
  language: string;
  description: string;
  content: string;
}

export default function CodeExporter() {
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, text: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const codeFiles: CodeFile[] = [
    {
      name: 'dashboard.html',
      language: 'html',
      description: 'Web Dashboard Admin & SPMB Terintegrasi (Single File HTML, Tailwind CSS, Lucide Icons & Responsive Design)',
      content: `<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PPTA Enterprise v3 - Dashboard Admin & SPMB</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts: Inter -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <!-- Lucide Icons Development -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        /* Custom Premium Glassmorphism */
        .glass-panel {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.4);
        }
        .glass-card {
            background: rgba(255, 255, 255, 0.65);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px -10px rgba(6, 78, 59, 0.15);
            border-color: rgba(217, 119, 6, 0.4);
        }
        /* Shimmer effect */
        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }
        .shimmer {
            background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
            background-size: 200% 100%;
            animation: shimmer 2.5s infinite;
        }
        /* Scrollbar custom */
        ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
        }
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        ::-webkit-scrollbar-thumb {
            background: #064e3b;
            border-radius: 4px;
        }
    </style>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        emerald: {
                            950: '#022c22',
                            900: '#064e3b',
                            800: '#065f46',
                            700: '#047857',
                            600: '#059669',
                            500: '#10b981',
                        },
                        gold: {
                            50: '#fffbeb',
                            100: '#fef3c7',
                            200: '#fde68a',
                            300: '#fcd34d',
                            400: '#fbbf24',
                            500: '#f59e0b',
                            600: '#d97706',
                            700: '#b45309',
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="bg-gray-50 text-gray-800 min-h-screen flex flex-col">

    <!-- Top Luxury Header -->
    <header class="bg-emerald-900 text-white py-3 px-6 shadow-md flex justify-between items-center z-30 sticky top-0 border-b-2 border-gold-600">
        <div class="flex items-center space-x-3">
            <button id="sidebar-toggle" class="p-2 hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer md:block">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-gold-500 flex items-center justify-center shadow-md">
                    <i data-lucide="shield-check" class="text-white w-6 h-6"></i>
                </div>
                <div>
                    <h1 class="text-lg font-bold tracking-tight text-white">PPTA Enterprise <span class="text-gold-400 font-mono text-sm font-semibold">v3.0</span></h1>
                    <p class="text-xs text-emerald-200">Pesantren Modern Portal Dashboard</p>
                </div>
            </div>
        </div>

        <div class="flex items-center space-x-4">
            <div class="hidden sm:flex flex-col text-right">
                <span id="user-role-display" class="text-sm font-semibold text-white">Kepala Sekolah / Pimpinan Pondok</span>
                <span class="text-xs text-gold-400">Pondok Pesantren Tahfidz Al-Qur'an</span>
            </div>
            <div class="w-10 h-10 rounded-full border-2 border-gold-600 overflow-hidden shadow-inner bg-emerald-800 flex items-center justify-center">
                <i data-lucide="user-check" class="text-gold-400 w-5 h-5"></i>
            </div>
        </div>
    </header>

    <div class="flex flex-1 relative overflow-hidden">
        <!-- Sidebar Navigation -->
        <aside id="sidebar" class="w-64 bg-emerald-950 text-white flex flex-col justify-between absolute md:relative min-h-full z-20 transition-all duration-300 transform translate-x-0 border-r border-emerald-900 shadow-xl">
            <div class="p-4 space-y-6">
                <div>
                    <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 mb-3">Menu Utama</p>
                    <nav class="space-y-1">
                        <a href="#" onclick="switchTab('dashboard')" class="tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-emerald-900 text-white border-l-4 border-gold-500 font-medium transition-all">
                            <i data-lucide="layout-dashboard" class="w-5 h-5 text-gold-400"></i>
                            <span>Dashboard Utama</span>
                        </a>
                        <a href="#" onclick="switchTab('spmb')" class="tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:bg-emerald-900 hover:text-white transition-all">
                            <i data-lucide="user-plus" class="w-5 h-5"></i>
                            <span>Penerimaan (SPMB)</span>
                        </a>
                        <a href="#" onclick="switchTab('spp')" class="tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:bg-emerald-900 hover:text-white transition-all">
                            <i data-lucide="credit-card" class="w-5 h-5"></i>
                            <span>Pembayaran SPP</span>
                        </a>
                        <a href="#" onclick="switchTab('tahfidz')" class="tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:bg-emerald-900 hover:text-white transition-all">
                            <i data-lucide="book-open" class="w-5 h-5"></i>
                            <span>Data Tahfidz</span>
                        </a>
                        <a href="#" onclick="switchTab('akademik')" class="tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:bg-emerald-900 hover:text-white transition-all">
                            <i data-lucide="award" class="w-5 h-5"></i>
                            <span>Laporan Akademik</span>
                        </a>
                    </nav>
                </div>

                <div>
                    <p class="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 mb-3">Ubah Peran User</p>
                    <div class="space-y-2 p-1 bg-emerald-900/50 rounded-lg border border-emerald-800">
                        <button onclick="changeRole('Kepala Sekolah')" class="w-full text-left px-3 py-2 text-xs rounded hover:bg-emerald-800 text-white flex items-center space-x-2">
                            <span class="w-2 h-2 rounded-full bg-gold-500"></span>
                            <span>Pimpinan Pondok</span>
                        </button>
                        <button onclick="changeRole('Guru')" class="w-full text-left px-3 py-2 text-xs rounded hover:bg-emerald-800 text-white flex items-center space-x-2">
                            <span class="w-2 h-2 rounded-full bg-blue-400"></span>
                            <span>Guru / Ustadz</span>
                        </button>
                        <button onclick="changeRole('Wali Santri')" class="w-full text-left px-3 py-2 text-xs rounded hover:bg-emerald-800 text-white flex items-center space-x-2">
                            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                            <span>Wali Santri</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Footer Sidebar -->
            <div class="p-4 border-t border-emerald-900 bg-emerald-900/30 text-xs text-center text-emerald-400">
                <p>&copy; 2026 PPTA Enterprise v3</p>
                <p class="text-[10px] text-gold-600 mt-1">Design: Modern Corporate Islamic</p>
            </div>
        </aside>

        <!-- Main Content Pane -->
        <main class="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

            <!-- TAB: DASHBOARD UTAMA -->
            <section id="tab-dashboard" class="tab-content space-y-6">
                <!-- Welcome Banner -->
                <div class="bg-gradient-to-r from-emerald-900 via-emerald-800 to-gold-700 text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                    <div class="absolute inset-0 shimmer opacity-20"></div>
                    <div class="relative z-10 space-y-2">
                        <span class="bg-gold-600/50 text-gold-100 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-gold-400">Sistem Terintegrasi v3.0</span>
                        <h2 class="text-2xl md:text-3xl font-bold">Selamat Datang di PPTA Enterprise</h2>
                        <p class="text-sm text-emerald-100 max-w-xl">Portal manajemen administrasi, penerimaan santri baru, keuangan SPP, dan pelacak perkembangan hafalan Al-Qur'an secara real-time.</p>
                    </div>
                </div>

                <!-- Info Cards Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <!-- Card 1 -->
                    <div class="glass-card p-5 rounded-2xl shadow-sm flex items-center space-x-4 bg-white">
                        <div class="p-3.5 rounded-xl bg-emerald-50 text-emerald-900">
                            <i data-lucide="users" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Total Santri Aktif</p>
                            <p class="text-2xl font-bold text-emerald-950">480 Santri</p>
                            <span class="text-[10px] text-emerald-600 font-bold">&#8593; 12% tahun lalu</span>
                        </div>
                    </div>
                    <!-- Card 2 -->
                    <div class="glass-card p-5 rounded-2xl shadow-sm flex items-center space-x-4 bg-white">
                        <div class="p-3.5 rounded-xl bg-gold-50 text-gold-600">
                            <i data-lucide="wallet" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Keuangan SPP Bulan Ini</p>
                            <p class="text-2xl font-bold text-emerald-950">92.5M <span class="text-xs font-normal">IDR</span></p>
                            <span class="text-[10px] text-emerald-600 font-bold">85% Terbayar</span>
                        </div>
                    </div>
                    <!-- Card 3 -->
                    <div class="glass-card p-5 rounded-2xl shadow-sm flex items-center space-x-4 bg-white">
                        <div class="p-3.5 rounded-xl bg-emerald-50 text-emerald-700">
                            <i data-lucide="user-check" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Pendaftar Baru (SPMB)</p>
                            <p class="text-2xl font-bold text-emerald-950">142 Siswa</p>
                            <span class="text-[10px] text-gold-600 font-bold">Kuota sisa 8 kursi</span>
                        </div>
                    </div>
                    <!-- Card 4 -->
                    <div class="glass-card p-5 rounded-2xl shadow-sm flex items-center space-x-4 bg-white">
                        <div class="p-3.5 rounded-xl bg-red-50 text-red-600">
                            <i data-lucide="book-marked" class="w-6 h-6"></i>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500 font-medium">Hafalan Tertinggi</p>
                            <p class="text-2xl font-bold text-emerald-950">30 Juz</p>
                            <span class="text-[10px] text-red-600 font-semibold">12 Santri Al-Hafidz</span>
                        </div>
                    </div>
                </div>

                <!-- Graphical Data Visualizer -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div class="glass-panel p-6 rounded-2xl shadow-sm lg:col-span-2 space-y-4">
                        <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                            <div>
                                <h3 class="text-lg font-bold text-emerald-950">Grafik Pendaftaran Baru (SPMB 2026)</h3>
                                <p class="text-xs text-gray-500">Jumlah pendaftar baru per minggu masuk</p>
                            </div>
                            <span class="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2.5 py-1 rounded-full">Target: 150</span>
                        </div>
                        <!-- Bar Chart Graphic (Visual SVG style representation) -->
                        <div class="h-64 flex items-end justify-between px-4 pt-4 relative">
                            <!-- Helper Lines -->
                            <div class="absolute inset-x-0 top-0 h-px bg-gray-100"></div>
                            <div class="absolute inset-x-0 top-1/4 h-px bg-gray-100"></div>
                            <div class="absolute inset-x-0 top-2/4 h-px bg-gray-100"></div>
                            <div class="absolute inset-x-0 top-3/4 h-px bg-gray-100"></div>

                            <!-- Bars -->
                            <div class="flex flex-col items-center space-y-2 z-10 w-1/5">
                                <span class="text-xs font-semibold text-emerald-900">24</span>
                                <div class="w-12 bg-gradient-to-t from-emerald-900 to-emerald-600 rounded-t-lg transition-all duration-500 hover:opacity-80" style="height: 48px;"></div>
                                <span class="text-xs text-gray-500">Mng 1</span>
                            </div>
                            <div class="flex flex-col items-center space-y-2 z-10 w-1/5">
                                <span class="text-xs font-semibold text-emerald-900">38</span>
                                <div class="w-12 bg-gradient-to-t from-emerald-900 to-emerald-600 rounded-t-lg transition-all duration-500 hover:opacity-80" style="height: 76px;"></div>
                                <span class="text-xs text-gray-500">Mng 2</span>
                            </div>
                            <div class="flex flex-col items-center space-y-2 z-10 w-1/5">
                                <span class="text-xs font-semibold text-emerald-900">54</span>
                                <div class="w-12 bg-gradient-to-t from-emerald-900 to-emerald-600 rounded-t-lg transition-all duration-500 hover:opacity-80" style="height: 108px;"></div>
                                <span class="text-xs text-gray-500">Mng 3</span>
                            </div>
                            <div class="flex flex-col items-center space-y-2 z-10 w-1/5">
                                <span class="text-xs font-semibold text-emerald-900">72</span>
                                <div class="w-12 bg-gradient-to-t from-emerald-900 to-emerald-600 rounded-t-lg transition-all duration-500 hover:opacity-80" style="height: 144px;"></div>
                                <span class="text-xs text-gray-500">Mng 4</span>
                            </div>
                            <div class="flex flex-col items-center space-y-2 z-10 w-1/5">
                                <span class="text-xs font-bold text-gold-600">114</span>
                                <div class="w-12 bg-gradient-to-t from-gold-600 to-gold-400 rounded-t-lg transition-all duration-500 hover:opacity-80" style="height: 200px;"></div>
                                <span class="text-xs text-emerald-900 font-bold">Mng 5</span>
                            </div>
                        </div>
                    </div>

                    <!-- Side Status Quick Panel -->
                    <div class="glass-panel p-6 rounded-2xl shadow-sm space-y-4">
                        <h3 class="text-lg font-bold text-emerald-950 border-b border-gray-100 pb-3">Statistik SPMB</h3>
                        <div class="space-y-4">
                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-600 font-medium">Santri Laki-laki</span>
                                    <span class="font-bold text-emerald-950">84 Anak (59%)</span>
                                </div>
                                <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                    <div class="bg-emerald-700 h-full rounded-full" style="width: 59%;"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-600 font-medium">Santri Perempuan</span>
                                    <span class="font-bold text-emerald-950">58 Anak (41%)</span>
                                </div>
                                <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                    <div class="bg-gold-500 h-full rounded-full" style="width: 41%;"></div>
                                </div>
                            </div>

                            <div>
                                <div class="flex justify-between text-sm mb-1">
                                    <span class="text-gray-600 font-medium">Kelengkapan Berkas Dokumen</span>
                                    <span class="font-bold text-emerald-950">120 Berkas (84%)</span>
                                </div>
                                <div class="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
                                    <div class="bg-emerald-600 h-full rounded-full" style="width: 84%;"></div>
                                </div>
                            </div>
                        </div>

                        <div class="p-3.5 bg-gold-50/50 border border-gold-200 rounded-xl mt-4">
                            <p class="text-xs text-gold-800 font-semibold flex items-center space-x-1.5">
                                <i data-lucide="bell" class="w-4 h-4 text-gold-600"></i>
                                <span>INFO PENTING SPMB</span>
                            </p>
                            <p class="text-[11px] text-gray-600 mt-1">Ujian masuk gelombang ke-2 akan diadakan serentak pada hari Senin, 10 Juli 2026 pukul 08:00 WIB.</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TAB: PENDAFTARAN SPMB FORM & LIST -->
            <section id="tab-spmb" class="tab-content hidden space-y-6">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="text-2xl font-bold text-emerald-950">Penerimaan Santri Baru (SPMB)</h2>
                        <p class="text-xs text-gray-500">Pendaftaran santri baru dan pelacakan status kelulusan</p>
                    </div>
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <!-- Form pendaftaran -->
                    <div class="glass-panel p-6 rounded-2xl shadow-sm lg:col-span-2 h-fit space-y-4">
                        <h3 class="text-md font-bold text-emerald-900 border-b border-gray-100 pb-2 flex items-center space-x-2">
                            <i data-lucide="user-plus" class="text-gold-600 w-5 h-5"></i>
                            <span>Form Santri Baru</span>
                        </h3>
                        <form id="spmb-form" onsubmit="handleSpmbSubmit(event)" class="space-y-4 text-xs">
                            <div class="space-y-1">
                                <label class="block font-semibold text-gray-600">Nama Lengkap Santri</label>
                                <input type="text" id="spmb-nama" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700 focus:outline-none" placeholder="Ahmad Faiz">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1">
                                    <label class="block font-semibold text-gray-600">Jenis Kelamin</label>
                                    <select id="spmb-gender" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700">
                                        <option>Laki-laki</option>
                                        <option>Perempuan</option>
                                    </select>
                                </div>
                                <div class="space-y-1">
                                    <label class="block font-semibold text-gray-600">No. HP Orang Tua</label>
                                    <input type="text" id="spmb-phone" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700" placeholder="0812...">
                                </div>
                            </div>
                            <div class="space-y-1">
                                <label class="block font-semibold text-gray-600">Sekolah Asal</label>
                                <input type="text" id="spmb-school" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700" placeholder="SDN 01 Jakarta">
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="space-y-1">
                                    <label class="block font-semibold text-gray-600">Nilai Tes Seleksi</label>
                                    <input type="number" id="spmb-score" min="0" max="100" required class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700" placeholder="85">
                                </div>
                                <div class="space-y-1">
                                    <label class="block font-semibold text-gray-600">Dokumen Pendukung</label>
                                    <select id="spmb-docs" class="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-700">
                                        <option>Lengkap</option>
                                        <option>Belum Lengkap</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" class="w-full py-2.5 bg-emerald-900 hover:bg-emerald-850 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer">
                                Daftarkan Santri Baru
                            </button>
                        </form>
                    </div>

                    <!-- List pendaftar -->
                    <div class="glass-panel p-6 rounded-2xl shadow-sm lg:col-span-3 space-y-4">
                        <h3 class="text-md font-bold text-emerald-950 border-b border-gray-100 pb-2">Daftar Pendaftar Terakhir</h3>
                        <div class="overflow-x-auto">
                            <table class="w-full text-left text-xs border-collapse">
                                <thead>
                                    <tr class="bg-emerald-50 text-emerald-900">
                                        <th class="p-3 font-semibold rounded-l-lg">Nama Santri</th>
                                        <th class="p-3 font-semibold">Sekolah Asal</th>
                                        <th class="p-3 font-semibold text-center">Nilai</th>
                                        <th class="p-3 font-semibold">Berkas</th>
                                        <th class="p-3 font-semibold text-right rounded-r-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody id="spmb-table-body" class="divide-y divide-gray-100">
                                    <!-- Dynamic Rows -->
                                    <tr class="hover:bg-gray-50/50">
                                        <td class="p-3 font-medium text-gray-900">Rayhan Ghazi Pratama</td>
                                        <td class="p-3 text-gray-500">SDN 01 Menteng Jakarta</td>
                                        <td class="p-3 text-center font-bold">88</td>
                                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">Lengkap</span></td>
                                        <td class="p-3 text-right"><span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg text-[10px] font-bold">Lulus</span></td>
                                    </tr>
                                    <tr class="hover:bg-gray-50/50">
                                        <td class="p-3 font-medium text-gray-900">Nabila Shafa Kamila</td>
                                        <td class="p-3 text-gray-500">SD Islam Al-Azhar Surabaya</td>
                                        <td class="p-3 text-center font-bold">92</td>
                                        <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">Lengkap</span></td>
                                        <td class="p-3 text-right"><span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg text-[10px] font-bold">Lulus</span></td>
                                    </tr>
                                    <tr class="hover:bg-gray-50/50">
                                        <td class="p-3 font-medium text-gray-900">Zaki Mubarak Al-Husaini</td>
                                        <td class="p-3 text-gray-500">MIN 2 Yogyakarta</td>
                                        <td class="p-3 text-center font-bold">78</td>
                                        <td class="p-3"><span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">Belum Lengkap</span></td>
                                        <td class="p-3 text-right"><span class="bg-amber-100 text-amber-800 px-2 py-1 rounded-lg text-[10px] font-bold">Pending</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TAB: SPP -->
            <section id="tab-spp" class="tab-content hidden space-y-6">
                <div class="glass-panel p-6 rounded-2xl shadow-sm space-y-4">
                    <h2 class="text-xl font-bold text-emerald-950">Simulasi Pembayaran SPP Bulanan</h2>
                    <p class="text-xs text-gray-500">Silakan pilih tagihan santri dan lakukan simulasi pembayaran.</p>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                        <div class="bg-emerald-900 text-white p-5 rounded-2xl border-l-4 border-gold-500 space-y-2">
                            <p class="text-xs text-emerald-200">Total Tagihan Wali</p>
                            <p class="text-2xl font-bold">Rp 1.500.000</p>
                            <span class="text-[10px] bg-gold-600/50 px-2 py-0.5 rounded">Jatuh Tempo: 15 Juli 2026</span>
                        </div>
                        <div class="bg-white border border-gray-200 p-5 rounded-2xl space-y-2">
                            <p class="text-xs text-gray-500">Sudah Terbayar</p>
                            <p class="text-2xl font-bold text-emerald-900">Rp 1.800.000</p>
                            <span class="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">2 Transaksi</span>
                        </div>
                        <div class="bg-white border border-gray-200 p-5 rounded-2xl space-y-2">
                            <p class="text-xs text-gray-500">Metode Pembayaran</p>
                            <p class="text-md font-bold text-gray-800">PPTA Pay / Transfer Virtual</p>
                            <span class="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold">Secure Gateway</span>
                        </div>
                    </div>

                    <!-- List of Tagihan -->
                    <div class="space-y-3 mt-4">
                        <h3 class="text-sm font-semibold text-emerald-900">Daftar Tagihan Berjalan</h3>
                        <div class="border border-gray-100 rounded-xl divide-y divide-gray-100 overflow-hidden bg-white">
                            <div class="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs space-y-3 sm:space-y-0">
                                <div class="flex items-center space-x-3">
                                    <div class="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-900">SPP Bulanan - Juli 2026</p>
                                        <p class="text-gray-500 text-[11px]">Ahmad Faiz Al-Fatih</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <span class="font-bold">Rp 1.200.000</span>
                                    <span class="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px]">Lunas</span>
                                </div>
                            </div>

                            <div class="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs space-y-3 sm:space-y-0">
                                <div class="flex items-center space-x-3">
                                    <div class="p-2.5 rounded-lg bg-emerald-50 text-emerald-700">
                                        <i data-lucide="check-circle" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-900">Uang Makan - Juli 2026</p>
                                        <p class="text-gray-500 text-[11px]">Ahmad Faiz Al-Fatih</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <span class="font-bold">Rp 600.000</span>
                                    <span class="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px]">Lunas</span>
                                </div>
                            </div>

                            <div id="pending-spp-item" class="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs space-y-3 sm:space-y-0">
                                <div class="flex items-center space-x-3">
                                    <div class="p-2.5 rounded-lg bg-amber-50 text-amber-700">
                                        <i data-lucide="info" class="w-5 h-5"></i>
                                    </div>
                                    <div>
                                        <p class="font-bold text-gray-900">Uang Gedung / Pembangunan</p>
                                        <p class="text-gray-500 text-[11px]">Ahmad Faiz Al-Fatih</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <span class="font-bold">Rp 1.500.000</span>
                                    <span id="spp-pending-status" class="bg-red-100 text-red-800 px-2.5 py-1 rounded-full font-bold text-[10px]">Pending</span>
                                    <button id="bayar-spp-btn" onclick="simulasikanSppBayar()" class="px-4 py-1.5 bg-gold-600 hover:bg-gold-700 text-white font-bold rounded-lg cursor-pointer">Bayar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TAB: TAHFIDZ REKAP -->
            <section id="tab-tahfidz" class="tab-content hidden space-y-6">
                <div class="glass-panel p-6 rounded-2xl shadow-sm space-y-4">
                    <div class="flex justify-between items-center border-b border-gray-100 pb-3">
                        <div>
                            <h2 class="text-xl font-bold text-emerald-950">Data Tahfidz & Rekap Setoran</h2>
                            <p class="text-xs text-gray-500">Pemantauan progres hafalan per santri secara real-time</p>
                        </div>
                        <span class="text-xs font-semibold bg-gold-100 text-gold-800 px-2.5 py-1 rounded-full">30 Juz</span>
                    </div>

                    <!-- Split layout static design -->
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="border border-gray-100 rounded-xl bg-white p-4 space-y-2">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold">F</div>
                                <div>
                                    <p class="font-bold text-xs">Ahmad Faiz Al-Fatih</p>
                                    <p class="text-[10px] text-gray-500">Juz 30 (Selesai)</p>
                                </div>
                            </div>
                            <div class="text-xs text-gray-600 space-y-1">
                                <p><strong>Surah Terakhir:</strong> An-Naziat</p>
                                <p><strong>Hafalan Baru:</strong> 20 Ayat</p>
                                <p><strong>Nilai Tajwid:</strong> <span class="text-emerald-700 font-bold">92</span></p>
                            </div>
                        </div>

                        <div class="border border-gray-100 rounded-xl bg-white p-4 space-y-2">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold">W</div>
                                <div>
                                    <p class="font-bold text-xs">M. Wildan Al-Ghazali</p>
                                    <p class="text-[10px] text-gray-500">Juz 29 (Sedang Ditempuh)</p>
                                </div>
                            </div>
                            <div class="text-xs text-gray-600 space-y-1">
                                <p><strong>Surah Terakhir:</strong> Al-Mulk</p>
                                <p><strong>Hafalan Baru:</strong> 30 Ayat</p>
                                <p><strong>Nilai Tajwid:</strong> <span class="text-emerald-700 font-bold">88</span></p>
                            </div>
                        </div>

                        <div class="border border-gray-100 rounded-xl bg-white p-4 space-y-2">
                            <div class="flex items-center space-x-3 mb-2">
                                <div class="w-10 h-10 rounded-full bg-emerald-900 text-white flex items-center justify-center font-bold">Z</div>
                                <div>
                                    <p class="font-bold text-xs">Fatimah Az-Zahra</p>
                                    <p class="text-[10px] text-gray-500">Juz 22 (Konsisten)</p>
                                </div>
                            </div>
                            <div class="text-xs text-gray-600 space-y-1">
                                <p><strong>Surah Terakhir:</strong> Yasin</p>
                                <p><strong>Hafalan Baru:</strong> 40 Ayat</p>
                                <p><strong>Nilai Tajwid:</strong> <span class="text-emerald-700 font-bold">95</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- TAB: AKADEMIK LAPORAN -->
            <section id="tab-akademik" class="tab-content hidden space-y-6">
                <div class="glass-panel p-6 rounded-2xl shadow-sm space-y-4">
                    <h2 class="text-xl font-bold text-emerald-950">Laporan Hasil Akademik</h2>
                    <p class="text-xs text-gray-500">Grafik pencapaian, rekap nilai rapot terpadu santri, dan keaktifan ekstrakurikuler.</p>
                    <div class="border border-gray-200 rounded-xl p-6 bg-white flex flex-col items-center justify-center text-center space-y-3">
                        <i data-lucide="lock" class="w-12 h-12 text-gold-600"></i>
                        <h3 class="text-md font-bold text-gray-800">Laporan Rapot Belum Dirilis</h3>
                        <p class="text-xs text-gray-500 max-w-sm">Rapot tengah semester akan dipublikasikan secara serentak pada akhir Juli 2026. Pantau terus halaman ini.</p>
                    </div>
                </div>
            </section>

        </main>
    </div>

    <!-- JS Logic -->
    <script>
        // Initialize Lucide Icons
        lucide.createIcons();

        // Mobile menu toggle logic
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            sidebar.classList.toggle('translate-x-0');
        });

        // Switch Tab functionality
        function switchTab(tabId) {
            // Hide all tab content
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.add('hidden');
            });
            // Show active tab
            document.getElementById('tab-' + tabId).classList.remove('hidden');

            // Handle sidebar link active state
            document.querySelectorAll('.tab-link').forEach(link => {
                link.className = 'tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg text-emerald-200 hover:bg-emerald-900 hover:text-white transition-all';
            });
            event.currentTarget.className = 'tab-link flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-emerald-900 text-white border-l-4 border-gold-500 font-medium transition-all';
        }

        // Change simulated user role
        function changeRole(role) {
            document.getElementById('user-role-display').innerText = role;
            alert('Peran disimulasikan sebagai: ' + role);
        }

        // Handle SPMB submit
        function handleSpmbSubmit(e) {
            e.preventDefault();
            const nama = document.getElementById('spmb-nama').value;
            const gender = document.getElementById('spmb-gender').value;
            const phone = document.getElementById('spmb-phone').value;
            const school = document.getElementById('spmb-school').value;
            const score = document.getElementById('spmb-score').value;
            const docs = document.getElementById('spmb-docs').value;

            // Simple status determination
            let status = 'Pending';
            if (score >= 80 && docs === 'Lengkap') {
                status = 'Lulus';
            } else if (score < 70) {
                status = 'Gagal';
            }

            // Append row to SPMB table
            const tbody = document.getElementById('spmb-table-body');
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-gray-50/50';
            tr.innerHTML = \`
                <td class="p-3 font-medium text-gray-900">\${nama}</td>
                <td class="p-3 text-gray-500">\${school}</td>
                <td class="p-3 text-center font-bold">\${score}</td>
                <td class="p-3"><span class="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full text-[10px] font-semibold">\${docs}</span></td>
                <td class="p-3 text-right"><span class="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-lg text-[10px] font-bold">\${status}</span></td>
            \`;
            tbody.insertBefore(tr, tbody.firstChild);

            alert('Santri Baru "' + nama + '" berhasil didaftarkan dengan status: ' + status);
            document.getElementById('spmb-form').reset();
        }

        // SPP Payment simulator
        function simulasikanSppBayar() {
            const btn = document.getElementById('bayar-spp-btn');
            const status = document.getElementById('spp-pending-status');
            btn.style.display = 'none';
            status.innerText = 'Lunas';
            status.className = 'bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold text-[10px]';
            alert('Simulasi Pembayaran Berhasil! Tagihan Uang Gedung senilai Rp 1.500.000 telah lunas.');
        }
    </script>
</body>
</html>`
    },
    {
      name: 'responsive_layout.dart',
      language: 'dart',
      description: 'Flutter Widget - Deteksi Responsive Layout (Mobile / Tablet Switcher)',
      content: `import 'package:flutter/material.dart';

/// Widget pembantu untuk mengurus tata letak responsive.
/// Mendeteksi lebar layar ponsel (< 600dp) dan tablet (>= 600dp).
class ResponsiveLayout extends StatelessWidget {
  final Widget mobileBody;
  final Widget tabletBody;

  const ResponsiveLayout({
    Key? key,
    required this.mobileBody,
    required this.tabletBody,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth < 600) {
          return mobileBody;
        } else {
          return tabletBody;
        }
      },
    );
  }
}`
    },
    {
      name: 'tahfidz_controller.dart',
      language: 'dart',
      description: 'Flutter State Management (Provider/Notifier) - Mengelola Data Hafalan & Pembayaran',
      content: `import 'package:flutter/material.dart';

/// Data Model Rekor Tahfidz
class TahfidzRecord {
  final String id;
  final String santriName;
  final String surahName;
  final int startAyat;
  final int endAyat;
  final int juz;
  final int tajwidScore;
  final int fluentScore;
  final String ustadzName;
  final String date;
  final String notes;

  TahfidzRecord({
    required this.id,
    required this.santriName,
    required this.surahName,
    required this.startAyat,
    required this.endAyat,
    required this.juz,
    required this.tajwidScore,
    required this.fluentScore,
    required this.ustadzName,
    required this.date,
    required this.notes,
  });
}

/// Data Model Tagihan SPP
class SppBill {
  final String id;
  final String category;
  final String month;
  final int year;
  final int amount;
  String status; // 'Lunas' atau 'Pending'
  final String dueDate;

  SppBill({
    required this.id,
    required this.category,
    required this.month,
    required this.year,
    required this.amount,
    required this.status,
    required this.dueDate,
  });
}

/// Controller State Management Sederhana
class AppStateController extends ChangeNotifier {
  // Database rekor setoran hafalan lokal
  final List<TahfidzRecord> _records = [
    TahfidzRecord(
      id: '1',
      santriName: 'Ahmad Faiz Al-Fatih',
      surahName: 'An-Naba',
      startAyat: 1,
      endAyat: 40,
      juz: 30,
      tajwidScore: 92,
      fluentScore: 95,
      ustadzName: 'Ustadz Hamzah',
      date: '2026-07-02',
      notes: 'Sangat lancar, makharijul huruf tepat. Pertahankan!',
    ),
    TahfidzRecord(
      id: '2',
      santriName: 'M. Wildan Al-Ghazali',
      surahName: 'Al-Mulk',
      startAyat: 1,
      endAyat: 15,
      juz: 29,
      tajwidScore: 85,
      fluentScore: 80,
      ustadzName: 'Ustadz Mansur',
      date: '2026-07-03',
      notes: 'Ulangi lagi di rumah untuk kelancaran setoran berikutnya.',
    ),
    TahfidzRecord(
      id: '3',
      santriName: 'Fatimah Az-Zahra',
      surahName: 'Yasin',
      startAyat: 1,
      endAyat: 40,
      juz: 22,
      tajwidScore: 95,
      fluentScore: 96,
      ustadzName: 'Ustadz Abdul Malik',
      date: '2026-07-01',
      notes: 'MasyaAllah, bacaan sangat tartil dan tajwid kokoh.',
    ),
  ];

  // Database tagihan SPP
  final List<SppBill> _bills = [
    SppBill(
      id: 'b1',
      category: 'SPP Bulanan',
      month: 'Juli',
      year: 2026,
      amount: 1200000,
      status: 'Lunas',
      dueDate: '10 Juli 2026',
    ),
    SppBill(
      id: 'b2',
      category: 'Uang Makan',
      month: 'Juli',
      year: 2026,
      amount: 600000,
      status: 'Lunas',
      dueDate: '10 Juli 2026',
    ),
    SppBill(
      id: 'b3',
      category: 'Uang Gedung',
      month: 'Juli',
      year: 2026,
      amount: 1500000,
      status: 'Pending',
      dueDate: '15 Juli 2026',
    ),
  ];

  List<TahfidzRecord> get records => _records;
  List<SppBill> get bills => _bills;

  // Handler interaktif tambah setoran
  void addTahfidzRecord(TahfidzRecord record) {
    _records.add(record);
    notifyListeners();
  }

  // Handler bayar tagihan
  void payBill(String billId) {
    final index = _bills.indexWhere((b) => b.id == billId);
    if (index != -1) {
      _bills[index].status = 'Lunas';
      notifyListeners();
    }
  }
}`
    },
    {
      name: 'tahfidz_progress_screen.dart',
      language: 'dart',
      description: 'Flutter UI - Progress Hafalan (HP Vertical & Tablet Split Master-Detail dengan Grafik)',
      content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'responsive_layout.dart';
import 'tahfidz_controller.dart';

class TahfidzProgressScreen extends StatelessWidget {
  const TahfidzProgressScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Tahfidz Al-Qur\\'an PPTA v3',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: const Color(0xFF064E3B), // Emerald Green
        elevation: 0,
      ),
      body: ResponsiveLayout(
        mobileBody: const TahfidzMobileView(),
        tabletBody: const TahfidzTabletView(),
      ),
    );
  }
}

/// Tampilan Ponsel (HP): List Vertikal Sederhana & Detail Ekspansi
class TahfidzMobileView extends StatelessWidget {
  const TahfidzMobileView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppStateController>(context);
    return Container(
      color: Colors.grey[100],
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Progres Hafalan Santri (Ponsel)',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: Color(0xFF064E3B),
            ),
          ),
          const SizedBox(height: 12),
          Expanded(
            child: ListView.builder(
              itemCount: state.records.length,
              itemBuilder: (context, index) {
                final record = state.records[index];
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(12),
                    side: BorderSide(color: Colors.amber.withOpacity(0.3), width: 1),
                  ),
                  child: ExpansionTile(
                    leading: CircleAvatar(
                      backgroundColor: const Color(0xFF064E3B),
                      child: Text(
                        record.juz.toString(),
                        style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
                      ),
                    ),
                    title: Text(
                      record.santriName,
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Text('QS. \${record.surahName}: Ayat \${record.startAyat} - \${record.endAyat}'),
                    children: [
                      Padding(
                        padding: const EdgeInsets.all(16.0),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                _buildBadge('Tajwid: \${record.tajwidScore}', Colors.emerald),
                                _buildBadge('Lancar: \${record.fluentScore}', Colors.amber),
                              ],
                            ),
                            const SizedBox(height: 12),
                            Text('Tanggal: \${record.date}', style: const TextStyle(color: Colors.grey, fontSize: 13)),
                            Text('Ustadz: \${record.ustadzName}', style: const TextStyle(color: Colors.grey, fontSize: 13)),
                            const Divider(),
                            const Text('Catatan Ustadz:', style: TextStyle(fontWeight: FontWeight.bold)),
                            Text(record.notes, style: const TextStyle(fontStyle: FontStyle.italic)),
                          ],
                        ),
                      )
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildBadge(String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color),
      ),
      child: Text(
        label,
        style: TextStyle(color: color, fontWeight: FontWeight.bold, fontSize: 12),
      ),
    );
  }
}

/// Tampilan Tablet: Split-Screen (Master List & Detail Grafis Target)
class TahfidzTabletView extends StatefulWidget {
  const TahfidzTabletView({Key? key}) : super(key: key);

  @override
  State<TahfidzTabletView> createState() => _TahfidzTabletViewState();
}

class _TahfidzTabletViewState extends State<TahfidzTabletView> {
  int _selectedSantriIndex = 0;

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppStateController>(context);
    final selectedRecord = state.records[_selectedSantriIndex];

    return Row(
      children: [
        // SISI KIRI: Daftar Master Santri
        Expanded(
          flex: 2,
          child: Container(
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(right: BorderSide(color: Colors.grey[200]!)),
            ),
            child: ListView.builder(
              itemCount: state.records.length,
              itemBuilder: (context, index) {
                final record = state.records[index];
                final isSelected = _selectedSantriIndex == index;
                return ListTile(
                  selected: isSelected,
                  selectedTileColor: const Color(0xFF064E3B).withOpacity(0.08),
                  leading: CircleAvatar(
                    backgroundColor: isSelected ? const Color(0xFF064E3B) : Colors.grey[300],
                    child: Text(
                      record.juz.toString(),
                      style: TextStyle(
                        color: isSelected ? Colors.white : Colors.black87,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  title: Text(
                    record.santriName,
                    style: TextStyle(
                      fontWeight: isSelected ? FontWeight.bold : FontWeight.normal,
                      color: isSelected ? const Color(0xFF064E3B) : Colors.black87,
                    ),
                  ),
                  subtitle: Text('QS. \${record.surahName}'),
                  onTap: () {
                    setState(() {
                      _selectedSantriIndex = index;
                    });
                  },
                );
              },
            ),
          ),
        ),

        // SISI KANAN: Split Screen Grafik Progres Detil
        Expanded(
          flex: 3,
          child: Container(
            color: Colors.grey[50],
            padding: const EdgeInsets.all(24.0),
            child: SingleChildScrollView(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            selectedRecord.santriName,
                            style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold, color: Color(0xFF064E3B)),
                          ),
                          const Text('Detail Capaian Target & Statistik Hafalan', style: TextStyle(color: Colors.grey)),
                        ],
                      ),
                      const Icon(Icons.star, color: Color(0xFFD97706), size: 32),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Indikator nilai
                  Row(
                    children: [
                      Expanded(
                        child: _buildMetric('Tajwid', '\${selectedRecord.tajwidScore}', Colors.emerald),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: _buildMetric('Kelancaran', '\${selectedRecord.fluentScore}', Colors.amber),
                      ),
                    ],
                  ),
                  const SizedBox(height: 24),

                  // Grafik Batang Sederhana Flutter
                  Card(
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
                    child: Padding(
                      padding: const EdgeInsets.all(20.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'Grafik Pencapaian Hafalan (Juz)',
                            style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          const SizedBox(height: 20),
                          Row(
                            mainAxisAlignment: MainAxisAlignment.spaceAround,
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              _buildBar('Juz 30', 1.0, true),
                              _buildBar('Juz 29', 0.85, true),
                              _buildBar('Juz 28', 0.40, false),
                              _buildBar('Juz 27', 0.10, false),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(height: 24),

                  // Catatan Ustadz
                  Card(
                    color: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text('Catatan Ustadz & Rekomendasi:', style: TextStyle(fontWeight: FontWeight.bold)),
                          const SizedBox(height: 8),
                          Text(
                            '"\${selectedRecord.notes}"',
                            style: const TextStyle(fontStyle: FontStyle.italic),
                          ),
                          const Divider(),
                          Text('Guru Pengampu: \${selectedRecord.ustadzName}', style: const TextStyle(color: Colors.grey)),
                        ],
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMetric(String title, String val, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title, style: const TextStyle(color: Colors.grey, fontSize: 12)),
          Text(val, style: TextStyle(fontWeight: FontWeight.bold, fontSize: 22, color: color)),
        ],
      ),
    );
  }

  Widget _buildBar(String label, double fillPercent, bool isActive) {
    return Column(
      children: [
        Container(
          height: 100,
          width: 24,
          decoration: BoxDecoration(
            color: Colors.grey[200],
            borderRadius: BorderRadius.circular(4),
          ),
          alignment: Alignment.bottomCenter,
          child: Container(
            height: 100 * fillPercent,
            width: 24,
            decoration: BoxDecoration(
              color: isActive ? const Color(0xFF064E3B) : Colors.amber,
              borderRadius: BorderRadius.circular(4),
            ),
          ),
        ),
        const SizedBox(height: 8),
        Text(label, style: const TextStyle(fontSize: 10)),
      ],
    );
  }
}`
    },
    {
      name: 'spp_payment_screen.dart',
      language: 'dart',
      description: 'Flutter UI - Tagihan & Pembayaran SPP (Interaktif Payment Gateway)',
      content: `import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'tahfidz_controller.dart';

class SppPaymentScreen extends StatelessWidget {
  const SppPaymentScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<AppStateController>(context);

    // Hitung total pending tagihan
    final pendingBills = state.bills.where((b) => b.status == 'Pending').toList();
    final totalPending = pendingBills.fold<int>(0, (sum, b) => sum + b.amount);

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Portal Keuangan SPP Wali',
          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.white),
        ),
        backgroundColor: const Color(0xFF064E3B), // Emerald Green
        elevation: 0,
      ),
      body: Container(
        color: Colors.grey[50],
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Ringkasan Tagihan Box (Glassmorphic)
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(20),
                decoration: BoxDecoration(
                  gradient: const LinearGradient(
                    colors: [Color(0xFF064E3B), Color(0xFF043E2E)],
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                  borderRadius: BorderRadius.circular(16),
                  boxShadow: [
                    BoxShadow(color: const Color(0xFF064E3B).withOpacity(0.3), blurRadius: 10, offset: const Offset(0, 4)),
                  ],
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Total Tagihan Belum Dibayar', style: TextStyle(color: Colors.white70, fontSize: 13)),
                    const SizedBox(height: 8),
                    Text(
                      'Rp \${totalPending.toString().replaceAllMapped(RegExp(r\\'(\\\\d{1,3})(?=(\\\\d{3})+(?!\\\\d))\\'), (Match m) => \\'\${m[1]}.\\')}',
                      style: const TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 16),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.amber.withOpacity(0.2),
                        borderRadius: BorderRadius.circular(8),
                        border: Border.all(color: Colors.amber),
                      ),
                      child: const Text(
                        'Segera selesaikan sebelum jatuh tempo tanggal 10!',
                        style: TextStyle(color: Colors.amber, fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),

              // Tagihan List
              const Text(
                'Daftar Rincian Tagihan',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold, color: Color(0xFF064E3B)),
              ),
              const SizedBox(height: 12),

              ...state.bills.map((bill) {
                final isLunas = bill.status == 'Lunas';
                return Card(
                  margin: const EdgeInsets.only(bottom: 12),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  child: Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.all(10),
                              decoration: BoxDecoration(
                                color: isLunas ? Colors.emerald.withOpacity(0.1) : Colors.red.withOpacity(0.1),
                                borderRadius: BorderRadius.circular(10),
                              ),
                              child: Icon(
                                isLunas ? Icons.check_circle : Icons.payment,
                                color: isLunas ? Colors.emerald : Colors.red,
                              ),
                            ),
                            const SizedBox(width: 14),
                            Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(bill.category, style: const TextStyle(fontWeight: FontWeight.bold)),
                                Text('Bulan \${bill.month} \${bill.year}', style: const TextStyle(color: Colors.grey, fontSize: 12)),
                                Text('Jatuh Tempo: \${bill.dueDate}', style: const TextStyle(color: Colors.redAccent, fontSize: 11)),
                              ],
                            ),
                          ],
                        ),
                        Column(
                          crossAxisAlignment: CrossAxisAlignment.end,
                          children: [
                            Text(
                              'Rp \${bill.amount.toString().replaceAllMapped(RegExp(r\\'(\\\\d{1,3})(?=(\\\\d{3})+(?!\\\\d))\\'), (Match m) => \\'\${m[1]}.\\')}',
                              style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14),
                            ),
                            const SizedBox(height: 6),
                            if (isLunas)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                                decoration: BoxDecoration(
                                  color: Colors.emerald.withOpacity(0.15),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: const Text('Lunas', style: TextStyle(color: Colors.emerald, fontSize: 11, fontWeight: FontWeight.bold)),
                              )
                            else
                              ElevatedButton(
                                style: ElevatedButton.styleFrom(
                                  backgroundColor: const Color(0xFFD97706), // Premium Gold
                                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
                                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(6)),
                                ),
                                onPressed: () {
                                  _showPaymentSimulation(context, bill, state);
                                },
                                child: const Text('Bayar', style: TextStyle(color: Colors.white, fontSize: 11)),
                              ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              }).toList(),
            ],
          ),
        ),
      ),
    );
  }

  void _showPaymentSimulation(BuildContext context, SppBill bill, AppStateController state) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Text('Secure Payment Gateway (PPTA Pay)'),
          content: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Menghubungkan ke gateway aman untuk: \${bill.category}.'),
              const SizedBox(height: 12),
              Text(
                'Nominal: Rp \${bill.amount}',
                style: const TextStyle(fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 16),
              const LinearProgressIndicator(color: Color(0xFF064E3B)),
            ],
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Batal'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFF064E3B)),
              onPressed: () {
                state.payBill(bill.id);
                Navigator.of(context).pop();
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text('Pembayaran Sukses! Status terverifikasi Lunas.'),
                    backgroundColor: Colors.emerald,
                  ),
                );
              },
              child: const Text('Konfirmasi Lunas', style: TextStyle(color: Colors.white)),
            ),
          ],
        );
      },
    );
  }
}`
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" id="code-exporter-container">
      <div className="p-6 bg-[#064E3B] text-white flex flex-col md:flex-row justify-between items-start md:items-center border-b border-emerald-800/40 gap-4">
        <div>
          <span className="bg-emerald-900 text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-700/50">
            Export Center & Clean Architecture Codes
          </span>
          <h2 className="text-xl font-bold mt-2.5 text-white">Source Code & Arsitektur Lengkap</h2>
          <p className="text-xs text-emerald-200">Salin dan jalankan kode frontend web dan modul Flutter Dart.</p>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleDownload(codeFiles[activeFileIndex].name, codeFiles[activeFileIndex].content)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg border border-emerald-700/50 shadow-sm transition-all cursor-pointer"
          >
            <Download className="w-4 h-4 text-amber-400" />
            <span>Download File</span>
          </button>
          <button 
            onClick={() => handleCopy(codeFiles[activeFileIndex].content)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#D97706] hover:bg-[#b45309] text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Tersalin!' : 'Salin Kode'}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[500px]">
        {/* Left selector */}
        <div className="w-full lg:w-72 bg-slate-50 border-r border-slate-200 p-4 space-y-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Pilih File Sumber</p>
          <div className="space-y-1">
            {codeFiles.map((file, idx) => (
              <button
                key={file.name}
                onClick={() => {
                  setActiveFileIndex(idx);
                  setCopied(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-left text-xs transition-all cursor-pointer ${
                  activeFileIndex === idx
                    ? 'bg-[#064E3B] text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-200/60'
                }`}
              >
                {file.name.endsWith('.html') ? (
                  <AppWindow className={`w-4 h-4 ${activeFileIndex === idx ? 'text-amber-300' : 'text-emerald-700'}`} />
                ) : (
                  <FileCode className={`w-4 h-4 ${activeFileIndex === idx ? 'text-amber-300' : 'text-sky-600'}`} />
                )}
                <div className="truncate">
                  <p className="font-semibold">{file.name}</p>
                  <p className={`text-[10px] truncate ${activeFileIndex === idx ? 'text-emerald-200' : 'text-slate-400'}`}>
                    {file.name.endsWith('.html') ? 'Frontend Web Code' : 'Flutter/Dart Code'}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Code Display */}
        <div className="flex-1 flex flex-col bg-slate-900 text-slate-300 overflow-hidden relative">
          <div className="p-3 bg-slate-950/70 border-b border-slate-800 text-xs flex justify-between items-center px-6">
            <span className="font-mono text-amber-400">{codeFiles[activeFileIndex].name} ({codeFiles[activeFileIndex].language.toUpperCase()})</span>
            <span className="text-[10px] text-slate-500 font-medium">{codeFiles[activeFileIndex].description}</span>
          </div>
          <div className="p-6 overflow-auto font-mono text-xs leading-relaxed flex-1 h-[480px]">
            <pre className="whitespace-pre">{codeFiles[activeFileIndex].content}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}
