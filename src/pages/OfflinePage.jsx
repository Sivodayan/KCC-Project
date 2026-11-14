import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function OfflinePage({ onOpenAnthem }) {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(() => {
    return typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true;
  });
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null); // 'online' | 'offline' | null
  const [lastChecked, setLastChecked] = useState(() => new Date().toLocaleTimeString());
  const [connectionInfo, setConnectionInfo] = useState({
    effectiveType: 'unknown',
    saveData: false,
  });

  // Track browser connection status
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = "No Internet Connection | J/Kopay Christian College";

    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      setCheckResult(online ? 'online' : 'offline');
      setLastChecked(new Date().toLocaleTimeString());
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    // Read Network Information API if available in browser
    if (typeof navigator !== 'undefined' && 'connection' in navigator && navigator.connection) {
      const conn = navigator.connection;
      setConnectionInfo({
        effectiveType: conn.effectiveType || 'standard',
        saveData: !!conn.saveData,
      });
      const updateConn = () => {
        setConnectionInfo({
          effectiveType: conn.effectiveType || 'standard',
          saveData: !!conn.saveData,
        });
      };
      conn.addEventListener('change', updateConn);
      return () => {
        window.removeEventListener('online', updateOnlineStatus);
        window.removeEventListener('offline', updateOnlineStatus);
        conn.removeEventListener('change', updateConn);
      };
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  // Real-world ping verification
  const handleCheckConnection = useCallback(async () => {
    setIsChecking(true);
    setCheckResult(null);

    try {
      // Test connectivity with a lightweight cache-busted fetch to the local origin
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch(`/assets/logo.png?ping=${Date.now()}`, {
        method: 'HEAD',
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.ok || response.status === 304 || response.type === 'opaque') {
        setIsOnline(true);
        setCheckResult('online');
      } else {
        setIsOnline(false);
        setCheckResult('offline');
      }
    } catch {
      // If fetch fails or aborts, verify with navigator.onLine fallback
      if (typeof navigator !== 'undefined' && navigator.onLine) {
        // May have intranet or captive portal
        setIsOnline(true);
        setCheckResult('online');
      } else {
        setIsOnline(false);
        setCheckResult('offline');
      }
    } finally {
      setIsChecking(false);
      setLastChecked(new Date().toLocaleTimeString());
    }
  }, []);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <main className="flex-grow py-6 sm:py-10 bg-brand-white dark:bg-[#0b120c] transition-colors animate-page-enter">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Status Notification Banner (shows after checking or on online recovery) */}
        {checkResult === 'online' && (
          <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/60 rounded-2xl p-4 flex items-center justify-between text-emerald-900 dark:text-emerald-200 shadow-xs animate-fade-up">
            <div className="flex items-center gap-3 min-w-0">
              <span className="flex h-3 w-3 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
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
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleReload}
                className="px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              >
                Reload Page
              </button>
            </div>
          </div>
        )}

        {checkResult === 'offline' && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/60 rounded-2xl p-4 flex items-center justify-between text-amber-900 dark:text-amber-200 shadow-xs animate-fade-up">
            <div className="flex items-center gap-3 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
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
          </div>
        )}

        {/* Main Offline Hero Card */}
        <div className="bg-brand-white dark:bg-[#111e13] rounded-3xl border border-brand-pale dark:border-emerald-900/40 p-6 sm:p-12 shadow-xs text-center relative overflow-hidden animate-fade-up">
          {/* Subtle Crest Watermark Background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">
            <img src="/assets/logo.png" alt="" className="w-96 h-96 object-contain" />
          </div>

          <div className="relative z-10 space-y-6">
            {/* Animated Wi-Fi Disconnected Graphic */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Glowing decorative rings */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-brand-light/80 dark:bg-emerald-950/50 border border-brand-pale dark:border-emerald-800/40 flex items-center justify-center shadow-inner relative group">
                  <svg
                    className="w-12 h-12 sm:w-14 sm:h-14 text-brand-forest dark:text-emerald-400 transition-transform group-hover:scale-105 duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {/* WiFi off icon */}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                      d="M3 3l18 18M10.66 6.34A13.06 13.06 0 0112 6c4.09 0 7.8 1.88 10.28 4.88M4.93 4.93C3.12 6.57 1.74 8.65 1.05 11M6.34 10.66C7.94 9.61 9.88 9 12 9c1.07 0 2.09.15 3.05.43M8.53 14.53C9.5 13.9 10.7 13.5 12 13.5c1.17 0 2.27.32 3.2 1.01M12 18.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                    />
                  </svg>
                </div>

                {/* Status indicator badge */}
                <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-red-500/10 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span>{isOnline ? 'Active' : 'Offline'}</span>
                </div>
              </div>
            </div>

            {/* Title & Tamil Subheading */}
            <div className="space-y-2">

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                No Internet Connection
              </h1>
              <p className="font-tamil text-sm sm:text-base text-slate-600 dark:text-slate-400 font-medium max-w-lg mx-auto">
                இணைய இணைப்பு துண்டிக்கப்பட்டது. உங்கள் சாதனத்தின் இணைய இணைப்பை சரிபார்க்கவும்.
              </p>
            </div>

            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              We couldn't reach the school portal. This might happen due to a weak Wi-Fi signal, disabled mobile data, or temporary network outage.
            </p>

            {/* Interactive Action Buttons */}
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
                <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Return to Home</span>
              </button>


            </div>
          </div>
        </div>

        {/* Diagnostic Status & Network Info Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-brand-white dark:bg-[#111e13] rounded-2xl border border-brand-pale dark:border-emerald-900/40 p-4 shadow-2xs text-left">
            <span className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Network Status
            </span>
            <div className="mt-1 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                {isOnline ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="bg-brand-white dark:bg-[#111e13] rounded-2xl border border-brand-pale dark:border-emerald-900/40 p-4 shadow-2xs text-left">
            <span className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Connection Type
            </span>
            <div className="mt-1 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 uppercase">
                {connectionInfo.effectiveType}
              </span>
            </div>
          </div>

          <div className="bg-brand-white dark:bg-[#111e13] rounded-2xl border border-brand-pale dark:border-emerald-900/40 p-4 shadow-2xs text-left">
            <span className="block text-[10px] font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Last Verified
            </span>
            <div className="mt-1 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
                {lastChecked}
              </span>
            </div>
          </div>
        </div>






      </div>
    </main>
  );
}
