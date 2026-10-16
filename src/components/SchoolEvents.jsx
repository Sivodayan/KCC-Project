import React, { useState, useRef } from 'react';
import { FACEBOOK_POSTS } from '../data/facebookEvents.js';

function EventCard({ post }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const postUrl =
    post.postUrl ||
    decodeURIComponent(post.iframeSrc.match(/href=([^&]+)/)?.[1] || post.iframeSrc);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[360px] h-[480px] bg-white rounded-3xl border transition-all duration-300 ease-out overflow-hidden flex flex-col justify-center items-center p-2.5 cursor-pointer group active:scale-[0.99] select-none ${isHovered
          ? '-translate-y-2 scale-[1.02] shadow-2xl shadow-brand-forest/15 border-brand-forest/40 ring-2 ring-brand-forest/20'
          : 'shadow-sm border-slate-200/90 hover:shadow-md'
        }`}
    >
      {/* Full-card overlay ensuring cursor is pointer across the entire card */}
      <a
        href={postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-20 cursor-pointer"
        aria-label={`Open Facebook post ${post.id}`}
        title="Open post on Facebook"
      />

      {/* Dynamic Cursor Spotlight Glow following mouse coordinates */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(360px circle at ${mousePos.x}px ${mousePos.y}px, rgba(24, 119, 242, 0.12), rgba(27, 77, 62, 0.05), transparent 70%)`,
        }}
      />

      {/* Top Emerald Accent Shimmer on Hover */}
      <div
        className={`pointer-events-none absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-forest to-transparent transition-opacity duration-300 z-10 ${isHovered ? 'opacity-100' : 'opacity-0'
          }`}
      />

      {/* Card Content container with Facebook iframe */}
      <div
        className={`w-full h-full overflow-y-auto overflow-x-hidden flex justify-center relative z-0 transition-transform duration-300 pointer-events-none ${post.height <= 300 ? 'items-center' : 'items-start'
          }`}
      >
        <div
          className="shrink-0 flex justify-center origin-top transition-transform duration-300 pointer-events-none"
          style={{
            width: '500px',
            height: `${post.height}px`,
            transform: 'scale(0.66)',
            marginBottom: `-${post.height * 0.34}px`,
          }}
        >
          <iframe
            src={post.iframeSrc}
            width={post.width || 500}
            height={post.height}
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder="0"
            allowFullScreen={true}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            className="w-full h-full rounded-2xl pointer-events-none"
            title={`Facebook Post ${post.id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default function SchoolEvents() {
  return (
    <section className="py-6 sm:py-10 bg-brand-white" id="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-stretch">
          {FACEBOOK_POSTS.map((post) => (
            <EventCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
