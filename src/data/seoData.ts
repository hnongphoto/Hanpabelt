/**
 * Hanpabelt.com SEO Data & Meta Pack
 * Contains exact Title, Meta Description, Keywords, and Schemas from Hanpabelt SEO specifications
 */

export interface SEORecord {
  categoryName: string;
  url: string;
  slug: string;
  title: string;
  description: string;
  keywords: string;
  h1Supplement?: string;
}

export const HANPA_DEFAULT_IMAGE = "https://www.hanpabelt.com/hanpa_official_brand.jpg";
export const HANPA_LOGO_URL = "https://www.hanpabelt.com/logo.png";
export const BASE_SITE_URL = "https://www.hanpabelt.com";

export const SEO_PAGES_DATA: Record<string, SEORecord> = {
  home: {
    categoryName: "หน้าแรก",
    url: "https://www.hanpabelt.com/",
    slug: "",
    title: "สายพานอุตสาหกรรม HANPABELT - สายพานลำเลียง ส่งกำลัง ตัดตามขนาด ส่งด่วน ชลบุรี",
    description: "Hanpabelt.com จำหน่ายสายพานอุตสาหกรรมครบวงจร สายพาน PVC PU Timing Belt V-Belt มู่เล่ย์ ตัดตามขนาด ส่งด่วน ชลบุรี ระยอง สมุทรปราการ ปรึกษาฟรี",
    keywords: "สายพานอุตสาหกรรม, สายพานลำเลียง, HANPABELT, Hanpabelt.com, ร้านขายสายพานอุตสาหกรรม, ชลบุรี, ระยอง, สมุทรปราการ, อมตะซิตี้",
    h1Supplement: "สายพานอุตสาหกรรม และระบบส่งกำลังครบวงจร HANPABELT"
  },
  "pu-belt": {
    categoryName: "สายพาน PU",
    url: "https://www.hanpabelt.com/pu-belt",
    slug: "pu-belt",
    title: "สายพาน PU HANPABELT - Food Grade ตัดตามขนาด ส่งด่วน",
    description: "Hanpabelt.com จำหน่ายสายพาน PU สีเขียว ขาว 0.8-3mm Food Grade ทนน้ำมัน ตัดตามขนาด ส่งด่วน ชลบุรี ระยอง ปรึกษาฟรี",
    keywords: "สายพาน PU, HANPABELT, Hanpabelt.com, สายพานอุตสาหกรรม, Food Grade, ตัดตามขนาด, ส่งด่วน ชลบุรี, ระยอง",
    h1Supplement: "สายพาน PU Food Grade HANPABELT"
  },
  "pvc-belt": {
    categoryName: "สายพาน PVC",
    url: "https://www.hanpabelt.com/pvc-belt",
    slug: "pvc-belt",
    title: "สายพาน PVC HANPABELT - ท้องไดม่อน ลายดอก ทนน้ำมัน",
    description: "Hanpabelt.com ขายสายพาน PVC 2-5mm เขียว ขาว ฟ้า ดำ ท้องไดม่อน ลายดอก ลายไผ่ ตัดตามขนาด ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "สายพาน PVC, HANPABELT, Hanpabelt.com, สายพานอุตสาหกรรม, ท้องไดม่อน, ลายดอก, ลายไผ่, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพาน PVC ท้องไดม่อน ลายดอก HANPABELT"
  },
  "timing-belt": {
    categoryName: "สายพาน Timing Belt",
    url: "https://www.hanpabelt.com/timing-belt",
    slug: "timing-belt",
    title: "สายพาน Timing Belt HANPABELT - T5 T10 AT10 5M 8M",
    description: "Hanpabelt.com Timing Belt ยาง PU T5 T10 AT10 3M 5M 8M 14M หน้าเดียว สองหน้า ตัดตามขนาด ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "สายพาน Timing Belt, HANPABELT, Hanpabelt.com, T5, T10, AT10, 5M, 8M, สายพานไทม์มิ่ง, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพาน Timing Belt ยาง PU HANPABELT"
  },
  "v-belt": {
    categoryName: "สายพาน V-Belt",
    url: "https://www.hanpabelt.com/v-belt",
    slug: "v-belt",
    title: "สายพาน V-Belt HANPABELT - ร่อง A B C SPZ SPA SPB",
    description: "Hanpabelt.com V-Belt ร่องเรียบ ร่องฟัน A B C D SPZ SPA SPB SPC มอเตอร์ ปั๊ม ตัดตามขนาด ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "สายพาน V-Belt, HANPABELT, Hanpabelt.com, สายพานร่องวี, ร่อง A, ร่อง B, ร่อง C, SPZ, SPA, SPB, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพาน V-Belt ร่องเรียบ ร่องฟัน HANPABELT"
  },
  "flat-belt": {
    categoryName: "สายพาน Flat Belt",
    url: "https://www.hanpabelt.com/flat-belt",
    slug: "flat-belt",
    title: "สายพาน Flat Belt HANPABELT - ผ้าใบแบน ฉุดทนทาน",
    description: "Hanpabelt.com Flat Belt ผ้าใบแบน สายพานฉุด โรงสี เกษตร ทนดึงสูง ตัดตามขนาด ส่งด่วน ชลบุรี ระยอง ปรึกษาฟรี",
    keywords: "สายพาน Flat Belt, HANPABELT, Hanpabelt.com, สายพานผ้าใบ, ผ้าใบแบน, สายพานฉุด, ตัดตามขนาด, ส่งด่วน ชลบุรี, ระยอง",
    h1Supplement: "สายพาน Flat Belt ผ้าใบแบน HANPABELT"
  },
  "modular-belt": {
    categoryName: "สายพาน Modular Belt",
    url: "https://www.hanpabelt.com/modular-belt",
    slug: "modular-belt",
    title: "สายพาน Modular Belt HANPABELT - Food Grade",
    description: "Hanpabelt.com Modular Belt พลาสติกโมดูลาร์ Food Grade ขึ้นเนิน แช่แข็ง ล้างง่าย ตัดตามขนาด ส่งด่วน ชลบุรี",
    keywords: "สายพาน Modular Belt, HANPABELT, Hanpabelt.com, พลาสติกโมดูลาร์, Food Grade, ขึ้นเนิน, แช่แข็ง, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพาน Modular Belt พลาสติกโมดูลาร์ HANPABELT"
  },
  "felt-belt": {
    categoryName: "สายพานสักหลาด",
    url: "https://www.hanpabelt.com/felt-belt",
    slug: "felt-belt",
    title: "สายพานสักหลาด HANPABELT - Felt Belt 2.5-5.6mm",
    description: "Hanpabelt.com สักหลาด Felt Belt 2.5 4 4.5 5.6mm เครื่องตรวจเข็ม คัดแยก ตัดตามขนาด ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "สายพานสักหลาด, Felt Belt, HANPABELT, Hanpabelt.com, เครื่องตรวจเข็ม, คัดแยก, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพานสักหลาด Felt Belt HANPABELT"
  },
  "heat-resistant-belt": {
    categoryName: "สายพานทนความร้อน",
    url: "https://www.hanpabelt.com/heat-resistant-belt",
    slug: "heat-resistant-belt",
    title: "สายพานทนความร้อน HANPABELT - Teflon 260 องศา",
    description: "Hanpabelt.com Teflon ตาข่ายทนความร้อน 260 องศา Wire Mesh อบอาหาร อบสี ตัดตามขนาด ส่งด่วน ชลบุรี",
    keywords: "สายพานทนความร้อน, Teflon, HANPABELT, Hanpabelt.com, สายพานเทฟลอน, Wire Mesh, อบอาหาร, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพานทนความร้อน Teflon Wire Mesh HANPABELT"
  },
  "round-belt": {
    categoryName: "สายพานกลม",
    url: "https://www.hanpabelt.com/round-belt",
    slug: "round-belt",
    title: "สายพานกลม HANPABELT - Round Belt PU O-Ring",
    description: "Hanpabelt.com สายพานกลม Round Belt PU เขียว ส้ม O-Ring ลำเลียงกล่อง ตัดตามขนาด ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "สายพานกลม, Round Belt, HANPABELT, Hanpabelt.com, PU O-Ring, ลำเลียงกล่อง, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพานกลม Round Belt PU O-Ring HANPABELT"
  },
  "food-grade-belt": {
    categoryName: "สายพาน Food Grade",
    url: "https://www.hanpabelt.com/food-grade-belt",
    slug: "food-grade-belt",
    title: "สายพาน Food Grade HANPABELT - FDA มาตรฐานอาหาร",
    description: "Hanpabelt.com Food Grade FDA ขาว ฟ้า PU PVC ผ่าน GMP HACCP โรงงานอาหาร ตัดตามขนาด ส่งด่วน ชลบุรี",
    keywords: "สายพาน Food Grade, FDA, GMP, HACCP, HANPABELT, Hanpabelt.com, ขาว, ฟ้า, PU, PVC, โรงงานอาหาร, ตัดตามขนาด, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพาน Food Grade FDA มาตรฐานอาหาร HANPABELT"
  },
  "timing-pulley": {
    categoryName: "Timing Pulley",
    url: "https://www.hanpabelt.com/timing-pulley",
    slug: "timing-pulley",
    title: "Timing Pulley HANPABELT - พูลเลย์ไทม์มิ่ง สั่งทำ",
    description: "Hanpabelt.com Timing Pulley พูลเลย์ไทม์มิ่ง T5 T10 AT10 5M 8M อลูมิเนียม เหล็ก สั่งทำตามแบบ ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "Timing Pulley, พูลเลย์ไทม์มิ่ง, HANPABELT, Hanpabelt.com, T5, T10, AT10, 5M, 8M, สั่งทำตามแบบ, ส่งด่วน ชลบุรี",
    h1Supplement: "Timing Pulley พูลเลย์ไทม์มิ่งสั่งทำตามแบบ HANPABELT"
  },
  "v-belt-pulley": {
    categoryName: "V-Belt Pulley",
    url: "https://www.hanpabelt.com/v-belt-pulley",
    slug: "v-belt-pulley",
    title: "V-Belt Pulley HANPABELT - มู่เลย์ร่องวี A B C",
    description: "Hanpabelt.com V-Belt Pulley มู่เลย์ร่องวี A B C D มอเตอร์ ปรับรอบ สั่งทำตามขนาด ส่งด่วน ชลบุรี ระยอง ปรึกษาฟรี",
    keywords: "V-Belt Pulley, มู่เลย์ร่องวี, HANPABELT, Hanpabelt.com, ร่อง A, ร่อง B, ร่อง C, มอเตอร์, สั่งทำตามขนาด, ส่งด่วน ชลบุรี, ระยอง",
    h1Supplement: "V-Belt Pulley มู่เลย์ร่องวีสั่งทำตามขนาด HANPABELT"
  },
  "apron-roller": {
    categoryName: "สายพานฉุด / Roller",
    url: "https://www.hanpabelt.com/apron-roller",
    slug: "apron-roller",
    title: "สายพานฉุด HANPABELT - Apron Belt ลูกกลิ้งลำเลียง",
    description: "Hanpabelt.com สายพานฉุดเหล็ก Apron Belt ลูกกลิ้ง Roller รับทำตามแบบ ติดตั้งหน้างาน ส่งด่วน ชลบุรี ปรึกษาฟรี",
    keywords: "สายพานฉุด, Apron Belt, ลูกกลิ้งลำเลียง, Roller, HANPABELT, Hanpabelt.com, รับทำตามแบบ, ติดตั้งหน้างาน, ส่งด่วน ชลบุรี",
    h1Supplement: "สายพานฉุด Apron Belt ลูกกลิ้งลำเลียง HANPABELT"
  },
  "belt-fastener": {
    categoryName: "ข้อต่อสายพาน",
    url: "https://www.hanpabelt.com/belt-fastener",
    slug: "belt-fastener",
    title: "ข้อต่อสายพาน HANPABELT - กิ๊บต่อ เครื่องต่อสายพาน",
    description: "Hanpabelt.com ข้อต่อสายพานแบน กิ๊บต่อ เครื่องต่อสายพาน ครบชุด ส่งด่วน ชลบุรี ระยอง ปรึกษาฟรี",
    keywords: "ข้อต่อสายพาน, กิ๊บต่อสายพาน, เครื่องต่อสายพาน, HANPABELT, Hanpabelt.com, สายพานแบน, ส่งด่วน ชลบุรี, ระยอง",
    h1Supplement: "ข้อต่อสายพาน กิ๊บต่อ เครื่องต่อสายพานครบชุด HANPABELT"
  },
  service: {
    categoryName: "บริการตัดต่อ",
    url: "https://www.hanpabelt.com/service",
    slug: "service",
    title: "รับตัดต่อสายพาน Hanpabelt.com - ติดตั้งหน้างาน ชลบุรี",
    description: "Hanpabelt.com รับตัดต่อ PU PVC Timing V-Belt ติดตั้งหน้างาน ซ่อมด่วน อมตะ อีสเทิร์นซีบอร์ด ชลบุรี ระยอง โทรเลย",
    keywords: "รับตัดต่อสายพาน, ติดตั้งหน้างาน ชลบุรี, Hanpabelt.com, สายพาน PU PVC Timing V-Belt, อมตะ, อีสเทิร์นซีบอร์ด, ระยอง, โทรเลย",
    h1Supplement: "บริการรับตัดต่อสายพานและติดตั้งหน้างาน ชลบุรี HANPABELT"
  },
  quote: {
    categoryName: "ขอใบเสนอราคา",
    url: "https://www.hanpabelt.com/#quote",
    slug: "quote",
    title: "ขอใบเสนอราคาสายพาน HANPABELT - ตัดตามขนาด ส่งด่วน ชลบุรี",
    description: "Hanpabelt.com ขอใบเสนอราคาสายพานลำเลียง สายพานส่งกำลัง Timing Belt V-Belt มู่เล่ย์ ตัดตามขนาด ส่งด่วน ชลบุรี ระยอง ปรึกษาฟรี",
    keywords: "ขอใบเสนอราคาสายพาน, HANPABELT, Hanpabelt.com, ใบเสนอราคา, สายพานอุตสาหกรรม, ชลบุรี, ระยอง",
    h1Supplement: "ระบบขอใบเสนอราคาสายพานด่วนออนไลน์ HANPABELT"
  },
  about: {
    categoryName: "เกี่ยวกับเรา",
    url: "https://www.hanpabelt.com/#about",
    slug: "about",
    title: "เกี่ยวกับ HANPABELT - บริษัท หาญภา จำกัด สายพานอุตสาหกรรม ชลบุรี",
    description: "บริษัท หาญภา จำกัด (Hanpabelt.com) ผู้นำเข้าและจำหน่ายสายพานอุตสาหกรรมมาตรฐานสากล บริการตัดต่อและติดตั้งหน้างาน ชลบุรี ระยอง ทั่วไทย",
    keywords: "บริษัท หาญภา จำกัด, HANPABELT, Hanpabelt.com, โรงงานสายพานชลบุรี, สายพานอุตสาหกรรม",
    h1Supplement: "เกี่ยวกับ บริษัท หาญภา จำกัด HANPABELT ชลบุรี"
  },
  knowledge: {
    categoryName: "ความรู้สายพาน",
    url: "https://www.hanpabelt.com/#knowledge",
    slug: "knowledge",
    title: "คู่มือความรู้สายพาน HANPABELT - เปรียบเทียบ PU vs PVC ส่งด่วน ชลบุรี",
    description: "Hanpabelt.com แหล่งรวมความรู้เทคนิคสายพานลำเลียง เปรียบเทียบสายพาน PU vs PVC วิธีวัดขนาดสายพาน และการบำรุงรักษาเครื่องจักร ปรึกษาฟรี",
    keywords: "ความรู้สายพาน, PU vs PVC, วิธีเลือกสายพาน, HANPABELT, Hanpabelt.com, สายพานอุตสาหกรรม, ชลบุรี",
    h1Supplement: "ศูนย์ความรู้และคู่มือสายพานอุตสาหกรรม HANPABELT"
  }
};

/**
 * Mapping helper from page ID or catalog category to SEO key
 */
export function getSEOKey(pageId: string, categoryCode?: string): string {
  if (pageId === 'home') return 'home';
  if (pageId === 'services') return 'service';
  if (pageId === 'quote') return 'quote';
  if (pageId === 'about') return 'about';
  if (pageId === 'knowledge') return 'knowledge';
  if (pageId === 'catalog') {
    const cat = (categoryCode || '').toUpperCase();
    if (cat === 'PU') return 'pu-belt';
    if (cat === 'PVC') return 'pvc-belt';
    if (cat === 'TIM') return 'timing-belt';
    if (cat === 'VB') return 'v-belt';
    if (cat === 'CANVAS' || cat === 'FLAT') return 'flat-belt';
    if (cat === 'ROUND') return 'round-belt';
    if (cat === 'PULLEY') return 'timing-pulley';
    if (cat === 'CHUD') return 'apron-roller';
    if (cat === 'MODULAR') return 'modular-belt';
    if (cat === 'FELT') return 'felt-belt';
    if (cat === 'HEAT' || cat === 'TEFLON') return 'heat-resistant-belt';
    if (cat === 'FOOD') return 'food-grade-belt';
    if (cat === 'V_PULLEY') return 'v-belt-pulley';
    if (cat === 'FASTENER') return 'belt-fastener';
    return 'home';
  }
  return SEO_PAGES_DATA[pageId] ? pageId : 'home';
}

/**
 * Helper to update document meta tags dynamically
 */
export function applySEO(seoKey: string): void {
  const seo = SEO_PAGES_DATA[seoKey] || SEO_PAGES_DATA.home;

  // Title
  document.title = seo.title;

  // Helper to set or create meta tag
  const setMeta = (attrName: 'name' | 'property', attrVal: string, content: string) => {
    let elem = document.querySelector(`meta[${attrName}="${attrVal}"]`) as HTMLMetaElement | null;
    if (!elem) {
      elem = document.createElement('meta');
      elem.setAttribute(attrName, attrVal);
      document.head.appendChild(elem);
    }
    elem.setAttribute('content', content);
  };

  // Standard Meta Tags
  setMeta('name', 'description', seo.description);
  setMeta('name', 'keywords', seo.keywords);
  setMeta('name', 'author', 'HANPABELT (บริษัท หาญภา จำกัด)');
  setMeta('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

  // Open Graph
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', seo.url);
  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', 'HANPABELT');
  setMeta('property', 'og:image', HANPA_DEFAULT_IMAGE);
  setMeta('property', 'og:locale', 'th_TH');

  // Twitter Card
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', HANPA_DEFAULT_IMAGE);

  // Canonical Link
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', seo.url);

  // Update Dynamic JSON-LD for the current page
  injectDynamicSchema(seo);
}

/**
 * Injects or updates Schema.org JSON-LD scripts
 */
function injectDynamicSchema(seo: SEORecord): void {
  const SCRIPT_ID = 'hanpabelt-page-schema';
  let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${seo.url}#webpage`,
        "url": seo.url,
        "name": seo.title,
        "description": seo.description,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://www.hanpabelt.com/#website",
          "url": "https://www.hanpabelt.com",
          "name": "HANPABELT",
          "description": "จำหน่ายสายพานอุตสาหกรรม ตัดตามขนาด ส่งด่วน ชลบุรี ระยอง",
          "publisher": {
            "@type": "Organization",
            "name": "HANPABELT",
            "url": "https://www.hanpabelt.com",
            "logo": HANPA_LOGO_URL
          }
        },
        "inLanguage": "th-TH"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "หน้าแรก",
            "item": "https://www.hanpabelt.com/"
          },
          ...(seo.slug ? [{
            "@type": "ListItem",
            "position": 2,
            "name": seo.categoryName,
            "item": seo.url
          }] : [])
        ]
      }
    ]
  };

  script.textContent = JSON.stringify(schemaData, null, 2);
}
