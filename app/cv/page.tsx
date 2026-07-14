'use client';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

interface CVSection {
  title: string;
  items: { year: string; text: string }[];
}

const cvData: CVSection[] = [
  {
    title: 'Solo Exhibitions',
    items: [
      { year: '2012', text: 'Crossing the line, Howlspace, Taipei, Taiwan.' },
      { year: '2011', text: 'Allergy, Zero Station, Saigon, Vietnam.' },
    ],
  },
  {
    title: 'Selected Group Exhibitions & Art Projects',
    items: [
      { year: '2012', text: 'Land of Southern, Southern Land project, Zero Station, Saigon, Vietnam.' },
      { year: '2007', text: 'No respond, Choengju Art Space, Korea.' },
      { year: '2006', text: 'Nàng thơ (Muse) Installation, Hue Festival, Vietnam.' },
      { year: '2004', text: 'Khát vọng (Aspiration) Installation, Hue Festival, Vietnam.' },
      { year: '2003', text: 'Núi Ngự Bình (Ngu Binh Mountain) Installation, Mapping project, Hue, Vietnam.' },
    ],
  },
  {
    title: 'Artist Residencies & Performance Festivals',
    items: [
      { year: '2012', text: 'Vietnam-Taiwan artist exchange residency, Howlspace, Tainan, Taiwan.' },
      { year: '2009', text: 'Pan Asia Performance residency, Seoul, Korea.' },
      { year: '2009', text: 'Allergy Performance, PAN Asia Performance Art Festival, Seoul, Korea.' },
    ],
  },
];

export default function CVPage() {
  return (
    <Container className="py-24 max-w-3xl bg-background-primary">
      <div className="space-y-4 text-center mb-20">
        <span className="text-[10px] tracking-[0.35em] text-text-muted font-medium uppercase font-mono">Professional Timeline</span>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-text-primary tracking-wide">BIOGRAPHY / CV</h1>
        <div className="w-8 h-[1px] bg-border-medium mx-auto mt-4" />
      </div>
      
      <div className="space-y-16">
        {cvData.map((section, secIdx) => (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: secIdx * 0.15 }}
            key={section.title} 
            className="space-y-6"
          >
            <h2 className="font-serif text-2xl font-light text-text-primary border-b border-border-light pb-3 tracking-wide">
              {section.title}
            </h2>
            <div className="space-y-6 text-sm text-text-secondary leading-relaxed font-sans">
              {section.items.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start">
                  <div className="sm:col-span-2 font-mono text-xs tracking-wider text-text-muted font-medium">
                    {item.year}
                  </div>
                  <div className="sm:col-span-10 text-text-secondary font-serif">
                    {item.text}
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
