import React from 'react';
import { FACEBOOK_POSTS } from '../data/facebookEvents.js';

export default function SchoolEvents() {
  return (
    <section className="py-6 sm:py-10 bg-brand-white" id="events-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center items-stretch">
          {FACEBOOK_POSTS.map((post) => (
            <div
              key={post.id}
              className="w-full max-w-[360px] h-[480px] bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-center items-center p-2.5"
            >
              <div
                className={`w-full h-full overflow-y-auto overflow-x-hidden flex justify-center ${
                  post.height <= 300 ? 'items-center' : 'items-start'
                }`}
              >
                <div
                  className="shrink-0 flex justify-center origin-top"
                  style={{
                    width: '500px',
                    height: `${post.height}px`,
                    transform: 'scale(0.66)',
                    marginBottom: `-${post.height * 0.34}px`
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
                    className="w-full h-full rounded-xl"
                    title={`Facebook Post ${post.id}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
