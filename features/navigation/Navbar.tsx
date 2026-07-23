'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const isHomePage = pathname === '/';
  
  // Nav tabs matching PDF specifications
  const navItems = [
    { href: '/works', label: t('BODY OF WORK', 'BODY OF WORK') },
    { href: '/about', label: t('PRACTICE', 'PRACTICE') },
    { href: '/field-notes', label: t('FRAGMENTS', 'FRAGMENTS') },
    { href: '/cv', label: t('CV & CONTACT', 'CV & CONTACT') },
  ];

  // Secondary sub-links for full menu overlay
  const secondaryLinks = [
    { href: '/works', label: t('Body of Work (5 Chapters)', 'Body of Work (5 Chương)') },
    { href: '/about', label: t('Practice & Material Philosophy', 'Tiểu sử & Triết lý Vật liệu') },
    { href: '/field-notes', label: t('Fragments & Field Notes', 'Ghi chép & Lưu trữ') },
    { href: '/cv', label: t('Biography & Professional Timeline', 'Hành trình & CV Chi tiết') },
    { href: '/contact', label: t('Contact & Inquiries', 'Liên hệ & Trao đổi') },
  ];

  return (
    <header className="border-b-2 border-border-light py-6 lg:py-8 sticky top-0 bg-background-primary/95 backdrop-blur-md z-50 shadow-sm transition-all duration-300">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 flex justify-between items-center">
        
        {/* BRAND LOGO - Only visible on Inner Pages (Page 6 of PDF) */}
        {!isHomePage ? (
          <Link 
            href="/" 
            className="font-serif text-xl md:text-2xl lg:text-3xl tracking-[0.25em] font-medium text-text-primary hover-gold transition-colors whitespace-nowrap shrink-0 uppercase"
          >
            NGO THI THUY DUYEN
          </Link>
        ) : (
          <div className="w-1" />
        )}
        
        {/* DESKTOP NAV - Only visible on Inner Pages */}
        {!isHomePage && (
          <div className="hidden md:flex items-center gap-6 lg:gap-10">
            <nav className="flex items-center gap-4 lg:gap-8 font-serif">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{ marginLeft: '0.75rem', marginRight: '0.75rem' }}
                    className="relative inline-flex items-center justify-center px-4 py-2 text-base md:text-lg lg:text-xl tracking-[0.15em] font-medium text-text-secondary hover-gold transition-all whitespace-nowrap group"
                  >
                    <span className={`relative z-10 ${isActive ? 'text-text-primary font-bold' : ''}`}>
                      {item.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeTabNavbar"
                        className="absolute inset-0 border-b-2 border-text-primary bg-background-secondary/80 rounded-md"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        {/* TOP RIGHT CONTROLS */}
        <div className="flex items-center space-x-6 font-mono text-xs md:text-sm shrink-0">
          {/* On Homepage: Show 3-Bar Icon Drawer Toggle (Page 1 of PDF) */}
          {isHomePage && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-border-medium hover:border-text-primary text-text-primary rounded-md bg-background-secondary/60 hover:bg-background-secondary transition-all cursor-pointer"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}

          {/* LANGUAGE SWITCHER - Always visible (VI / EN) */}
          <div className="flex items-center space-x-2 border-l-2 border-border-light pl-4">
            <button 
              onClick={() => setLanguage('vi')} 
              className={`transition-all px-2 py-1 rounded cursor-pointer font-bold ${
                language === 'vi' 
                  ? 'text-text-primary bg-background-secondary border border-border-medium' 
                  : 'text-text-secondary hover-gold'
              }`}
            >
              VI
            </button>
            <span className="text-text-secondary font-bold">/</span>
            <button 
              onClick={() => setLanguage('en')} 
              className={`transition-all px-2 py-1 rounded cursor-pointer font-bold ${
                language === 'en' 
                  ? 'text-text-primary bg-background-secondary border border-border-medium' 
                  : 'text-text-secondary hover-gold'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>

      {/* FULL CURATORIAL INDEX OVERLAY MENU (For Homepage 3-Bar Trigger) */}
      <AnimatePresence>
        {isOpen && isHomePage && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="overflow-hidden bg-background-primary/98 border-b-2 border-border-light shadow-2xl z-40"
          >
            <div className="max-w-7xl mx-auto py-16 px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <span className="text-xs md:text-sm tracking-[0.35em] text-text-secondary font-mono uppercase block border-b-2 border-border-light pb-3 font-bold">
                  {t('CURATORIAL INDEX', 'MỤC LỤC LƯU TRỮ')}
                </span>
                <div className="space-y-4">
                  {secondaryLinks.map((item, idx) => (
                    <Link
                      key={`${item.href}-${idx}`}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block group space-y-1 py-2 border-b border-border-light/40 last:border-0"
                    >
                      <span className="font-serif text-2xl md:text-3xl text-text-primary group-hover:text-text-secondary transition-colors font-medium block">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-8 md:border-l-2 md:border-border-light md:pl-16 flex flex-col justify-between">
                <div className="space-y-6">
                  <span className="text-xs md:text-sm tracking-[0.35em] text-text-secondary font-mono uppercase block border-b-2 border-border-light pb-3 font-bold">
                    {t('LIVING ARTISTIC ARCHIVE', 'KHÔNG GIAN LƯU TRỮ SỐNG')}
                  </span>
                  <p className="font-serif italic text-xl md:text-2xl text-text-primary leading-relaxed font-normal">
                    {t(
                      "“Art is what remains after time has passed.” A museum-grade digital space for artworks, memories, materials, and transformation.",
                      "“Nghệ thuật là những gì còn lại khi thời gian trôi qua.” Không gian lưu trữ kỹ thuật số cấp bảo tàng lưu giữ tác phẩm, ký ức và chất liệu."
                    )}
                  </p>
                </div>

                <div className="pt-8 border-t-2 border-border-light space-y-2 font-mono text-xs md:text-sm text-text-secondary font-bold">
                  <p className="text-text-primary uppercase">NGO THI THUY DUYEN — VISUAL ARTIST</p>
                  <p>HO CHI MINH CITY, VIETNAM</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
