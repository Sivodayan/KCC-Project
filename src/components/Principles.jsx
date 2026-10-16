import React, { useState } from 'react';
import { useSiteContent } from '../context/SiteContentContext.jsx';

export default function Principles() {
  const { content } = useSiteContent();
  const principles = content?.principles || {};

  const motto = principles.motto || {
    english: "\"Truth and Justice\"",
    tamil: "“உண்மைக்கும் நேர்மைக்கும்”"
  };

  const vision = principles.vision || {
    english: "\"THE IDEAL SCHOOL IN PENINSULA\"",
    tamil: "“குடாநாட்டின் முன்மாதிரிப் பாடசாலை”"
  };

  const mission = principles.mission || {
    english: "To foster self respect, values, character, patriotism and Social Justice to lead the school community towards the global frontiers in education and to work for the optimum use of all the available resources skills and abilities.",
    tamil: "சுயமரியாதை, விழுமியங்கள், நடத்தைக் கோலங்கள், நாட்டுப்பற்று, சமூக நியாயப்பாடு என்பவற்றை உள்ளடக்கிப் பாடசாலை சமூகத்தை கல்வியிலும், கல்விசார் கடமைகளிலும், வளங்கள், தேர்ச்சிகள் மற்றும் திறமைகளைப் பயன்படுத்திப் பாடசாலையில் கல்வித்தரத்தை நாட்டின் முதல் வரிசைக்குக் கொண்டு வருதல்."
  };

  const customCards = principles.customCards || [];

  const [flippedCards, setFlippedCards] = useState({});

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
    <section className="py-12 sm:py-16 bg-brand-light border-b border-brand-pale scroll-mt-20 sm:scroll-mt-24" id="principles">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Motto */}
          <div className="reveal-item stagger-1 h-[290px] sm:h-[310px] lg:h-[300px]">
            <div
              role="button"
              tabIndex={0}
              aria-label="Motto card - hover or tap to flip between English and Tamil"
              className={`flip-card w-full h-full cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 ${flippedCards.motto ? 'is-flipped' : ''
                }`}
              onClick={() => toggleFlip('motto')}
              onKeyDown={(e) => handleKeyDown(e, 'motto')}
            >
              <div className="flip-card-inner">
                {/* Front (English - Default) */}
                <div className="flip-card-front bg-brand-forest text-brand-white p-7 sm:p-8 border border-brand-soft/40 flex flex-col">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale">
                      Motto
                    </span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
                      {motto.english}
                    </h3>
                  </div>
                </div>

                {/* Back (Tamil - on Hover/Flip) */}
                <div className="flip-card-back bg-brand-white text-slate-800 p-7 sm:p-8 border border-brand-pale flex flex-col">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest font-tamil">
                      மகுடவாசகம்
                    </span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <h3 className="text-3xl sm:text-4xl lg:text-[36px] font-extrabold text-brand-forest font-tamil leading-[1.6]">
                      <span className="block">{motto.tamil}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vision */}
          <div className="reveal-item stagger-2 h-[290px] sm:h-[310px] lg:h-[300px]">
            <div
              role="button"
              tabIndex={0}
              aria-label="Vision card - hover or tap to flip between English and Tamil"
              className={`flip-card w-full h-full cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 ${flippedCards.vision ? 'is-flipped' : ''
                }`}
              onClick={() => toggleFlip('vision')}
              onKeyDown={(e) => handleKeyDown(e, 'vision')}
            >
              <div className="flip-card-inner">
                {/* Front (English - Default) */}
                <div className="flip-card-front bg-brand-white text-slate-800 p-7 sm:p-8 border border-brand-pale flex flex-col">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">
                      Vision
                    </span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-brand-forest tracking-tight leading-snug">
                      {vision.english}
                    </h3>
                  </div>
                </div>

                {/* Back (Tamil - on Hover/Flip) */}
                <div className="flip-card-back bg-brand-forest text-brand-white p-7 sm:p-8 border border-brand-soft/40 flex flex-col">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale font-tamil">
                      தூரநோக்கு
                    </span>
                  </div>
                  <div className="flex-1 flex items-center">
                    <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-bold font-tamil text-white leading-[1.65]">
                      <span className="block">{vision.tamil}</span>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mission Statement */}
          <div className="reveal-item stagger-3 h-[290px] sm:h-[310px] lg:h-[300px]">
            <div
              role="button"
              tabIndex={0}
              aria-label="Mission Statement card - hover or tap to flip between English and Tamil"
              className={`flip-card w-full h-full cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 ${flippedCards.mission ? 'is-flipped' : ''
                }`}
              onClick={() => toggleFlip('mission')}
              onKeyDown={(e) => handleKeyDown(e, 'mission')}
            >
              <div className="flip-card-inner">
                {/* Front (English - Default) */}
                <div className="flip-card-front bg-brand-white text-slate-800 p-7 sm:p-8 border border-brand-pale flex flex-col">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">
                      Mission Statement
                    </span>
                  </div>
                  <div className="flex-1 flex items-center pt-1">
                    <p className="text-sm sm:text-[14.5px] lg:text-[15px] text-slate-700 leading-relaxed font-normal">
                      {mission.english}
                    </p>
                  </div>
                </div>

                {/* Back (Tamil - on Hover/Flip) */}
                <div className="flip-card-back bg-brand-forest text-brand-white p-7 sm:p-8 border border-brand-soft/40 flex flex-col">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale font-tamil">
                      நோக்கக்கூற்று
                    </span>
                  </div>
                  <div className="flex-1 flex items-center pt-1">
                    <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-brand-light font-tamil leading-[1.85] font-normal">
                      {mission.tamil}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Custom Principle Cards Added by Admin */}
        {customCards.length > 0 && (
          <div className="mt-8 pt-6 border-t border-brand-pale/60">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customCards.map((card, idx) => {
                const cardKey = card.id || `custom_${idx}`;
                return (
                  <div key={cardKey} className="reveal-item h-[240px]">
                    <div
                      role="button"
                      tabIndex={0}
                      onClick={() => toggleFlip(cardKey)}
                      onKeyDown={(e) => handleKeyDown(e, cardKey)}
                      className={`flip-card w-full h-full cursor-pointer select-none rounded-3xl shadow-sm hover:shadow-lg transition-shadow duration-300 ${flippedCards[cardKey] ? 'is-flipped' : ''
                        }`}
                    >
                      <div className="flip-card-inner">
                        <div className="flip-card-front bg-brand-white text-slate-800 p-6 border border-brand-pale rounded-3xl flex flex-col">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-brand-light text-brand-forest border border-brand-pale">
                              {card.badge || 'Pillar'}
                            </span>
                            <span className="text-[10px] text-slate-400">Tap to flip</span>
                          </div>
                          <h4 className="text-xl font-bold text-brand-forest mt-1">{card.titleEn}</h4>
                          <p className="text-xs text-slate-600 mt-2 leading-relaxed flex-1">{card.descEn}</p>
                        </div>

                        <div className="flip-card-back bg-brand-forest text-brand-white p-6 rounded-3xl border border-brand-soft/40 flex flex-col">
                          <span className="text-[10px] font-extrabold tracking-widest uppercase text-brand-pale">
                            {card.badge || 'மதிப்பீடு'}
                          </span>
                          <h4 className="text-lg font-bold text-white font-tamil mt-2">{card.titleTa || card.titleEn}</h4>
                          <p className="text-xs text-brand-light/90 font-tamil mt-2 leading-relaxed flex-1">
                            {card.descTa || card.descEn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
