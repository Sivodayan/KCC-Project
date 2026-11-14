import React from 'react';
import { ANTHEM_STANZAS } from './SchoolAnthem.jsx';

export default function AnthemPrintSheet() {
  return (
    <div
      id="anthem-print-sheet"
      className="hidden print:block font-sans bg-white text-slate-900 p-6 max-w-[210mm] mx-auto"
      style={{
        boxSizing: 'border-box',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact'
      }}
    >
      {/* Formal Collegiate Document Frame */}
      <div
        className="relative border-4 border-double border-[#196716] rounded-xl p-6 sm:p-8"
        style={{
          minHeight: '260mm',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pageBreakInside: 'avoid'
        }}
      >
        {/* Subtle Watermark Crest in Center */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.04 }}
          aria-hidden="true"
        >
          <img
            src="/assets/logo.png"
            alt=""
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* Header Section */}
        <div className="relative z-10 text-center border-b border-[#196716]/30 pb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img
              src="/assets/logo.png"
              alt="KCC Crest"
              className="w-16 h-16 object-contain"
            />
          </div>

          <h1 className="font-tamil font-bold text-2xl text-[#196716] leading-tight">
            யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி
          </h1>
          <h2 className="font-bold text-base tracking-wider text-slate-900 uppercase mt-0.5">
            J/Kopay Christian College
          </h2>
          <p className="text-xs text-slate-600 mt-0.5 font-medium">
            Kopay, Jaffna, Sri Lanka • Founded 1852
          </p>

          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-[#196716] font-medium font-tamil">
            <span>மகுடவாசகம்: “உண்மைக்கும் நேர்மைக்கும்”</span>
            <span className="text-slate-400">•</span>
            <span className="font-sans italic">"Truth and Justice"</span>
          </div>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <span className="h-[1px] w-16 bg-[#196716]/40"></span>
            <span className="text-[#196716] text-[10px]">❖</span>
            <span className="h-[1px] w-16 bg-[#196716]/40"></span>
          </div>
        </div>

        {/* Anthem Title & Raga */}
        <div className="relative z-10 text-center my-3">
          <h3 className="font-tamil font-extrabold text-2xl text-[#196716] tracking-tight">
            பாடசாலைக் கீதம்
          </h3>
          <p className="font-tamil text-xs font-semibold text-emerald-800 mt-1">
            இராகம்: ஹம்சத்வனி (Ragam: Hamsadhwani)
          </p>
        </div>

        {/* Anthem Lyrics Body */}
        <div className="relative z-10 font-tamil text-center text-slate-900 leading-[2.3] space-y-4 text-[13pt] my-auto">
          {ANTHEM_STANZAS.map((stanza, sIdx) => (
            <div
              key={stanza.id || sIdx}
              className="space-y-0.5"
              style={{ pageBreakInside: 'avoid' }}
            >
              {stanza.lines.map((line, lIdx) => (
                <p key={lIdx} className="m-0 font-medium tracking-normal">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Document Footer */}
        <div className="relative z-10 border-t border-[#196716]/30 pt-3 mt-4 text-center">
          <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium px-2">
            <span>J/Kopay Christian College</span>
            <span className="italic font-tamil">பாடசாலை உத்தியோகபூர்வ கீதம்</span>
            <span>Kopay, Jaffna</span>
          </div>
        </div>
      </div>
    </div>
  );
}
