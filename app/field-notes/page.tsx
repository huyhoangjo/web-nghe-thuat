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
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          Observations & Travel Journals
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary hover-gold transition-colors tracking-wide cursor-default">
          FIELD NOTES
        </h1>
        <div className="w-16 h-[2px] bg-text-primary mx-auto mt-4" />
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
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              key={note.slug} 
              className="space-y-4 group"
            >
              <Link href={`/works/${note.slug}`} className="block space-y-4">
                <div className="aspect-[4/3] bg-background-secondary border-2 border-border-medium overflow-hidden relative shadow-sm">
                  {note.images.length > 0 ? (
                    <div 
                      className="w-full h-full bg-cover bg-center transition-all duration-700 filter grayscale contrast-110 group-hover:scale-105 group-hover:grayscale-0" 
                      style={{ backgroundImage: `url('${note.images[0]}')` }} 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-secondary font-serif italic text-sm font-bold">
                      No visual documentation
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="text-xs text-text-secondary tracking-widest font-mono font-bold uppercase">
                    {note.year} — FIELD NOTE
                  </div>
                  <h2 className="font-serif text-2xl text-text-primary group-hover:text-text-secondary transition-colors font-medium leading-snug">
                    {title}
                  </h2>
                  <p className="text-base text-text-primary leading-relaxed font-serif font-normal">
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
