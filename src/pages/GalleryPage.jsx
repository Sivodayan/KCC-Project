import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="flex-grow py-4 sm:py-6 bg-brand-white">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-3">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-light border border-brand-pale text-brand-forest hover:bg-brand-pale/70 font-semibold transition-all shadow-2xs hover:-translate-x-0.5"
          >
            <span>← Home</span>
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">Campus Photo Gallery</span>
        </nav>
      </div>
      <Gallery />
    </main>
  );
}
