'use client';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';

export default function ContactPage() {
  return (
    <Container className="py-24 max-w-2xl text-center bg-background-primary flex flex-col justify-center min-h-[50vh] space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="space-y-4"
      >
        <span className="text-xs tracking-[0.35em] text-text-secondary font-mono font-bold uppercase block">Inquiries</span>
        <h1 className="font-serif text-4xl md:text-6xl font-medium text-text-primary tracking-wide">CONTACT</h1>
        <div className="w-16 h-[2px] bg-text-primary mx-auto mt-4" />
      </motion.div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg md:text-xl text-text-primary leading-relaxed font-serif italic max-w-xl mx-auto font-normal"
      >
        &ldquo;For research collaborations, archival inquiries, or exhibition planning, please reach out directly.&rdquo;
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="border-t-2 border-border-light pt-8 space-y-6 text-base max-w-sm mx-auto font-mono"
      >
        <div className="space-y-1">
          <span className="text-xs text-text-secondary tracking-widest block uppercase font-bold">Email</span>
          <a href="mailto:ngothithuyduyen@gmail.com" className="text-base text-text-primary hover:underline transition-all font-bold tracking-wide">
            ngothithuyduyen@gmail.com
          </a>
        </div>
        
        <div className="space-y-1 pt-2">
          <span className="text-xs text-text-secondary tracking-widest block uppercase font-bold">Instagram</span>
          <a href="https://instagram.com/ngothithuyduyen" target="_blank" rel="noopener noreferrer" className="text-base text-text-primary hover:underline transition-all font-bold tracking-wide">
            @ngothithuyduyen
          </a>
        </div>
      </motion.div>
    </Container>
  );
}
