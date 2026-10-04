import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useHotel } from '../context/HotelDataContext';
import { SmartImage } from './SmartImage';

export const Lightbox: React.FC = () => {
  const { lightbox, closeLightbox, nextLightbox, prevLightbox } = useHotel();

  useEffect(() => {
    if (!lightbox.isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen, closeLightbox, nextLightbox, prevLightbox]);

  if (!lightbox.isOpen || lightbox.items.length === 0) return null;

  const currentItem = lightbox.items[lightbox.index] || lightbox.items[0];

  return (
    <div
      className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Full screen image gallery viewer"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between text-white max-w-7xl w-full mx-auto">
        <div className="text-xs sm:text-sm font-medium text-white/80 tabular-nums">
          Photograph {lightbox.index + 1} of {lightbox.items.length} · Mountain Lodge Skardu
        </div>
        <button
          type="button"
          onClick={closeLightbox}
          className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
          aria-label="Close full-screen viewer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image Frame & Prev/Next Controls */}
      <div className="relative flex-1 flex items-center justify-center my-4 max-w-6xl w-full mx-auto overflow-hidden">
        {lightbox.items.length > 1 && (
          <button
            type="button"
            onClick={prevLightbox}
            className="absolute left-2 sm:left-4 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="max-h-[75vh] max-w-full flex items-center justify-center">
          <SmartImage
            src={currentItem.src}
            alt={currentItem.alt}
            fallbackLabel={currentItem.title}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
          />
        </div>

        {lightbox.items.length > 1 && (
          <button
            type="button"
            onClick={nextLightbox}
            className="absolute right-2 sm:right-4 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-black/85 text-white border border-white/20 flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-white"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Caption Bar */}
      <div className="max-w-3xl w-full mx-auto text-center pb-2">
        <h3 className="font-display text-xl sm:text-2xl text-white font-medium">
          {currentItem.title}
        </h3>
        {currentItem.description && (
          <p className="text-xs sm:text-sm text-white/75 mt-1">{currentItem.description}</p>
        )}
      </div>
    </div>
  );
};
