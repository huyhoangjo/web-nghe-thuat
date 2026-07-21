'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getWorks } from '@/lib/repositories/postRepository';
import { Post } from '@/lib/types/post';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';

export default function Home() {
  const [featuredWorks, setFeaturedWorks] = useState<Post[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Select representative featured works with images
    const allWorks = getWorks();
    const selected = allWorks.filter(w => w.images.length > 0).slice(0, 3);
    setFeaturedWorks(selected);
  }, []);

  return (
    <div className="pb-24 bg-background-primary">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-background-secondary overflow-hidden border-b border-border-light">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25 filter grayscale contrast-125 transition-all duration-1000 scale-105"
          style={{ backgroundImage: `url('/images/home-hero.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/40 to-transparent" />
        
        <div className="relative text-center z-10 px-6 max-w-4xl space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-[10px] tracking-[0.35em] text-text-muted font-medium block uppercase font-mono"
          >
            {t("A Living Artistic Archive", "KHÔNG GIAN LƯU TRỮ NGHỆ THUẬT SỐNG")}
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wider text-text-primary"
          >
            NGO THI THUY DUYEN
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="font-serif italic text-base md:text-xl text-text-secondary tracking-widest leading-relaxed max-w-2xl mx-auto font-light"
          >
            {t('“Tracing what remains after time has passed through us.”', '“Lọc lại những gì còn sót lại sau khi thời gian trôi qua qua ta.”')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="pt-8"
          >
            <Link 
              href="/works" 
              className="border border-text-primary/70 hover:border-text-primary px-9 py-3.5 text-[10px] tracking-[0.3em] text-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-500 ease-in-out inline-block font-mono"
            >
              {t("ENTER THE ARCHIVE", "KHÁM PHÁ LƯU TRỮ")}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-32 max-w-3xl mx-auto px-6 text-center space-y-8">
        <h2 className="font-serif text-2xl md:text-4xl text-text-secondary leading-relaxed font-light">
          {t("Art is not separate from life.", "Nghệ thuật không tách rời khỏi đời sống.")}
        </h2>
        <p className="text-xs md:text-sm text-text-muted max-w-xl mx-auto leading-relaxed tracking-wide font-sans font-light">
          {t(
            "This digital archive is a space where artworks, memories, travel, language, notebooks, materials, observations, and transformation coexist. As you explore, each piece you discover reveals its colors and remains preserved in memory.",
            "Lưu trữ kỹ thuật số này là một không gian nơi các tác phẩm nghệ thuật, ký ức, chuyến đi, ngôn ngữ, sổ tay, chất liệu, quan sát và sự chuyển đổi cùng tồn tại. Khi bạn khám phá, từng tác phẩm bạn xem sẽ dần hiện lại sắc màu và lưu giữ trong ký ức."
          )}
        </p>
        <div className="w-16 h-[1px] bg-border-medium/60 mx-auto pt-4" />
      </section>

      {/* Featured Artwork Row */}
      {featuredWorks.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end border-b border-border-light pb-4 mb-12">
            <h3 className="font-serif text-xl tracking-wide text-text-primary font-light uppercase">
              {t("FEATURED FRAGMENTS", "TÁC PHẨM TIÊU BIỂU")}
            </h3>
            <Link href="/works" className="text-[10px] tracking-widest text-text-muted hover:text-text-primary transition-colors font-mono uppercase">
              {t("VIEW ALL WORKS →", "XEM TOÀN BỘ →")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
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
                    <div className="border border-border-light overflow-hidden bg-background-secondary shadow-sm">
                      <ArchiveImage
                        src={work.images[0]}
                        alt={lines[0] || "Artwork image"}
                        id={work.slug}
                        aspectRatio="aspect-[4/5]"
                      />
                    </div>
                    <div className="mt-4 space-y-1.5">
                      <span className="text-[9px] tracking-widest text-text-muted uppercase font-mono">{work.labels[0]}</span>
                      <h4 className="font-serif text-lg text-text-primary group-hover:text-text-secondary transition-colors font-light">
                        {lines[0] || "Untitled"}
                      </h4>
                      <p className="text-xs text-text-muted font-mono">{work.year}</p>
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
