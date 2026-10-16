import React, { useState } from 'react';
import AboutDropdown from './AboutDropdown.jsx';

export default function Navbar({
  currentPage,
  onNavigate,
  onOpenSearch,
  onOpenAnthem,
  historyLang,
  onChangeHistoryLang
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(true);

  function handleNavLink(page, hash = '') {
    setMobileMenuOpen(false);
    onNavigate(page, hash);
  }

  return (
    <header className="w-full border-b border-brand-pale bg-brand-white sticky top-0 z-40" id="mainHeader">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between py-3.5" aria-label="Main Navigation">
          <button
            onClick={() => handleNavLink('home')}
            aria-label="J/Kopay Christian College Home"
            className="group flex items-center gap-3 cursor-pointer text-left focus:outline-none shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt="Logo"
              style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}
              className="transition-transform duration-300 group-hover:scale-105 shrink-0"
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

          <div className="hidden md:flex items-center gap-2">
            <div className="flex items-center bg-brand-light border border-brand-pale px-3 py-1.5 rounded-full space-x-1 text-sm font-medium">
              <button
                onClick={() => handleNavLink('home')}
                className={`nav-link px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${currentPage === 'home'
                    ? 'text-brand-forest bg-brand-pale/70 font-bold is-active'
                    : 'text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60'
                  }`}
              >
                Home
              </button>

              <button
                onClick={() => handleNavLink('performance')}
                className="nav-link px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60"
              >
                Performance
              </button>

              <button
                onClick={() => handleNavLink('events')}
                className={`nav-link px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${currentPage === 'events'
                    ? 'text-brand-forest bg-brand-pale/70 font-bold is-active'
                    : 'text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60'
                  }`}
              >
                Events
              </button>

              <button
                onClick={() => handleNavLink('gallery')}
                className={`nav-link px-3.5 py-1.5 rounded-full transition-all duration-200 cursor-pointer ${currentPage === 'gallery'
                    ? 'text-brand-forest bg-brand-pale/70 font-bold is-active'
                    : 'text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60'
                  }`}
              >
                Gallery
              </button>

              <AboutDropdown
                onNavigate={handleNavLink}
                onOpenAnthem={onOpenAnthem}
              />

              {currentPage === 'history' && (
                <div className="inline-flex items-center bg-brand-white border border-brand-pale p-0.5 rounded-full text-xs font-semibold ml-1">
                  <button
                    type="button"
                    onClick={() => onChangeHistoryLang('en')}
                    className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${historyLang === 'en'
                        ? 'bg-brand-forest text-brand-white shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-brand-forest'
                      }`}
                    aria-label="Switch to English"
                  >
                    EN
                  </button>
                  <button
                    type="button"
                    onClick={() => onChangeHistoryLang('ta')}
                    className={`px-2.5 py-1 rounded-full transition-all duration-200 font-tamil cursor-pointer ${historyLang === 'ta'
                        ? 'bg-brand-forest text-brand-white shadow-2xs font-bold'
                        : 'text-slate-600 hover:text-brand-forest'
                      }`}
                    aria-label="Switch to Tamil"
                  >
                    தமிழ்
                  </button>
                </div>
              )}

              <button
                onClick={onOpenSearch}
                type="button"
                className="inline-flex items-center gap-1.5 bg-brand-white border border-brand-pale hover:border-brand-soft text-slate-700 hover:text-brand-forest px-3 py-1.5 rounded-full text-xs font-medium transition-all group shadow-2xs ml-1 cursor-pointer"
                aria-label="Search website"
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
              </button>

              <button
                onClick={() => handleNavLink('contact')}
                className={`ml-2 inline-flex items-center px-4 py-1.5 rounded-full font-medium transition-all duration-200 ease-out shadow-sm active:translate-y-0 cursor-pointer ${currentPage === 'contact'
                    ? 'bg-brand-forestHover text-white ring-2 ring-brand-forest font-bold'
                    : 'bg-brand-forest text-brand-white hover:bg-brand-forestHover hover:-translate-y-0.5'
                  }`}
              >
                Contact Us
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenSearch}
              type="button"
              className="p-2 rounded-xl bg-brand-light border border-brand-pale text-slate-700 hover:text-brand-forest transition-colors cursor-pointer"
              aria-label="Search"
            >
              <svg className="w-5 h-5 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              type="button"
              className="p-2 rounded-xl bg-brand-light border border-brand-pale text-slate-700 hover:text-brand-forest transition-colors cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
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

      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-white border-t border-brand-pale px-6 py-4 space-y-3 shadow-lg">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            type="button"
            className="w-full flex items-center gap-2 bg-brand-light border border-brand-pale px-4 py-2.5 rounded-xl text-xs text-slate-600 font-medium hover:bg-brand-pale/50 transition-colors text-left"
          >
            <svg className="w-4 h-4 text-brand-forest shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>Search KCC portal...</span>
          </button>

          <button
            onClick={() => handleNavLink('home')}
            className={`block w-full text-left font-medium py-2 rounded-lg px-3 transition-colors cursor-pointer ${currentPage === 'home' ? 'bg-brand-pale text-brand-forest font-bold' : 'text-slate-700 hover:text-brand-forest hover:bg-brand-light'
              }`}
          >
            Home
          </button>

          <div className="border border-brand-pale rounded-xl overflow-hidden bg-brand-light/40">
            <button
              type="button"
              onClick={() => setMobileAboutOpen(prev => !prev)}
              className="w-full flex items-center justify-between text-left text-slate-800 font-semibold py-2.5 px-3 hover:bg-brand-pale/40 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-brand-forest"></span>
                <span>About</span>
              </span>
              <svg
                className={`w-4 h-4 text-brand-forest transition-transform duration-200 ${mobileAboutOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {mobileAboutOpen && (
              <div className="px-2 pb-2 space-y-1 bg-white/70 border-t border-brand-pale/40">
                <button
                  onClick={() => handleNavLink('history')}
                  className={`w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-brand-light transition-colors cursor-pointer font-medium ${currentPage === 'history' ? 'bg-brand-pale text-brand-forest font-bold' : 'text-slate-700 hover:text-brand-forest'
                    }`}
                >
                  History
                </button>
                <button
                  onClick={() => handleNavLink('anthem')}
                  className={`w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-brand-light transition-colors cursor-pointer font-medium ${currentPage === 'anthem' ? 'bg-brand-pale text-brand-forest font-bold' : 'text-slate-700 hover:text-brand-forest'
                    }`}
                >
                  School Anthem
                </button>
                <button
                  onClick={() => handleNavLink('motto')}
                  className="w-full text-left text-sm py-2 px-3 rounded-lg hover:bg-brand-light transition-colors cursor-pointer font-medium text-slate-700 hover:text-brand-forest"
                >
                  Motto
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => handleNavLink('events')}
            className={`block w-full text-left font-medium py-2 rounded-lg px-3 transition-colors cursor-pointer ${currentPage === 'events' ? 'bg-brand-pale text-brand-forest font-bold' : 'text-slate-700 hover:text-brand-forest hover:bg-brand-light'
              }`}
          >
            Events
          </button>
          <button
            onClick={() => handleNavLink('gallery')}
            className={`block w-full text-left font-medium py-2 rounded-lg px-3 transition-colors cursor-pointer ${currentPage === 'gallery' ? 'bg-brand-pale text-brand-forest font-bold' : 'text-slate-700 hover:text-brand-forest hover:bg-brand-light'
              }`}
          >
            Gallery
          </button>
          <button
            onClick={() => handleNavLink('performance')}
            className="block w-full text-left font-medium py-2 rounded-lg px-3 transition-colors cursor-pointer text-slate-700 hover:text-brand-forest hover:bg-brand-light"
          >
            Performance
          </button>
          <button
            onClick={() => handleNavLink('contact')}
            className={`block w-full text-center py-2.5 rounded-full font-medium transition-colors cursor-pointer ${currentPage === 'contact' ? 'bg-brand-forestHover text-white ring-2 ring-brand-forest font-bold' : 'bg-brand-forest hover:bg-brand-forestHover text-brand-white'
              }`}
          >
            Contact Us
          </button>

          {currentPage === 'history' && (
            <div className="flex items-center justify-between pt-2 border-t border-brand-pale">
              <span className="text-xs text-slate-500 font-medium">History Language:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onChangeHistoryLang('en')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${historyLang === 'en' ? 'bg-brand-forest text-white' : 'bg-brand-light text-slate-700'
                    }`}
                >
                  English
                </button>
                <button
                  onClick={() => onChangeHistoryLang('ta')}
                  className={`px-3 py-1 rounded-full text-xs font-semibold font-tamil ${historyLang === 'ta' ? 'bg-brand-forest text-white' : 'bg-brand-light text-slate-700'
                    }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
