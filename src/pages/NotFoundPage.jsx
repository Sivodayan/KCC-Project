import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage({ onOpenSearch }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Page Not Found (404) | J/Kopay Christian College";
  }, []);



  return (
    <main className="flex-grow py-6 sm:py-10 bg-brand-white dark:bg-[#0b120c] transition-colors animate-page-enter">


      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Main 404 Card */}
        <div className="bg-brand-white dark:bg-[#111e13] rounded-3xl border border-brand-pale dark:border-emerald-900/40 p-8 sm:p-14 shadow-xs text-center relative overflow-hidden animate-fade-up">
          {/* Subtle Crest Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">
            <img src="/assets/logo.png" alt="" className="w-96 h-96 object-contain" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Badge Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-light/90 dark:bg-emerald-950/80 border border-brand-pale dark:border-emerald-700/50 text-brand-forest dark:text-emerald-300 text-xs font-bold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-brand-forest dark:bg-emerald-400 animate-pulse"></span>
              <span>404 ERROR • பக்கம் காணப்படவில்லை</span>
            </div>

            {/* Giant 404 Number */}
            <div className="space-y-2">
              <div className="text-7xl sm:text-8xl lg:text-9xl font-extrabold tracking-tight text-brand-forest dark:text-emerald-400 select-none">
                404
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                Page Not Found
              </h1>
              <p className="font-tamil text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium">
                மன்னிக்கவும்! நீங்கள் தேடும் பக்கம் அகற்றப்பட்டிருக்கலாம் அல்லது பெயர் மாற்றப்பட்டிருக்கலாம்.
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
              The page you are looking for does not exist on the J/Kopay Christian College portal. Please check the URL or use the search portal below.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-forest text-brand-white hover:bg-brand-forestHover font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Return to Home</span>
              </Link>

              {onOpenSearch && (
                <button
                  type="button"
                  onClick={onOpenSearch}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-white dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-700 dark:text-slate-200 hover:text-brand-forest dark:hover:text-emerald-300 font-bold text-xs sm:text-sm shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search Portal</span>
                </button>
              )}
            </div>
          </div>
        </div>


        {/* Suggested Directory Quick Links */}
        <div className="mt-10 space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              Popular College Portals
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Quickly navigate to verified sections of J/Kopay Christian College.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex flex-col justify-between p-4 rounded-2xl bg-brand-light/50 dark:bg-[#101b12] border border-brand-pale dark:border-emerald-900/40 hover:border-brand-forest/40 dark:hover:border-emerald-500/50 hover:bg-brand-light dark:hover:bg-[#142316] transition-all duration-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="space-y-2">
                  <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#0b140d] border border-brand-pale dark:border-emerald-800/40 flex items-center justify-center shadow-2xs transition-transform group-hover:scale-110">
                    {link.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-brand-forest dark:text-emerald-300 group-hover:underline">
                      {link.titleEn}
                    </h3>
                    <span className="font-tamil text-xs text-slate-500 dark:text-slate-400">
                      {link.titleTa}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {link.desc}
                  </p>
                </div>

                <div className="pt-3 flex items-center gap-1 text-xs font-semibold text-brand-forest dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Visit page</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
