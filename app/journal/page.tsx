'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getJournalEntries } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';

export default function JournalPage() {
  const [entries, setEntries] = useState<Post[]>([]);

  useEffect(() => {
    // Sắp xếp bài viết mới nhất lên trên
    const sorted = [...getJournalEntries()].sort((a, b) => {
      const yearA = parseInt(a.year);
      const yearB = parseInt(b.year);
      return yearB - yearA;
    });
    setEntries(sorted);
  }, []);

  return (
    <Container className="py-24 max-w-4xl bg-background-primary">
      <div className="space-y-4 text-center mb-20">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          Writings & Reflections
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-wide">
          JOURNAL
        </h1>
        <div className="w-16 h-[2px] bg-text-primary mx-auto mt-4" />
      </div>
      
      <div className="space-y-20">
        {entries.map((entry, idx) => {
          const snippet = entry.bodyText.replace(/\n/g, ' ').trim();
          const title = entry.title || (snippet.length > 60 ? snippet.substring(0, 60) + '...' : snippet);
          
          return (
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              key={entry.slug} 
              className="border-b-2 border-border-light pb-12 space-y-4"
            >
              <div className="text-xs text-text-secondary tracking-widest font-mono font-bold">{entry.date}</div>
              <h2 className="font-serif text-3xl font-medium text-text-primary hover:text-text-secondary transition-colors leading-snug">
                <Link href={`/works/${entry.slug}`}>{title}</Link>
              </h2>
              <p className="text-lg md:text-xl text-text-primary leading-relaxed font-serif italic font-normal">
                {snippet.substring(0, 240)}...
              </p>
              <div className="pt-2">
                <Link 
                  href={`/works/${entry.slug}`} 
                  className="text-xs tracking-widest text-text-primary font-mono font-bold hover:opacity-70 transition-opacity underline underline-offset-4"
                >
                  READ REFLECTION →
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </Container>
  );
}
