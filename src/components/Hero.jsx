import React from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

export default function Hero({ onExploreHistory }) {
  const { content } = useSiteContent();
  const hero = content?.hero || {};

  const title = hero.title || "J/Kopay Christian College";
  const tamilTitle = hero.tamilTitle || "யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி";
  const subtitle = hero.subtitle || "A well-established mixed school in Kopay, Jaffna, dedicated to delivering holistic secondary and collegiate education.";
  const image = hero.image || "/assets/hero.jpg";
  const buttonText = hero.buttonText || "Explore History";

  return (
    <section className="py-6 sm:py-8 bg-brand-white border-b border-brand-pale scroll-mt-20 sm:scroll-mt-24" id="about">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-brand-forest shadow-md border border-brand-soft/40 min-h-[500px] lg:min-h-[560px] flex items-center">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src={image}
              alt={`${title} School`}
              className="w-full h-full object-cover object-top scale-110 sm:scale-115 lg:scale-100 origin-top translate-x-[10%] sm:translate-x-[13%] lg:translate-x-[25%]"
              loading="eager"
              onError={(e) => {
                e.target.src = "/assets/hero.jpg";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-forest via-brand-forest/90 via-35% to-transparent to-60%" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/95 via-brand-forest/30 to-transparent sm:hidden" />
          </div>

          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 lg:py-16 text-left">
            <div className="space-y-3 mb-5 animate-hero-1">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-white tracking-tight leading-[1.15]">
                {title}
              </h1>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-pale font-tamil tracking-tight leading-snug">
                {tamilTitle}
              </h2>
            </div>

            <p className="text-base sm:text-lg text-brand-light/90 max-w-xl leading-relaxed mb-8 font-normal animate-hero-2">
              {subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 animate-hero-3">
              <button
                type="button"
                onClick={onExploreHistory}
                className="group relative inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-brand-white text-brand-forest font-semibold shadow-sm hover:shadow-md hover:bg-brand-light/95 transition-all duration-200 ease-out transform-gpu text-sm sm:text-base cursor-pointer select-none active:scale-[0.98]"
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
