'use client';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/lib/context/LanguageContext';

interface CVSection {
  titleEn: string;
  titleVi: string;
  items: { year: string; textEn: string; textVi: string }[];
}

const cvData: CVSection[] = [
  {
    titleEn: 'Education',
    titleVi: 'Học Vấn',
    items: [
      {
        year: '2009–2012',
        textEn: 'Master of Fine Arts Program (coursework completed), Ho Chi Minh City University of Fine Arts, Vietnam.',
        textVi: 'Chương trình Thạc sĩ Mỹ thuật (hoàn thành phần lý thuyết), Trường Đại học Mỹ thuật TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2006',
        textEn: 'Bachelor of Fine Arts, Hue University of Arts, Vietnam.',
        textVi: 'Cử nhân Mỹ thuật, Trường Đại học Nghệ thuật Huế, Việt Nam.',
      },
    ],
  },
  {
    titleEn: 'Grants & Artist Residencies',
    titleVi: 'Học Bổng & Lưu Trú Nghệ Thuật',
    items: [
      {
        year: '2017',
        textEn: 'International Artist Residency, Cu Chi, Ho Chi Minh City, Vietnam.',
        textVi: 'Chương trình Lưu trú Nghệ sĩ Quốc tế, Củ Chi, TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2012',
        textEn: 'South Country, the South of Country International Residency Program, Zero Station (Vietnam) & Outsiders Factory (Taiwan).',
        textVi: 'Chương trình Lưu trú Quốc tế South Country, hợp tác giữa Ga 0 (Việt Nam) và Outsiders Factory (Đài Loan).',
      },
      {
        year: '2012',
        textEn: 'International Artist Residency, Cu Chi, Ho Chi Minh City, Vietnam.',
        textVi: 'Chương trình Lưu trú Nghệ sĩ Quốc tế, Củ Chi, TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2010',
        textEn: 'Young Artists Grants Program, funded by City of Melbourne & Australian Consulate-General in HCMC.',
        textVi: 'Quỹ Hỗ trợ Nghệ sĩ Trẻ, tài trợ bởi Thành phố Melbourne và Tổng Lãnh sự quán Australia tại TP.HCM.',
      },
      {
        year: '2007',
        textEn: 'HIVECAMP International Artist Residency, Cheongju, South Korea.',
        textVi: 'Chương trình Lưu trú Nghệ sĩ Quốc tế HIVECAMP, Cheongju, Hàn Quốc.',
      },
    ],
  },
  {
    titleEn: 'Solo Exhibitions & Performances',
    titleVi: 'Triển Lãm & Trình Diễn Cá Nhân',
    items: [
      {
        year: '2011',
        textEn: 'Allergy (Solo Performance), Zero Station, Ho Chi Minh City, Vietnam.',
        textVi: 'Dị Ứng (Trình diễn cá nhân), Ga 0 (Zero Station), TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2007',
        textEn: 'Departure (Solo Exhibition), Tu Do Gallery, Ho Chi Minh City, Vietnam.',
        textVi: 'Khởi Hành (Triển lãm cá nhân), Tự Do Gallery, TP. Hồ Chí Minh, Việt Nam.',
      },
    ],
  },
  {
    titleEn: 'Selected Group Exhibitions',
    titleVi: 'Triển Lãm Nhóm Tiêu Biểu',
    items: [
      {
        year: '2016',
        textEn: 'Bittersweet Whispers, Salon Saigon, Ho Chi Minh City, Vietnam.',
        textVi: 'Lời Thì Thầm Đắng Ngọt, Salon Saigon, TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2013',
        textEn: 'Path to Nowhere, Treasure Hill Artist Village, Taipei, Taiwan.',
        textVi: 'Con Đường Đến Hư Không, Làng Nghệ sĩ Treasure Hill, Đài Bắc, Đài Loan.',
      },
      {
        year: '2013',
        textEn: 'Retour du Vietnam I, L\'Atelier Blanc, France.',
        textVi: 'Trở Về Từ Việt Nam I, L\'Atelier Blanc, Pháp.',
      },
      {
        year: '2012',
        textEn: 'Crossing the Line, Howlspace, Tainan, Taiwan.',
        textVi: 'Bước Qua Ranh Giới, Howlspace, Đài Nam, Đài Loan.',
      },
      {
        year: '2012',
        textEn: 'South Country, the South of Country, Zero Station, Ho Chi Minh City, Vietnam.',
        textVi: 'South Country, Ga 0 (Zero Station), TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2007',
        textEn: 'Chungbuk International Art Fair, South Korea.',
        textVi: 'Hội chợ Nghệ thuật Quốc tế Chungbuk, Hàn Quốc.',
      },
      {
        year: '2007',
        textEn: 'Vietnam New Art Exhibition, Shin Museum, South Korea.',
        textVi: 'Triển lãm Nghệ thuật Mới Việt Nam, Bảo tàng Shin, Hàn Quốc.',
      },
      {
        year: '2007',
        textEn: 'A Million Ways to Cool Down (Global Warming Project), Silpakorn University, Thailand.',
        textVi: 'Một Triệu Cách Làm Mát (Dự án Biến đổi Khí hậu), Đại học Silpakorn, Thái Lan.',
      },
      {
        year: '2006',
        textEn: 'Poetry, Hue Festival, Vietnam.',
        textVi: 'Thơ, Festival Huế, Việt Nam.',
      },
      {
        year: '2006',
        textEn: 'Rush Hours, Ho Chi Minh City, Vietnam.',
        textVi: 'Giờ Cao Điểm, TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2006',
        textEn: 'Recovery, Ho Chi Minh City Fine Arts Association, Vietnam.',
        textVi: 'Phục Hồi, Hội Mỹ thuật TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2006',
        textEn: 'Progress in Peace (Stone and Water Project), Anyang, South Korea.',
        textVi: 'Hòa Bình Phát Triển (Dự án Đá và Nước), Anyang, Hàn Quốc.',
      },
      {
        year: '2005',
        textEn: 'Installation and Performance Art Exhibition, Infinity Group, Hue, Vietnam.',
        textVi: 'Triển lãm Sắp đặt & Trình diễn, Nhóm Infinity, Huế, Việt Nam.',
      },
      {
        year: '2004',
        textEn: 'Aspiration for Peace, Hue Festival, Vietnam.',
        textVi: 'Khát Vọng Hòa Bình, Festival Huế, Việt Nam.',
      },
      {
        year: '2003',
        textEn: 'Installation Exhibition Spring, Hue, Vietnam.',
        textVi: 'Triển lãm Sắp đặt Mùa Xuân, Huế, Việt Nam.',
      },
    ],
  },
  {
    titleEn: 'Performance Art Projects',
    titleVi: 'Dự Án Nghệ Thuật Trình Diễn',
    items: [
      {
        year: '2011',
        textEn: 'Allergy (Solo Performance), Zero Station, Ho Chi Minh City, Vietnam.',
        textVi: 'Dị Ứng (Trình diễn cá nhân), Ga 0, TP. Hồ Chí Minh, Việt Nam.',
      },
      {
        year: '2009',
        textEn: 'Performance Art Network Asia (PAN ASIA), Seoul, South Korea (Performed Allergy & Artist Lecture).',
        textVi: 'Liên hoan Trình diễn Châu Á (PAN ASIA), Seoul, Hàn Quốc (Trình diễn Dị Ứng & Thuyết trình tại Zero One Design Center).',
      },
      {
        year: '2007',
        textEn: 'Blue – Red – Yellow Performance at Shin Museum, South Korea.',
        textVi: 'Trình diễn Xanh – Đỏ – Vàng tại Bảo tàng Shin, Hàn Quốc.',
      },
      {
        year: '2007',
        textEn: 'Performance Art Festival, Andokbol Street, Cheongju, South Korea.',
        textVi: 'Liên hoan Nghệ thuật Trình diễn, Đường Andokbol, Cheongju, Hàn Quốc.',
      },
      {
        year: '2006',
        textEn: 'Performance in Jun Nguyen-Hatsushiba\'s project for Gwangju Biennale, South Korea.',
        textVi: 'Tham gia trình diễn trong dự án của Jun Nguyen-Hatsushiba tại Gwangju Biennale, Hàn Quốc.',
      },
      {
        year: '2006',
        textEn: 'Fireflies Performance Art Festival, Hanoi – Hue – Ho Chi Minh City, Vietnam.',
        textVi: 'Liên hoan Trình diễn Đom Đóm, Hà Nội – Huế – TP. Hồ Chí Minh, Việt Nam.',
      },
    ],
  },
  {
    titleEn: 'Workshops & Artist Talks',
    titleVi: 'Workshop & Trò Chuyện Nghệ Thuật',
    items: [
      {
        year: '2026',
        textEn: 'Designed and facilitated Creative Recycling Workshop for Children, Elite Art Academy, HCMC.',
        textVi: 'Thiết kế và hướng dẫn Workshop Tái chế Sáng tạo cho Trẻ em, Học viện Elite Art, TP.HCM.',
      },
      {
        year: '2013',
        textEn: 'Artist Talk & Performance Art Workshop for Master\'s students, University of Oldenburg, Germany.',
        textVi: 'Artist Talk & Workshop Trình diễn cho sinh viên Thạc sĩ, Đại học Oldenburg, Đức.',
      },
      {
        year: '2012',
        textEn: 'Artist Talk, Howlspace, Tainan, Taiwan.',
        textVi: 'Trò chuyện Nghệ thuật (Artist Talk), Howlspace, Đài Nam, Đài Loan.',
      },
      {
        year: '2006',
        textEn: 'Performance Art Workshop led by Tran Luong, Saigon Open City & Goethe-Institut Hanoi.',
        textVi: 'Workshop Trình diễn hướng dẫn bởi nghệ sĩ Trần Lương, Saigon Open City & Viện Goethe Hà Nội.',
      },
      {
        year: '2003',
        textEn: 'Installation & Performance Workshops with Juliane Heise and Seiji Shimoda, Hue University of Arts.',
        textVi: 'Workshop Sắp đặt & Trình diễn với Juliane Heise và Seiji Shimoda, Đại học Nghệ thuật Huế.',
      },
    ],
  },
  {
    titleEn: 'Publications & Collections',
    titleVi: 'Ấn Phẩm & Bộ Sưu Tập',
    items: [
      {
        year: '2010',
        textEn: 'Young Artists Grants Program Exhibition Catalogue, Australian Consulate-General and City of Melbourne.',
        textVi: 'Catalogue Triển lãm Quỹ Nghệ sĩ Trẻ, Tổng Lãnh sự quán Australia & Thành phố Melbourne.',
      },
      {
        year: '2007',
        textEn: 'Chungbuk International Art Fair & Vietnam New Art Exhibition Catalogues, South Korea.',
        textVi: 'Catalogue Hội chợ Nghệ thuật Quốc tế Chungbuk & Triển lãm Nghệ thuật Mới Việt Nam, Hàn Quốc.',
      },
      {
        year: 'Present',
        textEn: 'Works held in private collections in Vietnam, France, Germany, Taiwan, South Korea, and Australia.',
        textVi: 'Tác phẩm nằm trong các bộ sưu tập tư nhân tại Việt Nam, Pháp, Đức, Đài Loan, Hàn Quốc và Australia.',
      },
    ],
  },
  {
    titleEn: 'Professional Experience',
    titleVi: 'Kinh Nghiệm Chuyên Môn',
    items: [
      {
        year: '2018–2023',
        textEn: 'Art Director at First Interactive Technology, HCMC. Led artistic direction and visual storytelling for digital interactive products.',
        textVi: 'Giám đốc Nghệ thuật (Art Director) tại First Interactive Technology, TP.HCM. Phụ trách định hướng nghệ thuật và xây dựng hình ảnh truyền thông tương tác cho trẻ em.',
      },
    ],
  },
];

export default function CVPage() {
  const { t } = useLanguage();

  return (
    <Container className="py-24 max-w-6xl bg-background-primary space-y-20">
      <div className="space-y-4 text-center max-w-3xl mx-auto border-b-2 border-border-light pb-10">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          {t("ARTISTIC TIMELINE & ARCHIVE", "HÀNH TRÌNH NGHỆ THUẬT & LƯU TRỮ")}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-wide">
          BIOGRAPHY / CV
        </h1>
        <p className="text-xs text-text-secondary font-mono font-bold tracking-widest uppercase">
          NGO THI THUY DUYEN — VISUAL ARTIST
        </p>
      </div>
      
      <div className="space-y-20">
        {cvData.map((section, secIdx) => (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: secIdx * 0.1 }}
            key={section.titleEn} 
            className="space-y-8"
          >
            <div className="flex items-center justify-between border-b-2 border-border-light pb-4">
              <h2 className="font-serif text-2xl md:text-4xl font-medium text-text-primary tracking-wide">
                {t(section.titleEn, section.titleVi)}
              </h2>
              <span className="font-mono text-xs font-bold text-text-secondary">
                0{secIdx + 1}
              </span>
            </div>

            <div className="space-y-6">
              {section.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start border-b border-border-light/60 pb-6 last:border-0 group">
                  <div className="md:col-span-2 font-mono text-sm md:text-base font-bold text-text-primary tracking-wider pt-1">
                    {item.year}
                  </div>
                  <div className="md:col-span-10 text-text-primary font-serif text-lg md:text-xl font-normal leading-relaxed group-hover:text-text-primary transition-colors">
                    {t(item.textEn, item.textVi)}
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </Container>
  );
}
