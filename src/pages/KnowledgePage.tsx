import React, { useState, useMemo } from 'react';
import { PageId } from '../types';
import { 
  BookOpen, 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  ArrowRight, 
  SlidersHorizontal,
  Flame,
  Layers,
  Cpu,
  RotateCw,
  PhoneCall,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface KnowledgePageProps {
  onNavigate: (page: PageId, prefillBelt?: string) => void;
}

interface ArticleItem {
  id: string;
  category: 'selection' | 'pvc_pu' | 'timing' | 'power' | 'round';
  categoryLabel: string;
  question: string;
  summary: string;
  fullAnswer: {
    overview: string;
    keyPoints: Array<{
      title: string;
      desc: string;
    }>;
    comparisonTable?: {
      headers: string[];
      rows: Array<string[]>;
    };
    proTips: string;
    recommendedCategories?: Array<{
      label: string;
      categoryCode: string;
    }>;
  };
}

const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'how-to-choose',
    category: 'selection',
    categoryLabel: 'คู่มือการเลือกสายพาน',
    question: '1. วิธีเลือกสเปคสายพานลำเลียง (Conveyor Belt) ให้ถูกต้อง ไม่ขาดง่าย และคุ้มค่าที่สุด?',
    summary: 'การเลือกสายพานลำเลียงให้ตรงสเปคเครื่องจักร ต้องพิจารณา 4 ตัวแปรสำคัญ: ชนิดชิ้นงานที่ลำเลียง, อุณหภูมิและสภาพแวดล้อมหน้างาน, เส้นผ่านศูนย์กลางลูกกลิ้ง (Pulley), และรูปแบบการต่อสายพาน',
    fullAnswer: {
      overview: 'ความผิดพลาดส่วนใหญ่ที่ทำให้สายพานมีอายุการใช้งานสั้นหรือขาดก่อนเวลาอันควร เกิดจากการเลือกความหนาหรือประเภทผ้าใบที่ไม่สอดคล้องกับขนาดลูกกลิ้งมู่เล่ย์ (Pulley Diameter) หรือสภาพแวดล้อมที่มีคราบน้ำมันและสารเคมีโดยไม่ใช้สายพานเกรดเฉพาะทาง',
      keyPoints: [
        {
          title: '1. ชนิดชิ้นงานและพื้นผิวสัมผัส (Conveyed Products)',
          desc: 'หากลำเลียงกล่องกระดาษหรือพัสดุทั่วไป สามารถใช้สายพาน PVC ผิวเรียบหรือลายเพชร (Diamond) ได้ แต่หากลำเลียงชิ้นงานโลหะที่มีขอบคม ควรเลือก PVC หนา 3-5 mm เสริมผ้าใบ 3 ชั้น หรือสายพานยาง หากเป็นชิ้นงานลาดชัน ต้องเลือกลายบั้ง (Chevron) หรือติดบั้งกั้น (Cleats) เพื่อกันชิ้นงานลื่นไถล'
        },
        {
          title: '2. สภาพแวดล้อมและอุณหภูมิ (Environment & Temp)',
          desc: 'ตรวจสอบว่ามีสารเคมี น้ำมันพืช/น้ำมันเครื่อง หรือความชื้นสัมผัสตลอดเวลาหรือไม่ หากอุณหภูมิสูงเกิน 80°C ต้องใช้สายพานทนความร้อน (Heat-resistant PVC หรือ Teflon PTFE) หากสัมผัสอาหารโดยตรง ต้องผ่านเกรด FDA 21 CFR เท่านั้น'
        },
        {
          title: '3. ขนาดเส้นผ่านศูนย์กลางมู่เล่ย์ขั้นต่ำ (Min. Pulley Diameter)',
          desc: 'สายพานที่มีความหนามาก (เช่น 4-5 mm) จะต้องวิ่งบนลูกกลิ้งที่มีขนาดใหญ่เพียงพอ (เช่น Ø 100-150 mm ขึ้นไป) หากใช้ลูกกลิ้งเล็กเกินไป สายพานจะเกิดแรงเค้นงอซ้ำๆ ส่งผลให้ชั้นผ้าใบแยกตัวและข้อต่อหลุดล่อนอย่างรวดเร็ว'
        },
        {
          title: '4. ระบบการประคองแนวสายพาน (Tracking V-Guide)',
          desc: 'หากแนวสายพานมีปัญหาเดินส่ายหรือตกร่องบ่อย ควรเลือกติดคิ้วนำร่องใต้สายพาน (Tracking Guide ร่อง V เช่น K6, K10, K13, K17) ทั้งแบบบากฟันและแบบเรียบ เพื่อช่วยล็อกทิศทางให้สายพานวิ่งตรงศูนย์ตลอดเวลา'
        }
      ],
      comparisonTable: {
        headers: ['พารามิเตอร์', 'งานเบา (Light Duty)', 'งานปานกลาง (Medium Duty)', 'งานหนัก (Heavy Duty)'],
        rows: [
          ['ตัวอย่างชิ้นงาน', 'ชิ้นส่วนอิเล็กทรอนิกส์, ซองขนม, กล่องยา', 'กล่องลังพัสดุ, ผลิตภัณฑ์กระป๋อง, อะไหล่ยนต์', 'กระสอบดิน/ปุ๋ย, หินทราย, ลังบรรจุภัณฑ์หนัก'],
          ['ความหนาสายพาน', '1.0 - 2.0 mm (1-2 Ply)', '2.0 - 3.0 mm (2 Ply)', '4.0 - 5.0 mm ขึ้นไป (3 Ply)'],
          ['ลูกกลิ้งต่ำสุด (Roller Ø)', 'Ø 20 - 40 mm (Knife Edge ได้)', 'Ø 50 - 90 mm', 'Ø 100 - 160 mm ขึ้นไป'],
          ['โครงสร้างผิวสัมผัส', 'PVC/PU เรียบมันเงา หรือผิวด้าน', 'PVC ลายเพชร / Grip Top / Rough Top', 'PVC ผิวยางทนสึกหรอสูง / ลายบั้งก้างปลา']
        ]
      },
      proTips: 'คำแนะนำจากช่างหาญภา: ก่อนสั่งตัดสายพาน แนะนำให้วัด "ความกว้างจริงของโครง", "ระยะกึ่งกลางเพลาถึงเพลา (Center-to-Center)", และ "ระยะการปรับตึง (Take-up stroke)" เพื่อเผื่อระยะยืดตัวที่เหมาะสม 0.5% - 1% เสมอ',
      recommendedCategories: [
        { label: 'ดูสายพาน PVC ทั้งหมด', categoryCode: 'PVC' },
        { label: 'ดูสายพาน PU Food Grade', categoryCode: 'PU' }
      ]
    }
  },
  {
    id: 'pu-vs-pvc',
    category: 'pvc_pu',
    categoryLabel: 'PU vs PVC',
    question: '2. สายพาน PU vs สายพาน PVC ต่างกันอย่างไร และควรเลือกใช้แบบไหนให้เหมาะกับงาน?',
    summary: 'สายพาน PVC เน้นความคุ้มค่าราคาประหยัด ทนทานในอุตสาหกรรมทั่วไป ส่วนสายพาน PU ผลิตจากโพลียูรีเทน ทนน้ำมันสัตว์/ไขมันสูง ได้มาตรฐาน Food Grade (FDA) และรองรับลูกกลิ้งขนาดเล็กจิ๋ว (Knife Edge) ได้ดีเยี่ยม',
    fullAnswer: {
      overview: 'ทั้ง PVC และ PU เป็นสายพานสังเคราะห์ที่นิยมใช้มากที่สุดในสายการผลิต แต่มีความแตกต่างกันอย่างชัดเจนในแง่ของโครงสร้างโมเลกุล ความทนทานต่อสารเคมี มาตรฐานสุขอนามัย และต้นทุนการผลิต',
      keyPoints: [
        {
          title: 'สายพาน PVC (Polyvinyl Chloride) - เจ้าแห่งความคุ้มค่าในโรงงานทั่วไป',
          desc: 'มีความเหนียว ยืดหยุ่นดี มีลวดลายหน้าสัมผัสให้เลือกหลากหลายที่สุด (เรียบ, ลายเพชร, ลายตาราง, ผิวหยาบกันลื่น) ราคาต่อตารางเมตรประหยัดกว่า PU เหมาะอย่างยิ่งสำหรับลำเลียงกล่อง บรรจุภัณฑ์ อุปกรณ์อิเล็กทรอนิกส์ ชิ้นส่วนพลาสติก ยานยนต์ และคลังสินค้า Logistic แต่ข้อจำกัดคือไม่ทนต่อน้ำมันพืช/ไขมันสัตว์เข้มข้น และไม่แนะนำให้วิ่งบนลูกกลิ้งปลายแหลมขนาดเล็กมาก'
        },
        {
          title: 'สายพาน PU (Polyurethane) - ความปลอดภัยระดับสัมผัสอาหาร (Food Grade FDA)',
          desc: 'เนื้อวัสดุ PU ปราศจากสารพลาสติไซเซอร์ที่เป็นอันตราย ทนทานต่อน้ำมัน สารละลาย กรด-ด่างอ่อน และไขมันจากเนื้อสัตว์/เบเกอรี่ได้อย่างดีเยี่ยม ผิวหน้าไม่แตกลายงา ไม่เป็นขุย ไร้สารตกค้างตามมาตรฐาน FDA 21 CFR และ EU Food Directives นอกจากนี้ยังมีความยืดหยุ่นสูง สามารถวิ่งผ่านลูกกลิ้งปลายเข็ม (Knife-edge roller Ø 6-10 mm) ในจุดส่งต่อชิ้นงานเล็กๆ ได้อย่างไร้รอยสะดุด'
        }
      ],
      comparisonTable: {
        headers: ['เกณฑ์การเปรียบเทียบ', 'สายพาน PVC (Polyvinyl Chloride)', 'สายพาน PU (Polyurethane)'],
        rows: [
          ['มาตรฐานสัมผัสอาหาร (Food Grade)', 'บางรุ่นมี Non-food / หรือ Food เกรดธรรมดา', 'มาตรฐานสากล FDA 21 CFR & EU (ปลอดภัยสูงสุด)'],
          ['ความทนต่อน้ำมัน/ไขมันสัตว์', 'ปานกลาง (อาจแข็งกรอบเมื่อโดนไขมันสะสม)', 'ดีเยี่ยม ทนต่อไขมัน น้ำมันพืช และสารเคมี'],
          ['การวิ่งผ่านลูกกลิ้งเล็ก (Knife-edge)', 'ต้องการลูกกลิ้งอย่างน้อย Ø 40-50 mm', 'วิ่งผ่านลูกกลิ้งเล็ก Ø 6-15 mm ได้อย่างยอดเยี่ยม'],
          ['ความแข็งแรงต่อการตัด/ฉีกขาด', 'มาตรฐานอุตสาหกรรม', 'สูงมาก ทนทานต่อการขูดขีดและการเฉือน'],
          ['ช่วงอุณหภูมิใช้งาน', '-10°C ถึง +80°C', '-20°C ถึง +90°C (บางรุ่นพิเศษถึง 110°C)'],
          ['ระดับราคา', 'คุ้มค่า ประหยัดงบประมาณ', 'ราคาสูงกว่า PVC ประมาณ 1.5 - 2.5 เท่า']
        ]
      },
      proTips: 'คำแนะนำจากช่างหาญภา: หากไลน์ผลิตของคุณเป็นโรงงานเบเกอรี่ ขนมอบ เนื้อสัตว์แปรรูป หรืออาหารทะเลแช่แข็ง แนะนำให้เลือก PU ขาวหรือฟ้า Food Grade เท่านั้น เพื่อป้องกันปัญหาการตรวจสอบสุขอนามัย (GMP / HACCP)',
      recommendedCategories: [
        { label: 'ดูสายพาน PU มาตรฐาน FDA', categoryCode: 'PU' },
        { label: 'ดูสายพาน PVC อุตสาหกรรม', categoryCode: 'PVC' }
      ]
    }
  },
  {
    id: 'timing-belts',
    category: 'timing',
    categoryLabel: 'สายพานไทม์มิ่ง (Timing Belt)',
    question: '3. สายพานไทม์มิ่ง (Timing Belt) คืออะไร มีรูปแบบฟันกี่แบบ และทำไมถึงห้ามเกิดการลื่นไถล?',
    summary: 'สายพานไทม์มิ่งส่งกำลังด้วยระบบขบฟัน (Positive / Synchronous Drive) 1:1 ปราศจากการสลิป มีฟันทรงสี่เหลี่ยมคางหมู (T, AT) และฟันโค้งมน (HTD, STD, RPP) เสริมแกนลวดเหล็กหรือใยแก้วเพื่อความเที่ยงตรงสูงในระบบ Automation',
    fullAnswer: {
      overview: 'ต่างจากสายพานแบนหรือสายพานร่องวีที่อาศัยแรงเสียดทาน สายพานไทม์มิ่งถูกออกแบบมาเพื่อให้การหมุนของเพลาขับและเพลาตามมีความสัมพันธ์ของตำแหน่ง (Phase Synchronization) และความเร็วรอบคงที่ 100% จึงนิยมใช้ในเครื่องจักร CNC, แขนกลโรบอท, เครื่องบรรจุหีบห่อ และระบบขับเคลื่อนสายพานอัตโนมัติ',
      keyPoints: [
        {
          title: 'รูปแบบฟัน (Tooth Profiles) ยอดนิยมในไทย:',
          desc: '1. ฟันสี่เหลี่ยมคางหมูระบบเมตริก (T-Series: T5, T10, T20) - องศาฟัน 40° เหมาะกับงานส่งกำลังทั่วไป\n2. ฟันสี่เหลี่ยมคางหมูทนแรงบิดสูง (AT-Series: AT5, AT10, AT20) - องศาฟัน 50° เพิ่มพื้นที่หน้าตัดโคนฟัน รับแรงดึงและแรงกระชากได้สูงกว่ารุ่น T ถึง 30%\n3. ฟันโค้งมนทรงกลม (HTD Series: 3M, 5M, 8M, 14M) - กระจายแรงเค้นสม่ำเสมอ ลดเสียงดัง วิ่งได้นุ่มนวลที่รอบความเร็วสูง\n4. ระบบนิ้วดั้งเดิม (Imperial: MXL, XL, L, H, XH, XXH) - ยังคงพบได้ในเครื่องจักรนำเข้าจากสหรัฐฯ และไต้หวัน'
        },
        {
          title: 'วัสดุและแกนรับแรงดึง (Tension Member):',
          desc: '• สายพานไทม์มิ่งยาง (Rubber Chloroprene): เสริมด้วยใยแก้ว (Fiberglass Cord) ทนความร้อน ทนแรงเสียดทานเสียงเงียบ\n• สายพานไทม์มิ่งโพลียูรีเทน (PU Timing): เสริมด้วยลวดสลิงเหล็กกล้า (Steel Cord) หรือเคฟลาร์ (Kevlar) ไม่ยืดตัว ทนต่อน้ำมัน ทนการขัดสี เหมาะกับห้องคลีนรูมและงานตำแหน่งพิกัดแม่นยำ'
        },
        {
          title: 'รูปแบบการใช้งานพิเศษ:',
          desc: 'สามารถสั่งต่อเป็นวงกลมไร้รอยต่อ (Endless / Jointed), แบบเปิดหัวม้วนยาว (Open-ended Belt), หรือติดยางแดง Linatex / ฟองน้ำ / Profile กั้นชิ้นงานบนหลังสายพานได้ตามแบบสั่งทำ'
        }
      ],
      comparisonTable: {
        headers: ['รหัสซีรีส์ฟัน', 'ระยะพิตช์ (Pitch P)', 'ลักษณะฟัน', 'การใช้งานที่เหมาะสม'],
        rows: [
          ['T5 / T10', '5.0 mm / 10.0 mm', 'สี่เหลี่ยมคางหมูมาตรฐาน', 'เครื่องจักรอัตโนมัติทั่วไป, เครื่องพิมพ์, สายพานลำเลียงชิ้นส่วนเบา'],
          ['AT5 / AT10', '5.0 mm / 10.0 mm', 'สี่เหลี่ยมคางหมูฐานหนาพิเศษ', 'งานขับเคลื่อนแกนเซอร์โวมอเตอร์ (Linear Positioning), หุ่นยนต์ Pick & Place'],
          ['HTD 5M / 8M', '5.0 mm / 8.0 mm', 'ฟันโค้งมนกลม (Curvilinear)', 'ระบบขับเคลื่อนรอบสูง, มอเตอร์ส่งกำลังเครื่องจักรกลหนัก, เสียงเงียบ'],
          ['XL / L / H', '5.08 / 9.525 / 12.7 mm', 'สี่เหลี่ยมคางหมูระบบนิ้ว', 'เครื่องจักรกลโรงงานนำเข้า, ปั๊มลม, เครื่องทอผ้า, สายพานลำเลียงดั้งเดิม']
        ]
      },
      proTips: 'คำแนะนำจากช่างหาญภา: ในการสั่งทำพูลเลย์ (Timing Pulley) ควรจับคู่ระยะพิตช์ (Pitch) และรูปทรงฟันให้ตรงกัน 100% เสมอ เช่น สายพาน AT10 ต้องใส่กับ Pulley AT10 เท่านั้น ห้ามนำไปใส่กับร่อง T10 เพราะจะทำให้ยอดฟันปีนร่องและขาดในเวลาอันรวดเร็ว ทางหาญภามีบริการกลึง Pulley ตรงรุ่นพร้อมทำลิ่ม/รูเพลาตามแบบ',
      recommendedCategories: [
        { label: 'ดูสายพาน Timing Belt', categoryCode: 'TIM' },
        { label: 'บริการสั่งทำ Pulley ตามแบบ', categoryCode: 'PULLEY' }
      ]
    }
  },
  {
    id: 'power-transmission',
    category: 'power',
    categoryLabel: 'สายพานส่งกำลัง & สายพานร่องวี',
    question: '4. สายพานส่งกำลัง (Power Transmission) เช่น V-Belt และสายพานแบนฉุด เลือกใช้อย่างไร และตั้งตึงอย่างไรไม่ให้สลิป?',
    summary: 'สายพานส่งกำลังอาศัยแรงเสียดทานในการถ่ายทอดแรงม้าและแรงบิดจากมอเตอร์ แบ่งเป็น V-Belt (ร่องวีมาตรฐานและร่องฟันหยัก) และสายพานแบนรอบสูง การตั้งความตึงที่ถูกต้องจะป้องกันอาการสายพานลื่นไถล ร้อนจัด และเสียงดังเอี๊ยด',
    fullAnswer: {
      overview: 'สายพานส่งกำลังเปรียบเสมือนหัวใจของระบบขับเคลื่อนในปั๊มน้ำ, พัดลมโบลเวอร์, เครื่องอัดอากาศ (Compressor), และเครื่องบดสับ หากเลือกสเปคไม่เหมาะหรือปล่อยให้หย่อนยาน กำลังการผลิตจะลดฮวบและสูญเสียพลังงานไฟฟ้าโดยเปล่าประโยชน์',
      keyPoints: [
        {
          title: '1. สายพานร่องวีมาตรฐาน (Classical V-Belt: A, B, C, D):',
          desc: 'อาศัยหลักการลิ่ม (Wedge Principle) หน้าสัมผัสด้านข้างของสายพานจะขบเข้ากับร่องมุมเอียงของมู่เล่ย์ ทำให้เกิดแรงยึดเกาะสูงกว่าสายพานแบนธรรมดาหลายเท่า นิยมใช้ในเครื่องจักรอุตสาหกรรมทั่วไป ราคาประหยัดและหาง่าย'
        },
        {
          title: '2. สายพานร่องวีหน้าแคบแรงดึงสูง (Narrow Wedge Belt: SPZ, SPA, SPB, SPC):',
          desc: 'มีโครงสร้างหน้าตัดลึกกว่ารุ่นมาตรฐาน สามารถรับแรงม้า (Horsepower) ได้สูงกว่าเดิมถึง 1.5 - 2 เท่า จึงช่วยลดจำนวนร่องสายพานและลดความกว้างของมู่เล่ย์ ทำให้โครงสร้างเครื่องกะทัดรัดลง'
        },
        {
          title: '3. สายพานร่องฟันหยัก (Raw Edge Cogged: AX, BX, CX, XPB):',
          desc: 'มีรอยบากฟันด้านในเพื่อเพิ่มความยืดหยุ่น ทำให้โค้งงอผ่านมู่เล่ย์ขนาดเล็กได้ดี ระบายความร้อนสะสมยอดเยี่ยม วิ่งได้เร็วกว่า และไม่เกิดรอยแตกลายงา'
        },
        {
          title: '4. สายพานแบนส่งกำลังรอบสูง (High-Speed Flat Belt / สายพานเขียว-เหลือง):',
          desc: 'แกนกลางเป็น Polyamide / Polyester ไร้รอยต่อ รับรอบความเร็วสูงมาก (เกิน 10,000 RPM) โดยไม่สะบัด ประสิทธิภาพการถ่ายทอดพลังงานสูงถึง 98% นิยมใช้ในโรงปั่นด้าย, เครื่องขัดไม้, และเครื่องเป่าขวดพลาสติก'
        }
      ],
      comparisonTable: {
        headers: ['อาการผิดปกติ', 'สาเหตุที่เป็นไปได้', 'แนวทางแก้ไขอย่างถูกต้อง'],
        rows: [
          ['มีเสียงดังเอี๊ยดเมื่อสตาร์ทเครื่อง', 'สายพานหย่อนเกินไป หรือมีคราบน้ำมันเกาะร่องมู่เล่ย์', 'ปรับตั้งสกรูขยับแท่นมอเตอร์เพื่อเพิ่มระยะตึง และเช็ดล้างร่อง Pulley ให้แห้ง'],
          ['สายพานร้อนจัดจนมีกลิ่นไหม้', 'การลื่นไถลสะสม (Belt Slip) หรือโหลดมอเตอร์เกินพิกัด', 'ตรวจสอบโหลดเครื่องจักรและวัดความตึงด้วยเกจวัดความตึงสายพาน'],
          ['สายพานเส้นข้างขาดบ่อยกว่าเส้นอื่น', 'ร่องมู่เล่ย์เอียงเยื้องกัน (Pulley Misalignment)', 'ใช้เลเซอร์หรือไม้บรรทัดเหล็กตั้งแนวระนาบเพลาและมู่เล่ย์ให้ตรงกัน 100%'],
          ['ด้านข้างสายพานสึกหรอเป็นร่องลึก', 'ร่องมู่เล่ย์สึกเป็นรูปขั้นบันได (Worn Pulley Sheave)', 'เปลี่ยนมู่เล่ย์ใหม่ อย่าใช้มู่เล่ย์เดิมเพราะจะทำให้สายพานใหม่พังในไม่กี่วัน']
        ]
      },
      proTips: 'คำแนะนำจากช่างหาญภา: ในกรณีที่ใช้สายพานร่องวีหลายเส้นพร้อมกัน (Multiple V-Belt Drive) ควรเปลี่ยนยกชุดพร้อมกันทั้งหมด และเลือกรุ่น "Matched Set" ที่มีความยาวเท่ากันทุกเส้น เพื่อป้องกันไม่ให้เส้นใดเส้นหนึ่งรับน้ำหนักเกินจนขาดก่อนเพื่อน',
      recommendedCategories: [
        { label: 'ดูสายพานร่องวี V-Belt', categoryCode: 'VB' },
        { label: 'ดูสายพานฉุดส่งกำลัง', categoryCode: 'CHUD' }
      ]
    }
  },
  {
    id: 'round-belts',
    category: 'round',
    categoryLabel: 'สายพานกลม (Round Belt)',
    question: '5. สายพานกลม (Polyurethane Round Belt) นิยมใช้กับงานประเภทไหน และมีวิธีต่อหัวอย่างไร?',
    summary: 'สายพานกลมทำจากโพลียูรีเทนคุณภาพสูง ยืดหยุ่นดี ทนการสึกหรอ วิ่งบิดเลี้ยวเปลี่ยนระนาบได้อิสระ นิยมใช้ในระบบลูกกลิ้งส่งผ่าน (Line-shaft) งานกระเบื้อง และระบบคัดแยกพัสดุ สามารถต่อหัวด้วยความร้อนได้ง่ายใน 5 นาที',
    fullAnswer: {
      overview: 'สายพานกลม (Round Belt หรือ O-Ring Drive Belt) เป็นหนึ่งในสายพานที่ยืดหยุ่นและใช้งานง่ายที่สุดในระบบลำเลียงชิ้นงานน้ำหนักเบาถึงปานกลาง โดยเฉพาะในจุดที่ต้องลำเลียงข้ามแนวโค้ง หรือส่งกำลังจากเพลาหลักไปยังลูกกลิ้งหลายๆ ตัวพร้อมกัน',
      keyPoints: [
        {
          title: 'ชนิดของสายพานกลมตามลักษณะผิว:',
          desc: '1. ผิวเรียบมันเงา (Smooth Surface - สีส้ม / สีเขียวใส / สีแดง): มีค่าสัมประสิทธิ์แรงเสียดทานสูง ยึดเกาะร่องลูกกลิ้งแน่นหนา เหมาะกับงานขับเคลื่อนทั่วไป ความแข็ง 85 - 90 Shore A\n2. ผิวหยาบผิวด้าน (Rough / Frosted Surface - สีเขียวด้าน): ลดแรงเสียดทานและลดการสะสมไฟฟ้าสถิต เหมาะสำหรับงานที่ต้องยอมให้มีสลิปบางจังหวะ (Accumulation) เช่น จุดรอคิวชิ้นงานกล่อง หรือกระเบื้องเซรามิก'
        },
        {
          title: 'โครงสร้างแบบตัน (Solid) vs แบบมีรูแกนกลาง (Hollow):',
          desc: '• แบบเนื้อตัน (Solid): รับแรงดึงได้สูงสุด ต่อหัวด้วยการหลอมละลายความร้อน (Hot Welding)\n• แบบมีรูแกนกลาง (Hollow): เหมาะสำหรับไลน์ผลิตที่รื้อถอนยาก สามารถสอดข้อต่อโลหะทองเหลือง/สแตนเลส (Connector Barb) เข้าหัวท้ายแล้วเสียบใช้งานได้ทันทีโดยไม่ต้องใช้ความร้อน'
        },
        {
          title: 'ขั้นตอนการต่อหัวสายพานกลมด้วยความร้อน (Thermal Splicing):',
          desc: '1. ตัดปลายสายพานทั้งสองด้านให้ตั้งฉาก 90 องศาตรงเป๊ะด้วยกรรไกรคม\n2. วางปลายสายพานลงในแคลมป์จับประคอง (Welding Guide Clamp)\n3. ใช้ใบมีดความร้อน (Hot Knife / แร้งต่อสายพาน) ที่อุณหภูมิประมาณ 240-260°C สอดเข้าตรงกลางประกบปลายทั้งสองด้านจนเนื้อ PU เริ่มละลายเป็นขอบนูนเล็กๆ\n4. ดึงใบมีดออกอย่างรวดเร็วแล้วกดปลายทั้งสองข้างเข้าหากันแน่นหนา ยึดค้างไว้ 1-2 นาทีจนเย็นตัวสนิท\n5. ใช้คีมหรือคัตเตอร์ตัดแต่งครีบส่วนเกินรอบรอยต่อให้กลมเนียนเสมอกับเนื้อสายพานเดิม'
        }
      ],
      comparisonTable: {
        headers: ['ขนาดเส้นผ่านศูนย์กลาง (Ø)', 'ความแข็ง (Hardness)', 'รัศมีมู่เล่ย์ต่ำสุด (Min Pulley Ø)', 'อุตสาหกรรมที่ใช้งานบ่อย'],
        rows: [
          ['Ø 2 - 4 mm', '85 - 90 Shore A', 'Ø 20 - 35 mm', 'เครื่องพิมพ์, อุปกรณ์อิเล็กทรอนิกส์, เครื่องนับธนบัตร'],
          ['Ø 5 - 8 mm', '85 - 90 Shore A', 'Ø 45 - 75 mm', 'สายพานลำเลียงกล่องพัสดุ (Roller Conveyor), บรรจุภัณฑ์'],
          ['Ø 10 - 15 mm', '90 Shore A', 'Ø 90 - 140 mm', 'โรงงานผลิตกระเบื้อง, อุตสาหกรรมแก้ว, ลำเลียงชิ้นส่วนยานยนต์'],
          ['รุ่นเสริมใยแกนกลาง (Reinforced)', '92 Shore A (ใยโพลีเอสเตอร์)', 'Ø 100 mm ขึ้นไป', 'สายพานระยะไกล ป้องกันการยืดตัวถาวรเมื่อรับน้ำหนักต่อเนื่อง']
        ]
      },
      proTips: 'คำแนะนำจากช่างหาญภา: ในการตัดความยาวสายพานกลมเพื่อติดตั้ง ต้องเผื่อ "ระยะยืดตัวเพื่อสร้างแรงดึง (Pre-tension)" ประมาณ 5% ถึง 8% ของความยาวรอบวงจริงเสมอ เช่น ระยะวัดจริง 100 cm ให้ตัดสายพานยาว 92-95 cm เพื่อให้สายพานมีแรงตึงพอดี ไม่หย่อนหลุดร่องลูกกลิ้ง',
      recommendedCategories: [
        { label: 'ดูสายพานกลม Polyurethane', categoryCode: 'ROUND' },
        { label: 'ขอคำปรึกษาขนาดสายพานกลม', categoryCode: 'quote' }
      ]
    }
  }
];

export const KnowledgePage: React.FC<KnowledgePageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({
    'how-to-choose': true,
    'pu-vs-pvc': true
  });

  const categories = [
    { id: 'ALL', label: 'ทั้งหมด (5 หัวข้อ)' },
    { id: 'selection', label: 'วิธีเลือกสายพาน' },
    { id: 'pvc_pu', label: 'PU vs PVC' },
    { id: 'timing', label: 'สายพาน Timing' },
    { id: 'power', label: 'สายพานส่งกำลัง' },
    { id: 'round', label: 'สายพานกลม' },
  ];

  const filteredArticles = useMemo(() => {
    return ARTICLES_DATA.filter((article) => {
      const matchCategory = selectedCategory === 'ALL' || article.category === selectedCategory;
      if (!matchCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      const matchQuestion = article.question.toLowerCase().includes(q);
      const matchSummary = article.summary.toLowerCase().includes(q);
      const matchOverview = article.fullAnswer.overview.toLowerCase().includes(q);
      const matchPoints = article.fullAnswer.keyPoints.some(
        kp => kp.title.toLowerCase().includes(q) || kp.desc.toLowerCase().includes(q)
      );

      return matchQuestion || matchSummary || matchOverview || matchPoints;
    });
  }, [selectedCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedArticles(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    ARTICLES_DATA.forEach(a => { allExpanded[a.id] = true; });
    setExpandedArticles(allExpanded);
  };

  const collapseAll = () => {
    setExpandedArticles({});
  };

  return (
    <div className="py-12 bg-slate-50/70 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Hero Section */}
        <div className="border-b border-slate-200/90 pb-8 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono-data text-sky-800 font-semibold tracking-wide uppercase">
            <span>HANPA INDUSTRIAL BELTS</span>
            <span>·</span>
            <span>TECHNICAL KNOWLEDGE BASE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            คลังความรู้ &amp; ถาม-ตอบเรื่องสายพานอุตสาหกรรม
            <span className="sr-only"> HANPABELT ชลบุรี ระยอง</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-3xl font-light leading-relaxed">
            รวมคำถามยอดนิยมและคู่มือทางเทคนิคจากประสบการณ์หน้างานของทีมช่างหาญภา ชลบุรี ช่วยให้วิศวกรโรงงานและจัดซื้อเลือกใช้ ตัดต่อ และบำรุงรักษาสายพานได้ตรงสเปค คุ้มค่า และยืดอายุการใช้งานเครื่องจักร
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-sky-600 text-white font-semibold shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Expand / Collapse Controls */}
            <div className="flex items-center gap-2 text-xs text-slate-500 self-end md:self-auto shrink-0">
              <button
                onClick={expandAll}
                className="hover:text-sky-600 font-medium transition-colors"
              >
                ขยายทั้งหมด
              </button>
              <span>·</span>
              <button
                onClick={collapseAll}
                className="hover:text-sky-600 font-medium transition-colors"
              >
                ยุบทั้งหมด
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ค้นหาคำถาม สเปค หรือเนื้อหา เช่น FDA, Timing, V-Belt, ลูกกลิ้ง, สลิป, สายพานกลม..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all text-slate-900"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-medium"
              >
                ล้าง
              </button>
            )}
          </div>
        </div>

        {/* Articles List (Q&A Accordion Style) */}
        <div className="space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <AlertTriangle className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-base font-bold text-slate-900">ไม่พบบทความที่ตรงกับคำค้นหา</h3>
              <p className="text-xs text-slate-500">
                ลองค้นหาด้วยคำอื่น หรือกดเลือกแท็บ &ldquo;ทั้งหมด&rdquo; เพื่อดูหัวข้อคำถามทั้งหมด
              </p>
              <button
                onClick={() => { setSelectedCategory('ALL'); setSearchQuery(''); }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-all"
              >
                แสดงบทความทั้งหมด
              </button>
            </div>
          ) : (
            filteredArticles.map((article) => {
              const isExpanded = !!expandedArticles[article.id];

              return (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200"
                >
                  {/* Question Header (Always Visible & Clickable) */}
                  <div
                    onClick={() => toggleExpand(article.id)}
                    className="p-6 sm:p-7 cursor-pointer hover:bg-slate-50/50 transition-colors flex items-start justify-between gap-4 select-none"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-xs font-mono-data font-semibold text-sky-700">
                        <span>{article.categoryLabel}</span>
                        <span>·</span>
                        <span className="text-slate-400 font-normal">ENGINEERING FAQ</span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {article.question}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-900 transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Body */}
                  {isExpanded && (
                    <div className="px-6 sm:px-8 pb-8 pt-2 border-t border-slate-100 space-y-6 animate-fadeIn">
                      
                      {/* Overview Paragraph */}
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light bg-sky-50/40 p-4 rounded-2xl border border-sky-100">
                        {article.fullAnswer.overview}
                      </p>

                      {/* Key Points */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-mono-data font-bold text-slate-900 uppercase tracking-wider">
                          สาระสำคัญและหลักการวิศวกรรม:
                        </h4>
                        <div className="grid grid-cols-1 gap-3.5">
                          {article.fullAnswer.keyPoints.map((kp, idx) => (
                            <div 
                              key={idx} 
                              className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-1.5"
                            >
                              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-slate-900">
                                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                                <span>{kp.title}</span>
                              </div>
                              <p className="text-xs text-slate-600 font-light leading-relaxed pl-6 whitespace-pre-line">
                                {kp.desc}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technical Comparison Table */}
                      {article.fullAnswer.comparisonTable && (
                        <div className="space-y-3">
                          <h4 className="text-xs font-mono-data font-bold text-slate-900 uppercase tracking-wider">
                            ตารางข้อมูลเปรียบเทียบสเปคทางเทคนิค:
                          </h4>
                          <div className="overflow-x-auto rounded-2xl border border-slate-200">
                            <table className="w-full text-left text-xs border-collapse">
                              <thead>
                                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                  {article.fullAnswer.comparisonTable.headers.map((h, i) => (
                                    <th key={i} className="p-3 whitespace-nowrap">
                                      {h}
                                    </th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-100 bg-white">
                                {article.fullAnswer.comparisonTable.rows.map((row, rIdx) => (
                                  <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-slate-50/60' : ''}>
                                    {row.map((cell, cIdx) => (
                                      <td 
                                        key={cIdx} 
                                        className={`p-3 text-slate-700 font-light leading-relaxed ${
                                          cIdx === 0 ? 'font-semibold text-slate-900 whitespace-nowrap' : ''
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* Pro Tips Box */}
                      <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
                        <Wrench className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="text-xs text-amber-900 space-y-1">
                          <span className="font-bold block">คำแนะนำเชิงเทคนิคจากช่างหาญภา:</span>
                          <p className="font-light leading-relaxed text-amber-800">
                            {article.fullAnswer.proTips}
                          </p>
                        </div>
                      </div>

                      {/* Related Links & Actions */}
                      {article.fullAnswer.recommendedCategories && (
                        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-slate-500 font-light">สินค้าที่เกี่ยวข้อง:</span>
                            {article.fullAnswer.recommendedCategories.map((rc, rIdx) => (
                              <button
                                key={rIdx}
                                onClick={() => {
                                  if (rc.categoryCode === 'quote') {
                                    onNavigate('quote');
                                  } else {
                                    onNavigate('catalog', rc.categoryCode);
                                  }
                                }}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 font-medium transition-colors"
                              >
                                <span>{rc.label}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => onNavigate('quote', article.question)}
                            className="text-sky-600 hover:text-sky-700 font-semibold inline-flex items-center gap-1 transition-colors"
                          >
                            <span>ปรึกษาสเปคหรือขอราคา</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      )}

                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>

        {/* Bottom Consultation CTA */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono-data text-[10px] font-semibold border border-sky-500/30">
              CUSTOM TECHNICAL CONSULTATION
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              มีข้อสงสัยหรือต้องการให้ช่างประเมินสเปคสายพาน?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light max-w-xl">
              ส่งรูปถ่ายสายพานเดิม หรือสเปคขนาด กว้าง x ยาว x หนา ให้วิศวกรหาญภาช่วยตรวจสอบ ประเมินราคาโรงงาน และออกใบเสนอราคาอย่างรวดเร็ว
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <a
              href="https://line.me"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-xl bg-[#06c755] hover:bg-[#05b34c] text-white font-semibold text-xs text-center shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>สอบถามผ่าน LINE ทันที</span>
            </a>
            <button
              onClick={() => onNavigate('quote')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white font-semibold text-xs text-center shadow-md transition-all active:scale-95"
            >
              ขอใบเสนอราคาออนไลน์
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
