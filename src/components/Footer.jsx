import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-brand-white border-t border-brand-pale py-4 sm:py-5 text-xs text-slate-500">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="font-bold text-base text-brand-forest">
              J/Kopay Christian College
            </div>
            <div className="text-xs text-slate-500 font-tamil mt-0.5">
              யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி • Kopay, Jaffna, Sri Lanka
            </div>
          </div>

          <div className="text-[11px] text-slate-400">
            &copy; 2026 J/Kopay Christian College. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
