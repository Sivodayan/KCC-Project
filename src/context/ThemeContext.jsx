import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';

const ThemeContext = createContext();

export const THEME_STORAGE_KEY = 'kcc_theme_v2';
const LEGACY_STORAGE_KEY = 'kcc_theme';

export function ThemeProvider({ children }) {
  const [systemPrefersDark, setSystemPrefersDark] = useState(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

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

  const isDark = theme === 'system' ? systemPrefersDark : theme === 'dark';
  const isSystem = theme === 'system';

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemChange = (e) => {
      const prefersDark = Boolean(e.matches);
      setSystemPrefersDark(prefersDark);
      
      setThemeState('system');
      try {
        localStorage.removeItem(THEME_STORAGE_KEY);
      } catch {
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleSystemChange);
    }

    setSystemPrefersDark(mediaQuery.matches);

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemChange);
      }
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }

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

  const runThemeTransition = useCallback((event, targetDark, applyChange) => {
    if (
      typeof document === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      applyChange();
      return;
    }

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

    const endRadius = Math.ceil(
      Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
    ) + 16;

    const isShrinking = !targetDark;

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
        const keyframes = isShrinking
          ? [
              {
                clipPath: `circle(${endRadius}px at ${x}px ${y}px)`,
                opacity: 1,
              },
              {
                clipPath: `circle(0px at ${x}px ${y}px)`,
                opacity: 0,
              },
            ]
          : [
              {
                clipPath: `circle(0px at ${x}px ${y}px)`,
              },
              {
                clipPath: `circle(${endRadius}px at ${x}px ${y}px)`,
              },
            ];

        document.documentElement.animate(keyframes, {
          duration: 440,
          easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
          fill: 'forwards',
          pseudoElement: isShrinking ? '::view-transition-old(root)' : '::view-transition-new(root)',
        });
      });

      transition.finished
        .catch(() => {})
        .finally(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              document.documentElement.removeAttribute('data-theme-transition');
            });
          });
        });
      return;
    }

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
