import React from 'react';
import { ANTHEM_STANZAS } from './SchoolAnthem.jsx';

export default function AnthemPrintSheet() {
  return (
    <div
      id="anthem-print-sheet"
      className="hidden print:flex print:flex-col font-sans bg-white text-slate-900 mx-auto"
      style={{
        boxSizing: 'border-box',
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
        width: '100%',
        maxWidth: '190mm',
        height: '100%',
        maxHeight: '265mm',
        pageBreakInside: 'avoid',
        pageBreakAfter: 'avoid',
        pageBreakBefore: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Formal Collegiate Document Frame */}
      <div
        className="relative border-4 border-double border-[#196716] rounded-xl p-4 sm:p-5 flex-1 flex flex-col justify-between"
        style={{
          boxSizing: 'border-box',
          height: '100%',
          maxHeight: '265mm',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
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
            className="w-72 h-72 object-contain"
          />
        </div>

        {/* Header Section */}
        <div className="relative z-10 text-center border-b border-[#196716]/30 pb-2.5">
          <div className="flex items-center justify-center gap-2 mb-1">
            <img
              src="/assets/logo.png"
              alt="KCC Crest"
              className="w-12 h-12 object-contain"
            />
          </div>

          <h1 className="font-tamil font-bold text-xl text-[#196716] leading-tight">
            யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி
          </h1>
          <p className="text-[10px] tracking-wider uppercase text-slate-500 font-semibold mt-0.5">
            J/Kopay Christian College • Kopay, Jaffna
          </p>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-2 mt-1.5">
            <span className="h-[1px] w-12 bg-[#196716]/40"></span>
            <span className="text-[#196716] text-[9px]">❖</span>
            <span className="h-[1px] w-12 bg-[#196716]/40"></span>
          </div>
        </div>

        {/* Anthem Title & Raga */}
        <div className="relative z-10 text-center my-2">
          <h2 className="font-tamil font-extrabold text-xl text-[#196716] tracking-tight">
            பாடசாலைக் கீதம்
          </h2>
          <p className="font-tamil text-[11px] font-semibold text-emerald-800 mt-0.5">
            இராகம்: ஹம்சத்வனி (Ragam: Hamsadhwani)
          </p>
        </div>

        {/* Anthem Lyrics Body - All 19 lines formatted compactly to guarantee 1 page */}
        <div className="relative z-10 font-tamil text-center text-slate-900 leading-[1.75] space-y-2.5 text-[11pt] my-auto">
          {ANTHEM_STANZAS.map((stanza, sIdx) => (
            <div
              key={stanza.id || sIdx}
              className="space-y-0.5"
              style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
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
        <div className="relative z-10 border-t border-[#196716]/30 pt-2 text-center">
          <div className="flex items-center justify-between text-[9px] text-slate-500 font-medium px-2">
            <span>J/Kopay Christian College</span>
            <span className="font-tamil">மகுடவாசகம்: உண்மைக்கும் நேர்மைக்கும்</span>
            <span>Kopay, Jaffna</span>
          </div>
        </div>
      </div>
    </div>
  );
}
