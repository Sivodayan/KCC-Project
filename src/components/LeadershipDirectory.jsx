import React, { useEffect } from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

/**
 * LeadershipDirectory Component
 *
 * Archival record detailing the institutional leadership lineage of J/Kopay Christian College,
 * including historical Headmasters (தலைமையாசிரியர்கள்) and Managers (முகாமையாளர்கள்)
 * from 1880 through the modern era.
 *
 * Dynamically rendered from SiteContentContext (editable via Admin Page).
 * Supports bilingual rendering (`lang === 'ta'` vs English default).
 * Both leadership cards come with smooth entrance and hover elevation transitions.
 */
export default function LeadershipDirectory({ lang = 'en' }) {
  const { content } = useSiteContent();
  const headmasters = content?.history?.headmasters || [];
  const managers = content?.history?.managers || [];

  // Check initial visibility whenever leadership arrays load or update
  useEffect(() => {
    const triggerBottom = window.innerHeight * 0.95;
    const items = document.querySelectorAll('.history-card-reveal:not(.is-visible)');
    items.forEach((el) => {
      if (el.getBoundingClientRect().top < triggerBottom) {
        el.classList.add('is-visible');
      }
    });
  }, [headmasters, managers]);

  const isTa = lang === 'ta';

  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 pb-12 ${isTa ? 'font-tamil' : ''}`}>
      {/* Headmasters Card */}
      <div 
        className="history-card-reveal bg-brand-light dark:bg-[#101b12] rounded-2xl border border-brand-pale dark:border-emerald-900/40 p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:border-brand-forest/30 dark:hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out"
        style={{ transitionDelay: '80ms' }}
      >
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-brand-pale/70 dark:border-emerald-900/40">
          <span className="w-8 h-8 rounded-lg bg-brand-forest dark:bg-emerald-700 text-brand-white flex items-center justify-center font-bold text-xs shadow-xs">
            {isTa ? 'தலை' : 'HM'}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-brand-forest dark:text-emerald-400">
            {isTa ? 'தலைமையாசிரியர்கள் (Headmasters)' : 'Headmasters (1880 - 1944)'}
          </h2>
        </div>
        <div className="divide-y divide-brand-pale/70 dark:divide-emerald-900/40 text-sm">
          {headmasters.map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="py-2.5 px-3 -mx-3 rounded-xl flex justify-between gap-4 transition-colors duration-150 hover:bg-brand-pale/40 dark:hover:bg-emerald-950/50"
            >
              <span className="font-bold text-brand-forest dark:text-emerald-400 shrink-0">{item.period}</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 text-right">{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Managers Card */}
      <div 
        className="history-card-reveal bg-brand-light dark:bg-[#101b12] rounded-2xl border border-brand-pale dark:border-emerald-900/40 p-6 sm:p-7 shadow-2xs hover:shadow-xl hover:border-brand-forest/30 dark:hover:border-emerald-500/40 hover:-translate-y-1.5 transition-all duration-300 ease-out"
        style={{ transitionDelay: '180ms' }}
      >
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-brand-pale/70 dark:border-emerald-900/40">
          <span className="w-8 h-8 rounded-lg bg-brand-forest dark:bg-emerald-700 text-brand-white flex items-center justify-center font-bold text-xs shadow-xs">
            {isTa ? 'முகா' : 'M'}
          </span>
          <h2 className="text-base sm:text-lg font-bold text-brand-forest dark:text-emerald-400">
            {isTa ? 'முகாமையாளர்கள் (Managers)' : 'Managers (1899 - 1960)'}
          </h2>
        </div>
        <div className="divide-y divide-brand-pale/70 dark:divide-emerald-900/40 text-sm">
          {managers.map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="py-2.5 px-3 -mx-3 rounded-xl flex justify-between gap-4 transition-colors duration-150 hover:bg-brand-pale/40 dark:hover:bg-emerald-950/50"
            >
              <span className="font-bold text-brand-forest dark:text-emerald-400 shrink-0">{item.period}</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 text-right">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
