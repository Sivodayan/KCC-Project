import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import SearchModal from './components/SearchModal.jsx';
import AnthemModal from './components/AnthemModal.jsx';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [historyLang, setHistoryLang] = useState('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnthemOpen, setIsAnthemOpen] = useState(false);

  // Sync state with URL hash
  useEffect(() => {
    function handleHashChange() {
      const hash = window.location.hash.toLowerCase();
      if (hash.startsWith('#history')) {
        setCurrentPage('history');
      } else {
        setCurrentPage('home');
      }
    }

    // Check initial hash
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = useCallback((page, hash = '') => {
    if (page === 'history') {
      setCurrentPage('history');
      window.location.hash = '#history';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setCurrentPage('home');
      if (hash) {
        window.location.hash = hash;
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            el.classList.add('ring-4', 'ring-brand-pale', 'transition-all', 'duration-500');
            setTimeout(() => el.classList.remove('ring-4', 'ring-brand-pale'), 2000);
          }
        }, 80);
      } else {
        window.location.hash = '';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  // Global Keyboard shortcuts
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        else if (isAnthemOpen) setIsAnthemOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isAnthemOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-brand-white text-slate-800 font-sans selection:bg-brand-pale selection:text-brand-forest antialiased">
      {/* Top Header Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        historyLang={historyLang}
        onChangeHistoryLang={setHistoryLang}
      />

      {/* Conditional Rendering between Pages */}
      {currentPage === 'home' && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {currentPage === 'history' && (
        <HistoryPage lang={historyLang} />
      )}

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAnthem={() => setIsAnthemOpen(true)}
      />

      {/* Interactive Search Modal / Command Palette */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
        onOpenAnthem={() => setIsAnthemOpen(true)}
      />

      {/* Tamil School Anthem Modal (பாடசாலைக் கீதம்) */}
      <AnthemModal
        isOpen={isAnthemOpen}
        onClose={() => setIsAnthemOpen(false)}
      />
    </div>
  );
}
