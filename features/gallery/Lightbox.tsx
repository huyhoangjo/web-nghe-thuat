'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Lightbox({ images }: { images: string[] }) {
  const [index, setIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return (
      <div className="aspect-[4/3] bg-background-secondary border border-border-light flex items-center justify-center">
        <span className="text-xs text-text-muted font-mono tracking-widest">NO IMAGES AVAILABLE</span>
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index !== null) {
      setIndex((index - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (index !== null) {
      setIndex((index + 1) % images.length);
    }
  };

  return (
    <div className="space-y-6">
      {/* Main image grid */}
      <div className="space-y-6">
        {images.map((img, idx) => (
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3 }}
            key={idx} 
            className="border border-border-light overflow-hidden bg-background-secondary cursor-zoom-in shadow-sm"
            onClick={() => setIndex(idx)}
          >
            <img 
              src={img} 
              alt={`Artwork image ${idx + 1}`} 
              className="w-full h-auto filter grayscale contrast-105 hover:grayscale-0 transition-all duration-700" 
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {index !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background-primary/98 backdrop-blur-md z-[100] flex items-center justify-center p-6 cursor-zoom-out"
            onClick={() => setIndex(null)}
          >
            {/* Close Button */}
            <button 
              className="absolute top-6 right-6 text-text-primary hover:opacity-75 transition-opacity"
              onClick={() => setIndex(null)}
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button 
                  className="absolute left-6 text-text-primary hover:opacity-75 transition-opacity p-2 border border-border-light rounded-full bg-background-primary shadow-sm"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  className="absolute right-6 text-text-primary hover:opacity-75 transition-opacity p-2 border border-border-light rounded-full bg-background-primary shadow-sm"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            {/* Modal Image */}
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="max-w-5xl max-h-[80vh] flex flex-col items-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={images[index]} 
                alt="Enlarged artwork view" 
                className="max-w-full max-h-[75vh] object-contain border border-border-light filter grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <span className="text-[10px] tracking-widest text-text-muted font-mono">
                {index + 1} / {images.length}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
