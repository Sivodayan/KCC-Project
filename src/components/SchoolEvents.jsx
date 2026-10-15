import React, { useState } from 'react';
import {
  FACEBOOK_PAGE_URL,
  FACEBOOK_CANONICAL_URL,
  FACEBOOK_PROFILE_ID,
  FACEBOOK_PROFILE_NAME,
  FACEBOOK_PROFILE_DESC,
  FACEBOOK_PROFILE_IMAGE,
  FACEBOOK_APP_URL,
  FACEBOOK_SECTIONS
} from '../data/facebookEvents.js';

export default function SchoolEvents() {
  const [copied, setCopied] = useState(false);

  function handleCopyLink() {
    navigator.clipboard.writeText(FACEBOOK_PAGE_URL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  return (
    <section className="py-8 sm:py-14 bg-brand-white" id="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Identity Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-brand-forest text-white p-6 sm:p-10 shadow-xl border border-slate-700/60 mb-10">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-[#1877F2]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-brand-forest/30 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 text-center md:text-left">
            {/* Extracted Profile Crest / Image */}
            <div className="relative shrink-0">
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-white p-2.5 shadow-2xl border-2 border-white/20 flex items-center justify-center overflow-hidden">
                <img
                  src={FACEBOOK_PROFILE_IMAGE}
                  alt={FACEBOOK_PROFILE_NAME}
                  className="w-full h-full object-contain"
                  loading="eager"
                />
              </div>
              {/* Verified Facebook Badge */}
              <div
                className="absolute -bottom-2 -right-2 bg-[#1877F2] text-white p-2 rounded-full shadow-lg border-2 border-slate-900 flex items-center justify-center"
                title="Verified Facebook Profile"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </div>
            </div>

            {/* Profile Info & Extracted Details */}
            <div className="flex-1 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1877F2]/20 border border-[#1877F2]/40 text-[#77A7FF] text-xs font-semibold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1877F2] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1877F2]"></span>
                </span>
                <span>Official Facebook Community</span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-tamil leading-tight">
                {FACEBOOK_PROFILE_NAME}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                Facebook Profile ID: <span className="text-[#AAC9FF]">{FACEBOOK_PROFILE_ID}</span>
              </p>

              <p className="text-sm sm:text-base text-slate-200 leading-relaxed max-w-2xl font-tamil">
                {FACEBOOK_PROFILE_DESC}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all transform active:scale-95 cursor-pointer"
                  aria-label="Open Facebook Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Open Profile</span>
                  <svg className="w-3.5 h-3.5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>

                <a
                  href={FACEBOOK_CANONICAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-all border border-white/20 cursor-pointer"
                >
                  <span>Canonical Link</span>
                  <svg className="w-3.5 h-3.5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>

                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold transition-all border border-slate-600/60 cursor-pointer"
                >
                  <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  <span>{copied ? "Link Copied!" : "Copy Link"}</span>
                </button>

                {/* Mobile Direct Deep-Link to App */}
                <a
                  href={FACEBOOK_APP_URL}
                  className="inline-flex sm:hidden items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1877F2]/30 text-white text-xs font-semibold border border-[#1877F2]/50"
                >
                  <span>Open in App</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Extracted Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {FACEBOOK_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={section.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between p-5 rounded-2xl bg-brand-light border border-brand-pale hover:border-brand-soft hover:bg-white shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-brand-pale group-hover:border-[#1877F2]/30 flex items-center justify-center text-[#1877F2] shadow-2xs transition-colors">
                    {section.icon === 'timeline' && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                      </svg>
                    )}
                    {section.icon === 'photos' && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                      </svg>
                    )}
                    {section.icon === 'videos' && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/>
                      </svg>
                    )}
                    {section.icon === 'about' && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                      </svg>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-[#1877F2] transition-colors group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-forest transition-colors">
                  {section.title}
                </h3>
                <h4 className="text-xs font-semibold text-brand-forest font-tamil mt-0.5">
                  {section.tamil}
                </h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {section.description}
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-bold text-[#1877F2] group-hover:underline">
                View on Facebook →
              </span>
            </a>
          ))}
        </div>

        {/* Live Feed Embed & Interactive Facebook Container */}
        <div className="bg-brand-light/60 rounded-3xl border border-brand-pale p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6 pb-6 border-b border-brand-pale">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Live Community Updates & Feed
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-tamil">
                {FACEBOOK_PROFILE_NAME} - நேரலை சமூக வலைப்பின்னல்
              </p>
            </div>
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1877F2] text-white hover:bg-[#166fe5] font-semibold text-xs shadow-xs transition-colors"
            >
              <span>Visit Profile Timeline</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Facebook Iframe Plugin Embed Container */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-brand-pale overflow-hidden p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-light p-1 border border-brand-pale">
                  <img
                    src={FACEBOOK_PROFILE_IMAGE}
                    alt={FACEBOOK_PROFILE_NAME}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-sm font-bold text-slate-900 font-tamil leading-tight">
                    {FACEBOOK_PROFILE_NAME}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    ID: {FACEBOOK_PROFILE_ID} • Facebook Community
                  </p>
                </div>
              </div>

              {/* Embedded Facebook Plugin Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[420px] rounded-xl overflow-hidden border border-brand-pale bg-slate-50 flex items-center justify-center">
                <iframe
                  title="Facebook Profile Page Embed"
                  src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(FACEBOOK_PAGE_URL)}&tabs=timeline&width=500&height=420&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
                  width="100%"
                  height="100%"
                  style={{ border: 'none', overflow: 'hidden' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  className="w-full h-full"
                ></iframe>
              </div>

              <div className="mt-4 pt-4 border-t border-brand-pale/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                  <svg className="w-3.5 h-3.5 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Real-time posts rendered directly via Facebook</span>
                </div>
                <a
                  href={FACEBOOK_PAGE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1877F2] font-semibold hover:underline inline-flex items-center gap-1"
                >
                  <span>Open Full Feed on Facebook</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
