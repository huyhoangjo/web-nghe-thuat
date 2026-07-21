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
  
  const navItems = [
    { href: '/about', label: t('BIO & PHILOSOPHY', 'TIỂU SỬ & TRIẾT LÝ') },
    { href: '/works', label: t('BODY OF WORKS', 'TIẾN TRÌNH TÁC PHẨM') },
    { href: '/cv', label: t('TIMELINE / CV', 'HÀNH TRÌNH / CV') },
    { href: '/field-notes', label: t('FIELD NOTES', 'GHI CHÉP') },
    { href: '/journal', label: t('JOURNAL', 'NHẬT KÝ') },
    { href: '/publications', label: t('PUBLICATIONS', 'ẤN PHẨM') },
    { href: '/contact', label: t('CONTACT', 'LIÊN HỆ') },
  ];

  return (
    <header className="border-b border-border-light py-6 sticky top-0 bg-background-primary/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="font-serif text-lg tracking-widest font-light text-text-primary hover:opacity-75 transition-opacity">
          NGO THI THUY DUYEN
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex space-x-6 lg:space-x-8 text-xs tracking-widest items-center">
            {navItems.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-text-secondary hover:text-text-primary transition-colors ${
                    isActive ? 'underline underline-offset-4 text-text-primary font-medium' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          {/* Desktop Lang Switcher */}
          <div className="flex items-center space-x-2 text-[10px] tracking-normal border-l border-border-light pl-4 ml-4 font-mono">
            <button 
              onClick={() => setLanguage('vi')} 
              className={`transition-colors ${language === 'vi' ? 'text-text-primary font-bold' : 'text-text-muted hover:text-text-primary'}`}
            >
              VI
            </button>
            <span className="text-text-muted">/</span>
            <button 
              onClick={() => setLanguage('en')} 
              className={`transition-colors ${language === 'en' ? 'text-text-primary font-bold' : 'text-text-muted hover:text-text-primary'}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Nav Button & Lang switcher combined */}
        <div className="flex items-center space-x-4 md:hidden">
          <div className="flex items-center space-x-1.5 text-[10px] font-mono mr-2">
            <button 
              onClick={() => setLanguage('vi')} 
              className={language === 'vi' ? 'text-text-primary font-bold' : 'text-text-muted'}
            >
              VI
            </button>
            <span className="text-text-muted">/</span>
            <button 
              onClick={() => setLanguage('en')} 
              className={language === 'en' ? 'text-text-primary font-bold' : 'text-text-muted'}
            >
              EN
            </button>
          </div>
          
          <button 
            className="text-text-primary hover:opacity-75 transition-opacity" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <nav className="md:hidden bg-background-primary border-b border-border-light py-4 px-6 flex flex-col space-y-4 text-xs tracking-widest z-40 relative">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-text-secondary hover:text-text-primary py-2 transition-colors ${
                  isActive ? 'text-text-primary font-medium' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
