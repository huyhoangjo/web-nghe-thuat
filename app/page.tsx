'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getWorks } from '@/lib/repositories/postRepository';
import { Post } from '@/lib/types/post';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';

import { SiteSettings } from '@/lib/types/settings';

export default function Home() {
  const [featuredWorks, setFeaturedWorks] = useState<Post[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    homeHeroImage: '/images/home-hero.jpg',
    homeHeroOpacity: 35,
  });
  const { t } = useLanguage();

  useEffect(() => {
    // Select representative featured works with images
    const allWorks = getWorks();
    const selected = allWorks.filter(w => w.images.length > 0).slice(0, 3);
    setFeaturedWorks(selected);

    // Fetch site settings
    const fetchSiteSettings = async () => {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setSettings(data);
        }
      } catch {
        // Fallback to default
      }
    };
    fetchSiteSettings();
  }, []);

  return (
    <div className="pb-24 bg-background-primary">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center bg-background-secondary overflow-hidden border-b-2 border-border-light">
        {/* Full Color Background Image (Page 3 of PDF: "GIỮ HÌNH MÀU, CÒN ĐỘ OPACITY THÌ CỨ THEO EM ĐANG LÀM") */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 scale-105"
          style={{ 
            backgroundImage: `url('${settings.homeHeroImage}')`,
            opacity: settings.homeHeroOpacity / 100 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/30 to-transparent" />
        
        <div className="relative text-center z-10 px-6 max-w-4xl space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold block uppercase"
          >
            {t("A Living Artistic Archive", "KHÔNG GIAN LƯU TRỮ NGHỆ THUẬT SỐNG")}
          </motion.span>

          {/* Main Title - Reduced to 3/4 size (Page 2 of PDF) */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
            className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-wider text-text-primary uppercase"
          >
            NGO THI THUY DUYEN
          </motion.h1>

          {/* Updated Hero Quote (Page 2 of PDF) */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.6 }}
            className="font-serif italic text-lg md:text-2xl text-text-primary tracking-wide leading-relaxed max-w-2xl mx-auto font-normal"
          >
            “Art as a process of becoming.”
          </motion.p>

          {/* Hero Button - ENTER (Page 1 of PDF: "CHỮ ENTER THE ARCHIVE CHỈ ĐỂ CHỮ ENTER") */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="pt-8"
          >
            <Link 
              href="/works" 
              className="border-2 border-text-primary px-10 py-3 text-xs tracking-[0.35em] font-mono font-bold text-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-300 inline-block uppercase shadow-sm cursor-pointer"
            >
              ENTER
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="py-32 max-w-4xl mx-auto px-6 text-center space-y-8">
        <h2 className="font-serif text-3xl md:text-5xl text-text-primary leading-relaxed font-medium">
          {t("Art is not separate from life.", "Nghệ thuật không tách rời khỏi đời sống.")}
        </h2>
        <p className="font-serif text-lg md:text-xl text-text-primary max-w-3xl mx-auto leading-relaxed font-normal">
          {t(
            "This digital archive is a space where artworks, memories, travel, language, notebooks, materials, observations, and transformation coexist. As you explore, each piece you discover reveals its colors and remains preserved in memory.",
            "Lưu trữ kỹ thuật số này là một không gian nơi các tác phẩm nghệ thuật, ký ức, chuyến đi, ngôn ngữ, sổ tay, chất liệu, quan sát và sự chuyển đổi cùng tồn tại. Khi bạn khám phá, từng tác phẩm bạn xem sẽ dần hiện lại sắc màu và lưu giữ trong ký ức."
          )}
        </p>
        <div className="w-20 h-[2px] bg-text-primary mx-auto pt-4" />
      </section>

      {/* Featured Artwork Row - Renamed BODY OF WORK (Page 4 of PDF) */}
      {featuredWorks.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex justify-between items-end border-b-2 border-border-light pb-4">
            {/* Left Title: BODY OF WORK */}
            <h3 className="font-serif text-2xl md:text-3xl tracking-wide text-text-primary font-medium uppercase">
              BODY OF WORK
            </h3>
            {/* Right Link: VIEW ALL → */}
            <Link href="/works" className="text-xs tracking-widest text-text-secondary hover-gold transition-colors font-mono font-bold uppercase">
              {t("VIEW ALL →", "XEM TOÀN BỘ →")}
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {featuredWorks.map((work, idx) => {
              const lines = work.bodyText.split('\n').filter(l => l.trim() !== '');
              const desc = lines.length > 0 ? lines[0] : '';

              return (
                <motion.div 
                  key={work.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="space-y-4 group"
                >
                  <Link href={`/works/${work.slug}`} className="block border-2 border-border-medium overflow-hidden bg-background-secondary shadow-sm">
                    <ArchiveImage
                      src={work.images[0]}
                      alt={work.title}
                      id={work.slug}
                      aspectRatio="aspect-[4/3]"
                    />
                  </Link>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-mono font-bold text-text-secondary">
                      <span>{work.year}</span>
                      <span>CHAPTER</span>
                    </div>
                    <Link href={`/works/${work.slug}`}>
                      <h4 className="font-serif text-2xl text-text-primary group-hover:text-text-secondary transition-colors font-medium">
                        {work.title}
                      </h4>
                    </Link>
                    {desc && (
                      <p className="font-serif text-base text-text-primary line-clamp-2 leading-relaxed font-normal">
                        {desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
