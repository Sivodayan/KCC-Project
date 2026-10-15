import React from 'react';

export default function Footer({ onNavigate, onOpenAnthem }) {
  return (
    <footer className="bg-brand-white border-t border-brand-pale py-6 text-xs text-slate-500">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-semibold text-brand-forest">
          J/Kopay Christian College
        </div>
        
        <div>
          &copy; 2026 J/Kopay Christian College. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
