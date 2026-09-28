import React from 'react';
import { PageId } from '../types';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Award, 
  CheckCircle2,
  Truck,
  Layers,
  ChevronRight
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId, prefillBelt?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-12 bg-slate-50/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-slate-200/90 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono-data font-semibold mb-2">
            <span>HANPA CO., LTD. · CHON BURI</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            บริษัท หาญภา จำกัด
            <span className="sr-only"> HANPABELT ชลบุรี ระยอง สายพานอุตสาหกรรม</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl font-light">
            ผู้เชี่ยวชาญด้านระบบสายพานลำเลียงและสายพานส่งกำลังมาตรฐานสากล รองรับอุตสาหกรรมในภาคตะวันออกและทั่วประเทศ
          </p>
        </div>

        {/* Section 1: Company Profile & Core Values */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm space-y-5">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight pb-3 border-b border-slate-100">
              คู่คิดด้านอุปกรณ์อุตสาหกรรม ที่เข้าใจความต้องการของคุณ
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              <strong>บริษัท หาญภา จำกัด</strong> ก่อตั้งขึ้นเพื่อดำเนินธุรกิจนำเข้า จัดจำหน่าย และให้บริการแปรรูปตัดต่อสายพานอุตสาหกรรมแบบครบวงจร ที่ตั้งของสำนักงานและศูนย์บริการตั้งอยู่ในอำเภอเมืองชลบุรี ใกล้พื้นที่ยุทธศาสตร์นิคมอุตสาหกรรมอมตะนคร นิคมอุตสาหกรรมแหลมฉบัง และนิคมอุตสาหกรรมปิ่นทอง
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              เราตระหนักดีว่าในกระบวนการผลิตทางอุตสาหกรรม การหยุดชะงักของเครื่องจักรสร้างความสูญเสียอย่างมาก ทีมงานของหาญภาจึงมุ่งเน้นการคัดสรรผลิตภัณฑ์ที่มีคุณภาพมาตรฐานสากล ทั้งสายพาน PVC, PU Food Grade (FDA), สายพานไทม์มิ่ง (Timing Belt) เสริมลวดสลิง, V-Belt ตลอดจนงานกลึงพูลเลย์ตามแบบ
            </p>
            <p className="text-sm text-slate-600 leading-relaxed font-light">
              ด้วยประสบการณ์และความเชี่ยวชาญทางเทคนิค เราพร้อมให้คำปรึกษาและแนะนำสายพานให้เหมาะสมกับลักษณะงาน สภาพแวดล้อม (ทนความร้อน ทนน้ำมัน สารเคมี หรือการเสียดสี) และงบประมาณ เพื่อให้กระบวนการผลิตของท่านดำเนินไปอย่างต่อเนื่องและคุ้มค่าที่สุด
            </p>

            {/* Quality Standard Highlights */}
            <div className="pt-4 border-t border-slate-100 text-xs font-mono-data max-w-sm">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-sky-50/60 border border-sky-100">
                <Award className="w-6 h-6 text-sky-600 shrink-0" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">FDA 21 CFR</span>
                  <span className="text-[11px] text-slate-500 font-sans font-light">เกรดสัมผัสอาหารปลอดภัย</span>
                </div>
              </div>
            </div>
          </div>

          {/* Plant Fact Sheet (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <span className="font-mono-data font-bold text-xs uppercase text-slate-900">
                FACILITY SPECIFICATIONS
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 font-mono-data text-[10px] font-bold">
                OPERATIONAL
              </span>
            </div>

            <div className="rounded-2xl border border-slate-200/80 overflow-hidden text-xs divide-y divide-slate-100">
              <div className="p-3 flex justify-between bg-slate-50">
                <span className="text-slate-500">ชื่อนิติบุคคล:</span>
                <span className="font-bold text-slate-900">บริษัท หาญภา จำกัด</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">พื้นที่ปฏิบัติการ:</span>
                <span className="text-slate-800">อ.เมือง จ.ชลบุรี (ใกล้อมตะนคร)</span>
              </div>
              <div className="p-3 flex justify-between bg-slate-50">
                <span className="text-slate-500">ขอบเขตการจัดส่ง:</span>
                <span className="text-slate-800 font-medium">ทั่วไทย</span>
              </div>
              <div className="p-3 flex justify-between">
                <span className="text-slate-500">บริการฉุกเฉิน:</span>
                <span className="font-mono-data font-semibold text-sky-600">24 ชม. สำหรับลูกค้าโรงงาน</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('quote')}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all"
              >
                ขอใบเสนอราคา
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Contact & Location */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 space-y-8 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono-data font-semibold text-sky-600 uppercase tracking-wider">
              CONTACT &amp; LOGISTICS
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              ช่องทางการติดต่อและแผนที่ตั้งโรงงาน
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            {/* Box 1: Address */}
            <div className="rounded-2xl border border-slate-200/80 p-6 bg-slate-50/60 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">ที่อยู่สำนักงานและโรงงาน</h4>
              <p className="text-slate-600 leading-relaxed font-light">
                เดอะแกรนด์ทรัพย์มงคล 2 เลขที่ 3/6 ถนนซากพุดซา ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20000
              </p>
              <p className="text-xs font-mono-data text-sky-700">
                (ใกล้นิคมอมตะนครและทางด่วนมอเตอร์เวย์)
              </p>
            </div>

            {/* Box 2: Telephony & Digital */}
            <div className="rounded-2xl border border-slate-200/80 p-6 bg-slate-50/60 space-y-3 font-mono-data">
              <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center">
                <Phone className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900 font-sans">เบอร์โทรศัพท์และ LINE</h4>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">โทรสายตรง 1:</span>
                  <a href="tel:082-169-5917" className="font-semibold text-slate-900 hover:text-sky-600">
                    082-169-5917
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">โทรสายตรง 2:</span>
                  <a href="tel:098-398-4426" className="font-semibold text-slate-900 hover:text-sky-600">
                    098-398-4426
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">LINE Official:</span>
                  <span className="font-bold text-sky-700">Hanpabelt</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">อีเมล:</span>
                  <span className="font-medium text-slate-900">Hanpabelt@gmail.com</span>
                </div>

                <div className="pt-2.5 mt-2 border-t border-slate-200 flex items-center gap-3">
                  <img 
                    src="/line_qr_hanpabelt.svg" 
                    alt="คิวอาร์โค้ด LINE Hanpabelt" 
                    className="w-16 h-16 rounded-xl border border-slate-200 bg-white p-1 shadow-sm shrink-0"
                  />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">สแกน QR Code LINE</span>
                    <span className="text-[11px] text-slate-500 block">แอดเพื่อน ขอสเปคด่วน</span>
                    <a 
                      href="https://line.me/ti/p/~Hanpabelt" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs text-[#06c755] font-bold hover:underline inline-flex items-center gap-1 mt-0.5"
                    >
                      เปิดใน LINE &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Box 3: Operating Hours */}
            <div className="rounded-2xl border border-slate-200/80 p-6 bg-slate-50/60 space-y-3">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-sm text-slate-900">เวลาทำการ</h4>
              <p className="text-slate-600 leading-relaxed font-light">
                <strong>จันทร์ - ศุกร์:</strong> 08:00 - 17:30 น.<br />
                <strong>เสาร์ - อาทิตย์:</strong> ส่งใบคำขอเสนอราคาในเว็บไซต์
              </p>
            </div>
          </div>

          {/* Interactive Map Box */}
          <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono-data text-[10px] font-semibold border border-sky-500/30">
                GOOGLE MAPS LOCATION
              </span>
              <div className="py-1">
                <img 
                  src="/hanpa_official_logo.svg" 
                  alt="hanpabelt-logo-บริษัทหาญภาจำกัด-สำนักงานชลบุรี" 
                  className="h-14 sm:h-16 w-auto object-contain bg-white px-4 py-2 rounded-xl shadow-md"
                  onError={(e) => {
                    e.currentTarget.src = "/hanpa_official_brand.jpg";
                  }}
                />
              </div>
              <p className="text-xs text-slate-400 max-w-xl font-light">
                เดอะแกรนด์ทรัพย์มงคล 2 เลขที่ 3/6 ถ.ซากพุดซา ต.ห้วยกะปิ อ.เมือง จ.ชลบุรี 20000
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md transition-all active:scale-95"
              >
                นำทางด้วย Google Maps →
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
