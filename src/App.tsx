import React, { useState } from 'react';
import { 
  AppWindow, 
  Smartphone, 
  FileCode2, 
  ShieldCheck, 
  Sparkles,
  BookOpen,
  Info
} from 'lucide-react';
import WebDashboard from './components/WebDashboard';
import FlutterSimulator from './components/FlutterSimulator';
import CodeExporter from './components/CodeExporter';

export default function App() {
  const [activeTab, setActiveTab] = useState<'web' | 'flutter' | 'code'>('web');

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-800 flex flex-col font-sans" id="applet-main-container">
      
      {/* PPTA Enterprise Control Hub Banner */}
      <div className="bg-[#064E3B] border-b border-emerald-800/50 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-md z-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#D97706] flex items-center justify-center shadow-md">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center uppercase">
              PPTA Enterprise <span className="text-amber-300 font-mono text-[10px] ml-2 font-bold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-700">v3.0</span>
            </h1>
            <p className="text-[9px] text-emerald-300 font-bold uppercase tracking-widest">Sistem Pesantren Modern Terpadu</p>
          </div>
        </div>

        {/* Tab switcher buttons with high visual contrast */}
        <div className="flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-700/30 text-xs font-semibold self-stretch md:self-auto justify-center space-x-1">
          <button
            onClick={() => setActiveTab('web')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'web'
                ? 'bg-[#D97706] text-white shadow-sm font-bold'
                : 'text-emerald-100/75 hover:bg-emerald-800/50 hover:text-white'
            }`}
          >
            <AppWindow className="w-4 h-4 text-white shrink-0" />
            <span className="text-[11px] sm:text-xs">Web Admin<span className="hidden md:inline"> Dashboard</span></span>
          </button>

          <button
            onClick={() => setActiveTab('flutter')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'flutter'
                ? 'bg-[#D97706] text-white shadow-sm font-bold'
                : 'text-emerald-100/75 hover:bg-emerald-800/50 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4 text-white shrink-0" />
            <span className="text-[11px] sm:text-xs">Aplikasi HP<span className="hidden md:inline"> (Simulator)</span></span>
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-[#D97706] text-white shadow-sm font-bold'
                : 'text-emerald-100/75 hover:bg-emerald-800/50 hover:text-white'
            }`}
          >
            <FileCode2 className="w-4 h-4 text-white shrink-0" />
            <span className="text-[11px] sm:text-xs">Source Code<span className="hidden md:inline"> & Export</span></span>
          </button>
        </div>
      </div>

      {/* Main Tab Views Wrapper */}
      <div className="flex-1">
        
        {activeTab === 'web' && (
          <div className="animate-fade-in" id="web-dashboard-view">
            <WebDashboard />
          </div>
        )}

        {activeTab === 'flutter' && (
          <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-8 animate-fade-in" id="flutter-simulator-view">
            <FlutterSimulator />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-8 animate-fade-in" id="code-exporter-view">
            <CodeExporter />
          </div>
        )}

      </div>

      {/* Corporate Islamic Global Footer */}
      <footer className="bg-[#052e24] text-emerald-300 border-t border-emerald-800/40 py-4 px-6 text-xs flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-500" />
          <span className="font-semibold text-slate-200">PPTA Enterprise v3.0 &copy; 2026</span>
          <span className="text-[10px] text-emerald-400">| Premium Clean Architecture Codebase</span>
        </div>
        <div className="flex items-center space-x-1.5 bg-emerald-950/40 px-3 py-1 rounded border border-emerald-800/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Clean Minimalism Theme</span>
        </div>
      </footer>

    </div>
  );
}
