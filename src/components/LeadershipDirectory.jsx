/**
 * LeadershipDirectory Component
 *
 * Archival record detailing the institutional leadership lineage of J/Kopay Christian College,
 * including historical Headmasters (தலைமையாசிரியர்கள்), Managers (முகாமையாளர்கள்),
 * Principals (அதிபர்கள்), and Vice Principals (உப அதிபர்கள்) from 1880 through the modern era.
 *
 * Supports bilingual rendering (`lang === 'ta'` vs English default).
 */
export default function LeadershipDirectory({ lang = 'en' }) {
  if (lang === 'ta') {
    return (
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 font-tamil">
        <div className="bg-brand-light rounded-2xl border border-brand-pale p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-brand-forest text-brand-white flex items-center justify-center font-bold text-xs">
              தலை
            </span>
            <h2 className="text-base font-bold text-brand-forest">தலைமையாசிரியர்கள் (Headmasters)</h2>
          </div>
          <div className="divide-y divide-brand-pale/70 text-sm">
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1880</span>
              <span className="font-medium text-slate-800">Mr. Valippillai (Later R. V. Vathavanam)</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1909 - 1914</span>
              <span className="font-medium text-slate-800">Rev. I. S. Ratnathikkam</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1917 - 1920</span>
              <span className="font-medium text-slate-800">Rev. A. M. Nathaniel</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1924 - 1926</span>
              <span className="font-medium text-slate-800">Rev. I. S. Ratnathikkam</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1926 - 1938</span>
              <span className="font-medium text-slate-800">Mr. J. P. Chelliah</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1939 - 1944</span>
              <span className="font-medium text-slate-800">Mr. G. S. Chelliah</span>
            </div>
          </div>
        </div>

        <div className="bg-brand-light rounded-2xl border border-brand-pale p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-brand-forest text-brand-white flex items-center justify-center font-bold text-xs">
              முகா
            </span>
            <h2 className="text-base font-bold text-brand-forest">முகாமையாளர்கள் (Managers)</h2>
          </div>
          <div className="divide-y divide-brand-pale/70 text-sm">
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1899 - 1900</span>
              <span className="font-medium text-slate-800">Rev. R. W. Ryde</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1900 - 1919</span>
              <span className="font-medium text-slate-800">Rev. J. Thompson</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1919</span>
              <span className="font-medium text-slate-800">Rev. K. C. McPherson</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1920 - 1940</span>
              <span className="font-medium text-slate-800">Rev. Henry Peto</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1940 - 1957</span>
              <span className="font-medium text-slate-800">Rev. J. T. Arulanantham</span>
            </div>
            <div className="py-2.5 flex justify-between">
              <span className="font-bold text-brand-forest">1957 - 1960</span>
              <span className="font-medium text-slate-800">Mr. A. W. Rajasekaram</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
      <div className="bg-brand-light rounded-2xl border border-brand-pale p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-brand-forest text-brand-white flex items-center justify-center font-bold text-xs">
            HM
          </span>
          <h2 className="text-base font-bold text-brand-forest">Headmasters (1880 - 1944)</h2>
        </div>
        <div className="divide-y divide-brand-pale/70 text-sm">
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1880</span>
            <span className="font-medium text-slate-800">Mr. Valippillai (Later R. V. Vathavanam)</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1909 - 1914</span>
            <span className="font-medium text-slate-800">Rev. I. S. Ratnathikkam</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1917 - 1920</span>
            <span className="font-medium text-slate-800">Rev. A. M. Nathaniel</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1924 - 1926</span>
            <span className="font-medium text-slate-800">Rev. I. S. Ratnathikkam</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1926 - 1938</span>
            <span className="font-medium text-slate-800">Mr. J. P. Chelliah</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1939 - 1944</span>
            <span className="font-medium text-slate-800">Mr. G. S. Chelliah</span>
          </div>
        </div>
      </div>

      <div className="bg-brand-light rounded-2xl border border-brand-pale p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 rounded-lg bg-brand-forest text-brand-white flex items-center justify-center font-bold text-xs">
            M
          </span>
          <h2 className="text-base font-bold text-brand-forest">Managers (1899 - 1960)</h2>
        </div>
        <div className="divide-y divide-brand-pale/70 text-sm">
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1899 - 1900</span>
            <span className="font-medium text-slate-800">Rev. R. W. Ryde</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1900 - 1919</span>
            <span className="font-medium text-slate-800">Rev. J. Thompson</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1919</span>
            <span className="font-medium text-slate-800">Rev. K. C. McPherson</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1920 - 1940</span>
            <span className="font-medium text-slate-800">Rev. Henry Peto</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1940 - 1957</span>
            <span className="font-medium text-slate-800">Rev. J. T. Arulanantham</span>
          </div>
          <div className="py-2.5 flex justify-between">
            <span className="font-bold text-brand-forest">1957 - 1960</span>
            <span className="font-medium text-slate-800">Mr. A. W. Rajasekaram</span>
          </div>
        </div>
      </div>
    </section>
  );
}
