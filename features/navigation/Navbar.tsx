'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  
  // Clean, 4 core museum categories for optimal UX & zero visual clutter
  const navItems = [
    { href: '/works', label: t('WORKS', 'TÁC PHẨM') },
    { href: '/about', label: t('ABOUT & PHILOSOPHY', 'TRIẾT LÝ & TIỂU SỬ') },
    { href: '/field-notes', label: t('ARCHIVE & NOTES', 'GHI CHÉP & LƯU TRỮ') },
    { href: '/cv', label: t('CV & CONTACT', 'HÀNH TRÌNH & LIÊN HỆ') },
  ];

  // Secondary sub-links for full menu overlay
  const secondaryLinks = [
    { href: '/works', label: t('Body of Works (6 Chapters)', 'Tiến trình Tác phẩm (6 Chương)') },
    { href: '/about', label: t('Artist Bio & Material Philosophy', 'Tiểu sử & Triết lý Vật liệu') },
    { href: '/cv', label: t('Biography & Professional Timeline', 'Hành trình & CV Chi tiết') },
    { href: '/field-notes', label: t('Field Notes & Research', 'Ghi chép & Nghiên cứu') },
    { href: '/field-notes/material-philosophy', label: t('Material Philosophy Essay', 'Bài luận Triết lý Vật liệu') },
    { href: '/journal', label: t('Artistic Journal & Reflections', 'Nhật ký Sáng tác') },
    { href: '/publications', label: t('Publications & Catalogues', 'Ấn phẩm & Catalogue') },
    { href: '/contact', label: t('Contact & Inquiries', 'Liên hệ & Trao đổi') },
  ];

  return (
    <header className="border-b border-border-light py-5 sticky top-0 bg-background-primary/95 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        
        {/* LOGO */}
        <Link 
          href="/" 
          className="font-serif text-base lg:text-lg tracking-[0.2em] font-light text-text-primary hover:opacity-75 transition-opacity whitespace-nowrap shrink-0"
        >
          NGO THI THUY DUYEN
        </Link>
        
        {/* DESKTOP NAV - 4 Minimalist Core Categories with explicit spacing */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
          <nav className="flex items-center space-x-6 lg:space-x-8 text-[11px] lg:text-xs tracking-[0.2em] font-mono">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1 inline-block text-text-secondary hover:text-text-primary transition-colors whitespace-nowrap ${
                    isActive ? 'underline underline-offset-8 text-text-primary font-bold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* INDEX DRAWER TOGGLE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center space-x-1.5 border border-border-light hover:border-text-primary px-3 py-1 text-[10px] tracking-widest text-text-secondary hover:text-text-primary transition-all font-mono uppercase"
          >
            <span>{isOpen ? t('CLOSE', 'ĐÓNG') : t('INDEX', 'MỤC LỤC')}</span>
            {isOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
          
          {/* DESKTOP LANG SWITCHER */}
          <div className="flex items-center space-x-2 text-[10px] tracking-normal border-l border-border-light pl-5 font-mono shrink-0">
            <button 
              onClick={() => setLanguage('vi')} 
              className={`transition-colors px-1 py-0.5 ${language === 'vi' ? 'text-text-primary font-bold underline' : 'text-text-muted hover:text-text-primary'}`}
            >
              VI
            </button>
            <span className="text-text-muted">/</span>
            <button 
              onClick={() => setLanguage('en')} 
              className={`transition-colors px-1 py-0.5 ${language === 'en' ? 'text-text-primary font-bold underline' : 'text-text-muted hover:text-text-primary'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* MOBILE NAV TOGGLE */}
        <div className="flex items-center space-x-4 md:hidden">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono mr-2">
            <button 
              onClick={() => setLanguage('vi')} 
              className={language === 'vi' ? 'text-text-primary font-bold underline' : 'text-text-muted'}
            >
              VI
            </button>
            <span className="text-text-muted">/</span>
            <button 
              onClick={() => setLanguage('en')} 
              className={language === 'en' ? 'text-text-primary font-bold underline' : 'text-text-muted'}
            >
              EN
            </button>
          </div>
          
          <button 
            className="text-text-primary hover:opacity-75 transition-opacity border border-border-light p-1.5" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* FULL CURATORIAL INDEX OVERLAY MENU */}
      {isOpen && (
        <div className="bg-background-primary/98 border-b border-border-light py-12 px-6 lg:px-12 shadow-2xl z-40 transition-all duration-300">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <span className="text-[10px] tracking-[0.35em] text-text-muted font-mono uppercase block border-b border-border-light pb-2">
                {t('CURATORIAL INDEX', 'MỤC LỤC LƯU TRỮ')}
              </span>
              <div className="space-y-3">
                {secondaryLinks.map((item, idx) => (
                  <Link
                    key={`${item.href}-${idx}`}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block group space-y-0.5 py-1"
                  >
                    <span className="font-serif text-lg text-text-primary group-hover:text-text-secondary transition-colors font-light block">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 md:border-l md:border-border-light md:pl-12 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] tracking-[0.35em] text-text-muted font-mono uppercase block border-b border-border-light pb-2">
                  {t('LIVING ARTISTIC ARCHIVE', 'KHÔNG GIAN LƯU TRỮ SỐNG')}
                </span>
                <p className="font-serif italic text-sm text-text-secondary leading-relaxed font-light">
                  {t(
                    "“Tracing what remains after time has passed through us.” A museum-grade digital space for artworks, memories, materials, and transformation.",
                    "“Lọc lại những gì còn sót lại sau khi thời gian trôi qua qua ta.” Không gian lưu trữ kỹ thuật số cấp bảo tàng lưu giữ tác phẩm, ký ức và chất liệu."
                  )}
                </p>
              </div>

              <div className="pt-6 border-t border-border-light/60 space-y-2 font-mono text-xs text-text-muted">
                <p>NGO THI THUY DUYEN — VISUAL ARTIST</p>
                <p>HO CHI MINH CITY, VIETNAM</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
