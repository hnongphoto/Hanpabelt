import React, { useState, useEffect, useMemo } from 'react';
import { PageId, ProductItem } from '../types';
import { 
  Search, 
  X, 
  Layers, 
  Grid, 
  Table as TableIcon, 
  RefreshCw, 
  FileText, 
  Eye, 
  Check, 
  SlidersHorizontal,
  ImageOff,
  AlertCircle
} from 'lucide-react';
import { 
  initialCatalogProducts, 
  CATEGORIES_LIST, 
  CATALOG_API_URL, 
  formatDriveImg,
  fetchProductsFromGoogleSheet,
  SHEET_ID,
  GOOGLE_SHEETS_WEB_URL
} from '../data/catalogData';

interface CatalogPageProps {
  onNavigate: (page: PageId, prefillBelt?: string) => void;
  onOpenProductModal: (product: ProductItem) => void;
  initialCategory?: string;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onNavigate,
  onOpenProductModal,
  initialCategory = 'ALL',
}) => {
  const [products, setProducts] = useState<ProductItem[]>(initialCatalogProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);

  // Sync category prop if updated
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // Fetch directly from user's Google Sheet
  const fetchLiveCatalog = async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const list = await fetchProductsFromGoogleSheet();
      if (list && list.length > 0) {
        setProducts(list);
        setIsLiveConnected(true);
      }
    } catch (err: any) {
      console.warn("Google Sheet fetch error, using local catalog data:", err);
      setApiError("กำลังแสดงผลข้อมูลแคตตาล็อกสำรอง (ระบบพร้อมทำงานแบบ Offline)");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveCatalog();
  }, []);

  // Category counts calculation
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { ALL: products.length };
    products.forEach((p) => {
      const c = (p.category || '').toUpperCase().trim();
      counts[c] = (counts[c] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat =
        selectedCategory === 'ALL' ||
        (p.category || '').toUpperCase() === selectedCategory.toUpperCase();

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        (p.product_id && p.product_id.toLowerCase().includes(q)) ||
        (p.model_name && p.model_name.toLowerCase().includes(q)) ||
        (p.material && p.material.toLowerCase().includes(q)) ||
        (p.color && p.color.toLowerCase().includes(q)) ||
        (p.thickness && p.thickness.toLowerCase().includes(q)) ||
        (p.usage && p.usage.toLowerCase().includes(q)) ||
        (p.category && p.category.toLowerCase().includes(q));

      return matchCat && matchQuery;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="py-10 bg-slate-50/60 min-h-[85vh]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header Banner in Cool Slate */}
        <div className="border-b border-slate-200/90 pb-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-mono-data font-semibold mb-2">
                <span>HANPA BELT SPECIFICATION CATALOG</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                แคตตาล็อกสายพานอุตสาหกรรม
                <span className="sr-only"> HANPABELT ชลบุรี ระยอง</span>
              </h1>
              <p className="text-sm text-slate-600 mt-1 font-light">
                สเปคชีตสายพานลำเลียงและสายพานส่งกำลัง คัดกรองตามหมวดหมู่และค้นหาตามขนาดได้ทันที
              </p>

              {/* Google Sheets Live Link Badge removed per user request */}
            </div>

            {/* View Mode & Refresh */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="แสดงแบบการ์ดรูปภาพ (Card Grid)"
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>การ์ด</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    viewMode === 'table'
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                  title="แสดงแบบตารางสเปควิศวกรรม (Spec Table)"
                >
                  <TableIcon className="w-3.5 h-3.5" />
                  <span>ตารางสเปค</span>
                </button>
              </div>

              <button
                onClick={fetchLiveCatalog}
                disabled={isLoading}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-mono-data font-semibold border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
                title="ดึงข้อมูลล่าสุดจากระบบ Google Sheet"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-sky-600' : ''}`} />
                <span>รีเฟรช</span>
              </button>
            </div>
          </div>

          {/* API Info / Offline status indicator */}
          {apiError && (
            <div className="mt-4 p-3 rounded-xl bg-sky-50/70 border border-sky-200 text-xs text-sky-900 font-mono-data flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-sky-600 shrink-0" />
              <span>{apiError}</span>
            </div>
          )}
        </div>

        {/* Search Bar & Stats */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหารหัสสินค้า (Product ID), ชื่อรุ่น (Model Name), ความหนา หรือวัตถุประสงค์การใช้งาน..."
              className="w-full pl-11 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono-data text-slate-500 px-1 shrink-0">
            <span>
              แสดงผล: <strong className="text-sky-700 text-sm font-bold">{filteredProducts.length}</strong> / {products.length} รายการ
            </span>
            {(searchQuery || selectedCategory !== 'ALL') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="text-red-500 hover:underline font-semibold text-[11px]"
              >
                [ล้างตัวกรอง]
              </button>
            )}
          </div>
        </div>

        {/* Filter Categories Pill Scroll Bar */}
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="flex gap-2 shrink-0">
            {CATEGORIES_LIST.map((cat) => {
              const count = categoryCounts[cat.code] || 0;
              const isActive = selectedCategory === cat.code;

              return (
                <button
                  key={cat.code}
                  onClick={() => setSelectedCategory(cat.code)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono-data border transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
                    isActive
                      ? 'bg-sky-600 text-white border-sky-600 font-bold shadow-sky-500/20'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <span>{cat.code}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content View 1: Card Grid View (Cool Modern Cards) */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((p) => {
              const mainImg = p.images && p.images[0] ? p.images[0] : 'placeholder';
              const isPlaceholder = !mainImg || mainImg === 'placeholder';

              return (
                <div
                  key={p.product_id}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group cursor-pointer"
                  onClick={() => onOpenProductModal(p)}
                >
                  {/* Top Image Box */}
                  <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden flex items-center justify-center">
                    {isPlaceholder ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-50 group-hover:scale-105 transition-transform">
                        <ImageOff className="w-8 h-8 text-slate-400 mb-1" />
                        <span className="text-[11px] font-semibold font-mono-data text-slate-600">รอรูปจริง</span>
                        <span className="text-[10px] text-slate-400">Hanpa Belts</span>
                      </div>
                    ) : (
                      <img
                        src={mainImg}
                        alt={`hanpabelt-${(p.category || 'belt').toLowerCase()}-${(p.color || 'standard').toLowerCase()}-${(p.thickness || 'belt').toLowerCase()}-${p.model_name || 'industrial'}`.replace(/\s+/g, '-').toLowerCase()}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.currentTarget.parentElement as HTMLElement).innerHTML = `
                            <div class="w-full h-full flex flex-col items-center justify-center p-3 text-center bg-slate-100">
                              <span class="text-[11px] font-semibold font-mono-data text-slate-600">รอรูปจริง</span>
                            </div>
                          `;
                        }}
                      />
                    )}

                    {/* Tag Overlays */}
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-mono-data font-semibold">
                      {p.category}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-sky-800 text-[9px] font-mono-data font-bold shadow-sm">
                      5 ภาพมุมมอง
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5 text-xs">
                        <span className="font-mono-data font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-md border border-sky-100">
                          {p.product_id}
                        </span>
                        <span className="font-mono-data text-[11px] text-slate-500">
                          {p.thickness}
                        </span>
                      </div>

                      <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors line-clamp-1">
                        {p.model_name}
                      </h3>

                      {/* Technical Spec List */}
                      <div className="mt-2.5 space-y-1 text-xs text-slate-600">
                        <div className="flex justify-between">
                          <span className="text-slate-400">สีสายพาน:</span>
                          <span className="font-medium text-slate-800 truncate max-w-[130px]">{p.color}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">วัสดุ:</span>
                          <span className="font-medium text-slate-800 truncate max-w-[130px]">{p.material}</span>
                        </div>
                      </div>

                      {/* Usage */}
                      <p className="mt-2.5 pt-2.5 border-t border-slate-100 text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-light">
                        <span className="font-medium text-slate-700">การใช้งาน:</span> {p.usage}
                      </p>
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenProductModal(p);
                        }}
                        className="text-xs font-semibold text-slate-700 hover:text-sky-600 transition-colors flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>สเปค/รูป</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate('quote', p.model_name);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1 active:scale-95"
                      >
                        <FileText className="w-3 h-3" />
                        <span>ขอราคา</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Content View 2: Technical Spec Table View */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-mono-data font-bold">
                  <th className="p-3.5 border-r border-slate-200 w-28">รหัสสินค้า</th>
                  <th className="p-3.5 border-r border-slate-200 w-24">หมวด</th>
                  <th className="p-3.5 border-r border-slate-200">ชื่อรุ่น / สเปคสายพาน</th>
                  <th className="p-3.5 border-r border-slate-200 text-right w-28">ความหนา/พิทช์</th>
                  <th className="p-3.5 border-r border-slate-200 w-28">สี</th>
                  <th className="p-3.5 border-r border-slate-200 w-36">วัสดุ</th>
                  <th className="p-3.5 border-r border-slate-200 w-48">ลักษณะการใช้งาน</th>
                  <th className="p-3.5 text-center w-36">การดำเนินการ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p, idx) => (
                  <tr 
                    key={p.product_id}
                    className={`hover:bg-sky-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                  >
                    <td className="p-3.5 font-mono-data font-bold text-sky-800 border-r border-slate-100 whitespace-nowrap">
                      {p.product_id}
                    </td>
                    <td className="p-3.5 font-mono-data border-r border-slate-100 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-medium text-[10px]">
                        {p.category}
                      </span>
                    </td>
                    <td 
                      onClick={() => onOpenProductModal(p)}
                      className="p-3.5 font-bold text-slate-900 border-r border-slate-100 cursor-pointer hover:text-sky-600"
                    >
                      {p.model_name}
                    </td>
                    <td className="p-3.5 font-mono-data text-right border-r border-slate-100 font-semibold text-slate-800">
                      {p.thickness}
                    </td>
                    <td className="p-3.5 border-r border-slate-100 text-slate-700">
                      {p.color}
                    </td>
                    <td className="p-3.5 border-r border-slate-100 text-slate-600">
                      {p.material}
                    </td>
                    <td className="p-3.5 border-r border-slate-100 text-slate-600 text-[11px] leading-tight">
                      {p.usage}
                    </td>
                    <td className="p-3.5 text-center whitespace-nowrap">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenProductModal(p)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] transition-colors"
                          title="ดูสเปคชีต"
                        >
                          สเปค
                        </button>
                        <button
                          onClick={() => onNavigate('quote', p.model_name)}
                          className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] transition-colors shadow-sm"
                          title="ขอใบเสนอราคาด่วน"
                        >
                          ขอราคา
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <h3 className="text-lg font-bold text-slate-800">
              ไม่พบรายการสายพานที่ตรงกับคำค้นหา
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              หากท่านต้องการสเปคสายพานพิเศษหรือสั่งตัดต่อเฉพาะรุ่น สามารถส่งข้อมูลเข้ามาให้วิศวกรประเมินราคาได้ทันที
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                ล้างคำค้นหาทั้งหมด
              </button>
              <button
                onClick={() => onNavigate('quote')}
                className="px-4 py-2 rounded-xl bg-sky-600 text-white text-xs font-semibold shadow-sm"
              >
                สั่งผลิตสายพานตามสเปคพิเศษ
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
