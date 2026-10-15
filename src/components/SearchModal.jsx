import React, { useState, useEffect, useRef } from 'react';

const searchItems = [
  {
    title: "School Events & Facebook Community Updates",
    tamil: "பாடசாலை நிகழ்வுகள் & பேஸ்புக் செய்திகள்",
    category: "Events",
    description: "Official Facebook community updates from கோப்பாய் கிறிஸ்தவ கல்லூரி மாணவர்கள்",
    url: "events",
    action: "navigate"
  },
  {
    title: "Campus Life Journal & Image Gallery",
    tamil: "கல்லூரி நினைவுகள் & புகைப்படத் தொகுப்பு",
    category: "Gallery",
    description: "11 historic campus moments, sports meet, science labs, celebrations & collegiate life",
    url: "gallery",
    action: "navigate"
  },
  {
    title: "College History (1849 - Present)",
    tamil: "கல்லூரி வரலாறு (1849 - இன்று வரை)",
    category: "History",
    description: "CMS English School founding, Robert Bren, Bren Hall, Principals & Managers timeline",
    url: "history",
    action: "navigate"
  },
  {
    title: "Motto: Truth and Justice",
    tamil: "மகுடவாசகம்: உண்மைக்கும் நேர்மைக்கும்",
    category: "Heritage",
    description: "The core motto of Kopay Christian College fostering truth and upright character",
    url: "academics",
    action: "navigate"
  },
  {
    title: "Vision: The Ideal School in Peninsula",
    tamil: "தூரநோக்கு: குடாநாட்டின் முன்மாதிரிப் பாடசாலை",
    category: "Heritage",
    description: "Leading Northern Province secondary and collegiate education",
    url: "academics",
    action: "navigate"
  },
  {
    title: "Mission Statement",
    tamil: "நோக்கக்கூற்று: விழுமியங்கள், கடமைகள்",
    category: "Heritage",
    description: "Fostering self-respect, character, patriotism, and optimum resource utilization",
    url: "academics",
    action: "navigate"
  },
  {
    title: "School Anthem (பாடசாலைக் கீதம்)",
    tamil: "பாடசாலைக் கீதம் (வாழிய நம் கலைக்கூடமே)",
    category: "Tradition",
    description: "College anthem composed in Ragam Hamsadhwani celebrating KCC",
    url: "anthem",
    action: "navigate"
  },
  {
    title: "Key Numbers & Performance",
    tamil: "செயற்திறன் புள்ளிவிபரங்கள்",
    category: "Academics",
    description: "Pass rates, 386+ enrolled students, 46 faculty mentors, 18 clubs & societies",
    url: "performance",
    action: "navigate"
  },
  {
    title: "Founded Year 1852",
    tamil: "நிறுவப்பட்ட ஆண்டு 1852",
    category: "Heritage",
    description: "Over 170+ years of dedicated service to secondary education in Kopay",
    url: "history",
    action: "navigate"
  },
  {
    title: "G.C.E. O/L Examination Results (94.2%)",
    tamil: "க.பொ.த சாதாரண தரப் பரீட்சை பெறுபேறுகள்",
    category: "Academics",
    description: "High achievement records in national general certificate examinations",
    url: "performance",
    action: "navigate"
  },
  {
    title: "G.C.E. A/L University Qualifying Rate (78%)",
    tamil: "பல்கலைக்கழக அனுமதி வீதம் (78%)",
    category: "Academics",
    description: "Science, Commerce, Arts, and Technology collegiate education",
    url: "performance",
    action: "navigate"
  },
  {
    title: "Four Competitive Houses (விளையாட்டு இல்லங்கள்)",
    tamil: "விளையாட்டு இல்லங்கள் (4 Competitive Houses)",
    category: "Sports",
    description: "Annual sports meet division, athletic spirit, and team rivalry",
    url: "events",
    action: "navigate"
  },
  {
    title: "Clubs & Societies (18 Co-Curriculars)",
    tamil: "பாடசாலைச் சங்கங்களும் மன்றங்களும் (18)",
    category: "Activities",
    description: "Tamil Literary Association, Science Union, ICT Club, Scouts & Guides",
    url: "performance",
    action: "navigate"
  },
  {
    title: "Science & ICT Smart Facilities",
    tamil: "விஞ்ஞான & கணனி ஆய்வுகூடங்கள்",
    category: "Facilities",
    description: "Modern computer laboratory and advanced science experimental units",
    url: "academics",
    action: "navigate"
  },
  {
    title: "College Office & Direct Contact",
    tamil: "கல்லூரி அலுவலகம் & தொடர்புகள்",
    category: "Contact",
    description: "Address: Kopay, Jaffna | Tel: 021 223 0040 | Email: kcckopay@gmail.com",
    url: "contact",
    action: "navigate"
  },
  {
    title: "Online Inquiry & Message Form",
    tamil: "விசாரணைப் படிவம்",
    category: "Contact",
    description: "Send inquiries directly to the college administration office",
    url: "contact",
    action: "navigate"
  }
];

export default function SearchModal({ isOpen, onClose, onNavigate, onOpenAnthem }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const itemRefs = useRef([]);

  const filteredItems = searchItems.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.tamil.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
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
    if (item.action === 'anthem') {
      onOpenAnthem();
    } else {
      onNavigate(item.url);
    }
  }

  function getCategoryBadgeClass(category) {
    if (category === 'Events') return 'bg-[#1877F2]/15 text-[#1877F2] font-semibold';
    if (category === 'History') return 'bg-amber-100 text-amber-800';
    if (category === 'Heritage') return 'bg-emerald-100 text-emerald-800';
    if (category === 'Tradition') return 'bg-indigo-100 text-indigo-800';
    if (category === 'Academics') return 'bg-blue-100 text-blue-800';
    if (category === 'Sports') return 'bg-orange-100 text-orange-800';
    return 'bg-brand-pale text-brand-forest';
  }

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-brand-white max-w-2xl w-full rounded-2xl border border-brand-pale overflow-hidden flex flex-col shadow-2xl animate-modal-content max-h-[80vh]">
        {/* Search Input Header */}
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
            placeholder="Search history, anthem, admissions, staff, results, contact..."
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
          <kbd className="hidden sm:inline-block text-[11px] bg-brand-light border border-brand-pale px-2 py-0.5 rounded text-slate-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* Quick Category Filter Chips */}
        <div className="px-4 py-2.5 bg-brand-light/70 border-b border-brand-pale/70 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">Quick:</span>
          <button
            type="button"
            onClick={() => setQuery('History')}
            className="px-2.5 py-1 rounded-full bg-brand-white border border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40 transition-colors shrink-0 cursor-pointer"
          >
            History (வரலாறு)
          </button>
          <button
            type="button"
            onClick={() => setQuery('Anthem')}
            className="px-2.5 py-1 rounded-full bg-brand-white border border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40 transition-colors shrink-0 cursor-pointer"
          >
            பாடசாலைக் கீதம்
          </button>
          <button
            type="button"
            onClick={() => setQuery('Performance')}
            className="px-2.5 py-1 rounded-full bg-brand-white border border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40 transition-colors shrink-0 cursor-pointer"
          >
            Performance
          </button>
          <button
            type="button"
            onClick={() => setQuery('Contact')}
            className="px-2.5 py-1 rounded-full bg-brand-white border border-brand-pale hover:border-brand-soft text-brand-forest hover:bg-brand-pale/40 transition-colors shrink-0 cursor-pointer"
          >
            Contact Office
          </button>
        </div>

        {/* Results List Container */}
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
              <p className="text-xs text-slate-400 mt-1">Try searching for "History", "Anthem", "1852", or "Contact"</p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const isSelected = index === selectedIndex;
              const catClass = getCategoryBadgeClass(item.category);

              return (
                <div
                  key={index}
                  ref={(el) => (itemRefs.current[index] = el)}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`search-item p-3 sm:p-3.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-brand-light border border-brand-pale text-brand-forest'
                      : 'hover:bg-brand-light/60 text-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${catClass}`}>
                        {item.category}
                      </span>
                      <span className="font-bold text-slate-900 text-sm">{item.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                    <p className="text-[11px] font-tamil text-brand-forest font-medium">{item.tamil}</p>
                  </div>
                  <div className="shrink-0 flex items-center text-xs font-semibold text-brand-forest gap-1 pt-1 opacity-70">
                    <span>Go</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-brand-light/50 border-t border-brand-pale flex items-center justify-between text-[11px] text-slate-500 px-4">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">↑</kbd>{' '}
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">↓</kbd> navigate
            </span>
            <span>
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">↵</kbd> select
            </span>
            <span>
              <kbd className="bg-brand-white border border-brand-pale px-1 rounded">esc</kbd> close
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
