'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getFieldNotes } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';

export default function FieldNotesPage() {
  const [notes, setNotes] = useState<Post[]>([]);

  useEffect(() => {
    // Sắp xếp bài viết mới nhất lên trên
    const sorted = [...getFieldNotes()].sort((a, b) => parseInt(b.year) - parseInt(a.year));
    setNotes(sorted);
  }, []);

  return (
    <Container className="py-24 max-w-5xl bg-background-primary">
      <div className="space-y-4 text-center mb-20">
        <span className="text-[10px] tracking-[0.35em] text-text-muted font-medium uppercase font-mono">Observations & Travel Journals</span>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-text-primary tracking-wide">FIELD NOTES</h1>
        <div className="w-8 h-[1px] bg-border-medium mx-auto mt-4" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {notes.map((note, idx) => {
          const snippet = note.bodyText.replace(/\n/g, ' ').trim();
          const title = note.title || (snippet.length > 50 ? snippet.substring(0, 50) + '...' : snippet);
          
          return (
            <motion.article 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: idx * 0.1 }}
              key={note.slug} 
              className="space-y-4 group"
            >
              <Link href={`/works/${note.slug}`} className="block space-y-4">
                <div className="aspect-[4/3] bg-background-secondary border border-border-light overflow-hidden relative shadow-sm">
                  {note.images.length > 0 ? (
                    <div 
                      className="w-full h-full bg-cover bg-center transition-all duration-700 filter grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0" 
                      style={{ backgroundImage: `url('${note.images[0]}')` }} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted font-serif italic text-xs">
                      No visual documentation
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-[9px] text-text-muted tracking-widest font-mono uppercase">
                    {note.year} — FIELD NOTE
                  </div>
                  <h2 className="font-serif text-xl font-light text-text-primary group-hover:text-text-secondary transition-colors leading-snug">
                    {title}
                  </h2>
                  <p className="text-xs text-text-secondary leading-[1.6] font-sans">
                    {snippet.substring(0, 140)}...
                  </p>
                </div>
              </Link>
            </motion.article>
          );
        })}
      </div>
    </Container>
  );
}
