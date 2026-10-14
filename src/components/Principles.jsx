import React, { useState } from 'react';

export default function Principles() {
  const [flippedCards, setFlippedCards] = useState({ motto: false, vision: false, mission: false });

  const toggleFlip = (cardKey) => {
    setFlippedCards(prev => ({ ...prev, [cardKey]: !prev[cardKey] }));
  };

  return (
    <section className="py-12 sm:py-16 bg-brand-light border-b border-brand-pale" id="principles">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Motto */}
          <div
            className={`flip-card perspective-1000 h-[300px] sm:h-[320px] lg:h-[300px] cursor-pointer group select-none ${
              flippedCards.motto ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('motto')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English) */}
              <div className="absolute inset-0 backface-hidden bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale">Motto</span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold tracking-tight text-white leading-tight mt-2">
                    "Truth and Justice"
                  </h3>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-white/10">
                  <span className="font-tamil inline-flex items-center gap-2 text-xs font-semibold text-brand-pale group-hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full">
                    <span>தமிழ்</span>
                    <span className="text-sm">➜</span>
                  </span>
                </div>
              </div>

              {/* Back (Tamil) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest font-tamil">
                      மகுடவாசகம்
                    </span>
                  </div>
                  <h3 className="text-3xl sm:text-4xl lg:text-[38px] font-extrabold text-brand-forest font-tamil leading-[1.6] sm:leading-[1.7] mt-2">
                    <span className="block">“உண்மைக்கும்</span>
                    <span className="block mt-2.5 sm:mt-3">நேர்மைக்கும்”</span>
                  </h3>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-brand-pale/70">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-light hover:bg-brand-pale px-3.5 py-1.5 rounded-full">
                    <span>English</span>
                    <span className="text-sm">➜</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Vision */}
          <div
            className={`flip-card perspective-1000 h-[300px] sm:h-[320px] lg:h-[300px] cursor-pointer group select-none ${
              flippedCards.vision ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('vision')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English) */}
              <div className="absolute inset-0 backface-hidden bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">Vision</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-brand-forest tracking-tight leading-snug mt-2">
                    "THE IDEAL SCHOOL IN PENINSULA"
                  </h3>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-brand-pale/70">
                  <span className="font-tamil inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-light hover:bg-brand-pale px-3.5 py-1.5 rounded-full">
                    <span>தமிழ்</span>
                    <span className="text-sm">➜</span>
                  </span>
                </div>
              </div>

              {/* Back (Tamil) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-forest text-brand-white rounded-3xl p-7 sm:p-8 border border-brand-soft/40 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-pale font-tamil">
                      தூரநோக்கு
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-[30px] font-bold font-tamil text-white leading-[1.65] mt-2">
                    <span className="block">“குடாநாட்டின்</span>
                    <span className="block mt-1 sm:mt-1.5">முன்மாதிரிப் பாடசாலை”</span>
                  </h3>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-white/10">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-pale group-hover:text-white transition-colors bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full">
                    <span>English</span>
                    <span className="text-sm">➜</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Mission Statement */}
          <div
            className={`flip-card perspective-1000 h-[300px] sm:h-[320px] lg:h-[300px] cursor-pointer group select-none ${
              flippedCards.mission ? 'is-flipped' : ''
            }`}
            onClick={() => toggleFlip('mission')}
          >
            <div className="flip-card-inner relative w-full h-full duration-500 transform-style-3d transition-transform">
              {/* Front (English) */}
              <div className="absolute inset-0 backface-hidden bg-brand-white text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="mb-3">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest">
                      Mission Statement
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal mt-1">
                    To foster self respect, values, character, patriotism and Social Justice to lead the school
                    community towards the global frontiers in education and to work for the optimum use of all the
                    available resources skills and abilities.
                  </p>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-brand-pale/70">
                  <span className="font-tamil inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-light hover:bg-brand-pale px-3.5 py-1.5 rounded-full">
                    <span>தமிழ்</span>
                    <span className="text-sm">➜</span>
                  </span>
                </div>
              </div>

              {/* Back (Tamil) */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 bg-brand-light text-slate-800 rounded-3xl p-7 sm:p-8 border border-brand-pale shadow-sm flex flex-col justify-between overflow-hidden">
                <div>
                  <div className="mb-3">
                    <span className="text-xs uppercase font-extrabold tracking-widest text-brand-forest font-tamil">
                      நோக்கக்கூற்று
                    </span>
                  </div>
                  <p className="text-sm sm:text-[14.5px] text-slate-800 font-tamil leading-[1.8] sm:leading-[1.85] font-normal mt-1">
                    சுயமரியாதை, விழுமியங்கள், நடத்தைக் கோலங்கள், நாட்டுப்பற்று, சமூக நியாயப்பாடு என்பவற்றை உள்ளடக்கிப்
                    பாடசாலை சமூகத்தை கல்வியிலும், கல்விசார் கடமைகளிலும், வளங்கள், தேர்ச்சிகள் மற்றும் திறமைகளைப்
                    பயன்படுத்திப் பாடசாலையில் கல்வித்தரத்தை நாட்டின் முதல் வரிசைக்குக் கொண்டு வருதல்.
                  </p>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-brand-pale/70">
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-forest group-hover:text-brand-forestHover transition-colors bg-brand-white border border-brand-pale hover:bg-brand-pale/50 px-3.5 py-1.5 rounded-full">
                    <span>English</span>
                    <span className="text-sm">➜</span>
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
