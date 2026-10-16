import React, { createContext, useContext, useState, useCallback } from 'react';
import defaultSiteContent from '../data/siteContent.json';
import { FACEBOOK_POSTS } from '../data/facebookEvents.js';

const STORAGE_KEY = 'kcc_site_content_v1';
const SiteContentContext = createContext(null);

/**
 * Utility to parse any Facebook URL or iframe embed snippet
 * and format it into a standardized Facebook plugin iframe embed URL.
 */
export function parseFacebookInput(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();
  if (!trimmed) return null;

  // Case 1: Pasted iframe code (e.g. <iframe src="https://www.facebook.com/plugins/post.php?href=..." ...></iframe>)
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) {
    const rawSrc = iframeMatch[1];
    const hrefMatch = rawSrc.match(/href=([^&]+)/);
    const postUrl = hrefMatch ? decodeURIComponent(hrefMatch[1]) : rawSrc;
    return {
      postUrl,
      iframeSrc: rawSrc,
      width: 500,
      height: 645
    };
  }

  // Case 2: Already a facebook plugin URL (plugins/post.php or plugins/video.php)
  if (trimmed.includes('facebook.com/plugins/')) {
    const hrefMatch = trimmed.match(/href=([^&]+)/);
    const postUrl = hrefMatch ? decodeURIComponent(hrefMatch[1]) : trimmed;
    return {
      postUrl,
      iframeSrc: trimmed,
      width: 500,
      height: 645
    };
  }

  // Case 3: Standard Facebook URL (post, permalink, reel, video, photo)
  let cleanUrl = trimmed.replace('m.facebook.com', 'www.facebook.com');
  const isVideo = cleanUrl.includes('/watch') || cleanUrl.includes('/reel') || cleanUrl.includes('/videos/');
  const plugin = isVideo ? 'video.php' : 'post.php';
  const iframeSrc = `https://www.facebook.com/plugins/${plugin}?href=${encodeURIComponent(cleanUrl)}&show_text=true&width=500`;

  return {
    postUrl: cleanUrl,
    iframeSrc,
    width: 500,
    height: 645
  };
}

/**
 * SiteContentProvider
 * Centralized content state provider for user-customizable text, stats, gallery, events, and contact information.
 * Supports:
 * 1. Active React component state (in-memory)
 * 2. Browser localStorage overrides (persists edits across reloads)
 * 3. Packaged JSON defaults from siteContent.json (fallback)
 */
export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSiteContent,
          ...parsed,
          hero: { ...defaultSiteContent.hero, ...parsed?.hero },
          principles: {
            ...defaultSiteContent.principles,
            ...parsed?.principles
          },
          performance: {
            ...defaultSiteContent.performance,
            ...parsed?.performance
          },
          gallery: parsed?.gallery || defaultSiteContent.gallery || [],
          events: parsed?.events || defaultSiteContent.events || FACEBOOK_POSTS,
          contact: { ...defaultSiteContent.contact, ...parsed?.contact }
        };
      }
    } catch (e) {
      console.warn('Failed to parse cached site content:', e);
    }
    return {
      ...defaultSiteContent,
      events: defaultSiteContent.events || FACEBOOK_POSTS
    };
  });

  const [hasLocalOverrides, setHasLocalOverrides] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  const saveContent = useCallback((updater) => {
    setContent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setHasLocalOverrides(true);
      } catch (err) {
        console.error('LocalStorage write error:', err);
      }
      return next;
    });
  }, []);

  const updateSection = useCallback((section, data) => {
    saveContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  }, [saveContent]);

  const updateHero = useCallback((hero) => updateSection('hero', hero), [updateSection]);
  const updatePrinciples = useCallback((principles) => updateSection('principles', principles), [updateSection]);
  const updatePerformance = useCallback((performanceData) => updateSection('performance', performanceData), [updateSection]);
  const updateContact = useCallback((contact) => updateSection('contact', contact), [updateSection]);

  const addGalleryImage = useCallback((newImg) => {
    saveContent(prev => {
      if (Array.isArray(newImg)) {
        const newItems = newImg.map(item => ({
          src: typeof item === 'string' ? item : (item.src || '/assets/hero.jpg')
        }));
        return {
          ...prev,
          gallery: [...(prev.gallery || []), ...newItems]
        };
      }
      const src = typeof newImg === 'string' ? newImg : (newImg.src || '/assets/hero.jpg');
      return {
        ...prev,
        gallery: [...(prev.gallery || []), { src }]
      };
    });
  }, [saveContent]);

  const deleteGalleryImage = useCallback((indexOrSrc) => {
    saveContent(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter((item, idx) => {
        if (typeof indexOrSrc === 'number') return idx !== indexOrSrc;
        return item.src !== indexOrSrc;
      })
    }));
  }, [saveContent]);

  const updateGalleryImage = useCallback((index, newSrc) => {
    saveContent(prev => {
      const newGallery = [...(prev.gallery || [])];
      if (newGallery[index]) {
        newGallery[index] = { src: newSrc };
      }
      return {
        ...prev,
        gallery: newGallery
      };
    });
  }, [saveContent]);

  const addEvent = useCallback((eventOrFbUrl) => {
    saveContent(prev => {
      let newEvent;
      if (typeof eventOrFbUrl === 'string') {
        const parsed = parseFacebookInput(eventOrFbUrl);
        if (!parsed) return prev;
        newEvent = {
          id: `post-${Date.now()}`,
          ...parsed
        };
      } else {
        newEvent = {
          id: eventOrFbUrl.id || `post-${Date.now()}`,
          postUrl: eventOrFbUrl.postUrl,
          iframeSrc: eventOrFbUrl.iframeSrc,
          width: eventOrFbUrl.width || 500,
          height: eventOrFbUrl.height || 645
        };
      }
      return {
        ...prev,
        events: [newEvent, ...(prev.events || FACEBOOK_POSTS)]
      };
    });
  }, [saveContent]);

  const deleteEvent = useCallback((id) => {
    saveContent(prev => ({
      ...prev,
      events: (prev.events || FACEBOOK_POSTS).filter(ev => ev.id !== id)
    }));
  }, [saveContent]);

  const updateEvent = useCallback((id, updatedData) => {
    saveContent(prev => ({
      ...prev,
      events: (prev.events || FACEBOOK_POSTS).map(ev => {
        if (ev.id === id) {
          return { ...ev, ...updatedData };
        }
        return ev;
      })
    }));
  }, [saveContent]);

  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setContent(defaultSiteContent);
      setHasLocalOverrides(false);
      return true;
    } catch (e) {
      console.error('Failed to reset content defaults:', e);
      return false;
    }
  }, []);

  const exportJson = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kcc_site_content_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [content]);

  const importJson = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        saveContent(parsed);
        return { success: true };
      }
      return { success: false, error: 'Malformed JSON payload' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [saveContent]);

  const value = {
    content,
    hasLocalOverrides,
    defaultContent: defaultSiteContent,
    saveContent,
    updateSection,
    updateHero,
    updatePrinciples,
    updatePerformance,
    addGalleryImage,
    deleteGalleryImage,
    updateGalleryImage,
    addEvent,
    deleteEvent,
    updateEvent,
    updateContact,
    resetToDefaults,
    exportJson,
    importJson
  };

  return (
    <SiteContentContext.Provider value={value}>
      {children}
    </SiteContentContext.Provider>
  );
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider');
  }
  return context;
}
