'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useViewedImages } from '@/lib/context/ViewedImagesContext';

interface LightboxProps {
  images: string[];
  workSlug?: string;
}

export default function Lightbox({ images, workSlug }: LightboxProps) {
  const [index, setIndex] = useState<number | null>(null);
  const { markAsViewed, isViewed } = useViewedImages();

  // Automatically mark images and slug as viewed when this page/component is loaded
  useEffect(() => {
    if (workSlug) {
      markAsViewed(workSlug);
    }
    if (images.length > 0) {
      markAsViewed(images);
    }
  }, [workSlug, images, markAsViewed]);

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

  const handleOpenLightbox = (idx: number) => {
    markAsViewed(images[idx]);
    setIndex(idx);
  };

  return (
    <div className="space-y-6">
      {/* Main image grid */}
      <div className="space-y-6">
        {images.map((img, idx) => {
          const viewed = isViewed(img) || (workSlug && isViewed(workSlug));

          return (
            <motion.div 
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
              key={idx} 
              className="border border-border-light overflow-hidden bg-background-secondary cursor-zoom-in shadow-sm relative group"
              onClick={() => handleOpenLightbox(idx)}
            >
              <img 
                src={img} 
                alt={`Artwork image ${idx + 1}`} 
                className={`w-full h-auto transition-all duration-700 ${
                  viewed
                    ? 'filter grayscale-0 contrast-100'
                    : 'filter grayscale contrast-110 group-hover:grayscale-0'
                }`}
              />
              
              {/* Revealed Badge */}
              {viewed && (
                <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white/90 font-mono tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>REVEALED</span>
                </div>
              )}
            </motion.div>
          );
        })}
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
                alt={`Artwork lightbox preview ${index + 1}`} 
                className="max-h-[75vh] w-auto object-contain border border-border-light shadow-2xl filter grayscale-0"
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
