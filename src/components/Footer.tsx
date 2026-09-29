import React from 'react';
import { PageId } from '../types';
import { MapPin, Phone, Mail, MessageCircle, Clock, ShieldCheck, ChevronRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, prefillBelt?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
      {/* Top Banner: Service Commitments in Cool Slate & Ice Blue */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-8 px-4">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-black text-xs shrink-0 font-mono-data">
              STOCK
            </div>
            <div>
              <p className="font-medium text-slate-300 text-xs leading-relaxed">สต็อกวัตถุดิบพร้อมตัดต่อในไทย ลดเวลาเครื่องจักรหยุดทำงาน</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-black text-sm shrink-0 font-mono-data">
              FDA
            </div>
            <div>
              <p className="font-medium text-slate-300 text-xs leading-relaxed">วัสดุคุณภาพสูง ทนแรงดึง ทนไขมัน และเกรดสัมผัสอาหารปลอดภัย</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-black text-sm shrink-0 font-mono-data">
              24/7
            </div>
            <div>
              <p className="font-bold text-white text-sm">ทีมช่างเทคนิคลงหน้างานทันที</p>
              <p className="text-slate-400 text-[11px] font-light mt-0.5">พร้อมเครื่องต่อเชื่อมความร้อน ชลบุรี ระยอง ฉะเชิงเทรา</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Col 1: Brand & Profile */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-1.5 rounded-xl inline-block shadow-sm">
                <img 
                  src="/hanpa_official_logo.svg" 
                  alt="hanpabelt-logo-บริษัทหาญภาจำกัด-สายพานอุตสาหกรรม-ชลบุรี" 
                  className="h-8 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "/hanpa_logo_clean.png";
                  }}
                />
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs font-light">
              จัดจำหน่ายสายพานอุตสาหกรรมครบวงจร สายพานลำเลียง PVC/PU, สายพานส่งกำลัง Timing Belt, V-Belt, สายพานฉุด และรับกลึง Pulley ตามแบบ รองรับโรงงานในนิคมอมตะนคร แหลมฉบัง มาบตาพุด และทั่วประเทศ
            </p>
            <div className="pt-1 flex items-center gap-3">
              <a 
                href="https://line.me" 
                target="_blank" 
                rel="noreferrer" 
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-[#06c755] text-white flex items-center justify-center border border-slate-800 hover:border-transparent transition-all"
                title="LINE Official"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a 
                href="tel:082-169-5917" 
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-sky-500 text-white flex items-center justify-center border border-slate-800 hover:border-transparent transition-all"
                title="โทรติดต่อด่วน"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a 
                href="mailto:Hanpabelt@gmail.com" 
                className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center border border-slate-800 hover:border-transparent transition-all"
                title="ส่งอีเมล"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories Direct Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-sky-400">
              หมวดหมู่สายพานยอดนิยม
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <button 
                  onClick={() => onNavigate('catalog', 'PVC')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  สายพาน PVC Conveyor (Diamond/เรียบ)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog', 'PU')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  สายพาน PU Food Grade (มาตรฐาน FDA)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog', 'TIM')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  สายพาน Timing Belt (ยาง/PU เสริมใยเหล็ก)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog', 'VB')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  สายพานร่องวี V-Belt (A, B, C, SPZ, SPA, SPB)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog', 'CHUD')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  สายพานฉุดแรงเสียดทานสูง (Haul-Off Belt)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('catalog', 'PULLEY')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  งานกลึง Pulley &amp; มูเล่ย์ตามแบบ Drawing
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Engineering Services */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-sky-400">
              บริการทางวิศวกรรม
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-light">
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  บริการต่อสายพานด้วยความร้อนหน้างาน
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  ติดบั้ง (Cleats) และขอบกันตก (Sidewalls)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  เจาะรูดูดชิ้นงาน (Perforation Belts)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  สำรวจและวัดขนาดเทียบสเปคหน้างาน
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('knowledge')} 
                  className="hover:text-white transition-colors text-left flex items-center gap-1.5"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  คลังความรู้ &amp; Q&amp;A สายพานอุตสาหกรรม
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('quote')} 
                  className="hover:text-sky-300 transition-colors text-left flex items-center gap-1.5 font-medium text-sky-400"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-sky-400" />
                  ขอใบเสนอราคาด่วนออนไลน์
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-sky-400">
              หาญภาเบลท์
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400 font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  เดอะแกรนด์ทรัพย์มงคล 2 เลขที่ 3/6 ถนนซากพุดซา ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20000
                </span>
              </div>
              <div className="flex items-center gap-2.5 font-mono-data">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="text-white font-medium">082-169-5917 / 098-398-4426</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hanpabelt@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>จันทร์ - ศุกร์: 08:00 - 17:30 น. (เสาร์ - อาทิตย์: ส่งใบคำขอเสนอราคาในเว็บไซต์)</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 font-medium"
              >
                <span>เปิด Google Maps นำทาง</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="pt-2 flex items-center gap-3 bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
              <img 
                src="/line_qr_hanpabelt.svg" 
                alt="คิวอาร์โค้ด LINE" 
                className="w-14 h-14 rounded-lg bg-white p-1 shrink-0 shadow-sm" 
              />
              <div className="text-xs">
                <span className="text-slate-200 font-semibold block text-[11px]">สแกน คิวอาร์โค้ด LINE</span>
                <span className="text-slate-400 text-[10px] block">ID: Hanpabelt</span>
                <a 
                  href="https://line.me/ti/p/~Hanpabelt" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-emerald-400 hover:text-emerald-300 font-medium text-[11px] inline-flex items-center gap-1 mt-0.5"
                >
                  แอดไลน์ &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Baseline */}
        <div className="pt-8 mt-10 border-t border-slate-900 flex flex-col sm:flex-row justify-end items-center gap-4 text-slate-500 text-[11px]">
          <div className="flex gap-4">
            <span className="text-slate-400">Food Grade FDA Certified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
