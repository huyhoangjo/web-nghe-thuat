'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getBiography } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';

export default function AboutPage() {
  const [bio, setBio] = useState<Post | null>(null);

  useEffect(() => {
    const data = getBiography();
    if (data) {
      setBio(data);
    }
  }, []);

  return (
    <Container className="py-24 max-w-5xl bg-background-primary">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Profile Info (Col span 4) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="md:col-span-4 space-y-6 md:sticky md:top-28"
        >
          <div className="aspect-[3/4] border border-border-light overflow-hidden bg-background-secondary relative shadow-sm">
            <div 
              className="w-full h-full bg-cover bg-center filter grayscale contrast-110"
              style={{ backgroundImage: `url('/duyen.jpg')` }}
            />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-light text-text-primary tracking-wide">Ngô Thị Thùy Duyên</h2>
            <p className="text-xs text-text-muted tracking-widest font-mono">CONTEMPORARY ARTIST</p>
            <p className="text-xs text-text-secondary leading-relaxed pt-2">
              Born in Vietnam. Practicing art through performance, installation, drawing, and mixed media.
            </p>
          </div>
        </motion.div>
        
        {/* Biography and Practice (Col span 8) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }}
          className="md:col-span-8 space-y-12"
        >
          <div className="space-y-6">
            <h1 className="font-serif text-3xl md:text-4xl text-text-primary font-light tracking-wide border-b border-border-light pb-4">
              Artistic Practice
            </h1>
            
            <div className="prose prose-stone max-w-none text-text-secondary text-sm leading-[1.8] space-y-6">
              <p>
                My artistic practice is an investigation into the invisible layers of reality: memories, materials, travel, and the silence that separates them. Art does not exist apart from life; rather, it is a continuous process of transformation and becoming.
              </p>
              <p>
                Working predominantly with mixed media on paper (particularly traditional Dó paper), canvas, performance, and site-specific installation, I seek to reveal the fragility of the human condition and the traces left by time.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="font-serif text-2xl text-text-primary font-light tracking-wide border-b border-border-light pb-4">
              Biography
            </h2>
            
            {bio ? (
              <div 
                dangerouslySetInnerHTML={{ __html: bio.bodyHtml }} 
                className="prose-custom text-text-secondary text-sm leading-[1.8] space-y-6 font-serif italic"
              />
            ) : (
              <div className="text-text-secondary text-sm leading-[1.8] space-y-6">
                <p>
                  Ngô Thị Thùy Duyên is a contemporary artist based in Vietnam. She graduated from the University of Fine Arts and has participated in numerous domestic and international art projects, exhibitions, and performance programs.
                </p>
                <p>
                  Her early practice was defined by experimental installation and performance art, exploring how memory behaves under physical and emotional gravity. Her recent work investigates silence and emergence through stitchings on Dó paper, seeking to capture the weight of impermanence.
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
