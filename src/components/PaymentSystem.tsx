import React, { useState } from 'react';
import { 
  CreditCard, 
  DollarSign, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  FileText, 
  Download, 
  UserCheck, 
  Heart, 
  Award,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { SppBill } from '../types';

interface PaymentSystemProps {
  bills: SppBill[];
  onPayBill: (billId: string) => void;
}

export default function PaymentSystem({ bills, onPayBill }: PaymentSystemProps) {
  const [activePaymentTab, setActivePaymentTab] = useState<'spp' | 'donasi'>('spp');
  const [selectedVaBank, setSelectedVaBank] = useState<string>('BSI');
  const [paymentStep, setPaymentStep] = useState<'list' | 'checkout' | 'processing' | 'success'>('list');
  const [activeBill, setActiveBill] = useState<SppBill | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Infaq & Sedekah States
  const [donationCategory, setDonationCategory] = useState<string>('Sedekah Tahfidz');
  const [customDonationAmount, setCustomDonationAmount] = useState<string>('');
  const [donationSuccessMsg, setDonationSuccessMsg] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return 'Rp ' + amount.toLocaleString('id-ID');
  };

  const calculateTotalPending = () => {
    return bills.filter(b => b.status === 'Pending').reduce((sum, b) => sum + b.amount, 0);
  };

  const calculateTotalPaid = () => {
    return bills.filter(b => b.status === 'Lunas').reduce((sum, b) => sum + b.amount, 0);
  };

  const handleCheckoutBill = (bill: SppBill) => {
    setActiveBill(bill);
    setPaymentStep('checkout');
  };

  const processPayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      if (activeBill) {
        onPayBill(activeBill.id);
      }
      setPaymentStep('success');
    }, 2000);
  };

  const handleQuickDonation = (amount: number) => {
    setCustomDonationAmount(amount.toString());
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(customDonationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Masukkan nominal donasi yang valid.');
      return;
    }

    setDonationSuccessMsg(`Jazakumullah Khairan! Donasi ${donationCategory} sebesar ${formatCurrency(amount)} berhasil diproses.`);
    setCustomDonationAmount('');
    setTimeout(() => setDonationSuccessMsg(null), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="space-y-4" id="payment-system-module">
      
      {/* Tab Selectors */}
      <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/50 text-xs font-bold w-full">
        <button
          onClick={() => { setActivePaymentTab('spp'); setPaymentStep('list'); }}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activePaymentTab === 'spp'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Tagihan SPP & Sekolah</span>
        </button>

        <button
          onClick={() => { setActivePaymentTab('donasi'); }}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
            activePaymentTab === 'donasi'
              ? 'bg-[#064E3B] text-white shadow-sm'
              : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Infaq & Sedekah</span>
        </button>
      </div>

      {activePaymentTab === 'spp' && (
        <div className="space-y-4 animate-fade-in">
          
          {paymentStep === 'list' && (
            <>
              {/* Financial Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-emerald-50 dark:bg-emerald-950/25 p-3.5 rounded-2xl border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-[9px] text-emerald-800 dark:text-emerald-300 font-bold uppercase tracking-wider block">Total Terbayar</span>
                  <span className="text-sm font-black text-emerald-900 dark:text-emerald-400 block mt-1">{formatCurrency(calculateTotalPaid())}</span>
                </div>
                <div className="bg-red-50 dark:bg-red-950/25 p-3.5 rounded-2xl border border-red-100 dark:border-red-900/30">
                  <span className="text-[9px] text-red-800 dark:text-red-300 font-bold uppercase tracking-wider block">Sisa Tagihan</span>
                  <span className="text-sm font-black text-red-900 dark:text-red-400 block mt-1">{formatCurrency(calculateTotalPending())}</span>
                </div>
              </div>

              {/* Bills List */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-700 px-1 block">Rincian Tagihan Belajar</span>
                
                {bills.map(bill => {
                  const isLunas = bill.status === 'Lunas';
                  return (
                    <div 
                      key={bill.id}
                      className="bg-white dark:bg-slate-900 rounded-3xl p-4 border border-slate-100 dark:border-slate-800 shadow-xs space-y-3"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-2.5">
                          <div className={`p-2 rounded-xl shrink-0 ${isLunas ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-700'}`}>
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100">{bill.category}</h4>
                            <p className="text-[10px] text-slate-400 font-medium">Periode {bill.month} {bill.year}</p>
                          </div>
                        </div>

                        <span className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          isLunas ? 'bg-emerald-900 text-emerald-100' : 'bg-red-100 text-red-800'
                        }`}>
                          {bill.status === 'Lunas' ? 'Lunas' : 'Belum Bayar'}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold">
                        <div>
                          <span className="text-[9px] text-slate-400 block uppercase tracking-wider">Nominal</span>
                          <span className="text-slate-800 dark:text-slate-200 font-extrabold">{formatCurrency(bill.amount)}</span>
                        </div>

                        {!isLunas ? (
                          <button
                            onClick={() => handleCheckoutBill(bill)}
                            className="px-4 py-1.5 bg-[#064E3B] hover:bg-emerald-950 text-white font-extrabold rounded-xl text-[10px] transition-colors cursor-pointer flex items-center space-x-1"
                          >
                            <span>Bayar Sekarang</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        ) : (
                          <button
                            onClick={() => alert('Mengunduh Bukti Kuitansi Pembayaran Digital...')}
                            className="px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60 font-bold rounded-xl text-[10px] transition-colors flex items-center space-x-1"
                          >
                            <Download className="w-3 h-3" />
                            <span>Kuitansi</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Checkout Screen with VA & QRIS Selection */}
          {paymentStep === 'checkout' && activeBill && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 animate-fade-in">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2.5">
                <span className="text-xs font-bold text-slate-800">Pembayaran Online Aman</span>
                <button onClick={() => setPaymentStep('list')} className="text-xs text-emerald-800 font-bold">Batalkan</button>
              </div>

              {/* Bill brief */}
              <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-150 text-xs font-semibold space-y-1">
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Item Tagihan</p>
                <p className="text-slate-800 dark:text-slate-100 font-extrabold">{activeBill.category}</p>
                <p className="text-slate-500 font-mono text-[10px]">Nominal: <span className="text-[#064E3B] font-extrabold">{formatCurrency(activeBill.amount)}</span></p>
              </div>

              {/* Payment Channel Selectors */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Pilih Bank Virtual Account</span>
                <div className="grid grid-cols-3 gap-2">
                  {['BSI', 'BCA', 'BRI', 'Mandiri', 'BNI', 'QRIS'].map(bank => (
                    <button
                      key={bank}
                      onClick={() => setSelectedVaBank(bank)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                        selectedVaBank === bank
                          ? 'bg-[#064E3B] text-white border-emerald-950'
                          : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>

              {selectedVaBank !== 'QRIS' ? (
                // VA INSTRUCTIONS
                <div className="bg-amber-50/50 border border-amber-200/40 p-4 rounded-2xl space-y-3 text-xs font-semibold">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[9px] text-amber-800 uppercase block">Virtual Account {selectedVaBank}</span>
                      <span className="text-slate-800 font-mono font-black tracking-wide text-sm">98820260101004</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('98820260101004')}
                      className="text-[10px] text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 font-bold"
                    >
                      {copiedText ? 'Disalin' : 'Salin'}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Gunakan m-Banking atau ATM terdekat untuk melakukan pembayaran otomatis real-time ke rekening PPTA.</p>
                </div>
              ) : (
                // QRIS SCANNER SIMULATION
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-150 dark:border-slate-800/80 p-4 rounded-2xl flex flex-col items-center justify-center text-center space-y-2.5">
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Pindai QRIS Resmi PPTA</span>
                  {/* Real-looking mockup QR */}
                  <div className="w-32 h-32 bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-center shadow-xs">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=PPTA_ALISHLAH_FURQON_SPP_1200000" referrerPolicy="no-referrer" alt="QRIS Code" className="w-28 h-28" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#064E3B]">PPTA_ALISHLAH_FURQON_PAY</span>
                </div>
              )}

              {/* Confirm Pay Button */}
              <button
                onClick={processPayment}
                className="w-full py-3 bg-[#064E3B] hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all shadow-xs uppercase tracking-wider cursor-pointer"
              >
                Saya Sudah Transfer / Bayar
              </button>
            </div>
          )}

          {/* Processing simulated loader */}
          {paymentStep === 'processing' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-700 animate-spin"></div>
              <div>
                <h4 className="font-bold text-slate-800">Menghubungkan Server Keuangan</h4>
                <p className="text-[10px] text-slate-400 mt-1">Sedang memverifikasi nomor Virtual Account & tanda terima...</p>
              </div>
            </div>
          )}

          {/* Success screen */}
          {paymentStep === 'success' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center shadow-xs">
                <CheckCircle className="w-7 h-7" />
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-slate-100 text-sm">Pembayaran SPP Sukses!</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Dana sebesar <span className="text-[#064E3B] font-bold">{formatCurrency(activeBill?.amount || 1200000)}</span> telah berhasil masuk ke kas Pondok Pesantren.</p>
              </div>
              <button
                onClick={() => setPaymentStep('list')}
                className="px-6 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Kembali ke Ringkasan
              </button>
            </div>
          )}

        </div>
      )}

      {/* DONASI / INFAQ / SEDEKAH TAB */}
      {activePaymentTab === 'donasi' && (
        <form onSubmit={handleDonationSubmit} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 space-y-4 animate-fade-in">
          <div>
            <h3 className="font-black text-slate-900 dark:text-slate-100 text-xs uppercase flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>Program Amal Sholih Pondok</span>
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">Berikan donasi terbaik Anda untuk fasilitas tahfidz atau asrama yatim dhuafa pesantren.</p>
          </div>

          {donationSuccessMsg && (
            <div className="bg-emerald-50 text-emerald-900 p-3 rounded-2xl text-[10px] font-bold leading-relaxed border border-emerald-100">
              {donationSuccessMsg}
            </div>
          )}

          {/* Program selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase block">Kategori Program</label>
            <select
              value={donationCategory}
              onChange={(e) => setDonationCategory(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200/50 rounded-xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-emerald-900 focus:outline-none"
            >
              <option value="Sedekah Tahfidz">Sedekah Pemulia Penghafal Al-Quran</option>
              <option value="Infaq Operasional Harian">Infaq Operasional / Listrik Masjid</option>
              <option value="Wakaf Pembangunan Asrama">Wakaf Pembangunan Gedung Asrama Baru</option>
              <option value="Donasi Yatim Dhuafa">Santunan Yatim & Santri Dhuafa</option>
            </select>
          </div>

          {/* Donation Progress Bar */}
          <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-150">
            <div className="flex justify-between text-[10px] font-bold mb-1">
              <span className="text-slate-600">Target Wakaf Asrama</span>
              <span className="text-[#064E3B]">Rp 450 Juta / Rp 500 Juta (90%)</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-800 to-amber-600 h-full rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>

          {/* Speed Nominals Grid */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Nominal Cepat</span>
            <div className="grid grid-cols-4 gap-2 text-center">
              {[10000, 25000, 50000, 100000].map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleQuickDonation(amount)}
                  className="py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-700 text-[11px] font-bold rounded-xl transition-all cursor-pointer"
                >
                  {amount === 10000 ? '10k' : amount === 25000 ? '25k' : amount === 50000 ? '50k' : '100k'}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Nominal Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase block">Nominal Donasi Bebas (Rp)</label>
            <input
              type="number"
              value={customDonationAmount}
              onChange={(e) => setCustomDonationAmount(e.target.value)}
              required
              placeholder="Masukkan nominal donasi..."
              className="w-full p-2.5 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-emerald-900 focus:outline-none text-slate-800"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#064E3B] hover:bg-emerald-950 text-white font-black text-xs rounded-2xl transition-all uppercase tracking-wider cursor-pointer"
          >
            Donasikan Sekarang (Amal Sholih)
          </button>
        </form>
      )}

    </div>
  );
}
