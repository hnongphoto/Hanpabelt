import React, { useState, useEffect } from 'react';
import { ProductItem } from '../types';
import { X, ChevronLeft, ChevronRight, FileText, CheckCircle2, Shield, Layers, ImageOff, Check } from 'lucide-react';
import { formatDriveImg } from '../data/catalogData';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onRequestQuote: (product: ProductItem) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    setActiveSlide(0);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!product) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setActiveSlide((prev) => (prev + 1) % 5);
      if (e.key === 'ArrowLeft') setActiveSlide((prev) => (prev - 1 + 5) % 5);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  // Prepare guaranteed 5-image slots
  const imageSlots: string[] = [];
  const rawList = product.images && product.images.length > 0 ? product.images : [];
  for (let i = 0; i < 5; i++) {
    const raw = rawList[i];
    imageSlots.push(formatDriveImg(raw || 'placeholder'));
  }

  const currentImage = imageSlots[activeSlide];
  const isCurrentPlaceholder = !currentImage || currentImage === 'placeholder';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-md animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-mono-data font-bold rounded-lg bg-sky-100 text-sky-800">
              {product.category}
            </span>
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight">
                {product.model_name}
              </h2>
              <span className="text-xs font-mono-data text-slate-500">
                รหัสสินค้า: {product.product_id}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
            title="ปิดหน้าต่าง (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white">
          {/* Left: 5-Angle Image Gallery (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {/* Main Stage */}
            <div className="relative aspect-[4/3] rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center overflow-hidden group">
              {isCurrentPlaceholder ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                  <ImageOff className="w-10 h-10 text-slate-400 mb-2" />
                  <span className="text-xs font-semibold text-slate-700 font-mono-data">
                    รอรูปจริง (มุมมอง {activeSlide + 1} จาก 5)
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    Hanpa Industrial Belts · Chon Buri
                  </span>
                </div>
              ) : (
                <img
                  src={currentImage}
                  alt={`hanpabelt-${(product.category || 'belt').toLowerCase()}-${(product.color || 'standard').toLowerCase()}-${(product.thickness || 'standard').toLowerCase()}-${product.model_name}-view-${activeSlide + 1}`.replace(/\s+/g, '-').toLowerCase()}
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).innerHTML = `
                      <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-slate-50">
                        <span class="text-xs font-semibold text-slate-700 font-mono-data">รอรูปจริง (มุมมอง ${activeSlide + 1} จาก 5)</span>
                      </div>
                    `;
                  }}
                />
              )}

              {/* Prev / Next Buttons */}
              <button
                onClick={() => setActiveSlide((prev) => (prev - 1 + 5) % 5)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-transform hover:scale-105"
                title="รูปก่อนหน้า"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveSlide((prev) => (prev + 1) % 5)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 flex items-center justify-center shadow-md transition-transform hover:scale-105"
                title="รูปถัดไป"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Angle Badge */}
              <div className="absolute bottom-3 right-3 bg-slate-900/75 backdrop-blur-sm text-white px-2.5 py-0.5 rounded-full text-[10px] font-mono-data">
                มุมมอง {activeSlide + 1} / 5
              </div>
            </div>

            {/* 5 Thumbnails Strip */}
            <div className="grid grid-cols-5 gap-2">
              {imageSlots.map((slot, index) => {
                const isPlaceholder = !slot || slot === 'placeholder';
                return (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`aspect-[4/3] rounded-xl bg-slate-50 border p-1 transition-all flex items-center justify-center overflow-hidden ${
                      activeSlide === index
                        ? 'border-sky-500 ring-2 ring-sky-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {isPlaceholder ? (
                      <span className="text-[10px] font-mono-data text-slate-400">
                        รอรูป #{index + 1}
                      </span>
                    ) : (
                      <img
                        src={slot}
                        alt={`hanpabelt-${(product.category || 'belt').toLowerCase()}-thumb-${index + 1}`.replace(/\s+/g, '-').toLowerCase()}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Technical Spec Sheet (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-600" />
                  ข้อมูลจำเพาะทางเทคนิค
                </span>
                <span className="text-[10px] font-mono-data bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md font-medium border border-sky-100">
                  IN STOCK
                </span>
              </div>

              {/* Clean Spec Grid */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/80 space-y-2.5 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">รหัสสินค้า:</span>
                  <span className="font-mono-data font-bold text-sky-700">{product.product_id}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">หมวดหมู่:</span>
                  <span className="font-semibold text-slate-800">{product.category}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">ความหนา / ระยะพิทช์:</span>
                  <span className="font-mono-data font-semibold text-slate-800">{product.thickness}</span>
                </div>
                {product.width && (
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                    <span className="text-slate-500">หน้ากว้าง:</span>
                    <span className="font-mono-data font-semibold text-slate-800">{product.width}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">สีสายพาน:</span>
                  <span className="font-medium text-slate-800">{product.color}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-slate-200/50">
                  <span className="text-slate-500">วัสดุ:</span>
                  <span className="font-medium text-slate-800 text-right max-w-[65%]">{product.material}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500">อุณหภูมิใช้งาน:</span>
                  <span className="font-mono-data text-slate-800">{product.temp || '-20°C ถึง +80°C'}</span>
                </div>
              </div>

              {/* Usage Application Description */}
              <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-100 text-xs">
                <span className="font-semibold text-sky-950 block mb-1">ลักษณะการใช้งานและเครื่องจักร:</span>
                <p className="text-sky-900 leading-relaxed font-light text-[11px]">
                  {product.usage}
                </p>
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => {
                  onRequestQuote(product);
                  onClose();
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-xs shadow-md shadow-sky-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>ขอใบเสนอราคา ({product.product_id})</span>
              </button>

              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold transition-colors"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
