import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const quickLinks = [
  {
    to: '/history',
    titleEn: 'History & Heritage',
    titleTa: 'கல்லூரி வரலாறு',
    desc: 'Explore the 170+ year collegiate timeline from 1849 to the present.',
    icon: (
      <svg className="w-5 h-5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    to: '/events',
    titleEn: 'School Events',
    titleTa: 'பாடசாலை நிகழ்வுகள்',
    desc: 'Sports meets, academic exhibitions, prize givings, and milestones.',
    icon: (
      <svg className="w-5 h-5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/gallery',
    titleEn: 'Photo Gallery',
    titleTa: 'புகைப்படத் தொகுப்பு',
    desc: 'Campus moments, student life, laboratory experiments, and traditions.',
    icon: (
      <svg className="w-5 h-5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/anthem',
    titleEn: 'School Anthem',
    titleTa: 'பாடசாலைக் கீதம்',
    desc: 'Composed in Ragam Hamsadhwani celebrating truth and justice.',
    icon: (
      <svg className="w-5 h-5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
  {
    to: '/contact',
    titleEn: 'Contact Us',
    titleTa: 'தொடர்புகளுக்கு',
    desc: 'Get in touch with the administration office in Kopay, Jaffna.',
    icon: (
      <svg className="w-5 h-5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    to: '/#performance',
    titleEn: 'Academics & Highlights',
    titleTa: 'கல்வி அடைவுகள்',
    desc: 'Key examination pass rates, clubs, and collegiate performance.',
    icon: (
      <svg className="w-5 h-5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "Page Not Found (404) | J/Kopay Christian College";
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const reportMailto = `mailto:kcckopay@gmail.com?subject=${encodeURIComponent(
    'Broken Link Report - J/Kopay Christian College'
  )}&body=${encodeURIComponent(
    `Hello Administration,\n\nI encountered a broken link on the KCC portal:\nBroken Page URL: ${currentUrl}\nDate: ${new Date().toLocaleDateString()}\n\nPlease look into this.\n\nThank you.`
  )}`;

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
              The page you are looking for does not exist on the J/Kopay Christian College portal. Please check the URL, return home, or report this broken link to school administration.
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

              <a
                href={reportMailto}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-white dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-700 dark:text-slate-200 hover:text-brand-forest dark:hover:text-emerald-300 font-bold text-xs sm:text-sm shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Report this broken link to kcckopay@gmail.com"
              >
                <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Report Broken Link</span>
              </a>
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
