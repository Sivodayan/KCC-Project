import React from 'react';
import OfflinePage from '../pages/OfflinePage.jsx';

function isNetworkOrChunkError(error) {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return true;
  }
  if (!error) return false;

  const msg = typeof error.message === 'string' ? error.message.toLowerCase() : '';
  const name = typeof error.name === 'string' ? error.name : '';

  return (
    name === 'ChunkLoadError' ||
    msg.includes('failed to fetch') ||
    msg.includes('dynamically imported module') ||
    msg.includes('networkerror') ||
    msg.includes('load failed')
  );
}

export class NetworkErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[NetworkErrorBoundary]', error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (isNetworkOrChunkError(this.state.error)) {
        return <OfflinePage />;
      }

      return (
        <main className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-brand-white dark:bg-[#111e13] p-8 rounded-3xl border border-brand-pale dark:border-emerald-900/40 shadow-xs max-w-md w-full">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
              Something went wrong
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              An unexpected issue occurred while rendering this view.
            </p>
            <button
              type="button"
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Reload Page
            </button>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default NetworkErrorBoundary;


