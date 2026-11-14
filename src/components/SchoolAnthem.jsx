import React from 'react';
import { Link } from 'react-router-dom';
import AnthemPrintSheet from './AnthemPrintSheet.jsx';

export const ANTHEM_STANZAS = [
  {
    id: 'stanza-1',
    lines: [
      "வாழிய நம் கலைக்கூடமே வாழ்க",
      "வாழிய வாழிய வாழியவே",
      "கழனிகள் சூழ்ந்திடு கோவையம் பதியில்",
      "விளங்குநற் சிறந்தவக் கல்லூரி",
      "உண்மையும் நேர்மையும்",
      "உலகிடை அளிக்கும்",
      "உயர்புகழ் என்றென்றும் வாழியவே"
    ]
  },
  {
    id: 'stanza-2',
    lines: [
      "பல்புகழ் மலிந்திடும் பல பெரியோர் களைப்",
      "படைத்து நற்பணிபுரிந்தாய்",
      "அவர் மிகு சேவையை ஏந்திட நன்னிலை",
      "அடைந்தநல் நாடெய்தே"
    ]
  },
  {
    id: 'stanza-3',
    lines: [
      "மனதினில் உள் திறம் மதிப் பொறிவைத்திட",
      "மகிழ்வொடு நாம் முயல்வோம்",
      "கலைபல கற்றுநற் கனிந்திட நல்லறி",
      "காட்டிடுவாய் தாயே"
    ]
  },
  {
    id: 'stanza-4',
    lines: [
      "நிலமிசை நின்புகழ் நீடுவாழ்க",
      "நின்பணி தொடர்ந்து என்றும் வாழ்க",
      "நிலை பெறு கலைகளின் நிறைவுடனாக",
      "நீயென்றும் வாழிய வாழியவே."
    ]
  }
];

export default function SchoolAnthem() {
  const handlePrint = () => {
    window.print();
  };

  let globalLineCount = 0;

  return (
    <>
      <article className="max-w-4xl mx-auto py-8 sm:py-14 px-4 sm:px-6 print:hidden">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-forest dark:text-emerald-400 tracking-tight font-tamil leading-tight animate-anthem-title">
          பாடசாலைக் கீதம்
        </h1>
        <h3
          className="text-slate-600 dark:text-slate-400 text-base sm:text-lg mt-3 font-sans max-w-xl mx-auto font-medium animate-fade-in"
          style={{ animationDelay: '100ms' }}
        >
          School Anthem 
        </h3>

        <div
          className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fade-up"
          style={{ animationDelay: '180ms' }}
        >
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-white dark:bg-emerald-950/60 border border-brand-pale dark:border-emerald-800/50 hover:border-brand-soft text-slate-700 dark:text-slate-200 hover:text-brand-forest dark:hover:text-emerald-300 text-xs font-semibold shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4 text-brand-forest dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </button>

          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-forest text-brand-white hover:bg-brand-forestHover text-xs font-semibold shadow-2xs transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Explore College History →</span>
          </Link>
        </div>
      </div>

      <div className="bg-brand-white dark:bg-[#111e13] rounded-3xl border border-brand-pale dark:border-emerald-900/40 p-6 sm:p-12 shadow-sm relative overflow-hidden animate-anthem-card">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.04] pointer-events-none select-none">
          <img src="/assets/logo.png" alt="" className="w-96 h-96 object-contain animate-watermark" />
        </div>

        <div className="relative z-10 font-tamil">
          <div className="flex justify-start mb-6 sm:mb-8">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-brand-light/90 dark:bg-emerald-950/80 border border-brand-pale/80 dark:border-emerald-700/40 text-brand-forest dark:text-emerald-300 text-xs font-semibold shadow-2xs animate-anthem-badge">
              <svg className="w-3.5 h-3.5 text-brand-forest dark:text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              <span>இராகம்: ஹம்சத்வனி</span>
            </div>
          </div>

          <div className="text-center text-base sm:text-xl text-slate-800 dark:text-slate-200 leading-[2.3] sm:leading-[2.5] font-medium space-y-7 sm:space-y-8 max-w-2xl mx-auto">
            {ANTHEM_STANZAS.map((stanza) => (
              <div key={stanza.id} className="space-y-1">
                {stanza.lines.map((line) => {
                  const currentLineIndex = globalLineCount++;
                  const delay = 260 + currentLineIndex * 60;
                  return (
                    <p key={currentLineIndex} className="py-0.5">
                      <span
                        className="animate-anthem-line inline-block transition-all duration-300 ease-out hover:scale-[1.035] hover:text-brand-forest dark:hover:text-emerald-300 cursor-default select-text origin-center"
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        {line}
                      </span>
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="mt-8 flex justify-center animate-fade-in"
        style={{ animationDelay: `${260 + 19 * 60 + 120}ms` }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-forest text-brand-white hover:bg-brand-forestHover font-bold text-xs shadow-xs transition-all hover:scale-105 active:scale-95"
        >
          ← Return to Home
        </Link>
      </div>

      </article>

      {/* Pristine Document Sheet for Printing */}
      <AnthemPrintSheet />
    </>
  );
}
