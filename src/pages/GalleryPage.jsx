import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Gallery from '../components/Gallery.jsx';

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="flex-grow py-4 sm:py-6">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="text-brand-forest hover:underline font-semibold">← Home</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold">Campus Photo Gallery</span>
        </nav>
      </div>
      <Gallery />
    </main>
  );
}
