export default function Footer() {
  return (
    <footer className="bg-brand-white dark:bg-[#081009] border-t border-brand-pale dark:border-emerald-950/60 py-4 sm:py-5 text-xs text-slate-500 transition-colors reveal-item">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400 text-right w-full">
            <span className="text-brand-forest dark:text-emerald-300 font-bold"> &copy; 2026 &nbsp; J/Kopay Christian College</span><p> All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
