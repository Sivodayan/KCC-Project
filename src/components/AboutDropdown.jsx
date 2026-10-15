import React, { useState, useRef, useEffect } from 'react';

export default function AboutDropdown({ onNavigate, onOpenAnthem }) {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);
  const containerRef = useRef(null);

  const clearCloseTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    clearCloseTimeout();
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

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
      clearCloseTimeout();
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleItemClick = (action) => {
    setIsOpen(false);
    if (action === 'history') {
      onNavigate('history');
    } else if (action === 'anthem') {
      onOpenAnthem();
    } else if (action === 'motto') {
      onNavigate('academics');
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="About menu"
        className={`nav-link px-4 py-1.5 rounded-full transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 ${
          isOpen
            ? 'text-brand-forest bg-brand-pale/70 font-semibold'
            : 'text-slate-700 hover:text-brand-forest hover:bg-brand-pale/60 font-medium'
        }`}
      >
        <span>About</span>
        <svg
          className={`w-3.5 h-3.5 text-brand-forest transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu Card */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute top-full left-0 mt-2 w-44 rounded-2xl bg-brand-white border border-brand-pale shadow-xl py-1.5 px-1.5 z-50 origin-top-left transition-all duration-200 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => handleItemClick('history')}
            className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-forest hover:bg-brand-light rounded-xl transition-colors cursor-pointer"
          >
            History
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleItemClick('anthem')}
            className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-forest hover:bg-brand-light rounded-xl transition-colors cursor-pointer"
          >
            Anthem
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => handleItemClick('motto')}
            className="w-full text-left px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-brand-forest hover:bg-brand-light rounded-xl transition-colors cursor-pointer"
          >
            Motto
          </button>
        </div>
      )}
    </div>
  );
}
