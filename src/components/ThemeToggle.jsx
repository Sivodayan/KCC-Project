import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext.jsx';

/**
 * ThemeToggle Component
 *
 * Provides responsive controls for switching between System (auto-detect OS),
 * Dark, and Light themes.
 *
 * Supported variants:
 * - 'compact' / 'navbar': Sleek circular button with popover options for desktop headers
 * - 'segmented': Accessible 3-option segmented pill controls for mobile drawers
 */
export default function ThemeToggle({ variant = 'compact', className = '' }) {
  const { theme, setTheme, isDark, systemPrefersDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Options configuration
  const options = [
    {
      id: 'system',
      label: 'System',
      sublabel: systemPrefersDark ? 'OS: Dark' : 'OS: Light',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 'light',
      label: 'Light',
      sublabel: 'Day mode',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      id: 'dark',
      label: 'Dark',
      sublabel: 'Night mode',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )
    }
  ];

  // Mobile / Segmented Pill Variant
  if (variant === 'segmented') {
    return (
      <div className={`flex items-center justify-between p-1 rounded-xl bg-brand-light/70 dark:bg-emerald-950/40 border border-brand-pale dark:border-emerald-800/40 ${className}`}>
        {options.map((opt) => {
          const isActive = theme === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setTheme(opt.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-brand-white dark:bg-[#152517] text-brand-forest dark:text-emerald-400 shadow-2xs font-bold border border-brand-pale/80 dark:border-emerald-700/50'
                  : 'text-slate-600 dark:text-slate-400 hover:text-brand-forest dark:hover:text-emerald-300'
              }`}
              title={`Switch to ${opt.label} (${opt.sublabel})`}
              aria-pressed={isActive}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  // Active Icon for Compact / Navbar Variant
  const activeIcon = theme === 'system' ? (
    <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ) : isDark ? (
    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ) : (
    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );

  const currentLabel = theme === 'system' ? `System (${systemPrefersDark ? 'Dark' : 'Light'})` : theme === 'dark' ? 'Dark' : 'Light';

  return (
    <div ref={containerRef} className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label={`Theme: ${currentLabel}. Click to change theme.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title={`Theme: ${currentLabel}`}
        className="p-2 sm:px-2.5 sm:py-1.5 rounded-full bg-brand-white dark:bg-[#131f15] border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-700 dark:text-slate-200 transition-all shadow-2xs hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5"
      >
        {activeIcon}
        <span className="hidden xl:inline text-xs font-semibold capitalize text-slate-700 dark:text-slate-300">
          {theme === 'system' ? 'Auto' : theme}
        </span>
        <svg
          className={`w-3 h-3 text-slate-400 dark:text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popover Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 top-full mt-2 w-48 rounded-2xl bg-brand-white dark:bg-[#111c13] border border-brand-pale dark:border-emerald-800/60 shadow-xl py-1.5 px-1.5 z-50 origin-top-right transition-all duration-150 animate-modal-content"
        >
          <div className="px-3 py-1.5 mb-1 border-b border-brand-pale/50 dark:border-emerald-800/30">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Appearance Theme
            </span>
          </div>

          {options.map((opt) => {
            const isSelected = theme === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                role="menuitem"
                onClick={() => {
                  setTheme(opt.id);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-xl transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-brand-light dark:bg-emerald-950/60 text-brand-forest dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-brand-pale/40 dark:hover:bg-emerald-900/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={isSelected ? 'text-brand-forest dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}>
                    {opt.icon}
                  </span>
                  <div className="text-left">
                    <span className="block leading-tight">{opt.label}</span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                      {opt.sublabel}
                    </span>
                  </div>
                </div>

                {isSelected && (
                  <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
