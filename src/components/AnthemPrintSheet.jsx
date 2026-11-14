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
        height: '270mm',
        maxHeight: '270mm',
        pageBreakInside: 'avoid',
        pageBreakAfter: 'avoid',
        pageBreakBefore: 'avoid',
        breakInside: 'avoid',
      }}
    >
      {/* Formal Collegiate Document Frame */}
      <div
        className="relative border-4 border-double border-[#196716] rounded-2xl p-6 sm:p-7 flex-1 flex flex-col justify-between"
        style={{
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          pageBreakInside: 'avoid',
          breakInside: 'avoid',
        }}
      >
        {/* Subtle Inner Certificate Hairline Border */}
        <div
          className="absolute inset-2 border border-[#196716]/30 rounded-xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Traditional Corner Emblems */}
        <span className="absolute top-2.5 left-3 text-[#196716] text-[10px] select-none pointer-events-none" aria-hidden="true">❖</span>
        <span className="absolute top-2.5 right-3 text-[#196716] text-[10px] select-none pointer-events-none" aria-hidden="true">❖</span>
        <span className="absolute bottom-2.5 left-3 text-[#196716] text-[10px] select-none pointer-events-none" aria-hidden="true">❖</span>
        <span className="absolute bottom-2.5 right-3 text-[#196716] text-[10px] select-none pointer-events-none" aria-hidden="true">❖</span>

        {/* Subtle Watermark Crest in Center */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: 0.045 }}
          aria-hidden="true"
        >
          <img
            src="/assets/logo.png"
            alt=""
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* Header Section */}
        <div className="relative z-10 text-center border-b border-[#196716]/30 pb-3">
          <div className="flex items-center justify-center mb-1.5">
            <img
              src="/assets/logo.png"
              alt="KCC Crest"
              className="w-16 h-16 object-contain"
            />
          </div>

          <h1 className="font-tamil font-bold text-2xl text-[#196716] leading-tight tracking-wide">
            யா/ கோப்பாய் கிறிஸ்தவ கல்லூரி
          </h1>
          <p className="text-xs tracking-widest uppercase text-slate-600 font-bold mt-1">
            J/Kopay Christian College • Kopay, Jaffna
          </p>
          <p className="text-[10px] tracking-wider text-slate-500 font-medium mt-0.5">
            Estd. 1852 • யாழ் / கோப்பாய் • CMS Foundation
          </p>

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="h-[1px] w-16 bg-[#196716]/40"></span>
            <span className="text-[#196716] text-[10px]">❖ ❖ ❖</span>
            <span className="h-[1px] w-16 bg-[#196716]/40"></span>
          </div>
        </div>

        {/* Anthem Title & Musical Setting */}
        <div className="relative z-10 text-center my-2.5">
          <h2 className="font-tamil font-black text-2xl text-[#196716] tracking-tight">
            பாடசாலைக் கீதம்
          </h2>
          <div className="inline-flex items-center gap-2 mt-1 px-3.5 py-0.5 rounded-full bg-emerald-50/80 border border-emerald-300/60">
            <p className="font-tamil text-xs font-semibold text-emerald-900">
              இராகம்: ஹம்சத்வனி (Ragam: Hamsadhwani) • தாளம்: ஆதி (Thalam: Adi)
            </p>
          </div>
        </div>

        {/* Anthem Lyrics Body - Formatted across full A4 sheet with comfortable typography */}
        <div className="relative z-10 font-tamil text-center text-slate-900 leading-[2.05] space-y-3.5 my-auto flex-1 flex flex-col justify-around py-1">
          {ANTHEM_STANZAS.map((stanza, sIdx) => (
            <div
              key={stanza.id || sIdx}
              className="space-y-1"
              style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}
            >
              {stanza.lines.map((line, lIdx) => (
                <p
                  key={lIdx}
                  className={`m-0 tracking-normal ${
                    sIdx === 0
                      ? 'text-[13pt] font-semibold text-slate-900'
                      : 'text-[12.5pt] font-medium text-slate-800'
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        {/* Document Footer */}
        <div className="relative z-10 border-t border-[#196716]/30 pt-2.5 text-center">
          <div className="flex items-center justify-between text-[9pt] text-slate-600 font-medium px-2">
            <div className="text-left leading-tight">
              <span className="font-bold text-slate-700">J/Kopay Christian College</span>
              <span className="block text-[8pt] text-slate-500">Official School Anthem</span>
            </div>
            <div className="text-center leading-tight">
              <span className="font-tamil font-bold text-xs text-[#196716]">
                மகுடவாசகம்: உண்மைக்கும் நேர்மைக்கும்
              </span>
              <span className="block text-[8pt] text-slate-500 italic">
                (Truth and Integrity)
              </span>
            </div>
            <div className="text-right leading-tight">
              <span className="font-bold text-slate-700">Kopay, Jaffna</span>
              <span className="block text-[8pt] text-slate-500">jkcc.edu.lk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
