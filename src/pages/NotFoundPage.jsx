import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const REPORT_EMAIL = 'kcckopay@gmail.com';

export default function NotFoundPage() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Page Not Found (404) | J/Kopay Christian College';
  }, []);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const reportSubject = 'Broken Link Report - J/Kopay Christian College';
  const reportBody = `Hello Administration,\n\nI encountered a broken link on the KCC portal:\nBroken Page URL: ${currentUrl}\nDate: ${new Date().toLocaleDateString()}\n\nPlease look into this.\n\nThank you.`;

  const reportMailto = useMemo(() => {
    return `mailto:${REPORT_EMAIL}?subject=${encodeURIComponent(reportSubject)}&body=${encodeURIComponent(reportBody)}`;
  }, [reportSubject, reportBody]);

  const gmailWebUrl = useMemo(() => {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(REPORT_EMAIL)}&su=${encodeURIComponent(reportSubject)}&body=${encodeURIComponent(reportBody)}`;
  }, [reportSubject, reportBody]);

  const handleCopyDetails = async () => {
    try {
      await navigator.clipboard.writeText(
        `To: ${REPORT_EMAIL}\nSubject: ${reportSubject}\n\n${reportBody}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard fallback
    }
  };

  const handleOpenMailto = () => {
    window.location.href = reportMailto;
  };

  useEffect(() => {
    if (!isReportOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsReportOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isReportOpen]);

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
              The page you are looking for does not exist on the J/Kopay Christian College portal. Please check the URL or report this broken link to school administration.
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

              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-white dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-700 dark:text-slate-200 hover:text-brand-forest dark:hover:text-emerald-300 font-bold text-xs sm:text-sm shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
                title="Report this broken link to school administration"
              >
                <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>Report Broken Link</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Report Broken Link Modal Dialog */}
      {isReportOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsReportOpen(false);
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
        >
          <div className="bg-brand-white dark:bg-[#111e13] max-w-lg w-full rounded-3xl border border-brand-pale dark:border-emerald-800/50 shadow-2xl p-6 sm:p-7 space-y-5 animate-scale-in">
            <div className="flex items-start justify-between gap-3 border-b border-brand-pale dark:border-emerald-900/40 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 id="report-modal-title" className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
                    Report Broken Link
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Help us keep the college portal accurate & up-to-date
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsReportOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-emerald-950/60 transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Broken Page URL Detected
                </span>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#0b140d] border border-brand-pale dark:border-emerald-900/40 text-xs font-mono text-slate-700 dark:text-slate-300 break-all select-all">
                  {currentUrl || 'Current portal link'}
                </div>
              </div>

              <div>
                <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Recipient
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/50 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                  ✉️ {REPORT_EMAIL}
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Choose How to Send
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href={gmailWebUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold shadow-xs transition-all hover:scale-102 active:scale-98 cursor-pointer text-center"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <span>Open in Gmail Web</span>
                </a>

                <button
                  type="button"
                  onClick={handleOpenMailto}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-white dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-800 dark:text-slate-200 hover:text-brand-forest dark:hover:text-emerald-300 text-xs font-bold shadow-2xs transition-all hover:scale-102 active:scale-98 cursor-pointer text-center"
                >
                  <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Default Mail App</span>
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyDetails}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-[#0b140d] hover:bg-slate-200 dark:hover:bg-emerald-950/50 border border-slate-200 dark:border-emerald-900/40 text-slate-700 dark:text-slate-300 text-xs font-semibold transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">Report Details Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy Email & Report Details</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
