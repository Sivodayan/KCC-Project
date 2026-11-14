import React, { useEffect } from 'react';
import { ANTHEM_STANZAS } from './SchoolAnthem.jsx';
import AnthemPrintSheet from './AnthemPrintSheet.jsx';

export default function AnthemModal({ isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    document.body.style.overflow = 'hidden';
    document.body.classList.add('anthem-modal-open');

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.classList.remove('anthem-modal-open');
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let modalLineCount = 0;

  return (
    <div id="anthem-modal-root">
      <div
        className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-modal-backdrop print:hidden"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="bg-brand-white dark:bg-[#111e13] max-w-lg w-full rounded-2xl border border-brand-pale dark:border-emerald-800/40 overflow-hidden flex flex-col max-h-[85vh] shadow-2xl animate-modal-content">
        <div className="bg-brand-forest dark:bg-[#0e2a14] p-5 text-brand-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-tamil">பாடசாலைக் கீதம்</h3>
            <p className="text-xs text-brand-pale dark:text-emerald-300 font-tamil mt-0.5">இராகம் : ஹம்சத்வனி</p>
          </div>
          <button
            onClick={onClose}
            className="text-brand-white/80 hover:text-white p-1 rounded transition-colors cursor-pointer"
            aria-label="Close Anthem Modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto font-tamil text-center text-sm sm:text-base bg-brand-light/60 dark:bg-[#0b120c]">
          <div className="p-5 sm:p-6 bg-brand-white dark:bg-[#111e13] rounded-2xl border border-brand-pale dark:border-emerald-800/40 shadow-xs text-slate-800 dark:text-slate-200 leading-[2.2] space-y-6">
            {ANTHEM_STANZAS.map((stanza) => (
              <div key={stanza.id} className="space-y-1">
                {stanza.lines.map((line) => {
                  const currentLineIndex = modalLineCount++;
                  const delay = 100 + currentLineIndex * 45;
                  return (
                    <p key={currentLineIndex} className="py-0.5">
                      <span
                        className="animate-anthem-line inline-block transition-all duration-300 ease-out hover:scale-[1.03] hover:text-brand-forest dark:hover:text-emerald-300 cursor-default select-text origin-center"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        {line}
                      </span>
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <div className="p-3 border-t border-brand-pale dark:border-emerald-800/40 bg-brand-white dark:bg-[#111e13] flex items-center justify-between">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-light dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-700/50 text-brand-forest dark:text-emerald-300 text-xs font-semibold hover:bg-brand-pale/50 transition-colors cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-brand-forest hover:bg-brand-forestHover text-brand-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>

      {/* Pristine Document Sheet for Printing */}
      <AnthemPrintSheet />
    </div>
  );
}
