import React, { useState } from 'react';

export default function Navbar({
  currentPage,
  onNavigate,
  onOpenSearch,
  historyLang,
  onChangeHistoryLang
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleNavLink(page, hash = '') {
    setMobileMenuOpen(false);
    onNavigate(page, hash);
  }

  return (
    <header className="w-full border-b border-brand-pale bg-brand-white sticky top-0 z-40" id="mainHeader">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-3.5" aria-label="Main Navigation">
          {/* School Crest/Logo & Brand */}
          <button
            onClick={() => handleNavLink('home')}
            aria-label="J/Kopay Christian College Home"
            className="group flex items-center gap-3 cursor-pointer text-left focus:outline-none"
          >
            <img
              src="assets/logo.png"
              alt="Logo"
              style={{ width: '44px', height: '44px' }}
              className="transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="block text-xs font-bold text-brand-forest uppercase tracking-wider">
                J/Kopay Christian College
              </span>
              <span className="block text-[11px] text-slate-500 font-tamil">
                யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி
              </span>
            </div>
          </button>

          {/* Desktop Navigation for Home Page */}
          {currentPage === 'home' && (
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center bg-brand-light border border-brand-pale px-3 py-1.5 rounded-full space-x-1 text-sm font-medium">
                <button
                  onClick={() => handleNavLink('history')}
                  className="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60 transition-all duration-200 cursor-pointer"
                >
                  History
                </button>
                <button
                  onClick={() => handleNavLink('home', '#gallery')}
                  className="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60 transition-all duration-200 cursor-pointer"
                >
                  Gallery
                </button>
                <button
                  onClick={() => handleNavLink('home', '#principles')}
                  className="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60 transition-all duration-200 cursor-pointer"
                >
                  Academics
                </button>
                <button
                  onClick={() => handleNavLink('home', '#performance')}
                  className="nav-link px-4 py-1.5 rounded-full text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60 transition-all duration-200 cursor-pointer"
                >
                  Performance
                </button>

                {/* Search Button in Nav */}
                <button
                  onClick={onOpenSearch}
                  type="button"
                  className="inline-flex items-center gap-1.5 bg-brand-white border border-brand-pale hover:border-brand-soft text-slate-700 hover:text-brand-forest px-3 py-1.5 rounded-full text-xs font-medium transition-all group shadow-2xs ml-1 cursor-pointer"
                  aria-label="Search website (Ctrl+K)"
                >
                  <svg
                    className="w-3.5 h-3.5 text-brand-forest transition-transform group-hover:scale-110"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Search</span>
                  <kbd className="text-[10px] bg-brand-light px-1.5 py-0.5 rounded text-slate-400 font-mono border border-brand-pale/80">
                    Ctrl K
                  </kbd>
                </button>

                {/* Contact Us Button */}
                <button
                  onClick={() => handleNavLink('home', '#contact')}
                  className="ml-2 inline-flex items-center bg-brand-forest text-brand-white px-5 py-2 rounded-full font-medium transition-all duration-200 ease-out hover:bg-brand-forestHover hover:-translate-y-0.5 shadow-sm active:translate-y-0 cursor-pointer"
                >
                  Contact Us
                </button>
              </div>
            </div>
          )}

          {/* Controls when on History Page */}
          {currentPage === 'history' && (
            <div className="flex items-center gap-3">
              {/* Language Switcher Pill */}
              <div className="inline-flex items-center bg-brand-light border border-brand-pale p-1 rounded-full text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => onChangeHistoryLang('en')}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    historyLang === 'en'
                      ? 'bg-brand-forest text-brand-white shadow-sm'
                      : 'text-slate-600 hover:text-brand-forest'
                  }`}
                  aria-label="Switch to English"
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => onChangeHistoryLang('ta')}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-200 font-tamil cursor-pointer ${
                    historyLang === 'ta'
                      ? 'bg-brand-forest text-brand-white shadow-sm'
                      : 'text-slate-600 hover:text-brand-forest'
                  }`}
                  aria-label="Switch to Tamil"
                >
                  தமிழ்
                </button>
              </div>

              {/* Search Button on History */}
              <button
                onClick={onOpenSearch}
                type="button"
                className="hidden sm:inline-flex items-center gap-1.5 bg-brand-white border border-brand-pale hover:border-brand-soft text-slate-700 hover:text-brand-forest px-3.5 py-2 rounded-full text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                aria-label="Search website"
              >
                <svg className="w-3.5 h-3.5 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Search</span>
                <kbd className="text-[10px] bg-brand-light px-1.5 py-0.5 rounded text-slate-400 font-mono border border-brand-pale/80">
                  Ctrl K
                </kbd>
              </button>

              {/* Home Return Button */}
              <button
                onClick={() => handleNavLink('home')}
                className="inline-flex items-center gap-1.5 bg-brand-white border border-brand-pale hover:border-brand-soft text-brand-forest px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-2xs"
              >
                <span>← Home</span>
              </button>
            </div>
          )}

          {/* Mobile Header Controls */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={onOpenSearch}
              aria-label="Search website"
              className="p-2.5 rounded-xl bg-brand-light border border-brand-pale text-brand-forest transition-colors hover:bg-brand-pale cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              className="p-2.5 rounded-xl bg-brand-light border border-brand-pale text-brand-forest transition-colors hover:bg-brand-pale cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-white border-t border-brand-pale px-6 py-4 space-y-3 shadow-lg">
          {/* Mobile Search Bar Trigger */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            type="button"
            className="w-full flex items-center justify-between bg-brand-light border border-brand-pale px-4 py-2.5 rounded-xl text-xs text-slate-600 font-medium hover:bg-brand-pale/50 transition-colors"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search KCC portal...</span>
            </span>
            <kbd className="text-[10px] bg-brand-white px-2 py-0.5 rounded border border-brand-pale text-slate-400 font-mono">
              Ctrl+K
            </kbd>
          </button>

          {currentPage === 'home' ? (
            <>
              <button
                onClick={() => handleNavLink('history')}
                className="block w-full text-left text-slate-700 hover:text-brand-forest font-medium py-2 rounded-lg hover:bg-brand-light px-3 transition-colors cursor-pointer"
              >
                History
              </button>
              <button
                onClick={() => handleNavLink('home', '#gallery')}
                className="block w-full text-left text-slate-700 hover:text-brand-forest font-medium py-2 rounded-lg hover:bg-brand-light px-3 transition-colors cursor-pointer"
              >
                Gallery
              </button>
              <button
                onClick={() => handleNavLink('home', '#principles')}
                className="block w-full text-left text-slate-700 hover:text-brand-forest font-medium py-2 rounded-lg hover:bg-brand-light px-3 transition-colors cursor-pointer"
              >
                Academics
              </button>
              <button
                onClick={() => handleNavLink('home', '#performance')}
                className="block w-full text-left text-slate-700 hover:text-brand-forest font-medium py-2 rounded-lg hover:bg-brand-light px-3 transition-colors cursor-pointer"
              >
                Performance
              </button>
              <button
                onClick={() => handleNavLink('home', '#contact')}
                className="block w-full text-center bg-brand-forest hover:bg-brand-forestHover text-brand-white py-2.5 rounded-full font-medium transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavLink('home')}
                className="block w-full text-left text-brand-forest font-semibold py-2 rounded-lg hover:bg-brand-light px-3 transition-colors cursor-pointer"
              >
                ← Back to Home
              </button>
              <div className="flex items-center gap-2 pt-2 border-t border-brand-pale">
                <span className="text-xs text-slate-500 font-medium">Language:</span>
                <button
                  onClick={() => onChangeHistoryLang('en')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    historyLang === 'en' ? 'bg-brand-forest text-white' : 'bg-brand-light text-slate-700'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => onChangeHistoryLang('ta')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold font-tamil ${
                    historyLang === 'ta' ? 'bg-brand-forest text-white' : 'bg-brand-light text-slate-700'
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
