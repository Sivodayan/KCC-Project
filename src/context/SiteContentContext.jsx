import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultSiteContent from '../data/siteContent.json';

const STORAGE_KEY = 'kcc_site_content_v1';
const SiteContentContext = createContext(null);

export function SiteContentProvider({ children }) {
  // Load initially from localStorage if present, else fallback to defaultSiteContent
  const [content, setContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultSiteContent,
          ...parsed,
          meta: { ...defaultSiteContent.meta, ...parsed?.meta },
          announcement: { ...defaultSiteContent.announcement, ...parsed?.announcement },
          hero: { ...defaultSiteContent.hero, ...parsed?.hero },
          principles: {
            ...defaultSiteContent.principles,
            ...parsed?.principles,
            customCards: parsed?.principles?.customCards || defaultSiteContent.principles.customCards || []
          },
          performance: {
            ...defaultSiteContent.performance,
            ...parsed?.performance,
            customStats: parsed?.performance?.customStats || defaultSiteContent.performance.customStats || []
          },
          gallery: parsed?.gallery || defaultSiteContent.gallery || [],
          events: {
            ...defaultSiteContent.events,
            ...parsed?.events,
            customEvents: parsed?.events?.customEvents || defaultSiteContent.events.customEvents || []
          },
          contact: { ...defaultSiteContent.contact, ...parsed?.contact },
          anthem: { ...defaultSiteContent.anthem, ...parsed?.anthem }
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved site content from localStorage:', e);
    }
    return defaultSiteContent;
  });

  const [hasLocalOverrides, setHasLocalOverrides] = useState(() => {
    try {
      return Boolean(localStorage.getItem(STORAGE_KEY));
    } catch {
      return false;
    }
  });

  // Keep localStorage updated with any changes
  const saveContent = useCallback((updater) => {
    setContent(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        setHasLocalOverrides(true);
      } catch (err) {
        console.error('Error saving to localStorage:', err);
      }
      return next;
    });
  }, []);

  // Update specific top-level section
  const updateSection = useCallback((section, data) => {
    saveContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }));
  }, [saveContent]);

  // Section specific convenience setters
  const updateMeta = useCallback((meta) => updateSection('meta', meta), [updateSection]);
  const updateAnnouncement = useCallback((announcement) => updateSection('announcement', announcement), [updateSection]);
  const updateHero = useCallback((hero) => updateSection('hero', hero), [updateSection]);
  const updateContact = useCallback((contact) => updateSection('contact', contact), [updateSection]);
  const updateAnthem = useCallback((anthem) => updateSection('anthem', anthem), [updateSection]);

  // Principles & Pillars
  const updatePrinciples = useCallback((principles) => updateSection('principles', principles), [updateSection]);

  const addPrincipleCard = useCallback((newCard) => {
    saveContent(prev => {
      const card = {
        id: newCard.id || `pillar_${Date.now()}`,
        titleEn: newCard.titleEn || '',
        titleTa: newCard.titleTa || '',
        descEn: newCard.descEn || '',
        descTa: newCard.descTa || '',
        badge: newCard.badge || 'Pillar'
      };
      const customCards = [...(prev.principles?.customCards || []), card];
      return {
        ...prev,
        principles: {
          ...prev.principles,
          customCards
        }
      };
    });
  }, [saveContent]);

  const deletePrincipleCard = useCallback((cardId) => {
    saveContent(prev => ({
      ...prev,
      principles: {
        ...prev.principles,
        customCards: (prev.principles?.customCards || []).filter(c => c.id !== cardId)
      }
    }));
  }, [saveContent]);

  // Performance & Stats
  const updatePerformance = useCallback((performanceData) => {
    saveContent(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        ...performanceData
      }
    }));
  }, [saveContent]);

  const addCustomStat = useCallback((newStat) => {
    saveContent(prev => {
      const stat = {
        id: newStat.id || `stat_${Date.now()}`,
        label: newStat.label || '',
        labelTa: newStat.labelTa || '',
        value: Number(newStat.value) || 0,
        suffix: newStat.suffix || '+',
        description: newStat.description || ''
      };
      const customStats = [...(prev.performance?.customStats || []), stat];
      return {
        ...prev,
        performance: {
          ...prev.performance,
          customStats
        }
      };
    });
  }, [saveContent]);

  const deleteCustomStat = useCallback((statId) => {
    saveContent(prev => ({
      ...prev,
      performance: {
        ...prev.performance,
        customStats: (prev.performance?.customStats || []).filter(s => s.id !== statId)
      }
    }));
  }, [saveContent]);

  // Gallery
  const addGalleryImage = useCallback((newImg) => {
    saveContent(prev => {
      const item = {
        id: newImg.id || `gal_${Date.now()}`,
        src: newImg.src || '/assets/hero.jpg',
        caption: newImg.caption || 'Campus Memory',
        category: newImg.category || 'Campus'
      };
      return {
        ...prev,
        gallery: [item, ...(prev.gallery || [])]
      };
    });
  }, [saveContent]);

  const deleteGalleryImage = useCallback((imgId) => {
    saveContent(prev => ({
      ...prev,
      gallery: (prev.gallery || []).filter(item => item.id !== imgId && item.src !== imgId)
    }));
  }, [saveContent]);

  const updateGalleryImage = useCallback((imgId, updatedFields) => {
    saveContent(prev => ({
      ...prev,
      gallery: (prev.gallery || []).map(item => {
        if (item.id === imgId || item.src === imgId) {
          return { ...item, ...updatedFields };
        }
        return item;
      })
    }));
  }, [saveContent]);

  // Events
  const addEvent = useCallback((newEvent) => {
    saveContent(prev => {
      const item = {
        id: newEvent.id || `evt_${Date.now()}`,
        title: newEvent.title || 'New College Event',
        titleTa: newEvent.titleTa || '',
        date: newEvent.date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        category: newEvent.category || 'General',
        badge: newEvent.badge || 'Upcoming',
        description: newEvent.description || '',
        image: newEvent.image || '/assets/hero.jpg',
        link: newEvent.link || ''
      };
      const customEvents = [item, ...(prev.events?.customEvents || [])];
      return {
        ...prev,
        events: {
          ...prev.events,
          customEvents
        }
      };
    });
  }, [saveContent]);

  const updateEvent = useCallback((eventId, fields) => {
    saveContent(prev => ({
      ...prev,
      events: {
        ...prev.events,
        customEvents: (prev.events?.customEvents || []).map(evt =>
          evt.id === eventId ? { ...evt, ...fields } : evt
        )
      }
    }));
  }, [saveContent]);

  const deleteEvent = useCallback((eventId) => {
    saveContent(prev => ({
      ...prev,
      events: {
        ...prev.events,
        customEvents: (prev.events?.customEvents || []).filter(evt => evt.id !== eventId)
      }
    }));
  }, [saveContent]);

  // Reset to default
  const resetToDefaults = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      setContent(defaultSiteContent);
      setHasLocalOverrides(false);
      return true;
    } catch (e) {
      console.error('Reset failed:', e);
      return false;
    }
  }, []);

  // Export content as JSON
  const exportJson = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kcc_site_content_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [content]);

  // Import JSON content
  const importJson = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        saveContent(parsed);
        return { success: true };
      }
      return { success: false, error: 'Invalid JSON format' };
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
    updateMeta,
    updateAnnouncement,
    updateHero,
    updatePrinciples,
    addPrincipleCard,
    deletePrincipleCard,
    updatePerformance,
    addCustomStat,
    deleteCustomStat,
    addGalleryImage,
    deleteGalleryImage,
    updateGalleryImage,
    addEvent,
    updateEvent,
    deleteEvent,
    updateContact,
    updateAnthem,
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
