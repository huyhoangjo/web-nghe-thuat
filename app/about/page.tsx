'use client';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { useLanguage } from '@/lib/context/LanguageContext';
import { ArchiveImage } from '@/components/ui/ArchiveImage';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <Container className="py-24 max-w-6xl bg-background-primary space-y-24">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Profile Info (Col span 5) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="md:col-span-5 space-y-6 md:sticky md:top-28"
        >
          <div className="border border-border-light overflow-hidden bg-background-secondary shadow-md">
            <ArchiveImage
              src="/images/artist-portrait.png"
              alt="Ngo Thi Thuy Duyen Portrait"
              id="artist-portrait"
              aspectRatio="aspect-[3/4]"
            />
          </div>
          <div className="space-y-3 pt-2">
            <h2 className="font-serif text-3xl font-light text-text-primary tracking-wide">
              Ngô Thị Thùy Duyên
            </h2>
            <p className="text-xs text-text-muted tracking-[0.25em] font-mono uppercase">
              VISUAL ARTIST / B. 1981, HOI AN
            </p>
            <p className="text-xs text-text-secondary leading-relaxed pt-2 font-sans font-light border-t border-border-light/60">
              {t(
                "Based in Ho Chi Minh City, Vietnam. Practicing across painting, installation, performance art, handmade dó paper, ink, thread, light, and transparent resin.",
                "Sống và làm việc tại TP. Hồ Chí Minh, Việt Nam. Thực hành nghệ thuật thị giác qua hội họa, sắp đặt, trình diễn, giấy dó thủ công, mực, chỉ, ánh sáng và nhựa resin."
              )}
            </p>
          </div>
        </motion.div>
        
        {/* Biography and Practice (Col span 7) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="md:col-span-7 space-y-16"
        >
          {/* Artistic Statement */}
          <div className="space-y-6">
            <span className="text-[10px] tracking-[0.3em] text-text-muted font-mono uppercase block">
              {t("ARTISTIC PHILOSOPHY", "TƯ TƯỞNG SÁNG TÁC")}
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary font-light tracking-wide border-b border-border-light pb-6 leading-tight">
              {t("Material, Perception & Silence", "Chất liệu, Nhận thức & Khoảng lặng")}
            </h1>
            
            <div className="prose prose-stone max-w-none text-text-secondary text-sm md:text-base leading-[1.9] space-y-6 font-serif font-light">
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:mr-2 first-letter:float-left first-letter:text-text-primary">
                {t(
                  "For more than two decades, my practice has centered on the expressive and conceptual possibilities of handmade dó paper, exploring how material can embody memory, perception, and transformation.",
                  "Trong hơn hai thập kỷ qua, thực hành nghệ thuật của tôi tập trung vào khả năng biểu đạt và tư tưởng của giấy dó thủ công, khám phá cách chất liệu chứa đựng ký ức, nhận thức và sự chuyển đổi."
                )}
              </p>
              <p>
                {t(
                  "Working across painting, installation, and performance art, I combine dó paper, ink, thread, light, and transparent resin to construct layered spatial environments where painting extends beyond the picture plane. Rather than presenting fixed meanings, my works invite viewers into quiet encounters with light, depth, and shifting perception, revealing reality as something continuously reconstructed through experience.",
                  "Làm việc trên các lĩnh vực hội họa, sắp đặt và nghệ thuật trình diễn, tôi kết hợp giấy dó, mực, chỉ, ánh sáng và nhựa trong (resin) để kiến tạo những không gian đa tầng nơi hội họa vượt ra ngoài khuôn khổ bề mặt thông thường. Thay vì đưa ra những ý nghĩa cố định, các tác phẩm mời gọi người xem vào những cuộc gặp gỡ lặng lẽ với ánh sáng, chiều sâu và sự biến chuyển của thị giác, hé lộ thực tại như một quá trình liên tục tái thiết lập qua trải nghiệm."
                )}
              </p>
              <p>
                {t(
                  "My work has been exhibited in Vietnam, Taiwan, South Korea, France, Germany, and Thailand through exhibitions, artist residencies, performance art festivals, and international collaborative projects.",
                  "Các tác phẩm của tôi đã được triển lãm tại Việt Nam, Đài Loan, Hàn Quốc, Pháp, Đức và Thái Lan thông qua các triển lãm, chương trình lưu trú nghệ sĩ, liên hoan nghệ thuật trình diễn và các dự án hợp tác quốc tế."
                )}
              </p>
            </div>
          </div>

          {/* Key Dimensions */}
          <div className="space-y-6 pt-4 border-t border-border-light">
            <h3 className="font-serif text-xl text-text-primary font-light tracking-wide uppercase">
              {t("CORE ELEMENTS OF PRACTICE", "CÁC CHẤT LIỆU & YẾU TỐ CỐT LÕI")}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="p-5 bg-background-secondary border border-border-light space-y-2">
                <span className="text-xs font-mono tracking-wider text-text-muted">01 / MATERIALITY</span>
                <h4 className="font-serif text-base text-text-primary">{t("Handmade Dó Paper & Resin", "Giấy Dó Thủ Công & Resin")}</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  {t("Exploration of fragility, translucent layers, organic textures, and physical transformation.", "Khám phá sự mỏng manh, các lớp màng xuyên sáng, kết cấu hữu cơ và sự biến đổi vật lý.")}
                </p>
              </div>
              <div className="p-5 bg-background-secondary border border-border-light space-y-2">
                <span className="text-xs font-mono tracking-wider text-text-muted">02 / SPATIAL EXPERIENCE</span>
                <h4 className="font-serif text-base text-text-primary">{t("Light, Thread & Layering", "Ánh Sáng, Chỉ & Đa Tầng")}</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-light">
                  {t("Constructing three-dimensional spatial environments that extend painting beyond 2D boundaries.", "Kiến tạo môi trường không gian ba chiều mở rộng hội họa vượt khỏi giới hạn hai chiều.")}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Material & Atelier Section */}
      <section className="pt-16 border-t border-border-light space-y-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] text-text-muted font-mono uppercase block">
              {t("STUDIO & MATERIALITY", "CHẤT LIỆU & KHÔNG GIAN XƯỞNG")}
            </span>
            <h3 className="font-serif text-2xl md:text-3xl text-text-primary font-light tracking-wide mt-1">
              {t("Fragments of Process", "Mảnh Ghép Quá Trình")}
            </h3>
          </div>
          <p className="text-xs text-text-muted max-w-md font-mono">
            {t("Click any material fragment to reveal its color and save in archive memory.", "Nhấp vào bất kỳ mảnh chất liệu nào để hiện màu và lưu vào ký ức lưu trữ.")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="border border-border-light bg-background-secondary shadow-sm">
              <ArchiveImage
                src="/images/materials/material-1.jpg"
                alt="Material Study 1 - Dó Paper and Thread"
                id="material-study-1"
                aspectRatio="aspect-[16/10]"
              />
            </div>
            <p className="text-xs text-text-muted font-mono tracking-wider">
              {t("MATERIAL STUDY I — Dó Paper, Thread & Ink Layering", "NGHIÊN CỨU CHẤT LIỆU I — Giấy Dó, Chỉ & Tầng Mực")}
            </p>
          </div>
          <div className="space-y-3">
            <div className="border border-border-light bg-background-secondary shadow-sm">
              <ArchiveImage
                src="/images/materials/material-2.jpg"
                alt="Material Study 2 - Transparent Resin and Light"
                id="material-study-2"
                aspectRatio="aspect-[16/10]"
              />
            </div>
            <p className="text-xs text-text-muted font-mono tracking-wider">
              {t("MATERIAL STUDY II — Transparent Resin, Spatial Light & Depth", "NGHIÊN CỨU CHẤT LIỆU II — Resin Trong Suốt, Ánh Sáng & Chiều Sâu")}
            </p>
          </div>
        </div>
      </section>
    </Container>
  );
}
