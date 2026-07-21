'use client';
import React from 'react';
import { useViewedImages } from '@/lib/context/ViewedImagesContext';

interface ArchiveImageProps {
  src: string;
  alt: string;
  id: string; // Identifier for viewed tracking (slug or image path)
  className?: string;
  imageClassName?: string;
  aspectRatio?: string; // e.g. "aspect-[4/5]", "aspect-square", "aspect-[16/9]"
  onClick?: () => void;
  showBadge?: boolean;
  priority?: boolean;
}

export const ArchiveImage: React.FC<ArchiveImageProps> = ({
  src,
  alt,
  id,
  className = '',
  imageClassName = '',
  aspectRatio = 'aspect-[4/5]',
  onClick,
  showBadge = true,
}) => {
  const { isViewed, markAsViewed } = useViewedImages();
  const viewed = isViewed(id);

  const handleClick = () => {
    markAsViewed(id);
    if (onClick) onClick();
  };

  return (
    <div
      onClick={handleClick}
      className={`relative overflow-hidden group cursor-pointer transition-all duration-500 ${aspectRatio} ${className}`}
    >
      <div
        className={`w-full h-full bg-cover bg-center transition-all duration-700 ease-out transform group-hover:scale-105 ${
          viewed
            ? 'filter grayscale-0 contrast-100'
            : 'filter grayscale contrast-110 group-hover:grayscale-0 group-hover:contrast-100'
        } ${imageClassName}`}
        style={{ backgroundImage: `url('${src}')` }}
        role="img"
        aria-label={alt}
      />

      {/* Subtle overlay vignette on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Subtle "Revealed / Đã khám phá" dot badge when viewed */}
      {viewed && showBadge && (
        <div className="absolute top-3 right-3 flex items-center space-x-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white/90 font-mono tracking-wider opacity-80 group-hover:opacity-100 transition-opacity">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>REVEALED</span>
        </div>
      )}
    </div>
  );
};
