import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { 
  Send, 
  UploadCloud, 
  Trash2, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  Phone, 
  MessageCircle, 
  Lock,
  Layers,
  Clock,
  Sparkles
} from 'lucide-react';
import { QUOTE_API_URL, SHEET_ID, API_KEY, SHEET_NAME, GOOGLE_SHEETS_WEB_URL } from '../data/catalogData';

interface QuotePageProps {
  onNavigate: (page: PageId) => void;
  prefillBelt?: string;
}

export const QuotePage: React.FC<QuotePageProps> = ({ onNavigate, prefillBelt = '' }) => {
  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [line, setLine] = useState('');
  const [email, setEmail] = useState('');
  const [beltType, setBeltType] = useState('');
  const [model, setModel] = useState('');
  const [width, setWidth] = useState('');
  const [length, setLength] = useState('');
  const [qty, setQty] = useState('');
  const [machine, setMachine] = useState('');
  const [detail, setDetail] = useState('');

  // Uploaded images in Base64
  const [uploadedImages, setUploadedImages] = useState<Array<{ name: string; type: string; base64: string }>>([]);

  // Submission Status
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync prefill parameter if provided
  useEffect(() => {
    if (prefillBelt) {
      setModel(prefillBelt);

      // Guess category
      if (prefillBelt.includes('PVC')) setBeltType('PVC Conveyor Belt');
      else if (prefillBelt.includes('PU')) setBeltType('PU Conveyor Belt');
      else if (prefillBelt.includes('Timing') || prefillBelt.includes('TIM')) setBeltType('Timing Belt');
      else if (prefillBelt.includes('V-Belt') || prefillBelt.includes('VB')) setBeltType('V-Belt (สายพานร่องวี)');
      else if (prefillBelt.includes('Rib') || prefillBelt.includes('RIB')) setBeltType('Rib Belt (สายพานร่องรับ)');
      else if (prefillBelt.includes('กลม') || prefillBelt.includes('ROUND')) setBeltType('สายพานกลม (Round Belt)');
      else if (prefillBelt.includes('ไม้') || prefillBelt.includes('WOOD')) setBeltType('สายพานไม้ (Wooden Slat)');
      else if (prefillBelt.includes('Pulley') || prefillBelt.includes('มูเล่ย์')) setBeltType('Pulley & มูเล่ย์ส่งกำลัง');
      else if (prefillBelt.includes('ฉุด') || prefillBelt.includes('CHUD')) setBeltType('สายพานฉุด / อื่นๆ');
    }
  }, [prefillBelt]);

  // Handle image files selection
  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const maxFiles = 5;
    const remainingSlots = maxFiles - uploadedImages.length;
    if (remainingSlots <= 0) {
      alert("สามารถแนบรูปภาพได้สูงสุด 5 ภาพ");
      return;
    }

    const filesToRead = Array.from(files).slice(0, remainingSlots);

    filesToRead.forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert(`ไฟล์ ${file.name} ไม่ใช่ไฟล์ภาพ`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        setUploadedImages((prev) => [
          ...prev,
          { name: file.name, type: file.type, base64 }
        ]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Form Submit to Google Apps Script
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      company: company.trim(),
      line: line.trim(),
      email: email.trim(),
      beltType,
      model: model.trim(),
      width: width.trim(),
      length: length.trim(),
      qty: qty.trim(),
      machine: machine.trim(),
      detail: detail.trim(),
      images: uploadedImages,
      pageUrl: window.location.href,
      submittedAt: new Date().toISOString()
    };

    try {
      await fetch(QUOTE_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
      });

      setSubmitSuccess(true);
      // Reset form
      setName('');
      setPhone('');
      setCompany('');
      setLine('');
      setEmail('');
      setBeltType('');
      setModel('');
      setWidth('');
      setLength('');
      setQty('');
      setMachine('');
      setDetail('');
      setUploadedImages([]);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Quote submission error:", err);
      setSubmitError("ระบบบันทึกข้อมูลมีปัญหาชั่วคราว กรุณาโทรติดต่อเจ้าหน้าที่โดยตรงที่ 082-169-5917 หรือ LINE: Hanpabelt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-12 bg-slate-50/60">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100/80 text-sky-800 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-sky-600" />
            <span>FAST QUOTATION SERVICE · ตอบกลับภายใน 2 ชม.</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            ขอใบเสนอราคาด่วนออนไลน์
            <span className="sr-only"> HANPABELT สายพานอุตสาหกรรม ชลบุรี</span>
          </h1>
          <p className="text-sm text-slate-600 font-light">
            กรอกข้อมูลสเปคสายพานที่ต้องการ ฝ่ายขาย TJ &amp; Hanpa จะติดต่อกลับพร้อมราคาและกำหนดส่งมอบทันที
          </p>
        </div>

        {/* Success Alert Banner */}
        {submitSuccess && (
          <div className="p-6 rounded-3xl bg-sky-50 border-2 border-sky-500/80 text-sky-950 shadow-lg space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-lg font-bold">ส่งข้อมูลขอใบเสนอราคาเรียบร้อยแล้ว!</h2>
                <p className="text-xs text-sky-800 font-light leading-relaxed">
                  เจ้าหน้าที่ฝ่ายขายกำลังตรวจสอบสเปคและจะส่งใบเสนอราคาทางโทรศัพท์ / LINE ภายใน 2 ชั่วโมง ขอบคุณที่ไว้วางใจ บริษัท หาญภา จำกัด ชลบุรี
                </p>
              </div>
            </div>
            <div className="pt-2 flex flex-wrap gap-3">
              <a 
                href="tel:082-169-5917"
                className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>โทรด่วน: 082-169-5917</span>
              </a>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="px-4 py-2 rounded-xl bg-white text-sky-900 border border-sky-300 text-xs font-semibold"
              >
                ส่งรายการอื่นเพิ่มเติม
              </button>
            </div>
          </div>
        )}

        {/* Error Alert Banner */}
        {submitError && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{submitError}</span>
          </div>
        )}

        {/* The Quotation Form (Modern Soft Rounded Cards) */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden p-6 sm:p-10">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Group 1: Contact Information */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-mono-data text-xs font-bold">
                  1
                </span>
                <span>ข้อมูลผู้ติดต่อ &amp; บริษัท</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    ชื่อผู้ติดต่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น คุณสมชาย ใจดี"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    เบอร์โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08X-XXX-XXXX"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    ชื่อบริษัท / โรงงาน
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="ระบุชื่อบริษัทหรือโรงงาน"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    LINE ID
                  </label>
                  <input
                    type="text"
                    value={line}
                    onChange={(e) => setLine(e.target.value)}
                    placeholder="สำหรับส่งใบเสนอราคาทาง LINE"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    อีเมล (Email)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@company.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Group 2: Belt Technical Specification */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-slate-100">
                <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-mono-data text-xs font-bold">
                  2
                </span>
                <span>ข้อมูลจำเพาะของสายพาน (Specification)</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    ประเภทสายพาน <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={beltType}
                    onChange={(e) => setBeltType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  >
                    <option value="">-- กรุณาเลือกประเภทสายพาน --</option>
                    <option value="PVC Conveyor Belt">PVC Conveyor Belt (สายพานลำเลียง PVC)</option>
                    <option value="PU Conveyor Belt">PU Conveyor Belt (Food Grade เกรดอาหาร FDA)</option>
                    <option value="Timing Belt">Timing Belt (สายพานไทม์มิ่ง ยาง/PU)</option>
                    <option value="V-Belt (สายพานร่องวี)">V-Belt (สายพานร่องวี A, B, C, SPZ, SPA, SPB)</option>
                    <option value="Rib Belt (สายพานร่องรับ)">Rib Belt (สายพานร่องขนาน PK, PJ, PL)</option>
                    <option value="สายพานกลม (Round Belt)">สายพานกลม (Round Belt PU เขียว/ส้ม)</option>
                    <option value="สายพานไม้ (Wooden Slat)">สายพานไม้ (Wooden Slat Conveyor)</option>
                    <option value="สายพานยางดำ (Rubber Belt)">สายพานยางดำ (Heavy Duty Rubber)</option>
                    <option value="สายพานผ้าใบ (Canvas Belt)">สายพานผ้าใบคาดแดง (Canvas Belt)</option>
                    <option value="สายพานฉุด / อื่นๆ">สายพานฉุด / อื่นๆ</option>
                    <option value="Pulley & มูเล่ย์ส่งกำลัง">Pulley &amp; มูเล่ย์ส่งกำลังสั่งทำตามแบบ</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    รุ่น / ขนาด / รหัสสายพานเดิม
                  </label>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="เช่น PVC 2mm เขียว หรือ 5M-800"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    หน้ากว้าง (Width)
                  </label>
                  <input
                    type="text"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    placeholder="เช่น 500 mm"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    ความยาว (Length)
                  </label>
                  <input
                    type="text"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    placeholder="เช่น 2,400 mm"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    จำนวน (Qty)
                  </label>
                  <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="เช่น 2 เส้น"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-mono-data focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    ใช้กับเครื่องจักร
                  </label>
                  <input
                    type="text"
                    value={machine}
                    onChange={(e) => setMachine(e.target.value)}
                    placeholder="เช่น ไลน์ลำเลียงขวดกล่อง"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1.5">
                    รายละเอียดเพิ่มเติม / สเปคพิเศษ (ติดบั้ง, ติดขอบกันตก, เจาะรู ฯลฯ)
                  </label>
                  <textarea
                    rows={3}
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder="ระบุสภาพแวดล้อมใช้งาน อุณหภูมิ สารเคมี หรือลักษณะงานที่ต้องการคำแนะนำ"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Group 3: Image & Drawing Attachment */}
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                แนบรูปภาพสายพานเดิม / ป้ายสเปค / Drawing (สูงสุด 5 รูป)
              </label>

              <div
                onClick={() => document.getElementById('quoteFileInput')?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFileSelect(e.dataTransfer.files);
                }}
                className="border-2 border-dashed border-slate-300 hover:border-sky-500 rounded-2xl p-6 text-center cursor-pointer transition-colors bg-slate-50/70 hover:bg-sky-50/40"
              >
                <input
                  id="quoteFileInput"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files)}
                  className="hidden"
                />
                <UploadCloud className="w-8 h-8 text-sky-600 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">
                  คลิกเพื่อเลือกภาพ หรือลากไฟล์มาวางที่นี่
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  รองรับไฟล์ JPG, PNG (แปลงเป็น Base64 พร้อมส่งเข้า Google Sheet ทันที)
                </p>
              </div>

              {/* Previews */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="relative aspect-square rounded-xl border border-slate-200 bg-white group overflow-hidden shadow-sm">
                      <img src={img.base64} alt={img.name} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow"
                        title="ลบรูปนี้"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[9px] font-mono-data truncate px-1 py-0.5 text-center">
                        {img.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Submit Button */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-bold text-base shadow-lg shadow-sky-600/25 hover:shadow-xl hover:shadow-sky-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-wait' : ''
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  {isSubmitting ? 'กำลังส่งข้อมูลเข้าสู่ระบบ...' : 'ส่งข้อมูลขอใบเสนอราคาด่วน'}
                </span>
              </button>

              <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2 pt-1 text-center">
                <span className="flex items-center gap-1 justify-center">
                  <Lock className="w-3.5 h-3.5" />
                  ข้อมูลของคุณจะถูกส่งเข้าระบบความปลอดภัยวิศวกรรมของ Hanpa โดยตรง
                </span>
                <span className="text-slate-600 font-medium">
                  โทรด่วน: 082-169-5917
                </span>
              </div>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};
