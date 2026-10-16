import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

export default function AnnouncementBanner() {
  const { content } = useSiteContent();
  const [dismissed, setDismissed] = useState(false);

  const announcement = content?.announcement;

  if (!announcement?.enabled || dismissed || !announcement?.text) {
    return null;
  }

  const handleLinkClick = (e) => {
    if (announcement.link?.startsWith('#')) {
      e.preventDefault();
      const targetId = announcement.link.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = announcement.link;
      }
    }
  };

  return (
    <aside aria-label="Campus Announcement" className="bg-gradient-to-r from-brand-forest via-emerald-800 to-brand-forest text-brand-white text-xs py-2 px-4 shadow-sm border-b border-brand-soft/30 relative z-50">
      <div className="max-w-9xl mx-auto flex items-center justify-between gap-3">
        <div className="flex-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 text-center sm:text-left">
          {announcement.badge && (
            <span className="px-2.5 py-0.5 rounded-full bg-white text-brand-forest font-extrabold text-[10px] uppercase tracking-wider shadow-2xs shrink-0">
              {announcement.badge}
            </span>
          )}
          <span className="font-semibold text-white">
            {announcement.text}
          </span>
          {announcement.tamil && (
            <span className="hidden md:inline font-tamil text-brand-pale text-[11px]">
              • {announcement.tamil}
            </span>
          )}
          {announcement.link && (
            <a
              href={announcement.link}
              onClick={handleLinkClick}
              className="inline-flex items-center gap-1 font-bold text-brand-pale hover:text-white underline underline-offset-2 transition-colors ml-1 text-xs"
            >
              <span>{announcement.linkText || 'Learn More →'}</span>
            </a>
          )}
        </div>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-brand-pale hover:text-white p-1 rounded-md hover:bg-white/10 transition cursor-pointer shrink-0"
          aria-label="Dismiss banner"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </aside>
  );
}
