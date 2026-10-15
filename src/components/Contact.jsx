import React from 'react';

export const MAPS_LOCATION_URL = "https://maps.app.goo.gl/UMsXzzu46QNMNwcB8";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61575442051109";
export const INSTAGRAM_URL = "https://www.instagram.com/explore/tags/kopaychristiancollege/";

export default function Contact() {
  return (
    <section className="py-14 sm:py-20 bg-brand-white border-t border-brand-pale scroll-mt-20 sm:scroll-mt-24" id="contact">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-forest rounded-3xl p-6 sm:p-10 lg:p-12 text-brand-white shadow-xl border border-brand-soft/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Column: Contact Information & Social Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-brand-pale text-xs font-bold tracking-wider uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-brand-pale animate-pulse"></span>
                  <span>Contact & Location</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                  College Office
                </h2>
                <h3 className="text-lg sm:text-xl font-bold text-brand-pale font-tamil mt-1">
                  கல்லூரி அலுவலகம் & தொடர்புகள்
                </h3>
                <p className="text-brand-light/90 text-xs sm:text-sm leading-relaxed mt-2.5">
                  Reach out to the college administration office for student records, admissions, transcripts, sports facilities, and institutional inquiries.
                </p>

                {/* Details List */}
                <div className="space-y-3.5 pt-6 text-xs sm:text-sm">
                  {/* Address */}
                  <div className="flex items-start gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-sage/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="block text-[11px] font-semibold text-brand-pale uppercase tracking-wider">
                        Address / முகவரி
                      </span>
                      <a
                        href={MAPS_LOCATION_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-white hover:text-brand-pale transition-colors inline-flex items-center gap-1.5 mt-0.5 group"
                      >
                        <span>J/Kopay Christian College, Kopay, Jaffna, Sri Lanka</span>
                        <svg className="w-3.5 h-3.5 text-brand-pale/70 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-sage/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-brand-pale uppercase tracking-wider">
                        Phone / தொலைபேசி
                      </span>
                      <a href="tel:0212230040" className="font-semibold text-white hover:text-brand-pale transition-colors text-base">
                        021 223 0040
                      </a>
                      <span className="block text-[11px] text-brand-light/80">Mon – Fri, 8:00 AM – 3:30 PM</span>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-brand-sage/80 flex items-center justify-center shrink-0 text-white shadow-xs">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-brand-pale uppercase tracking-wider">
                        Email / மின்னஞ்சல்
                      </span>
                      <a href="mailto:kcckopay@gmail.com" className="font-semibold text-white hover:text-brand-pale transition-colors">
                        kcckopay@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels: Facebook & Instagram */}
              <div className="pt-4 border-t border-white/15">
                <span className="block text-xs font-bold text-brand-pale uppercase tracking-wider mb-3">
                  Connect on Social Media
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Facebook Link Button */}
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#1877F2]/20 hover:bg-[#1877F2] border border-[#1877F2]/40 text-white transition-all duration-200 group cursor-pointer shadow-xs active:scale-[0.98]"
                    aria-label="Follow Kopay Christian College on Facebook"
                  >
                    <div className="w-9 h-9 rounded-xl bg-[#1877F2] group-hover:bg-white flex items-center justify-center shrink-0 transition-colors shadow-xs">
                      <svg className="w-5 h-5 fill-white group-hover:fill-[#1877F2] transition-colors" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Facebook</div>
                      <div className="text-[11px] text-brand-light/90 truncate font-tamil">மாணவர்கள் பக்கம்</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/70 ml-auto transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>

                  {/* Instagram Link Button */}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white/10 hover:bg-gradient-to-r hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] border border-white/20 text-white transition-all duration-200 group cursor-pointer shadow-xs active:scale-[0.98]"
                    aria-label="Explore Kopay Christian College on Instagram"
                  >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center shrink-0 shadow-xs">
                      <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold leading-tight">Instagram</div>
                      <div className="text-[11px] text-brand-light/90 truncate">#kopaychristiancollege</div>
                    </div>
                    <svg className="w-3.5 h-3.5 text-white/70 ml-auto transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Small Location Map & Google Maps Link */}
            <div className="lg:col-span-7 flex flex-col rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-white text-slate-800 shadow-xl border border-brand-pale">
              {/* Map Header Card Bar */}
              <div className="p-4 sm:p-5 bg-brand-light/80 border-b border-brand-pale flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-brand-forest text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      Campus Map & Directions
                    </h4>
                    <p className="text-[11px] text-slate-500 font-tamil">
                      கோப்பாய் கல்லூரி அமைவிடம்
                    </p>
                  </div>
                </div>

                <a
                  href={MAPS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-forest hover:bg-brand-forestHover text-white text-xs font-semibold shadow-xs transition-all duration-200 cursor-pointer shrink-0"
                >
                  <span>Open Maps</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              {/* Embedded Interactive Map */}
              <div className="relative w-full h-[320px] sm:h-[380px] lg:h-[400px] bg-slate-100">
                <iframe
                  title="J/Kopay Christian College Location Map"
                  src="https://maps.google.com/maps?q=Kopay+Christian+College+Jaffna&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating "View in Google Maps" Badge Overlay */}
                <a
                  href={MAPS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-slate-800 hover:text-brand-forest px-3.5 py-1.5 rounded-full text-xs font-bold shadow-md border border-slate-200 transition-all flex items-center gap-1.5 cursor-pointer backdrop-blur-xs"
                >
                  <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span>View on Google Maps</span>
                </a>
              </div>

              {/* Map Footer Note */}
              <div className="p-3.5 sm:p-4 bg-brand-white border-t border-brand-pale/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                  <span>Point Pedro Road, Kopay (Accessible via Jaffna public transit & bus routes)</span>
                </div>
                <a
                  href={MAPS_LOCATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-forest font-semibold hover:underline shrink-0"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
