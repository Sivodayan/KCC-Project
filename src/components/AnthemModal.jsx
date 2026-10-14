import React, { useEffect } from 'react';

export default function AnthemModal({ isOpen, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-brand-white max-w-lg w-full rounded-2xl border border-brand-pale overflow-hidden flex flex-col max-h-[85vh] shadow-2xl animate-modal-content">
        {/* Anthem Header */}
        <div className="bg-brand-forest p-5 text-brand-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold font-tamil">பாடசாலைக் கீதம்</h3>
            <p className="text-xs text-brand-pale font-tamil mt-0.5">இராகம் : ஹம்சத்வனி</p>
          </div>
          <button
            onClick={onClose}
            className="text-brand-white/80 hover:text-white p-1 rounded transition-colors cursor-pointer"
            aria-label="Close Anthem Modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Anthem Verses in Tamil */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-800 font-tamil leading-loose text-center text-sm sm:text-base bg-brand-light">
          <div className="p-4 bg-brand-white rounded-xl border border-brand-pale shadow-2xs">
            <p className="font-bold text-brand-forest">வாழிய நம் கலைக்கூடமே வாழ்க</p>
            <p className="font-bold text-brand-forest">வாழிய வாழிய வாழியவே</p>
            <p>கழனிகள் சூழ்ந்திடு கோவையம் பதியில்</p>
            <p>விளங்குநற் சிறந்தவக் கல்லூரி</p>
            <p>உண்மையும் நேர்மையும்</p>
            <p>உலகிடை அளிக்கும்</p>
            <p>உயர்புகழ் என்றென்றும் வாழியவே</p>
          </div>

          <div className="p-4 bg-brand-white rounded-xl border border-brand-pale shadow-2xs">
            <p>பல்புகழ் மலிந்திடும் பல பெரியோர் களைப்</p>
            <p>படைத்து நற்பணிபுரிந்தாய்</p>
            <p>அவர் மிகு சேவையை ஏந்திட நன்னிலை</p>
            <p>அடைந்தநல் நாடெய்தே</p>
          </div>

          <div className="p-4 bg-brand-white rounded-xl border border-brand-pale shadow-2xs">
            <p>மனதினில் உள் திறம் மதிப் பொறிவைத்திட</p>
            <p>மகிழ்வொடு நாம் முயல்வோம்</p>
            <p>கலைபல கற்றுநற் கனிந்திட நல்லறி</p>
            <p>காட்டிடுவாய் தாயே</p>
          </div>

          <div className="p-4 bg-brand-white rounded-xl border border-brand-pale font-bold text-brand-forest shadow-2xs">
            <p>நிலமிசை நின்புகழ் நீடுவாழ்க</p>
            <p>நின்பணி தொடர்ந்து என்றும் வாழ்க</p>
            <p>நிலை பெறு கலைகளின் நிறைவுடனாக</p>
            <p>நீயென்றும் வாழிய வாழியவே.</p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-brand-pale bg-brand-white flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-1.5 bg-brand-forest hover:bg-brand-forestHover text-brand-white rounded-full text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
