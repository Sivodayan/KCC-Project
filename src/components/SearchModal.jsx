import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const searchItems = [
  {
    title: "School Events & Facebook Community Updates",
    category: "Events",
    url: "events",
    action: "navigate"
  },
  {
    title: "Annual Prize Giving & Student Achievements",
    category: "Events",
    url: "events",
    action: "navigate"
  },
  {
    title: "Inter-House Sports Meet & Athletics",
    category: "Events",
    url: "events",
    action: "navigate"
  },
  {
    title: "Cultural Festivals & College Celebrations",
    category: "Events",
    url: "events",
    action: "navigate"
  },
  {
    title: "Official Facebook Community Page",
    category: "Social",
    url: "https://www.facebook.com/profile.php?id=61575442051109",
    action: "external"
  },
  {
    title: "Campus Life Journal & 3D Digital Gallery",
    category: "Gallery",
    url: "gallery",
    action: "navigate"
  },
  {
    title: "College History Timeline (1849 - Present)",
    category: "History",
    url: "history",
    action: "navigate"
  },
  {
    title: "Tamil History Chronicle",
    category: "History",
    url: "history?lang=ta",
    action: "navigate"
  },
  {
    title: "Founded Year 1852 (170+ Years of Service)",
    category: "Heritage",
    url: "history",
    action: "navigate"
  },
  {
    title: "Motto: Truth and Justice",
    category: "Heritage",
    url: "motto",
    action: "navigate"
  },
  {
    title: "Vision: The Ideal School in Peninsula",
    category: "Heritage",
    url: "motto",
    action: "navigate"
  },
  {
    title: "Mission Statement",
    category: "Heritage",
    url: "motto",
    action: "navigate"
  },
  {
    title: "School Anthem",
    category: "Tradition",
    url: "anthem",
    action: "navigate"
  },
  {
    title: "Key Performance & Enrolment Metrics",
    category: "Academics",
    url: "performance",
    action: "navigate"
  },
  {
    title: "G.C.E. O/L Examination Results (94.2%)",
    category: "Academics",
    url: "performance",
    action: "navigate"
  },
  {
    title: "G.C.E. A/L University Qualifying Rate (78%)",
    category: "Academics",
    url: "performance",
    action: "navigate"
  },
  {
    title: "Clubs & Societies (18 Co-Curriculars)",
    category: "Activities",
    url: "performance",
    action: "navigate"
  },
  {
    title: "Science & ICT Smart Laboratories",
    category: "Facilities",
    url: "performance",
    action: "navigate"
  },
  {
    title: "College Administrative Office",
    category: "Contact",
    url: "contact",
    action: "navigate"
  },
  {
    title: "Campus Location & Google Maps Directions",
    category: "Contact",
    url: "https://maps.app.goo.gl/UMsXzzu46QNMNwcB8",
    action: "external"
  },
  {
    title: "Instagram Official Tag (@kopaychristiancollege)",
    category: "Social",
    url: "https://www.instagram.com/explore/tags/kopaychristiancollege/",
    action: "external"
  }
];

export default function SearchModal({ isOpen, onClose, onNavigate, onOpenAnthem }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);
  const routerNavigate = useNavigate();

  const filteredItems = searchItems
    .filter(item => {
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      return (
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (!query.trim()) return 0;
      const q = query.toLowerCase().trim();
      const aTitle = a.title.toLowerCase();
      const bTitle = b.title.toLowerCase();
      const aStarts = aTitle.startsWith(q);
      const bStarts = bTitle.startsWith(q);
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      return 0;
    });

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex].scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  useEffect(() => {
    function handleGlobalKeyDown(e) {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex]);
        }
      }
    }
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isOpen, filteredItems, selectedIndex, onClose]);

  if (!isOpen) return null;

  function handleSelect(item) {
    onClose();
    if (item.action === 'external' && item.url) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else if (item.action === 'anthem') {
      onOpenAnthem();
    } else if (item.url?.includes('?')) {
      routerNavigate(`/${item.url}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(item.url);
    }
  }

  function handleQuickFilter(catName) {
    if (query.toLowerCase() === catName.toLowerCase()) {
      setQuery('');
    } else {
      setQuery(catName);
    }
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-brand-white max-w-2xl w-full rounded-2xl border border-brand-pale overflow-hidden flex flex-col shadow-2xl animate-modal-content max-h-[80vh]">
        <div className="p-4 sm:p-5 border-b border-brand-pale bg-brand-white flex items-center gap-3">
          <svg className="w-5 h-5 text-brand-forest shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            spellCheck="false"
            placeholder="Search events, facebook updates, history, anthem, contact, results..."
            className="w-full text-slate-800 text-sm sm:text-base bg-transparent placeholder:text-slate-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                if (inputRef.current) inputRef.current.focus();
              }}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-brand-light transition-colors cursor-pointer"
              aria-label="Clear input"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <div className="px-4 py-2.5 bg-brand-light/70 border-b border-brand-pale/70 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Quick:</span>
          <button
            type="button"
            onClick={() => handleQuickFilter('Events')}
            className={`px-2.5 py-1 rounded-full border transition-all shrink-0 cursor-pointer text-xs ${query.toLowerCase() === 'events'
                ? 'bg-brand-forest text-white border-brand-forest font-semibold shadow-xs'
                : 'bg-brand-white border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40'
              }`}
          >
            Events & FB
          </button>
          <button
            type="button"
            onClick={() => handleQuickFilter('History')}
            className={`px-2.5 py-1 rounded-full border transition-all shrink-0 cursor-pointer text-xs ${query.toLowerCase() === 'history'
                ? 'bg-brand-forest text-white border-brand-forest font-semibold shadow-xs'
                : 'bg-brand-white border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40'
              }`}
          >
            History
          </button>
          <button
            type="button"
            onClick={() => handleQuickFilter('Anthem')}
            className={`px-2.5 py-1 rounded-full border transition-all shrink-0 cursor-pointer text-xs ${query.toLowerCase() === 'anthem'
                ? 'bg-brand-forest text-white border-brand-forest font-semibold shadow-xs'
                : 'bg-brand-white border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40'
              }`}
          >
            School Anthem
          </button>
          <button
            type="button"
            onClick={() => handleQuickFilter('Gallery')}
            className={`px-2.5 py-1 rounded-full border transition-all shrink-0 cursor-pointer text-xs ${query.toLowerCase() === 'gallery'
                ? 'bg-brand-forest text-white border-brand-forest font-semibold shadow-xs'
                : 'bg-brand-white border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40'
              }`}
          >
            3D Gallery
          </button>
          <button
            type="button"
            onClick={() => handleQuickFilter('Contact')}
            className={`px-2.5 py-1 rounded-full border transition-all shrink-0 cursor-pointer text-xs ${query.toLowerCase() === 'contact'
                ? 'bg-brand-forest text-white border-brand-forest font-semibold shadow-xs'
                : 'bg-brand-white border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40'
              }`}
          >
            Contact Office
          </button>
        </div>

        <div className="overflow-y-auto divide-y divide-brand-pale/60 p-2 text-sm max-h-[50vh]">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500">
              <svg className="w-10 h-10 mx-auto text-slate-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="font-semibold text-slate-700">No matching results found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching for "Events", "Facebook", "History", "Anthem", or "Contact"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`search-item px-3.5 py-3 rounded-xl cursor-pointer transition-all flex items-center justify-between gap-3 select-none ${isSelected
                      ? 'bg-brand-light border border-brand-pale text-brand-forest shadow-2xs translate-x-0.5'
                      : 'hover:bg-brand-light/60 text-slate-700'
                    }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="font-semibold text-slate-900 text-sm block truncate">{item.title}</span>
                  </div>
                  <div className="shrink-0 flex items-center text-xs font-semibold text-brand-forest gap-1 opacity-80">
                    <span>{item.action === 'external' ? 'Open' : 'Go'}</span>
                    {item.action === 'external' ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="p-3 bg-brand-light/50 border-t border-brand-pale flex items-center justify-between text-[11px] text-slate-500 px-4">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">↑</kbd>{' '}
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">↓</kbd> navigate
            </span>
            <span>
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">↵</kbd> select
            </span>
          </div>
          <span className="font-medium text-brand-forest">
            {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} available
          </span>
        </div>
      </div>
    </div>
  );
}
