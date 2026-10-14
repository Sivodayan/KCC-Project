import React, { useEffect } from 'react';
import Hero from '../components/Hero.jsx';
import Principles from '../components/Principles.jsx';
import Performance from '../components/Performance.jsx';
import Gallery from '../components/Gallery.jsx';
import Contact from '../components/Contact.jsx';

export default function HomePage({ onNavigate }) {
  useEffect(() => {
    // Scroll entrance observer for smoothly revealing sections
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });

    const items = document.querySelectorAll('.reveal-item:not(.is-visible)');
    items.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="flex-grow">
      <Hero onExploreHistory={() => onNavigate('history')} />
      <Principles />
      <Performance />
      <Gallery />
      <Contact />
    </main>
  );
}
