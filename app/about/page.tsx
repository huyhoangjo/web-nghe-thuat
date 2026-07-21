'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Container className="py-24 max-w-6xl bg-background-primary space-y-32">
      
      {/* HEADER TITLE */}
      <div className="space-y-4 text-center max-w-3xl mx-auto border-b-2 border-border-light pb-12">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          {t("CURATORIAL ARCHITECTURE", "CẤU TRÚC GIÁM ĐỊNH LƯU TRỮ")}
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-normal text-text-primary tracking-wide">
          BIO & MATERIAL PHILOSOPHY
        </h1>
        <p className="text-xs text-text-secondary font-mono tracking-widest font-bold uppercase">
          NGO THI THUY DUYEN — VISUAL ARTIST
        </p>
      </div>

      {/* LAYER 1 & LAYER 2: ARTIST BIO & BIOGRAPHY */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Layer 1: Artist Bio Profile Card (Col span 5) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="md:col-span-5 space-y-6 md:sticky md:top-28"
        >
          <div className="border-2 border-border-medium overflow-hidden bg-background-secondary shadow-md">
            <ArchiveImage
              src="/images/artist-portrait.png"
              alt="Ngo Thi Thuy Duyen Portrait"
              id="artist-portrait"
              aspectRatio="aspect-[3/4]"
            />
          </div>
          <div className="space-y-3 pt-2">
            <span className="text-xs tracking-[0.3em] text-text-secondary font-mono font-bold uppercase block">
              LAYER 01 / ARTIST BIO
            </span>
            <h2 className="font-serif text-3xl font-medium text-text-primary tracking-wide">
              Ngô Thị Thùy Duyên
            </h2>
            <p className="text-xs text-text-secondary tracking-[0.2em] font-mono font-bold uppercase">
              VISUAL ARTIST / B. 1981, HOI AN, VIETNAM
            </p>
            <p className="text-sm text-text-primary leading-relaxed pt-2 font-sans font-normal border-t border-border-medium">
              {t(
                "Based in Ho Chi Minh City, Vietnam. Practicing across painting, installation, performance art, handmade dó paper, ink, thread, light, and transparent resin.",
                "Sống và làm việc tại TP. Hồ Chí Minh, Việt Nam. Thực hành nghệ thuật thị giác qua hội họa, sắp đặt, trình diễn, giấy dó thủ công, mực, chỉ, ánh sáng và nhựa resin."
              )}
            </p>
          </div>
        </motion.div>
        
        {/* Layer 2: Artist Biography & Practice History (Col span 7) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="md:col-span-7 space-y-12"
        >
          <div className="space-y-6">
            <span className="text-xs tracking-[0.3em] text-text-secondary font-mono font-bold uppercase block">
              LAYER 02 / ARTIST BIOGRAPHY
            </span>
            <h3 className="font-serif text-3xl text-text-primary font-medium tracking-wide border-b-2 border-border-light pb-4">
              {t("Artistic Journey & Background", "Hành Trình Thực Hành & Tiểu Sử")}
            </h3>
            
            <div className="prose prose-stone max-w-none text-text-primary text-base md:text-lg leading-[1.9] space-y-6 font-serif font-normal">
              <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-text-primary">
                {t(
                  "Ngo Thi Thuy Duyen (b. 1981, Hoi An, Vietnam) is a Vietnamese visual artist based in Ho Chi Minh City. For more than two decades, her practice has centered on the expressive and conceptual possibilities of handmade dó paper, exploring how material can embody memory, perception, and transformation.",
                  "Ngô Thị Thùy Duyên (sinh năm 1981 tại Hội An, Việt Nam) là một nghệ sĩ thị giác hiện đang sống và làm việc tại TP. Hồ Chí Minh. Trong hơn hai thập kỷ qua, thực hành nghệ thuật của cô tập trung vào khả năng biểu đạt và tư tưởng của giấy dó thủ công, khám phá cách chất liệu chứa đựng ký ức, nhận thức và sự chuyển đổi."
                )}
              </p>
              <p>
                {t(
                  "Graduating with a Bachelor of Fine Arts from Hue University of Arts (2006) and completing coursework for the Master of Fine Arts program at Ho Chi Minh City University of Fine Arts (2009–2012), her early work explored installation and performance art. Over time, her research evolved into spatial structures combining dó paper, ink, thread, light, and transparent resin.",
                  "Tốt nghiệp Cử nhân Mỹ thuật tại Đại học Nghệ thuật Huế (2006) và hoàn thành chương trình Thạc sĩ Mỹ thuật tại Đại học Mỹ thuật TP.HCM (2009–2012), những thực hành ban đầu của cô gắn liền với nghệ thuật sắp đặt và trình diễn. Theo thời gian, nghiên cứu của cô mở rộng thành các cấu trúc không gian kết hợp giấy dó, mực, chỉ, ánh sáng và nhựa resin."
                )}
              </p>
              <p>
                {t(
                  "Her work has been presented in Vietnam, Taiwan, South Korea, France, Germany, and Thailand through major exhibitions, artist residencies, performance art festivals, and international publications.",
                  "Các tác phẩm của cô đã được giới thiệu tại Việt Nam, Đài Loan, Hàn Quốc, Pháp, Đức và Thái Lan thông qua các triển lãm lớn, chương trình lưu trú nghệ sĩ, liên hoan trình diễn và các ấn phẩm quốc tế."
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* LAYER 3: ARTIST STATEMENT */}
      <section className="border-t-2 border-border-light pt-24 max-w-4xl mx-auto space-y-8 text-center">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          LAYER 03 / ARTIST STATEMENT
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-text-primary font-medium leading-relaxed">
          {t("Art is not separate from life.", "Nghệ thuật không tách rời khỏi đời sống.")}
        </h2>
        <div className="w-20 h-[2px] bg-text-primary mx-auto my-6" />
        <p className="font-serif italic text-lg md:text-2xl text-text-primary leading-relaxed font-normal max-w-3xl mx-auto">
          {t(
            "“Behind every artwork are memories, travels, notebooks, conversations, observations, unfinished thoughts, language, research, silence, and transformation. Not everything needs explanation. Leave room for mystery.”",
            "“Đằng sau mỗi tác phẩm là ký ức, những chuyến đi, sổ tay, trò chuyện, quan sát, những suy nghĩ dang dở, ngôn ngữ, nghiên cứu, sự im lặng và chuyển hóa. Không phải mọi thứ đều cần lời giải thích. Hãy để lại khoảng trống cho sự bí ẩn.”"
          )}
        </p>
      </section>

      {/* LAYER 4: MATERIAL PHILOSOPHY PREVIEW SECTION (HIGH CONTRAST) */}
      <section className="border-t-2 border-border-light pt-24 space-y-16">
        {/* Layer Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b-2 border-border-light pb-8">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
              LAYER 04 / ESSAY & ESSENCE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-text-primary font-medium">
              {t("Material Philosophy", "Triết lý Vật liệu")}
            </h2>
            <p className="text-xs text-text-secondary font-mono font-bold tracking-wide">
              {t("The Origin of Form: Matter, Suspension, and Perception", "Khởi nguyên của Hình hài: Vật chất, Huyền phù và Nhận thức")}
            </p>
          </div>
          <Link
            href="/field-notes/material-philosophy"
            className="border-2 border-text-primary px-8 py-3.5 text-xs font-bold tracking-[0.25em] text-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-300 font-mono inline-block text-center whitespace-nowrap shrink-0 shadow-sm"
          >
            {t("READ FULL ESSAY →", "ĐỌC TOÀN VĂN BÀI LUẬN →")}
          </Link>
        </div>

        {/* Full-width Generous Quote Paragraph */}
        <div className="max-w-4xl mx-auto space-y-8 text-center md:text-left">
          <blockquote className="border-l-4 border-text-primary pl-6 md:pl-8 py-3 font-serif italic text-xl md:text-2xl text-text-primary leading-relaxed font-normal bg-background-secondary/60 rounded-r-lg">
            <p>
              {t(
                "“Dó paper was once tree bark. Before taking the form of paper, that matter passes through a phase where it is no longer a tree, yet not yet paper. It is precisely this 'in-between' state of suspension that becomes the point of departure for my entire thinking.”",
                "“Giấy dó từng là vỏ cây... Trước khi có hình hài của một tờ giấy, vật chất ấy đã trải qua một giai đoạn không còn là cây nhưng cũng chưa phải là giấy. Chính trạng thái 'ở giữa' ấy trở thành điểm khởi đầu cho toàn bộ suy nghĩ của tôi.”"
              )}
            </p>
          </blockquote>
          
          <p className="text-base md:text-lg text-text-primary leading-relaxed font-serif font-normal max-w-3xl">
            {t(
              "Exploring matter not as a static medium, but as an open system of possibilities involving paper, water suspension, transparent resin, light, and the observer's movement.",
              "Khám phá vật chất không phải như một phương tiện tĩnh, mà là một hệ thống mở chứa đựng nhiều khả năng tồn tại giữa giấy dó, huyền phù nước, resin trong suốt, ánh sáng và sự di chuyển nhận thức của người xem."
            )}
          </p>
        </div>

        {/* Full-width Material Study Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
          <div className="space-y-3">
            <div className="border-2 border-border-medium bg-background-secondary shadow-md">
              <ArchiveImage
                src="/images/materials/material-1.jpg"
                alt="Dó paper and stitching material study"
                id="about-mat-1"
                aspectRatio="aspect-[16/10]"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-text-secondary font-mono font-bold tracking-wider uppercase block">MATERIAL STUDY I</span>
              <h4 className="font-serif text-lg text-text-primary font-medium">{t("Dó Paper & Stitching Traces", "Giấy Dó & Dấu Vết Đường Chỉ")}</h4>
            </div>
          </div>

          <div className="space-y-3">
            <div className="border-2 border-border-medium bg-background-secondary shadow-md">
              <ArchiveImage
                src="/images/materials/material-2.jpg"
                alt="Resin suspension and light study"
                id="about-mat-2"
                aspectRatio="aspect-[16/10]"
              />
            </div>
            <div className="space-y-1">
              <span className="text-xs text-text-secondary font-mono font-bold tracking-wider uppercase block">MATERIAL STUDY II</span>
              <h4 className="font-serif text-lg text-text-primary font-medium">{t("Resin Suspension & Spatial Light", "Resin Huyền Phù & Không Gian Ánh Sáng")}</h4>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 5 TRANSITION BANNER: BODY OF WORKS */}
      <section className="border-2 border-text-primary bg-background-secondary p-12 md:p-16 text-center space-y-6 shadow-md rounded-lg">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          LAYER 05 / CURATORIAL CONCLUSION
        </span>
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-text-primary tracking-wide">
          {t("Body of Works", "Tiến Trình Tác Phẩm")}
        </h2>
        <p className="text-sm md:text-base text-text-primary max-w-xl mx-auto leading-relaxed font-sans font-normal">
          {t(
            "Explore the six chronological development chapters from early installations (2003) to spatial drawings on Dó paper and resin (2014+). Each artwork revealed remains preserved in memory.",
            "Khám phá sáu chương tiến trình phát triển theo mốc thời gian từ các sắp đặt thử nghiệm ban đầu (2003) đến các cấu trúc không gian trên giấy Dó và resin (2014+). Từng tác phẩm bạn khám phá sẽ luôn lưu giữ trong ký ức."
          )}
        </p>
        <div className="pt-4">
          <Link
            href="/works"
            className="border-2 border-text-primary px-10 py-4 text-xs font-bold tracking-[0.3em] text-text-primary hover:bg-text-primary hover:text-background-primary transition-all duration-300 font-mono inline-block shadow-sm"
          >
            {t("ENTER BODY OF WORKS →", "KHÁM PHÁ TIẾN TRÌNH TÁC PHẨM →")}
          </Link>
        </div>
      </section>

    </Container>
  );
}
