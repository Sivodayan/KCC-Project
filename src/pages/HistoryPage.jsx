import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import HistoryTimeline from '../components/HistoryTimeline.jsx';
import LeadershipDirectory from '../components/LeadershipDirectory.jsx';

/**
 * HistoryPage Component
 *
 * Dedicated archival history portal for J/Kopay Christian College.
 * Dynamically switches between English and Tamil historical treatises,
 * re-mounting child timeline and leadership directory components via keyed instances.
 * Automatically scrolls to top on language toggle or route entry,
 * and coordinates smooth entrance transitions for all milestone and leadership cards.
 */
export default function HistoryPage({ lang = 'en' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lang]);

  // Viewport scroll & entrance transition observer for history cards
  useEffect(() => {
    let observer = null;

    const revealCards = () => {
      const items = document.querySelectorAll('.history-card-reveal:not(.is-visible)');
      if (!items.length) return;

      const triggerBottom = window.innerHeight * 0.95;

      items.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
          el.classList.add('is-visible');
          if (observer) observer.unobserve(el);
        } else if (observer) {
          observer.observe(el);
        }
      });
    };

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );
    }

    revealCards();
    const rafId = requestAnimationFrame(revealCards);
    const t1 = setTimeout(revealCards, 80);
    const t2 = setTimeout(revealCards, 240);
    const t3 = setTimeout(revealCards, 600);

    window.addEventListener('scroll', revealCards, { passive: true });
    window.addEventListener('resize', revealCards, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', revealCards);
      window.removeEventListener('resize', revealCards);
      if (observer) observer.disconnect();
    };
  }, [lang]);

  return (
    <main className="flex-grow py-4 sm:py-6 bg-brand-white dark:bg-[#0b120c] transition-colors animate-page-enter">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-3 animate-fade-in">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light dark:bg-emerald-950/70 border border-brand-pale dark:border-emerald-800/40 text-brand-forest dark:text-emerald-300 hover:bg-brand-pale/70 dark:hover:bg-emerald-900/60 font-semibold transition-all shadow-2xs hover:-translate-x-0.5"
          >
            <span>← Home</span>
          </Link>
          <span className="text-slate-300 dark:text-slate-600">/</span>
          <span className="text-slate-800 dark:text-slate-200 font-semibold">
            {lang === 'ta' ? 'கல்லூரி வரலாறு' : 'History & Heritage'}
          </span>
        </nav>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HistoryTimeline key={`timeline-${lang}`} lang={lang} />
        <LeadershipDirectory key={`lead-${lang}`} lang={lang} />
      </div>
    </main>
  );
}
