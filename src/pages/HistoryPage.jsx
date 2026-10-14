import React, { useEffect } from 'react';
import HistoryTimeline from '../components/HistoryTimeline.jsx';
import LeadershipDirectory from '../components/LeadershipDirectory.jsx';

export default function HistoryPage({ lang = 'en' }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lang]);

  return (
    <main className="flex-grow py-10 sm:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <HistoryTimeline key={`timeline-${lang}`} lang={lang} />
        <LeadershipDirectory key={`lead-${lang}`} lang={lang} />
      </div>
    </main>
  );
}
