import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = '404 - Page Not Found | J/Kopay Christian College';
  }, []);

  return (
    <main className="flex-grow py-6 sm:py-10 bg-brand-white dark:bg-[#0b120c] transition-colors animate-page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <article className="bg-brand-white dark:bg-[#111e13] rounded-3xl border border-brand-pale dark:border-emerald-900/40 p-8 sm:p-14 shadow-xs text-center relative overflow-hidden animate-fade-up">
          <div
            className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none"
            aria-hidden="true"
          >
            <img src="/assets/logo.png" alt="" className="w-96 h-96 object-contain" />
          </div>

          <div className="relative z-10 space-y-6">
            <header className="space-y-2">
              <div className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-brand-forest dark:text-emerald-400 select-none">
                404
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Page Not Found
              </h1>
              <p className="font-tamil text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                மன்னிக்கவும்! நீங்கள் தேடும் பக்கம் அகற்றப்பட்டிருக்கலாம் அல்லது பெயர் மாற்றப்பட்டிருக்கலாம்.
              </p>
            </header>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              The page you are looking for does not exist on the J/Kopay Christian College portal. Please check the URL and try again.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-forest text-brand-white hover:bg-brand-forestHover font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Return to Home</span>
              </Link>


            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
