import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContent, parseFacebookInput } from '../context/SiteContentContext.jsx';
import { processImageFile, formatBytes, MAX_FILE_SIZE_MB } from '../utils/imageUpload.js';
import { commitFileToGitHub, verifyGitHubToken } from '../utils/githubSync.js';
import GlassImage from '../components/GlassImage.jsx';

const DEFAULT_PIN = 'kcc1852';
const PIN_STORAGE_KEY = 'kcc_admin_pin';
const SESSION_AUTH_KEY = 'kcc_admin_session_auth';
const LAST_ACTIVE_KEY = 'kcc_admin_last_active';
const GITHUB_TOKEN_STORAGE_KEY = 'kcc_admin_github_token';
const INACTIVITY_TIMEOUT_MS = 15 * 60 * 1000; // 15 minutes of inactivity
const GITHUB_REPO_URL = 'https://github.com/Sivodayan/KCC-Project';

/**
 * AdminPage Component
 *
 * Hidden management console for J/Kopay Christian College.
 * Contains only the actual customizable sections from the real website:
 * 1. Hero Section
 * 2. Motto, Vision & Mission
 * 3. Key Numbers & Performance
 * 4. Photo Gallery (PC file upload & URL management)
 * 5. School Events (Facebook iframe embeds)
 * 6. Contact Information
 * 7. Settings & Repository Backup
 */
export default function AdminPage() {
  const navigate = useNavigate();
  const {
    content,
    hasLocalOverrides,
    canUndo,
    canRedo,
    undoCount,
    redoCount,
    undo,
    redo,
    commitContinuous,
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
  } = useSiteContent();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const isAuth = sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
    if (!isAuth) return false;
    const lastActive = Number(sessionStorage.getItem(LAST_ACTIVE_KEY) || '0');
    // If last active timestamp is older than timeout duration, expire session
    if (lastActive && Date.now() - lastActive >= INACTIVITY_TIMEOUT_MS) {
      sessionStorage.removeItem(SESSION_AUTH_KEY);
      sessionStorage.removeItem(LAST_ACTIVE_KEY);
      return false;
    }
    return true;
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  const [activeTab, setActiveTab] = useState('hero');

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  const handleUndo = useCallback(() => {
    if (!canUndo) return;
    const success = undo();
    if (success) {
      showToast('Action undone (Ctrl+Z)', 'info');
    }
  }, [canUndo, undo]);

  const handleRedo = useCallback(() => {
    if (!canRedo) return;
    const success = redo();
    if (success) {
      showToast('Action redone (Ctrl+Y)', 'info');
    }
  }, [canRedo, redo]);

  // Global Keyboard shortcuts for Undo (Ctrl+Z / Cmd+Z) and Redo (Ctrl+Y / Ctrl+Shift+Z / Cmd+Shift+Z)
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleKeyDown = (e) => {
      const isMac = typeof navigator !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;
      if (!cmdOrCtrl) return;

      const key = e.key.toLowerCase();

      // Redo: Ctrl+Y or Ctrl+Shift+Z
      if (key === 'y' || (key === 'z' && e.shiftKey)) {
        e.preventDefault();
        handleRedo();
        return;
      }

      // Undo: Ctrl+Z (without shift)
      if (key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated, handleUndo, handleRedo]);

  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);
  const [newGallerySrc, setNewGallerySrc] = useState('');
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState('');
  const [compressOption, setCompressOption] = useState(true);
  const [photoStats, setPhotoStats] = useState(null);
  const [modalFile, setModalFile] = useState(null);
  const [replaceCardIndex, setReplaceCardIndex] = useState(null);

  const multiFileInputRef = useRef(null);
  const modalFileInputRef = useRef(null);
  const cardFileInputRef = useRef(null);

  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEventInput, setNewEventInput] = useState('');
  const [newEventHeight, setNewEventHeight] = useState(645);
  const parsedNewEvent = parseFacebookInput(newEventInput);

  const [currentPinSetting, setCurrentPinSetting] = useState(() => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  });
  const [newPinInput, setNewPinInput] = useState('');

  // GitHub Direct Commit State
  const [isCommitModalOpen, setIsCommitModalOpen] = useState(false);
  const [githubToken, setGithubToken] = useState(() => {
    return localStorage.getItem(GITHUB_TOKEN_STORAGE_KEY) || '';
  });
  const [showGithubToken, setShowGithubToken] = useState(false);
  const [commitMessage, setCommitMessage] = useState('');
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitResult, setCommitResult] = useState(null);
  const [commitError, setCommitError] = useState('');
  const [saveTokenChoice, setSaveTokenChoice] = useState(true);

  // GitHub User Profile Verification (for Settings tab)
  const [verifiedUser, setVerifiedUser] = useState(null);
  const [isVerifyingToken, setIsVerifyingToken] = useState(false);
  const [tokenVerifyError, setTokenVerifyError] = useState('');

  const handleOpenCommitModal = () => {
    commitContinuous();
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setCommitMessage(`Update website content via KCC Admin Panel [${dateStr}]`);
    setCommitResult(null);
    setCommitError('');
    setIsCommitModalOpen(true);
  };

  const handleCommitToGitHub = async (e) => {
    if (e) e.preventDefault();
    if (!githubToken.trim()) {
      setCommitError('GitHub Personal Access Token (PAT) is required.');
      return;
    }

    setIsCommitting(true);
    setCommitError('');
    setCommitResult(null);

    try {
      if (saveTokenChoice) {
        localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, githubToken.trim());
      } else {
        localStorage.removeItem(GITHUB_TOKEN_STORAGE_KEY);
      }

      const contentString = JSON.stringify(content, null, 2);
      const result = await commitFileToGitHub({
        owner: 'Sivodayan',
        repo: 'KCC-Project',
        path: 'src/data/siteContent.json',
        branch: 'main',
        token: githubToken.trim(),
        contentString,
        commitMessage: commitMessage.trim() || undefined
      });

      setCommitResult(result);
      showToast(`Committed to GitHub! (${result.commitSha})`, 'success');
    } catch (err) {
      console.error('GitHub Commit Error:', err);
      setCommitError(err.message || 'Failed to commit changes to GitHub.');
      showToast(err.message || 'Commit failed', 'error');
    } finally {
      setIsCommitting(false);
    }
  };

  const handleVerifyToken = async () => {
    if (!githubToken.trim()) {
      setTokenVerifyError('Please enter a Personal Access Token first.');
      return;
    }
    setIsVerifyingToken(true);
    setTokenVerifyError('');
    try {
      const user = await verifyGitHubToken(githubToken.trim());
      setVerifiedUser(user);
      localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, githubToken.trim());
      showToast(`Verified GitHub identity: @${user.login}`, 'success');
    } catch (err) {
      setVerifiedUser(null);
      setTokenVerifyError(err.message || 'Verification failed');
      showToast(err.message || 'Verification failed', 'error');
    } finally {
      setIsVerifyingToken(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      sessionStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));
      setPinError('');
      showToast('Welcome to KCC Admin Panel', 'success');
    } else {
      setPinError('Incorrect passcode. Please try again.');
    }
  };

  const handleLogout = (reason = '') => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    sessionStorage.removeItem(LAST_ACTIVE_KEY);
    setPinInput('');
    if (reason) {
      setPinError(reason);
    }
  };

  // Inactivity auto-logout watcher (15 minutes idle timeout)
  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId = null;
    let warningTimeoutId = null;

    const resetInactivityTimer = () => {
      sessionStorage.setItem(LAST_ACTIVE_KEY, String(Date.now()));

      if (timeoutId) clearTimeout(timeoutId);
      if (warningTimeoutId) clearTimeout(warningTimeoutId);

      // Warning 1 minute before timeout
      const warningDelay = Math.max(INACTIVITY_TIMEOUT_MS - 60 * 1000, 1000);
      warningTimeoutId = setTimeout(() => {
        showToast('Session warning: Inactive for 14 minutes. Auto-lock will occur in 1 minute.', 'error');
      }, warningDelay);

      // Automatic logout on full timeout
      timeoutId = setTimeout(() => {
        handleLogout('Session expired due to 15 minutes of inactivity.');
        showToast('Logged out due to inactivity', 'error');
      }, INACTIVITY_TIMEOUT_MS);
    };

    let lastRecorded = 0;
    const handleUserActivity = () => {
      const now = Date.now();
      // Throttle activity recording to at most once every 2 seconds
      if (now - lastRecorded > 2000) {
        lastRecorded = now;
        resetInactivityTimer();
      }
    };

    const handleVisibilityOrFocus = () => {
      const lastActive = Number(sessionStorage.getItem(LAST_ACTIVE_KEY) || '0');
      if (lastActive && Date.now() - lastActive >= INACTIVITY_TIMEOUT_MS) {
        handleLogout('Session expired due to inactivity while away.');
        showToast('Logged out due to inactivity', 'error');
      } else {
        resetInactivityTimer();
      }
    };

    // Initialize timer on mount
    resetInactivityTimer();

    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'];
    activityEvents.forEach((ev) => window.addEventListener(ev, handleUserActivity, { passive: true }));
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    window.addEventListener('focus', handleVisibilityOrFocus);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (warningTimeoutId) clearTimeout(warningTimeoutId);
      activityEvents.forEach((ev) => window.removeEventListener(ev, handleUserActivity));
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      window.removeEventListener('focus', handleVisibilityOrFocus);
    };
  }, [isAuthenticated]);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result;
      if (typeof text === 'string') {
        const res = importJson(text);
        if (res.success) {
          showToast('Configuration imported successfully!', 'success');
        } else {
          showToast('Import failed: ' + res.error, 'error');
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const processAndSetModalPhoto = async (file, shouldCompress) => {
    try {
      setIsProcessingPhoto(true);
      setPhotoUploadError('');
      const result = await processImageFile(file, { compress: shouldCompress });
      setNewGallerySrc(result.dataUrl);
      setPhotoStats(result);
      if (shouldCompress) {
        showToast(`Photo converted to WebP (${formatBytes(result.compressedSize)})!`, 'success');
      } else {
        showToast(`Photo loaded original format (${formatBytes(result.originalSize)})!`, 'success');
      }
    } catch (err) {
      setPhotoUploadError(err.message || 'Failed to process image');
      showToast(err.message, 'error');
    } finally {
      setIsProcessingPhoto(false);
    }
  };

  const handleModalFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setModalFile(file);
    await processAndSetModalPhoto(file, compressOption);
    e.target.value = '';
  };

  const handleModalDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (!file) return;
    setModalFile(file);
    await processAndSetModalPhoto(file, compressOption);
  };

  const handleToggleCompressOption = async (newValue) => {
    setCompressOption(newValue);
    if (modalFile) {
      await processAndSetModalPhoto(modalFile, newValue);
    }
  };

  const handleDirectMultiUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    try {
      setIsProcessingPhoto(true);
      const urls = [];
      const skipped = [];
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          skipped.push(file.name);
          continue;
        }
        try {
          const result = await processImageFile(file, { compress: true });
          urls.push(result.dataUrl);
        } catch {
          skipped.push(file.name);
        }
      }
      if (urls.length > 0) {
        addGalleryImage(urls);
        showToast(`${urls.length} WebP photo(s) added to gallery!`, 'success');
      }
      if (skipped.length > 0) {
        showToast(`${skipped.length} file(s) exceeded 5MB limit and were skipped.`, 'error');
      }
    } catch (err) {
      showToast('Upload error: ' + err.message, 'error');
    } finally {
      setIsProcessingPhoto(false);
      e.target.value = '';
    }
  };

  const handleReplaceCardFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || replaceCardIndex === null) return;
    try {
      setIsProcessingPhoto(true);
      const result = await processImageFile(file, { compress: true });
      updateGalleryImage(replaceCardIndex, result.dataUrl);
      showToast(`Photo updated to WebP (${formatBytes(result.compressedSize)})!`, 'success');
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setIsProcessingPhoto(false);
      setReplaceCardIndex(null);
      e.target.value = '';
    }
  };

  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPinInput.trim().length < 4) {
      showToast('Passcode must be at least 4 characters long', 'error');
      return;
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPinInput.trim());
    setCurrentPinSetting(newPinInput.trim());
    setNewPinInput('');
    showToast('Passcode updated successfully!', 'success');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-light/40 flex items-center justify-center p-4 selection:bg-brand-pale selection:text-brand-forest">
        <div className="w-full max-w-md bg-brand-white border border-brand-pale rounded-3xl p-8 shadow-xl text-slate-800">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-light border border-brand-pale flex items-center justify-center p-2.5 shadow-2xs">
              <img src="/assets/logo.png" alt="KCC" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-brand-forest">
              J/Kopay Christian College
            </h1>
            <p className="text-xs text-slate-500 font-tamil mt-1">
              யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி
            </p>
            <span className="mt-3 inline-block px-3 py-1 rounded-full bg-brand-light border border-brand-pale text-[11px] font-bold text-brand-forest">
              Admin Panel
            </span>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Passcode
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter passcode"
                  autoFocus
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest font-mono tracking-wider"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                  aria-label={showPin ? 'Hide passcode' : 'Show passcode'}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {showPin ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    )}
                  </svg>
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-rose-600 mt-2 font-medium">{pinError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white font-bold text-xs shadow-2xs transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Enter Admin Panel</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light/30 text-slate-800 flex flex-col font-sans selection:bg-brand-pale selection:text-brand-forest">
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold transition-all transform animate-bounce duration-300 ${toast.type === 'error'
              ? 'bg-rose-50 border border-rose-300 text-rose-800'
              : toast.type === 'info'
              ? 'bg-slate-900 border border-slate-700 text-white shadow-2xl'
              : 'bg-brand-light border border-brand-pale text-brand-forest'
            }`}
        >
          {toast.type === 'error' ? (
            <svg className="w-4 h-4 text-rose-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : toast.type === 'info' ? (
            <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 10h10a5 5 0 0 1 5 5v2m0 0l-4-4m4 4l4-4M3 10l4-4m-4 4l4 4" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-brand-forest shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-brand-white border-b border-brand-pale shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-brand-forest text-sm sm:text-base tracking-tight">
                    J/Kopay Christian College
                  </span>


                </div>
                <div className="text-[11px] text-slate-500 font-tamil flex items-center gap-1.5">
                  <span>யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி</span>
                  <span className="text-slate-300">•</span>
                  <a
                    href={GITHUB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-slate-500 hover:text-brand-forest hover:underline flex items-center gap-1"
                    title="Open GitHub Repository"
                  >
                    <span>Sivodayan/KCC-Project</span>
                    <svg className="w-3 h-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Undo / Redo History Controls */}
              <div className="inline-flex items-center rounded-full bg-brand-white border border-brand-pale p-0.5 shadow-2xs">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={!canUndo}
                  title={canUndo ? `Undo last change (Ctrl+Z) • ${undoCount} step${undoCount > 1 ? 's' : ''} available` : 'Nothing to undo (Ctrl+Z)'}
                  aria-label="Undo last change"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer select-none ${
                    canUndo
                      ? 'text-slate-700 hover:text-brand-forest hover:bg-brand-light active:scale-95'
                      : 'text-slate-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M3 10h10a5 5 0 0 1 5 5v2m0 0l-4-4m4 4l4-4M3 10l4-4m-4 4l4 4" />
                  </svg>
                  <span className="hidden sm:inline">Undo</span>
                  {undoCount > 0 && (
                    <span className="hidden md:inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-brand-pale/70 text-brand-forest">
                      {undoCount}
                    </span>
                  )}
                </button>

                <div className="w-[1px] h-4 bg-brand-pale" />

                <button
                  type="button"
                  onClick={handleRedo}
                  disabled={!canRedo}
                  title={canRedo ? `Redo change (Ctrl+Y or Ctrl+Shift+Z) • ${redoCount} step${redoCount > 1 ? 's' : ''} available` : 'Nothing to redo (Ctrl+Y)'}
                  aria-label="Redo change"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer select-none ${
                    canRedo
                      ? 'text-slate-700 hover:text-brand-forest hover:bg-brand-light active:scale-95'
                      : 'text-slate-300 cursor-not-allowed opacity-50'
                  }`}
                >
                  <span className="hidden sm:inline">Redo</span>
                  {redoCount > 0 && (
                    <span className="hidden md:inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-brand-pale/70 text-brand-forest">
                      {redoCount}
                    </span>
                  )}
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.3" d="M21 10H11a5 5 0 0 0-5 5v2m0 0l4-4m-4 4l-4-4m20-3l-4-4m4 4l-4 4" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                onClick={handleOpenCommitModal}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-2xs"
                title="Commit changes directly to GitHub repository (Triggers automated site rebuild)"
              >
                <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>Commit to GitHub</span>
                {hasLocalOverrides && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" title="Changes ready to commit" />
                )}
              </button>

              <button
                type="button"
                onClick={() => handleLogout()}
                className="p-2 rounded-full bg-brand-white border border-brand-pale text-slate-500 hover:text-rose-600 hover:bg-brand-light transition cursor-pointer shadow-2xs"
                title="Lock Admin Panel"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto py-2.5 border-t border-brand-pale/70 no-scrollbar text-xs">
            {[
              { id: 'hero', label: 'Hero Section' },
              { id: 'principles', label: 'Motto, Vision & Mission' },
              { id: 'performance', label: 'Performance' },
              { id: 'gallery', label: 'Photo Gallery' },
              { id: 'events', label: 'School Events' },
              { id: 'contact', label: 'Contact' },
              { id: 'settings', label: 'Settings' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  commitContinuous();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer font-semibold ${activeTab === tab.id
                    ? 'bg-brand-forest text-white shadow-2xs'
                    : 'text-slate-600 hover:text-brand-forest hover:bg-brand-pale/60 bg-brand-white border border-brand-pale/60'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-5">Hero Section</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">School Name (English)</label>
                  <input
                    type="text"
                    value={content.hero?.title || ''}
                    onChange={(e) => updateHero({ title: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">School Name (Tamil)</label>
                  <input
                    type="text"
                    value={content.hero?.tamilTitle || ''}
                    onChange={(e) => updateHero({ tamilTitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm font-tamil focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={content.hero?.subtitle || ''}
                    onChange={(e) => updateHero({ subtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Background Image Path</label>
                  <input
                    type="text"
                    value={content.hero?.image || ''}
                    onChange={(e) => updateHero({ image: e.target.value })}
                    placeholder="/assets/hero.jpg"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Button Text</label>
                  <input
                    type="text"
                    value={content.hero?.buttonText || ''}
                    onChange={(e) => updateHero({ buttonText: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-brand-pale">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Live Card Preview</span>
                <div className="relative rounded-2xl overflow-hidden bg-brand-forest border border-brand-soft/40 p-6 sm:p-8 text-white min-h-[180px] flex items-center shadow-md">
                  <div className="relative z-10 max-w-xl">
                    <h3 className="text-2xl font-extrabold text-white">{content.hero?.title}</h3>
                    <h4 className="text-lg font-bold text-brand-pale font-tamil mt-1">{content.hero?.tamilTitle}</h4>
                    <p className="text-xs sm:text-sm text-brand-light/90 mt-2 leading-relaxed">{content.hero?.subtitle}</p>
                    <div className="mt-4">
                      <span className="inline-block px-5 py-2 rounded-full bg-white text-brand-forest font-bold text-xs shadow-2xs">
                        {content.hero?.buttonText} →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MOTTO, VISION & MISSION */}
        {activeTab === 'principles' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-2">Motto, Vision &amp; Mission</h2>
              <p className="text-xs text-slate-600 mb-6">
                Customize the three core institutional pillars displayed in the interactive flip cards on the home page.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Motto */}
                <div className="bg-brand-light/40 border border-brand-pale rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-brand-forest uppercase tracking-wider">Motto (மகுடவாசகம்)</div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">English</label>
                    <input
                      type="text"
                      value={content.principles?.motto?.english || ''}
                      onChange={(e) => updatePrinciples({ motto: { ...content.principles?.motto, english: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-white border border-brand-pale text-slate-800 text-xs font-bold focus:outline-none focus:border-brand-forest"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Tamil</label>
                    <input
                      type="text"
                      value={content.principles?.motto?.tamil || ''}
                      onChange={(e) => updatePrinciples({ motto: { ...content.principles?.motto, tamil: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-white border border-brand-pale text-slate-800 text-xs font-bold font-tamil focus:outline-none focus:border-brand-forest"
                    />
                  </div>
                </div>

                {/* Vision */}
                <div className="bg-brand-light/40 border border-brand-pale rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-brand-forest uppercase tracking-wider">Vision (தூரநோக்கு)</div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">English</label>
                    <textarea
                      rows={3}
                      value={content.principles?.vision?.english || ''}
                      onChange={(e) => updatePrinciples({ vision: { ...content.principles?.vision, english: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-white border border-brand-pale text-slate-800 text-xs focus:outline-none focus:border-brand-forest leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Tamil</label>
                    <textarea
                      rows={3}
                      value={content.principles?.vision?.tamil || ''}
                      onChange={(e) => updatePrinciples({ vision: { ...content.principles?.vision, tamil: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-white border border-brand-pale text-slate-800 text-xs font-tamil focus:outline-none focus:border-brand-forest leading-relaxed"
                    />
                  </div>
                </div>

                {/* Mission */}
                <div className="bg-brand-light/40 border border-brand-pale rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-brand-forest uppercase tracking-wider">Mission (பணி இலக்கு)</div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">English</label>
                    <textarea
                      rows={4}
                      value={content.principles?.mission?.english || ''}
                      onChange={(e) => updatePrinciples({ mission: { ...content.principles?.mission, english: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-white border border-brand-pale text-slate-800 text-xs focus:outline-none focus:border-brand-forest leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-500 mb-1">Tamil</label>
                    <textarea
                      rows={4}
                      value={content.principles?.mission?.tamil || ''}
                      onChange={(e) => updatePrinciples({ mission: { ...content.principles?.mission, tamil: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-brand-white border border-brand-pale text-slate-800 text-xs font-tamil focus:outline-none focus:border-brand-forest leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-2">Key Numbers &amp; Performance</h2>
              <p className="text-xs text-slate-600 mb-6">
                Update the 8 official statistics displayed on the Key Numbers &amp; Performance grid.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: 'founded', label: 'Founded Year', val: content.performance?.founded },
                  { key: 'students', label: 'Enrolled Students', val: content.performance?.students },
                  { key: 'staff', label: 'Teaching Staff', val: content.performance?.staff },
                  { key: 'olPass', label: 'G.C.E. O/L Pass Rate (%)', val: content.performance?.olPass },
                  { key: 'alQual', label: 'University Qualifying (%)', val: content.performance?.alQual },
                  { key: 'clubs', label: 'Clubs & Societies', val: content.performance?.clubs },
                  { key: 'houses', label: 'Competitive Houses', val: content.performance?.houses },
                  { key: 'labs', label: 'Lab Coverage (%)', val: content.performance?.labs }
                ].map(stat => (
                  <div key={stat.key} className="bg-brand-light/30 border border-brand-pale rounded-2xl p-4">
                    <span className="block text-[11px] font-semibold text-slate-600 mb-1">{stat.label}</span>
                    <input
                      type="number"
                      step="any"
                      value={stat.val ?? ''}
                      onChange={(e) => updatePerformance({ [stat.key]: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 rounded-xl bg-brand-white border border-brand-pale text-brand-forest font-mono font-bold text-base focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            {/* Hidden file pickers for PC image uploads */}
            <input
              type="file"
              ref={multiFileInputRef}
              multiple
              accept="image/*"
              onChange={handleDirectMultiUpload}
              className="hidden"
            />
            <input
              type="file"
              ref={cardFileInputRef}
              accept="image/*"
              onChange={handleReplaceCardFileChange}
              className="hidden"
            />

            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-brand-forest">Photo Gallery</h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Manage the 3D gallery images displayed in the interactive carousel. Upload photos directly from your PC or enter image links.
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    type="button"
                    disabled={isProcessingPhoto}
                    onClick={() => multiFileInputRef.current?.click()}
                    className="px-4 py-2 rounded-full bg-brand-light border border-brand-pale hover:border-brand-soft text-brand-forest text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                    title="Choose one or multiple pictures from your computer"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    <span>{isProcessingPhoto ? 'Processing...' : 'Upload from PC'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setNewGallerySrc('');
                      setPhotoUploadError('');
                      setPhotoStats(null);
                      setModalFile(null);
                      setIsAddGalleryOpen(true);
                    }}
                    className="px-4 py-2 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Add Photo</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(content.gallery || []).map((img, idx) => (
                  <div key={idx} className="bg-brand-light/20 border border-brand-pale rounded-2xl overflow-hidden group shadow-2xs flex flex-col">
                    <div className="h-32 w-full overflow-hidden bg-slate-100 relative">
                      <GlassImage
                        src={img.src}
                        alt={`Photo ${idx + 1}`}
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        fallbackSrc="/assets/hero.jpg"
                      />
                      <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-brand-forest/90 text-white text-[10px] font-bold">
                        #{idx + 1}
                      </span>

                      {/* Replace from PC button on hover */}
                      <button
                        type="button"
                        onClick={() => {
                          setReplaceCardIndex(idx);
                          cardFileInputRef.current?.click();
                        }}
                        className="absolute top-1.5 right-1.5 p-1.5 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white transition shadow-sm cursor-pointer opacity-90 sm:opacity-0 group-hover:opacity-100"
                        title="Upload new picture from PC to replace this photo"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </button>
                    </div>

                    <div className="p-2.5 bg-brand-white flex-1 flex flex-col justify-between">
                      <input
                        type="text"
                        value={img.src}
                        onChange={(e) => updateGalleryImage(idx, e.target.value)}
                        placeholder="/assets/photo.jpg or data:image..."
                        className="w-full px-2 py-1 rounded bg-brand-white border border-brand-pale text-slate-700 text-[11px] font-mono focus:outline-none focus:border-brand-forest"
                        title={img.src}
                      />
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-brand-pale/60 text-xs">
                        <button
                          type="button"
                          onClick={() => {
                            setReplaceCardIndex(idx);
                            cardFileInputRef.current?.click();
                          }}
                          className="text-[11px] text-brand-forest hover:underline font-medium cursor-pointer flex items-center gap-1"
                          title="Choose photo from PC"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          <span>PC</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteGalleryImage(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-rose-50 transition cursor-pointer text-xs flex items-center gap-1"
                          title="Remove image"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ADD PHOTO MODAL WITH PC UPLOAD & AUTO URL RETRIEVAL */}
            {isAddGalleryOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-brand-white border border-brand-pale rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl my-8">
                  {/* Hidden file input for modal */}
                  <input
                    type="file"
                    ref={modalFileInputRef}
                    accept="image/*"
                    onChange={handleModalFileChange}
                    className="hidden"
                  />

                  <div className="bg-brand-forest p-4 sm:p-5 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold">Add Photo to Gallery</h3>
                        <p className="text-[11px] text-brand-pale">Max 5MB • WebP Quality Optimization</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddGalleryOpen(false);
                        setNewGallerySrc('');
                        setPhotoUploadError('');
                        setPhotoStats(null);
                        setModalFile(null);
                      }}
                      className="text-white/80 hover:text-white p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                    {/* Compression Options Toggle Card */}
                    <div className="bg-brand-light/30 border border-brand-pale rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-800">Convert to WebP & Optimize</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                            Recommended
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed">
                          Converts to modern WebP format while preserving ultra-high sharpness with zero pixelation and rapid loading.
                        </p>
                      </div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={compressOption}
                        onClick={() => handleToggleCompressOption(!compressOption)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          compressOption ? 'bg-brand-forest' : 'bg-slate-300'
                        }`}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            compressOption ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* PC File Upload Dropzone */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                          1. Upload Picture from PC
                        </label>
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                          Max size: 5 MB
                        </span>
                      </div>
                      <div
                        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                        onDrop={handleModalDrop}
                        onClick={() => modalFileInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                          isProcessingPhoto
                            ? 'border-brand-forest bg-brand-light/50 animate-pulse'
                            : newGallerySrc
                              ? 'border-emerald-400 bg-emerald-50/50'
                              : 'border-brand-pale hover:border-brand-forest/70 hover:bg-brand-light/30 bg-brand-light/10'
                        }`}
                      >
                        <div className="w-12 h-12 mx-auto rounded-full bg-brand-light border border-brand-pale flex items-center justify-center text-brand-forest mb-3 shadow-2xs">
                          {isProcessingPhoto ? (
                            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                          )}
                        </div>

                        <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-800">
                            {isProcessingPhoto
                              ? 'Optimizing to WebP & Preserving Quality...'
                              : 'Click to choose image from PC or drag & drop here'}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Supports JPG, PNG, WEBP, GIF. Strict 5MB limit.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Error Banner */}
                    {photoUploadError && (
                      <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 font-medium flex items-center gap-2">
                        <svg className="w-4 h-4 text-rose-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>{photoUploadError}</span>
                      </div>
                    )}

                    {/* Live Preview & Compression Analytics */}
                    {newGallerySrc && (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/40 p-3.5 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                              <span>Image Ready</span>
                            </span>
                            {photoStats?.format && (
                              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-white text-[10px] font-mono uppercase">
                                {photoStats.format.replace('image/', '')}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => modalFileInputRef.current?.click()}
                            className="text-[11px] text-brand-forest hover:underline font-semibold cursor-pointer"
                          >
                            Choose Different Image
                          </button>
                        </div>

                        <div className="h-44 w-full rounded-lg overflow-hidden bg-slate-900/5 border border-emerald-200 relative flex items-center justify-center">
                          <GlassImage
                            src={newGallerySrc}
                            alt="Uploaded preview"
                            containerClassName="w-full h-full flex items-center justify-center"
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Live Compression Metrics */}
                        {photoStats && (
                          <div className="bg-brand-white border border-emerald-200/80 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                            <div className="p-1.5 bg-slate-50 rounded-lg">
                              <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Original</span>
                              <span className="font-bold text-slate-700">{formatBytes(photoStats.originalSize)}</span>
                            </div>
                            <div className="p-1.5 bg-emerald-50 rounded-lg">
                              <span className="block text-[10px] text-emerald-600 uppercase tracking-wider font-semibold">
                                {compressOption ? 'Optimized' : 'Size'}
                              </span>
                              <span className="font-bold text-emerald-700">{formatBytes(photoStats.compressedSize)}</span>
                            </div>
                            <div className="p-1.5 bg-emerald-50 rounded-lg">
                              <span className="block text-[10px] text-emerald-600 uppercase tracking-wider font-semibold">Saved</span>
                              <span className="font-bold text-emerald-700">
                                {photoStats.savedPercent > 0 ? `-${photoStats.savedPercent}%` : 'Original'}
                              </span>
                            </div>
                            <div className="p-1.5 bg-slate-50 rounded-lg">
                              <span className="block text-[10px] text-slate-500 uppercase tracking-wider">Dimensions</span>
                              <span className="font-bold text-slate-700">{photoStats.width}×{photoStats.height}</span>
                            </div>
                          </div>
                        )}
                        <p className="text-[10px] text-emerald-800 text-center font-medium">
                          ✓ High-quality rendering guaranteed • Zero pixelation • Smooth web performance
                        </p>
                      </div>
                    )}

                    {/* Fetched URL Input */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        2. Fetched Image URL / Data URL
                      </label>
                      <input
                        type="text"
                        value={newGallerySrc}
                        onChange={(e) => {
                          setNewGallerySrc(e.target.value);
                          setPhotoStats(null);
                        }}
                        placeholder="Automatically populated upon PC upload or enter /assets/photo.webp"
                        className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        When you select a picture from your PC, the optimized WebP Data URL is automatically retrieved and placed here.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-brand-light/30 border-t border-brand-pale flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddGalleryOpen(false);
                        setNewGallerySrc('');
                        setPhotoUploadError('');
                        setPhotoStats(null);
                        setModalFile(null);
                      }}
                      className="px-4 py-2 rounded-full bg-brand-white border border-brand-pale text-slate-700 text-xs font-semibold hover:bg-brand-light cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!newGallerySrc.trim()}
                      onClick={() => {
                        if (!newGallerySrc.trim()) return;
                        addGalleryImage(newGallerySrc.trim());
                        setNewGallerySrc('');
                        setPhotoUploadError('');
                        setPhotoStats(null);
                        setModalFile(null);
                        setIsAddGalleryOpen(false);
                        showToast('Photo added to gallery!', 'success');
                      }}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer shadow-2xs ${
                        newGallerySrc.trim()
                          ? 'bg-brand-forest hover:bg-brand-forestHover text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Add Photo to Gallery
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* SCHOOL EVENTS (FACEBOOK IFRAME EMBEDS) */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-brand-forest">School Events &amp; Facebook Updates</h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">
                      Facebook Iframe Feed
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    Manage the official community Facebook event posts displayed on the School Events page. Paste any Facebook post link or embed code to automatically retrieve and format it as an iframe.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setNewEventInput('');
                    setNewEventHeight(645);
                    setIsAddEventOpen(true);
                  }}
                  className="px-4 py-2 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-2xs shrink-0 self-start sm:self-auto"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                  </svg>
                  <span>+ Add Facebook Event</span>
                </button>
              </div>

              {/* Event Cards Grid */}
              {(() => {
                const eventsList = Array.isArray(content?.events) ? content.events : [];
                if (eventsList.length === 0) {
                  return (
                    <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-brand-pale bg-brand-light/20">
                      <div className="w-12 h-12 mx-auto rounded-full bg-brand-light flex items-center justify-center text-brand-forest mb-3">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <h3 className="text-sm font-bold text-slate-800">No Facebook Events Configured</h3>
                      <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                        Add posts from the school Facebook page by pasting their URLs to display them as interactive iframes.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setNewEventInput('');
                          setNewEventHeight(645);
                          setIsAddEventOpen(true);
                        }}
                        className="mt-4 px-4 py-2 rounded-full bg-brand-forest text-white text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        Add First Event
                      </button>
                    </div>
                  );
                }

                return (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium pb-2 border-b border-brand-pale/60">
                      <span>Active Event Posts ({eventsList.length})</span>
                      <a
                        href="https://www.facebook.com/profile.php?id=61575442051109"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-forest hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Official Facebook Page</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eventsList.map((post, idx) => (
                      <div
                        key={post.id || idx}
                        className="bg-brand-light/20 border border-brand-pale rounded-2xl p-4 shadow-2xs flex flex-col justify-between"
                      >
                        {/* Top Bar */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-brand-forest text-white text-[10px] font-bold">
                            #{idx + 1}
                          </span>
                          <div className="flex items-center gap-2">
                            <a
                              href={post.postUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1 hover:underline"
                              title="View post on Facebook"
                            >
                              <span>View Post</span>
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('Remove this Facebook event card?')) {
                                  deleteEvent(post.id);
                                  showToast('Event removed', 'success');
                                }
                              }}
                              className="text-slate-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                              title="Delete event"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Live Iframe Scaled Preview Container */}
                        <div className="w-full h-[400px] overflow-hidden rounded-xl bg-white border border-brand-pale/80 shadow-2xs flex justify-center items-start pt-2 relative">
                          <div
                            className="shrink-0 flex justify-center origin-top pointer-events-auto"
                            style={{
                              width: '500px',
                              height: `${post.height || 645}px`,
                              transform: 'scale(0.62)',
                              marginBottom: `-${(post.height || 645) * 0.38}px`,
                            }}
                          >
                            <iframe
                              src={post.iframeSrc}
                              width={post.width || 500}
                              height={post.height || 645}
                              style={{ border: 'none', overflow: 'hidden' }}
                              scrolling="no"
                              frameBorder="0"
                              allowFullScreen={true}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                              className="w-full h-full rounded-xl"
                              title={`Facebook Event ${post.id}`}
                            />
                          </div>
                        </div>

                        {/* Card Info & Height Settings */}
                        <div className="mt-3 pt-3 border-t border-brand-pale/60 space-y-2">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-slate-600">Iframe Height (px):</span>
                            <div className="flex items-center gap-1">
                              <input
                                type="number"
                                min={300}
                                max={1200}
                                step={10}
                                value={post.height || 645}
                                onChange={(e) => updateEvent(post.id, { height: Number(e.target.value) || 645 })}
                                className="w-20 px-2 py-1 rounded bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono font-semibold text-right focus:outline-none focus:border-brand-forest"
                              />
                              <span className="text-slate-400">px</span>
                            </div>
                          </div>

                          <div className="truncate text-[10px] text-slate-400 font-mono bg-brand-white px-2 py-1 rounded border border-brand-pale/60" title={post.iframeSrc}>
                            {post.iframeSrc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}
            </div>

            {/* ADD EVENT MODAL (FB LINK TO IFRAME RETRIEVAL) */}
            {isAddEventOpen && (
              <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-brand-white border border-brand-pale rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl my-8">
                  <div className="bg-brand-forest p-4 sm:p-5 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold">Add Facebook Event Post</h3>
                        <p className="text-[11px] text-brand-pale">Paste FB Link to Retrieve Iframe</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddEventOpen(false);
                        setNewEventInput('');
                      }}
                      className="text-white/80 hover:text-white p-1 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Facebook Post URL or Iframe Embed Code
                      </label>
                      <textarea
                        rows={3}
                        value={newEventInput}
                        onChange={(e) => setNewEventInput(e.target.value)}
                        placeholder="Paste Facebook post URL (e.g., https://www.facebook.com/permalink.php?story_fbid=... or https://www.facebook.com/.../posts/...) or iframe code"
                        autoFocus
                        className="w-full px-3.5 py-2.5 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest leading-relaxed"
                      />
                      <p className="text-[11px] text-slate-500 mt-1">
                        Tip: Open any post on Facebook, click the three dots (<span className="font-bold">···</span>), click <span className="font-semibold text-slate-700">"Copy link"</span>, and paste it here.
                      </p>
                    </div>

                    {/* Retrieval Result & Live Iframe Preview */}
                    {parsedNewEvent ? (
                      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                            <span>Iframe Successfully Retrieved</span>
                          </span>
                          <span className="text-[11px] font-mono text-emerald-800 font-semibold">Width: 500px</span>
                        </div>

                        <div>
                          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                            Generated Iframe Embed URL:
                          </span>
                          <div className="p-2 rounded-lg bg-white border border-emerald-200 text-[11px] font-mono text-slate-700 break-all select-all">
                            {parsedNewEvent.iframeSrc}
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Canonical Post URL:
                            </span>
                            <div className="truncate text-xs font-mono text-blue-700">
                              <a href={parsedNewEvent.postUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                {parsedNewEvent.postUrl} ↗
                              </a>
                            </div>
                          </div>

                          <div className="w-32">
                            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                              Height (px):
                            </span>
                            <input
                              type="number"
                              min={300}
                              max={1200}
                              step={10}
                              value={newEventHeight}
                              onChange={(e) => setNewEventHeight(Number(e.target.value) || 645)}
                              className="w-full px-2 py-1 rounded-lg bg-white border border-emerald-200 text-slate-800 text-xs font-mono font-bold"
                            />
                          </div>
                        </div>

                        {/* Live Preview of Iframe */}
                        <div className="pt-2">
                          <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Live Iframe Preview:
                          </span>
                          <div className="w-full h-[320px] overflow-hidden rounded-xl bg-white border border-slate-200 flex justify-center items-start pt-2">
                            <div
                              className="shrink-0 flex justify-center origin-top pointer-events-auto"
                              style={{
                                width: '500px',
                                height: `${newEventHeight}px`,
                                transform: 'scale(0.55)',
                                marginBottom: `-${newEventHeight * 0.45}px`,
                              }}
                            >
                              <iframe
                                src={parsedNewEvent.iframeSrc}
                                width={500}
                                height={newEventHeight}
                                style={{ border: 'none', overflow: 'hidden' }}
                                scrolling="no"
                                frameBorder="0"
                                allowFullScreen={true}
                                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                className="w-full h-full rounded-xl"
                                title="Facebook Iframe Preview"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : newEventInput.trim() ? (
                      <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3.5 text-xs text-rose-800 flex items-start gap-2">
                        <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <div>
                          <p className="font-semibold">Unable to parse Facebook URL</p>
                          <p className="text-[11px] text-rose-700 mt-0.5">
                            Please ensure your input contains a link to Facebook (e.g. <code>https://www.facebook.com/...</code>) or an official Facebook iframe embed snippet.
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-4 bg-brand-light/30 border-t border-brand-pale flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddEventOpen(false);
                        setNewEventInput('');
                      }}
                      className="px-4 py-2 rounded-full bg-brand-white border border-brand-pale text-slate-700 text-xs font-semibold hover:bg-brand-light cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!parsedNewEvent}
                      onClick={() => {
                        if (!parsedNewEvent) return;
                        addEvent({
                          ...parsedNewEvent,
                          height: Number(newEventHeight) || 645
                        });
                        setNewEventInput('');
                        setIsAddEventOpen(false);
                        showToast('Facebook event added to Events page!', 'success');
                      }}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer shadow-2xs ${parsedNewEvent
                          ? 'bg-brand-forest hover:bg-brand-forestHover text-white'
                          : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                    >
                      Add Event to Page
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* CONTACT INFORMATION */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-2">Contact Information</h2>
              <p className="text-xs text-slate-600 mb-5">
                Update the official contact card details and Google Maps location URL.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">School Address</label>
                  <input
                    type="text"
                    value={content.contact?.address || ''}
                    onChange={(e) => updateContact({ address: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Telephone</label>
                  <input
                    type="text"
                    value={content.contact?.phone || ''}
                    onChange={(e) => updateContact({ phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={content.contact?.email || ''}
                    onChange={(e) => updateContact({ email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Office Hours</label>
                  <input
                    type="text"
                    value={content.contact?.officeHours || ''}
                    onChange={(e) => updateContact({ officeHours: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Google Maps URL</label>
                  <input
                    type="text"
                    value={content.contact?.mapsUrl || ''}
                    onChange={(e) => updateContact({ mapsUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Facebook Profile URL</label>
                  <input
                    type="text"
                    value={content.contact?.facebookUrl || ''}
                    onChange={(e) => updateContact({ facebookUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">Instagram URL</label>
                  <input
                    type="text"
                    value={content.contact?.instagramUrl || ''}
                    onChange={(e) => updateContact({ instagramUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-4">Security Passcode</h2>

              <form onSubmit={handleChangePin} className="max-w-md space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current Passcode
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentPinSetting}
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-light/40 border border-brand-pale text-slate-600 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    New Passcode
                  </label>
                  <input
                    type="text"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Enter new 4+ character passcode"
                    className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition cursor-pointer shadow-2xs"
                >
                  Update Passcode
                </button>
              </form>
            </div>

            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-4">Configuration Backup</h2>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={exportJson}
                  className="px-4 py-2 rounded-full bg-brand-white border border-brand-pale hover:bg-brand-light text-slate-700 text-xs font-semibold flex items-center gap-2 cursor-pointer transition shadow-2xs"
                >
                  <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Backup JSON</span>
                </button>

                <label className="px-4 py-2 rounded-full bg-brand-white border border-brand-pale hover:bg-brand-light text-slate-700 text-xs font-semibold flex items-center gap-2 cursor-pointer transition shadow-2xs">
                  <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Import Backup JSON</span>
                  <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </label>

                {hasLocalOverrides && (
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset all changes back to repository defaults?')) {
                        resetToDefaults();
                        showToast('Reset to defaults', 'success');
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-100 text-xs font-semibold cursor-pointer transition ml-auto"
                  >
                    Reset to Defaults
                  </button>
                )}
              </div>
            </div>

            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <h2 className="text-lg font-bold text-brand-forest mb-2">GitHub Repository</h2>
              <p className="text-xs text-slate-600 mb-4">
                View the website source code, commit history, and automated deployment actions on GitHub.
              </p>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-light border border-brand-pale hover:border-brand-soft text-brand-forest text-xs font-bold transition shadow-2xs"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>github.com/Sivodayan/KCC-Project</span>
                <svg className="w-3.5 h-3.5 text-brand-forest/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-brand-forest">GitHub Publishing Token &amp; Repository Sync</h2>
                {githubToken ? (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
                    Token Saved
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 self-start sm:self-auto">
                    No Token Saved
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 mb-4">
                Save your GitHub Personal Access Token (PAT) with <span className="font-mono font-bold text-slate-800">repo</span> permission to commit website updates directly from this console. Commits trigger automated GitHub Actions deployment.
              </p>

              <div className="space-y-4 max-w-xl">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-semibold text-slate-700">
                      Personal Access Token (PAT)
                    </label>
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=KCC+Admin+Panel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-brand-forest hover:underline font-medium inline-flex items-center gap-1"
                    >
                      <span>Create Token on GitHub (needs 'repo' scope)</span>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type={showGithubToken ? 'text' : 'password'}
                      value={githubToken}
                      onChange={(e) => setGithubToken(e.target.value)}
                      placeholder="ghp_... or github_pat_..."
                      className="flex-1 px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                    />
                    <button
                      type="button"
                      onClick={() => setShowGithubToken(prev => !prev)}
                      className="px-3 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-600 hover:text-slate-900 text-xs font-medium cursor-pointer"
                    >
                      {showGithubToken ? 'Hide' : 'Show'}
                    </button>
                    <button
                      type="button"
                      disabled={isVerifyingToken || !githubToken.trim()}
                      onClick={handleVerifyToken}
                      className="px-3.5 py-2 rounded-xl bg-brand-light border border-brand-pale hover:bg-brand-pale/70 text-brand-forest text-xs font-bold transition cursor-pointer"
                    >
                      {isVerifyingToken ? 'Verifying...' : 'Verify'}
                    </button>
                  </div>
                </div>

                {verifiedUser && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-3">
                    {verifiedUser.avatarUrl && (
                      <GlassImage
                        src={verifiedUser.avatarUrl}
                        alt={verifiedUser.login}
                        containerClassName="w-8 h-8 rounded-full shrink-0"
                        className="w-8 h-8 rounded-full border border-emerald-300 object-cover"
                        showIcon={false}
                      />
                    )}
                    <div>
                      <span className="font-bold block">Verified GitHub Identity: @{verifiedUser.login}</span>
                      <span className="text-[11px] text-emerald-700">{verifiedUser.name || verifiedUser.login} • Authenticated with repository write access</span>
                    </div>
                  </div>
                )}

                {tokenVerifyError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700">
                    {tokenVerifyError}
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      if (githubToken.trim()) {
                        localStorage.setItem(GITHUB_TOKEN_STORAGE_KEY, githubToken.trim());
                        showToast('GitHub token saved successfully!', 'success');
                      } else {
                        showToast('Token field is empty', 'error');
                      }
                    }}
                    className="px-4 py-2 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition cursor-pointer shadow-2xs"
                  >
                    Save Token
                  </button>
                  {githubToken && (
                    <button
                      type="button"
                      onClick={() => {
                        localStorage.removeItem(GITHUB_TOKEN_STORAGE_KEY);
                        setGithubToken('');
                        setVerifiedUser(null);
                        showToast('GitHub token removed from storage', 'info');
                      }}
                      className="px-4 py-2 rounded-full bg-brand-white border border-brand-pale hover:bg-rose-50 hover:text-rose-600 text-slate-600 text-xs font-semibold transition cursor-pointer"
                    >
                      Clear Token
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-brand-white border border-brand-pale rounded-2xl p-6 sm:p-8 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h2 className="text-lg font-bold text-brand-forest">Workflow &amp; Keyboard Shortcuts</h2>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-brand-light text-brand-forest border border-brand-pale">
                    {undoCount} undoable step{undoCount === 1 ? '' : 's'}
                  </span>
                  {redoCount > 0 && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                      {redoCount} redoable
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-600 mb-4">
                The KCC Admin Console automatically records snapshots of your edits across all tabs. Use the sticky top navigation buttons or these universal keyboard shortcuts:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-light/30 border border-brand-pale">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-brand-white border border-brand-pale text-brand-forest">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 10h10a5 5 0 0 1 5 5v2m0 0l-4-4m4 4l4-4M3 10l4-4m-4 4l4 4" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Undo Last Action</span>
                      <span className="text-[11px] text-slate-500">Reverts text, stat, photo or event edits</span>
                    </div>
                  </div>
                  <kbd className="px-2.5 py-1 rounded-lg bg-brand-white border border-slate-200 font-mono text-[11px] font-bold text-slate-700 shadow-2xs">
                    Ctrl + Z
                  </kbd>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-brand-light/30 border border-brand-pale">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-brand-white border border-brand-pale text-brand-forest">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M21 10H11a5 5 0 0 0-5 5v2m0 0l4-4m-4 4l-4-4m20-3l-4-4m4 4l-4 4" />
                      </svg>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Redo Action</span>
                      <span className="text-[11px] text-slate-500">Restores undone changes</span>
                    </div>
                  </div>
                  <kbd className="px-2.5 py-1 rounded-lg bg-brand-white border border-slate-200 font-mono text-[11px] font-bold text-slate-700 shadow-2xs">
                    Ctrl + Y / ⇧⌘Z
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMMIT DIRECTLY TO GITHUB MODAL */}
        {isCommitModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-brand-white border border-brand-pale rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl my-8 animate-modal-content">
            {/* Modal Header */}
            <div className="bg-slate-900 px-5 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">Commit to GitHub</h3>
                  <p className="text-[11px] text-slate-400 font-mono">Sivodayan/KCC-Project • branch: main</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!isCommitting) {
                    setIsCommitModalOpen(false);
                    setCommitResult(null);
                    setCommitError('');
                  }
                }}
                disabled={isCommitting}
                className="text-slate-400 hover:text-white p-1 rounded-lg transition cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 space-y-4">
              {commitResult ? (
                <div className="text-center py-3 space-y-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Committed Successfully!</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Changes pushed directly to <span className="font-mono font-bold text-brand-forest">src/data/siteContent.json</span> on branch <span className="font-mono font-bold">main</span>.
                    </p>
                  </div>

                  <div className="bg-brand-light/40 border border-brand-pale rounded-xl p-3 text-xs space-y-1.5 text-left">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Commit SHA:</span>
                      <span className="font-mono font-bold text-slate-800">{commitResult.commitSha}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500 font-semibold">Automated Action:</span>
                      <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                        GitHub Actions deploying to Pages
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                    <a
                      href={commitResult.commitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-4 py-2 rounded-full bg-slate-900 hover:bg-black text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-2xs"
                    >
                      <span>View Commit on GitHub</span>
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCommitModalOpen(false);
                        setCommitResult(null);
                      }}
                      className="w-full sm:w-auto px-5 py-2 rounded-full bg-brand-light border border-brand-pale hover:bg-brand-pale/60 text-brand-forest text-xs font-bold transition cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCommitToGitHub} className="space-y-4">
                  <div className="bg-brand-light/30 border border-brand-pale rounded-xl p-3 text-xs text-slate-600 flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-brand-forest shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-semibold text-slate-800">Direct Git Push &amp; Automated Deployment</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        This atomic commit updates <span className="font-mono text-brand-forest font-bold">src/data/siteContent.json</span> on branch <span className="font-mono font-bold">main</span>, which immediately triggers the GitHub Pages build workflow.
                      </p>
                    </div>
                  </div>

                  {commitError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                      <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <span className="font-bold block">Commit Failed</span>
                        <span>{commitError}</span>
                      </div>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-slate-700">
                        GitHub Personal Access Token (PAT)
                      </label>
                      <a
                        href="https://github.com/settings/tokens/new?scopes=repo&description=KCC+Admin+Panel"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-brand-forest hover:underline font-medium inline-flex items-center gap-1"
                      >
                        <span>Create Token on GitHub</span>
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <div className="relative">
                      <input
                        type={showGithubToken ? 'text' : 'password'}
                        value={githubToken}
                        onChange={(e) => setGithubToken(e.target.value)}
                        placeholder="ghp_... or github_pat_..."
                        required
                        className="w-full px-3.5 py-2 pr-10 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                      />
                      <button
                        type="button"
                        onClick={() => setShowGithubToken(prev => !prev)}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                        title={showGithubToken ? 'Hide token' : 'Show token'}
                      >
                        {showGithubToken ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <label className="flex items-center gap-2 mt-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={saveTokenChoice}
                        onChange={(e) => setSaveTokenChoice(e.target.checked)}
                        className="rounded border-brand-pale text-brand-forest focus:ring-brand-forest/20"
                      />
                      <span className="text-[11px] text-slate-500">Save token in browser localStorage for future commits</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Commit Message
                    </label>
                    <input
                      type="text"
                      value={commitMessage}
                      onChange={(e) => setCommitMessage(e.target.value)}
                      placeholder="Update website content via KCC Admin Panel"
                      className="w-full px-3.5 py-2 rounded-xl bg-brand-white border border-brand-pale text-slate-800 text-xs focus:outline-none focus:ring-2 focus:ring-brand-forest/20 focus:border-brand-forest"
                    />
                  </div>

                  <div className="p-3 bg-brand-light/20 border border-brand-pale/70 rounded-xl">
                    <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Summary of Payload</span>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      <span className="px-2 py-0.5 rounded-md bg-brand-white border border-brand-pale font-medium text-slate-700">
                        {content.gallery?.length || 0} Gallery Photos
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-white border border-brand-pale font-medium text-slate-700">
                        {content.events?.length || 0} School Events
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-white border border-brand-pale font-medium text-slate-700">
                        8 Key Metrics
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-white border border-brand-pale font-medium text-slate-700">
                        Hero &amp; Principles
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-brand-white border border-brand-pale font-medium text-slate-700">
                        Contact Details
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-brand-pale">
                    <button
                      type="button"
                      disabled={isCommitting}
                      onClick={() => setIsCommitModalOpen(false)}
                      className="px-4 py-2 rounded-full bg-brand-white border border-brand-pale hover:bg-brand-light text-slate-700 text-xs font-semibold transition cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isCommitting || !githubToken.trim()}
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition shadow-md active:scale-95 ${
                        isCommitting || !githubToken.trim() ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                      }`}
                    >
                      {isCommitting ? (
                        <>
                          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          <span>Committing to GitHub...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>Commit &amp; Publish</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
      </main>

      <footer className="py-6 border-t border-brand-pale bg-brand-white text-center text-xs text-slate-500 mt-auto">
        <p className="font-semibold text-slate-700">J/Kopay Christian College Admin Panel</p>
        <p className="mt-1">
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-forest hover:underline font-medium inline-flex items-center gap-1"
          >
            <span>GitHub Repository: Sivodayan/KCC-Project</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </p>
      </footer>
    </div>
  );
}
