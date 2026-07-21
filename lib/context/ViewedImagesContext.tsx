'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ViewedImagesContextType {
  viewedIds: Set<string>;
  markAsViewed: (id: string | string[]) => void;
  isViewed: (id: string) => boolean;
}

const ViewedImagesContext = createContext<ViewedImagesContextType | undefined>(undefined);

const STORAGE_KEY = 'archive_viewed_images';

export function ViewedImagesProvider({ children }: { children: React.ReactNode }) {
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: string[] = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setViewedIds(new Set(parsed));
        }
      }
    } catch (e) {
      console.error('Failed to load viewed images from localStorage', e);
    }
    setIsHydrated(true);
  }, []);

  const markAsViewed = (idOrIds: string | string[]) => {
    const idsToMark = Array.isArray(idOrIds) ? idOrIds : [idOrIds];
    if (idsToMark.length === 0) return;

    setViewedIds(prev => {
      const next = new Set(prev);
      let changed = false;
      idsToMark.forEach(id => {
        if (id && !next.has(id)) {
          next.add(id);
          changed = true;
        }
      });

      if (changed) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
        } catch (e) {
          console.error('Failed to save viewed images to localStorage', e);
        }
        return next;
      }
      return prev;
    });
  };

  const isViewed = (id: string): boolean => {
    if (!isHydrated || !id) return false;
    return viewedIds.has(id);
  };

  return (
    <ViewedImagesContext.Provider value={{ viewedIds, markAsViewed, isViewed }}>
      {children}
    </ViewedImagesContext.Provider>
  );
}

export function useViewedImages() {
  const context = useContext(ViewedImagesContext);
  if (!context) {
    throw new Error('useViewedImages must be used within a ViewedImagesProvider');
  }
  return context;
}
