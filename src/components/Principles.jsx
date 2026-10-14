import React, { useState } from 'react';

export default function Principles() {
  const [flippedCards, setFlippedCards] = useState({ motto: false, vision: false, mission: false });

  const toggleFlip = (cardKey) => {
    setFlippedCards(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  const handleKeyDown = (e, cardKey) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleFlip(cardKey);
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-brand-light border-b border-brand-pale" id="principles">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Motto */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Motto card - click to flip between English and Tamil"
            aria-pressed={flippedCards.motto}
            title="Click to flip card (English / தமிழ்)"
            className={`flip-card perspective-1000 h-[320px] sm:h-[340px] lg:h-[320px] cursor-pointer group select-none reveal-item stagger-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl ${
              flippedCards.motto ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('motto')}
            onKeyDown={(e) => handleKeyDown(e, 'motto')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English) */}
              <div className="flip-card-front absolute inset-0 backface-hidden bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col justify-between transition-shadow duration-300 group-hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale">Motto</span>
                    <span className="text-[11px] font-medium text-brand-pale/75 inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Flip
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight mt-2">
                    "Truth and Justice"
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[11px] text-brand-pale/80 hidden sm:inline">Click anywhere to flip</span>
                  <span className="font-tamil inline-flex items-center gap-2 text-xs font-semibold text-brand-pale group-hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full ml-auto">
                    <span>தமிழ்</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">➜</span>
                  </span>
                </div>
              </div>

              {/* Back (Tamil) */}
              <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between transition-shadow duration-300 group-hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest font-tamil">
                      மகுடவாசகம்
                    </span>
                    <span className="text-[11px] font-medium text-brand-forest/75 inline-flex items-center gap-1 bg-brand-light px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      திருப்புக
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[38px] font-extrabold text-brand-forest font-tamil leading-[1.6] sm:leading-[1.7] mt-2">
                    <span className="block">“உண்மைக்கும்</span>
                    <span className="block mt-2.5 sm:mt-3">நேர்மைக்கும்”</span>
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-pale/70">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">மீண்டும் திருப்ப அழுத்தவும்</span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-light hover:bg-brand-pale px-3.5 py-1.5 rounded-full ml-auto">
                    <span>English</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">➜</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vision */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Vision card - click to flip between English and Tamil"
            aria-pressed={flippedCards.vision}
            title="Click to flip card (English / தமிழ்)"
            className={`flip-card perspective-1000 h-[320px] sm:h-[340px] lg:h-[320px] cursor-pointer group select-none reveal-item stagger-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl ${
              flippedCards.vision ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('vision')}
            onKeyDown={(e) => handleKeyDown(e, 'vision')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English) */}
              <div className="flip-card-front absolute inset-0 backface-hidden bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between transition-shadow duration-300 group-hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">Vision</span>
                    <span className="text-[11px] font-medium text-brand-forest/75 inline-flex items-center gap-1 bg-brand-light px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Flip
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-brand-forest tracking-tight leading-snug mt-2">
                    "THE IDEAL SCHOOL IN PENINSULA"
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-pale/70">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">Click anywhere to flip</span>
                  <span className="font-tamil inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-light hover:bg-brand-pale px-3.5 py-1.5 rounded-full ml-auto">
                    <span>தமிழ்</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">➜</span>
                  </span>
                </div>
              </div>

              {/* Back (Tamil) */}
              <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col justify-between transition-shadow duration-300 group-hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale font-tamil">
                      தூரநோக்கு
                    </span>
                    <span className="text-[11px] font-medium text-brand-pale/75 inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      திருப்புக
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-bold font-tamil text-white leading-[1.65] mt-2">
                    <span className="block">“குடாநாட்டின்</span>
                    <span className="block mt-1 sm:mt-1.5">முன்மாதிரிப் பாடசாலை”</span>
                  </h3>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-[11px] text-brand-pale/80 hidden sm:inline">மீண்டும் திருப்ப அழுத்தவும்</span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-pale group-hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full ml-auto">
                    <span>English</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">➜</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mission Statement */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Mission card - click to flip between English and Tamil"
            aria-pressed={flippedCards.mission}
            title="Click to flip card (English / தமிழ்)"
            className={`flip-card perspective-1000 h-[320px] sm:h-[340px] lg:h-[320px] cursor-pointer group select-none reveal-item stagger-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl ${
              flippedCards.mission ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('mission')}
            onKeyDown={(e) => handleKeyDown(e, 'mission')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English) */}
              <div className="flip-card-front absolute inset-0 backface-hidden bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">
                      Mission Statement
                    </span>
                    <span className="text-[11px] font-medium text-brand-forest/75 inline-flex items-center gap-1 bg-brand-light px-2 py-0.5 rounded-full">
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Flip
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mt-1">
                    To foster self respect, values, character, patriotism and Social Justice to lead the school
                    community towards the global frontiers in education and to work for the optimum use of all the
                    available resources skills and abilities.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-pale/70">
                  <span className="text-[11px] text-slate-400 hidden sm:inline">Click anywhere to flip</span>
                  <span className="font-tamil inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-light hover:bg-brand-pale px-3.5 py-1.5 rounded-full ml-auto">
                    <span>தமிழ்</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">➜</span>
                  </span>
                </div>
              </div>

              {/* Back (Tamil) */}
              <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 bg-brand-light text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between overflow-hidden transition-shadow duration-300 group-hover:shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest font-tamil">
                      நோக்கக்கூற்று
                    </span>
                    <span className="text-[11px] font-medium text-brand-forest/75 inline-flex items-center gap-1 bg-brand-white px-2 py-0.5 rounded-full border border-brand-pale">
                      <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      திருப்புக
                    </span>
                  </div>
                  <p className="text-sm sm:text-[14.5px] text-slate-800 font-tamil leading-[1.8] sm:leading-[1.85] font-normal mt-1">
                    சுயமரியாதை, விழுமியங்கள், நடத்தைக் கோலங்கள், நாட்டுப்பற்று, சமூக நியாயப்பாடு என்பவற்றை உள்ளடக்கிப்
                    பாடசாலை சமூகத்தை கல்வியிலும், கல்விசார் கடமைகளிலும், வளங்கள், தேர்ச்சிகள் மற்றும் திறமைகளைப்
                    பயன்படுத்திப் பாடசாலையில் கல்வித்தரத்தை நாட்டின் முதல் வரிசைக்குக் கொண்டு வருதல்.
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-brand-pale/70">
                  <span className="text-[11px] text-slate-500 hidden sm:inline">மீண்டும் திருப்ப அழுத்தவும்</span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-white border border-brand-pale hover:bg-brand-pale/50 px-3.5 py-1.5 rounded-full ml-auto">
                    <span>English</span>
                    <span className="text-sm transition-transform duration-200 group-hover:translate-x-0.5">➜</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
