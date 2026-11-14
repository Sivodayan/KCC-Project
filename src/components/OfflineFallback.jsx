import React, { useState, useEffect, useCallback } from 'react';

const PING_ENDPOINT = '/assets/logo.png';
const PING_TIMEOUT_MS = 4000;

export default function OfflineFallback() {
  const [isOnline, setIsOnline] = useState(() => (
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : false
  ));
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [lastChecked, setLastChecked] = useState(() => new Date().toLocaleTimeString());
  const [connectionType, setConnectionType] = useState('standard');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const syncNetworkState = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      setCheckResult(online ? 'online' : 'offline');
      setLastChecked(new Date().toLocaleTimeString());
    };

    window.addEventListener('online', syncNetworkState);
    window.addEventListener('offline', syncNetworkState);

    const navConn = typeof navigator !== 'undefined' ? navigator.connection : null;
    if (navConn) {
      setConnectionType(navConn.effectiveType || 'standard');
      const onConnectionChange = () => setConnectionType(navConn.effectiveType || 'standard');
      navConn.addEventListener('change', onConnectionChange);
      return () => {
        window.removeEventListener('online', syncNetworkState);
        window.removeEventListener('offline', syncNetworkState);
        navConn.removeEventListener('change', onConnectionChange);
      };
    }

    return () => {
      window.removeEventListener('online', syncNetworkState);
      window.removeEventListener('offline', syncNetworkState);
    };
  }, []);

  const handleCheckConnection = useCallback(async () => {
    setIsChecking(true);
    setCheckResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PING_TIMEOUT_MS);

    try {
      const res = await fetch(`${PING_ENDPOINT}?t=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      const reachable = res.ok || res.status === 304 || res.type === 'opaque';
      setIsOnline(reachable);
      setCheckResult(reachable ? 'online' : 'offline');
    } catch {
      const fallbackOnline = typeof navigator !== 'undefined' && navigator.onLine;
      setIsOnline(fallbackOnline);
      setCheckResult(fallbackOnline ? 'online' : 'offline');
    } finally {
      clearTimeout(timeoutId);
      setIsChecking(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  const handleReload = useCallback(() => {
    window.location.reload();
  }, []);

  const diagnosticMetrics = [
    {
      label: 'Network Status',
      value: isOnline ? 'Connected' : 'Disconnected',
      icon: (
        <span
          className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}
          aria-hidden="true"
        />
      ),
    },
    {
      label: 'Connection Type',
      value: connectionType.toUpperCase(),
      icon: (
        <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      label: 'Last Verified',
      value: lastChecked,
      icon: (
        <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <main className="flex-grow py-6 sm:py-10 bg-brand-white dark:bg-[#0b120c] transition-colors animate-page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {checkResult === 'online' && (
          <aside
            role="status"
            aria-live="polite"
            className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 rounded-2xl p-4 flex items-center justify-between text-emerald-900 dark:text-emerald-200 shadow-xs animate-fade-up"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-3 w-3 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold truncate">
                  Connection restored! You are back online.
                </p>
                <p className="text-[11px] sm:text-xs text-emerald-700 dark:text-emerald-300/80">
                  இணைய இணைப்பு மீண்டும் கிடைத்துள்ளது.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReload}
              className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer shrink-0"
            >
              Reload Page
            </button>
          </aside>
        )}

        {checkResult === 'offline' && (
          <aside
            role="status"
            aria-live="polite"
            className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-2xl p-4 flex items-center justify-between text-amber-900 dark:text-amber-200 shadow-xs animate-fade-up"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs sm:text-sm font-bold truncate">
                  Still offline. Connection could not be established.
                </p>
                <p className="text-[11px] sm:text-xs text-amber-700 dark:text-amber-300/80">
                  இணைய இணைப்பு இன்னும் கிடைக்கவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 shrink-0 hidden sm:inline">
              Checked {lastChecked}
            </span>
          </aside>
        )}

        <section className="bg-brand-white dark:bg-[#111e13] rounded-3xl border border-brand-pale dark:border-emerald-900/40 p-6 sm:p-12 shadow-xs text-center relative overflow-hidden animate-fade-up">
          <div
            className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none"
            aria-hidden="true"
          >
            <img
              src="/assets/logo.png"
              alt=""
              className="w-96 h-96 object-contain"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-brand-light/90 dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 flex items-center justify-center shadow-inner relative group transition-transform hover:scale-105 duration-300">
                  <svg
                    className="w-16 h-16 sm:w-20 sm:h-20 text-brand-forest dark:text-emerald-400"
                    viewBox="0 0 64 64"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 23C17.5 17.5 24.5 14.5 32 14.5C39.5 14.5 46.5 17.5 52 23"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="opacity-35"
                    />
                    <path
                      d="M18 29.5C21.8 25.7 26.8 23.5 32 23.5C37.2 23.5 42.2 25.7 46 29.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className="opacity-70"
                    />
                    <path
                      d="M24 36.5C26.1 34.3 29 33 32 33C35 33 37.9 34.3 40 36.5"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx="32" cy="46" r="3.5" fill="currentColor" />
                    <line
                      x1="11"
                      y1="11"
                      x2="53"
                      y2="53"
                      stroke="#ef4444"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    <circle cx="50" cy="14" r="3" fill="#ef4444" />
                  </svg>
                </div>

                <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-500/10 dark:bg-red-950/80 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
              </div>
            </div>

            <header className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                No Internet Connection
              </h1>
              <p className="font-tamil text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto">
                இணைய இணைப்பு துண்டிக்கப்பட்டது. உங்கள் சாதனத்தின் இணைய இணைப்பை சரிபார்க்கவும்.
              </p>
            </header>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              We couldn't load this content right now. Please check your network connection and try again.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleCheckConnection}
                disabled={isChecking}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-forest hover:bg-brand-forestHover text-brand-white font-bold text-xs sm:text-sm shadow-xs transition-all hover:scale-105 active:scale-95 disabled:opacity-60 disabled:hover:scale-100 cursor-pointer"
              >
                <svg
                  className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>{isChecking ? 'Checking Connection...' : 'Try Again'}</span>
              </button>

              <button
                type="button"
                onClick={handleReload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-white dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-700 dark:text-slate-200 hover:text-brand-forest dark:hover:text-emerald-300 font-bold text-xs sm:text-sm shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reload Page</span>
              </button>
            </div>
          </div>
        </section>

        <section aria-label="Connection diagnostics" className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {diagnosticMetrics.map((card) => (
            <div
              key={card.label}
              className="bg-brand-white dark:bg-[#111e13] rounded-2xl border border-brand-pale dark:border-emerald-900/40 p-4 shadow-2xs text-left"
            >
              <span className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {card.label}
              </span>
              <div className="mt-1 flex items-center gap-2">
                {card.icon}
                <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                  {card.value}
                </span>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
