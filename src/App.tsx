/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageId, ProductItem } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ServicesPage } from './pages/ServicesPage';
import { QuotePage } from './pages/QuotePage';
import { AboutPage } from './pages/AboutPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { applySEO, getSEOKey } from './data/seoData';
import { MessageCircle, Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [prefillBelt, setPrefillBelt] = useState<string>('');
  const [initialCategory, setInitialCategory] = useState<string>('ALL');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Synchronize with URL hash or pathname on mount and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
      const rawPath = window.location.pathname.replace(/^\//, '').toLowerCase();
      const route = rawHash || rawPath;

      if (route === 'pu-belt') {
        setCurrentPage('catalog');
        setInitialCategory('PU');
      } else if (route === 'pvc-belt') {
        setCurrentPage('catalog');
        setInitialCategory('PVC');
      } else if (route === 'timing-belt') {
        setCurrentPage('catalog');
        setInitialCategory('TIM');
      } else if (route === 'v-belt') {
        setCurrentPage('catalog');
        setInitialCategory('VB');
      } else if (route === 'flat-belt') {
        setCurrentPage('catalog');
        setInitialCategory('CANVAS');
      } else if (route === 'round-belt') {
        setCurrentPage('catalog');
        setInitialCategory('ROUND');
      } else if (route === 'timing-pulley' || route === 'v-belt-pulley') {
        setCurrentPage('catalog');
        setInitialCategory('PULLEY');
      } else if (route === 'apron-roller') {
        setCurrentPage('catalog');
        setInitialCategory('CHUD');
      } else if (route === 'modular-belt' || route === 'felt-belt' || route === 'heat-resistant-belt' || route === 'food-grade-belt' || route === 'belt-fastener') {
        setCurrentPage('catalog');
        setInitialCategory('ALL');
      } else if (route.startsWith('catalog')) {
        const parts = route.split('/');
        setCurrentPage('catalog');
        if (parts[1]) setInitialCategory(parts[1].toUpperCase());
      } else if (route === 'services' || route === 'service') {
        setCurrentPage('services');
      } else if (route.startsWith('quote')) {
        setCurrentPage('quote');
      } else if (route === 'about') {
        setCurrentPage('about');
      } else if (route === 'knowledge') {
        setCurrentPage('knowledge');
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic SEO meta tags whenever current page or active category changes
  useEffect(() => {
    let seoKey = 'home';
    const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
    
    // Check if the current hash directly maps to a specific category SEO
    if (rawHash && ['pu-belt', 'pvc-belt', 'timing-belt', 'v-belt', 'flat-belt', 'modular-belt', 'felt-belt', 'heat-resistant-belt', 'round-belt', 'food-grade-belt', 'timing-pulley', 'v-belt-pulley', 'apron-roller', 'belt-fastener', 'service'].includes(rawHash)) {
      seoKey = rawHash;
    } else if (currentPage === 'catalog') {
      seoKey = getSEOKey('catalog', initialCategory);
    } else {
      seoKey = getSEOKey(currentPage);
    }

    applySEO(seoKey);
  }, [currentPage, initialCategory]);

  // Monitor scroll for back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation handler
  const handleNavigate = (page: PageId, extraParam?: string) => {
    setCurrentPage(page);

    if (page === 'quote') {
      if (extraParam) setPrefillBelt(extraParam);
      window.location.hash = 'quote';
    } else if (page === 'catalog') {
      if (extraParam) {
        setInitialCategory(extraParam);
        window.location.hash = `catalog/${extraParam.toLowerCase()}`;
      } else {
        setInitialCategory('ALL');
        window.location.hash = 'catalog';
      }
    } else {
      window.location.hash = page === 'home' ? '' : page;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProductModal = (product: ProductItem) => {
    setSelectedProduct(product);
  };

  const handleCloseProductModal = () => {
    setSelectedProduct(null);
  };

  const handleRequestQuoteFromModal = (product: ProductItem) => {
    handleNavigate('quote', `${product.product_id} - ${product.model_name}`);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 selection:bg-sky-500 selection:text-white">
      {/* Top Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenProductModal={handleOpenProductModal}
          />
        )}

        {currentPage === 'catalog' && (
          <CatalogPage
            onNavigate={handleNavigate}
            onOpenProductModal={handleOpenProductModal}
            initialCategory={initialCategory}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'quote' && (
          <QuotePage onNavigate={handleNavigate} prefillBelt={prefillBelt} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentPage === 'knowledge' && (
          <KnowledgePage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={handleCloseProductModal}
        onRequestQuote={handleRequestQuoteFromModal}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Action Buttons: LINE Quick Action & Back to top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        <a
          href="https://line.me/ti/p/~Hanpabelt"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#06c755] hover:bg-[#05b34c] text-white text-xs font-semibold shadow-lg shadow-emerald-500/25 transition-transform hover:scale-105 active:scale-95"
          title="ติดต่อเจ้าหน้าที่ทาง LINE"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline font-mono-data">LINE: Hanpabelt</span>
        </a>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-11 h-11 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/90 shadow-md transition-all hover:scale-105 self-end"
            title="ขึ้นบนสุด"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
