'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorks } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';
import { motion } from 'framer-motion';

interface Chapter {
  number: number;
  titleEn: string;
  titleVi: string;
  years: string;
  descEn: string;
  descVi: string;
  startYear: number;
  endYear: number;
}

export default function WorksPage() {
  const [works, setWorks] = useState<Post[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const { t } = useLanguage();

  // 5 Primary Chapters (Page 6 of PDF)
  const chapters: Chapter[] = [
    { 
      number: 1, 
      titleEn: 'Emerging Presence', 
      titleVi: 'Hiện diện Mới chớm', 
      years: '2003 – 2007', 
      startYear: 2003,
      endYear: 2007,
      descEn: 'Experimental Art, Installation, Performance, Body, Collective Memory.',
      descVi: 'Nghệ thuật Thử nghiệm, Sắp đặt, Trình diễn, Cơ thể, Ký ức Tập thể.'
    },
    { 
      number: 2, 
      titleEn: 'Departure', 
      titleVi: 'Khởi hành', 
      years: '2007 – 2009', 
      startYear: 2007,
      endYear: 2009,
      descEn: 'Motherhood, Emotional Survival, Becoming, Uncertainty.',
      descVi: 'Thiên chức làm mẹ, Sự Sinh tồn Cảm xúc, Quá trình Hình thành, Sự Bất định.'
    },
    { 
      number: 3, 
      titleEn: 'Fragile Bodies', 
      titleVi: 'Thân thể Mong manh', 
      years: '2011 – 2012', 
      startYear: 2011,
      endYear: 2012,
      descEn: 'Migration, Feminine Identity, Survival, Reconstruction.',
      descVi: 'Sự Di trú, Bản dạng Phụ nữ, Sự Sinh tồn, Tái thiết.'
    },
    { 
      number: 4, 
      titleEn: 'Temporary Presence & Inner Gravity', 
      titleVi: 'Hiện diện Tạm thời & Trọng lực Bên trong', 
      years: '2012 – 2013', 
      startYear: 2012,
      endYear: 2013,
      descEn: 'Impermanence, Memory, Void, Emotional Gravity, Consciousness.',
      descVi: 'Vô thường, Ký ức, Hư vô, Trọng lực Cảm xúc, Nhận thức.'
    },
    { 
      number: 5, 
      titleEn: 'The Origin of No-Self', 
      titleVi: 'Khởi nguyên Vô ngã', 
      years: '2013 – 2014', 
      startYear: 2013,
      endYear: 2014,
      descEn: 'Dó Paper, Stitching, Healing, Softness, Transformation, Emergence.',
      descVi: 'Giấy Dó, Khâu vá, Chữa lành, Sự Mềm mại, Chuyển đổi, Sự Trỗi dậy.'
    },
  ];

  useEffect(() => {
    setWorks(getWorks());
  }, []);

  const visibleChapters = selectedChapter === null 
    ? chapters 
    : chapters.filter(c => c.number === selectedChapter);

  return (
    <Container className="py-24 bg-background-primary min-h-screen">
      {/* Page Header (Page 6 PDF: Title BODY OF WORK, remove archive tagline) */}
      <div className="border-b-2 border-border-light pb-8 mb-12 space-y-4">
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-text-primary tracking-wide uppercase">
          BODY OF WORK
        </h1>
        <p className="font-serif text-lg md:text-xl text-text-primary max-w-3xl leading-relaxed font-normal">
          {t(
            'The artistic journey of Ngô Thị Thùy Duyên, catalogued into five developmental chapters from early installations to spatial drawings on Dó paper.',
            'Hành trình thực hành nghệ thuật của Ngô Thị Thùy Duyên, được lưu trữ thành 5 chương tiến trình từ các sắp đặt ban đầu đến các tác phẩm trên giấy Dó.'
          )}
        </p>
      </div>

      {/* 5-Chapter Interactive Tabs Filter (Page 6 of PDF) */}
      <div className="flex flex-wrap items-center gap-3 mb-16 pb-6 border-b-2 border-border-light font-mono text-xs font-bold">
        <button
          onClick={() => setSelectedChapter(null)}
          className={`px-5 py-2.5 rounded-md border-2 transition-all cursor-pointer ${
            selectedChapter === null 
              ? 'bg-text-primary text-background-primary border-text-primary shadow-sm' 
              : 'bg-background-secondary text-text-secondary border-border-medium hover-gold'
          }`}
        >
          {t('ALL CHAPTERS (5)', 'TẤT CẢ 5 CHƯƠNG')}
        </button>

        {chapters.map((ch) => (
          <button
            key={ch.number}
            onClick={() => setSelectedChapter(ch.number)}
            className={`px-4 py-2.5 rounded-md border-2 transition-all cursor-pointer ${
              selectedChapter === ch.number 
                ? 'bg-text-primary text-background-primary border-text-primary shadow-sm' 
                : 'bg-background-secondary text-text-secondary border-border-medium hover-gold'
            }`}
          >
            CHAPTER 0{ch.number}
          </button>
        ))}
      </div>

      {/* Chapters loop */}
      <div className="space-y-32">
        {visibleChapters.map((ch) => {
          const chWorks = works.filter((w) => {
            const wYear = parseInt(w.year);
            return wYear >= ch.startYear && wYear <= ch.endYear;
          });

          return (
            <motion.div 
              key={ch.number} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t-2 border-border-light pt-10"
            >
              {/* Chapter Metadata (col span 3) */}
              <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-28 h-fit">
                <div className="space-y-1">
                  <span className="text-xs tracking-widest text-text-secondary font-mono font-bold uppercase block">
                    {t('CHAPTER', 'CHƯƠNG')} 0{ch.number}
                  </span>
                  <h2 className="font-serif text-3xl font-medium text-text-primary tracking-wide">
                    {t(ch.titleEn, ch.titleVi)}
                  </h2>
                  <span className="text-xs tracking-wider text-text-secondary font-mono font-bold block">
                    {ch.years}
                  </span>
                </div>
                <p className="text-base text-text-primary leading-relaxed font-serif italic pt-2 font-normal">
                  {t(ch.descEn, ch.descVi)}
                </p>
              </div>
              
              {/* Artworks gallery list (col span 9) */}
              <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16">
                {chWorks.map((work, idx) => {
                  const lines = work.bodyText.split('\n').filter(l => l.trim() !== '');
                  const title = lines[0] || "Untitled";
                  return (
                    <Link key={`${work.slug}-${idx}`} href={`/works/${work.slug}`} className="group block space-y-4">
                      <div className="border-2 border-border-medium overflow-hidden bg-background-secondary shadow-sm">
                        {work.images.length > 0 ? (
                          <ArchiveImage
                            src={work.images[0]}
                            alt={title}
                            id={work.slug}
                            aspectRatio="aspect-[4/3]"
                          />
                        ) : (
                          <div className="aspect-[4/3] flex items-center justify-center bg-background-secondary">
                            <span className="text-xs text-text-secondary font-mono font-bold tracking-widest">{t('NO IMAGE', 'KHÔNG CÓ ẢNH')}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs tracking-widest text-text-secondary uppercase font-mono font-bold">
                          {work.labels.join(' / ')}
                        </span>
                        <h3 className="font-serif text-2xl text-text-primary group-hover:text-text-secondary transition-colors font-medium">
                          {title}
                        </h3>
                        <p className="text-xs text-text-secondary font-mono font-bold">{work.year}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
}
