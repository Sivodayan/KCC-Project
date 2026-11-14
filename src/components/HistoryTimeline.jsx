import React, { useEffect } from 'react';
import GlassImage from './GlassImage.jsx';
import { useSiteContent } from '../context/SiteContentContext.jsx';

function MilestoneCard({ m, idx, lang }) {
  const isTa = lang === 'ta';
  const isAlternate = idx % 2 === 1;
  const yearDisplay = isTa ? (m.yearTa || m.year) : (m.year || m.yearTa);
  const titleDisplay = isTa ? (m.titleTa || m.titleEn) : (m.titleEn || m.titleTa);
  const descDisplay = isTa ? (m.descTa || m.descEn) : (m.descEn || m.descTa);
  const quoteDisplay = isTa ? (m.quoteTa || m.quoteEn) : (m.quoteEn || m.quoteTa);
  const paragraphs = (descDisplay || '').split('\n').filter(p => p.trim());
  const staggerDelay = Math.min(idx % 4, 3) * 75;

  return (
    <div 
      className="history-card-reveal relative pl-6 sm:pl-10 group"
      style={{ transitionDelay: `${staggerDelay}ms` }}
    >
      <span className="history-dot-reveal absolute -left-[7px] top-5 w-3.5 h-3.5 rounded-full bg-brand-forest dark:bg-emerald-500 ring-4 ring-brand-light dark:ring-emerald-950/80 transition-all duration-300 group-hover:scale-125 group-hover:ring-brand-forest/30 dark:group-hover:ring-emerald-400/40" />

      <span className="history-year-reveal hidden sm:block absolute sm:-left-36 sm:w-28 md:-left-40 md:w-32 top-3.5 text-right font-bold text-brand-forest dark:text-emerald-400 text-xs leading-tight pr-3 break-words transition-colors duration-200">
        {yearDisplay}
      </span>

      <div className="bg-white dark:bg-[#101b12] border border-brand-pale dark:border-emerald-900/40 rounded-2xl p-6 sm:p-8 space-y-4 shadow-2xs hover:shadow-xl hover:border-brand-forest/30 dark:hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out">
        <div>
          <span className="sm:hidden block text-xs font-bold text-brand-forest/80 dark:text-emerald-400/80 mb-1 tracking-wide">
            {yearDisplay}
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-brand-forest dark:text-emerald-300 transition-colors">
            {titleDisplay}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {isAlternate && m.image && (
            <div className="lg:col-span-5 order-2 lg:order-1 bg-brand-light/30 dark:bg-emerald-950/20 border border-brand-pale dark:border-emerald-900/40 rounded-xl p-2.5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-brand-forest/30 dark:hover:border-emerald-500/30">
              <GlassImage
                src={m.image}
                alt={m.imageAlt || titleDisplay}
                containerClassName="w-full min-h-[220px] flex items-center justify-center overflow-hidden rounded-lg"
                className="w-full max-h-[460px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          )}

          <div className={`${m.image ? 'lg:col-span-7' : 'lg:col-span-12'} ${isAlternate ? 'order-1 lg:order-2' : ''} space-y-4 text-slate-800 dark:text-slate-200 text-sm sm:text-base ${isTa ? 'leading-loose' : 'leading-relaxed'}`}>
            {paragraphs.map((p, pIdx) => (
              <p key={pIdx}>{p}</p>
            ))}

            {quoteDisplay && (
              <blockquote className="border-l-4 border-brand-forest dark:border-emerald-400 bg-brand-light/70 dark:bg-[#132817] rounded-r-2xl p-4 italic text-slate-800 dark:text-slate-100 text-xs sm:text-sm leading-relaxed shadow-xs dark:shadow-none transition-all duration-200 hover:bg-brand-light dark:hover:bg-[#18351d]">
                {quoteDisplay}
              </blockquote>
            )}
          </div>

          {!isAlternate && m.image && (
            <div className="lg:col-span-5 bg-brand-light/30 dark:bg-emerald-950/20 border border-brand-pale dark:border-emerald-900/40 rounded-xl p-2.5 shadow-2xs transition-all duration-300 hover:shadow-md hover:border-brand-forest/30 dark:hover:border-emerald-500/30">
              <GlassImage
                src={m.image}
                alt={m.imageAlt || titleDisplay}
                containerClassName="w-full min-h-[220px] flex items-center justify-center overflow-hidden rounded-lg"
                className="w-full max-h-[460px] object-contain mx-auto transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function HistoryTimeline({ lang = 'en' }) {
  const { content } = useSiteContent();
  const history = content?.history || {};
  const overview = history.overview || {};
  const milestones = history.milestones || [];

  useEffect(() => {
    const triggerBottom = window.innerHeight * 0.95;
    const items = document.querySelectorAll('.history-card-reveal:not(.is-visible)');
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < triggerBottom) {
        el.classList.add('is-visible');
      }
    });
  }, [milestones]);

  const isTa = lang === 'ta';

  return (
    <article className={`space-y-10 ${isTa ? 'font-tamil' : ''}`}>
      <header className="history-card-reveal text-center max-w-3xl mx-auto space-y-2 pb-6 mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-forest dark:text-emerald-400 tracking-tight leading-snug">
          {isTa 
            ? (overview.titleTa || "CMS ஆங்கிலப் பாடசாலையும் இன்றைய கிறிஸ்தவ கல்லூரியும்")
            : (overview.titleEn || "CMS English School & Today’s Christian College")}
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          {isTa ? 'ஆசிரியர்கள்: ' : 'Compiled by: '}
          <span className="text-slate-800 dark:text-slate-200 font-bold">
            {isTa 
              ? (overview.authorsTa || "வண. J. S. இரட்ணாதிக்கம் & வண. A. M. நத்தானியல்")
              : (overview.authorsEn || "Rev. J. S. Ratnathikkam & Rev. A. M. Nathaniel")}
          </span>
        </p>
        {(isTa ? overview.leadTa : overview.leadEn) && (
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl mx-auto pt-1 leading-relaxed">
            {isTa ? overview.leadTa : overview.leadEn}
          </p>
        )}
      </header>

      <div className="relative border-l-2 border-brand-pale dark:border-emerald-900/40 ml-3 sm:ml-36 md:ml-40 space-y-8">
        {milestones.map((m, idx) => (
          <MilestoneCard 
            key={m.id || idx} 
            m={m} 
            idx={idx} 
            lang={lang} 
          />
        ))}
      </div>
    </article>
  );
}
