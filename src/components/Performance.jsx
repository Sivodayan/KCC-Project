import React, { useState, useEffect, useRef } from 'react';

function easeOutExpo(x) {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export default function Performance() {
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [counterValues, setCounterValues] = useState({
    founded: 0,
    students: 0,
    staff: 0,
    olPass: 0,
    alQual: 0,
    clubs: 0,
    houses: 0,
    labs: 0
  });

  const performanceRef = useRef(null);

  useEffect(() => {
    if (!performanceRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          setStatsAnimated(true);

          const duration = 2000;
          const targets = {
            founded: 1852,
            students: 386,
            staff: 46,
            olPass: 94.2,
            alQual: 78,
            clubs: 18,
            houses: 4,
            labs: 100
          };

          let startTime = null;

          function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const ease = easeOutExpo(progress);

            setCounterValues({
              founded: Math.floor(ease * targets.founded),
              students: Math.floor(ease * targets.students),
              staff: Math.floor(ease * targets.staff),
              olPass: (ease * targets.olPass).toFixed(1),
              alQual: Math.floor(ease * targets.alQual),
              clubs: Math.floor(ease * targets.clubs),
              houses: Math.floor(ease * targets.houses),
              labs: Math.floor(ease * targets.labs)
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounterValues({
                founded: targets.founded,
                students: targets.students,
                staff: targets.staff,
                olPass: targets.olPass.toFixed(1),
                alQual: targets.alQual,
                clubs: targets.clubs,
                houses: targets.houses,
                labs: targets.labs
              });
            }
          }

          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(performanceRef.current);
    return () => observer.disconnect();
  }, [statsAnimated]);

  return (
    <section ref={performanceRef} className="py-16 bg-brand-white border-b border-brand-pale scroll-mt-20 sm:scroll-mt-24" id="performance">
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 reveal-item">
          
          <h2 className="text-3xl font-extrabold text-brand-forest mt-1 tracking-tight">Key Numbers &amp; Performance</h2>
          <p className="text-slate-600 text-sm mt-2">
            Measurable records reflecting academic commitment, teacher mentorship, and co-curricular vibrancy.
          </p>
        </div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Founded Year (1852 without comma) */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-1 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.founded}
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">Founded Year</p>
            <p className="text-xs text-slate-500 mt-0.5">Peninsula Heritage</p>
          </div>

          {/* Total Students */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-2 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.students}+
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">Enrolled Students</p>
            <p className="text-xs text-slate-500 mt-0.5">Primary to Collegiate</p>
          </div>

          {/* Teaching Staff */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-3 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.staff}
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">Teaching Staff</p>
            <p className="text-xs text-slate-500 mt-0.5">Dedicated Faculty</p>
          </div>

          {/* G.C.E. O/L Pass Rate */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-4 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.olPass}%
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">G.C.E. O/L Pass Rate</p>
            <p className="text-xs text-slate-500 mt-0.5">National Examination</p>
          </div>

          {/* University Qualifying */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-1 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.alQual}%
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">University Qualifying</p>
            <p className="text-xs text-slate-500 mt-0.5">G.C.E. A/L Streams</p>
          </div>

          {/* Clubs & Societies */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-2 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.clubs}
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">Clubs &amp; Societies</p>
            <p className="text-xs text-slate-500 mt-0.5">Co-Curricular Groups</p>
          </div>

          {/* Houses */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-3 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.houses}
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">Competitive Houses</p>
            <p className="text-xs text-slate-500 mt-0.5">Annual Sports Division</p>
          </div>

          {/* Smart Facilities */}
          <div className="p-6 rounded-2xl bg-brand-light border border-brand-pale text-center reveal-item stagger-4 transition-all duration-200 hover:border-brand-soft hover:-translate-y-1">
            <p className="text-3xl lg:text-4xl font-extrabold text-brand-forest font-sans">
              {counterValues.labs}%
            </p>
            <p className="text-xs uppercase font-bold text-brand-sage mt-2">Lab Coverage</p>
            <p className="text-xs text-slate-500 mt-0.5">Science &amp; ICT Units</p>
          </div>
        </div>
      </div>
    </section>
  );
}
