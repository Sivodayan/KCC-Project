import React, { useState, useEffect, useRef } from 'react';

/**
 * GlassImage Component
 * Drop-in replacement for standard <img> tags.
 * Displays a premium frosted glass loading placeholder with animated light shimmer
 * until the image finishes loading, then smoothly cross-fades the image in.
 */
export default function GlassImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  variant = 'light', // 'light' | 'dark' | 'emerald' | 'none'
  showIcon = true,
  fallbackSrc = '/assets/hero.jpg',
  aspectRatio,
  loading = 'lazy',
  style = {},
  imgStyle = {},
  onClick,
  onLoad: externalOnLoad,
  onError: externalOnError,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

  // Check if image is already cached by browser
  useEffect(() => {
    setIsLoaded(false);
    setIsError(false);

    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [src]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (externalOnLoad) externalOnLoad(e);
  };

  const handleError = (e) => {
    if (!isError && fallbackSrc && src !== fallbackSrc) {
      setIsError(true);
      // Attempt fallback image if provided
      if (imgRef.current) {
        imgRef.current.src = fallbackSrc;
      }
    } else {
      setIsError(true);
      setIsLoaded(true);
    }
    if (externalOnError) externalOnError(e);
  };

  const getPlaceholderSurface = () => {
    if (variant === 'dark') return 'glass-surface-dark glass-shimmer-dark';
    if (variant === 'emerald') return 'glass-surface-emerald glass-shimmer';
    if (variant === 'none') return 'bg-slate-200/50 glass-shimmer';
    return 'glass-surface glass-shimmer';
  };

  return (
    <div
      onClick={onClick}
      style={{
        aspectRatio: aspectRatio || undefined,
        ...style
      }}
      className={`relative overflow-hidden ${containerClassName}`}
    >
      {/* Frosted Glass Loading Placeholder with Instagram Swipe Wave */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 z-10 flex items-center justify-center transition-all duration-700 ease-out pointer-events-none ${getPlaceholderSurface()} ${
          isLoaded ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Subtle center glass icon */}
        {showIcon && !isLoaded && (
          <div
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl glass-pulse flex items-center justify-center border shadow-sm relative z-20 ${
              variant === 'dark'
                ? 'bg-white/10 border-white/20 text-brand-pale/70'
                : 'bg-white/70 border-white/80 text-brand-forest/60'
            }`}
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      {/* Actual Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        style={imgStyle}
        className={`${className} transition-opacity duration-700 ease-out ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
}
