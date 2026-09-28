import React from 'react';
import { PageId } from '../types';
import { 
  Wrench, 
  Flame, 
  Cpu, 
  Scissors, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId, prefillBelt?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const serviceList = [
    {
      id: "splicing",
      title: "บริการตัดต่อและเชื่อมต่อสายพานหน้างาน (On-Site Splicing)",
      tagline: "ลดเวลาหยุดเครื่องจักร (Zero Downtime) ด้วยเครื่องอัดความร้อนเคลื่อนที่",
      desc: "บริการตัดต่อสายพานลำเลียง PVC, PU และยาง ทั้งแบบต่อร้อน (Hot Vulcanization/Finger Joint), ต่อน้ำยาเย็น (Cold Bonding) และต่อด้วยข้อต่อสเตนเลส Alligator โดยทีมช่างเทคนิคผู้มีประสบการณ์สูง พร้อมเครื่องเพรสเคลื่อนที่ลงหน้างานในเขตชลบุรีและนิคมอุตสาหกรรมภาคตะวันออก",
      specs: [
        "เครื่องเพรสความร้อนอุณหภูมิแม่นยำ ±2°C",
        "รองรับหน้ากว้างสูงสุด 3,200 mm",
        "รอยต่อเรียบเสมอกัน 100% ไม่สะดุดลูกกลิ้ง",
        "มีบริการฉุกเฉินตลอด 24 ชั่วโมงกรณีสายพานขาดในไลน์ผลิต"
      ],
      badge: "SPLICING & JOINT",
      color: "sky"
    },
    {
      id: "pulley",
      title: "งานกลึงและกัดฟัน Pulley / มูเล่ย์ส่งกำลังตาม Drawing",
      tagline: "ผลิตตามแบบวิศวกรรม 2D/3D ถ่วงสมดุล Dynamic Balance",
      desc: "รับผลิตและแปรรูปพูลเลย์สายพานไทม์มิ่ง (HTD 3M, 5M, 8M, 14M, T5, T10, AT5, AT10) และมูเล่ย์ร่องวี (A, B, C, SPZ, SPA, SPB) ด้วยเครื่องจักร CNC กลึงเจาะรูเพลา ทำร่องลิ่ม ต๊าปเกลียวหนอน และถ่วงสมดุลอย่างแม่นยำ",
      specs: [
        "วัสดุ: อลูมิเนียมเกรด 6061-T6, เหล็กหล่อ FC25, เหล็กเหนียว S45C, สแตนเลส 304",
        "ชุบผิวอโนไดซ์ (Anodize) ชุบฮาร์ดโครม หรือรมดำตามความต้องการ",
        "รองรับงานสั่งทำตั้งแต่ 1 ชิ้น จนถึงระดับ Mass Production",
        "ตรวจสอบค่าพิกัดความเผื่อ (Tolerance) ด้วยเครื่องมือวัดมาตรฐานสากล"
      ],
      badge: "CNC MACHINING",
      color: "blue"
    },
    {
      id: "fabrication",
      title: "งานดัดแปลงสายพานพิเศษ (Cleats, Sidewalls & Perforations)",
      tagline: "เพิ่มประสิทธิภาพการลำเลียงตามลักษณะชิ้นงานเฉพาะทาง",
      desc: "บริการติดบั้งสันกันลื่น (Cleats), ติดขอบยางกันตกด้านข้าง (Corrugated Sidewalls), ติดสันนำร่องใต้สายพาน (Guide Profiles V-Guides) และเจาะรูระบบสุญญากาศดูดชิ้นงาน (Vacuum Perforations) ด้วยเทคโนโลยีการเชื่อมต่อความถี่สูง",
      specs: [
        "บั้ง PVC และ PU มีความสูงตั้งแต่ 10 mm ถึง 100 mm",
        "ขอบกันตก Sidewall สูง 20 mm - 80 mm ป้องกันเม็ดพลาสติก/ผงหกตกหล่น",
        "เจาะรูกลม รูรี ตาม Drawing ระยะ Pitch แม่นยำระดับมิลลิเมตร",
        "ติดสันนำร่องหลังสายพาน ป้องกันสายพานวิ่งส่ายหรือตกขอบ"
      ],
      badge: "CUSTOM FABRICATION",
      color: "sky"
    }
  ];

  return (
    <div className="py-12 bg-slate-50/60">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-slate-200/90 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-mono-data font-semibold mb-2">
            <span>ENGINEERING &amp; FIELD SERVICES</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            บริการตัดต่อ ติดตั้งหน้างาน และงานสั่งทำ Pulley
            <span className="sr-only"> HANPABELT ชลบุรี ระยอง</span>
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl font-light">
            เราให้บริการทางวิศวกรรมสายพานอุตสาหกรรมครบวงจร รองรับโรงงานผลิตที่ต้องการความเร็ว ความแม่นยำ และความต่อเนื่องของไลน์การผลิต
          </p>
        </div>

        {/* Service Offerings in Modern Cool Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((srv) => (
            <div 
              key={srv.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-mono-data font-semibold bg-sky-50 text-sky-700 px-3 py-1 rounded-full border border-sky-100">
                    {srv.badge}
                  </span>
                  <span className="text-[11px] font-mono-data text-slate-400">
                    SLA: 2-4 HOURS
                  </span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    {srv.title}
                  </h2>
                  <p className="text-xs text-sky-600 font-medium mt-1">
                    {srv.tagline}
                  </p>
                  <p className="text-xs text-slate-500 leading-relaxed mt-2.5 font-light">
                    {srv.desc}
                  </p>
                </div>

                {/* Specs Box */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/70 text-xs space-y-2 font-mono-data">
                  <span className="font-semibold text-slate-800 block text-[11px] uppercase tracking-wide">
                    ขีดความสามารถทางเทคนิค (Capability):
                  </span>
                  {srv.specs.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('quote', srv.title)}
                  className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-sky-600 text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-2 active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>ปรึกษาทีมช่าง / ขอใบเสนอราคาบริการนี้</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 4-Step Engineering Workflow */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-10 space-y-8 shadow-sm">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono-data font-semibold text-sky-600 uppercase tracking-wider">
              WORKFLOW &amp; EXECUTION
            </span>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
              ขั้นตอนการดำเนินงานมาตรฐานวิศวกรรมของ หาญภา
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-xl font-bold font-mono-data text-sky-600 bg-sky-100/70 px-2.5 py-1 rounded-lg inline-block">
                01
              </span>
              <h4 className="font-bold text-sm text-slate-900">รับโจทย์และวัดขนาดหน้างาน</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-light">
                ลูกค้าระบุขนาด หน้ากว้าง ความยาว หรือส่งรูปถ่าย/ตัวอย่างเดิม ทีมงานพร้อมส่งช่างเข้าวัดขนาดหน้างาน
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-xl font-bold font-mono-data text-sky-600 bg-sky-100/70 px-2.5 py-1 rounded-lg inline-block">
                02
              </span>
              <h4 className="font-bold text-sm text-slate-900">ประเมินราคาด่วนใน 2 ชม.</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-light">
                ฝ่ายขายตรวจสอบสต็อก ออกใบเสนอราคาพร้อมกำหนดส่งมอบ และแนะนำเกรดสายพานที่คุ้มค่าที่สุด
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-xl font-bold font-mono-data text-sky-600 bg-sky-100/70 px-2.5 py-1 rounded-lg inline-block">
                03
              </span>
              <h4 className="font-bold text-sm text-slate-900">ตัดต่อและขึ้นรูปเครื่องจักร</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-light">
                ตัดต่อในโรงงานชลบุรี หรือนำเครื่องเชื่อมความร้อนไปต่อเข้ากับโครงสร้างเครื่องจักรที่โรงงานลูกค้า
              </p>
            </div>
          </div>
        </div>

        {/* Direct Service Booking CTA */}
        <div className="rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-sky-950 text-white p-6 sm:p-8 border border-slate-800 flex flex-wrap justify-center items-center gap-4 shadow-xl">
          <a
            href="tel:082-169-5917"
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md active:scale-95 transition-all"
          >
            โทรด่วน: 082-169-5917
          </a>
          <button
            onClick={() => onNavigate('quote')}
            className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 backdrop-blur-sm transition-colors"
          >
            ส่งคำขอรับบริการออนไลน์
          </button>
        </div>

      </div>
    </div>
  );
};
