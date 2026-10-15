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
    <section className="py-12 sm:py-16 bg-brand-light border-b border-brand-pale scroll-mt-20 sm:scroll-mt-24" id="principles">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Motto */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Motto card - hover or click to flip between English and Tamil"
            className={`flip-card perspective-1000 h-[290px] sm:h-[310px] lg:h-[300px] cursor-pointer group select-none reveal-item stagger-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl ${
              flippedCards.motto ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('motto')}
            onKeyDown={(e) => handleKeyDown(e, 'motto')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English - Default) */}
              <div className="flip-card-front absolute inset-0 backface-hidden bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale">
                    Motto
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight">
                    "Truth and Justice"
                  </h3>
                </div>
              </div>

              {/* Back (Tamil - on Hover/Flip) */}
              <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest font-tamil">
                    மகுடவாசகம்
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <h3 className="text-3xl sm:text-4xl lg:text-[36px] font-extrabold text-brand-forest font-tamil leading-[1.6]">
                    <span className="block">“உண்மைக்கும்</span>
                    <span className="block mt-2">நேர்மைக்கும்”</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vision */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Vision card - hover or click to flip between English and Tamil"
            className={`flip-card perspective-1000 h-[290px] sm:h-[310px] lg:h-[300px] cursor-pointer group select-none reveal-item stagger-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl ${
              flippedCards.vision ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('vision')}
            onKeyDown={(e) => handleKeyDown(e, 'vision')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English - Default) */}
              <div className="flip-card-front absolute inset-0 backface-hidden bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">
                    Vision
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-brand-forest tracking-tight leading-snug">
                    "THE IDEAL SCHOOL IN PENINSULA"
                  </h3>
                </div>
              </div>

              {/* Back (Tamil - on Hover/Flip) */}
              <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale font-tamil">
                    தூரநோக்கு
                  </span>
                </div>
                <div className="flex-1 flex items-center">
                  <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-bold font-tamil text-white leading-[1.65]">
                    <span className="block">“குடாநாட்டின்</span>
                    <span className="block mt-1 sm:mt-1.5">முன்மாதிரிப் பாடசாலை”</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mission Statement */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Mission Statement card - hover or click to flip between English and Tamil"
            className={`flip-card perspective-1000 h-[290px] sm:h-[310px] lg:h-[300px] cursor-pointer group select-none reveal-item stagger-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest rounded-3xl ${
              flippedCards.mission ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('mission')}
            onKeyDown={(e) => handleKeyDown(e, 'mission')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English - Default) */}
              <div className="flip-card-front absolute inset-0 backface-hidden bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">
                    Mission Statement
                  </span>
                </div>
                <div className="flex-1 flex items-center pt-1">
                  <p className="text-sm sm:text-[14.5px] lg:text-[15px] text-slate-700 leading-relaxed font-normal">
                    To foster self respect, values, character, patriotism and Social Justice to lead the school
                    community towards the global frontiers in education and to work for the optimum use of all the
                    available resources skills and abilities.
                  </p>
                </div>
              </div>

              {/* Back (Tamil - on Hover/Flip) */}
              <div className="flip-card-back absolute inset-0 backface-hidden rotate-y-180 bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col transition-shadow duration-300 group-hover:shadow-xl">
                <div>
                  <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale font-tamil">
                    நோக்கக்கூற்று
                  </span>
                </div>
                <div className="flex-1 flex items-center pt-1">
                  <p className="text-xs sm:text-[13.5px] lg:text-[14px] text-brand-light font-tamil leading-[1.85] font-normal">
                    சுயமரியாதை, விழுமியங்கள், நடத்தைக் கோலங்கள், நாட்டுப்பற்று, சமூக நியாயப்பாடு என்பவற்றை உள்ளடக்கிப்
                    பாடசாலை சமூகத்தை கல்வியிலும், கல்விசார் கடமைகளிலும், வளங்கள், தேர்ச்சிகள் மற்றும் திறமைகளைப்
                    பயன்படுத்திப் பாடசாலையில் கல்வித்தரத்தை நாட்டின் முதல் வரிசைக்குக் கொண்டு வருதல்.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
