import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const THEME_STORAGE_KEY = 'kcc_theme';

/**
 * ThemeProvider Component
 * 
 * Manages theme state ('system' | 'dark' | 'light'), automatically detecting
 * and synchronizing with the user's OS / browser color scheme preferences in real-time.
 */
export function ThemeProvider({ children }) {
  // Stored mode preference: 'system' | 'dark' | 'light'
  const [theme, setThemeState] = useState(() => {
    try {
      return localStorage.getItem(THEME_STORAGE_KEY) || 'system';
    } catch {
      return 'system';
    }
  });

  // Real-time system dark mode preference tracking
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Computed boolean indicating if the screen is currently dark
  const isDark = theme === 'system' ? systemPrefersDark : theme === 'dark';

  // Listen to system OS theme changes dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      setSystemPrefersDark(Boolean(e.matches));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
    }

    // Set initial value in case it changed between initial render and effect
    setSystemPrefersDark(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  // Synchronize <html> root class, colorScheme style, and mobile theme-color meta tag
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

    // Update browser address bar color for mobile devices
    const metaThemeColor = document.getElementById('meta-theme-color') || document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#0b120c' : '#196716');
    }
  }, [isDark]);

  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (e) {
      console.warn('Unable to persist theme to localStorage:', e);
    }
  }, []);

  // Quick toggle helper: cycles through system -> dark -> light
  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      setTheme(isDark ? 'light' : 'dark');
    } else if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('system');
    }
  }, [theme, isDark, setTheme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark,
        systemPrefersDark,
        toggleTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
