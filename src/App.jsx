import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation, useSearchParams, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SearchModal from './components/SearchModal.jsx';
import AnthemModal from './components/AnthemModal.jsx';
import { SiteContentProvider } from './context/SiteContentContext.jsx';
import { GlassRouteLoader } from './components/GlassSkeleton.jsx';
import NetworkErrorBoundary from './components/NetworkErrorBoundary.jsx';
import OfflineFallback from './components/OfflineFallback.jsx';

import HomePage from './pages/HomePage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import EventsPage from './pages/EventsPage.jsx';
import GalleryPage from './pages/GalleryPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AnthemPage from './pages/AnthemPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));

function scrollToElementWithNavOffset(el) {
  if (!el) return;
  const header = document.getElementById('mainHeader') || document.querySelector('header');
  const navHeight = header ? header.getBoundingClientRect().height : 76;
  const elementPosition = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({
    top: Math.max(0, Math.round(elementPosition - navHeight)),
    behavior: 'smooth'
  });
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const historyLang = searchParams.get('lang') === 'ta' ? 'ta' : 'en';
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAnthemOpen, setIsAnthemOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(() => {
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true;
  });
  const [showRestoredNotice, setShowRestoredNotice] = useState(false);

  const wasOfflineRef = useRef(!navigator.onLine);

  useEffect(() => {
    let reloadTimer = null;
    let noticeTimer = null;

    const handleOnline = () => {
      setIsOnline(true);
      setShowRestoredNotice(true);

      // Automatically reload page when connection is restored after being offline
      if (wasOfflineRef.current) {
        wasOfflineRef.current = false;
        reloadTimer = setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        noticeTimer = setTimeout(() => setShowRestoredNotice(false), 3500);
      }
    };

    const handleOffline = () => {
      wasOfflineRef.current = true;
      setIsOnline(false);
      setShowRestoredNotice(false);
      if (reloadTimer) clearTimeout(reloadTimer);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (reloadTimer) clearTimeout(reloadTimer);
      if (noticeTimer) clearTimeout(noticeTimer);
    };
  }, []);

  useEffect(() => {
    const hasBanner = !isOnline || showRestoredNotice;
    if (hasBanner) {
      document.body.classList.add('has-offline-banner');
    } else {
      document.body.classList.remove('has-offline-banner');
    }
    return () => {
      document.body.classList.remove('has-offline-banner');
    };
  }, [isOnline, showRestoredNotice]);

  const getActivePageName = () => {
    const path = location.pathname.toLowerCase();
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/history')) return 'history';
    if (path.startsWith('/events')) return 'events';
    if (path.startsWith('/gallery')) return 'gallery';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/anthem')) return 'anthem';
    if (path === '/' || path === '') return 'home';
    return '404';
  };

  const currentPage = getActivePageName();
  const isAdminRoute = location.pathname.toLowerCase().startsWith('/admin');

  useEffect(() => {
    // Canonical cleanup for legacy or duplicate parameterized URLs reported by Google Search Console
    if ((location.pathname === '/' || location.pathname === '') && searchParams.has('lang')) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('lang');
      setSearchParams(nextParams, { replace: true });
    } else if (location.pathname.startsWith('/history') && searchParams.get('lang') === 'en') {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete('lang');
      setSearchParams(nextParams, { replace: true });
    }

    const redirectPath = sessionStorage.getItem('redirect_path');
    if (redirectPath) {
      sessionStorage.removeItem('redirect_path');
      if (typeof redirectPath === 'string' && redirectPath.startsWith('/') && !redirectPath.startsWith('//')) {
        navigate(redirectPath, { replace: true });
        return;
      }
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
        const el = document.getElementById('principles');
        if (el) scrollToElementWithNavOffset(el);
      } else {
        navigate('/#principles', { replace: true });
      }
    } else if (hash.startsWith('#performance')) {
      if (window.location.pathname === '/') {
        const el = document.getElementById('performance');
        if (el) scrollToElementWithNavOffset(el);
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

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const robotsMeta = document.querySelector('meta[name="robots"]');
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    let pageTitle = "J/Kopay Christian College";
    let descContent = "Official portal of J/Kopay Christian College (யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி), Kopay, Jaffna, Sri Lanka. Established in 1852. Academic excellence, history, traditions, and collegiate education.";

    if (path.startsWith('/admin')) {
      pageTitle = "Admin Portal";
      descContent = "Administration portal for J/Kopay Christian College.";
      if (robotsMeta) robotsMeta.setAttribute("content", "noindex, nofollow");
    } else {
      if (robotsMeta) robotsMeta.setAttribute("content", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

      if (path.startsWith('/history')) {
        pageTitle = historyLang === 'ta'
          ? "கல்லூரி வரலாறு"
          : "History & Heritage";
        descContent = "Explore the 170+ year historic timeline of J/Kopay Christian College (1849 - Present), from Robert Bren and the CMS English School to the modern collegiate era in Kopay, Jaffna.";
      } else if (path.startsWith('/events')) {
        pageTitle = "School Events";
        descContent = "Explore latest sports meets, academic exhibitions, cultural festivals, prize givings, and school milestones from the official Facebook community of Kopay Christian College.";
      } else if (path.startsWith('/gallery')) {
        pageTitle = "Photo Gallery";
        descContent = "Explore our photo gallery showcasing school life, laboratory sessions, sports meets, and historic moments at J/Kopay Christian College.";
      } else if (path.startsWith('/contact')) {
        pageTitle = "Contact Us";
        descContent = "Contact the administration office of J/Kopay Christian College, Kopay, Jaffna, Sri Lanka. Telephone: 021 223 0040. Email: kcckopay@gmail.com.";
      } else if (path.startsWith('/anthem')) {
        pageTitle = "School Anthem";
        descContent = "Official School Anthem of J/Kopay Christian College (யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி). Composed in Ragam Hamsadhwani celebrating truth, justice, and collegiate heritage.";
      } else if (path !== '/' && path !== '') {
        pageTitle = "Page Not Found (404) | J/Kopay Christian College";
        descContent = "The page you are looking for does not exist on the J/Kopay Christian College website.";
      }
    }

    document.title = pageTitle;
    if (metaDesc) metaDesc.setAttribute("content", descContent);
    if (ogTitle) ogTitle.setAttribute("content", pageTitle);
    if (ogDesc) ogDesc.setAttribute("content", descContent);

    if (typeof window !== 'undefined') {
      let canonicalHref = `${window.location.origin}${location.pathname}`;
      if (path.startsWith('/history') && historyLang === 'ta') {
        canonicalHref = `${window.location.origin}/history?lang=ta`;
      }
      if (canonicalLink) canonicalLink.setAttribute("href", canonicalHref);
      if (ogUrl) ogUrl.setAttribute("content", canonicalHref);

      // Manage hreflang annotations dynamically for search engine bots
      const updateHreflang = (lang, href) => {
        let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
        if (!el) {
          el = document.createElement('link');
          el.setAttribute('rel', 'alternate');
          el.setAttribute('hreflang', lang);
          document.head.appendChild(el);
        }
        el.setAttribute('href', href);
      };

      if (path.startsWith('/history')) {
        updateHreflang('en', `${window.location.origin}/history`);
        updateHreflang('ta', `${window.location.origin}/history?lang=ta`);
        updateHreflang('x-default', `${window.location.origin}/history`);
      } else {
        document.querySelectorAll('link[rel="alternate"][hreflang]').forEach(el => el.remove());
      }
    }
  }, [location.pathname, historyLang]);

  const handleNavigate = useCallback((page) => {
    if (page === 'performance') {
      if (location.pathname === '/') {
        const el = document.getElementById('performance');
        if (el) {
          scrollToElementWithNavOffset(el);
          window.history.replaceState(null, '', '/#performance');
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
          scrollToElementWithNavOffset(el);
          window.history.replaceState(null, '', '/#principles');
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

  useEffect(() => {
    let observer = null;

    const revealElements = () => {
      const items = document.querySelectorAll('.reveal-item:not(.is-visible), .history-card-reveal:not(.is-visible)');
      if (!items.length) return;

      const triggerBottom = window.innerHeight * 0.94;
      items.forEach((el) => {
        const top = el.getBoundingClientRect().top;
        if (top < triggerBottom) {
          el.classList.add('is-visible');
          el.setAttribute('data-revealed', 'true');
          if (observer) observer.unobserve(el);
        } else if (observer) {
          observer.observe(el);
        }
      });
    };

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              entry.target.setAttribute('data-revealed', 'true');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.05, rootMargin: '0px 0px -25px 0px' }
      );
    }

    revealElements();
    const rafId = requestAnimationFrame(revealElements);
    const t1 = setTimeout(revealElements, 80);
    const t2 = setTimeout(revealElements, 220);
    const t3 = setTimeout(revealElements, 550);

    window.addEventListener('scroll', revealElements, { passive: true });
    window.addEventListener('resize', revealElements, { passive: true });

    let mutationObserver = null;
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        revealElements();
      });
      mutationObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme-transition']
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', revealElements);
      window.removeEventListener('resize', revealElements);
      if (observer) observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, [location.pathname]);

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

  if (isAdminRoute) {
    return (
      <SiteContentProvider>
        {!isOnline && (
          <aside
            role="status"
            aria-live="polite"
            className="bg-amber-600 dark:bg-amber-700 text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-md fixed top-0 inset-x-0 z-50 h-9 transition-colors animate-fade-down"
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="truncate">
                No Internet Connection - you are currently viewing cached content.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-xs font-bold underline hover:text-amber-100 transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          </aside>
        )}
        <Suspense fallback={<GlassRouteLoader />}>
          <AdminPage />
        </Suspense>
      </SiteContentProvider>
    );
  }

  return (
    <SiteContentProvider>
      <div className="min-h-screen flex flex-col bg-brand-white dark:bg-[#0b120c] text-slate-800 dark:text-slate-100 font-sans selection:bg-brand-pale selection:text-brand-forest dark:selection:bg-emerald-950 dark:selection:text-emerald-300 antialiased transition-colors duration-150">
        {/* Global Offline Bar - Fixed to top across viewport */}
        {!isOnline && (
          <aside
            role="status"
            aria-live="polite"
            className="bg-amber-600 dark:bg-amber-700 text-white px-4 py-2 text-xs sm:text-sm font-medium flex items-center justify-between shadow-md fixed top-0 inset-x-0 z-50 h-9 transition-colors animate-fade-down"
          >
            <div className="flex items-center gap-2 truncate pr-2">
              <span className="truncate">
                No Internet Connection - you are currently viewing cached content.
              </span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="text-xs font-bold underline hover:text-amber-100 transition-colors cursor-pointer"
              >
                Retry
              </button>
            </div>
          </aside>
        )}

        {/* Connection Restored Notification Banner */}
        {showRestoredNotice && (
          <aside
            role="status"
            aria-live="polite"
            className="bg-emerald-600 dark:bg-emerald-700 text-white px-4 py-2 text-xs sm:text-sm font-semibold flex items-center justify-between shadow-md fixed top-0 inset-x-0 z-50 h-9 animate-fade-down"
          >
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>Internet connection restored! Reloading page...</span>
            </div>
            <button
              type="button"
              onClick={() => setShowRestoredNotice(false)}
              className="text-xs text-white/80 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              ✕
            </button>
          </aside>
        )}

        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenAnthem={() => setIsAnthemOpen(true)}
          historyLang={historyLang}
          onChangeHistoryLang={handleHistoryLangChange}
        />

        <NetworkErrorBoundary locationKey={location.pathname} onOpenAnthem={() => setIsAnthemOpen(true)}>
          <Suspense fallback={<GlassRouteLoader />}>
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
              <Route path="*" element={<NotFoundPage onOpenSearch={() => setIsSearchOpen(true)} />} />
            </Routes>
          </Suspense>
        </NetworkErrorBoundary>

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
