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
    <Container className="py-24 max-w-3xl bg-background-primary">
      <div className="space-y-4 text-center mb-20">
        <span className="text-[10px] tracking-[0.35em] text-text-muted font-medium uppercase font-mono">Critical Texts & Reviews</span>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-text-primary tracking-wide">PUBLICATIONS</h1>
        <div className="w-8 h-[1px] bg-border-medium mx-auto mt-4" />
      </div>
      
      <div className="space-y-24">
        {pubs.length > 0 ? (
          pubs.map((pub, idx) => {
            return (
              <motion.article 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: idx * 0.15 }}
                key={pub.slug} 
                className="border-b border-border-light pb-16 space-y-6"
              >
                <div className="flex justify-between items-center text-[10px] text-text-muted tracking-widest font-mono uppercase">
                  <span>{pub.year} — ARTICLE</span>
                  <span>Original: English/Vietnamese</span>
                </div>
                <h2 className="font-serif text-3xl font-light text-text-primary leading-tight">
                  {pub.title || "Critical Review Text"}
                </h2>
                
                {/* Body content parsed from Blogger HTML */}
                <div 
                  dangerouslySetInnerHTML={{ __html: pub.bodyHtml }} 
                  className="text-sm text-text-secondary leading-[1.8] font-serif space-y-4 prose-custom" 
                />
              </motion.article>
            );
          })
        ) : (
          <div className="text-center text-text-muted text-sm italic font-serif">
            No critical texts or reviews found.
          </div>
        )}
      </div>
    </Container>
  );
}
