import React, { useState } from 'react';
import { PageId } from '../types';
import { Phone, MessageCircle, FileText, Clock, Sparkles, QrCode, X, ExternalLink, Download } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, prefillBelt?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [showQrModal, setShowQrModal] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all">
      {/* Top Utility Information Strip - Modern Cool Slate & Cyan */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800/80">
        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] font-mono-data">
            <span className="flex items-center gap-1.5 text-sky-400 font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
              ศูนย์บริการชลบุรี · ใกล้อมตะนคร &amp; แหลมฉบัง
            </span>
            <span className="hidden md:inline text-slate-700">|</span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              ตัดต่อด่วน 2 ชม. / ส่งมอบครอบคลุมทั่วไทย
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono-data">
            <a 
              href="tel:082-169-5917" 
              className="flex items-center gap-1.5 text-slate-200 hover:text-sky-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>082-169-5917</span>
            </a>
            <span className="text-slate-700">/</span>
            <a 
              href="tel:098-398-4426" 
              className="text-slate-200 hover:text-sky-300 transition-colors"
            >
              <span>098-398-4426</span>
            </a>
            <span className="text-slate-700">/</span>
            <button 
              onClick={() => setShowQrModal(true)}
              className="flex items-center gap-1 text-sky-400 hover:text-sky-300 transition-colors font-medium cursor-pointer"
              title="คลิกดู คิวอาร์โค้ด LINE บริษัท หาญภา จำกัด"
            >
              <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
              <span>ไอดี ไลน์ : Hanpabelt</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Identity */}
        <div 
          onClick={() => onNavigate('home')} 
          className="cursor-pointer flex items-center gap-3.5 select-none group"
        >
          <img 
            src="/hanpa_official_logo.svg" 
            alt="hanpabelt-logo-สายพานอุตสาหกรรม-หาญภา-ชลบุรี" 
            className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = "/hanpa_logo_clean.png";
            }}
          />
          <div className="hidden lg:block border-l border-slate-200 pl-3">
            <span className="text-xs text-slate-600 font-semibold block leading-tight">
              หาญภาเบลท์
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('home')}
            className={`px-4 py-2 rounded-xl transition-all ${
              currentPage === 'home'
                ? 'text-sky-700 bg-sky-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            หน้าแรก
          </button>
          <button
            onClick={() => onNavigate('catalog')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              currentPage === 'catalog'
                ? 'text-sky-700 bg-sky-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <span>แคตตาล็อกสินค้า</span>
            <span className="font-mono-data text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
              98+
            </span>
          </button>
          <button
            onClick={() => onNavigate('services')}
            className={`px-4 py-2 rounded-xl transition-all ${
              currentPage === 'services'
                ? 'text-sky-700 bg-sky-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            บริการตัดต่อ &amp; งานกลึง
          </button>
          <button
            onClick={() => onNavigate('knowledge')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 ${
              currentPage === 'knowledge'
                ? 'text-sky-700 bg-sky-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            <span>คลังความรู้ &amp; Q&amp;A</span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-4 py-2 rounded-xl transition-all ${
              currentPage === 'about'
                ? 'text-sky-700 bg-sky-50 font-semibold'
                : 'hover:text-slate-900 hover:bg-slate-100/70'
            }`}
          >
            เกี่ยวกับ
          </button>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowQrModal(true)}
            className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/90 text-emerald-800 text-xs font-semibold border border-emerald-200 shadow-sm transition-all active:scale-95 group"
            title="คลิกเพื่อดูและสแกน คิวอาร์โค้ด LINE บริษัท หาญภา จำกัด"
          >
            <img 
              src="/line_qr_hanpabelt.svg" 
              alt="คิวอาร์โค้ด LINE" 
              className="w-5 h-5 rounded object-contain border border-emerald-300 bg-white group-hover:scale-110 transition-transform" 
            />
            <span className="font-semibold text-emerald-900">คิวอาร์โค้ด LINE</span>
          </button>

          <button
            onClick={() => onNavigate('quote')}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-500/30 transition-all active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>ขอใบเสนอราคาด่วน</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex overflow-x-auto border-t border-slate-200/80 bg-slate-50/90 text-xs font-medium px-2 py-1.5 gap-1 items-center">
        <button
          onClick={() => setShowQrModal(true)}
          className="px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1 shrink-0"
        >
          <img src="/line_qr_hanpabelt.svg" alt="QR" className="w-4 h-4 rounded bg-white" />
          <span>คิวอาร์โค้ด</span>
        </button>
        <button
          onClick={() => onNavigate('home')}
          className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            currentPage === 'home' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600'
          }`}
        >
          หน้าแรก
        </button>
        <button
          onClick={() => onNavigate('catalog')}
          className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            currentPage === 'catalog' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600'
          }`}
        >
          แคตตาล็อกสินค้า
        </button>
        <button
          onClick={() => onNavigate('services')}
          className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            currentPage === 'services' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600'
          }`}
        >
          บริการตัดต่อ
        </button>
        <button
          onClick={() => onNavigate('knowledge')}
          className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            currentPage === 'knowledge' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600'
          }`}
        >
          คลังความรู้
        </button>
        <button
          onClick={() => onNavigate('quote')}
          className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            currentPage === 'quote' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600'
          }`}
        >
          ขอใบเสนอราคา
        </button>
        <button
          onClick={() => onNavigate('about')}
          className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
            currentPage === 'about' ? 'bg-white text-sky-700 shadow-sm font-semibold' : 'text-slate-600'
          }`}
        >
          เกี่ยวกับเรา
        </button>
      </div>

      {/* QR Code LINE Modal */}
      {showQrModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm"
          onClick={() => setShowQrModal(false)}
        >
          <div 
            className="relative w-full max-w-sm bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-100 text-center animate-in fade-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
              aria-label="ปิดหน้าต่าง QR Code"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#06c755] text-xs font-bold mb-3 border border-emerald-200/80">
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>LINE OFFICIAL · HANPABELT</span>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">
              สแกน คิวอาร์โค้ด LINE
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              บริษัท หาญภา จำกัด · ปรึกษาสเปค ส่งแบบสายพาน ขอราคาด่วน
            </p>

            <div className="p-3 bg-gradient-to-b from-slate-50 to-slate-100/60 rounded-2xl border border-slate-200 inline-block shadow-inner mb-4">
              <img
                src="/line_qr_hanpabelt.svg"
                alt="คิวอาร์โค้ด LINE Hanpabelt"
                className="w-56 h-56 mx-auto rounded-xl shadow-sm bg-white p-2 border border-slate-200/60"
              />
            </div>

            <div className="bg-slate-50 rounded-xl p-3 mb-4 text-xs font-mono-data border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-sans">ไอดี ไลน์:</span>
                <span className="font-bold text-slate-900 text-sm bg-white px-2 py-0.5 rounded border border-slate-200">
                  Hanpabelt
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span className="font-sans">โทรสายด่วน:</span>
                <span className="font-bold text-sky-700">082-169-5917, 098-398-4426</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href="https://line.me/ti/p/~Hanpabelt"
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#06c755] hover:bg-[#05b34c] text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>เปิดแอป LINE ทันที</span>
              </a>
              <a
                href="/line_qr_hanpabelt.png"
                download="hanpabelt_line_qrcode.png"
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors active:scale-95"
                title="บันทึกรูป QR Code ลงอุปกรณ์"
              >
                <Download className="w-4 h-4" />
                <span>บันทึกรูป</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
