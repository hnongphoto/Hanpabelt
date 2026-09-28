/**
 * Industrial Precision System - Data Types
 * Hanpa Industrial Belts (B2B Manufacturing Chon Buri)
 */

export type PageId = 'home' | 'catalog' | 'services' | 'quote' | 'about' | 'knowledge';

export type BeltCategoryCode = 
  | 'ALL'
  | 'PVC'
  | 'PU'
  | 'TIM'
  | 'CHUD'
  | 'WOOD'
  | 'ROUND'
  | 'RUBBER'
  | 'CANVAS'
  | 'VB'
  | 'RIB'
  | 'PULLEY';

export interface ProductItem {
  product_id: string;
  category: BeltCategoryCode | string;
  model_name: string;
  thickness: string;
  width?: string;
  color: string;
  material: string;
  temp?: string;
  usage: string;
  standard?: string;
  images: string[];
}

export interface QuoteFormData {
  name: string;
  phone: string;
  company: string;
  line: string;
  email: string;
  beltType: string;
  model: string;
  width: string;
  length: string;
  qty: string;
  machine: string;
  detail: string;
  images: Array<{
    name: string;
    type: string;
    base64: string;
  }>;
  pageUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleEn: string;
  tagline: string;
  description: string;
  features: string[];
  specs: string[];
  icon: string;
}
