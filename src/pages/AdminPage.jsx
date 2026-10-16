import React, { useState, useEffect, useId } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext.jsx';
import {
  verifyGitHubToken,
  commitFileToGitHub,
  fetchFileFromGitHub
} from '../utils/githubSync.js';

const DEFAULT_PIN = 'kcc1852';
const PIN_STORAGE_KEY = 'kcc_admin_pin';
const SESSION_AUTH_KEY = 'kcc_admin_session_auth';
const GITHUB_TOKEN_KEY = 'kcc_github_pat_token';

export default function AdminPage() {
  const navigate = useNavigate();
  const {
    content,
    hasLocalOverrides,
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
  } = useSiteContent();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem(SESSION_AUTH_KEY) === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('overview'); // overview, banner, hero, principles, performance, gallery, events, contact, anthem, settings

  // Notification Toast
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  // GitHub Commit & Sync State
  const [ghToken, setGhToken] = useState(() => localStorage.getItem(GITHUB_TOKEN_KEY) || '');
  const [ghUser, setGhUser] = useState(null);
  const [isVerifyingGh, setIsVerifyingGh] = useState(false);
  const [ghRepoOwner, setGhRepoOwner] = useState('Sivodayan');
  const [ghRepoName, setGhRepoName] = useState('KCC-Project');
  const [ghBranch, setGhBranch] = useState('main');
  const [ghCommitMsg, setGhCommitMsg] = useState('');
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitStatus, setCommitStatus] = useState(null); // { success, commitSha, commitUrl, error }

  // Modals for adding new items
  const [isAddPrincipleOpen, setIsAddPrincipleOpen] = useState(false);
  const [newPrinciple, setNewPrinciple] = useState({ titleEn: '', titleTa: '', descEn: '', descTa: '', badge: 'Pillar' });

  const [isAddStatOpen, setIsAddStatOpen] = useState(false);
  const [newStat, setNewStat] = useState({ label: '', labelTa: '', value: '', suffix: '+', description: '' });

  const [isAddGalleryOpen, setIsAddGalleryOpen] = useState(false);
  const [newGallery, setNewGallery] = useState({ src: '', caption: '', category: 'Campus' });

  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    titleTa: '',
    date: '',
    category: 'General',
    badge: 'Upcoming',
    description: '',
    image: '/assets/hero.jpg',
    link: ''
  });

  // Settings PIN Change State
  const [currentPinSetting, setCurrentPinSetting] = useState(() => {
    return localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
  });
  const [newPinInput, setNewPinInput] = useState('');

  // Verify GitHub token automatically on load if present
  useEffect(() => {
    if (ghToken && isAuthenticated) {
      handleVerifyToken(ghToken);
    }
  }, [isAuthenticated]);

  const handleVerifyToken = async (tokenToVerify) => {
    if (!tokenToVerify) return;
    setIsVerifyingGh(true);
    try {
      const user = await verifyGitHubToken(tokenToVerify);
      setGhUser(user);
      localStorage.setItem(GITHUB_TOKEN_KEY, tokenToVerify.trim());
    } catch (err) {
      setGhUser(null);
    } finally {
      setIsVerifyingGh(false);
    }
  };

  // Authentication check
  const handleLogin = (e) => {
    e.preventDefault();
    const storedPin = localStorage.getItem(PIN_STORAGE_KEY) || DEFAULT_PIN;
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem(SESSION_AUTH_KEY, 'true');
      setPinError('');
      showToast('Welcome to KCC Admin Panel', 'success');
    } else {
      setPinError('Incorrect passcode. Please check and try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(SESSION_AUTH_KEY);
    setPinInput('');
  };

  // Handle Direct GitHub Commit
  const handleDirectCommit = async (e) => {
    e?.preventDefault();
    if (!ghToken.trim()) {
      showToast('Please enter your GitHub Personal Access Token in the GitHub Sync tab.', 'error');
      setActiveTab('overview');
      return;
    }

    setIsCommitting(true);
    setCommitStatus(null);

    try {
      const defaultMsg = `Update website content via KCC Admin Panel [${new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })} - ${new Date().toLocaleTimeString('en-US')}]`;

      const result = await commitFileToGitHub({
        owner: ghRepoOwner.trim(),
        repo: ghRepoName.trim(),
        path: 'src/data/siteContent.json',
        branch: ghBranch.trim(),
        token: ghToken.trim(),
        contentString: JSON.stringify(content, null, 2),
        commitMessage: ghCommitMsg.trim() || defaultMsg
      });

      setCommitStatus({
        success: true,
        commitSha: result.commitSha,
        commitUrl: result.commitUrl,
        timestamp: new Date().toLocaleTimeString()
      });

      showToast(`Successfully committed ${result.commitSha} to GitHub!`, 'success');
    } catch (err) {
      console.error('Commit failed:', err);
      setCommitStatus({
        success: false,
        error: err.message
      });
      showToast('GitHub commit failed: ' + err.message, 'error');
    } finally {
      setIsCommitting(false);
    }
  };

  // Handle JSON Import
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

  // Handle PIN Change
  const handleChangePin = (e) => {
    e.preventDefault();
    if (newPinInput.trim().length < 4) {
      showToast('PIN must be at least 4 characters long', 'error');
      return;
    }
    localStorage.setItem(PIN_STORAGE_KEY, newPinInput.trim());
    setCurrentPinSetting(newPinInput.trim());
    setNewPinInput('');
    showToast('Admin PIN updated successfully!', 'success');
  };

  // If Not Authenticated -> Show Secret Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 selection:bg-brand-pale selection:text-brand-forest">
        <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-8 shadow-2xl text-slate-100">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-brand-forest/20 border border-brand-forest/40 flex items-center justify-center p-2.5 shadow-lg">
              <img src="/assets/logo.png" alt="KCC Crest" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              KCC Administrator Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1.5 font-medium">
              J/Kopay Christian College Management Console
            </p>
            <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-700/60 border border-slate-600/50 text-[11px] text-brand-pale">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Protected Administrative Route
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Security Passcode
              </label>
              <div className="relative">
                <input
                  type={showPin ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    if (pinError) setPinError('');
                  }}
                  placeholder="Enter passcode"
                  autoFocus
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-forest focus:border-transparent text-sm transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer text-xs font-semibold"
                >
                  {showPin ? 'Hide' : 'Show'}
                </button>
              </div>
              {pinError && (
                <p className="text-xs text-rose-400 mt-2 flex items-center gap-1.5 font-medium">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {pinError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-brand-forest hover:bg-brand-forestHover active:scale-[0.99] text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-brand-forest/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Authenticate &amp; Enter</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

          <div className="mt-8 pt-5 border-t border-slate-700/60 text-center">
            <span className="text-[11px] text-slate-500">
              Default passcode: <span className="font-mono text-slate-400 font-semibold">kcc1852</span> (can be customized once inside)
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard Layout
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-brand-pale selection:text-brand-forest">
      {/* Toast Notification */}
      {toast.show && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-semibold transition-all transform animate-bounce duration-300 ${toast.type === 'error'
              ? 'bg-rose-900 border border-rose-700 text-rose-100'
              : 'bg-emerald-900 border border-emerald-600 text-emerald-100'
            }`}
        >
          {toast.type === 'error' ? (
            <svg className="w-5 h-5 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand & Repo Badge */}
            <div className="flex items-center gap-3">
              <img src="/assets/logo.png" alt="KCC" className="w-9 h-9 object-contain" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base tracking-tight">KCC Admin Panel</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-forest/30 text-emerald-300 border border-brand-forest/50 font-bold uppercase tracking-wider">
                    Live Editor
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                  <span>github: {ghRepoOwner}/{ghRepoName}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 font-semibold">{ghBranch}</span>
                </div>
              </div>
            </div>

            {/* Right: Quick Action Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Preview Button */}
              <button
                type="button"
                onClick={() => window.open('/', '_blank')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer"
                title="View live site in a new tab"
              >
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Live Preview</span>
              </button>

              {/* Direct Commit to GitHub Button */}
              <button
                type="button"
                onClick={handleDirectCommit}
                disabled={isCommitting}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-brand-forest hover:from-emerald-500 hover:to-emerald-600 text-white text-xs sm:text-sm font-bold shadow-lg shadow-emerald-900/30 transition-all duration-200 active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                {isCommitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Committing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Commit to GitHub</span>
                  </>
                )}
              </button>

              {/* Logout / Lock */}
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                title="Lock Dashboard"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto py-2.5 border-t border-slate-800/80 no-scrollbar text-xs font-semibold">
            {[
              { id: 'overview', label: '⚡ GitHub Sync', icon: '🚀' },
              { id: 'banner', label: 'Announcement & Meta', icon: '📢' },
              { id: 'hero', label: 'Hero Section', icon: '🏛️' },
              { id: 'principles', label: 'Motto & Principles', icon: '🧭' },
              { id: 'performance', label: 'Stats & Metrics', icon: '📊' },
              { id: 'gallery', label: 'Photo Gallery', icon: '🖼️' },
              { id: 'events', label: 'Events & News', icon: '📅' },
              { id: 'contact', label: 'Contact Info', icon: '📞' },
              { id: 'anthem', label: 'School Anthem', icon: '🎵' },
              { id: 'settings', label: 'Settings & Backup', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${activeTab === tab.id
                    ? 'bg-brand-forest text-white shadow-sm font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Admin Content Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: OVERVIEW & GITHUB DIRECT COMMIT HUB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Direct Commit Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold mb-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    Direct GitHub Commits Ready
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Publish Changes Directly to GitHub
                  </h2>
                  <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
                    Any edits you make in this panel are active in your browser. When you are ready to publish them to the live school website, simply click below to create a direct commit on branch <code className="text-emerald-400 font-mono bg-slate-800 px-1.5 py-0.5 rounded font-bold">main</code>.
                  </p>
                </div>

                <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleDirectCommit}
                    disabled={isCommitting}
                    className="px-6 py-3.5 rounded-2xl bg-brand-forest hover:bg-brand-forestHover active:scale-98 text-white font-bold text-sm shadow-xl shadow-brand-forest/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isCommitting ? 'Pushing Commit...' : '🚀 Commit & Publish Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.open('/', '_blank')}
                    className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Live Site</span>
                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Commit Status Feedback */}
              {commitStatus && (
                <div
                  className={`mt-6 p-4 rounded-2xl border text-sm flex items-start gap-3.5 ${commitStatus.success
                      ? 'bg-emerald-950/60 border-emerald-700/80 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-800 text-rose-200'
                    }`}
                >
                  {commitStatus.success ? (
                    <>
                      <div className="w-8 h-8 rounded-xl bg-emerald-800/80 flex items-center justify-center shrink-0 text-emerald-200 font-bold">
                        ✓
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-emerald-300">
                          Commit Created Successfully! (SHA: {commitStatus.commitSha})
                        </div>
                        <div className="text-xs text-emerald-200/80 mt-1">
                          Changes pushed to <code className="font-mono">{ghBranch}</code> branch. Vercel and GitHub Pages will automatically deploy the changes.
                        </div>
                        {commitStatus.commitUrl && (
                          <a
                            href={commitStatus.commitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 underline hover:text-white mt-2"
                          >
                            <span>View commit on GitHub ({commitStatus.commitSha})</span>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-8 h-8 rounded-xl bg-rose-800/80 flex items-center justify-center shrink-0 text-rose-200 font-bold">
                        ✕
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-rose-300">Commit Failed</div>
                        <div className="text-xs text-rose-200/90 mt-1">{commitStatus.error}</div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* GitHub Credentials & Connection Settings */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Personal Access Token Config */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      GitHub Personal Access Token (PAT)
                    </label>
                    {ghUser && (
                      <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                        Connected as @{ghUser.login}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={ghToken}
                      onChange={(e) => setGhToken(e.target.value)}
                      placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-brand-forest font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => handleVerifyToken(ghToken)}
                      disabled={isVerifyingGh || !ghToken}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition cursor-pointer disabled:opacity-50"
                    >
                      {isVerifyingGh ? 'Verifying...' : 'Test & Save'}
                    </button>
                  </div>

                  <div className="mt-3 text-[11px] text-slate-400 leading-relaxed">
                    Need a token?{' '}
                    <a
                      href="https://github.com/settings/tokens/new?scopes=repo&description=KCC+Admin+Panel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:underline font-semibold"
                    >
                      Generate GitHub Token (with repo scope) →
                    </a>
                  </div>
                </div>

                {/* Repository Target Config */}
                <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5">
                  <span className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    Target Repository &amp; Branch
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <span className="block text-[10px] text-slate-400 mb-1">Owner</span>
                      <input
                        type="text"
                        value={ghRepoOwner}
                        onChange={(e) => setGhRepoOwner(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 mb-1">Repo</span>
                      <input
                        type="text"
                        value={ghRepoName}
                        onChange={(e) => setGhRepoName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 mb-1">Branch</span>
                      <input
                        type="text"
                        value={ghBranch}
                        onChange={(e) => setGhBranch(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="block text-[10px] text-slate-400 mb-1">Commit Message (Optional)</span>
                    <input
                      type="text"
                      value={ghCommitMsg}
                      onChange={(e) => setGhCommitMsg(e.target.value)}
                      placeholder="e.g. Update admission dates and sports meet info"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div
                onClick={() => setActiveTab('hero')}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-brand-forest/60 transition cursor-pointer group"
              >
                <div className="text-2xl mb-2">🏛️</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Hero Section</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                  {content.hero?.title || 'J/Kopay Christian College'}
                </div>
              </div>

              <div
                onClick={() => setActiveTab('principles')}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-brand-forest/60 transition cursor-pointer group"
              >
                <div className="text-2xl mb-2">🧭</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Principles</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                  3 Core + {content.principles?.customCards?.length || 0} Custom
                </div>
              </div>

              <div
                onClick={() => setActiveTab('gallery')}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-brand-forest/60 transition cursor-pointer group"
              >
                <div className="text-2xl mb-2">🖼️</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Gallery Images</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                  {content.gallery?.length || 0} Photos
                </div>
              </div>

              <div
                onClick={() => setActiveTab('events')}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 hover:border-brand-forest/60 transition cursor-pointer group"
              >
                <div className="text-2xl mb-2">📅</div>
                <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Custom Events</div>
                <div className="text-base font-bold text-white mt-1 group-hover:text-emerald-300 transition">
                  {content.events?.customEvents?.length || 0} Announcements
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANNOUNCEMENT BANNER & GENERAL META */}
        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Broadcast Announcement Banner</h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Display an urgent or featured announcement bar across the very top of the website.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={Boolean(content.announcement?.enabled)}
                    onChange={(e) => updateAnnouncement({ enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  <span className="ml-3 text-xs font-semibold text-slate-300">
                    {content.announcement?.enabled ? 'Active / Visible' : 'Hidden'}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Banner Tag / Badge
                  </label>
                  <input
                    type="text"
                    value={content.announcement?.badge || ''}
                    onChange={(e) => updateAnnouncement({ badge: e.target.value })}
                    placeholder="e.g. Admissions 2026-2027"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Action Button Text &amp; Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={content.announcement?.linkText || ''}
                      onChange={(e) => updateAnnouncement({ linkText: e.target.value })}
                      placeholder="Learn More →"
                      className="w-1/2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                    <input
                      type="text"
                      value={content.announcement?.link || ''}
                      onChange={(e) => updateAnnouncement({ link: e.target.value })}
                      placeholder="#contact or /events"
                      className="w-1/2 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Announcement Message (English)
                  </label>
                  <textarea
                    rows={2}
                    value={content.announcement?.text || ''}
                    onChange={(e) => updateAnnouncement({ text: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Announcement Message (Tamil)
                  </label>
                  <textarea
                    rows={2}
                    value={content.announcement?.tamil || ''}
                    onChange={(e) => updateAnnouncement({ tamil: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-tamil"
                  />
                </div>
              </div>
            </div>

            {/* School Core Metadata */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-5">School Core Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">School Name (English)</label>
                  <input
                    type="text"
                    value={content.meta?.schoolName || ''}
                    onChange={(e) => updateMeta({ schoolName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">School Name (Tamil)</label>
                  <input
                    type="text"
                    value={content.meta?.tamilName || ''}
                    onChange={(e) => updateMeta({ tamilName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-tamil"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Founding Year</label>
                  <input
                    type="text"
                    value={content.meta?.foundedYear || ''}
                    onChange={(e) => updateMeta({ foundedYear: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">School Motto</label>
                  <input
                    type="text"
                    value={content.meta?.motto || ''}
                    onChange={(e) => updateMeta({ motto: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HERO SECTION */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">Customize Hero Section</h2>
              <p className="text-xs text-slate-400 mb-6">
                Edit the main visual entrance banner, headlines, and background imagery of the homepage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Title (English)</label>
                  <input
                    type="text"
                    value={content.hero?.title || ''}
                    onChange={(e) => updateHero({ title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Title (Tamil)</label>
                  <input
                    type="text"
                    value={content.hero?.tamilTitle || ''}
                    onChange={(e) => updateHero({ tamilTitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-tamil"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Description / Tagline</label>
                  <textarea
                    rows={3}
                    value={content.hero?.subtitle || ''}
                    onChange={(e) => updateHero({ subtitle: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Hero Background Image URL / Asset Path</label>
                  <input
                    type="text"
                    value={content.hero?.image || ''}
                    onChange={(e) => updateHero({ image: e.target.value })}
                    placeholder="/assets/hero.jpg or https://..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                  <input
                    type="text"
                    value={content.hero?.buttonText || ''}
                    onChange={(e) => updateHero({ buttonText: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              {/* Live Preview of Hero Card */}
              <div className="mt-8 pt-6 border-t border-slate-800">
                <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Live Card Preview</span>
                <div className="relative rounded-2xl overflow-hidden bg-brand-forest border border-brand-soft/40 p-6 sm:p-8 text-white min-h-[220px] flex items-center">
                  <div className="relative z-10 max-w-xl">
                    <h3 className="text-2xl font-extrabold text-white">{content.hero?.title}</h3>
                    <h4 className="text-lg font-bold text-brand-pale font-tamil mt-1">{content.hero?.tamilTitle}</h4>
                    <p className="text-xs sm:text-sm text-brand-light/90 mt-3">{content.hero?.subtitle}</p>
                    <div className="mt-5">
                      <span className="inline-block px-5 py-2 rounded-full bg-white text-brand-forest font-bold text-xs shadow">
                        {content.hero?.buttonText} →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: MOTTO, VISION & PRINCIPLES */}
        {activeTab === 'principles' && (
          <div className="space-y-6">
            {/* Core 3 Cards: Motto, Vision, Mission */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-6">Core Institutional Principles</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Motto */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-brand-pale uppercase tracking-wider">Motto (மகுடவாசகம்)</div>
                  <div>
                    <span className="text-[10px] text-slate-400">English</span>
                    <input
                      type="text"
                      value={content.principles?.motto?.english || ''}
                      onChange={(e) => updatePrinciples({ motto: { ...content.principles?.motto, english: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Tamil</span>
                    <input
                      type="text"
                      value={content.principles?.motto?.tamil || ''}
                      onChange={(e) => updatePrinciples({ motto: { ...content.principles?.motto, tamil: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-bold font-tamil"
                    />
                  </div>
                </div>

                {/* Vision */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-brand-pale uppercase tracking-wider">Vision (தரிசனம்)</div>
                  <div>
                    <span className="text-[10px] text-slate-400">English</span>
                    <textarea
                      rows={2}
                      value={content.principles?.vision?.english || ''}
                      onChange={(e) => updatePrinciples({ vision: { ...content.principles?.vision, english: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Tamil</span>
                    <textarea
                      rows={2}
                      value={content.principles?.vision?.tamil || ''}
                      onChange={(e) => updatePrinciples({ vision: { ...content.principles?.vision, tamil: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-tamil"
                    />
                  </div>
                </div>

                {/* Mission */}
                <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-3">
                  <div className="text-xs font-bold text-brand-pale uppercase tracking-wider">Mission (பணி இலக்கு)</div>
                  <div>
                    <span className="text-[10px] text-slate-400">English</span>
                    <textarea
                      rows={2}
                      value={content.principles?.mission?.english || ''}
                      onChange={(e) => updatePrinciples({ mission: { ...content.principles?.mission, english: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400">Tamil</span>
                    <textarea
                      rows={2}
                      value={content.principles?.mission?.tamil || ''}
                      onChange={(e) => updatePrinciples({ mission: { ...content.principles?.mission, tamil: e.target.value } })}
                      className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-white text-xs font-tamil"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Custom Pillars / Principles */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Custom Principles &amp; School Values</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add new value cards (e.g. Discipline, Faith, Service, Excellence) to display on the homepage.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddPrincipleOpen(true)}
                  className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>+ Add New Principle</span>
                </button>
              </div>

              {/* List of Custom Principles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(content.principles?.customCards || []).map((card) => (
                  <div key={card.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-brand-forest/30 text-emerald-300 font-bold uppercase">
                          {card.badge || 'Pillar'}
                        </span>
                        <h4 className="text-sm font-bold text-white">{card.titleEn}</h4>
                      </div>
                      <div className="text-xs text-emerald-400 font-tamil mt-1">{card.titleTa}</div>
                      <p className="text-xs text-slate-400 mt-2">{card.descEn}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => deletePrincipleCard(card.id)}
                      className="text-slate-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-900 transition cursor-pointer ml-3 shrink-0"
                      title="Delete Principle Card"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add New Principle */}
            {isAddPrincipleOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Add New School Principle</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Title (English)</label>
                      <input
                        type="text"
                        value={newPrinciple.titleEn}
                        onChange={(e) => setNewPrinciple({ ...newPrinciple, titleEn: e.target.value })}
                        placeholder="e.g. Integrity & Leadership"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Title (Tamil)</label>
                      <input
                        type="text"
                        value={newPrinciple.titleTa}
                        onChange={(e) => setNewPrinciple({ ...newPrinciple, titleTa: e.target.value })}
                        placeholder="e.g. நேர்மையும் தலைமைத்துவமும்"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-tamil"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                      <textarea
                        rows={2}
                        value={newPrinciple.descEn}
                        onChange={(e) => setNewPrinciple({ ...newPrinciple, descEn: e.target.value })}
                        placeholder="Brief explanation of this principle..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddPrincipleOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newPrinciple.titleEn) return;
                        addPrincipleCard(newPrinciple);
                        setNewPrinciple({ titleEn: '', titleTa: '', descEn: '', descTa: '', badge: 'Pillar' });
                        setIsAddPrincipleOpen(false);
                        showToast('Principle added successfully!', 'success');
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold cursor-pointer"
                    >
                      Add Principle
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: STATS & PERFORMANCE */}
        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">Academic &amp; Campus Statistics</h2>
              <p className="text-xs text-slate-400 mb-6">
                Update core numerical figures that animate dynamically on the homepage.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { key: 'founded', label: 'Founded Year', val: content.performance?.founded },
                  { key: 'students', label: 'Total Students', val: content.performance?.students },
                  { key: 'staff', label: 'Academic Staff', val: content.performance?.staff },
                  { key: 'olPass', label: 'O/L Pass Rate (%)', val: content.performance?.olPass },
                  { key: 'alQual', label: 'A/L University Eligibility (%)', val: content.performance?.alQual },
                  { key: 'clubs', label: 'Clubs & Societies', val: content.performance?.clubs },
                  { key: 'houses', label: 'College Houses', val: content.performance?.houses },
                  { key: 'labs', label: 'Labs / Equip (%)', val: content.performance?.labs }
                ].map(stat => (
                  <div key={stat.key} className="bg-slate-950 border border-slate-800 rounded-2xl p-4">
                    <span className="block text-[11px] font-semibold text-slate-400 mb-1">{stat.label}</span>
                    <input
                      type="number"
                      step="any"
                      value={stat.val ?? ''}
                      onChange={(e) => updatePerformance({ [stat.key]: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono font-bold text-base focus:ring-1 focus:ring-brand-forest"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Metrics */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Additional Custom Metrics</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add new highlight counters (e.g. Smart Classrooms, Scholarships, Alumni Network).
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddStatOpen(true)}
                  className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <span>+ Add New Metric</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(content.performance?.customStats || []).map(stat => (
                  <div key={stat.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">
                        {stat.value}{stat.suffix}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">{stat.label}</div>
                      {stat.description && <div className="text-[11px] text-slate-400 mt-1">{stat.description}</div>}
                    </div>
                    <button
                      type="button"
                      onClick={() => deleteCustomStat(stat.id)}
                      className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-900 transition cursor-pointer"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add Custom Stat */}
            {isAddStatOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Add Custom Statistic</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Metric Label</label>
                      <input
                        type="text"
                        value={newStat.label}
                        onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                        placeholder="e.g. Smart Classrooms"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Value</label>
                        <input
                          type="number"
                          value={newStat.value}
                          onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                          placeholder="e.g. 15"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Suffix</label>
                        <input
                          type="text"
                          value={newStat.suffix}
                          onChange={(e) => setNewStat({ ...newStat, suffix: e.target.value })}
                          placeholder="e.g. + or %"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
                      <input
                        type="text"
                        value={newStat.description}
                        onChange={(e) => setNewStat({ ...newStat, description: e.target.value })}
                        placeholder="Brief note about this metric"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddStatOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newStat.label) return;
                        addCustomStat(newStat);
                        setNewStat({ label: '', labelTa: '', value: '', suffix: '+', description: '' });
                        setIsAddStatOpen(false);
                        showToast('Metric added!', 'success');
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold cursor-pointer"
                    >
                      Add Metric
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 6: PHOTO GALLERY */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Photo Gallery Management</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Manage images displayed in the 3D interactive gallery and campus life portfolio.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddGalleryOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <span>+ Add New Photo</span>
                </button>
              </div>

              {/* Gallery Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {(content.gallery || []).map((img, idx) => (
                  <div key={img.id || idx} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden group">
                    <div className="h-40 w-full overflow-hidden bg-slate-900 relative">
                      <img
                        src={img.src}
                        alt={img.caption || 'Gallery item'}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src = '/assets/hero.jpg';
                        }}
                      />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-sm text-[10px] font-semibold text-emerald-300">
                        {img.category || 'Campus'}
                      </span>
                    </div>

                    <div className="p-3">
                      <input
                        type="text"
                        value={img.caption || ''}
                        onChange={(e) => updateGalleryImage(img.id, { caption: e.target.value })}
                        placeholder="Image caption"
                        className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white text-xs"
                      />
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80">
                        <span className="text-[10px] text-slate-500 font-mono truncate max-w-[140px]">
                          {img.src}
                        </span>
                        <button
                          type="button"
                          onClick={() => deleteGalleryImage(img.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded hover:bg-slate-900 transition cursor-pointer"
                          title="Delete image"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add New Gallery Image */}
            {isAddGalleryOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Add Photo to Gallery</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Image URL / File Path
                      </label>
                      <input
                        type="text"
                        value={newGallery.src}
                        onChange={(e) => setNewGallery({ ...newGallery, src: e.target.value })}
                        placeholder="e.g. /assets/gal_(1).jpeg or https://..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Caption</label>
                      <input
                        type="text"
                        value={newGallery.caption}
                        onChange={(e) => setNewGallery({ ...newGallery, caption: e.target.value })}
                        placeholder="e.g. Annual Sports Meet Parade"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                      <select
                        value={newGallery.category}
                        onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      >
                        <option value="Campus">Campus</option>
                        <option value="Academics">Academics</option>
                        <option value="Sports">Sports</option>
                        <option value="Collegiate Life">Collegiate Life</option>
                        <option value="Events">Events</option>
                        <option value="Culture">Culture</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddGalleryOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newGallery.src) return;
                        addGalleryImage(newGallery);
                        setNewGallery({ src: '', caption: '', category: 'Campus' });
                        setIsAddGalleryOpen(false);
                        showToast('Photo added to gallery!', 'success');
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold cursor-pointer"
                    >
                      Add Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 7: EVENTS & NEWS */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white">Events &amp; School Updates</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Add new official school events and manage the Facebook community feed.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddEventOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shrink-0 self-start sm:self-auto"
                >
                  <span>+ Add New Event</span>
                </button>
              </div>

              {/* Custom Events Cards List */}
              <div className="space-y-4">
                {(content.events?.customEvents || []).map(event => (
                  <div key={event.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-forest/30 text-emerald-300 font-bold uppercase">
                          {event.category || 'General'}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">{event.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-white">{event.title}</h3>
                      {event.titleTa && <h4 className="text-xs text-emerald-400 font-tamil mt-0.5">{event.titleTa}</h4>}
                      <p className="text-xs text-slate-300 mt-2 leading-relaxed">{event.description}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => deleteEvent(event.id)}
                        className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-900 transition cursor-pointer"
                        title="Delete event"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal: Add New Event */}
            {isAddEventOpen && (
              <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl">
                  <h3 className="text-lg font-bold text-white mb-4">Add School Event / News</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title (English)</label>
                      <input
                        type="text"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                        placeholder="e.g. Annual Prize Giving 2026"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title (Tamil)</label>
                      <input
                        type="text"
                        value={newEvent.titleTa}
                        onChange={(e) => setNewEvent({ ...newEvent, titleTa: e.target.value })}
                        placeholder="e.g. வருடாந்த பரிசளிப்பு விழா"
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-tamil"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                        <input
                          type="text"
                          value={newEvent.date}
                          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                          placeholder="e.g. October 2026"
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                        <select
                          value={newEvent.category}
                          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                        >
                          <option value="Sports">Sports</option>
                          <option value="Academics">Academics</option>
                          <option value="Tradition">Tradition</option>
                          <option value="Ceremony">Ceremony</option>
                          <option value="General">General</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        placeholder="Details about the event..."
                        className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs"
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAddEventOpen(false)}
                      className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (!newEvent.title) return;
                        addEvent(newEvent);
                        setNewEvent({
                          title: '',
                          titleTa: '',
                          date: '',
                          category: 'General',
                          badge: 'Upcoming',
                          description: '',
                          image: '/assets/hero.jpg',
                          link: ''
                        });
                        setIsAddEventOpen(false);
                        showToast('Event added successfully!', 'success');
                      }}
                      className="px-4 py-2 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold cursor-pointer"
                    >
                      Add Event
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 8: CONTACT INFORMATION */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">College Contact &amp; Administration Details</h2>
              <p className="text-xs text-slate-400 mb-6">
                Update school phone lines, official emails, office hours, and address links.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Address</label>
                  <input
                    type="text"
                    value={content.contact?.address || ''}
                    onChange={(e) => updateContact({ address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Telephone Number</label>
                  <input
                    type="text"
                    value={content.contact?.phone || ''}
                    onChange={(e) => updateContact({ phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Official Email</label>
                  <input
                    type="email"
                    value={content.contact?.email || ''}
                    onChange={(e) => updateContact({ email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Office Hours</label>
                  <input
                    type="text"
                    value={content.contact?.officeHours || ''}
                    onChange={(e) => updateContact({ officeHours: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Google Maps URL</label>
                  <input
                    type="text"
                    value={content.contact?.mapsUrl || ''}
                    onChange={(e) => updateContact({ mapsUrl: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 9: SCHOOL ANTHEM */}
        {activeTab === 'anthem' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">School Anthem (பாடசாலைக் கீதம்)</h2>
              <p className="text-xs text-slate-400 mb-6">
                Edit the revered school anthem lyrics, ragam composition details, and translation.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Ragam / Musical Scale</label>
                  <input
                    type="text"
                    value={content.anthem?.ragam || ''}
                    onChange={(e) => updateAnthem({ ragam: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Audio URL / Embed Link</label>
                  <input
                    type="text"
                    value={content.anthem?.audioUrl || ''}
                    onChange={(e) => updateAnthem({ audioUrl: e.target.value })}
                    placeholder="/assets/anthem.mp3 or YouTube link"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Anthem Verses (Tamil)
                </label>
                <textarea
                  rows={8}
                  value={Array.isArray(content.anthem?.versesTamil) ? content.anthem.versesTamil.join('\n\n') : ''}
                  onChange={(e) => updateAnthem({ versesTamil: e.target.value.split('\n\n') })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-tamil leading-relaxed"
                />
              </div>

              <div className="mt-5">
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  English Translation / Meaning
                </label>
                <textarea
                  rows={3}
                  value={content.anthem?.translationEn || ''}
                  onChange={(e) => updateAnthem({ translationEn: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 10: SETTINGS, PASSCODE & BACKUP */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            {/* Change Admin PIN */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">Security &amp; Passcode Settings</h2>
              <p className="text-xs text-slate-400 mb-6">
                Change the access passcode required to unlock the Admin Panel.
              </p>

              <form onSubmit={handleChangePin} className="max-w-md space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current PIN
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentPinSetting}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    New Security PIN
                  </label>
                  <input
                    type="text"
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="Enter new 4+ character PIN"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition cursor-pointer"
                >
                  Update Passcode
                </button>
              </form>
            </div>

            {/* Backup & Restore */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-white mb-2">Backup &amp; Configuration Export</h2>
              <p className="text-xs text-slate-400 mb-6">
                Download a JSON backup of all current site settings or import a previously exported backup file.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={exportJson}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 cursor-pointer transition"
                >
                  <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download siteContent.json</span>
                </button>

                <label className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 flex items-center gap-2 cursor-pointer transition">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span>Import JSON Backup</span>
                  <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </label>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to restore default factory content? This will reset local changes.')) {
                      resetToDefaults();
                      showToast('Site content reset to factory defaults', 'success');
                    }
                  }}
                  className="px-5 py-3 rounded-2xl bg-rose-950/60 hover:bg-rose-900 border border-rose-800 text-rose-200 text-xs font-bold transition cursor-pointer ml-auto"
                >
                  Reset to Defaults
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
