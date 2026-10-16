import React, { useState, useRef } from 'react';
import { FACEBOOK_POSTS } from '../data/facebookEvents.js';
import { useSiteContent } from '../context/SiteContentContext.jsx';

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

function CustomEventCard({ event }) {
  return (
    <div className="w-full max-w-[360px] bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-forest/40 transition-all duration-300 overflow-hidden flex flex-col group">
      {event.image && (
        <div className="h-44 w-full overflow-hidden relative bg-brand-forest/10">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = '/assets/hero.jpg';
            }}
          />
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-brand-forest text-white font-extrabold text-[10px] uppercase tracking-wider shadow">
              {event.badge || event.category || 'Event'}
            </span>
          </div>
        </div>
      )}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-slate-400 mb-1 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{event.date}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-forest transition">
            {event.title}
          </h3>
          {event.titleTa && (
            <h4 className="text-xs font-semibold text-brand-forest font-tamil mt-1">
              {event.titleTa}
            </h4>
          )}
          <p className="text-xs text-slate-600 mt-2.5 leading-relaxed line-clamp-3">
            {event.description}
          </p>
        </div>

        {event.link && (
          <div className="mt-4 pt-3 border-t border-slate-100">
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-brand-forest hover:text-brand-forestHover transition"
            >
              <span>View Details</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SchoolEvents() {
  const { content } = useSiteContent();
  const customEvents = content?.events?.customEvents || [];
  const showFacebookFeed = content?.events?.showFacebookFeed !== false;

  return (
    <section className="py-6 sm:py-10 bg-brand-white" id="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Custom Events Added via Admin */}
        {customEvents.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-forest"></span>
              <h2 className="text-xl font-bold text-slate-900">Official Announcements &amp; Upcoming Events</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-stretch">
              {customEvents.map((evt) => (
                <CustomEventCard key={evt.id} event={evt} />
              ))}
            </div>
          </div>
        )}

        {/* Facebook Community Feed */}
        {showFacebookFeed && (
          <div>
            {customEvents.length > 0 && (
              <div className="flex items-center gap-2 mb-6 pt-4 border-t border-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <h2 className="text-xl font-bold text-slate-900">Facebook Community Activity</h2>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-stretch">
              {FACEBOOK_POSTS.map((post) => (
                <EventCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
