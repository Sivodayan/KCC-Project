import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AnthemPage from './pages/AnthemPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import SearchModal from './components/SearchModal.jsx';
import AnthemModal from './components/AnthemModal.jsx';
import { SiteContentProvider } from './context/SiteContentContext.jsx';

/**
 * Root Application Component
 * Manages routing, global modals, SEO metadata sync, and SPA redirects.
 */
export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const historyLang = searchParams.get('lang') === 'ta' ? 'ta' : 'en';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnthemOpen, setIsAnthemOpen] = useState(false);

  const getActivePageName = () => {
    const path = location.pathname.toLowerCase();
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/history')) return 'history';
    if (path.startsWith('/events')) return 'events';
    if (path.startsWith('/gallery')) return 'gallery';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/anthem')) return 'anthem';
    return 'home';
  };

  const currentPage = getActivePageName();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  // Handle SPA redirects from static hosts (GitHub Pages 404.html) and legacy hash URLs
  useEffect(() => {
    const redirectPath = sessionStorage.getItem('redirect_path');
    if (redirectPath) {
      sessionStorage.removeItem('redirect_path');
      navigate(redirectPath, { replace: true });
      return;
    }

    const hash = window.location.hash.toLowerCase();
    if (hash.startsWith('#admin')) {
      navigate('/admin', { replace: true });
    } else if (hash.startsWith('#history')) {
      navigate('/history', { replace: true });
    } else if (hash.startsWith('#events')) {
      navigate('/events', { replace: true });
    } else if (hash.startsWith('#gallery')) {
      navigate('/gallery', { replace: true });
    } else if (hash.startsWith('#principles')) {
      if (window.location.pathname === '/') {
        document.getElementById('principles')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#principles', { replace: true });
      }
    } else if (hash.startsWith('#performance')) {
      if (window.location.pathname === '/') {
        document.getElementById('performance')?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/#performance', { replace: true });
      }
    } else if (hash.startsWith('#contact')) {
      navigate('/contact', { replace: true });
    } else if (hash.startsWith('#anthem')) {
      navigate('/anthem', { replace: true });
    }
  }, [navigate]);

  const handleHistoryLangChange = useCallback((lang) => {
    const nextParams = new URLSearchParams(searchParams);
    if (lang === 'ta') {
      nextParams.set('lang', 'ta');
    } else {
      nextParams.delete('lang');
    }
    setSearchParams(nextParams, { replace: true });
  }, [searchParams, setSearchParams]);

  // Synchronize document title and OpenGraph metadata per route
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');

    let pageTitle = "J/Kopay Christian College";
    let descContent = "Official portal of J/Kopay Christian College (யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி), Kopay, Jaffna, Sri Lanka. Established in 1852. Academic excellence, history, traditions, and collegiate education.";

    if (path.startsWith('/admin')) {
      pageTitle = "Admin Portal | J/Kopay Christian College";
      descContent = "Administration portal for J/Kopay Christian College.";
    } else if (path.startsWith('/history')) {
      pageTitle = historyLang === 'ta'
        ? "கல்லூரி வரலாறு | J/Kopay Christian College (1849 - இன்று வரை)"
        : "History & Heritage | J/Kopay Christian College (Est. 1852)";
      descContent = "Explore the 170+ year historic timeline of J/Kopay Christian College (1849 - Present), from Robert Bren and the CMS English School to the modern collegiate era in Kopay, Jaffna.";
    } else if (path.startsWith('/events')) {
      pageTitle = "School Events & Facebook Updates | J/Kopay Christian College";
      descContent = "Explore latest sports meets, academic exhibitions, cultural festivals, prize givings, and campus milestones from the official Facebook community of Kopay Christian College.";
    } else if (path.startsWith('/gallery')) {
      pageTitle = "Photo Gallery & Campus Life | J/Kopay Christian College";
      descContent = "Explore our 3D digital photo gallery showcasing collegiate life, laboratory sessions, sports meets, and historic moments at J/Kopay Christian College.";
    } else if (path.startsWith('/contact')) {
      pageTitle = "Contact Us & Campus Location | J/Kopay Christian College";
      descContent = "Contact the administration office of J/Kopay Christian College, Kopay, Jaffna, Sri Lanka. Telephone: 021 223 0040. Email: kcckopay@gmail.com.";
    } else if (path.startsWith('/anthem')) {
      pageTitle = "School Anthem (பாடசாலைக் கீதம்) | J/Kopay Christian College";
      descContent = "Official School Anthem of J/Kopay Christian College (யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி). Composed in Ragam Hamsadhwani celebrating truth, justice, and collegiate heritage.";
    }

    document.title = pageTitle;
    if (metaDesc) metaDesc.setAttribute("content", descContent);
    if (ogTitle) ogTitle.setAttribute("content", pageTitle);
    if (ogDesc) ogDesc.setAttribute("content", descContent);
  }, [location.pathname, historyLang]);

  const handleNavigate = useCallback((page) => {
    if (page === 'performance') {
      if (location.pathname === '/') {
        const el = document.getElementById('performance');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#performance';
        }
      } else {
        navigate('/#performance');
      }
      return;
    }

    if (page === 'motto' || page === 'principles') {
      if (location.pathname === '/') {
        const el = document.getElementById('principles');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#principles';
        }
      } else {
        navigate('/#principles');
      }
      return;
    }

    let target = '/';
    if (page === 'history') target = '/history';
    else if (page === 'events') target = '/events';
    else if (page === 'gallery') target = '/gallery';
    else if (page === 'contact') target = '/contact';
    else if (page === 'anthem') target = '/anthem';

    navigate(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, location.pathname]);

  // Global hotkeys for accessible search invocation
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

  // Dedicated full-screen layout for admin console
  if (isAdminRoute) {
    return (
      <SiteContentProvider>
        <AdminPage />
      </SiteContentProvider>
    );
  }

  return (
    <SiteContentProvider>
      <div className="min-h-screen flex flex-col bg-brand-white text-slate-800 font-sans selection:bg-brand-pale selection:text-brand-forest antialiased">
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAnthem={() => setIsAnthemOpen(true)}
          historyLang={historyLang}
          onChangeHistoryLang={handleHistoryLangChange}
        />

        <Routes>
          <Route path="/" element={<HomePage onNavigate={handleNavigate} />} />
          <Route path="/history" element={<HistoryPage lang={historyLang} />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/anthem" element={<AnthemPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/performance" element={<Navigate to="/#performance" replace />} />
          <Route path="/academics" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer
          onNavigate={handleNavigate}
          onOpenAnthem={() => setIsAnthemOpen(true)}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onNavigate={handleNavigate}
          onOpenAnthem={() => setIsAnthemOpen(true)}
        />

        <AnthemModal
          isOpen={isAnthemOpen}
          onClose={() => setIsAnthemOpen(false)}
        />
      </div>
    </SiteContentProvider>
  );
}
