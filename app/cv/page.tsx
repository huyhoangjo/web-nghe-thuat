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
    <Container className="py-24 w-full max-w-7xl mx-auto space-y-24">
      {/* Page Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="space-y-4 text-center max-w-4xl mx-auto border-b-2 border-border-light pb-12"
      >
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          {t("ARTISTIC TIMELINE & ARTIST PROFILE", "HÀNH TRÌNH NGHỆ THUẬT & HỒ SƠ NGHỆ SĨ")}
        </span>
        <h1 className="font-serif text-5xl md:text-7xl font-medium text-text-primary tracking-wide uppercase">
          BIOGRAPHY
        </h1>
        <p className="text-sm text-text-secondary font-mono font-bold tracking-widest uppercase">
          NGO THI THUY DUYEN — VISUAL ARTIST
        </p>
      </motion.div>

      {/* Artist Profile Hero Section (2-Column Layout with Portrait Image) */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-background-secondary border-2 border-text-primary p-8 md:p-12 rounded-2xl shadow-xl"
      >
        {/* Left Column: Portrait Image */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative border-2 border-text-primary overflow-hidden rounded-xl shadow-md group bg-background-primary aspect-[3/4]">
            <img 
              src="/images/artist-portrait.png" 
              alt="Ngo Thi Thuy Duyen - Visual Artist Portrait" 
              className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
              <span className="text-xs font-mono font-bold text-background-primary tracking-widest uppercase">
                NGO THI THUY DUYEN
              </span>
            </div>
          </div>
          <div className="text-center md:text-left space-y-1">
            <span className="text-xs font-mono font-bold text-text-secondary tracking-widest uppercase block">
              LAYER 01 / ARTIST PORTRAIT
            </span>
            <p className="font-serif text-sm italic text-text-primary">
              {t("Visual Artist — b. 1981, Hoi An, Vietnam", "Nghệ sĩ Thị giác — sinh năm 1981, Hội An, Việt Nam")}
            </p>
          </div>
        </div>

        {/* Right Column: Bio Summary & Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2 border-b-2 border-border-light pb-4">
            <span className="text-xs font-mono font-bold text-text-secondary tracking-[0.25em] uppercase block">
              LAYER 02 / PRACTICE PHILOSOPHY
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-text-primary">
              {t("Artistic Journey & Research Focus", "Hành Trình Thực Hành & Hướng Nghiên Cứu")}
            </h2>
          </div>

          <p className="font-serif text-lg md:text-xl text-text-primary leading-relaxed font-normal">
            {t(
              "Ngo Thi Thuy Duyen is a Vietnamese visual artist based in Ho Chi Minh City. For more than two decades, her practice has centered on the expressive and conceptual possibilities of handmade dó paper, exploring how material can embody memory, perception, and transformation.",
              "Ngô Thị Thùy Duyên là nghệ sĩ thị giác sống và làm việc tại TP. Hồ Chí Minh. Trong hơn 20 năm thực hành, chị tập trung nghiên cứu khả năng biểu đạt và khái niệm của giấy Dó thủ công, khám phá cách chất liệu truyền tải ký ức, nhận thức và sự chuyển đổi."
            )}
          </p>

          <p className="font-serif text-base md:text-lg text-text-primary leading-relaxed font-normal">
            {t(
              "Graduating with a Bachelor of Fine Arts from Hue University of Arts (2006) and completing coursework for the Master of Fine Arts program at Ho Chi Minh City University of Fine Arts (2009–2012), her early work explored installation and performance art. Over time, her research evolved into spatial structures combining dó paper, ink, thread, light, and transparent resin.",
              "Tốt nghiệp Cử nhân Mỹ thuật từ Đại học Nghệ thuật Huế (2006) và hoàn thành phần lý thuyết chương trình Thạc sĩ Mỹ thuật tại Đại học Mỹ thuật TP.HCM (2009–2012), các thực hành ban đầu của chị khai thác nghệ thuật sắp đặt và trình diễn. Theo thời gian, hướng nghiên cứu phát triển thành các cấu trúc không gian kết hợp giấy Dó, mực, chỉ khâu, ánh sáng và keo trong suốt."
            )}
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t-2 border-border-light font-mono text-xs font-bold text-text-secondary uppercase tracking-wider">
            <div>
              <span className="block text-[10px] text-text-muted">LOCATION</span>
              <span className="text-text-primary">HCMC, VIETNAM</span>
            </div>
            <div>
              <span className="block text-[10px] text-text-muted">CORE MEDIUMS</span>
              <span className="text-text-primary">DÓ PAPER, INK, RESIN</span>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Timeline Sections List */}
      <div className="space-y-24 w-full">
        {cvData.map((section, secIdx) => (
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: secIdx * 0.05 }}
            key={section.titleEn} 
            className="space-y-10 w-full"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between border-b-2 border-text-primary pb-4">
              <h2 className="font-serif text-3xl md:text-5xl font-medium text-text-primary tracking-wide">
                {t(section.titleEn, section.titleVi)}
              </h2>
              <span className="font-mono text-sm font-bold text-text-secondary">
                0{secIdx + 1}
              </span>
            </div>

            {/* Timeline Items List */}
            <div className="space-y-8 w-full">
              {section.items.map((item, idx) => (
                <div 
                  key={idx} 
                  className="w-full pb-8 border-b border-border-light/80 last:border-0 hover:border-text-primary transition-colors group"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-12 w-full">
                    {/* Year Column */}
                    <div className="w-full md:w-60 shrink-0 font-mono text-base md:text-lg font-bold text-text-primary tracking-wider pt-1">
                      {item.year}
                    </div>

                    {/* Description Text Column */}
                    <div className="w-full font-serif text-xl md:text-2xl font-normal text-text-primary leading-relaxed">
                      {t(item.textEn, item.textVi)}
                    </div>
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
