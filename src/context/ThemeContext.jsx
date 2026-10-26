import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const THEME_STORAGE_KEY = 'kcc_theme_v2';
const LEGACY_STORAGE_KEY = 'kcc_theme';

/**
 * ThemeProvider Component
 * 
 * Manages theme state ('system' | 'dark' | 'light'), automatically detecting
 * and synchronizing with the user's OS / browser color scheme preferences in real-time.
 * By default, detects system theme and applies it. Users can still manually switch themes
 * via the toggle button, and switching back to match the system theme restores automatic tracking.
 */
export function ThemeProvider({ children }) {
  // Real-time system dark mode preference tracking
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Stored mode preference: 'system' | 'dark' | 'light'
  // Defaults to 'system' so it automatically detects OS / browser color scheme
  const [theme, setThemeState] = useState(() => {
    try {
      if (typeof window !== 'undefined' && localStorage.getItem(LEGACY_STORAGE_KEY)) {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      }
      const stored = localStorage.getItem(THEME_STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      return 'system';
    } catch {
      return 'system';
    }
  });

  // Computed boolean indicating if the screen is currently dark
  const isDark = theme === 'system' ? systemPrefersDark : theme === 'dark';
  const isSystem = theme === 'system';

  // Listen to system OS theme changes dynamically
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const prefersDark = Boolean(e.matches);
      setSystemPrefersDark(prefersDark);
      
      // When system OS theme changes (e.g. Windows Dark/Light setting change),
      // adapt to the new system theme automatically and re-sync
      setThemeState('system');
      try {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {
        // ignore
      }
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
      if (newTheme === 'system') {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } else {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      }
    } catch (e) {
      console.warn('Unable to persist theme to localStorage:', e);
    }
  }, []);

  // Helper to run circular view transition or fallback spreading/shrinking from the button
  const runThemeTransition = useCallback((event, targetDark, applyChange) => {
    // If not in browser or reduced motion is preferred
    if (
      typeof document === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      applyChange();
      return;
    }

    // Determine center coordinate of the trigger button (or click coordinate)
    let x = Math.round(window.innerWidth / 2);
    let y = Math.round(window.innerHeight / 2);

    const targetEl = event?.currentTarget || event?.target;
    if (targetEl && typeof targetEl.getBoundingClientRect === 'function') {
      const rect = targetEl.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        x = Math.round(rect.left + rect.width / 2);
        y = Math.round(rect.top + rect.height / 2);
      }
    } else if (event?.clientX !== undefined && event?.clientY !== undefined && (event.clientX !== 0 || event.clientY !== 0)) {
      x = event.clientX;
      y = event.clientY;
    }

    // Compute maximum distance to the furthest screen corner with a safety buffer
    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    ) + 16;

    // If target is dark: SPREAD outward from button
    // If target is light: SHRINK back into the button
    const isShrinking = !targetDark;

    // Modern View Transitions API (Chrome, Edge, Safari 18+)
    if (typeof document.startViewTransition === 'function') {
      document.documentElement.setAttribute(
        'data-theme-transition',
        isShrinking ? 'shrink' : 'expand'
      );

      const transition = document.startViewTransition(() => {
        try {
          flushSync(() => {
            applyChange();
          });
        } catch {
          applyChange();
        }
      });

      transition.ready.then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        document.documentElement.animate(
          {
            clipPath: isShrinking ? [...clipPath].reverse() : clipPath,
          },
          {
            duration: 440,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
            pseudoElement: isShrinking ? '::view-transition-old(root)' : '::view-transition-new(root)',
          }
        );
      });

      transition.finished.finally(() => {
        document.documentElement.removeAttribute('data-theme-transition');
      });
      return;
    }

    // Fallback for browsers without View Transitions API
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.pointerEvents = 'none';
    ripple.style.zIndex = '999999';
    ripple.style.backgroundColor = '#0b120c';

    const size = endRadius * 2;

    if (isShrinking) {
      // Dark to Light fallback: start dark overlay full size, apply light theme, then shrink into button
      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;
      ripple.style.transition = 'width 0.42s cubic-bezier(0.4, 0, 0.2, 1), height 0.42s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s ease 0.35s';
      document.body.appendChild(ripple);

      applyChange();

      requestAnimationFrame(() => {
        ripple.style.width = '0px';
        ripple.style.height = '0px';
      });

      setTimeout(() => {
        ripple.remove();
      }, 450);
    } else {
      // Light to Dark fallback: start at button and expand outward
      ripple.style.width = '0px';
      ripple.style.height = '0px';
      ripple.style.transition = 'width 0.42s cubic-bezier(0.4, 0, 0.2, 1), height 0.42s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.18s ease 0.35s';
      document.body.appendChild(ripple);

      requestAnimationFrame(() => {
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
      });

      setTimeout(() => {
        applyChange();
        ripple.style.opacity = '0';
        setTimeout(() => {
          ripple.remove();
        }, 260);
      }, 200);
    }
  }, []);

  const resetToSystem = useCallback((event) => {
    runThemeTransition(event, systemPrefersDark, () => {
      const root = document.documentElement;
      if (systemPrefersDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
      setTheme('system');
    });
  }, [systemPrefersDark, setTheme, runThemeTransition]);

  // Smart toggle: switches between Dark and Light mode with circular spreading effect.
  // If switching brings the theme in line with the active OS system theme,
  // it automatically returns to 'system' mode to keep automatic sync alive.
  const toggleTheme = useCallback((event) => {
    const nextDark = !isDark;
    const matchesSystem = (nextDark === systemPrefersDark);
    const targetMode = matchesSystem ? 'system' : (nextDark ? 'dark' : 'light');

    runThemeTransition(event, nextDark, () => {
      const root = document.documentElement;
      if (nextDark) {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
      setTheme(targetMode);
    });
  }, [isDark, systemPrefersDark, setTheme, runThemeTransition]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        isDark,
        isSystem,
        systemPrefersDark,
        toggleTheme,
        resetToSystem
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
