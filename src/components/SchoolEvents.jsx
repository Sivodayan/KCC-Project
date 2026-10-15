import React, { useState, useMemo, useEffect } from 'react';
import { facebookEvents, FACEBOOK_PAGE_URL, FACEBOOK_PAGE_NAME, FACEBOOK_PAGE_TAG } from '../data/facebookEvents.js';

export default function SchoolEvents() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePreviewEvent, setActivePreviewEvent] = useState(null);

  // Filter categories
  const categories = ['All', 'Sports', 'Cultural', 'Academics', 'Celebrations'];

  // Filtered events
  const filteredEvents = useMemo(() => {
    return facebookEvents.filter(evt => {
      const matchesCategory = selectedCategory === 'All' || evt.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch = !q ||
        evt.title.toLowerCase().includes(q) ||
        evt.tamilTitle.toLowerCase().includes(q) ||
        evt.venue.toLowerCase().includes(q) ||
        evt.summary.toLowerCase().includes(q) ||
        evt.tamilSummary.toLowerCase().includes(q) ||
        evt.tags.some(tag => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Close modal on Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && activePreviewEvent) {
        setActivePreviewEvent(null);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePreviewEvent]);

  return (
    <section className="py-14 sm:py-20 bg-brand-white border-b border-brand-pale scroll-mt-20 sm:scroll-mt-24" id="events">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            {/* Live Facebook Pulse Indicator */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1877F2]/10 border border-[#1877F2]/25 text-[#1877F2] text-xs font-bold tracking-wider uppercase mb-3.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1877F2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1877F2]"></span>
              </span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook Community Events</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              School Events & Campus Happenings
            </h2>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-forest font-tamil mt-1">
              பாடசாலை நிகழ்வுகள் & சமூகப் பதிவுகள்
            </h3>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
              Explore the latest 10 sports meets, academic exhibitions, cultural fests, and campus milestones shared on the official Facebook community page of Kopay Christian College.
            </p>
          </div>

          {/* Official Facebook Channel Card / Call to Action */}
          <div className="shrink-0 flex sm:flex-col sm:items-end gap-3">
            <a
              href={FACEBOOK_PAGE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#1877F2] text-white hover:bg-[#166fe5] font-semibold text-xs sm:text-sm shadow-sm hover:shadow-md transition-all duration-200 ease-out active:scale-[0.98] cursor-pointer group"
              aria-label="Visit Facebook Profile"
            >
              <svg className="w-4 h-4 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Visit Official Facebook</span>
              <svg className="w-3.5 h-3.5 text-white/80 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span className="text-[11px] text-slate-500 font-medium font-tamil hidden sm:block">
              {FACEBOOK_PAGE_NAME}
            </span>
          </div>
        </div>

        {/* Toolbar: Category Filter Tabs & Instant Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 pb-6 mb-8 border-b border-brand-pale/70">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none" role="tablist">
            {categories.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-brand-forest text-brand-white shadow-sm'
                      : 'bg-brand-light text-slate-700 hover:bg-brand-pale/70 hover:text-brand-forest'
                  }`}
                >
                  {cat === 'All' ? 'All Events (10)' : cat}
                </button>
              );
            })}
          </div>

          {/* Quick Search in Events */}
          <div className="relative min-w-[240px] sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 10 events..."
              className="w-full pl-9 pr-8 py-2 rounded-full bg-brand-light border border-brand-pale text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-forest focus:bg-white transition-all"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                aria-label="Clear search"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Events Cards Grid */}
        {filteredEvents.length === 0 ? (
          <div className="py-16 text-center bg-brand-light/50 rounded-3xl border border-dashed border-brand-pale">
            <svg className="w-12 h-12 text-slate-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-slate-700 font-semibold text-base">No events match your search query.</p>
            <button
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 px-4 py-1.5 rounded-full bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forestHover transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((evt, idx) => (
              <article
                key={evt.id}
                className="group flex flex-col bg-brand-white border border-brand-pale hover:border-brand-soft rounded-3xl overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Banner with Badge */}
                <div
                  className="relative aspect-[16/10] overflow-hidden bg-slate-100 cursor-pointer"
                  onClick={() => setActivePreviewEvent(evt)}
                >
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    loading={idx < 3 ? 'eager' : 'lazy'}
                  />
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md shadow-xs ${evt.badgeColor}`}>
                      {evt.category} • {evt.categoryTamil}
                    </span>
                  </div>
                  {/* Facebook Link Icon Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 text-[#1877F2] p-1.5 rounded-full shadow-md group-hover:scale-110 transition-transform">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </div>
                  {/* Quick Preview Hover Overlay */}
                  <div className="absolute inset-0 bg-brand-forest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-brand-forest text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Quick Preview
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Date and Venue Header */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2.5">
                      <svg className="w-3.5 h-3.5 text-brand-forest shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <time dateTime="2026">{evt.date}</time>
                      <span className="text-slate-300">•</span>
                      <span className="truncate">{evt.venue}</span>
                    </div>

                    {/* Bilingual Titles */}
                    <h3
                      onClick={() => setActivePreviewEvent(evt)}
                      className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-forest transition-colors leading-snug cursor-pointer"
                    >
                      {evt.title}
                    </h3>
                    <h4 className="text-xs sm:text-sm font-semibold text-brand-forest font-tamil mt-1 line-clamp-1">
                      {evt.tamilTitle}
                    </h4>

                    {/* Summary Excerpt */}
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-3 line-clamp-3">
                      {evt.summary}
                    </p>
                  </div>

                  {/* Card Footer: Social stats & Action buttons */}
                  <div className="pt-4 mt-5 border-t border-brand-pale/60 flex items-center justify-between gap-3">
                    {/* Social engagement indicator */}
                    <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <svg className="w-3.5 h-3.5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        {evt.likes}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-600">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        {evt.comments}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActivePreviewEvent(evt)}
                        className="px-3 py-1.5 rounded-full bg-brand-light text-brand-forest hover:bg-brand-pale/70 text-xs font-semibold transition-colors cursor-pointer"
                        aria-label={`Preview ${evt.title}`}
                      >
                        Preview
                      </button>
                      <a
                        href={evt.facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2] hover:text-white transition-colors cursor-pointer"
                        title="View on Facebook"
                        aria-label="View on Facebook"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Bottom Facebook Community Banner & Live Connect */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-brand-forest via-brand-forestHover to-[#104b0e] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-brand-soft/30">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center p-3 shrink-0 border border-white/20">
              <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Connect with Kopay Christian College on Facebook
              </h4>
              <p className="text-xs sm:text-sm text-brand-light/90 mt-0.5 font-tamil">
                யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி மாணவர்கள் - உத்தியோகபூர்வ சமூக வலைத்தளம்
              </p>
            </div>
          </div>

          <a
            href={FACEBOOK_PAGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-brand-forest hover:bg-brand-light font-bold text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer"
          >
            <span>Open Facebook Page</span>
            <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Interactive Modal Preview Dialog */}
      {activePreviewEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-modal-backdrop"
          onClick={() => setActivePreviewEvent(null)}
        >
          <div
            className="relative bg-brand-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-brand-pale animate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
              <img
                src={activePreviewEvent.image}
                alt={activePreviewEvent.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActivePreviewEvent(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close event preview"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-3 left-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md shadow-xs ${activePreviewEvent.badgeColor}`}>
                  {activePreviewEvent.category} • {activePreviewEvent.categoryTamil}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-brand-forest mb-1.5">
                  <svg className="w-4 h-4 text-brand-forest shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{activePreviewEvent.date} ({activePreviewEvent.tamilDate})</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  {activePreviewEvent.title}
                </h3>
                <h4 className="text-base sm:text-lg font-bold text-brand-forest font-tamil mt-1">
                  {activePreviewEvent.tamilTitle}
                </h4>
              </div>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-2xl bg-brand-light border border-brand-pale text-xs">
                <div>
                  <span className="block text-slate-400 font-medium">Venue / இடம்:</span>
                  <span className="font-semibold text-slate-800">{activePreviewEvent.venue}</span>
                </div>
                <div>
                  <span className="block text-slate-400 font-medium">Organized By / ஏற்பாடு:</span>
                  <span className="font-semibold text-slate-800">{activePreviewEvent.organizer}</span>
                </div>
              </div>

              {/* Description Paragraphs (Bilingual) */}
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                <p>{activePreviewEvent.summary}</p>
                <p className="font-tamil text-slate-600 bg-slate-50 p-3 rounded-xl border border-brand-pale/50 leading-[1.8]">
                  {activePreviewEvent.tamilSummary}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activePreviewEvent.tags.map(t => (
                  <span key={t} className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium font-mono">
                    #{t}
                  </span>
                ))}
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-brand-pale/70 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1 font-semibold text-[#1877F2]">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    {activePreviewEvent.likes} Likes
                  </span>
                  <span>•</span>
                  <span>{activePreviewEvent.comments} Comments</span>
                  <span>•</span>
                  <span>{activePreviewEvent.shares} Shares</span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setActivePreviewEvent(null)}
                    className="w-1/2 sm:w-auto px-4 py-2 rounded-full border border-brand-pale text-slate-700 hover:bg-brand-light text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <a
                    href={activePreviewEvent.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-full bg-[#1877F2] hover:bg-[#166fe5] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                  >
                    <span>Open on Facebook</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
