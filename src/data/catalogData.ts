import { ProductItem } from '../types';

export const SHEET_ID = '1WFDs9igNDhTzcoI2jnE-Ul3lBfj4VHFs1VhgEl4Rd-w';
export const API_KEY = 'AQ.Ab8RN6KEYPhaSJcpRuKE6gg7yxlkI9z-f_eLe5uUpoq7KdUBXg';
export const SHEET_NAME = 'สำหรับอัปขึ้นGoogleSheets';

// Google Sheets GViz endpoint (supports direct CORS reading from Google Sheets!)
export const GOOGLE_SHEETS_GVIZ_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?sheet=${encodeURIComponent(SHEET_NAME)}&tqx=out:json`;
export const GOOGLE_SHEETS_WEB_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;

export const CATALOG_API_URL = GOOGLE_SHEETS_GVIZ_URL;
export const QUOTE_API_URL = 'https://script.google.com/macros/s/AKfycbxZ5cUjmnJVz2ATXxxHQm9GT8CFnsDcFzWCow89sl8zFkdxJ2b_lTfVl8LSgrosGwWyIw/exec';

export interface CategoryInfo {
  code: string;
  name: string;
}

export const CATEGORIES_LIST: CategoryInfo[] = [
  { code: 'ALL', name: 'ทั้งหมด' },
  { code: 'PVC', name: 'สายพาน PVC' },
  { code: 'PU', name: 'สายพาน PU' },
  { code: 'TIM', name: 'Timing Belt' },
  { code: 'CHUD', name: 'สายพานฉุด' },
  { code: 'ROUND', name: 'สายพานกลม' },
  { code: 'VB', name: 'V-Belt' },
  { code: 'WOOD', name: 'สายพานไม้' },
  { code: 'RUBBER', name: 'สายพานเคลือบยาง' },
  { code: 'CANVAS', name: 'สายพานผ้าใบคาดแดง' },
  { code: 'RIB', name: 'Rib-Belt' },
  { code: 'PULLEY', name: 'Pulley / มู่เล่ย์' },
];

// Helper to format Google Drive link to high-res thumbnail
export function formatDriveImg(idOrUrl: string): string {
  if (!idOrUrl || idOrUrl === 'placeholder') return 'placeholder';
  const str = String(idOrUrl).trim();
  if (!str) return 'placeholder';

  const driveMatch = str.match(/(?:file\/d\/|id=|\/d\/)([-\w]{25,})/);
  if (driveMatch && driveMatch[1]) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
  }

  if (/^[-\w]{25,}$/.test(str)) {
    return `https://drive.google.com/thumbnail?id=${str}&sz=w1000`;
  }

  return str;
}

// Function to fetch and parse live catalog directly from the connected Google Sheet
export async function fetchProductsFromGoogleSheet(): Promise<ProductItem[]> {
  const res = await fetch(GOOGLE_SHEETS_GVIZ_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const text = await res.text();
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1) throw new Error('Invalid GViz response');
  const jsonStr = text.substring(jsonStart, jsonEnd + 1);
  const data = JSON.parse(jsonStr);

  const rows = data?.table?.rows || [];
  if (rows.length === 0) throw new Error('No rows found in sheet');

  const productMap = new Map<string, ProductItem>();

  rows.forEach((r: any) => {
    const c = r.c;
    if (!c || c.length === 0) return;
    const pidVal = c[0]?.v;
    if (!pidVal) return;
    const pid = String(pidVal).trim();

    if (!productMap.has(pid)) {
      const catCode = c[1]?.v ? String(c[1].v).trim().toUpperCase() : 'PVC';
      const modelName = c[3]?.v ? String(c[3].v).trim() : `สายพานรหัส ${pid}`;
      const thickness = c[4]?.v ? String(c[4].v).trim() : (c[7]?.v ? `Pitch ${c[7].v}` : 'มาตรฐาน');
      const width = c[5]?.v ? String(c[5].v).trim() : undefined;
      const color = c[8]?.v ? String(c[8].v).trim() : 'ตามมาตรฐานโรงงาน';
      const material = c[9]?.v ? String(c[9].v).trim() : 'โพลีเอสเตอร์ / ยางสังเคราะห์';
      const usage = c[10]?.v ? String(c[10].v).trim() : 'ระบบสายพานลำเลียงอุตสาหกรรม';

      productMap.set(pid, {
        product_id: pid,
        category: catCode,
        model_name: modelName,
        thickness,
        width: width || 'ผลิตตัดต่อได้ตามสั่ง',
        color,
        material,
        temp: '-20°C ถึง +80°C',
        usage,
        images: []
      });
    }

    const item = productMap.get(pid)!;
    const rawImg = c[12]?.v;
    if (rawImg && item.images.length < 5) {
      item.images.push(formatDriveImg(String(rawImg).trim()));
    }
  });

  return Array.from(productMap.values()).map(p => {
    while (p.images.length < 5) {
      p.images.push('placeholder');
    }
    return p;
  });
}

export const initialCatalogProducts: ProductItem[] = [
  {
    "product_id": "PVC-01",
    "category": "PVC",
    "model_name": "PVC สีน้ำเงิน",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "น้ำเงิน",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1AoW2a_HlSfZIlXum1XSrysl560YPCMrV&sz=w1000",
      "https://drive.google.com/thumbnail?id=1P3hgHYm9hdhcMXV2WJRkEB2fTuZm2mQj&sz=w1000",
      "https://drive.google.com/thumbnail?id=14bERjn2l-LJR-YXTm4_4oRVVMiOLN3mp&sz=w1000",
      "https://drive.google.com/thumbnail?id=1or61mUJ9HrRZJFpyNwh5gEt-qjRGJQsc&sz=w1000",
      "https://drive.google.com/thumbnail?id=1-J0_W9dmNQGcXZViKXDdCkr57-PprKpc&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-02",
    "category": "PVC",
    "model_name": "PVC ดำ",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ดำ",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1ze_YBPChHeGaLWXWj1COTvOexbiAZK9V&sz=w1000",
      "https://drive.google.com/thumbnail?id=1jIohP9saxcX0AfUbUYHigvsMGkUWvgh5&sz=w1000",
      "https://drive.google.com/thumbnail?id=16YyI7dHPotsRL0ntD-vunD4QkDZzIKD9&sz=w1000",
      "https://drive.google.com/thumbnail?id=1G7O8yRxol2l0bEYl7GuEkg_d4N57QT6F&sz=w1000",
      "https://drive.google.com/thumbnail?id=1wAgg8kibVEGRzOcS372myjQA6Y0IJ70d&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-03",
    "category": "PVC",
    "model_name": "PVC ขาว Diamond",
    "thickness": "มาตรฐาน",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://via.placeholder.com/600x400.png?text=PVC-03_01",
      "https://via.placeholder.com/600x400.png?text=PVC-03_02",
      "https://via.placeholder.com/600x400.png?text=PVC-03_03",
      "https://via.placeholder.com/600x400.png?text=PVC-03_04",
      "https://via.placeholder.com/600x400.png?text=PVC-03_05"
    ]
  },
  {
    "product_id": "PVC-04",
    "category": "PVC",
    "model_name": "PVC สีน้ำเงิน Diamond",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "น้ำเงิน",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=17DAtsakkb28H-FvLhoKwHkNixaSD6ZWM&sz=w1000",
      "https://drive.google.com/thumbnail?id=1y1zOvYD1LwvIbwQrbPAm3h_j5QyZE7zp&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rLvBEBv-x8L3p6Lsxl83fy4IkvACGxTr&sz=w1000",
      "https://drive.google.com/thumbnail?id=1MU-Sg2hk4YaIKo-Y4hfxdwA910vP0cC1&sz=w1000",
      "https://drive.google.com/thumbnail?id=15VBfLgbFvm6uZVH4PfK2M-msoIEfIsve&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-05",
    "category": "PVC",
    "model_name": "PVC สีขาว",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีขาว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1v8C16dJBVHFYuFGfYk49b3RYyLQwwmV1&sz=w1000",
      "https://drive.google.com/thumbnail?id=19ecokEiDRK0QbAGYDn9swc6IgslvamQF&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Y4sYsCmZJGAvv4dr8zdhwosJNvo_i-69&sz=w1000",
      "https://drive.google.com/thumbnail?id=1jXWOfm2nn_mRvnALm_y4sa905a2EUZnr&sz=w1000",
      "https://drive.google.com/thumbnail?id=1I-JU7locVHT492dV1nTKcLhmn5I95z8A&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-06",
    "category": "PVC",
    "model_name": "PVC สีเขียว Diamond",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1IDMkxrw_bDfKOcVpzybc7rJsqtV8GaGC&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Bv4fzQagdCyPIZmN2FJVV3fHujGkjMDw&sz=w1000",
      "https://drive.google.com/thumbnail?id=17ifL8uXf03MIIdcSEzwPhdos5oNQnpcR&sz=w1000",
      "https://drive.google.com/thumbnail?id=1tWfUIg3Tp5kG_2c_JAy70MVT_PVDwDwH&sz=w1000",
      "https://drive.google.com/thumbnail?id=1eAPlWESVEt0v3tHa-uZyKi_ml1nricW9&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-07",
    "category": "PVC",
    "model_name": "PVC สีเขียว",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=13YlX2O5NawwL-Og4gnnYYLJB9kRFLaB0&sz=w1000",
      "https://drive.google.com/thumbnail?id=10qTabYEYsZY0Ju1Guij9ApDhG8uRTkX9&sz=w1000",
      "https://drive.google.com/thumbnail?id=1L6-UTe9D6e7whSH1DSoYdH8c_MQw5D7g&sz=w1000",
      "https://drive.google.com/thumbnail?id=1vZslv_t7QnCUVkMdfGwHJesO-eyuuTLE&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=PVC-07_05"
    ]
  },
  {
    "product_id": "PVC-08",
    "category": "PVC",
    "model_name": "PVC สีเขียว",
    "thickness": "5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1MOEDGtY_AWGpDd0PK-KylHR-6nGF033M&sz=w1000",
      "https://drive.google.com/thumbnail?id=1dJi2tMQ9fEtT561yMTZ_M3Pv8mmX_oax&sz=w1000",
      "https://drive.google.com/thumbnail?id=1dvm77eh18jCZju46X8jwXjuWj4oTyuHh&sz=w1000",
      "https://drive.google.com/thumbnail?id=1QGFL3r9irQqKmda8CvmNFexMR2yVUm9V&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=PVC-08_05"
    ]
  },
  {
    "product_id": "PVC-09",
    "category": "PVC",
    "model_name": "Roughtop เขียว",
    "thickness": "5 mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=17OkOMm5vaT4mO3fwncVDg47_z26AWcEl&sz=w1000",
      "https://drive.google.com/thumbnail?id=1FQDtR8kWSyydNQ8ZQSDA3SpDXuCqhLqL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rJWsKHN_6UYCYgq-V4WzCcZ_fXYMUjtl&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Kr-asGU7paGfFo8ypDk-ab6cjAMkt4aj&sz=w1000",
      "https://drive.google.com/thumbnail?id=1RZuUMGtUnVAJAyiu-Odtoxoqa-nsihVA&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-10",
    "category": "PVC",
    "model_name": "Roughtop ส้ม",
    "thickness": "5 mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีส้ม",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=12IMC889A2i6EmimlxpOc3GC11Fih94qR&sz=w1000",
      "https://drive.google.com/thumbnail?id=1KWxK35gyOKGmJy4ydjnBT9kvVP8rzy17&sz=w1000",
      "https://drive.google.com/thumbnail?id=1SDlaJLvSZoa8jZBEq5R5eY9BVZbTt7LZ&sz=w1000",
      "https://drive.google.com/thumbnail?id=18QW3vIfXF-XJ2cx4aTB3sj1d2fcQ52Ig&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Rd-nWXJ89Ux9ttRdFmpL4mNTCkc4zQ-U&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-11",
    "category": "PVC",
    "model_name": "Roughtop น้ำเงิน",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีน้ำเงิน",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียงอาหาร, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1yL-DUnbnzSccOoL9zw50DcESWzgl3Jkx&sz=w1000",
      "https://drive.google.com/thumbnail?id=1SpHdsY4fe48X4SMp6N3S0pdfLVadpJPT&sz=w1000",
      "https://drive.google.com/thumbnail?id=1K4PjVItX8mMbWu0tRexQOz5Vn0005ELv&sz=w1000",
      "https://drive.google.com/thumbnail?id=1PgaHk1j7rOJH4UOyi5nf1b-oBwcQXm5c&sz=w1000",
      "https://drive.google.com/thumbnail?id=1lEPW5RA0M6gPpkLGVvYrljLW4Kcf5I12&sz=w1000"
    ]
  },
  {
    "product_id": "PVC-12",
    "category": "PVC",
    "model_name": "L-G  ร่อง RIB",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียว",
    "material": "PVC",
    "temp": "-20°C ถึง +80°C",
    "usage": "ลำเลียง, บรรจุภัณฑ์",
    "images": [
      "https://drive.google.com/thumbnail?id=1W-r54e3TDPZ4Ran_ziOaZYTtOkGeG4HI&sz=w1000",
      "https://drive.google.com/thumbnail?id=1KB1EUI0jQvb4_2uL3F5E6n6n-Ank-rkc&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UeixZiHg5EKQH28homLwKfQt52uzmyz5&sz=w1000",
      "https://drive.google.com/thumbnail?id=1xawoeX4Q7vIbz276XshDr-UTlWfm3q--&sz=w1000",
      "https://drive.google.com/thumbnail?id=1D9BanxKHzJvKx5wgf1HYWnNHtQN-Y3-4&sz=w1000"
    ]
  },
  {
    "product_id": "PU-01",
    "category": "PU",
    "model_name": "PU สีขาว",
    "thickness": "1.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "pu",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1LhHTU9gb7l3HTRyKLs9z3H2iSE5ZqpP6&sz=w1000",
      "https://drive.google.com/thumbnail?id=17yHxfWcg66W58qDlL2aCZw3ZsyzNbfbL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1W_38Bm70Z3qg-Ln1p2cyyAcvCU6Hb6I1&sz=w1000",
      "https://drive.google.com/thumbnail?id=1MMZcXGoRh2m2kSrQyZFTvkxSrH80KMPl&sz=w1000",
      "https://drive.google.com/thumbnail?id=1_QEBEemhj1MUBiCDAHO6dSyZ2yBkSt_K&sz=w1000"
    ]
  },
  {
    "product_id": "PU-02",
    "category": "PU",
    "model_name": "PU สีน้ำเงิน ท้องผ้าใบสีน้ำเงิน",
    "thickness": "1.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีน้ำเงิน",
    "material": "pu",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1BOMinmnZKx8NEmdw3PcbMvQ9ScB70auw&sz=w1000",
      "https://drive.google.com/thumbnail?id=13fJGySUKWxRMmZQpd9fMMS8FUQ_aDX-w&sz=w1000",
      "https://drive.google.com/thumbnail?id=1gt5Syl36d6aq7cUoaVzMZKM0X91OERO3&sz=w1000",
      "https://drive.google.com/thumbnail?id=15A4XR5ZX1yyw9NHZwMJIMZqMLC_UdKnB&sz=w1000",
      "https://drive.google.com/thumbnail?id=169yikLHHKDiUm2yH3kojFIUOKoJERT0W&sz=w1000"
    ]
  },
  {
    "product_id": "PU-03",
    "category": "PU",
    "model_name": "PU สีเขียวเข้ม",
    "thickness": "1.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียวเข้ม",
    "material": "pu",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1TdslOxkG1syNTkbUTNZm3OkucM_wDqMT&sz=w1000",
      "https://drive.google.com/thumbnail?id=1kUk69DXlSAr7HgI1IyKRAkDpOUyabJaw&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Jq6ZqO0AyEAtZ8VBF2Dh6chaG5XtwiPC&sz=w1000",
      "https://drive.google.com/thumbnail?id=1K8zAij3a4u9g8XAKje7gh2gz4RPvGb3L&sz=w1000",
      "https://drive.google.com/thumbnail?id=1iXO9jAqhAGu1qVFNCG4qKvgcidZq4gg6&sz=w1000"
    ]
  },
  {
    "product_id": "PU-04",
    "category": "PU",
    "model_name": "PU สีน้ำเงิน",
    "thickness": "0.8mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีน้ำเงิน",
    "material": "pu",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1guVUa8c9wCdJx0LXRu19cVpCIY_1x71O&sz=w1000",
      "https://drive.google.com/thumbnail?id=15vuIlFnMNroMBePK7f83zTYmxx-Q6DxN&sz=w1000",
      "https://drive.google.com/thumbnail?id=14qYYoMnGC1T1ZrkWFg8OLiAlnWoIOmbM&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ugYIepBion0oW2m1rfHS3xGFAnRdfDgv&sz=w1000",
      "https://drive.google.com/thumbnail?id=12EVp2s93e5Gxh-B3JCOhWUAMgMVfkBSp&sz=w1000"
    ]
  },
  {
    "product_id": "PU-05",
    "category": "PU",
    "model_name": "PU สีเขียวเข้ม",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียวเข้ม",
    "material": "pu",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1LSJ_38fVBp0GgiOSv141g_uqGNLk-AcT&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ngyPhJi4__xAP_g_vQTWDqpYQ6M2ZxAA&sz=w1000",
      "https://drive.google.com/thumbnail?id=1m1TsPpsBlFguoCAnxCZ7bhHUbLYrgy2j&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Ty_L1Nqd7kT1LkPp628MM1RNFPSxa4Oe&sz=w1000",
      "https://drive.google.com/thumbnail?id=1sqHnPXuTEMm_PHOOH-KpkNxzhPZpAc0C&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-01",
    "category": "TIM",
    "model_name": "TIMING/AT10-NFT-H/ZTHW-HEI",
    "thickness": "Pitch 10 mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 10 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=16VwkyVeLg7uGNRg_A43QhDSF9uUTuQ9B&sz=w1000",
      "https://drive.google.com/thumbnail?id=1B1OEY_GgqiMT_-sbs35UtF7BLOusoZ-v&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Z6SAY9eFnWZZBON20GclqcUyJNLD_muY&sz=w1000",
      "https://drive.google.com/thumbnail?id=1_JqXA88Zm7Cja-qTphksBoI1LfoOGnhd&sz=w1000",
      "https://drive.google.com/thumbnail?id=1V_jIzYe1eX1RBruzmaIbkrTH00qCFRZv&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-03",
    "category": "TIM",
    "model_name": "Timing Belt AT10-NFT-3PU",
    "thickness": "Pitch 10mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 10 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1amuQ12U08-2nisbOPgO007_4JJhjtqsM&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Xv13eE1juVkpaK24lS7HDlwuIaCTXTLR&sz=w1000",
      "https://drive.google.com/thumbnail?id=1LwLD_MZoHz30rRkv_j38zVCZKg5v1rwk&sz=w1000",
      "https://drive.google.com/thumbnail?id=1jLLwhkV9phUs-wDoAg7uj48577kXXjUg&sz=w1000",
      "https://drive.google.com/thumbnail?id=1a4H58Uogikf5smyM51lBMGj-jdiJIYzI&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-04",
    "category": "TIM",
    "model_name": "Timing HTD8M/NTF/NFB/3PU",
    "thickness": "Pitch 8mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "PU เคลือบเขียว",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 8 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=12tBHRzrQu2B7IVQ8hv9MpU175jPR_Pux&sz=w1000",
      "https://drive.google.com/thumbnail?id=19GOOkFqIXxjaO545AEm6VJcfLhtq0LaZ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1GDGxdoTHwoCRI7CFt8peRVtyg1ussBFI&sz=w1000",
      "https://drive.google.com/thumbnail?id=16xGXm7ouBGR8kUxem1C6-D-i2sXfLwxA&sz=w1000",
      "https://drive.google.com/thumbnail?id=1uCOaiAoG87OcySuWTp56TbHRqU5vWOx-&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-05",
    "category": "TIM",
    "model_name": "TIMING/HTM8M+3PU",
    "thickness": "Pitch 8mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว/แดง",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 8 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1HZ-7HhvdJfn6xgK5j_Mxs5ODxbGFKQTY&sz=w1000",
      "https://drive.google.com/thumbnail?id=1hds8ZFZTs7VXTesI9T2LmWvZOah7nrJe&sz=w1000",
      "https://drive.google.com/thumbnail?id=1S16ffjnDOKUYg5bRAWuzyog8QVjNkqkT&sz=w1000",
      "https://drive.google.com/thumbnail?id=1T30x3h4EqIuv6wOKI1nK53__M5uyo12K&sz=w1000",
      "https://drive.google.com/thumbnail?id=1tBZ8CHZmd8wF8nusRNyfjHuitO5PshNQ&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-06",
    "category": "TIM",
    "model_name": "Timing Belt H+2.4PU",
    "thickness": "Pitch 12.7mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 12.7 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=12-ESdMfYAjPQvsEDQ4dqp_UFh9a5RkwK&sz=w1000",
      "https://drive.google.com/thumbnail?id=1KowsPVLigq8H_1mx0QV4yifAAMgsepb4&sz=w1000",
      "https://drive.google.com/thumbnail?id=1NgkLh5uczLc-sWVpjzeufsi0Z4I46xU4&sz=w1000",
      "https://drive.google.com/thumbnail?id=15Y3Fb9EUTY7bNFj9GHjFkiqeHZGAZin8&sz=w1000",
      "https://drive.google.com/thumbnail?id=10-ZR2elFxQROZCK0-JqGqPVqySOun6FF&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-07",
    "category": "TIM",
    "model_name": "Timing Belt S8M632",
    "thickness": "Pitch 8mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 8 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1VvYnVmS66zufILRA5ZxuMMHDnBYhhhYs&sz=w1000",
      "https://drive.google.com/thumbnail?id=1r5I6Bfir8hIYL9G6s0dRa6JL7p9KX50a&sz=w1000",
      "https://drive.google.com/thumbnail?id=1lxCjfrBZfHl4VkwUnL7zP0xVRXnYiKt8&sz=w1000",
      "https://drive.google.com/thumbnail?id=1dwWLx4AVRuIZixcAusrhnRhMj1UYtLhH&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=TIM-07_05"
    ]
  },
  {
    "product_id": "TIM-08",
    "category": "TIM",
    "model_name": "Timing Belt 5M740",
    "thickness": "Pitch 5mm",
    "width": "25mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 5 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1vKtIGEXP9brjDW0lj-O0u4tZi_tsqdw8&sz=w1000",
      "https://drive.google.com/thumbnail?id=1y5xkMeYfpsYCYFZtAjMDl-3bJBTM5I7B&sz=w1000",
      "https://drive.google.com/thumbnail?id=1_Z4X3VibocebiF3jfd_8UQDhlTZVgLeX&sz=w1000",
      "https://drive.google.com/thumbnail?id=1gbAMgF_0MKgEaXKdLdrQJY5rSAIX4ZEQ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1R9Jk8Lbg9Mwp2SZ-KxPT2lJYb4m9CXfZ&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-9",
    "category": "TIM",
    "model_name": "Timing Belt 8M",
    "thickness": "Pitch 8mm",
    "width": "30mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 8 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1tMajH-9fTeACGaGAKvSP9LN6e_1yOIlm&sz=w1000",
      "https://drive.google.com/thumbnail?id=1QXU6vO7y2eSB5wlWa0q10ra06Ecr-JnV&sz=w1000",
      "https://drive.google.com/thumbnail?id=1bo5l12qwHa3y84q-VlQyzvhaoRCa54mh&sz=w1000",
      "https://drive.google.com/thumbnail?id=1u3UYVnVuu0uS1NZi-MLaNXlspszPZ_Sk&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=TIM-18_05"
    ]
  },
  {
    "product_id": "TIM-10",
    "category": "TIM",
    "model_name": "Timing Belt 14M",
    "thickness": "Pitch 14mm",
    "width": "50mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1ELcfzRnWzjugGbSuEmT8OG9sE5YoDK4H&sz=w1000",
      "https://drive.google.com/thumbnail?id=1WZIgJivhj4q4XTzbEEPqb3r1ED78RWTN&sz=w1000",
      "https://drive.google.com/thumbnail?id=1xsaFlnYj5xA5zJzU6wd42Bn-77aEJu1S&sz=w1000",
      "https://drive.google.com/thumbnail?id=1x41nO0bUZ2pTc2NAZr00yjip3KQF7wp_&sz=w1000",
      "https://drive.google.com/thumbnail?id=13UF_X3jdK0MCyBdGuUfUk4uBACldN8m8&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-11",
    "category": "TIM",
    "model_name": "Timing Belt S3M",
    "thickness": "Pitch 3mm",
    "width": "20mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 3 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1n_wbMJ42_ZL8duvQfnZZE4r16qGYy8vC&sz=w1000",
      "https://drive.google.com/thumbnail?id=1n_wbMJ42_ZL8duvQfnZZE4r16qGYy8vC&sz=w1000",
      "https://drive.google.com/thumbnail?id=1-K-C74c8sS1p5R35C2IUML2V_20ZvG5W&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=TIM-11_04",
      "https://via.placeholder.com/600x400.png?text=TIM-11_05"
    ]
  },
  {
    "product_id": "TIM-12",
    "category": "TIM",
    "model_name": "Timing Belt S5M 1025",
    "thickness": "Pitch 5mm",
    "width": "25mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 5 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1lgmzQK9vHQyXByMADfT_9K31yQehXzUf&sz=w1000",
      "https://drive.google.com/thumbnail?id=1EMe_EO1pIhfh5ksv0XFvxYHl91A1TC0Y&sz=w1000",
      "https://drive.google.com/thumbnail?id=1cufMERIrG2pBhWR0aA-FBM9TlGVRwDp9&sz=w1000",
      "https://drive.google.com/thumbnail?id=1iWIkkdyG3VXeZgk650nHN7AqMqtQccO8&sz=w1000",
      "https://drive.google.com/thumbnail?id=1gjC-xxU_MC2sNFFok2aV6sPYxKyAeGsl&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-13",
    "category": "TIM",
    "model_name": "TIMING/HTD8M-MLHW-LAN",
    "thickness": "Pitch 8mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว/น้ำเงิน",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 8 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1h0xWpz4EtUZ6Z4P5E1PHjmezMn7Ly-lC&sz=w1000",
      "https://drive.google.com/thumbnail?id=1h0xWpz4EtUZ6Z4P5E1PHjmezMn7Ly-lC&sz=w1000",
      "https://drive.google.com/thumbnail?id=1jKdgb0CS6mEiVOXRuYjC2ytE5BJFOWdx&sz=w1000",
      "https://drive.google.com/thumbnail?id=1kYkBUCQCpABznrp9TuSNkhbccZP7QTh0&sz=w1000",
      "https://drive.google.com/thumbnail?id=1_PTEudYM3uAsFS3T9LEiC4JHN3SCEeZJ&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-14",
    "category": "TIM",
    "model_name": "Timing Belt T20",
    "thickness": "Pitch 20mm",
    "width": "30mm",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 20mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1pNwPQuwlkdGprdcdiZ3ETkxZBfnrTiKc&sz=w1000",
      "https://drive.google.com/thumbnail?id=12gyVt8tDIyGuspQW0b7jsddH6fMVW4-_&sz=w1000",
      "https://drive.google.com/thumbnail?id=1poE6edF0SDJaoAM8svmS9tqw3J-Amy5m&sz=w1000",
      "https://drive.google.com/thumbnail?id=1XfKZtSdUxBsEng9lzXeTjCsgYtfGGfwK&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ddz4rwAAr-gvFXScXPCgefAlvKEkbnME&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-15",
    "category": "TIM",
    "model_name": "Timing Belt T10",
    "thickness": "Pitch 10mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 10 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1sc3uOEPR1qh25tcGQQA8xHZsnqQ5DAe8&sz=w1000",
      "https://drive.google.com/thumbnail?id=1tkb9yr9MGILRObzC_Fpywv54BPSGqR1x&sz=w1000",
      "https://drive.google.com/thumbnail?id=1gF1ZYLjhABV_AxEsk8oj2Q5xANgyV_2U&sz=w1000",
      "https://drive.google.com/thumbnail?id=1vXP3ygi26vW1Bsw_03hYrvbf5_Cy44SN&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=TIM-15_05"
    ]
  },
  {
    "product_id": "TIM-16",
    "category": "TIM",
    "model_name": "Timing Belt AT5",
    "thickness": "Pitch 5mm",
    "width": "32mm",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 5 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1R6ASHzD5akJ5NonTtUBobfa27xjEW0CH&sz=w1000",
      "https://drive.google.com/thumbnail?id=1oOxs-DQhu-kt9m_CQPkKb-2qpsTMqddM&sz=w1000",
      "https://drive.google.com/thumbnail?id=1BQyjGuNfS9mG6Ny9oknMCQr25atxDm8I&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=TIM-15_09",
      "https://via.placeholder.com/600x400.png?text=TIM-15_10"
    ]
  },
  {
    "product_id": "TIM-17",
    "category": "TIM",
    "model_name": "Timing Belt S14M",
    "thickness": "Pitch 14mm",
    "width": "20mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 14 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1pN3zP-0BhHfn9l7oe5ioA7WD5ZSHAeiR&sz=w1000",
      "https://drive.google.com/thumbnail?id=1KBPWxoOdeI5cckXsxplR5R79Hm1fzyge&sz=w1000",
      "https://drive.google.com/thumbnail?id=1YorVfuftuSbkOZkIzIXP7nPf9cemCHiH&sz=w1000",
      "https://drive.google.com/thumbnail?id=1y_qDcgrr899emKAJFoqINceo-VeqYXHW&sz=w1000",
      "https://drive.google.com/thumbnail?id=1pJ4oxA-D7nHVqWJRwU5dNFkBx57FjRJW&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-18",
    "category": "TIM",
    "model_name": "Timing Belt S8M",
    "thickness": "Pitch 8mm",
    "width": "40mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 8 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=19m6o8wp35cvAKKf6dJHy5CL0ObVuugOg&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ySZF8OtGNaVhuRYL6dSFxruOuLbsGMLr&sz=w1000",
      "https://drive.google.com/thumbnail?id=1s9RgfOZTrRTPjXpBaiV9JxjtxMTeNBSB&sz=w1000",
      "https://drive.google.com/thumbnail?id=1s9RgfOZTrRTPjXpBaiV9JxjtxMTeNBSB&sz=w1000",
      "https://drive.google.com/thumbnail?id=1hoArpyxmMh4oynIkWkqJe6LVfeNBMeRO&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-19",
    "category": "TIM",
    "model_name": "Timing Belt S2M",
    "thickness": "Pitch 2mm",
    "width": "30mm",
    "color": "ดำ",
    "material": "ยาง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 2 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1ayv5U7o40HhfWv_aphn_QX5xkNvHaxTW&sz=w1000",
      "https://drive.google.com/thumbnail?id=1qVRj0BpwQSLOeVRpzhIE3XVVyDrks673&sz=w1000",
      "https://drive.google.com/thumbnail?id=1TUngOjHNlvclP08qMyIaDxXZ8jq2fm_U&sz=w1000",
      "https://drive.google.com/thumbnail?id=1nSitKc2mkSoxEvnU-LeQidsXA2INPxfK&sz=w1000",
      "https://drive.google.com/thumbnail?id=1yytqlBcMxVGO2UyGkJS1K_zvgNTNS1IQ&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-20",
    "category": "TIM",
    "model_name": "Timing Belt T 3",
    "thickness": "Pitch 3 mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 3 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1n4dCeZ0fZ2u69CbFOpJGmxhH_0bdSGSI&sz=w1000",
      "https://drive.google.com/thumbnail?id=1eZVMbMl-rXdfT_tPa_aCCV2D45ZzGhe-&sz=w1000",
      "https://drive.google.com/thumbnail?id=1oIU1WViA-KJPFHF99AvDCgYeq7_o7LUU&sz=w1000",
      "https://drive.google.com/thumbnail?id=1s02VOae425zXYIW6hUKRbj4djhkMX9jc&sz=w1000",
      "https://drive.google.com/thumbnail?id=1bNmVTwILVPEOZlP0NIvABrzbf1RaF8zp&sz=w1000"
    ]
  },
  {
    "product_id": "TIM-21",
    "category": "TIM",
    "model_name": "Timing Belt AT10",
    "thickness": "Pitch 10mm",
    "width": "32mm",
    "color": "ขาว",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1QcpIgPIgw2vQIt51aJmRYIVA8t8N8Wx9&sz=w1000",
      "https://drive.google.com/thumbnail?id=1_jLnk8ig_u12L7ZgOe7cyhQMLGVGeJW-&sz=w1000",
      "https://drive.google.com/thumbnail?id=1mFtlUEuTIJiH8KU5WMejepqFevs1CCUk&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Lz1KiFHG907tG1riwuO3scNFUEvDNra9&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=TIM-16_05"
    ]
  },
  {
    "product_id": "TIM-22",
    "category": "TIM",
    "model_name": "TIM/T20-ZTHW-HUI",
    "thickness": "Pitch 20 mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ขาว/เทา",
    "material": "PU",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระยะ Pitch 20 mm",
    "images": [
      "https://drive.google.com/thumbnail?id=1BSFINbnJ2JpUsz1Su7UyYks-2OBEb_nt&sz=w1000",
      "https://drive.google.com/thumbnail?id=1TL8hsMIjA-9nmvSdvf9sJqVxSUEl7mEW&sz=w1000",
      "https://drive.google.com/thumbnail?id=1IJOSuCsNLU-iX1s_AIh87Xo1sj7cZE3V&sz=w1000",
      "https://drive.google.com/thumbnail?id=16faBy1DYDzjtROyr-mUzOjpbKXKn0BW2&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ZXVmIYEhf6l-mw-5fyn6n8M8kqcAtBR0&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-01",
    "category": "CHUD",
    "model_name": "สายพานฉุดลายหนังงู 2.5 mm",
    "thickness": "2.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1damAHTh8Ji7syZjfR98PEIK_rsWyGQiG&sz=w1000",
      "https://drive.google.com/thumbnail?id=1osfgZeElwbJFJeomzDcZK35DwzaOddK5&sz=w1000",
      "https://drive.google.com/thumbnail?id=1G1YLxSY437g43ts8Kzq3ajf-FF3omPUw&sz=w1000",
      "https://drive.google.com/thumbnail?id=1TDQS2ovXGOFRQ5LkiZzEvvyiR-uExJ9V&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Pgl6Fd0yQki-7nzFZopsb7On64wimVfo&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-02",
    "category": "CHUD",
    "model_name": "สายพานฉุด N-8 1.0mm",
    "thickness": "1mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=11ON3xb1RBETdnJ7_Y73rjkz2tKce4rnL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1404U9_8e4RRo92FHtOROSFXvzkPMTvav&sz=w1000",
      "https://drive.google.com/thumbnail?id=1sB-bLpA9tUar1oTPt-PCyrSzDuZIX9tz&sz=w1000",
      "https://drive.google.com/thumbnail?id=14mwamBZhhRKP8BSMFD5PWi0fSbcdrPlQ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1z5X83Ha-eiywivc_TbdaPLRdSGncpIry&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-03",
    "category": "CHUD",
    "model_name": "สายพานฉุด P-1",
    "thickness": "1.4mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1dseId2XWFa6xLtWNNZ0KCHykbb4n2MOx&sz=w1000",
      "https://drive.google.com/thumbnail?id=1vgcwS1I2jEc5LET2VeNW4LPz2QTXOOwA&sz=w1000",
      "https://drive.google.com/thumbnail?id=1vbjhYGpPg4UyDKk01B_u20cdQnU5oMuL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zq-drMQX4yJM5URAdSBGKrgTEt5MnAn5&sz=w1000",
      "https://drive.google.com/thumbnail?id=1kw0slNelzaJ51UwbRTZRwqZr1dlxTZFB&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-04",
    "category": "CHUD",
    "model_name": "สายพานฉุด LS-3",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/เหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1WNrZnaIRT12oEE18D_dwlTFzQfRKcWks&sz=w1000",
      "https://drive.google.com/thumbnail?id=1HaAaG2wsX4v4yNwbpkvtlVQ324dq966K&sz=w1000",
      "https://drive.google.com/thumbnail?id=1HDGkZDRGCye44fc9MwfpAMkALe3ZMVBj&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Dj_mcxqZJc7s1yhq0lf-NvB3YSRruf4l&sz=w1000",
      "https://drive.google.com/thumbnail?id=1L805sap2YFtGJp16cKgOZDPtSXBryIeZ&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-05",
    "category": "CHUD",
    "model_name": "สายพานฉุด XS500-4",
    "thickness": "4mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีน้ำเงิน",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1l1O_B7GACU2rX3YwF-9aokrjtdrHZCYP&sz=w1000",
      "https://drive.google.com/thumbnail?id=1htFKj8XVADmdLdlkx9J8rmHbIaUwZ9pp&sz=w1000",
      "https://drive.google.com/thumbnail?id=1I1RFwRDMaATLBmwbrrS0iUdWcIFCDfRz&sz=w1000",
      "https://drive.google.com/thumbnail?id=13k174Mw0hFOFW74JLdUgRqPHZHiauMea&sz=w1000",
      "https://drive.google.com/thumbnail?id=1XrfXsLbwzw9CMk1oyI8eULIUX3VOthzb&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-06",
    "category": "CHUD",
    "model_name": "สายพานฉุด หนัง 2 หน้า",
    "thickness": "55.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ตามมาตรฐาน",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1zpeFdHyz3OZKOWMAk6rvgxrVc1Oquk8x&sz=w1000",
      "https://drive.google.com/thumbnail?id=10zdzH5QH_QobVL6kEH7kD_j2ESjABnfl&sz=w1000",
      "https://drive.google.com/thumbnail?id=1KlRQ0sr0nRZDAmOyZSJEj9obUwzJ1R_P&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zn5h0h5wGVyKk354G24P47PQhU2NgP7t&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=CHUD-06_05"
    ]
  },
  {
    "product_id": "CHUD-07",
    "category": "CHUD",
    "model_name": "สายพานฉุด CH500-6",
    "thickness": "6mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "น้ำเงิน",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1GaheRgMzMXtrpmAYOoLCuF_iH30Bc3dK&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zxyQwB9C_AW97Qtuk02ZgPcnbo3AzouY&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rXn2HRfgd2RVtPE-e4WHiqq8wWm5oVZ8&sz=w1000",
      "https://drive.google.com/thumbnail?id=1FFy1F8PpKnW8x2FM2RBe6_s4ZpnilChO&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=CHUD-07_05"
    ]
  },
  {
    "product_id": "CHUD-08",
    "category": "CHUD",
    "model_name": "สายพานฉุด NT-3",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1jCWgVgalMVs5Mz3nU7W5nYwRYcGkNZPO&sz=w1000",
      "https://drive.google.com/thumbnail?id=1oOVT6fVVsQmbDB8l_h3UvdTNb1NGrV25&sz=w1000",
      "https://drive.google.com/thumbnail?id=1NtoXG1qi-4j5feimqc4NjnRPzKxqTWtv&sz=w1000",
      "https://drive.google.com/thumbnail?id=19ElIywjcLwnnQN_q7ThOn1Kwtl8IsQhI&sz=w1000",
      "https://drive.google.com/thumbnail?id=1PQlnZABxIhmm7rz2ymnuRIiFFSPUcHPi&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-09",
    "category": "CHUD",
    "model_name": "สายพานฉุด LS-2",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/เหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1orasG4mDi4Twf_CiBmFW-b8wJqQ3_JME&sz=w1000",
      "https://drive.google.com/thumbnail?id=1u9ytQhLGEKzjAqNLCfLTLU8WwbWizyAZ&sz=w1000",
      "https://drive.google.com/thumbnail?id=1hi18lwAWriUqssQn3VAjoFhVu36qj8Bu&sz=w1000",
      "https://drive.google.com/thumbnail?id=1jkP2gQrYkvavO9jSaFB3rgIP3Vg9M8Ok&sz=w1000",
      "https://drive.google.com/thumbnail?id=14iSMTBCfkP04IYnZJib1wLI6MLypovZq&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-10",
    "category": "CHUD",
    "model_name": "สายพานฉุด LS-140",
    "thickness": "1.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/เหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1KxuQ5Mg_kqbR5qKJRFt59u8HSDroefW5&sz=w1000",
      "https://drive.google.com/thumbnail?id=1WGvhDS7VMq9R3PN2IFhjbRjZTEhjHoBa&sz=w1000",
      "https://drive.google.com/thumbnail?id=1EmbvyDriITZY_zYR42AdcCte_hdc69ZX&sz=w1000",
      "https://drive.google.com/thumbnail?id=1nUR7GQyBR6V4lhNGgyC6DFipz2ZpOZs6&sz=w1000",
      "https://drive.google.com/thumbnail?id=1HR9pAfCZLkROAC0e2_0-7JoV0TO6pKTY&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-11",
    "category": "CHUD",
    "model_name": "สายพานฉุด LS-1",
    "thickness": "1.5mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/เหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1TNg33QaSe0Y7rhFa-BeuKUm209I-6gO_&sz=w1000",
      "https://drive.google.com/thumbnail?id=1R4A85USjEkLWjEfqyVEb2Kn5wEB0eemQ&sz=w1000",
      "https://drive.google.com/thumbnail?id=139PcXhL_FyvZOORoIvG-VzYWpAJYmsne&sz=w1000",
      "https://drive.google.com/thumbnail?id=17xoxpraUclt-z2DojS3SaW8CeOuLZhRz&sz=w1000",
      "https://drive.google.com/thumbnail?id=1sqBMk24xC9CAZ6cosSgAYAyDmojb1o4i&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-12",
    "category": "CHUD",
    "model_name": "สายพานฉุด NT-2",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1KEDLL5W0A_lSwpgp3oXtRWYHiVpFg5X-&sz=w1000",
      "https://drive.google.com/thumbnail?id=1FHxkuKUIaT9eyyZpX49L6l5oVYsyABqI&sz=w1000",
      "https://drive.google.com/thumbnail?id=1ICH4rw6rZkKLwz1AUaLy2PTPW1gcoWUh&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zWtW2hqCmu1Vig4Byy4qYPFcgRds-MwW&sz=w1000",
      "https://drive.google.com/thumbnail?id=1gDGSnwb4ubyP64SIYtvFw3UaYxpfqNQq&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-13",
    "category": "CHUD",
    "model_name": "สายพานฉุด SG-750",
    "thickness": "1.4mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว/ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1BSoiUIL-V948agNyR8Oi-JFV0srtKkdA&sz=w1000",
      "https://drive.google.com/thumbnail?id=191ogH3I52RbbpXgTZTIUto9kfek0hbae&sz=w1000",
      "https://drive.google.com/thumbnail?id=1b9YzrlBAzuIih7-u9G9BW77Gwu4N1s3e&sz=w1000",
      "https://drive.google.com/thumbnail?id=1nc03lUcMnJ8uh7Gt6PY066JyZaVucbHY&sz=w1000",
      "https://drive.google.com/thumbnail?id=1uwIxDGSf1SafNhS5LkjFRA8sT-8uj9sz&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-14",
    "category": "CHUD",
    "model_name": "สายพานฉุด Z-1",
    "thickness": "1mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1EVtyqprLuVuAa2pdfbm2BUL_8h7Po06U&sz=w1000",
      "https://drive.google.com/thumbnail?id=1onQ39rl59K2Yqm-hA9Lu39lwjPW08_pa&sz=w1000",
      "https://drive.google.com/thumbnail?id=16zC3ugQSesxx4WIwEHTG_KSs7JUbPPz6&sz=w1000",
      "https://drive.google.com/thumbnail?id=1kqYRk0rhR7an0LxSp5h0GM9fDN8h_xCE&sz=w1000",
      "https://drive.google.com/thumbnail?id=1kqYRk0rhR7an0LxSp5h0GM9fDN8h_xCE&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-15",
    "category": "CHUD",
    "model_name": "สายพานฉุด MAM-04",
    "thickness": "1.4mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียวดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1c8uG-KjiYgBPaknWRdCoRXseDSuktsHG&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rygVFa9gv9takIexAQV-XD6fx4jgJncx&sz=w1000",
      "https://drive.google.com/thumbnail?id=1IsafB5s-LsMTTpu80qA_q5qJ1n4NgRtc&sz=w1000",
      "https://drive.google.com/thumbnail?id=1o20osDHI3teAub9ZxPU2ehCdJbPs7rom&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Ir6-dVc5gpP462BjVWxvKxWD1FFyF8JE&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-16",
    "category": "CHUD",
    "model_name": "สายพานฉุด NT-1",
    "thickness": "1mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียวดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1eTPRJlgLxWi5TQzehVJt7welfwGikTfl&sz=w1000",
      "https://drive.google.com/thumbnail?id=1vAtpSAhT2T-Qu0gQbSW3a4Cgtxg_YCRb&sz=w1000",
      "https://drive.google.com/thumbnail?id=1VqQjLbXTp1EMZXfcJy2qZLXtZDu7vqNn&sz=w1000",
      "https://drive.google.com/thumbnail?id=11613PFCz0ZFWHxqlk1FKLmy0T8u6LLcH&sz=w1000",
      "https://drive.google.com/thumbnail?id=18i8gkpkpQMrrPT_zTnzw-ecaUDahOaxl&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-17",
    "category": "CHUD",
    "model_name": "สายพานฉุด TU-6",
    "thickness": "1mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียวดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1IwaTikqvXWEuy-ARX6jFDeYpZuCByqfA&sz=w1000",
      "https://drive.google.com/thumbnail?id=1tRS-2jPQVhH7Tz29WfWbz835sZFC8Ang&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UwU4tkgrvzrpG9qGl9L_sy_iXAPj_HlN&sz=w1000",
      "https://drive.google.com/thumbnail?id=1MT5y1ERQumLp5dlc_2Tjjn-DL19gh5y1&sz=w1000",
      "https://drive.google.com/thumbnail?id=1NUPd05zCDqSvE6SMOLN9mGZF8E2DOCTr&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-18",
    "category": "CHUD",
    "model_name": "สายพานฉุด SPINDEL",
    "thickness": "1mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1dWxlTpq1mqDKZ-YiEYT2oQvB_bikL2se&sz=w1000",
      "https://drive.google.com/thumbnail?id=1CMqhb5_0h3zF1EH0ZzZpADJ5WtPt4AiF&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rg2PjWpGnSNm9PYq8aV71kuNrGBLD_5V&sz=w1000",
      "https://drive.google.com/thumbnail?id=1FIfX-3ECZdQ82LDw4euEf8w_QBn0Gwj6&sz=w1000",
      "https://drive.google.com/thumbnail?id=1FIfX-3ECZdQ82LDw4euEf8w_QBn0Gwj6&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-19",
    "category": "CHUD",
    "model_name": "สายพานฉุด XH 500-3",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ฟ้า",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=14JJNDXpzFLvYPEsCxfP0szsNWYm31UVK&sz=w1000",
      "https://drive.google.com/thumbnail?id=18flnvs6qug5w0UgaRe4XBt3STNymtoK0&sz=w1000",
      "https://drive.google.com/thumbnail?id=1V-pMwKu5AsbgL4ueUsHhb039hQTY8WBv&sz=w1000",
      "https://drive.google.com/thumbnail?id=1BqCNiRj3UGyBqkil280dSin3I5KjBKsY&sz=w1000",
      "https://drive.google.com/thumbnail?id=1IsKKWupNrppXu-uDWMbRjblGo-Tx7950&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-20",
    "category": "CHUD",
    "model_name": "สายพานฉุด LS-4",
    "thickness": "4mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียวเหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1vvQ8SkXnqGpgKGohTt03jibme7bSWnkI&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Byo3eN4bpLjGKW5JuqV3eTkQR9lpydHa&sz=w1000",
      "https://drive.google.com/thumbnail?id=11fAXD41L4ZZD_sh56y1MSYCMuHgx7liu&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rUNLPKj6DNkFnhSFqgWAJd5PUqj6GXOt&sz=w1000",
      "https://drive.google.com/thumbnail?id=1GVGu9CRN5WmREqac8Oiu_EUzcSxx9rvE&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-21",
    "category": "CHUD",
    "model_name": "สายพานฉุด S 60",
    "thickness": "6mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีน้ำเงิน",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1SxCGatPIOiEnaozE9cD-TOBsBV5lvIJv&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Y5xejI8xhqN7Rblb_oOMOYrjDgzCXSBN&sz=w1000",
      "https://drive.google.com/thumbnail?id=1z6meINoyKNQNV6zpBw7cCZyncbh4vGiL&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=ROUND-01_04",
      "https://via.placeholder.com/600x400.png?text=ROUND-01_05"
    ]
  },
  {
    "product_id": "CHUD-22",
    "category": "CHUD",
    "model_name": "สายพานฉุด S 30 D-B",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีน้ำเงิน",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1BGeFiR8Ip5xwP4IZjN3PLmXcaWngi9qI&sz=w1000",
      "https://drive.google.com/thumbnail?id=1rK0_fOdii5WhynkrjgrQx_lABn2b8h4N&sz=w1000",
      "https://drive.google.com/thumbnail?id=1SNy0LlTw6otmW_ODrUN-TpnzpERJMJoF&sz=w1000",
      "https://drive.google.com/thumbnail?id=1DAk2FBk1qyEsoaD6fS4d_ci-Tk5xtkJJ&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=ROUND-01_15"
    ]
  },
  {
    "product_id": "CHUD-23",
    "category": "CHUD",
    "model_name": "สายพานฉุด S 40 D-G",
    "thickness": "4mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีเขียว",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1c3g5JMjRS73aAAybpRsfrYrS4UjNM-AL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1j57N-6kQhHsx0AeQmU0w0YMN2JXAuB9s&sz=w1000",
      "https://drive.google.com/thumbnail?id=1bItlnoEHBx8W4GWGNFS-wCjqfXPj10Rt&sz=w1000",
      "https://drive.google.com/thumbnail?id=1GKMjAvBDxQVVMyWvDs2Ozxx9ChOgImza&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UfWsDAFnd-f3relTqrHhMEgcNc5A_fkV&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-24",
    "category": "CHUD",
    "model_name": "สายพานฉุด S 30",
    "thickness": "3mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว-เหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=10jwIImVvt-m90WeqZ_vBvysAMdmCuUOf&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UsFyWMPNRkzx8O-jE3orQxTkEaG51VkG&sz=w1000",
      "https://drive.google.com/thumbnail?id=1UDNvzNoXfk6rCD_QqTOPOwXZyUNYYKrb&sz=w1000",
      "https://drive.google.com/thumbnail?id=1PasMjp4w4EvAfb5EEzakpDvHcB-gm6Ct&sz=w1000",
      "https://drive.google.com/thumbnail?id=1byBMC5NWZPFFhOBKHF0PdffhvlOsYvAj&sz=w1000"
    ]
  },
  {
    "product_id": "CHUD-25",
    "category": "CHUD",
    "model_name": "สายพานฉุด S 20",
    "thickness": "2mm",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว-เหลือง",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1G6H3vUPOKVywK_0kXzvqkhShxKu9P3C7&sz=w1000",
      "https://drive.google.com/thumbnail?id=1PQFqJYcORCWxw1bvNcSXHT0Ri7_-b1Fm&sz=w1000",
      "https://drive.google.com/thumbnail?id=1TE0KV92T9npl_PP-N_DjoaRwZ9e4HHJf&sz=w1000",
      "https://drive.google.com/thumbnail?id=1u0r41vjrxxc1-2S4U5edJjh9xzrYXHuL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1cRM6I5Rb5Mr9Vwks8nt6xQD--7n1y_Gb&sz=w1000"
    ]
  },
  {
    "product_id": "ROUND-01",
    "category": "ROUND",
    "model_name": "สายพานกลม รุ่น ROUND-01",
    "thickness": "มาตรฐาน",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เขียว",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1cjqzM0gC34eee92fb43flbODLQM8fnES&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Wl2dl-wuGvysGqvkruvIJMDgkpBwMVoz&sz=w1000",
      "https://drive.google.com/thumbnail?id=1yFDxJhzuBHMully4gGLpPQmU_z4eseEa&sz=w1000",
      "https://drive.google.com/thumbnail?id=1u5QBaZ29_IAoViKQ7Fj2Qa3oSsGXlRgk&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=ROUND-01_05"
    ]
  },
  {
    "product_id": "VB-01",
    "category": "VB",
    "model_name": "V-Belt รุ่น VB-01",
    "thickness": "มาตรฐาน",
    "width": "A-50",
    "color": "ดำ",
    "material": "ยางเสริมใย",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1x-vBARYj2xw2QQHSSJNNhp2335xhr96A&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=VB-01_02",
      "https://via.placeholder.com/600x400.png?text=VB-01_03",
      "https://via.placeholder.com/600x400.png?text=VB-01_04",
      "https://via.placeholder.com/600x400.png?text=VB-01_05"
    ]
  },
  {
    "product_id": "WOOD-01",
    "category": "WOOD",
    "model_name": "สายพานไม้ รุ่น WOOD-01",
    "thickness": "มาตรฐาน",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "สีลายไม้",
    "material": "ไม้+สายพาน",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1XUnpY-GO5I3M74GAziWkvjO9NUwxqNhD&sz=w1000",
      "https://drive.google.com/thumbnail?id=1djE-U1qaHre5INFaZNQiwo6KkMU8Gbxh&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zgNszEbwrIOULL4W4nOLfa51-oIwtpXk&sz=w1000",
      "https://drive.google.com/thumbnail?id=17Vaz4qOjMCn_9XlYHiYBCdalwrOBVuLg&sz=w1000",
      "https://drive.google.com/thumbnail?id=1WDy3ywf71kFTFNp_Mo_v1lmbInJQhR1H&sz=w1000"
    ]
  },
  {
    "product_id": "RUBBER-01",
    "category": "RUBBER",
    "model_name": "สายพานเคลือบยาง รุ่น RUBBER-01",
    "thickness": "มาตรฐาน",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "ตามสั่ง",
    "material": "ยางเคลือบ",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1iWAlHUefVsi8r7zfaRW4Z-ENAYXz0e1v&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Z9jgwAZRrzSeKXPsdfbEJHJnnEJ3abIG&sz=w1000",
      "https://drive.google.com/thumbnail?id=1c0vk0SS-2kY0Bq0hX0e6oHg5_nhNQYI_&sz=w1000",
      "https://drive.google.com/thumbnail?id=1qKT_LwJ74qo7PgvfQRNKC7dRlnvaXiJK&sz=w1000",
      "https://drive.google.com/thumbnail?id=1uacekDaEsCA6iXZM2VZrzODUJ5y2a_r2&sz=w1000"
    ]
  },
  {
    "product_id": "CANVAS-01",
    "category": "CANVAS",
    "model_name": "สายพานผ้าใบคาดแดง",
    "thickness": "ตามสั่ง",
    "width": "ตามสั่ง",
    "color": "แดง/ดำ",
    "material": "ผ้าใบคาดแดง",
    "temp": "-20°C ถึง +80°C",
    "usage": "ระบบสายพานลำเลียงอุตสาหกรรม",
    "images": [
      "https://drive.google.com/thumbnail?id=1BgV_RRj4_T3ahNOYy2NlMSyhyESbh4JL&sz=w1000",
      "https://drive.google.com/thumbnail?id=1SUjlKsaPQhi6kIl8GqgTaHbICg2ELhGM&sz=w1000",
      "https://drive.google.com/thumbnail?id=1VDJBy0hPX-Gj23_qNM30iql3bk288uu4&sz=w1000",
      "https://drive.google.com/thumbnail?id=1oW3oAGegdaLLMSidTjyD9_gNBwyxn758&sz=w1000",
      "https://drive.google.com/thumbnail?id=1JR6ssAPPBAgCPYm2hV9vYkOcmHGvtmAo&sz=w1000"
    ]
  },
  {
    "product_id": "RIB-01",
    "category": "RIB",
    "model_name": "Rib-Belt รุ่น RIB-01",
    "thickness": "มาตรฐาน",
    "width": "3PK",
    "color": "ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "รถยนต์, เครื่องจักร",
    "images": [
      "https://via.placeholder.com/600x400.png?text=RIB-01_01",
      "https://via.placeholder.com/600x400.png?text=RIB-01_02",
      "https://via.placeholder.com/600x400.png?text=RIB-01_03",
      "https://via.placeholder.com/600x400.png?text=RIB-01_04",
      "https://via.placeholder.com/600x400.png?text=RIB-01_05"
    ]
  },
  {
    "product_id": "RIB-02",
    "category": "RIB",
    "model_name": "Rib-Belt รุ่น RIB-02",
    "thickness": "มาตรฐาน",
    "width": "5PK",
    "color": "ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "รถยนต์, เครื่องจักร",
    "images": [
      "https://via.placeholder.com/600x400.png?text=RIB-02_01",
      "https://via.placeholder.com/600x400.png?text=RIB-02_02",
      "https://via.placeholder.com/600x400.png?text=RIB-02_03",
      "https://via.placeholder.com/600x400.png?text=RIB-02_04",
      "https://via.placeholder.com/600x400.png?text=RIB-02_05"
    ]
  },
  {
    "product_id": "RIB-03",
    "category": "RIB",
    "model_name": "Rib-Belt รุ่น RIB-03",
    "thickness": "มาตรฐาน",
    "width": "6PK",
    "color": "ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "รถยนต์, เครื่องจักร",
    "images": [
      "https://via.placeholder.com/600x400.png?text=RIB-03_01",
      "https://via.placeholder.com/600x400.png?text=RIB-03_02",
      "https://via.placeholder.com/600x400.png?text=RIB-03_03",
      "https://via.placeholder.com/600x400.png?text=RIB-03_04",
      "https://via.placeholder.com/600x400.png?text=RIB-03_05"
    ]
  },
  {
    "product_id": "RIB-04",
    "category": "RIB",
    "model_name": "Rib-Belt รุ่น RIB-04",
    "thickness": "มาตรฐาน",
    "width": "3PK",
    "color": "ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "รถยนต์, เครื่องจักร",
    "images": [
      "https://via.placeholder.com/600x400.png?text=RIB-04_01",
      "https://via.placeholder.com/600x400.png?text=RIB-04_02",
      "https://via.placeholder.com/600x400.png?text=RIB-04_03",
      "https://via.placeholder.com/600x400.png?text=RIB-04_04",
      "https://via.placeholder.com/600x400.png?text=RIB-04_05"
    ]
  },
  {
    "product_id": "RIB-05",
    "category": "RIB",
    "model_name": "Rib-Belt รุ่น RIB-05",
    "thickness": "มาตรฐาน",
    "width": "5PK",
    "color": "ดำ",
    "material": "ยาง/สังเคราะห์",
    "temp": "-20°C ถึง +80°C",
    "usage": "รถยนต์, เครื่องจักร",
    "images": [
      "https://via.placeholder.com/600x400.png?text=RIB-05_01",
      "https://via.placeholder.com/600x400.png?text=RIB-05_02",
      "https://via.placeholder.com/600x400.png?text=RIB-05_03",
      "https://via.placeholder.com/600x400.png?text=RIB-05_04",
      "https://via.placeholder.com/600x400.png?text=RIB-05_05"
    ]
  },
  {
    "product_id": "PULLEY--01",
    "category": "PULLEY",
    "model_name": "Pulley นำเข้า PULLEY-นำ-01",
    "thickness": "มาตรฐาน",
    "width": "ผลิตตัดต่อได้ตามขนาดสั่ง",
    "color": "เงิน/เหล็ก",
    "material": "เหล็ก/อลูมิเนียม",
    "temp": "-20°C ถึง +80°C",
    "usage": "Pulley นำเข้า ตามแบบ",
    "images": [
      "https://drive.google.com/thumbnail?id=1ljFq7wH58dQSl88dXu1pX4pyJe4p5FsW&sz=w1000",
      "https://drive.google.com/thumbnail?id=1zSUCXZtlnT49LDw2JyxVkTZ43bdarou0&sz=w1000",
      "https://drive.google.com/thumbnail?id=1uAKi8bHxy1g2l1iuSjDrC7JZ6BKjikzA&sz=w1000",
      "https://drive.google.com/thumbnail?id=1Yx_wiUiWBxS3jmN2t5ovCl8wQJnjzCMk&sz=w1000",
      "https://via.placeholder.com/600x400.png?text=PULLEY--01_05"
    ]
  }
];
