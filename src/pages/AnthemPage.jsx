import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SchoolAnthem from '../components/SchoolAnthem.jsx';

export default function AnthemPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="flex-grow py-4 sm:py-6 bg-brand-white">
      {/* Breadcrumb Navigation */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-1">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="text-brand-forest hover:underline font-semibold">← Home</Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-semibold font-tamil">பாடசாலைக் கீதம் (School Anthem)</span>
        </nav>
      </div>

      {/* Standalone Anthem Content */}
      <SchoolAnthem />
    </main>
  );
}
