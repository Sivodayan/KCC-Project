import React from 'react';

export default function Footer({ onNavigate, onOpenAnthem }) {
  return (
    <footer className="bg-brand-white border-t border-brand-pale pt-4 pb-4 sm:pt-5 sm:pb-5 text-xs text-slate-500">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-3 sm:pb-4 border-b border-brand-pale/60">
          <div>
            <div className="font-bold text-base text-brand-forest">
              J/Kopay Christian College
            </div>
            <div className="text-xs text-slate-500 font-tamil mt-0.5">
              யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி • Kopay, Jaffna, Sri Lanka
            </div>
          </div>

          {/* Clean Semantic Internal Navigation Links for Google Search & Visitors */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-600">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('history')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              History
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Events
            </button>
            <button
              onClick={() => onNavigate('gallery')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Gallery
            </button>
            <button
              onClick={() => onNavigate('academics')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Academics
            </button>
            <button
              onClick={() => onNavigate('performance')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Performance
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <button
              onClick={() => onNavigate('anthem')}
              className="hover:text-brand-forest transition-colors cursor-pointer"
            >
              Anthem
            </button>
          </nav>
        </div>

        <div className="pt-2.5 sm:pt-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
          <div>
            &copy; 2026 J/Kopay Christian College. All rights reserved.
          </div>
          <div>
            Motto: <span className="font-semibold text-slate-600">"Truth and Justice"</span> • <span className="font-tamil text-slate-600">"உண்மைக்கும் நேர்மைக்கும்"</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
