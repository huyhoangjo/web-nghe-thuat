'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getWorks } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';

interface Chapter {
  number: number;
  titleEn: string;
  titleVi: string;
  years: string;
  descEn: string;
  descVi: string;
}

export default function WorksPage() {
  const [works, setWorks] = useState<Post[]>([]);
  const { t } = useLanguage();

  const chapters: Chapter[] = [
    { 
      number: 1, 
      titleEn: 'Emerging Presence', 
      titleVi: 'Hiện diện Mới chớm', 
      years: '2003 - 2007', 
      descEn: 'Experimental Art, Installation, Performance, Body, Collective Memory.',
      descVi: 'Nghệ thuật Thử nghiệm, Sắp đặt, Trình diễn, Cơ thể, Ký ức Tập thể.'
    },
    { 
      number: 2, 
      titleEn: 'Departure', 
      titleVi: 'Khởi hành', 
      years: '2008 - 2009', 
      descEn: 'Motherhood, Emotional Survival, Becoming, Uncertainty.',
      descVi: 'Thiên chức làm mẹ, Sự Sinh tồn Cảm xúc, Quá trình Hình thành, Sự Bất định.'
    },
    { 
      number: 3, 
      titleEn: 'Fragile Bodies', 
      titleVi: 'Thân thể Mong manh', 
      years: '2011 - 2012', 
      descEn: 'Migration, Feminine Identity, Survival, Reconstruction.',
      descVi: 'Sự Di trú, Bản dạng Phụ nữ, Sự Sinh tồn, Tái thiết.'
    },
    { 
      number: 4, 
      titleEn: 'Temporary Presence', 
      titleVi: 'Hiện diện Tạm thời', 
      years: '2012 - 2013', 
      descEn: 'Impermanence, Memory, Light.',
      descVi: 'Vô thường, Ký ức, Ánh sáng.'
    },
    { 
      number: 5, 
      titleEn: 'Inner Gravity', 
      titleVi: 'Trọng lực Bên trong', 
      years: '2013', 
      descEn: 'Black Holes, Void, Emotional Gravity, Consciousness.',
      descVi: 'Hố đen, Hư vô, Trọng lực Cảm xúc, Nhận thức.'
    },
    { 
      number: 6, 
      titleEn: 'The Origin of No-Self', 
      titleVi: 'Khởi nguyên Vô ngã', 
      years: '2013 - 2014', 
      descEn: 'Dó Paper, Stitching, Healing, Softness, Transformation, Emergence.',
      descVi: 'Giấy Dó, Khâu vá, Chữa lành, Sự Mềm mại, Chuyển đổi, Sự Trỗi dậy.'
    },
  ];

  useEffect(() => {
    setWorks(getWorks());
  }, []);

  return (
    <Container className="py-24 bg-background-primary min-h-screen">
      {/* Page Header */}
      <div className="border-b border-border-light pb-8 mb-16 space-y-3">
        <span className="text-[10px] tracking-[0.35em] text-text-muted font-mono uppercase block">
          {t('CHRONOLOGICAL ARCHIVE', 'LƯU TRỮ TIẾN TRÌNH THỜI GIAN')}
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-text-primary tracking-wide">
          {t('ARTWORKS', 'TÁC PHẨM')}
        </h1>
        <p className="text-xs text-text-muted max-w-xl leading-relaxed tracking-wide font-sans">
          {t(
            'The artistic journey of Ngô Thị Thùy Duyên, catalogued into six developmental phases from early installations to drawings on Dó paper.',
            'Hành trình thực hành nghệ thuật của Ngô Thị Thùy Duyên, được lưu trữ thành sáu giai đoạn tiến trình từ các sắp đặt ban đầu đến các tác phẩm vẽ trên giấy Dó.'
          )}
        </p>
      </div>

      {/* Chapters loop */}
      <div className="space-y-32">
        {chapters.map((ch) => {
          const startYear = parseInt(ch.years.split('-')[0].trim());
          const endYear = ch.years.includes('-') 
            ? parseInt(ch.years.split('-')[1].trim()) 
            : startYear;

          const chWorks = works.filter((w) => {
            const wYear = parseInt(w.year);
            return wYear >= startYear && wYear <= endYear;
          });

          return (
            <div key={ch.number} className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-border-light pt-8">
              {/* Chapter Metadata (col span 3) */}
              <div className="lg:col-span-3 space-y-4 lg:sticky lg:top-28 h-fit">
                <div className="space-y-1">
                  <span className="text-[10px] tracking-widest text-text-muted font-mono uppercase block">
                    {t('CHAPTER', 'CHƯƠNG')} 0{ch.number}
                  </span>
                  <h2 className="font-serif text-2xl font-light text-text-primary tracking-wide">
                    {t(ch.titleEn, ch.titleVi)}
                  </h2>
                  <span className="text-xs tracking-wider text-text-muted font-mono font-medium block">
                    {ch.years}
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed font-serif italic pt-2 font-light">
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
                      <div className="border border-border-light overflow-hidden bg-background-secondary shadow-sm">
                        {work.images.length > 0 ? (
                          <ArchiveImage
                            src={work.images[0]}
                            alt={title}
                            id={work.slug}
                            aspectRatio="aspect-[4/3]"
                          />
                        ) : (
                          <div className="aspect-[4/3] flex items-center justify-center bg-background-secondary">
                            <span className="text-xs text-text-muted font-mono tracking-widest">{t('NO IMAGE', 'KHÔNG CÓ ẢNH')}</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] tracking-widest text-text-muted uppercase font-mono">
                          {work.labels.join(' / ')}
                        </span>
                        <h3 className="font-serif text-lg text-text-primary group-hover:text-text-secondary transition-colors font-light">
                          {title}
                        </h3>
                        <p className="text-xs text-text-muted font-mono">{work.year}</p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
