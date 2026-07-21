'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPublications } from '@/lib/repositories/postRepository';
import { Container } from '@/components/ui/Container';
import { Post } from '@/lib/types/post';

export default function PublicationsPage() {
  const [pubs, setPubs] = useState<Post[]>([]);

  useEffect(() => {
    setPubs(getPublications());
  }, []);

  return (
    <Container className="py-24 max-w-4xl bg-background-primary">
      <div className="space-y-4 text-center mb-20">
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">
          Critical Texts & Reviews
        </span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-wide">
          PUBLICATIONS
        </h1>
        <div className="w-16 h-[2px] bg-text-primary mx-auto mt-4" />
      </div>
      
      <div className="space-y-24">
        {pubs.length > 0 ? (
          pubs.map((pub, idx) => {
            return (
              <motion.article 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                key={pub.slug} 
                className="border-b-2 border-border-light pb-16 space-y-6"
              >
                <div className="flex justify-between items-center text-xs text-text-secondary tracking-widest font-mono font-bold uppercase">
                  <span>{pub.year} — ARTICLE</span>
                  <span>Original: English/Vietnamese</span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium text-text-primary leading-tight">
                  {pub.title || "Critical Review Text"}
                </h2>
                
                {/* Body content parsed from Blogger HTML */}
                <div 
                  dangerouslySetInnerHTML={{ __html: pub.bodyHtml || pub.bodyText || '' }} 
                  className="text-lg md:text-xl text-text-primary leading-relaxed font-serif space-y-4 font-normal" 
                />
              </motion.article>
            );
          })
        ) : (
          <div className="text-center text-text-secondary text-base italic font-serif font-bold">
            No critical texts or reviews found.
          </div>
        )}
      </div>
    </Container>
  );
}
