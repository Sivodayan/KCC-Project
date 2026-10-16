import React, { useState, useEffect, useRef, useCallback } from 'react';

const journalGallery = [
  {
    src: "/assets/gal_(1).jpeg",

  },
  {
    src: "/assets/gal_(2).jpeg",

  },
  {
    src: "/assets/gal_(3).jpeg",

  },
  {
    src: "/assets/gal_(4).jpeg",

  },
  {
    src: "/assets/gal_(5).jpeg",

  },
  {
    src: "/assets/gal_(6).jpeg",

  },
  {
    src: "/assets/gal_(7).jpeg",


  },
  {
    src: "/assets/gal_(8).jpeg",

  },
  {
    src: "/assets/gal_(9).jpeg",

  },
  {
    src: "/assets/gal_(10).jpeg",

  },
  {
    src: "/assets/gal_(11).jpeg",
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash.toLowerCase() === '#gallery';
    }
    return false;
  });
  const [isEntering, setIsEntering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hoveredSide, setHoveredSide] = useState(null); // 'prev' | 'next' | null

  const stageRef = useRef(null);
  const sectionRef = useRef(null);
  const initialSlideTimerRef = useRef(null);

  const total = journalGallery.length;

  const focusIndex = useCallback((targetIndex) => {
    if (!hasEntered) {
      setHasEntered(true);
      setIsEntering(false);
    }
    const safeIndex = ((targetIndex % total) + total) % total;
    setCurrentIndex(safeIndex);
  }, [hasEntered, total]);

  // Entrance & In-View Observer: Triggers when visitor enters the gallery section
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);

          if (!hasEntered) {
            setHasEntered(true);
            setIsEntering(true);

            // 3D Fan-in entrance animation duration
            setTimeout(() => {
              setIsEntering(false);
            }, 700);

            // Start slideshow shortly after entering section
            if (initialSlideTimerRef.current) clearTimeout(initialSlideTimerRef.current);
            initialSlideTimerRef.current = setTimeout(() => {
              setCurrentIndex(prev => (prev + 1) % total);
            }, 400);
          }
        } else {
          setIsInView(false);
        }
      });
    }, { threshold: 0.05 });

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (initialSlideTimerRef.current) clearTimeout(initialSlideTimerRef.current);
    };
  }, [hasEntered, total]);

  // Continuous Auto-rotation (runs when entered and in view; does not pause on hover)
  useEffect(() => {
    if (!hasEntered || !isInView || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 3200);

    return () => clearInterval(interval);
  }, [hasEntered, isInView, isPaused, total]);

  // Pause when tab is not active
  useEffect(() => {
    function handleVisibility() {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    }
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Keyboard navigation for Left/Right arrows
  useEffect(() => {
    function handleKeyDown(e) {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.key === 'ArrowLeft') {
        focusIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        focusIndex(currentIndex + 1);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, focusIndex]);

  // Touch Swipe
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let touchStartX = 0;
    let touchStartY = 0;

    function handleTouchStart(e) {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    }

    function handleTouchEnd(e) {
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = touchEndX - touchStartX;
      const diffY = touchEndY - touchStartY;

      if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 2) {
        focusIndex(currentIndex + (diffX < 0 ? 1 : -1));
      }
    }

    stage.addEventListener('touchstart', handleTouchStart, { passive: true });
    stage.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      stage.removeEventListener('touchstart', handleTouchStart);
      stage.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, focusIndex]);

  // Mouse Move on Stage for Hover-to-Zoom on Prev/Next zones
  const handleStageMouseMove = (e) => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    const centerX = stageRect.left + stageRect.width / 2;
    const mouseX = e.clientX;

    const cardHalfWidth = 260;
    if (mouseX < centerX - cardHalfWidth + 50) {
      setHoveredSide('prev');
    } else if (mouseX > centerX + cardHalfWidth - 50) {
      setHoveredSide('next');
    } else {
      setHoveredSide(null);
    }
  };

  const handleStageMouseLeave = () => {
    setHoveredSide(null);
  };

  const handleStageClick = (e) => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    const centerX = stageRect.left + stageRect.width / 2;
    const clickX = e.clientX;
    const cardHalfWidth = 260;

    if (clickX < centerX - cardHalfWidth + 50) {
      focusIndex(currentIndex - 1);
    } else if (clickX > centerX + cardHalfWidth - 50) {
      focusIndex(currentIndex + 1);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-8 sm:py-12 bg-[#0a1c11] text-brand-white relative overflow-hidden select-none border-t border-b border-brand-forest/40 scroll-mt-20 sm:scroll-mt-24"
      id="gallery"
    >
      {/* Ambient Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-forest/25 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[250px] bg-brand-forest/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 3D Carousel Stage Area */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* 3D Perspective Viewport */}
          <div
            ref={stageRef}
            onClick={handleStageClick}
            onMouseMove={handleStageMouseMove}
            onMouseLeave={handleStageMouseLeave}
            className="journal-stage relative w-full max-w-6xl h-[340px] sm:h-[380px] lg:h-[400px] flex items-center justify-center cursor-pointer"
          >
            {journalGallery.map((item, index) => {
              let offset = index - currentIndex;
              if (offset > Math.floor(total / 2)) offset -= total;
              if (offset < -Math.floor(total / 2)) offset += total;
              const absOffset = Math.abs(offset);

              let style = {};
              let extraClasses = '';

              if (!hasEntered) {
                // Collapsed initial layout before fan-in
                const dir = offset > 0 ? 1 : (offset < 0 ? -1 : 0);
                if (offset === 0) {
                  style = {
                    transform: 'translateX(0) scale(0.85) rotateY(0deg) translateZ(-60px)',
                    opacity: 0,
                    zIndex: 30
                  };
                } else {
                  style = {
                    transform: `translateX(${dir * 18}%) scale(0.65) rotateY(${dir * -12}deg) translateZ(-140px)`,
                    opacity: 0,
                    zIndex: 10
                  };
                }
              } else {
                // 3D curved layout
                if (offset === 0) {
                  extraClasses += ' is-active-center';
                  style = {
                    transform: 'translateX(0) scale(1) rotateY(0deg) translateZ(0)',
                    zIndex: 30,
                    opacity: 1,
                    filter: 'none',
                    pointerEvents: 'auto',
                    cursor: 'default'
                  };
                } else if (absOffset === 1) {
                  const dir = offset > 0 ? 1 : -1;
                  const isNavNext = dir > 0;
                  extraClasses += isNavNext ? ' is-nav-next' : ' is-nav-prev';
                  if ((isNavNext && hoveredSide === 'next') || (!isNavNext && hoveredSide === 'prev')) {
                    extraClasses += ' is-hover-zoomed';
                  }

                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const tx = isMobile ? dir * 48 : dir * 64;
                  const rotY = dir * -25;
                  style = {
                    transform: `translateX(${tx}%) scale(0.85) rotateY(${rotY}deg) translateZ(-80px)`,
                    zIndex: 20,
                    opacity: 0.85,
                    filter: 'brightness(0.85)',
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  };
                } else if (absOffset === 2) {
                  const dir = offset > 0 ? 1 : -1;
                  const isNavNext = dir > 0;
                  extraClasses += isNavNext ? ' is-nav-next' : ' is-nav-prev';
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const tx = isMobile ? dir * 80 : dir * 110;
                  const rotY = dir * -38;
                  style = {
                    transform: `translateX(${tx}%) scale(0.70) rotateY(${rotY}deg) translateZ(-160px)`,
                    zIndex: 15,
                    opacity: isMobile ? 0 : 0.55,
                    filter: 'brightness(0.7)',
                    pointerEvents: isMobile ? 'none' : 'auto',
                    cursor: 'pointer'
                  };
                } else if (absOffset === 3) {
                  const dir = offset > 0 ? 1 : -1;
                  extraClasses += dir > 0 ? ' is-nav-next' : ' is-nav-prev';
                  const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
                  const tx = isMobile ? dir * 95 : dir * 150;
                  const rotY = dir * -48;
                  style = {
                    transform: `translateX(${tx}%) scale(0.58) rotateY(${rotY}deg) translateZ(-240px)`,
                    zIndex: 10,
                    opacity: isMobile ? 0 : 0.25,
                    filter: 'brightness(0.55)',
                    pointerEvents: isMobile ? 'none' : 'auto',
                    cursor: 'pointer'
                  };
                } else {
                  const dir = offset > 0 ? 1 : -1;
                  style = {
                    transform: `translateX(${dir * 180}%) scale(0.4) rotateY(${dir * -60}deg) translateZ(-350px)`,
                    zIndex: 1,
                    opacity: 0,
                    pointerEvents: 'none',
                    cursor: 'default'
                  };
                }
              }

              if (isEntering) {
                extraClasses += ' is-entering';
              }

              return (
                <div
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    focusIndex(index);
                  }}
                  style={style}
                  className={`journal-card rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 group ${extraClasses}`}
                  title={
                    offset === 0
                      ? `Current image (${index + 1} of ${total})`
                      : offset === 1
                        ? 'Next image (Click to focus)'
                        : offset === -1
                          ? 'Previous image (Click to focus)'
                          : 'Click to focus this image'
                  }
                >
                  <div className="relative w-full h-full overflow-hidden rounded-3xl">
                    <img
                      src={item.src}
                      alt={`Campus Gallery Photo ${index + 1}`}
                      className="journal-img"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floor Shadow beneath curved cards */}
          <div className="w-[85%] max-w-3xl h-8 mx-auto -mt-4 bg-black/60 rounded-full blur-xl pointer-events-none" />

          {/* Single Clean Interactive Indicator Dots */}
          <div className="mt-5 sm:mt-6 flex items-center justify-center gap-2 flex-wrap max-w-md mx-auto" id="journalDots">
            {journalGallery.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => focusIndex(i)}
                title={`Moment ${i + 1} of ${total}`}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === currentIndex
                    ? 'bg-white w-8 shadow-md'
                    : 'bg-white/35 hover:bg-white/70 w-2.5'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
