import React, { useState } from 'react';
import { Mountain } from 'lucide-react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackLabel?: string;
  priority?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  fallbackLabel,
  priority = false,
  className = '',
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#2B3B28] via-[#3D5237] to-[#1D281B] text-[#E6ECE2] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Mountain className="w-8 h-8 mb-2 opacity-80 stroke-[1.5]" />
        <span className="font-display text-base font-medium tracking-wide">
          {fallbackLabel || 'Mountain Lodge Skardu'}
        </span>
        <span className="text-xs text-[#C5D1BF] mt-1 max-w-xs line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-95'} ${className}`}
      {...rest}
    />
  );
};
