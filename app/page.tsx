'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getWorks } from '@/lib/repositories/postRepository';
import { Post } from '@/lib/types/post';
import { useLanguage } from '@/lib/context/LanguageContext';

export default function Home() {
  const [featuredWorks, setFeaturedWorks] = useState<Post[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Lấy danh sách tác phẩm nổi bật đại diện cho các thời kỳ khác nhau
    const allWorks = getWorks();
    const selected = allWorks.filter(w => w.images.length > 0).slice(0, 3);
    setFeaturedWorks(selected);
  }, []);

  return (
    <div className="pb-24 bg-background-primary">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-background-secondary overflow-hidden border-b border-border-light">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 filter grayscale contrast-125"
          style={{ backgroundImage: `url('/duyen.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-transparent to-transparent" />
        
        <div className="relative text-center z-10 px-6 max-w-4xl space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-[10px] tracking-[0.3em] text-text-muted font-medium block uppercase"
          >
            {t("A Living Artistic Archive", "KHÔNG GIAN LƯU TRỮ NGHỆ THUẬT SỐNG")}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-5xl md:text-7xl font-light tracking-wide text-text-primary"
          >
            NGO THI THUY DUYEN
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="font-serif italic text-base md:text-lg text-text-secondary tracking-widest leading-relaxed max-w-2xl mx-auto"
          >
            {t('“Tracing what remains after time has passed through us.”', '“Lọc lại những gì còn sót lại sau khi thời gian trôi qua qua ta.”')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="pt-6"
          >
            <Link 
              href="/works" 
              className="border border-text-primary px-8 py-3 text-[10px] tracking-[0.25em] text-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-500 ease-in-out inline-block"
            >
              {t("ENTER THE ARCHIVE", "KHÁM PHÁ LƯU TRỮ")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-32 max-w-3xl mx-auto px-6 text-center space-y-6">
        <h2 className="font-serif text-2xl md:text-3xl text-text-secondary leading-relaxed font-light font-serif">
          {t("Art is not separate from life.", "Nghệ thuật không tách rời khỏi đời sống.")}
        </h2>
        <p className="text-xs text-text-muted max-w-xl mx-auto leading-relaxed tracking-wide font-sans">
          {t(
            "This digital archive is a space where artworks, memories, travel, language, notebooks, materials, observations, and transformation coexist. It represents a lifetime of artistic thinking and the process of becoming.",
            "Lưu trữ kỹ thuật số này là một không gian nơi các tác phẩm nghệ thuật, ký ức, chuyến đi, ngôn ngữ, sổ tay, chất liệu, quan sát và sự chuyển đổi cùng tồn tại. Nó đại diện cho hành trình tư duy nghệ thuật trọn đời và quá trình hình thành bản thân."
          )}
        </p>
        <div className="w-12 h-[1px] bg-border-medium mx-auto pt-4" />
      </section>

      {/* Featured Artwork Row */}
      {featuredWorks.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end border-b border-border-light pb-4 mb-12">
            <h3 className="font-serif text-xl tracking-wide text-text-primary font-light">
              {t("FEATURED FRAGMENTS", "TÁC PHẨM TIÊU BIỂU")}
            </h3>
            <Link href="/works" className="text-[10px] tracking-widest text-text-muted hover:text-text-primary transition-colors">
              {t("VIEW ALL WORKS →", "XEM TOÀN BỘ →")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work, idx) => {
              const lines = work.bodyText.split('\n').filter(l => l.trim() !== '');
              return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.2 }}
                  key={`${work.slug}-${idx}`} 
                  className="group block"
                >
                  <Link href={`/works/${work.slug}`}>
                    <div className="aspect-[4/5] bg-background-secondary border border-border-light overflow-hidden relative">
                      <div 
                        className="w-full h-full bg-cover bg-center filter grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                        style={{ backgroundImage: `url('${work.images[0]}')` }}
                      />
                    </div>
                    <div className="mt-4 space-y-1">
                      <span className="text-[9px] tracking-widest text-text-muted uppercase font-mono">{work.labels[0]}</span>
                      <h4 className="font-serif text-base text-text-primary group-hover:text-text-secondary transition-colors">
                        {lines[0] || "Untitled"}
                      </h4>
                      <p className="text-xs text-text-muted">{work.year}</p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
