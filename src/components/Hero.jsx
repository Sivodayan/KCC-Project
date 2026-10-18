import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';
import GlassImage from './GlassImage.jsx';

export default function Hero({ onExploreHistory }) {
  const { content } = useSiteContent();
  const hero = content?.hero || {};

  const title = hero.title || "J/Kopay Christian College";
  const tamilTitle = hero.tamilTitle || "யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி";
  const subtitle = hero.subtitle || "A well-established mixed school in Kopay, Jaffna, dedicated to delivering holistic secondary and collegiate education.";
  const image = hero.image || "/assets/hero.jpg";
  const buttonText = hero.buttonText || "Explore History";

  const handleScrollToPrinciples = (e) => {
    e.preventDefault();
    const el = document.getElementById('principles');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-5 sm:py-8 bg-brand-white dark:bg-[#0b120c] border-b border-brand-pale dark:border-emerald-950/60 scroll-mt-20 sm:scroll-mt-24 transition-colors" id="about">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest dark:bg-[#071309] shadow-2xl dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),_0_0_35px_rgba(74,222,128,0.12)] border border-brand-soft/40 dark:border-emerald-500/30 min-h-[520px] lg:min-h-[580px] flex items-center">
          
          {/* Background School Archway Image Container */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <GlassImage
              src={image}
              alt={`${title} School`}
              variant="dark"
              loading="eager"
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-top scale-105 sm:scale-110 lg:scale-100 origin-center translate-x-[4%] sm:translate-x-[8%] lg:translate-x-[16%] brightness-[0.94] contrast-[1.04]"
              fallbackSrc="/assets/hero.jpg"
            />
            
            {/* Desktop Scrim: Multi-stop optical easing curve that seamlessly dissolves into the campus photo */}
            <div className="hidden sm:block absolute inset-0 hero-scrim-desktop pointer-events-none" />
            
            {/* Mobile Scrim: Top-to-bottom gentle fade preventing text clash */}
            <div className="sm:hidden absolute inset-0 hero-scrim-mobile pointer-events-none" />
            
            {/* Ambient Lighting Vignette: Subtle radial spotlight behind typography + grounded bottom shadow */}
            <div className="absolute inset-0 hero-ambient-vignette pointer-events-none" />
          </div>

          {/* Hero Typography & Content */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 lg:py-16 text-left">
            {/* Heritage Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/12 dark:bg-emerald-950/70 border border-white/20 dark:border-emerald-500/40 text-brand-pale dark:text-emerald-300 text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-5 backdrop-blur-md shadow-2xs animate-hero-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 dark:bg-emerald-300 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
              <span>Est. 1852 • Kopay, Jaffna, Sri Lanka</span>
            </div>

            <div className="space-y-3 mb-5 animate-hero-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-white tracking-tight leading-[1.14] drop-shadow-xs">
                {title}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-pale dark:text-emerald-200 font-tamil tracking-tight leading-snug drop-shadow-xs">
                {tamilTitle}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-emerald-50/95 dark:text-emerald-100/85 max-w-xl leading-relaxed mb-8 font-normal animate-hero-2">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 animate-hero-3">
              <button
                type="button"
                onClick={onExploreHistory}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-brand-white text-brand-forest hover:bg-emerald-50 font-bold shadow-md hover:shadow-lg transition-all duration-200 ease-out transform-gpu text-sm sm:text-base cursor-pointer select-none active:scale-[0.98]"
              >
                <span>{buttonText}</span>
                <svg
                  className="w-4 h-4 text-brand-forest transition-transform duration-200 ease-out group-hover:translate-x-1.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleScrollToPrinciples}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 dark:bg-emerald-950/50 hover:bg-white/20 dark:hover:bg-emerald-900/60 text-white font-semibold border border-white/25 dark:border-emerald-500/40 backdrop-blur-md transition-all text-sm sm:text-base cursor-pointer select-none active:scale-[0.98]"
              >
                <span>Motto &amp; Vision</span>
                <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Quick Legacy Metrics */}
            <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-white/15 dark:border-emerald-900/40 flex items-center gap-6 sm:gap-8 text-white animate-hero-3 flex-wrap">
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-2xs">170+</span>
                <span className="text-[10px] sm:text-[11px] text-brand-pale/90 dark:text-emerald-300/80 uppercase tracking-wider font-semibold">Years of Legacy</span>
              </div>
              <div className="w-px h-8 bg-white/20 dark:bg-emerald-800/40" />
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-2xs">1852</span>
                <span className="text-[10px] sm:text-[11px] text-brand-pale/90 dark:text-emerald-300/80 uppercase tracking-wider font-semibold">Founded by CMS</span>
              </div>
              <div className="w-px h-8 bg-white/20 dark:bg-emerald-800/40" />
              <div>
                <span className="block text-2xl sm:text-3xl font-extrabold tracking-tight text-white drop-shadow-2xs">6 to 13</span>
                <span className="text-[10px] sm:text-[11px] text-brand-pale/90 dark:text-emerald-300/80 uppercase tracking-wider font-semibold">Secondary &amp; A/L</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
