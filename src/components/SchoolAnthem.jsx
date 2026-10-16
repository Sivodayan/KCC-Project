import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * SchoolAnthem Component
 *
 * Primary archival presentation of the J/Kopay Christian College Anthem (பாடசாலைக் கீதம்).
 * Rendered in Tamil typography with Hamsadhvani melodic arrangement context.
 *
 * Provides native print dialog invocation (`window.print()`), copy-to-clipboard
 * with transient UI confirmation, and navigational links to the heritage timeline.
 */
export default function SchoolAnthem() {
  const [copied, setCopied] = useState(false);

  const anthemTamil = `வாழிய நம் கலைக்கூடமே வாழ்க
வாழிய வாழிய வாழியவே
கழனிகள் சூழ்ந்திடு கோவையம் பதியில்
விளங்குநற் சிறந்தவக் கல்லூரி
உண்மையும் நேர்மையும்
உலகிடை அளிக்கும்
உயர்புகழ் என்றென்றும் வாழியவே

பல்புகழ் மலிந்திடும் பல பெரியோர் களைப்
படைத்து நற்பணிபுரிந்தாய்
அவர் மிகு சேவையை ஏந்திட நன்னிலை
அடைந்தநல் நாடெய்தே

மனதினில் உள் திறம் மதிப் பொறிவைத்திட
மகிழ்வொடு நாம் முயல்வோம்
கலைபல கற்றுநற் கனிந்திட நல்லறி
காட்டிடுவாய் தாயே

நிலமிசை நின்புகழ் நீடுவாழ்க
நின்பணி தொடர்ந்து என்றும் வாழ்க
நிலை பெறு கலைகளின் நிறைவுடனாக
நீயென்றும் வாழிய வாழியவே.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(anthemTamil).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="max-w-4xl mx-auto py-8 sm:py-14 px-4 sm:px-6">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-tamil leading-tight">
          பாடசாலைக் கீதம்
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-white border border-brand-pale hover:border-brand-soft text-slate-700 hover:text-brand-forest text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-brand-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </button>

          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-forest text-brand-white hover:bg-brand-forestHover text-xs font-semibold shadow-2xs transition-all cursor-pointer"
          >
            <span>Explore College History →</span>
          </Link>
        </div>
      </div>

      <div className="bg-gradient-to-b from-brand-light via-brand-white to-brand-light/60 rounded-3xl border border-brand-pale p-6 sm:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
          <img src="/assets/logo.png" alt="" className="w-96 h-96 object-contain" />
        </div>

        <div className="relative z-10 space-y-8 text-center font-tamil">
          <div className="p-6 sm:p-8 bg-brand-white/90 rounded-2xl border border-brand-pale/80 shadow-2xs hover:shadow-md transition-shadow">
            <div className="text-lg sm:text-2xl text-slate-900 leading-[2.2] sm:leading-[2.4] font-semibold space-y-1">
              <p className="font-bold text-brand-forest">வாழிய நம் கலைக்கூடமே வாழ்க</p>
              <p className="font-bold text-brand-forest">வாழிய வாழிய வாழியவே</p>
              <p>கழனிகள் சூழ்ந்திடு கோவையம் பதியில்</p>
              <p>விளங்குநற் சிறந்தவக் கல்லூரி</p>
              <p className="text-slate-800">உண்மையும் நேர்மையும்</p>
              <p className="text-slate-800">உலகிடை அளிக்கும்</p>
              <p className="font-bold text-brand-forest">உயர்புகழ் என்றென்றும் வாழியவே</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-brand-white/90 rounded-2xl border border-brand-pale/80 shadow-2xs hover:shadow-md transition-shadow">
            <div className="text-base sm:text-xl text-slate-800 leading-[2.2] sm:leading-[2.4] space-y-1">
              <p>பல்புகழ் மலிந்திடும் பல பெரியோர் களைப்</p>
              <p>படைத்து நற்பணிபுரிந்தாய்</p>
              <p>அவர் மிகு சேவையை ஏந்திட நன்னிலை</p>
              <p>அடைந்தநல் நாடெய்தே</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-brand-white/90 rounded-2xl border border-brand-pale/80 shadow-2xs hover:shadow-md transition-shadow">
            <div className="text-base sm:text-xl text-slate-800 leading-[2.2] sm:leading-[2.4] space-y-1">
              <p>மனதினில் உள் திறம் மதிப் பொறிவைத்திட</p>
              <p>மகிழ்வொடு நாம் முயல்வோம்</p>
              <p>கலைபல கற்றுநற் கனிந்திட நல்லறி</p>
              <p className="font-semibold text-brand-forest">காட்டிடுவாய் தாயே</p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-brand-white/90 rounded-2xl border border-brand-pale/80 shadow-2xs hover:shadow-md transition-shadow">
            <div className="text-base sm:text-xl text-slate-900 leading-[2.2] sm:leading-[2.4] font-semibold space-y-1">
              <p>நிலமிசை நின்புகழ் நீடுவாழ்க</p>
              <p>நின்பணி தொடர்ந்து என்றும் வாழ்க</p>
              <p>நிலை பெறு கலைகளின் நிறைவுடனாக</p>
              <p className="font-bold text-2xl sm:text-3xl text-brand-forest pt-2">நீயென்றும் வாழிய வாழியவே.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-brand-forest text-brand-white hover:bg-brand-forestHover font-bold text-xs shadow-xs transition-colors"
        >
          ← Return to Home
        </Link>
      </div>
    </article>
  );
}
