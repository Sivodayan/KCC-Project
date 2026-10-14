import React, { useState, useEffect, useRef, useCallback } from 'react';

const journalGallery = [
  {
    src: "assets/gal_(1).jpeg",
    titleEn: "Historic Main Hall & Campus Heritage",
    titleTa: "வரலாற்றுச் சிறப்புமிக்க பிரதான மண்டபம்",
    desc: "The venerated colonial-era architecture and administrative center standing tall since 1852."
  },
  {
    src: "assets/gal_(2).jpeg",
    titleEn: "Annual Sports Meet & Athletic Parade",
    titleTa: "இல்ல மெய்வல்லுநர் விளையாட்டு விழா",
    desc: "Spectacular student march past and track competitions representing our four historic houses."
  },
  {
    src: "assets/gal_(3).jpeg",
    titleEn: "Collegiate Assembly & Morning Devotion",
    titleTa: "காலை ஆராதனை மற்றும் ஒன்றுகூடல்",
    desc: "Instilling discipline, spiritual grounding, and institutional pride in the student body."
  },
  {
    src: "assets/gal_(4).jpeg",
    titleEn: "Advanced Science Laboratory Sessions",
    titleTa: "விஞ்ஞான ஆய்வுகூட பரிசோதனைகள்",
    desc: "Hands-on physics, chemistry, and biology experiments empowering future scientists."
  },
  {
    src: "assets/gal_(5).jpeg",
    titleEn: "Cultural Celebrations & Traditional Arts",
    titleTa: "கலை, கலாசார பெருவிழாக்கள்",
    desc: "Vibrant festivities celebrating Tamil heritage, music, drama, and folklore traditions."
  },
  {
    src: "assets/gal_(6).jpeg",
    titleEn: "Annual Prize Giving & Honors Day",
    titleTa: "வருடாந்த பரிசளிப்பு விழா",
    desc: "Recognizing stellar academic, co-curricular, and moral achievements of top scholars."
  },
  {
    src: "assets/gal_(7).jpeg",
    titleEn: "College Library & Knowledge Sanctuary",
    titleTa: "நூலகமும் அமைதியான கற்றல் சூழலும்",
    desc: "Vast collection of reference volumes, literature, and quiet zones for focused study."
  },
  {
    src: "assets/gal_(8).jpeg",
    titleEn: "ICT Center & Smart Digital Learning",
    titleTa: "தகவல் தொடர்பாடல் தொழினுட்ப மையம்",
    desc: "Equipped modern computer labs nurturing coding, digital literacy, and modern IT skills."
  },
  {
    src: "assets/gal_(9).jpeg",
    titleEn: "Lush Campus Canopy & Courtyard Life",
    titleTa: "பசுமை வளாகமும் மரநிழல் சூழலும்",
    desc: "Picturesque shady green walkways fostering camaraderie and serene collegiate life."
  },
  {
    src: "assets/gal_(10).jpeg",
    titleEn: "Student Leadership & Prefects Guild",
    titleTa: "மாணவர் தலைவர் கழகம்",
    desc: "Nurturing exemplary integrity, leadership, duty, and service to our community."
  },
  {
    src: "assets/gal_(11).jpeg",
    titleEn: "Community Service & Eco Initiatives",
    titleTa: "சமூக நற்பணி மற்றும் சூழல் பாதுகாப்பு",
    desc: "Active scouting, environmental drives, and social responsibility initiatives."
  }
];

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredSide, setHoveredSide] = useState(null); // 'prev' | 'next' | null

  const stageRef = useRef(null);
  const sectionRef = useRef(null);

  const total = journalGallery.length;

  const focusIndex = useCallback((targetIndex) => {
    if (!hasEntered) {
      setHasEntered(true);
      setIsEntering(false);
    }
    const safeIndex = ((targetIndex % total) + total) % total;
    setCurrentIndex(safeIndex);
  }, [hasEntered, total]);

  // Entrance Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          setIsEntering(true);
          setTimeout(() => {
            setIsEntering(false);
          }, 1100);
          observer.disconnect();
        }
      });
    }, { threshold: 0.12 });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const fallbackTimer = setTimeout(() => {
      setHasEntered(true);
    }, 1200);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Continuous Auto-rotation (pauses on hover or inactive tab)
  useEffect(() => {
    if (!hasEntered || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % total);
    }, 3800);

    return () => clearInterval(interval);
  }, [hasEntered, isPaused, total]);

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
      className="py-16 sm:py-24 bg-[#0a1c11] text-brand-white relative overflow-hidden select-none border-t border-b border-brand-forest/40"
      id="gallery"
    >
      {/* Ambient Lighting Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-forest/25 rounded-full blur-[120px]" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[900px] h-[250px] bg-brand-forest/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Gallery Header */}
        <div className="text-center pb-2 mb-6 reveal-item">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Campus Life Gallery
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1.5 text-xs text-brand-pale">
            <span className="font-tamil">கல்லூரி நினைவுகள் & புகைப்படத் தொகுப்பு</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-0.5 rounded-full text-[11px] font-mono text-white">
              {currentIndex + 1} of {total} Moments
            </span>
          </div>
        </div>

        {/* 3D Carousel Stage Area */}
        <div className="relative w-full py-4 sm:py-6 flex flex-col items-center justify-center">
          {/* Previous Slide Floating Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              focusIndex(currentIndex - 1);
            }}
            aria-label="Previous image"
            className="hidden sm:flex absolute left-3 lg:left-8 z-40 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-brand-forest border border-white/20 text-white items-center justify-center transition-all duration-200 hover:scale-110 shadow-xl cursor-pointer backdrop-blur-xs"
          >
            <svg className="w-5 h-5 -translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Slide Floating Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              focusIndex(currentIndex + 1);
            }}
            aria-label="Next image"
            className="hidden sm:flex absolute right-3 lg:right-8 z-40 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-brand-forest border border-white/20 text-white items-center justify-center transition-all duration-200 hover:scale-110 shadow-xl cursor-pointer backdrop-blur-xs"
          >
            <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* 3D Perspective Viewport */}
          <div
            ref={stageRef}
            onClick={handleStageClick}
            onMouseMove={handleStageMouseMove}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              setIsPaused(false);
              handleStageMouseLeave();
            }}
            className="journal-stage relative w-full max-w-6xl h-[360px] sm:h-[450px] lg:h-[520px] flex items-center justify-center cursor-pointer"
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
          <div className="w-[85%] max-w-4xl h-10 mx-auto -mt-6 bg-black/60 rounded-full blur-2xl pointer-events-none" />

          {/* Active Moment Caption & Narrative */}
          <div key={currentIndex} className="animate-caption mt-6 text-center max-w-2xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-forest/70 border border-brand-soft/40 text-xs text-brand-pale mb-2 backdrop-blur-xs">
              <span className="font-tamil">{journalGallery[currentIndex].titleTa}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {journalGallery[currentIndex].titleEn}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed font-normal">
              {journalGallery[currentIndex].desc}
            </p>
          </div>

          {/* Single Clean Interactive Indicator Dots */}
          <div className="mt-7 flex items-center justify-center gap-2 flex-wrap max-w-md mx-auto" id="journalDots">
            {journalGallery.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => focusIndex(i)}
                title={`Moment ${i + 1} of ${total}`}
                aria-label={`Go to image ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
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
