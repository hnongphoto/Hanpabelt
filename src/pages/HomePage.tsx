import React from 'react';
import { PageId, ProductItem } from '../types';
import { 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ChevronRight,
  Phone,
  MessageCircle,
  FileText,
  Building2,
  Cpu,
  Sparkles,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { initialCatalogProducts } from '../data/catalogData';

interface HomePageProps {
  onNavigate: (page: PageId, prefillBelt?: string) => void;
  onOpenProductModal: (product: ProductItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenProductModal }) => {
  // Select top 8 category hero products
  const featuredBelts = [
    initialCatalogProducts.find(p => p.product_id === 'PVC-01') || initialCatalogProducts[0],
    initialCatalogProducts.find(p => p.product_id === 'PU-01') || initialCatalogProducts[1],
    initialCatalogProducts.find(p => p.product_id === 'TIM-01') || initialCatalogProducts[2],
    initialCatalogProducts.find(p => p.product_id === 'VB-01') || initialCatalogProducts[3],
    initialCatalogProducts.find(p => p.product_id === 'RIB-01') || initialCatalogProducts[4],
    initialCatalogProducts.find(p => p.product_id === 'ROUND-01') || initialCatalogProducts[5],
    initialCatalogProducts.find(p => p.product_id === 'WOOD-01') || initialCatalogProducts[6],
    initialCatalogProducts.find(p => p.product_id === 'PULLEY--01' || p.product_id === 'PULLEY-01') || initialCatalogProducts[7],
  ];

  return (
    <div className="space-y-0">
      {/* 1. Hero Section: Modern Cool Tech with Ambient Glow */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50/60 py-16 lg:py-24 border-b border-slate-200/80">
        {/* Soft Ambient Cool Glows */}
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-sky-200/30 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] bg-blue-100/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Proposition & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-900 text-xs font-semibold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                <span>สต็อกพร้อมส่งในไทย / ผลิตตัดต่อตามขนาดทันที</span>
              </div>

              {/* Modern Headline with Cool Gradient */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight sm:leading-snug">
                สายพานอุตสาหกรรม<br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                  และระบบส่งกำลังครบวงจร
                </span>
              </h1>

              {/* Concrete Description */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-light">
                บริษัท หาญภา จำกัด เป็นผู้นำเข้าและจัดจำหน่ายสายพานอุตสาหกรรมครบวงจร คัดสรรเฉพาะผลิตภัณฑ์มาตรฐานสากล ทั้งสายพานลำเลียง PVC/PU, สายพานส่งกำลัง Timing Belt, V-Belt และงานกลึง Pulley พร้อมบริการตัดต่อ และดูแลติดตั้งหน้างานโดยทีมช่างผู้เชี่ยวชาญ
              </p>

              {/* Modern CTAs Button Cluster */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <button
                  onClick={() => onNavigate('quote')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-sm sm:text-base shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>ขอใบเสนอราคาด่วน</span>
                </button>

                <button
                  onClick={() => onNavigate('catalog')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm sm:text-base border border-slate-200 shadow-sm hover:shadow hover:border-slate-300 hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <Layers className="w-4 h-4 text-sky-600" />
                  <span>ดูแคตตาล็อกสินค้า (98+ รหัส)</span>
                </button>
              </div>

              {/* Key SLA Metric Highlights */}
              <div className="pt-6 border-t border-slate-200/80 max-w-md">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono-data">8+ BELT</p>
                  <p className="text-xs text-slate-500 mt-0.5">ครอบคลุมทุกอุตสาหกรรม</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Glass Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-square group">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZR0onWiAUBGawP4ZCR2WXH4Wtrm74hiuvoIHuacKW9WnHIA9k7_-iWgIBlU2xsXIaq4y-fChv2Q3so9xMI7Gj59K8KgbIeWTcMaZ9es01762Kx5ZElUSFOsUOUlGpQVzV8F7PNtRz1B0p7TVJkENDwRLxPPIKRliHeZFctWkXb9r3SgSlnGihtmb2n5dn68y2-StPerKGpcpO32ekMPq1R6d5AEEBjcMJKOh50uGr4yMUwMFCQCfbtWt35Ks_xDtAM10"
                  alt="hanpabelt-timing-belt-pu-food-grade-สายพานอุตสาหกรรม-ชลบุรี"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"></div>

                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/90 backdrop-blur-md text-white text-[11px] font-semibold shadow-sm">
                    <Sparkles className="w-3 h-3 text-sky-200" />
                    <span>TOP RECOMMENDED</span>
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold">
                    High-Torque Timing Belts &amp; PU Food Grade
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-light leading-relaxed">
                    รองรับอุณหภูมิ -20°C ถึง +100°C · ทนทานต่อน้ำมัน สารเคมี และการสึกหรอ
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/20 text-xs">
                    <span className="text-sky-300 font-mono-data text-[11px]">CHON BURI PLANT READY</span>
                    <button
                      onClick={() => onNavigate('catalog')}
                      className="text-white hover:text-sky-300 transition-colors font-semibold flex items-center gap-1"
                    >
                      <span>ดูรายละเอียด</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Core Belt Categories Grid (8 Main Types) */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-sky-600 font-semibold text-xs tracking-widest uppercase bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 shadow-sm inline-flex items-center gap-1.5 mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
              คู่คิดด้านอุปกรณ์อุตสาหกรรม ที่เข้าใจความต้องการของคุณ
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              บริษัท หาญภา จำกัด (ชลบุรี ใกล้อมตะนคร)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed font-light">
              ศูนย์จำหน่ายและแปรรูปสายพานอุตสาหกรรมมาตรฐานสูง ตัดต่อตามขนาดทันที ไม่ต้องรอนำเข้านาน
            </p>
          </div>

          {/* 8 Modern Category Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBelts.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image Stage */}
                <div 
                  className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer"
                  onClick={() => onOpenProductModal(item)}
                >
                  <img
                    src={item.images[0]}
                    alt={`hanpabelt-${(item.category || 'belt').toLowerCase()}-${(item.color || 'standard').toLowerCase()}-${(item.thickness || 'belt').toLowerCase()}-${item.model_name || 'industrial'}`.replace(/\s+/g, '-').toLowerCase()}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget.parentElement as HTMLElement).innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-100">
                          <span class="text-xs font-semibold text-slate-700">สายพานมาตรฐาน</span>
                        </div>
                      `;
                    }}
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-mono-data font-semibold">
                    {item.category}
                  </span>
                  <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-sky-600/90 backdrop-blur-sm text-white text-[10px] font-mono-data font-medium">
                    {item.thickness}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 
                      onClick={() => onOpenProductModal(item)}
                      className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.model_name}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed font-light">
                      {item.usage}
                    </p>
                  </div>

                  {/* Spec Quick Indicators */}
                  <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">สี / วัสดุ:</span>
                      <span className="font-medium text-slate-800 truncate max-w-[130px]">{item.color}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenProductModal(item)}
                      className="text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-1"
                    >
                      ดูสเปคชีต
                    </button>
                    <button
                      onClick={() => onNavigate('quote', item.model_name)}
                      className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-semibold transition-colors active:scale-95"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>ขอราคา</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('catalog')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md transition-all active:scale-95"
            >
              <span>ดูแคตตาล็อกสินค้าทั้งหมด 98+ รายการ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Hanpa Industrial Precision (Cool Tone) */}
      <section className="py-16 lg:py-24 bg-slate-50 border-t border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Gallery Images */}
            <div className="lg:col-span-6 space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-md border border-slate-200 aspect-video relative group bg-slate-900">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPP2boB7Zvqi6vaX8h_q9oRyPOdw6FevaYgV1oHH6Zv3sPTZZEAv4PUW3O82_SZHxzoM3-gBgyRd--8jfCkAq0ai-IvQ1NUwB0D9cYCrT-JhdcdJ8phFaItL8Zh0Ig7Wyp2f98mqvxyMzB5RaMhKLZgpDMoLHm3iwkh7Yj06ZaQno8zt7IEqr4vcHcSDaN2Ypj-foQ_QL_6HD7qurHuZxXeR_pExe0RPpBeqLUO-1BfEgWiYbcK8l54w"
                  alt="hanpabelt-factory-โรงงานตัดต่อสายพาน-ชลบุรี"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold">
                  <span className="text-sky-400">CHON BURI PLANT</span> · ศูนย์บริการตัดต่อเชื่อมความร้อน ชลบุรี
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-2xl overflow-hidden aspect-square border border-slate-200 bg-white shadow-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Y6ysAhQuyTJxJR1CUtaPMS7IMMGzAOYT0fgrANzg2jq0RuP0KdzPjByrvpZXuwwu3Dt0uODoDLEtgY3_HnQ9tl38xKl7smjRAP3SCHgNKtlVeC7qVxdPTH2l9MC-z1P5sRNdwR2pRtMPE7B-gQ_q-gCnyXzBe6XQjDqclmVXIORaix4Fiaf7jm52jXIbdDtHgCW0syY9dH2XxhO_T58MWYbxRrGFP__PtlYYBL7GVf0L3oTTt2kPNt8x6vfz7GA1_FLG0Kz4wi7Qk7U"
                    alt="hanpabelt-qc-การตรวจสอบคุณภาพสายพานอุตสาหกรรม"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-slate-200 bg-white shadow-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3eOdAO80h867pnZlAH8GG9FsCmAkxrvLSvW9NmKjeGdyVOZ3MOO5j7f-3Kfeib_WBO9SNQ_-a-qFpz3etSv3KT9_c_ARy-36PLimNknZkoX17ZWOsoGGi1OUe13yDmjZJF7nLsRjqqBEJ5x4HyMGHxE1_Ilyedv4ARj3U0kMNLjtg8RTSyi0B5K8VnY7DhqKxHmQSsMk9ivQ2eCxqD79yod2kjwgK47tXiwcSJmoXgNgzJc5V9fJhKHJ9qc6_uvH0U1Bx0w_tnj_yZgA"
                    alt="hanpabelt-stock-คลังสต็อกสายพานพร้อมส่งด่วน-ชลบุรี"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden aspect-square border border-slate-200 bg-white shadow-sm">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzmFxkDunWvQz5oFwC0Ui0udEie5TcWqe3kr3PZYJapoEaKsvTLatLEa4uySs57BAQxDarGM7w7iPxSsGzg1RrqiU2LtwamlObYcxYhGGj0CUMZ-uojsCiCjOiXESPFd3H5eeHJefh0WnF1bVaK639FDqGK2fAAnss7UOYZKI5oNwmmsAsKgZFy37NIiFdbpxM0LpLHC2hAdfBSwLwSjx5Ofcva7MHyhKe66t-tSq1RWeRNzBmWdnKXVk_Q8Xyq3YeFdoD0qgQ-hqG63k"
                    alt="hanpabelt-machine-เครื่องจักรตัดต่อสายพานอุตสาหกรรม"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Precision Highlights */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider bg-sky-100/70 px-3 py-1 rounded-full inline-block mb-2">
                  ผู้นำระบบสายพานอุตสาหกรรม
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
                  ระบบส่งกำลังและสายพานลำเลียง<br className="hidden sm:inline" />
                  เพื่อโรงงานอุตสาหกรรมภาคตะวันออก
                </h2>
                <p className="text-sm text-slate-600 mt-3 font-light leading-relaxed">
                  เราเข้าใจดีว่าไลน์การผลิตหยุดชะงักไม่ได้แม้แต่นาทีเดียว ทีมช่างผู้ชำนาญพร้อมบริการวัดขนาดหน้างาน ออกแบบ ตัดต่อ และติดตั้งตรงตามสเปควิศวกรรม
                </p>
              </div>

              {/* 4 Feature Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center mb-2">
                    <Clock className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">ตัดต่อเสร็จใน 2 ชม.</h4>
                </div>


                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">บริการเชื่อมความร้อน</h4>
                  <p className="text-xs text-slate-500 font-light">
                    ทีมช่างเทคนิคพร้อมเครื่องเชื่อมความร้อนลงหน้างาน ชลบุรี ระยอง ฉะเชิงเทรา
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-1">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-2">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">งานสั่งทำ Pulley</h4>
                  <p className="text-xs text-slate-500 font-light">
                    กลึง กัดฟัน Timing Pulley อลูมิเนียม เหล็กหล่อ FC25 ตาม Drawing
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('services')}
                  className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
                >
                  บริการทางวิศวกรรมทั้งหมด →
                </button>
                <button
                  onClick={() => onNavigate('about')}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
                >
                  แผนที่และข้อมูลโรงงาน
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3.5 Belt Technical Knowledge Base Section (Q&A Preview) */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono-data font-semibold text-sky-700 uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>TECHNICAL KNOWLEDGE BASE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                คลังความรู้ &amp; ถาม-ตอบเรื่องสายพานอุตสาหกรรม
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-light">
                ไขข้อข้องใจการเลือกใช้สเปคสายพาน ความแตกต่างระหว่าง PU vs PVC สายพานไทม์มิ่ง สายพานร่องวี และสายพานกลม จากทีมช่างเทคนิคหาญภา
              </p>
            </div>

            <button
              onClick={() => onNavigate('knowledge')}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold border border-sky-200 transition-all self-start md:self-auto shrink-0"
            >
              <span>อ่านบทความและคู่มือทั้งหมด</span>
              <ArrowRight className="w-4 h-4 text-sky-600" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('knowledge')}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <span className="text-[11px] font-mono-data font-bold text-sky-700">GUIDE 01</span>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                วิธีเลือกสเปคสายพานลำเลียงให้ถูกต้อง ไม่ขาดง่าย
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                หลักการคำนวณขนาดลูกกลิ้งต่ำสุด (Min Pulley Diameter) น้ำหนักชิ้นงาน และการเลือกรูปแบบผ้าใบป้องกันสายพานย้วย
              </p>
              <div className="pt-2 text-xs font-semibold text-sky-600 flex items-center gap-1">
                <span>อ่านแนวทาง &rarr;</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('knowledge')}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <span className="text-[11px] font-mono-data font-bold text-sky-700">GUIDE 02</span>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                สายพาน PU vs PVC ต่างกันอย่างไร และควรเลือกแบบไหน?
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                เปรียบเทียบข้อดี-ข้อจำกัด ระหว่าง PVC ราคาประหยัดสำหรับโรงงานทั่วไป กับ PU Food Grade (FDA) ทนไขมันสัตว์และวิ่งผ่านลูกกลิ้งเล็ก
              </p>
              <div className="pt-2 text-xs font-semibold text-sky-600 flex items-center gap-1">
                <span>ดูตารางเปรียบเทียบ &rarr;</span>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('knowledge')}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-sky-300 hover:shadow-md transition-all cursor-pointer space-y-3 group"
            >
              <span className="text-[11px] font-mono-data font-bold text-sky-700">GUIDE 03</span>
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors">
                สายพานไทม์มิ่ง ฟันกี่แบบ / สายพานส่งกำลัง / สายพานกลม
              </h3>
              <p className="text-xs text-slate-600 font-light leading-relaxed line-clamp-3">
                เจาะลึกฟัน T, AT, HTD การป้องกันการสลิปใน V-Belt และวิธีการต่อหัวสายพานกลม PU ด้วยความร้อนภายใน 5 นาที
              </p>
              <div className="pt-2 text-xs font-semibold text-sky-600 flex items-center gap-1">
                <span>ดูคำตอบเทคนิค &rarr;</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Fast Quote Teaser CTA Section (Deep Cool Navy) */}
      <section className="py-16 bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.15),transparent_50%)]"></div>
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 relative z-10">
          <span className="inline-block px-3.5 py-1 rounded-full bg-sky-500/20 text-sky-300 font-mono-data text-xs font-semibold border border-sky-500/30">
            FAST QUOTATION SERVICE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            ต้องการเทียบราคา หรือสั่งตัดสายพานด่วน?
          </h2>
          <p className="text-sm text-slate-300 max-w-2xl mx-auto font-light">
            ฝ่ายขายและวิศวกรของ บริษัท หาญภา จำกัด พร้อมตรวจสอบสเปคและส่งใบเสนอราคาอย่างเป็นทางการภายใน 2 ชั่วโมง
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onNavigate('quote')}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-500/35 active:scale-95 transition-all"
            >
              เปิดฟอร์มขอใบเสนอราคาออนไลน์
            </button>
            <a
              href="tel:082-169-5917"
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/20 backdrop-blur-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-sky-400" />
              <span>โทรด่วน: 082-169-5917</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
