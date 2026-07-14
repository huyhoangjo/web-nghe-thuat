'use client';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export default function ContactPage() {
  return (
    <Container className="py-24 max-w-xl text-center bg-background-primary flex flex-col justify-center min-h-[50vh] space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="space-y-4"
      >
        <span className="text-[10px] tracking-[0.35em] text-text-muted font-medium uppercase font-mono block">Inquiries</span>
        <h1 className="font-serif text-4xl md:text-5xl font-light text-text-primary tracking-wide">CONTACT</h1>
        <div className="w-8 h-[1px] bg-border-medium mx-auto mt-4" />
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="text-sm text-text-secondary leading-relaxed font-serif italic max-w-md mx-auto"
      >
        &ldquo;For research collaborations, archival inquiries, or exhibition planning, please reach out directly.&rdquo;
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="border-t border-border-light pt-8 space-y-6 text-sm max-w-xs mx-auto"
      >
        <div className="space-y-1">
          <span className="text-[9px] text-text-muted tracking-widest block uppercase font-mono">Email</span>
          <a href="mailto:ngothithuyduyen@gmail.com" className="text-sm text-text-primary hover:opacity-75 transition-opacity underline underline-offset-4 tracking-wide font-sans">
            ngothithuyduyen@gmail.com
          </a>
        </div>
        
        <div className="space-y-1 pt-2">
          <span className="text-[9px] text-text-muted tracking-widest block uppercase font-mono">Instagram</span>
          <a href="https://instagram.com/ngothithuyduyen" target="_blank" rel="noopener noreferrer" className="text-sm text-text-primary hover:opacity-75 transition-opacity underline underline-offset-4 tracking-wide font-sans">
            @ngothithuyduyen
          </a>
        </div>
      </motion.div>
    </Container>
  );
}
