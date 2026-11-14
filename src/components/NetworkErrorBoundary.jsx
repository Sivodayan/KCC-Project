import React from 'react';
import OfflinePage from '../pages/OfflinePage.jsx';

export class NetworkErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('NetworkErrorBoundary caught an error:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Check if error is related to chunk loading or offline fetch
      const isChunkOrNetwork =
        !navigator.onLine ||
        (this.state.error &&
          (this.state.error.name === 'ChunkLoadError' ||
           this.state.error.message?.includes('Failed to fetch') ||
           this.state.error.message?.includes('dynamically imported module') ||
           this.state.error.message?.includes('NetworkError')));

      if (isChunkOrNetwork) {
        return <OfflinePage onOpenAnthem={this.props.onOpenAnthem} />;
      }

      // Default error fallback
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-brand-white dark:bg-[#111e13] p-8 rounded-3xl border border-brand-pale dark:border-emerald-900/40 shadow-xs max-w-md w-full">
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">Something went wrong</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              A temporary issue occurred while loading this page.
            </p>
            <button
              onClick={() => {
                this.resetError();
                window.location.reload();
              }}
              className="px-5 py-2.5 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-bold transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NetworkErrorBoundary;

